import { defaultUsers } from "../data/catalog";

const USERS_STORAGE_KEY = "joy-snack-users";
const SESSION_STORAGE_KEY = "joy-snack-session";

const encoder = new TextEncoder();

const loadStoredValue = (key, fallback) => {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
};

const saveStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
};

const randomSalt = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join(
    "",
  );
};

const hashPassword = async (password, salt) => {
  const payload = encoder.encode(`${salt}:${password}`);
  const buffer = await crypto.subtle.digest("SHA-256", payload);
  return Array.from(new Uint8Array(buffer), (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
};

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const { passwordHash: _passwordHash, passwordSalt: _passwordSalt, ...safeUser } = user;
  return safeUser;
};

const normalizeUsers = (users) =>
  users.map((user) => ({
    status: "active",
    role: "customer",
    ...user,
  }));

const persistUsers = (users) => {
  saveStoredValue(USERS_STORAGE_KEY, users);
  return users;
};

const ensureAdminSeed = async () => {
  const storedUsers = normalizeUsers(
    loadStoredValue(USERS_STORAGE_KEY, defaultUsers),
  );
  const adminEmail = "ama@joysnack.com";
  const hasSeededAdmin = storedUsers.some(
    (user) =>
      user.email?.toLowerCase() === adminEmail &&
      user.passwordHash &&
      user.passwordSalt,
  );

  if (hasSeededAdmin) {
    return storedUsers;
  }

  const adminSalt = randomSalt();
  const adminPassword = "JoySnackAdmin123!";
  const adminHash = await hashPassword(adminPassword, adminSalt);

  const usersWithSeededAdmin = storedUsers.map((user) =>
    user.email?.toLowerCase() === adminEmail
      ? {
          ...user,
          role: "admin",
          status: "active",
          passwordSalt: adminSalt,
          passwordHash: adminHash,
        }
      : user,
  );

  return persistUsers(usersWithSeededAdmin);
};

const getUsers = async () => {
  const users = await ensureAdminSeed();
  return normalizeUsers(users);
};

const findUserByEmail = async (email) => {
  const users = await getUsers();
  return (
    users.find(
      (user) => user.email?.toLowerCase() === email.trim().toLowerCase(),
    ) ?? null
  );
};

const writeSession = (user) => {
  const session = {
    user: sanitizeUser(user),
    token: crypto.randomUUID(),
    authenticatedAt: new Date().toISOString(),
  };

  saveStoredValue(SESSION_STORAGE_KEY, session);
  return session;
};

export const authService = {
  getSession() {
    const session = loadStoredValue(SESSION_STORAGE_KEY, null);
    return session?.user ? session : null;
  },

  async refreshSession() {
    const currentSession = this.getSession();
    if (!currentSession?.user?.email) {
      return null;
    }

    const user = await findUserByEmail(currentSession.user.email);
    if (!user || user.status !== "active") {
      this.signOut();
      return null;
    }

    return writeSession(user);
  },

  async signUp({ fullName, email, phone, password }) {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const users = await getUsers();
    const passwordSalt = randomSalt();
    const passwordHash = await hashPassword(password, passwordSalt);
    const nextId =
      users.reduce((maxId, user) => Math.max(maxId, Number(user.id) || 0), 0) +
      1;

    const newUser = {
      id: nextId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      role: "customer",
      status: "active",
      joinedAt: new Date().toISOString().slice(0, 10),
      passwordSalt,
      passwordHash,
    };

    persistUsers([...users, newUser]);
    return writeSession(newUser);
  },

  async signIn({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user || !user.passwordHash || !user.passwordSalt) {
      throw new Error("Invalid email or password.");
    }

    if (user.status !== "active") {
      throw new Error("This account is not active. Please contact support.");
    }

    const passwordHash = await hashPassword(password, user.passwordSalt);
    if (passwordHash !== user.passwordHash) {
      throw new Error("Invalid email or password.");
    }

    return writeSession(user);
  },

  signOut() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  },
};

export const authHelpers = {
  sanitizeUser,
};
