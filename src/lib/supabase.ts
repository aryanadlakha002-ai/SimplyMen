/**
 * Supabase REST client — bypasses corporate firewall that blocks
 * PostgreSQL protocol (DPI) by using HTTPS on port 443 instead.
 *
 * Replaces Prisma for all DB operations.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}

// Single global client (service_role — full access, server-side only!)
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── Helper: generate cuid-like IDs ─────────────────────────────────
// Prisma uses cuid() for default IDs. We replicate a simple random ID.
export function cuid(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const segments = [
    "c", // cuid prefix
    Date.now().toString(36),
    Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join(""),
  ];
  return segments.join("");
}
