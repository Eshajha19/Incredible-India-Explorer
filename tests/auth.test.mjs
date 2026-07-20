// tests/auth.test.mjs
//
// Zero-dependency test suite for the refactored modular auth system.
// Run with: node tests/auth.test.mjs

import assert from 'node:assert/strict';

// ---- shims for Node.js environment ----
class MemoryStorage {
  constructor() { this._data = new Map(); }
  getItem(key) { return this._data.has(key) ? this._data.get(key) : null; }
  setItem(key, value) { this._data.set(key, String(value)); }
  removeItem(key) { this._data.delete(key); }
  clear() { this._data.clear(); }
}

const mockEvents = [];
const eventListeners = new Map();

globalThis.window = {
  localStorage: new MemoryStorage(),
  sessionStorage: new MemoryStorage(),
  dispatchEvent: (event) => {
    mockEvents.push(event);
    const listeners = eventListeners.get(event.type) || [];
    for (const listener of listeners) {
      listener(event);
    }
  },
  addEventListener: (type, listener) => {
    if (!eventListeners.has(type)) {
      eventListeners.set(type, []);
    }
    eventListeners.get(type).push(listener);
  },
  removeEventListener: (type, listener) => {
    if (!eventListeners.has(type)) return;
    eventListeners.set(type, eventListeners.get(type).filter(x => x !== listener));
  },
};

globalThis.CustomEvent = class CustomEvent {
  constructor(type, options) {
    this.type = type;
    this.detail = options ? options.detail : null;
  }
};

// Shim crypto.getRandomValues for Node.js CSRF tests
if (!globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: (bytes) => {
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
      return bytes;
    }
  };
}

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

// ---- Import auth modules ----
const { authApi } = await import('../auth-core.mjs');
const { _resetLocalSessionCache } = await import('../auth-session.mjs');
const storage = await import('../auth-storage.mjs');
const tokenModule = await import('../auth-token.mjs');
const csrf = await import('../csrf-protection.mjs');

function resetStorage() {
  globalThis.window.localStorage.clear();
  globalThis.window.sessionStorage.clear();
  _resetLocalSessionCache();
  if (tokenModule._resetSigningKey) {
    tokenModule._resetSigningKey();
  }
  mockEvents.length = 0;
  eventListeners.clear();
}

// ---------------------------------------------------------------------
// Storage & Utilities Tests
// ---------------------------------------------------------------------

test('normalizeEmail normalizes and trims email addresses', () => {
  assert.equal(storage.normalizeEmail('  Test@Email.Com  '), 'test@email.com');
  assert.equal(storage.normalizeEmail(null), '');
});

test('hashPassword generates consistent hash string', async () => {
  const salt1 = storage.generateSalt();
  const salt2 = storage.generateSalt();
  
  const hash1 = await storage.hashPassword('my-password-123', salt1);
  const hash2 = await storage.hashPassword('my-password-123', salt1);
  const hash3 = await storage.hashPassword('my-password-123', salt2);
  const hash4 = await storage.hashPassword('other-password', salt1);
  
  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hash3);
  assert.notEqual(hash1, hash4);
  assert.equal(hash1.length, 64);
});

// ---------------------------------------------------------------------
// Token/JWT Integrity Tests
// ---------------------------------------------------------------------

test('generateSignedToken and verifySignedToken integrity verification', async () => {
  const payload = { userId: '123', role: 'free', exp: Date.now() + 10000 };
  const token = await tokenModule.generateSignedToken(payload);
  
  // Verify token has 3 parts
  const parts = token.split('.');
  assert.equal(parts.length, 3);
  
  // Verify correct payload extraction
  const verifiedPayload = await tokenModule.verifySignedToken(token);
  assert.ok(verifiedPayload);
  assert.equal(verifiedPayload.userId, '123');
  assert.equal(verifiedPayload.role, 'free');
  
  // Tamper with the payload part (middle part) and expect verification to fail
  const tamperedParts = [...parts];
  tamperedParts[1] = btoa(JSON.stringify({ userId: 'hacker', role: 'premium' }));
  const tamperedToken = tamperedParts.join('.');
  
  const verifiedTampered = await tokenModule.verifySignedToken(tamperedToken);
  assert.equal(verifiedTampered, null);
});

test('expired token verification fails', async () => {
  const payload = { userId: '123', exp: Date.now() - 5000 }; // Expired 5s ago
  const token = await tokenModule.generateSignedToken(payload);
  
  const verifiedPayload = await tokenModule.verifySignedToken(token);
  assert.equal(verifiedPayload, null);
});

