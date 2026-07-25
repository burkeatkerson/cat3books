# Cat3 Books — Admin / CRM Backend Setup

This backend adds an admin section, in-house CRM, segmentation, email campaigns +
drip automation, QuickBooks-backed client financials, and token-gated client
dashboards to the existing marketing site. It is backend/API-first; the only
admin UI shipped is a login page + a stub at `/admin`.

> Architecture & data-model rationale: `.claude/plans/cached-stargazing-bubble.md`.

---

## 1. Prerequisites

- A Supabase project (Postgres + Auth).
- An Intuit developer account + QuickBooks Online app (for client financials).
- A Google Workspace account + a Google Cloud OAuth client (for sending email).
- Node 20+ (uses `node --env-file`).

Copy `.env.local.example` → `.env.local` and fill values as you go below.

---

## 2. Supabase

1. Create the project; from **Project Settings → API** copy into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
     `SUPABASE_SERVICE_ROLE_KEY` (keep the service-role key server-side only).
2. Apply the migrations in `supabase/migrations/` **in filename order**. Either:
   - Supabase CLI: `supabase link` then `supabase db push`, or
   - paste each file into the SQL editor in order.
3. Create your admin user (**Authentication → Users → Add user**, email +
   password = `ADMIN_EMAIL`). A `profiles` row is auto-created as `client`;
   promote it once:
   ```sql
   update public.profiles set role = 'admin' where email = 'you@cat3books.com';
   ```
4. Sign in at `/admin/login`. You should reach the `/admin` stub.

RLS note: every table is created with RLS on and an admin-only policy, so the
anon/public surface is closed by default. The public client dashboard is exposed
only through the `get_dashboard_by_token` function (DB-enforced isolation).

---

## 3. Token encryption key

QuickBooks tokens are AES-256-GCM encrypted at rest. Generate a 32-byte key:
```bash
openssl rand -base64 32
```
Set it as `TOKEN_ENCRYPTION_KEY`. Also generate `CRON_SECRET` and
`UNSUBSCRIBE_SECRET`:
```bash
openssl rand -hex 32
```

---

## 4. Gmail API (sending)

1. Google Cloud Console → enable the **Gmail API**.
2. Create an **OAuth client** (type: Web). Add `GOOGLE_REDIRECT_URI` as an
   authorized redirect (e.g. `http://localhost:3000/api/auth/google/callback`,
   or the OAuth Playground redirect — see below). Copy client id/secret into
   `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
3. Mint a **refresh token** for the sending mailbox (`GMAIL_SENDER`), scope
   `https://www.googleapis.com/auth/gmail.send`. Easiest path:
   [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) → gear →
   "Use your own OAuth credentials" → authorize the Gmail send scope as the
   Workspace user → exchange for tokens → copy the refresh token into
   `GOOGLE_REFRESH_TOKEN`.
4. Set `GMAIL_SENDER` to the From address.

The provider is swappable: implement `EmailProvider` in `src/lib/email/` and
change the binding in `src/lib/email/index.ts`; campaign logic is untouched.

---

## 5. QuickBooks Online

1. Intuit Developer → create an app → **Accounting** scope.
2. Add `QBO_REDIRECT_URI` (e.g. `http://localhost:3000/api/quickbooks/callback`)
   to the app's Redirect URIs (must match exactly).
3. Copy keys: `QBO_CLIENT_ID`, `QBO_CLIENT_SECRET`. Set `QBO_ENVIRONMENT`
   (`sandbox` while testing). `QBO_SCOPES` defaults to accounting.
4. Connect a client: as admin hit
   `/api/quickbooks/connect?cid=<clientId>` — or the client clicks the signed
   invite emailed by the "New Client" conversion. After authorizing, tokens are
   stored encrypted and `clients.qb_realm_id` is set.
5. Sync: `POST /api/quickbooks/sync { "client_id": "<id>" }` (admin or cron).
   Pulls P&L (YTD + MTD), Balance Sheet, and invoices; computes KPIs.

---

## 6. Scheduler (drip engine, recaps, token refresh, segments)

The engine runs via `POST /api/cron/tick` (Bearer `CRON_SECRET`). Pick one:

**A. Supabase pg_cron + pg_net (default, plan-independent).** Migration `0012`
enables the extensions. Then run once with your real values:
```sql
select cron.schedule('cat3-engine-tick', '* * * * *', $$
  select net.http_post(
    url     := 'https://YOUR-APP-URL/api/cron/tick',
    headers := jsonb_build_object('Authorization','Bearer YOUR_CRON_SECRET','Content-Type','application/json'),
    body    := '{}'::jsonb
  );
$$);
```

**B. Vercel Cron.** Add to `vercel.json`:
```json
{ "crons": [{ "path": "/api/cron/tick", "schedule": "*/5 * * * *" }] }
```
Vercel Cron can't send custom headers, so also accept the Vercel cron header or
keep B for Pro accounts that allow frequent ticks; otherwise prefer A.

**C. External pinger** (QStash/cron-job.org): POST the tick URL with the Bearer
header on your chosen interval.

---

## 7. Authoring & controlling campaigns

Campaigns/sequences are authored **in code**, not in the UI:

1. Add a file under `src/lib/campaigns/definitions/` using `defineSequence(...)`
   and register it in `definitions/index.ts`.
2. Sync into the DB (idempotent; never touches admin-set status):
   ```bash
   npm run campaigns:sync     # needs the app running + .env.local
   ```
3. In the admin, control lifecycle via `PATCH /api/sequences/[id]`:
   `{ "action": "publish" | "pause" | "cancel" }`. Publishing a campaign enrolls
   its target; automations enroll when their trigger fires.
4. Monitor: `GET /api/sequences/[id]/metrics` and `/conversions`,
   `GET /api/campaigns`, `GET /api/conversions`.

---

## 8. Production routing

- Point `admin.cat3books.com` at the app. Middleware rewrites it to `/admin/*`
  and gates it to the admin role.
- Set `NEXT_PUBLIC_APP_URL` to the public origin (used in email links, OAuth
  redirects, tracking pixels) and `NEXT_PUBLIC_ADMIN_HOST` to the admin host.

---

## 9. Smoke test

1. `npm run dev`, sign in at `/admin/login`.
2. `POST /api/companies` then `POST /api/contacts` (link them).
3. `POST /api/companies/[id]/convert-to-client` → check the `clients` row,
   dashboard token, welcome email log (`email_messages`), and activity.
4. Create a dynamic segment, `POST /api/segments/[id]/preview`.
5. `npm run campaigns:sync`; `PATCH` publish the campaign;
   `POST /api/cron/tick` (with the Bearer) and confirm a step ran.
6. Open `/api/dashboard/<token>` (valid → data; wrong token → 404).
