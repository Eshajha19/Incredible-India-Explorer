// auth.js
// SINGLE shared file — include this (+ firebase-config.js) on EVERY page.
//
// - On login.html: the elements below (authCard, tabLogin, authForm, etc.)
//   exist, so the full login/signup form logic runs.
// - On every other page: those elements are null, so that block is skipped
//   entirely, and only the navbar profile-dropdown logic runs.

import { auth, googleProvider, isFirebaseConfigured } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { authApi } from './auth-core.mjs';
import { injectCSRFToken, validateCSRFToken } from './csrf-protection.mjs';

// Expose core local auth functions to global window context for page scripts
if (typeof window !== 'undefined') {
  window.authLib = {
    getStoredAuthUser: authApi.getStoredAuthUser,
    verifyLocalSession: authApi.verifySession,
    upgradeLocalUserToPremium: authApi.upgradeLocalUserToPremium,
    signOutLocalUser: authApi.signOut,
    showSessionExpiredAlert
  };
}

// Where to send the user after a successful login/signup, and after logout.
const REDIRECT_URL = 'index.html';

// Configure Firebase persistence to browser session storage (cleared on tab close)
if (auth && isFirebaseConfigured) {
  setPersistence(auth, browserSessionPersistence).catch((error) => {
    console.error("Failed to set Firebase Auth persistence:", error);
  });
}

/* =========================================================================
   PART 1 — LOGIN / SIGNUP FORM LOGIC (only runs on login.html)
   ========================================================================= */

const authCard = document.getElementById('authCard');

