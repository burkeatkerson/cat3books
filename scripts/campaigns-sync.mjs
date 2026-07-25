/**
 * campaigns:sync — push code-authored sequence definitions into the database.
 *
 * Posts to the running app's /api/campaigns/sync endpoint using CRON_SECRET, so
 * it runs the exact same server-side sync logic. Requires the app to be running
 * (dev or prod) and CRON_SECRET + NEXT_PUBLIC_APP_URL in the environment.
 *
 * Run with:  npm run campaigns:sync   (loads .env.local via --env-file)
 */

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const secret = process.env.CRON_SECRET;

if (!secret) {
  console.error("CRON_SECRET is not set (check .env.local).");
  process.exit(1);
}

try {
  const res = await fetch(`${appUrl}/api/campaigns/sync`, {
    method: "POST",
    headers: { authorization: `Bearer ${secret}` },
  });
  const bodyText = await res.text();
  if (!res.ok) {
    console.error(`Sync failed (${res.status}): ${bodyText}`);
    process.exit(1);
  }
  const body = JSON.parse(bodyText);
  console.log("Campaigns synced:");
  for (const o of body.outcomes ?? []) {
    console.log(`  ${o.action.padEnd(9)} ${o.key}  (${o.steps} steps)`);
  }
} catch (err) {
  console.error(
    `Could not reach ${appUrl}. Is the app running?\n`,
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
}
