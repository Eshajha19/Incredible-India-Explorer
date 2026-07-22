import { 
  registerLocalUser, 
  signInLocalUser, 
  signInWithLocalGoogle, 
  upgradeLocalUserToPremium 
} from './auth-local-users.mjs';

import { 
  getStoredAuthUser, 
  clearStoredAuthUser, 
  verifyLocalSession, 
  subscribeToLocalAuth 
} from './auth-session.mjs';

// Unified clear module API surface
export const authApi = {
  registerLocal: registerLocalUser,
  signInLocal: signInLocalUser,
  signOut: () => {
    clearStoredAuthUser();
  },
  verifySession: verifyLocalSession,
  subscribeToAuthChanges: subscribeToLocalAuth,
  
  // Additional utility methods exposed on the surface
  getStoredAuthUser,
  signInWithLocalGoogle,
  upgradeLocalUserToPremium
};

// Legacy individual exports for robust backward compatibility
export {
  getStoredAuthUser,
  registerLocalUser,
  signInLocalUser,
  signInWithLocalGoogle,
  upgradeLocalUserToPremium,
  verifyLocalSession,
  subscribeToLocalAuth
};

export function signOutLocalUser() {
  clearStoredAuthUser();
}
