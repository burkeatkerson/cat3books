/**
 * Shared helpers for route handlers: admin gating, JSON responses, body
 * parsing, and uniform error handling.
 *
 * RLS already enforces that only admins can read/write CRM tables, but we also
 * gate at the edge so unauthenticated/forbidden callers get clean 401/403s
 * instead of empty result sets.
 */

import "server-only";
import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Thrown by handlers to short-circuit with a specific status. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function jsonError(status: number, message: string, extra?: unknown) {
  return NextResponse.json({ error: message, details: extra }, { status });
}

export function json<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

type AdminContext = {
  supabase: SupabaseClient;
  userId: string;
  email: string | undefined;
};

/**
 * Ensures the caller is a signed-in admin. Returns the RLS-bound client and the
 * user, or throws ApiError(401/403). Use inside a `route()`-wrapped handler.
 */
export async function requireAdmin(): Promise<AdminContext> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new ApiError(401, "Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") throw new ApiError(403, "Forbidden");

  return { supabase, userId: user.id, email: user.email };
}

/** Parse + validate a JSON request body against a Zod schema. */
export async function parseBody<T>(
  request: Request,
  schema: ZodSchema<T>,
): Promise<T> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    throw new ApiError(400, "Invalid JSON body");
  }
  return schema.parse(raw);
}

/**
 * Wraps a handler with consistent error translation:
 *   ZodError -> 400, ApiError -> its status, anything else -> 500.
 */
export function route<Args extends unknown[]>(
  handler: (request: Request, ...args: Args) => Promise<Response>,
) {
  return async (request: Request, ...args: Args): Promise<Response> => {
    try {
      return await handler(request, ...args);
    } catch (err) {
      if (err instanceof ZodError) {
        return jsonError(400, "Validation failed", err.flatten());
      }
      if (err instanceof ApiError) {
        return jsonError(err.status, err.message);
      }
      console.error("[api] Unhandled error:", err);
      return jsonError(500, "Internal server error");
    }
  };
}

/** Map a PostgREST error to an ApiError (used after supabase queries). */
export function assertOk(error: { message: string; code?: string } | null) {
  if (!error) return;
  // Unique violation -> 409, RLS/permission -> 403, otherwise 400.
  if (error.code === "23505") throw new ApiError(409, error.message);
  if (error.code === "42501") throw new ApiError(403, error.message);
  throw new ApiError(400, error.message);
}
