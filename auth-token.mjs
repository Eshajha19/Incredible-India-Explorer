// Base64Url Encoding Helpers for Web Crypto signatures
export function arrayBufferToBase64Url(buffer) {
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

export function base64UrlToArrayBuffer(base64Url) {
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

let cachedKey = null;

export function _resetSigningKey() {
  cachedKey = null;
}

async function getSigningKey() {
  if (cachedKey) return cachedKey;

  const keyStorageKey = 'incredible-india-auth-signing-secret';
  let rawSecret = null;
  
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      rawSecret = window.localStorage.getItem(keyStorageKey);
    } catch (e) {}
  }

  if (!rawSecret) {
    const array = new Uint8Array(32);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    rawSecret = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(keyStorageKey, rawSecret);
      } catch (e) {}
    }
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(rawSecret);
  
  cachedKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
  
  return cachedKey;
}

/**
 * Generates a signed token that acts as a secure integrity marker.
 * It uses Web Crypto HMAC-SHA256 signature with a locally-stored secret.
 */
export async function generateSignedToken(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(header)));
  const payloadB64 = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  
  const signInput = `${headerB64}.${payloadB64}`;
  const key = await getSigningKey();
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signInput)
  );
  const signature = arrayBufferToBase64Url(signatureBuffer);
  
  return `${signInput}.${signature}`;
}

/**
 * Verifies the integrity of a signed token using HMAC-SHA256.
 */
export async function verifySignedToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [headerB64, payloadB64, signature] = parts;
  try {
    const signInput = `${headerB64}.${payloadB64}`;
    const key = await getSigningKey();
    const signatureBuffer = base64UrlToArrayBuffer(signature);
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      new TextEncoder().encode(signInput)
    );
    
    if (!isValid) {
      console.error("Token verification failed: Signature mismatch");
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
