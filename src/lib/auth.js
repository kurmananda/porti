import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

const COOKIE = "porti_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // one week, in seconds

function password() {
  return process.env.ADMIN_PASSWORD || "";
}

// The signing key is derived from the password, so changing it signs everyone out.
function sign(value) {
  return createHmac("sha256", `porti-session:${password()}`)
    .update(value)
    .digest("base64url");
}

function safeEqual(a, b) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isConfigured() {
  return password().length > 0;
}

export function checkPassword(candidate) {
  // Compare digests so the comparison is constant-time regardless of length.
  return isConfigured() && safeEqual(sign(`pw:${candidate}`), sign(`pw:${password()}`));
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !isConfigured()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !safeEqual(signature, sign(expires))) return false;
  // Expiry is checked against the clock, so this must never be prerendered.
  await connection();
  return Number(expires) > Date.now();
}

export async function startSession() {
  const expires = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
