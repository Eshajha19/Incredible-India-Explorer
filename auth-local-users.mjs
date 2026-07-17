import { 
  getStoredAccounts, 
  saveAccounts, 
  normalizeEmail, 
  hashPassword 
} from './auth-storage.mjs';
import { 
  createSessionUser, 
  persistAuthUser 
} from './auth-session.mjs';

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
