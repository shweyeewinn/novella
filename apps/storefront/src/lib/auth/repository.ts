import { readJsonStore, writeJsonStore } from "@/lib/data/jsonStore";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { normalizeShippingAddress } from "@/lib/auth/shipping";
import { emptyShippingAddress } from "@/types/auth";
import type { ShippingAddress, StoredUser, User } from "@/types/auth";

const STORE = "users";

type UsersFile = { users: StoredUser[] };

async function load(): Promise<StoredUser[]> {
  const data = await readJsonStore<UsersFile>(STORE, { users: [] });
  return data.users;
}

async function save(users: StoredUser[]) {
  await writeJsonStore<UsersFile>(STORE, { users });
}

function toPublicUser(user: StoredUser): User {
  const { passwordHash: _p, shipping, ...rest } = user;
  return {
    ...rest,
    shipping: normalizeShippingAddress(shipping),
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  const normalized = normalizeEmail(email);
  if (!normalized || password.length < 6) {
    return { ok: false, error: "Enter a valid email and password (6+ characters)." };
  }
  if (!name.trim()) {
    return { ok: false, error: "Please enter your name." };
  }

  const users = await load();
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const user: StoredUser = {
    id: `usr_${Date.now().toString(36)}`,
    email: normalized,
    name: name.trim(),
    passwordHash: hashPassword(password),
    shipping: emptyShippingAddress(),
    createdAt: new Date().toISOString(),
  };
  await save([...users, user]);
  return { ok: true, user: toPublicUser(user) };
}

/** Create or replace password for an existing email (admin / seed only). */
export async function upsertUserByEmail(input: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const normalized = normalizeEmail(input.email);
  const users = await load();
  const idx = users.findIndex((u) => u.email === normalized);
  const passwordHash = hashPassword(input.password);

  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      name: input.name.trim(),
      passwordHash,
    };
    await save(users);
    return toPublicUser(users[idx]);
  }

  const user: StoredUser = {
    id: `usr_${Date.now().toString(36)}`,
    email: normalized,
    name: input.name.trim(),
    passwordHash,
    shipping: emptyShippingAddress(),
    createdAt: new Date().toISOString(),
  };
  await save([...users, user]);
  return toPublicUser(user);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  const normalized = normalizeEmail(email);
  const users = await load();
  const match = users.find((u) => u.email === normalized);
  if (!match || !verifyPassword(password, match.passwordHash)) {
    return { ok: false, error: "Email or password is incorrect." };
  }
  return { ok: true, user: toPublicUser(match) };
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await load();
  const user = users.find((u) => u.id === id);
  return user ? toPublicUser(user) : null;
}

export async function updateUserShipping(
  id: string,
  shipping: ShippingAddress
): Promise<User | null> {
  const users = await load();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) return null;
  users[idx] = { ...users[idx], shipping };
  await save(users);
  return toPublicUser(users[idx]);
}

export async function updateUserName(id: string, name: string): Promise<User | null> {
  const users = await load();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) return null;
  users[idx] = { ...users[idx], name: name.trim() };
  await save(users);
  return toPublicUser(users[idx]);
}