if (authCard) {
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const welcomeText = document.getElementById('welcomeText');
  const switchText = document.getElementById('switchText');
  const switchModeBtn = document.getElementById('switchModeBtn');
  const submitBtn = document.getElementById('submitBtn');
  const authForm = document.getElementById('authForm');
  const authMsg = document.getElementById('authMsg');
  const btnGoogle = document.getElementById('btnGoogle');
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  // Inject CSRF token into the auth form
  injectCSRFToken(authForm);

  function setMode(mode) {
    authCard.setAttribute('data-mode', mode);
    clearMessage();

    if (mode === 'login') {
      tabLogin.classList.add('active');
      tabSignup.classList.remove('active');
      welcomeText.textContent = 'Welcome back! Please login to your account.';
      submitBtn.textContent = 'Login';
      switchText.textContent = "Don't have an account?";
      switchModeBtn.textContent = 'Sign Up';
    } else {
      tabSignup.classList.add('active');
      tabLogin.classList.remove('active');
      welcomeText.textContent = 'Create an account to get started.';
      submitBtn.textContent = 'Sign Up';
      switchText.textContent = 'Already have an account?';
      switchModeBtn.textContent = 'Login';
    }
  }

  tabLogin.addEventListener('click', () => setMode('login'));
  tabSignup.addEventListener('click', () => setMode('signup'));
  switchModeBtn.addEventListener('click', () => {
    const current = authCard.getAttribute('data-mode');
    setMode(current === 'login' ? 'signup' : 'login');
  });

  document.querySelectorAll('.toggle-eye').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  function showMessage(text, type = 'error') {
    authMsg.textContent = text;
    authMsg.className = `auth-msg ${type}`;
  }

  function clearMessage() {
    authMsg.textContent = '';
    authMsg.className = 'auth-msg';
  }

  function friendlyError(error) {
    const code = error.code || '';
    const map = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-credential': 'Incorrect email or password.',
      'auth/email-already-in-use': 'An account already exists with this email.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/configuration-not-found': 'Authentication is currently unavailable. Please check the Firebase configuration.',
      'auth/invalid-api-key': 'Authentication is currently unavailable. Please check the Firebase configuration.',
      'auth/network-request-failed': 'Network error. Please check your connection and try again.'
    };
    return map[code] || 'Something went wrong. Please try again.';
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnGoogle.disabled = isLoading;
  }

  function ensureAuthReady() {
    if (auth && googleProvider && isFirebaseConfigured) {
      return true;
    }
    return true;
  }

  async function handleAuthSubmit(mode, email, password, name = '') {
    if (!ensureAuthReady()) {
      return;
    }

    try {
      setLoading(true);

      if (auth && googleProvider && isFirebaseConfigured) {
        if (mode === 'signup') {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(cred.user, { displayName: name });
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
      } else {
        if (mode === 'signup') {
          await authApi.registerLocal({ email, password, displayName: name });
        } else {
          await authApi.signInLocal({ email, password });
        }
      }

      showMessage('Authentication successful! Redirecting...', 'success');
      
      // Parse redirect parameter to return back to protected page
      const params = new URLSearchParams(window.location.search);
      const targetRedirect = params.get('redirect') || REDIRECT_URL;
      
      setTimeout(() => (window.location.href = targetRedirect), 800);
    } catch (error) {
      showMessage(friendlyError(error));
    } finally {
      setLoading(false);
    }
  }

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    // Validate CSRF token before processing form
    if (!validateCSRFToken(authForm)) {
      showMessage('Session expired. Please reload the page and try again.');
      // Re-inject a fresh token for the next attempt
      injectCSRFToken(authForm);
      return;
    }

    const mode = authCard.getAttribute('data-mode');
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (mode === 'signup') {
      const name = fullNameInput.value.trim();
      const confirmPassword = confirmPasswordInput.value;

      if (!name) {
        showMessage('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        showMessage('Passwords do not match.');
        return;
      }

      if (!ensureAuthReady()) {
        return;
      }

      try {
        await handleAuthSubmit('signup', email, password, name);
      } catch (error) {
        showMessage(friendlyError(error));
      }
    } else {
      if (!ensureAuthReady()) {
        return;
      }

      try {
        await handleAuthSubmit('login', email, password);
      } catch (error) {
        showMessage(friendlyError(error));
      }
    }
  });

  btnGoogle.addEventListener('click', async () => {
    clearMessage();
    if (!ensureAuthReady()) {
      return;
    }

    try {
      setLoading(true);
      if (auth && googleProvider && isFirebaseConfigured) {
        await signInWithPopup(auth, googleProvider);
      } else {
        await authApi.signInWithLocalGoogle();
      }
      showMessage('Login successful! Redirecting...', 'success');
      
      const params = new URLSearchParams(window.location.search);
      const targetRedirect = params.get('redirect') || REDIRECT_URL;
      
      setTimeout(() => (window.location.href = targetRedirect), 800);
    } catch (error) {
      showMessage(friendlyError(error));
    } finally {
      setLoading(false);
    }
  });

  forgotPasswordBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if (!email) {
      showMessage('Enter your email above first, then click "Forgot Password?".');
      return;
    }
    if (!ensureAuthReady()) {
      return;
    }
    try {
      if (auth && isFirebaseConfigured) {
        await sendPasswordResetEmail(auth, email);
        showMessage('Password reset email sent! Check your inbox.', 'success');
      } else {
        showMessage('Password reset is available once Firebase is configured.', 'success');
      }
    } catch (error) {
      showMessage(friendlyError(error));
    }
  });
}

/* =========================================================================
   PART 2 — NAVBAR PROFILE DROPDOWN (runs on every page, including login.html)
   ========================================================================= */

