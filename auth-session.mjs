import { generateSignedToken, verifySignedToken } from './auth-token.mjs';
import { 
  AUTH_USER_KEY, 
  readJson, 
  writeJson, 
  getSessionStorage, 
  normalizeEmail 
} from './auth-storage.mjs';

let currentSessionUser = null;

export function _resetLocalSessionCache() {
  currentSessionUser = null;
}

export async function createSessionUser(email, displayName, provider = 'local', role = 'free') {
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

export function dispatchSessionUpdate(user) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('incredible-india:auth-change', { detail: user });
    window.dispatchEvent(event);
  }
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
