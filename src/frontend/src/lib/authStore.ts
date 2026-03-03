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

export const AUTH_STORAGE_KEY = "surtaal-auth-user";
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

/* =========================
   INITIALIZE AUTH
========================= */
export function initializeAuth(): Promise<User | null> {
  if (!listenerInitialized && typeof window !== "undefined") {
    listenerInitialized = true;
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = firebaseUserToUser(firebaseUser);
        saveUser(user);
      } else {
        logout();
      }
    });
  }

  return Promise.resolve(getCurrentUser());
}

/* =========================
   SAVE USER
========================= */
function saveUser(user: User): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

/* =========================
   GET CURRENT USER
========================= */
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as User;
    user.isAdmin = isAdmin(user);
    return user;
  } catch {
    return null;
  }
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
  saveUser(user);
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
  saveUser(user);
  return user;
}

/* =========================
   LOGOUT
========================= */
export function logout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  void signOut(auth);
}

/* =========================
   RESET PASSWORD
========================= */
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
}