function injectNavAuthStyles() {
  if (document.getElementById('nav-auth-styles')) return;

  const style = document.createElement('style');
  style.id = 'nav-auth-styles';
  style.textContent = `
    .profile-dropdown {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .profile-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 176, 31, 0.08);
      border: 1px solid rgba(255, 176, 31, 0.3);
      border-radius: 999px;
      padding: 5px 14px 5px 5px;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      color: inherit;
    }
    .profile-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, hsl(27,100%,55%), hsl(43,85%,52%));
      color: #12141c;
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .profile-name {
      font-size: 0.88rem;
      font-weight: 500;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .profile-caret {
      width: 10px;
      height: 10px;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: rotate(45deg);
      margin-top: -3px;
      transition: transform 0.2s;
      opacity: 0.7;
    }
    .profile-dropdown.open .profile-caret {
      transform: rotate(-135deg);
      margin-top: 3px;
    }
    .profile-menu {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      min-width: 190px;
      background: hsl(222, 35%, 12%);
      border: 1px solid rgba(255, 176, 31, 0.25);
      border-radius: 12px;
      box-shadow: 0 20px 45px rgba(0,0,0,0.5);
      padding: 8px;
      display: none;
      z-index: 999;
    }
    .profile-dropdown.open .profile-menu {
      display: block;
    }
    .profile-menu-email {
      padding: 8px 10px 10px;
      font-size: 0.75rem;
      color: hsl(215, 20%, 65%);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      margin-bottom: 6px;
      word-break: break-all;
    }
    .profile-menu-btn {
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      color: hsl(210, 40%, 98%);
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      padding: 9px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .profile-menu-btn:hover {
      background: rgba(255, 176, 31, 0.12);
      color: hsl(43, 85%, 52%);
    }
  `;
  document.head.appendChild(style);
}

function buildProfileDropdown(user) {
  const name = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
  const initial = name.charAt(0).toUpperCase();

  const wrapper = document.createElement('div');
  wrapper.className = 'profile-dropdown';
  wrapper.id = 'profileDropdown';
  wrapper.innerHTML = `
    <button class="profile-trigger" type="button" id="profileTrigger">
      <span class="profile-avatar">${initial}</span>
      <span class="profile-name">${name}</span>
      <span class="profile-caret"></span>
    </button>
    <div class="profile-menu">
      <div class="profile-menu-email">${user.email || ''}</div>
      <button class="profile-menu-btn" id="logoutBtn" type="button">Logout</button>
    </div>
  `;

  wrapper.querySelector('#profileTrigger').addEventListener('click', (e) => {
    e.stopPropagation();
    wrapper.classList.toggle('open');
  });

  wrapper.querySelector('#logoutBtn').addEventListener('click', async () => {
    if (auth && isFirebaseConfigured) {
      await signOut(auth);
    } else {
      authApi.signOut();
    }
    handleNavAuthState(null);
    window.location.href = REDIRECT_URL;
  });

  document.addEventListener('click', () => wrapper.classList.remove('open'));

  return wrapper;
}

function handleNavAuthState(user) {
  const loginLink = document.getElementById('link-login');
  const existingDropdown = document.getElementById('profileDropdown');

  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (!existingDropdown) {
      injectNavAuthStyles();
      const dropdown = buildProfileDropdown(user);
      if (loginLink && loginLink.parentNode) {
        loginLink.parentNode.insertBefore(dropdown, loginLink.nextSibling);
      } else {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) navMenu.appendChild(dropdown);
      }
    }
  } else {
    if (loginLink) loginLink.style.display = '';
    if (existingDropdown) existingDropdown.remove();
  }
}

/* =========================================================================
   PART 3 — CENTRALIZED SESSION VERIFICATION & GATE
   ========================================================================= */

