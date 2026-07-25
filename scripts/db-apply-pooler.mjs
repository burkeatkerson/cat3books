import { readFileSync } from "node:fs";
import pg from "pg";

const ref = "wdmpilrxqgmpdisxzwof";
const password = process.env.PGPASSWORD;
const regions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "eu-central-1", "eu-central-2", "eu-west-1", "eu-west-2", "eu-west-3", "eu-north-1",
  "ap-southeast-1", "ap-southeast-2", "ap-south-1", "ap-northeast-1", "ap-northeast-2",
  "sa-east-1", "ca-central-1",
];
const prefixes = ["aws-0", "aws-1"];

const sql = readFileSync("supabase/all_migrations.sql", "utf8");

for (const pre of prefixes) {
  for (const r of regions) {
    const host = `${pre}-${r}.pooler.supabase.com`;
    const client = new pg.Client({
      host,
      port: 5432,
      user: `postgres.${ref}`,
      database: "postgres",
      password,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 6000,
    });
    try {
      await client.connect();
      console.log(`CONNECTED via ${host}`);
      try {
        await client.query("begin");
        await client.query(sql);
        await client.query("commit");
        console.log("APPLIED");
        // Persist the working host for later scripts.
        console.log(`POOLER_HOST=${host}`);
      } catch (e) {
        await client.query("rollback").catch(() => {});
        console.log("MIGRATION_ERROR: " + e.message);
      }
      await client.end();
      process.exit(0);
    } catch {
      await client.end().catch(() => {});
    }
  }
}
console.log("NO_POOLER_CONNECTED");
process.exit(3);
