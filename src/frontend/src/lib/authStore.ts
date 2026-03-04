import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./firebase";
import { request } from "./apiClient";

export const ADMIN_EMAIL = "surtaalsangeet9270@gmail.com";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course?: string;
  createdAt: number;
  isAdmin?: boolean;
};

let listenerInitialized = false;
let cachedUser: User | null = null;
let authReadyResolve: ((user: User | null) => void) | null = null;
const authReady = new Promise<User | null>((resolve) => {
  authReadyResolve = resolve;
});

/* =========================
   AUTH STATE SUBSCRIBERS
========================= */
type AuthListener = (user: User | null) => void;
const authListeners = new Set<AuthListener>();

function notifyListeners() {
  for (const listener of authListeners) {
    listener(cachedUser);
  }
}

/** Subscribe to auth state changes. Returns an unsubscribe function. */
export function onAuthUserChanged(listener: AuthListener): () => void {
  authListeners.add(listener);
  // Immediately fire with current state so the subscriber is in sync
  listener(cachedUser);
  return () => {
    authListeners.delete(listener);
  };
}

function firebaseUserToUser(firebaseUser: FirebaseUser): User {
  const email = firebaseUser.email ?? "";
  const createdAt = firebaseUser.metadata?.creationTime
    ? Date.parse(firebaseUser.metadata.creationTime)
    : Date.now();

  const user: User = {
    id: firebaseUser.uid,
    name:
      firebaseUser.displayName?.trim() ||
      email.split("@")[0] ||
      "Surtaal User",
    email,
    createdAt,
  };

  user.isAdmin = isAdmin(user);
  return user;
}

async function syncUserToMongo(user: User): Promise<void> {
  await request<User>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

/* =========================
   INITIALIZE AUTH
========================= */
export function initializeAuth(): Promise<User | null> {
  if (!listenerInitialized) {
    listenerInitialized = true;
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = firebaseUserToUser(firebaseUser);
        cachedUser = user;
        notifyListeners();
        void syncUserToMongo(user).catch((error) => {
          console.error("Failed to sync user to MongoDB", error);
        });
        authReadyResolve?.(user);
      } else {
        cachedUser = null;
        notifyListeners();
        authReadyResolve?.(null);
      }
    });
  }

  const immediate = getCurrentUser();
  if (immediate) {
    return Promise.resolve(immediate);
  }

  return authReady;
}

/* =========================
   GET CURRENT USER
========================= */
export function getCurrentUser(): User | null {
  if (cachedUser) return cachedUser;
  const current = auth.currentUser;
  if (current) {
    cachedUser = firebaseUserToUser(current);
    return cachedUser;
  }
  return null;
}

/* =========================
   CHECK ADMIN
========================= */
export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/* =========================
   SIGNUP (Firebase)
========================= */
export async function signup(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  course?: string;
}): Promise<User> {
  const cred = await createUserWithEmailAndPassword(
    auth,
    input.email.trim().toLowerCase(),
    input.password,
  );

  if (input.name.trim()) {
    await updateProfile(cred.user, { displayName: input.name.trim() });
  }

  const user = firebaseUserToUser(cred.user);
  cachedUser = user;
  notifyListeners();
  await syncUserToMongo(user).catch((error) => {
    console.error("Failed to sync user to MongoDB", error);
  });
  return user;
}

/* =========================
   LOGIN (Firebase)
========================= */
export async function login(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );

  const user = firebaseUserToUser(cred.user);
  cachedUser = user;
  notifyListeners();
  await syncUserToMongo(user).catch((error) => {
    console.error("Failed to sync user to MongoDB", error);
  });
  return user;
}

/* =========================
   LOGOUT
========================= */
export function logout(): void {
  cachedUser = null;
  notifyListeners();
  void signOut(auth);
}

/* =========================
   RESET PASSWORD
========================= */
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
}