// Displays a premium dark-mode notification when session expires
function showSessionExpiredAlert() {
  if (document.getElementById('session-expired-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'session-expired-modal';
  modal.className = 'session-expired-modal';
  modal.innerHTML = `
    <div class="session-expired-backdrop"></div>
    <div class="session-expired-content">
      <div class="expired-icon">⏳</div>
      <h2>Session Expired</h2>
      <p>Your security session has expired or is invalid. Please log in again to restore access.</p>
      <button id="expiredLoginBtn" class="btn-expired-login">Log In Again</button>
    </div>
  `;

  if (!document.getElementById('session-expired-styles')) {
    const style = document.createElement('style');
    style.id = 'session-expired-styles';
    style.textContent = `
      .session-expired-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: 'Outfit', sans-serif;
      }
      .session-expired-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 22, 0.85);
        backdrop-filter: blur(12px);
      }
      .session-expired-content {
        position: relative;
        background: hsl(222, 35%, 11%);
        border: 1px solid rgba(255, 176, 31, 0.3);
        border-radius: 20px;
        padding: 35px 30px;
        width: 90%;
        max-width: 420px;
        text-align: center;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        animation: modalFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
      @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      .expired-icon {
        font-size: 3rem;
        margin-bottom: 15px;
      }
      .session-expired-content h2 {
        color: #ffffff;
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .session-expired-content p {
        color: hsl(215, 20%, 65%);
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 25px;
      }
      .btn-expired-login {
        width: 100%;
        padding: 13px;
        background: linear-gradient(135deg, hsl(27,100%,55%) 0%, hsl(43,85%,52%) 100%);
        border: none;
        border-radius: 10px;
        color: #12141c;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
      }
      .btn-expired-login:hover {
        transform: translateY(-1px);
        filter: brightness(1.08);
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.querySelector('#expiredLoginBtn').addEventListener('click', () => {
    authApi.signOut();
    document.body.style.overflow = '';
    modal.remove();
    window.location.href = `login.html?redirect=premium.html`;
  });
}

// Binds premium claims checking and sets page data attributes dynamically
export function updatePremiumUI(user) {
  const isPremiumPage = window.location.pathname.includes('premium.html');
  const isPremium = user && user.role === 'premium';

  if (isPremium) {
    document.body.setAttribute('data-premium-status', 'unlocked');
  } else {
    document.body.setAttribute('data-premium-status', 'locked');
  }

  if (isPremiumPage) {
    window.dispatchEvent(new CustomEvent('incredible-india:premium-status-change', {
      detail: { user, isPremium }
    }));
  }
}

// Centralized validator for checkRouteAccess checks
export async function validateSessionAndRole() {
  if (auth && isFirebaseConfigured) {
    const user = auth.currentUser;
    if (user) {
      try {
        const tokenResult = await user.getIdTokenResult();
        const role = tokenResult.claims.role || (tokenResult.claims.premium ? 'premium' : 'free');
        updatePremiumUI({ ...user, role });
      } catch (e) {
        updatePremiumUI({ ...user, role: 'free' });
      }
    } else {
      updatePremiumUI(null);
    }
    return;
  }

  const storedUser = authApi.getStoredAuthUser();
  if (storedUser) {
    const verifiedUser = await authApi.verifySession();
    if (!verifiedUser) {
      showSessionExpiredAlert();
    } else {
      updatePremiumUI(verifiedUser);
    }
  } else {
    updatePremiumUI(null);
  }
}

if (typeof window !== 'undefined') {
  window.authLib.validateSessionAndRole = validateSessionAndRole;
}

/* =========================================================================
   PART 4 — SINGLE AUTH STATE LISTENER (drives the flows above)
   ========================================================================= */

if (auth && isFirebaseConfigured) {
  onAuthStateChanged(auth, async (user) => {
    if (authCard && user) {
      const params = new URLSearchParams(window.location.search);
      const targetRedirect = params.get('redirect') || REDIRECT_URL;
      window.location.href = targetRedirect;
      return;
    }
    handleNavAuthState(user);

    if (user) {
      try {
        const tokenResult = await user.getIdTokenResult();
        const role = tokenResult.claims.role || (tokenResult.claims.premium ? 'premium' : 'free');
        updatePremiumUI({ ...user, role });
      } catch (e) {
        updatePremiumUI({ ...user, role: 'free' });
      }
    } else {
      updatePremiumUI(null);
    }
  });
} else {
  // Executed for local auth session checks
  const initLocalAuthCheck = async () => {
    const localUser = await authApi.verifySession();
    handleNavAuthState(localUser);

    if (authCard && localUser) {
      const params = new URLSearchParams(window.location.search);
      const targetRedirect = params.get('redirect') || REDIRECT_URL;
      window.location.href = targetRedirect;
      return;
    }
    updatePremiumUI(localUser);
  };
  initLocalAuthCheck();

  authApi.subscribeToAuthChanges((user) => {
    handleNavAuthState(user);
    updatePremiumUI(user);
  });
}
