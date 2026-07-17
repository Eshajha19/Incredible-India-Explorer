export const AUTH_USER_KEY = 'incredible-india-auth-user';
export const AUTH_ACCOUNTS_KEY = 'incredible-india-auth-accounts';

export function getLocalStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

export function getSessionStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
}

export function readJson(key, fallback = null, storage = getLocalStorage()) {
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

export function writeJson(key, value, storage = getLocalStorage()) {
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

export function getStoredAccounts() {
  return readJson(AUTH_ACCOUNTS_KEY, []);
}

export function saveAccounts(accounts) {
  writeJson(AUTH_ACCOUNTS_KEY, accounts);
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function hashPassword(password) {
  let hash = 0;
  for (let index = 0; index < password.length; index += 1) {
    hash = (hash * 31 + password.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}
