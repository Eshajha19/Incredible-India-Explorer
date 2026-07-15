const AUTH_USER_KEY = 'incredible-india-auth-user';
const AUTH_ACCOUNTS_KEY = 'incredible-india-auth-accounts';

let currentSessionUser = null;
const HMAC_SECRET = "incredible-india-explorer-super-secret-key-123456!";
let hmacKey = null;

function getLocalStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function getSessionStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
}

function readJson(key, fallback = null, storage = getLocalStorage()) {
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value, storage = getLocalStorage()) {
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function hashPassword(password) {
  let hash = 0;
  for (let index = 0; index < password.length; index += 1) {
    hash = (hash * 31 + password.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

// Base64Url Encoding Helpers for Web Crypto signatures
function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlToArrayBuffer(base64Url) {
  const base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getHmacKey() {
  if (hmacKey) return hmacKey;
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(HMAC_SECRET),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
  hmacKey = keyMaterial;
  return hmacKey;
}

export async function generateSignedToken(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(header)));
  const payloadB64 = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  
  const key = await getHmacKey();
  const signInput = `${headerB64}.${payloadB64}`;
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signInput)
  );
  const signatureB64 = arrayBufferToBase64Url(signatureBuffer);
  
  return `${signInput}.${signatureB64}`;
}

export async function verifySignedToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [headerB64, payloadB64, signatureB64] = parts;
  try {
    const key = await getHmacKey();
    const signInput = `${headerB64}.${payloadB64}`;
    const signatureBuffer = base64UrlToArrayBuffer(signatureB64);
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      new TextEncoder().encode(signInput)
    );
    
    if (!isValid) {
      console.error("Token verification failed: Invalid signature");
      return null;
    }
    
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToArrayBuffer(payloadB64)));
    
    // Check expiration
    if (payload.exp && Date.now() > payload.exp) {
      console.error("Token verification failed: Token expired");
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

async function createSessionUser(email, displayName, provider = 'local', role = 'free') {
  const normalizedEmail = normalizeEmail(email);
  const payload = {
    uid: `${provider}:${normalizedEmail}`,
    email: normalizedEmail,
    displayName: displayName || 'User',
    provider,
    role,
    createdAt: new Date().toISOString(),
    exp: Date.now() + 60 * 60 * 1000 // 1 hour expiration
  };
  
  const token = await generateSignedToken(payload);
  return {
    ...payload,
    photoURL: '',
    token
  };
}

export function getStoredAuthUser() {
  if (currentSessionUser) return currentSessionUser;
  currentSessionUser = readJson(AUTH_USER_KEY, null, getSessionStorage());
  return currentSessionUser;
}

export function persistAuthUser(user) {
  if (!user) return;
  currentSessionUser = user;
  writeJson(AUTH_USER_KEY, user, getSessionStorage());
  dispatchSessionUpdate(user);
}

export function clearStoredAuthUser() {
  currentSessionUser = null;
  const storage = getSessionStorage();
  if (storage) {
    storage.removeItem(AUTH_USER_KEY);
  }
  dispatchSessionUpdate(null);
}

function dispatchSessionUpdate(user) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('incredible-india:auth-change', { detail: user });
    window.dispatchEvent(event);
  }
}

export function getStoredAccounts() {
  return readJson(AUTH_ACCOUNTS_KEY, []);
}

function saveAccounts(accounts) {
  writeJson(AUTH_ACCOUNTS_KEY, accounts);
}

export async function registerLocalUser({ email, password, displayName }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password || password.length < 6) {
    const error = new Error('Password must be at least 6 characters.');
    error.code = 'auth/weak-password';
    throw error;
  }

  const accounts = getStoredAccounts();
  const existing = accounts.find((account) => normalizeEmail(account.email) === normalizedEmail);

  if (existing) {
    const error = new Error('An account already exists with this email.');
    error.code = 'auth/email-already-in-use';
    throw error;
  }

  const userRecord = {
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    displayName: displayName || normalizedEmail.split('@')[0],
    provider: 'local',
    role: 'free'
  };

  accounts.push(userRecord);
  saveAccounts(accounts);

  const user = await createSessionUser(normalizedEmail, userRecord.displayName, 'local', 'free');
  persistAuthUser(user);
  return user;
}

export async function signInLocalUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const accounts = getStoredAccounts();
  const account = accounts.find((item) => normalizeEmail(item.email) === normalizedEmail);

  if (!account) {
    const error = new Error('No account found with this email.');
    error.code = 'auth/user-not-found';
    throw error;
  }

  if (!account.passwordHash || account.passwordHash !== hashPassword(password)) {
    const error = new Error('Incorrect password. Please try again.');
    error.code = 'auth/wrong-password';
    throw error;
  }

  const user = await createSessionUser(normalizedEmail, account.displayName || normalizedEmail.split('@')[0], 'local', account.role || 'free');
  persistAuthUser(user);
  return user;
}

export async function signInWithLocalGoogle(displayName = 'Google User') {
  const accounts = getStoredAccounts();
  const existingGoogleAccount = accounts.find((account) => account.provider === 'google');

  if (existingGoogleAccount) {
    const user = await createSessionUser(existingGoogleAccount.email, existingGoogleAccount.displayName || displayName, 'google', existingGoogleAccount.role || 'free');
    persistAuthUser(user);
    return user;
  }

  const email = `google-user-${Date.now()}@local.auth`;
  const account = {
    email,
    displayName: displayName || 'Google User',
    provider: 'google',
    role: 'free'
  };

  accounts.push(account);
  saveAccounts(accounts);

  const user = await createSessionUser(email, account.displayName, 'google', 'free');
  persistAuthUser(user);
  return user;
}

export function signOutLocalUser() {
  clearStoredAuthUser();
}

export async function upgradeLocalUserToPremium(email) {
  const normalizedEmail = normalizeEmail(email);
  const accounts = getStoredAccounts();
  const accountIndex = accounts.findIndex((item) => normalizeEmail(item.email) === normalizedEmail);
  
  if (accountIndex === -1) {
    throw new Error("Account not found");
  }
  
  accounts[accountIndex].role = 'premium';
  saveAccounts(accounts);
  
  const user = await createSessionUser(normalizedEmail, accounts[accountIndex].displayName, accounts[accountIndex].provider || 'local', 'premium');
  persistAuthUser(user);
  return user;
}

export async function verifyLocalSession() {
  const user = getStoredAuthUser();
  if (!user) return null;
  
  const claims = await verifySignedToken(user.token);
  if (!claims) {
    clearStoredAuthUser();
    return null;
  }
  
  return user;
}

export function subscribeToLocalAuth(listener) {
  if (typeof window === 'undefined') {
    listener(getStoredAuthUser());
    return () => {};
  }

  const handleCustomEvent = (event) => {
    listener(event.detail);
  };

  const handleStorage = (event) => {
    if (event.key === AUTH_USER_KEY) {
      listener(getStoredAuthUser());
    }
  };

  window.addEventListener('incredible-india:auth-change', handleCustomEvent);
  window.addEventListener('storage', handleStorage);
  
  listener(getStoredAuthUser());

  return () => {
    window.removeEventListener('incredible-india:auth-change', handleCustomEvent);
    window.removeEventListener('storage', handleStorage);
  };
}
