"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyShippingAddress, type ShippingAddress, type User } from "@/features/auth/types";

type StoredUser = User & { password: string };

type AuthState = {
  users: StoredUser[];
  sessionUserId: string | null;
  signup: (
    name: string,
    email: string,
    password: string
  ) => { ok: true } | { ok: false; error: string };
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateProfile: (patch: { name?: string }) => void;
  updateShipping: (shipping: ShippingAddress) => void;
  getCurrentUser: () => User | null;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toPublicUser({ password: _password, ...publicUser }: StoredUser): User {
  void _password;
  return publicUser;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      sessionUserId: null,

      signup: (name, email, password) => {
        const normalized = normalizeEmail(email);
        if (!normalized || !password || password.length < 6) {
          return { ok: false, error: "Enter a valid email and password (6+ characters)." };
        }
        if (!name.trim()) {
          return { ok: false, error: "Please enter your name." };
        }
        if (get().users.some((u) => u.email === normalized)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const user: StoredUser = {
          id: `usr_${Date.now().toString(36)}`,
          email: normalized,
          name: name.trim(),
          password,
          shipping: emptyShippingAddress(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          users: [...state.users, user],
          sessionUserId: user.id,
        }));
        return { ok: true };
      },

      login: (email, password) => {
        const normalized = normalizeEmail(email);
        const user = get().users.find((u) => u.email === normalized && u.password === password);
        if (!user) {
          return { ok: false, error: "Email or password is incorrect." };
        }
        set({ sessionUserId: user.id });
        return { ok: true };
      },

      logout: () => set({ sessionUserId: null }),

      updateProfile: (patch) => {
        const id = get().sessionUserId;
        if (!id) return;
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...patch, name: patch.name?.trim() ?? u.name } : u
          ),
        }));
      },

      updateShipping: (shipping) => {
        const id = get().sessionUserId;
        if (!id) return;
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, shipping } : u)),
        }));
      },

      getCurrentUser: () => {
        const id = get().sessionUserId;
        if (!id) return null;
        const user = get().users.find((u) => u.id === id);
        return user ? toPublicUser(user) : null;
      },
    }),
    { name: "novella-auth" }
  )
);

export function useCurrentUser(): User | null {
  const sessionUserId = useAuthStore((s) => s.sessionUserId);
  const users = useAuthStore((s) => s.users);
  if (!sessionUserId) return null;
  const user = users.find((u) => u.id === sessionUserId);
  return user ? toPublicUser(user) : null;
}
