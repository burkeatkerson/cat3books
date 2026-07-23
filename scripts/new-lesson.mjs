#!/usr/bin/env node
/**
 * Scaffold a Bookkeeping School lesson.
 *
 *   npm run school:new -- "Why my bank feed missed a transaction" troubleshooting fix intermediate
 *   npm run school:new -- "How to read a balance sheet" reading-numbers concept
 *
 * Arguments: <title> <subject> [type] [level]
 *   subject  foundations | quickbooks | daily-books | reading-numbers |
 *            cash-flow | payroll-taxes | troubleshooting | business-decisions
 *   type     concept | walkthrough | fix | checklist | reference | example  (default concept)
 *   level    beginner | intermediate | advanced                            (default beginner)
 *
 * Writes src/content/school/<slug>.mdx as a draft. Existing files are never
 * overwritten — this is meant to be safe to run in bulk while planning a batch
 * of lessons.
 */

import fs from "node:fs";
import path from "node:path";

const SUBJECTS = [
  "foundations",
  "quickbooks",
  "daily-books",
  "reading-numbers",
  "cash-flow",
  "payroll-taxes",
  "troubleshooting",
  "business-decisions",
];
const TYPES = ["concept", "walkthrough", "fix", "checklist", "reference", "example"];
const LEVELS = ["beginner", "intermediate", "advanced"];

const DIR = path.join(process.cwd(), "src/content/school");

const [title, subject, type = "concept", level = "beginner"] = process.argv.slice(2);

function die(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

if (!title || !subject) {
  die('Usage: npm run school:new -- "<title>" <subject> [type] [level]');
}
if (!SUBJECTS.includes(subject)) {
  die(`Unknown subject "${subject}".\n  Valid: ${SUBJECTS.join(", ")}`);
}
if (!TYPES.includes(type)) {
  die(`Unknown type "${type}".\n  Valid: ${TYPES.join(", ")}`);
}
if (!LEVELS.includes(level)) {
  die(`Unknown level "${level}".\n  Valid: ${LEVELS.join(", ")}`);
}

const slug = title
  .toLowerCase()
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const file = path.join(DIR, `${slug}.mdx`);
if (fs.existsSync(file)) {
  die(`${slug}.mdx already exists. Nothing written.`);
}

const today = new Date().toISOString().slice(0, 10);

const body = `---
title: "${title.replace(/"/g, '\\"')}"
subject: "${subject}"
level: "${level}"
type: "${type}"
excerpt: "TODO — one or two sentences that read well cold, out of context."
question: "TODO — the question an owner would actually type."
date: "${today}"
draft: true
tags:
  - "TODO"
keywords:
  - "TODO long tail phrase"
---

TODO — open with the reader's situation, not a definition.

<QuickAnswer question="TODO — the question an owner would actually type.">
TODO — two or three sentences that fully answer the question on their own.
</QuickAnswer>

## TODO — first section heading as a statement

TODO — body.

<Takeaways
  items={[
    "TODO — the sentence you want them to remember.",
    "TODO — the action to take this week.",
  ]}
/>
`;

fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(file, body, "utf-8");

console.log(`\n  Created src/content/school/${slug}.mdx  (draft)`);
console.log(`  Preview at /school/${slug} once draft: true is removed.\n`);
