#!/usr/bin/env node
/**
 * Create or update a storefront user in apps/storefront/.data/users.json
 *
 * Usage (from apps/storefront):
 *   npm run seed:user
 *   SEED_USER_EMAIL=you@example.com SEED_USER_PASSWORD=secret npm run seed:user
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import { randomBytes, scryptSync } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storefrontRoot = path.resolve(__dirname, "..");
const dataDir = path.join(storefrontRoot, ".data");
const usersFile = path.join(dataDir, "users.json");

const KEY_LEN = 64;

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LEN);
  return `${salt}:${hash.toString("hex")}`;
}

function emptyShipping() {
  return {
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "Myanmar",
  };
}

async function main() {
  const name = process.env.SEED_USER_NAME?.trim() || "Novella Demo";
  const email = (process.env.SEED_USER_EMAIL?.trim() || "demo@novella.local").toLowerCase();
  const password = process.env.SEED_USER_PASSWORD || "novella-demo";

  if (password.length < 6) {
    console.error("SEED_USER_PASSWORD must be at least 6 characters.");
    process.exit(1);
  }

  await mkdir(dataDir, { recursive: true });

  let users = [];
  try {
    const raw = await readFile(usersFile, "utf8");
    users = JSON.parse(raw).users ?? [];
  } catch {
    users = [];
  }

  const idx = users.findIndex((u) => u.email === email);
  const passwordHash = hashPassword(password);
  const now = new Date().toISOString();

  if (idx >= 0) {
    users[idx] = { ...users[idx], name, passwordHash };
    console.log(`Updated user: ${email}`);
  } else {
    users.push({
      id: `usr_${Date.now().toString(36)}`,
      email,
      name,
      passwordHash,
      shipping: emptyShipping(),
      createdAt: now,
    });
    console.log(`Created user: ${email}`);
  }

  await writeFile(usersFile, JSON.stringify({ users }, null, 2), "utf8");

  console.log("\nLog in at http://localhost:3000/login");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log("\n(Override with SEED_USER_EMAIL, SEED_USER_PASSWORD, SEED_USER_NAME)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
