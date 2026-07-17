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

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

// ---- Import auth modules ----
const { authApi } = await import('../auth-core.mjs');
const { _resetLocalSessionCache } = await import('../auth-session.mjs');
const storage = await import('../auth-storage.mjs');
const tokenModule = await import('../auth-token.mjs');

function resetStorage() {
  globalThis.window.localStorage.clear();
  globalThis.window.sessionStorage.clear();
  _resetLocalSessionCache();
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

test('hashPassword generates consistent hash string', () => {
  const hash1 = storage.hashPassword('my-password-123');
  const hash2 = storage.hashPassword('my-password-123');
  const hash3 = storage.hashPassword('other-password');
  
  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hash3);
  assert.equal(hash1.length, 8);
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
  assert.equal(accounts[0].passwordHash, storage.hashPassword('securePassword123'));
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

// ---------------------------------------------------------------------
// Session Management & Subscriptions
// ---------------------------------------------------------------------

test('verifySession validates active local user session', async () => {
  resetStorage();
  
  const user = await authApi.registerLocal({
    email: 'session@test.com',
    password: 'password123'
  });
  
  const verifiedUser = await authApi.verifySession();
  assert.deepEqual(verifiedUser, user);
  
  // Manually corrupt token in session storage
  const corruptedUser = { ...user, token: 'corrupted.jwt.token' };
  globalThis.window.sessionStorage.setItem('incredible-india-auth-user', JSON.stringify(corruptedUser));
  
  // Clear the memory cache to force reading from storage
  _resetLocalSessionCache();
  
  const failedVerification = await authApi.verifySession();
  assert.equal(failedVerification, null);
  assert.equal(authApi.getStoredAuthUser(), null);
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