// ---------------------------------------------------------------------
// Registration & Sign-In (Local Accounts) Tests
// ---------------------------------------------------------------------

test('registerLocalUser creates account and sets session user', async () => {
  resetStorage();
  
  const user = await authApi.registerLocal({
    email: 'test@explorer.in',
    password: 'securePassword123',
    displayName: 'Raj'
  });
  
  assert.equal(user.email, 'test@explorer.in');
  assert.equal(user.displayName, 'Raj');
  assert.equal(user.role, 'free');
  assert.ok(user.token);
  
  // Verify session user was persisted in sessionStorage
  const sessionUser = authApi.getStoredAuthUser();
  assert.deepEqual(sessionUser, user);
  
  // Verify account is stored in local accounts list
  const accounts = storage.getStoredAccounts();
  assert.equal(accounts.length, 1);
  assert.equal(accounts[0].email, 'test@explorer.in');
  assert.ok(accounts[0].passwordSalt);
  assert.equal(accounts[0].passwordHash, await storage.hashPassword('securePassword123', accounts[0].passwordSalt));
});

test('registerLocalUser rejects weak password or existing email', async () => {
  resetStorage();
  
  // Test password too short
  await assert.rejects(
    async () => await authApi.registerLocal({ email: 'a@b.c', password: '123' }),
    (err) => err.code === 'auth/weak-password'
  );
  
  // Successfully register first account
  await authApi.registerLocal({ email: 'a@b.c', password: 'password123' });
  
  // Test duplicate email
  await assert.rejects(
    async () => await authApi.registerLocal({ email: 'a@b.c', password: 'password456' }),
    (err) => err.code === 'auth/email-already-in-use'
  );
});

test('signInLocalUser authenticates valid user', async () => {
  resetStorage();
  
  await authApi.registerLocal({
    email: 'login@test.com',
    password: 'mySecretPassword',
    displayName: 'LoginTester'
  });
  
  // Clear session storage mock to simulate a fresh tab load
  globalThis.window.sessionStorage.clear();
  
  const loggedIn = await authApi.signInLocal({
    email: 'login@test.com',
    password: 'mySecretPassword'
  });
  
  assert.equal(loggedIn.email, 'login@test.com');
  assert.equal(loggedIn.displayName, 'LoginTester');
  assert.equal(authApi.getStoredAuthUser().email, 'login@test.com');
});

test('signInLocalUser rejects incorrect credentials', async () => {
  resetStorage();
  
  await authApi.registerLocal({
    email: 'login@test.com',
    password: 'mySecretPassword'
  });
  
  // Incorrect password
  await assert.rejects(
    async () => await authApi.signInLocal({ email: 'login@test.com', password: 'wrongPassword' }),
    (err) => err.code === 'auth/wrong-password'
  );
  
  // Unregistered email
  await assert.rejects(
    async () => await authApi.signInLocal({ email: 'unknown@test.com', password: 'password' }),
    (err) => err.code === 'auth/user-not-found'
  );
});

test('signInLocalUser handles legacy accounts and performs auto-upgrade', async () => {
  resetStorage();
  
  // Manually seed a legacy account (using legacyHashPassword, no passwordSalt)
  const legacyAccount = {
    email: 'legacy@explorer.in',
    passwordHash: storage.legacyHashPassword('legacyPassword123'),
    displayName: 'LegacyUser',
    provider: 'local',
    role: 'free'
  };
  
  const accounts = [legacyAccount];
  storage.saveAccounts(accounts);
  
  // Try to sign in with the legacy credentials
  const loggedIn = await authApi.signInLocal({
    email: 'legacy@explorer.in',
    password: 'legacyPassword123'
  });
  
  assert.equal(loggedIn.email, 'legacy@explorer.in');
  assert.equal(loggedIn.displayName, 'LegacyUser');
  
  // Verify that the account in storage was upgraded (now has passwordSalt and SHA-256 passwordHash)
  const updatedAccounts = storage.getStoredAccounts();
  assert.equal(updatedAccounts.length, 1);
  assert.ok(updatedAccounts[0].passwordSalt);
  assert.equal(updatedAccounts[0].passwordHash.length, 64); // SHA-256 length
  
  // Verify it computes the correct salted hash
  const expectedHash = await storage.hashPassword('legacyPassword123', updatedAccounts[0].passwordSalt);
  assert.equal(updatedAccounts[0].passwordHash, expectedHash);
  
  // Verify subsequent sign in works with the newly upgraded hash
  globalThis.window.sessionStorage.clear();
  _resetLocalSessionCache();
  
  const loggedInAgain = await authApi.signInLocal({
    email: 'legacy@explorer.in',
    password: 'legacyPassword123'
  });
  assert.ok(loggedInAgain);
});

