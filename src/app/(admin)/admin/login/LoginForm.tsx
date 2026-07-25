"use client";

/**
 * Minimal admin sign-in. Email/password against Supabase Auth. On success the
 * session cookie is set and middleware lets the user into /admin. This is the
 * only admin UI in scope — the full dashboard is built separately.
 */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-c3-card border border-c3-border rounded-xl p-8"
      >
        <div className="font-disp text-4xl tracking-wide mb-1">
          CAT<span className="text-c3-yellow">3</span> ADMIN
        </div>
        <p className="text-c3-mid text-sm mb-6">Sign in to continue.</p>

        <label className="block text-c3-mid text-xs uppercase tracking-wide mb-1">
          Email
        </label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 bg-c3-dark border border-c3-border rounded-md px-3 py-2 text-c3-text outline-none focus:border-c3-yellow"
        />

        <label className="block text-c3-mid text-xs uppercase tracking-wide mb-1">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-5 bg-c3-dark border border-c3-border rounded-md px-3 py-2 text-c3-text outline-none focus:border-c3-yellow"
        />

        {error && <p className="text-c3-red text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-c3-yellow text-c3-black font-cond font-semibold uppercase tracking-wide rounded-md py-2.5 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
