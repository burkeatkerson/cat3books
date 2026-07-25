/**
 * Apply supabase/all_migrations.sql to the database in a single transaction.
 * Usage:  node scripts/db-apply.mjs "<postgres connection string>"
 * (or set DATABASE_URL). Uses SSL (required by Supabase).
 */

import { readFileSync } from "node:fs";
import pg from "pg";

const conn = process.argv[2] || process.env.DATABASE_URL;
if (!conn) {
  console.error("Provide a Postgres connection string as arg or DATABASE_URL.");
  process.exit(1);
}

const sql = readFileSync("supabase/all_migrations.sql", "utf8");
const client = new pg.Client({
  connectionString: conn,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query("begin");
  await client.query(sql);
  await client.query("commit");
  console.log("✓ Migrations applied successfully.");
} catch (err) {
  try {
    await client.query("rollback");
  } catch {}
  console.error("✗ Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
