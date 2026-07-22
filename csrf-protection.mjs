/**
 * csrf-protection.mjs
 * Client-side CSRF protection for all forms in Incredible India Explorer.
 *
 * Generates a cryptographically random token using crypto.getRandomValues(),
 * stores it in sessionStorage with an expiry timestamp, and provides
 * helpers to inject the token as a hidden form field and validate it on
 * form submission.
 *
 * This provides defense-in-depth against cross-site request forgery in a
 * pure client-side application. Even without a server, the token:
 *   - Prevents accidental re-submissions from stale/injected pages
 *   - Provides a ready framework if a server layer is added later
 *   - Works as a integrity marker for form submissions
 */

import { getSessionStorage } from './auth-storage.mjs';

const CSRF_STORAGE_KEY = 'incredible-india-csrf-token';
const CSRF_FIELD_NAME = 'csrf_token';
const DEFAULT_TTL_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Generates a cryptographically random CSRF token (48 bytes → 96 hex chars).
 */
export function generateCSRFToken() {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    console.warn('[CSRF] crypto.getRandomValues not available; using fallback.');
    return fallbackToken();
  }
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fallbackToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Stores a CSRF token in sessionStorage with an expiry timestamp.
 */
export function storeCSRFToken(token, ttlMs = DEFAULT_TTL_MS) {
  const storage = getSessionStorage();
  if (!storage) return;
  try {
    const payload = JSON.stringify({
      token,
      exp: Date.now() + ttlMs
    });
    storage.setItem(CSRF_STORAGE_KEY, payload);
  } catch (error) {
    console.warn('[CSRF] Failed to store token:', error);
  }
}

/**
 * Retrieves the current CSRF token from sessionStorage.
 * Returns null if no token exists or if it has expired.
 */
export function getCSRFToken() {
  const storage = getSessionStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(CSRF_STORAGE_KEY);
    if (!raw) return null;
    const { token, exp } = JSON.parse(raw);
    if (Date.now() > exp) {
      storage.removeItem(CSRF_STORAGE_KEY);
      return null;
    }
    return token;
  } catch (error) {
    return null;
  }
}

/**
 * Ensures a valid CSRF token exists, generating a new one if needed.
 * Returns the active token string.
 */
export function ensureCSRFToken() {
  let token = getCSRFToken();
  if (!token) {
    token = generateCSRFToken();
    storeCSRFToken(token);
  }
  return token;
}

/**
 * Injects a hidden CSRF token field into the given form element.
 * If the field already exists, its value is updated in place.
 * Returns the hidden input element, or null if the form is invalid.
 */
export function injectCSRFToken(form) {
  if (!form || typeof form.querySelector !== 'function') {
    console.warn('[CSRF] injectCSRFToken: invalid form element');
    return null;
  }

  const token = ensureCSRFToken();
  let hidden = form.querySelector(`input[name="${CSRF_FIELD_NAME}"]`);

  if (!hidden) {
    hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = CSRF_FIELD_NAME;
    form.appendChild(hidden);
  }

  hidden.value = token;
  return hidden;
}

/**
 * Validates the CSRF token on a form against the stored token in sessionStorage.
 * Returns true if the token matches and is not expired, false otherwise.
 * On failure, removes the stale hidden field so the next inject generates fresh.
 */
export function validateCSRFToken(form) {
  if (!form || typeof form.querySelector !== 'function') {
    console.warn('[CSRF] validateCSRFToken: invalid form element');
    return false;
  }

  const submittedToken = form.querySelector(`input[name="${CSRF_FIELD_NAME}"]`)?.value;
  if (!submittedToken) {
    console.warn('[CSRF] No token field found on form');
    return false;
  }

  const stored = getCSRFToken();
  if (!stored) {
    console.warn('[CSRF] No stored token found (expired or missing)');
    const hidden = form.querySelector(`input[name="${CSRF_FIELD_NAME}"]`);
    if (hidden) hidden.remove();
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  if (!constantTimeEqual(submittedToken, stored)) {
    console.warn('[CSRF] Token mismatch — possible CSRF attack');
    return false;
  }

  // Token is valid. Rotate it so each submit consumes the token (one-time use).
  rotateCSRFToken();
  return true;
}

/**
 * Rotates the CSRF token by clearing the stored token so the next
 * injectCSRFToken() call generates a fresh one (one-time-use semantics).
 */
export function rotateCSRFToken() {
  const storage = getSessionStorage();
  if (!storage) return;
  try {
    storage.removeItem(CSRF_STORAGE_KEY);
  } catch (error) {
    // ignore
  }
}

/**
 * Clears the stored CSRF token (e.g. on sign-out).
 */
export function clearCSRFToken() {
  rotateCSRFToken();
}

/**
 * Constant-time string comparison to prevent timing side-channel attacks.
 */
function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
