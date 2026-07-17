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

/**
 * Generates a signed token that acts as a non-security integrity marker.
 * It uses Web Crypto SHA-256 digest on the client side (no secret keys needed).
 */
export async function generateSignedToken(payload) {
  const header = { alg: "SHA256", typ: "JWT" };
  const headerB64 = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(header)));
  const payloadB64 = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  
  const signInput = `${headerB64}.${payloadB64}`;
  
  // Calculate SHA-256 hash as an integrity marker
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(signInput));
  const integrityMarker = arrayBufferToBase64Url(hashBuffer);
  
  return `${signInput}.${integrityMarker}`;
}

/**
 * Verifies the integrity of a signed token using SHA-256.
 */
export async function verifySignedToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [headerB64, payloadB64, integrityMarker] = parts;
  try {
    const signInput = `${headerB64}.${payloadB64}`;
    
    // Recalculate SHA-256 hash to verify payload integrity
    const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(signInput));
    const expectedMarker = arrayBufferToBase64Url(hashBuffer);
    
    if (integrityMarker !== expectedMarker) {
      console.error("Token verification failed: Integrity marker mismatch");
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
