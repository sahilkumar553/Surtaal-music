export const AUTH_STORAGE_KEY = "surtaal-auth-user";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course?: string;
  createdAt: number;
};

type StoredUser = Partial<User> & {
  password?: string;
};

function saveUser(user: User): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function signup(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  course?: string;
}): User {
  // Check if user already exists
  if (typeof window !== "undefined") {
    const users = getUsersDatabase();
    if (users.some((u) => u.email === input.email)) {
      throw new Error("Email already registered");
    }
  }

  const newUser: User = {
    id: globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim(),
    course: input.course?.trim(),
    createdAt: Date.now(),
  };

  // Store in users database (for demo purposes, using localStorage)
  if (typeof window !== "undefined") {
    const users = getUsersDatabase();
    const userWithPassword: StoredUser = { ...newUser, password: input.password };
    users.push(userWithPassword);
    window.localStorage.setItem("surtaal-users-db", JSON.stringify(users));
  }

  saveUser(newUser);
  return newUser;
}

export function login(email: string, password: string): User {
  if (typeof window === "undefined") {
    throw new Error("Cannot login on server");
  }

  const users = getUsersDatabase();
  const user = users.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const loggedInUser: User = {
    id: user.id!,
    name: user.name!,
    email: user.email!,
    phone: user.phone,
    course: user.course,
    createdAt: user.createdAt!,
  };

  saveUser(loggedInUser);
  return loggedInUser;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getUsersDatabase(): StoredUser[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem("surtaal-users-db");
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}
