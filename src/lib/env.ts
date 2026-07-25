/**
 * Centralized, validated access to environment variables.
 *
 * `serverEnv()` throws if a required server-only secret is missing so failures
 * surface loudly at the call site rather than as silent `undefined`s deep in an
 * integration. Public (`NEXT_PUBLIC_*`) values are read directly since they are
 * inlined at build time and safe in the browser.
 */

import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. See .env.local.example.`,
    );
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

/** Server-only secrets. Never import this into a client component. */
export const serverEnv = {
  get supabaseUrl() {
    return required("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabaseAnonKey() {
    return required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  get supabaseServiceRoleKey() {
    return required("SUPABASE_SERVICE_ROLE_KEY");
  },
  get tokenEncryptionKey() {
    return required("TOKEN_ENCRYPTION_KEY");
  },
  get cronSecret() {
    return required("CRON_SECRET");
  },
  get unsubscribeSecret() {
    return required("UNSUBSCRIBE_SECRET");
  },
  get adminEmail() {
    return required("ADMIN_EMAIL");
  },
  // QuickBooks
  get qboClientId() {
    return required("QBO_CLIENT_ID");
  },
  get qboClientSecret() {
    return required("QBO_CLIENT_SECRET");
  },
  get qboRedirectUri() {
    return required("QBO_REDIRECT_URI");
  },
  get qboEnvironment() {
    return (optional("QBO_ENVIRONMENT") ?? "sandbox") as "sandbox" | "production";
  },
  get qboScopes() {
    return optional("QBO_SCOPES") ?? "com.intuit.quickbooks.accounting";
  },
  // Gmail
  get googleClientId() {
    return required("GOOGLE_CLIENT_ID");
  },
  get googleClientSecret() {
    return required("GOOGLE_CLIENT_SECRET");
  },
  get googleRefreshToken() {
    return required("GOOGLE_REFRESH_TOKEN");
  },
  get gmailSender() {
    return required("GMAIL_SENDER");
  },
} as const;

// Re-export public config for convenience on the server. Client/edge code
// should import from "@/lib/public-env" directly to avoid the server-only mark.
export { publicEnv } from "@/lib/public-env";