// ---------------------------------------------------------------------
// Session Management & Subscriptions
// ---------------------------------------------------------------------

test('verifySession validates active local user session', async () => {
  resetStorage();
  
  let redirectedUrl = null;
  globalThis.window.location = {
    set href(val) { redirectedUrl = val; },
    get href() { return redirectedUrl; }
  };
  
  const user = await authApi.registerLocal({
    email: 'session@test.com',
    password: 'password123'
  });
  
  const verifiedUser = await authApi.verifySession();
  assert.deepEqual(verifiedUser, user);
  assert.equal(redirectedUrl, null);
  
  // Manually corrupt token in session storage
  const corruptedUser = { ...user, token: 'corrupted.jwt.token' };
  globalThis.window.sessionStorage.setItem('incredible-india-auth-user', JSON.stringify(corruptedUser));
  
  // Clear the memory cache to force reading from storage
  _resetLocalSessionCache();
  
  const failedVerification = await authApi.verifySession();
  assert.equal(failedVerification, null);
  assert.equal(authApi.getStoredAuthUser(), null);
  assert.equal(redirectedUrl, 'login.html');
  
  delete globalThis.window.location;
});

test('signOut clears active user session', async () => {
  resetStorage();
  
  await authApi.registerLocal({ email: 'signout@test.com', password: 'password123' });
  assert.ok(authApi.getStoredAuthUser());
  
  authApi.signOut();
  assert.equal(authApi.getStoredAuthUser(), null);
});

test('subscribeToAuthChanges notifies updates', async () => {
  resetStorage();
  
  let notifiedUser = null;
  const unsubscribe = authApi.subscribeToAuthChanges((user) => {
    notifiedUser = user;
  });
  
  // Initial callback should trigger
  assert.equal(notifiedUser, null);
  
  // Registering a user should trigger notification
  await authApi.registerLocal({ email: 'subscribe@test.com', password: 'password123' });
  assert.equal(notifiedUser.email, 'subscribe@test.com');
  
  // Signout should trigger notification
  authApi.signOut();
  assert.equal(notifiedUser, null);
  
  unsubscribe();
});

test('upgradeLocalUserToPremium upgrades user role', async () => {
  resetStorage();
  
  await authApi.registerLocal({ email: 'premium@test.com', password: 'password123' });
  const initialUser = authApi.getStoredAuthUser();
  assert.equal(initialUser.role, 'free');
  
  const upgradedUser = await authApi.upgradeLocalUserToPremium('premium@test.com');
  assert.equal(upgradedUser.role, 'premium');
  
  // Verify session user role updated
  assert.equal(authApi.getStoredAuthUser().role, 'premium');
  
  // Verify stored account role updated
  const accounts = storage.getStoredAccounts();
  assert.equal(accounts[0].role, 'premium');
});

// ---------------------------------------------------------------------
// CSRF Protection Tests
// ---------------------------------------------------------------------

test('generateCSRFToken produces a 64-character hex string', () => {
  const token = csrf.generateCSRFToken();
  assert.equal(typeof token, 'string');
  assert.equal(token.length, 96); // 48 bytes → 96 hex chars
  assert.ok(/^[0-9a-f]+$/.test(token), 'token should be lowercase hex');
});

test('generateCSRFToken produces unique tokens on each call', () => {
  const token1 = csrf.generateCSRFToken();
  const token2 = csrf.generateCSRFToken();
  assert.notEqual(token1, token2);
});

test('storeCSRFToken and getCSRFToken round-trip correctly', () => {
  const token = csrf.generateCSRFToken();
  csrf.storeCSRFToken(token, 60000); // 60 second TTL
  const retrieved = csrf.getCSRFToken();
  assert.equal(retrieved, token);
});

test('getCSRFToken returns null for expired token', async () => {
  const token = csrf.generateCSRFToken();
  csrf.storeCSRFToken(token, 1); // 1ms TTL — expires immediately
  // Wait for expiry
  await new Promise(r => setTimeout(r, 10));
  const retrieved = csrf.getCSRFToken();
  assert.equal(retrieved, null);
});

test('getCSRFToken returns null when no token stored', () => {
  globalThis.window.sessionStorage.removeItem('incredible-india-csrf-token');
  const retrieved = csrf.getCSRFToken();
  assert.equal(retrieved, null);
});

