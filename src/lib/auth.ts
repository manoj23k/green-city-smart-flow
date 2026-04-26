// Lightweight client-only auth + demo accounts (V1 — backend wiring next round)
export type Role = "user" | "driver" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  points?: number;
}

const STORAGE_KEY = "swm_auth_user";

export const DEMO_ACCOUNTS: Record<Role, AuthUser> = {
  user: {
    id: "u_demo",
    name: "Aarav Sharma",
    email: "citizen@demo.com",
    role: "user",
    points: 1250,
  },
  driver: {
    id: "d_demo",
    name: "Ravi Kumar",
    email: "driver@demo.com",
    role: "driver",
  },
  admin: {
    id: "a_demo",
    name: "City Admin",
    email: "admin@demo.com",
    role: "admin",
  },
};

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("swm-auth-change"));
}

export function loginDemo(role: Role): AuthUser {
  const u = DEMO_ACCOUNTS[role];
  setCurrentUser(u);
  return u;
}

export function loginWithCredentials(
  email: string,
  _password: string,
  role: Role,
): AuthUser {
  // V1: accept any credentials, role-stamped
  const base =
    DEMO_ACCOUNTS[role] ??
    ({ id: `${role}_${Date.now()}`, name: email.split("@")[0], email, role } as AuthUser);
  const user: AuthUser = { ...base, email };
  setCurrentUser(user);
  return user;
}

export function logout() {
  setCurrentUser(null);
}

export function dashboardPathFor(role: Role): string {
  if (role === "driver") return "/driver";
  if (role === "admin") return "/admin";
  return "/user";
}