test('ensureCSRFToken creates and returns a valid token', () => {
  globalThis.window.sessionStorage.removeItem('incredible-india-csrf-token');
  const token = csrf.ensureCSRFToken();
  assert.equal(typeof token, 'string');
  assert.equal(token.length, 96);
  // Calling again should return the same token
  const token2 = csrf.ensureCSRFToken();
  assert.equal(token, token2);
});

/**
 * Creates a minimal mock form element for testing.
 * Avoids needing a full DOM shim in the Node.js test environment.
 */
function mockForm() {
  const children = [];
  return {
    children,
    querySelector(selector) {
      const nameMatch = selector.match(/name="([^"]+)"/);
      if (nameMatch) {
        return children.find(el => el.name === nameMatch[1]) || null;
      }
      return null;
    },
    appendChild(el) {
      children.push(el);
    }
  };
}

/**
 * Creates a mock input element for the CSRF hidden field.
 */
function mockInput() {
  const attrs = {};
  return {
    get type() { return attrs.type || 'text'; },
    set type(v) { attrs.type = v; },
    get name() { return attrs.name || ''; },
    set name(v) { attrs.name = v; },
    get value() { return attrs.value || ''; },
    set value(v) { attrs.value = v; },
    remove() {
      const idx = this.parent ? this.parent.children.indexOf(this) : -1;
      if (idx !== -1) this.parent.children.splice(idx, 1);
    }
  };
}

// Override document.createElement to return our mock input
// (used by csrf.injectCSRFToken)
if (!globalThis.document) {
  globalThis.document = {
    createElement(tag) {
      if (tag === 'input') {
        const el = mockInput();
        return el;
      }
      return {};
    }
  };
}

test('injectCSRFToken adds a hidden field to a form', () => {
  const form = mockForm();
  const hidden = csrf.injectCSRFToken(form);
  assert.ok(hidden);
  assert.equal(hidden.type, 'hidden');
  assert.equal(hidden.name, 'csrf_token');
  assert.equal(hidden.value.length, 96);
});

test('injectCSRFToken updates existing hidden field value', () => {
  resetStorage();
  const form = mockForm();
  const hidden1 = csrf.injectCSRFToken(form);
  const firstValue = hidden1.value;
  // Re-inject should update the same field
  const hidden2 = csrf.injectCSRFToken(form);
  assert.equal(hidden1, hidden2); // Same element
  assert.equal(hidden2.value, firstValue); // Same token (not rotated until used)
});

test('validateCSRFToken returns true for matching token', () => {
  resetStorage();
  const form = mockForm();
  csrf.injectCSRFToken(form);
  assert.ok(csrf.validateCSRFToken(form));
});

test('validateCSRFToken returns false for missing token field', () => {
  resetStorage();
  const form = mockForm();
  assert.equal(csrf.validateCSRFToken(form), false);
});

test('validateCSRFToken returns false for tampered token', () => {
  resetStorage();
  const form = mockForm();
  csrf.injectCSRFToken(form);
  // Tamper with the hidden field value
  form.querySelector('input[name="csrf_token"]').value = 'tampered-token-value';
  assert.equal(csrf.validateCSRFToken(form), false);
});

test('rotateCSRFToken clears stored token', () => {
  resetStorage();
  csrf.ensureCSRFToken();
  assert.ok(csrf.getCSRFToken());
  csrf.rotateCSRFToken();
  assert.equal(csrf.getCSRFToken(), null);
});

test('clearCSRFToken clears stored token', () => {
  resetStorage();
  csrf.ensureCSRFToken();
  csrf.clearCSRFToken();
  assert.equal(csrf.getCSRFToken(), null);
});

test('validateCSRFToken rotates token on successful validation (one-time use)', () => {
  resetStorage();
  const form = mockForm();
  csrf.injectCSRFToken(form);
  assert.ok(csrf.validateCSRFToken(form));
  // Token should be consumed
  assert.equal(csrf.getCSRFToken(), null);
});

test('injectCSRFToken returns null for non-form element', () => {
  const result = csrf.injectCSRFToken(null);
  assert.equal(result, null);
  const result2 = csrf.injectCSRFToken({});
  assert.equal(result2, null);
});

test('validateCSRFToken returns false for non-form element', () => {
  assert.equal(csrf.validateCSRFToken(null), false);
  assert.equal(csrf.validateCSRFToken(undefined), false);
});

// ---- Runner ----
let failed = 0;
console.log('Running Auth Modular Refactor tests...');
for (const { name, fn } of tests) {
  try {
    await fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(err);
    failed++;
  }
}

console.log(`\n${tests.length - failed} passed, ${failed} failed, ${tests.length} total`);
process.exit(failed > 0 ? 1 : 0);
