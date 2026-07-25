/**
 * Segment evaluation.
 *
 * A segment's `definition` is a (possibly nested) rule tree. We evaluate it in
 * application code rather than compiling to SQL: it supports arbitrary AND/OR
 * nesting, tag and custom-attribute rules, and is far safer than generating SQL
 * from user-shaped JSON. At a single firm's data volume (hundreds–low thousands
 * of records) the full-scan cost is negligible; revisit with a SQL compiler if
 * the dataset grows by orders of magnitude.
 *
 * Definition shape:
 *   { match: 'all' | 'any', rules: Rule[] }
 *   Rule = { field, op, value } | { group: Group }
 *   field: a column name, "custom.<key>", or "tag" (with op 'has_tag')
 *   op: eq | neq | gt | gte | lt | lte | in | contains | is_null | not_null | has_tag
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type EntityType = "company" | "contact" | "client";

type Op =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "contains"
  | "is_null"
  | "not_null"
  | "has_tag";

type LeafRule = { field: string; op: Op; value?: unknown };
type Group = { match: "all" | "any"; rules: Rule[] };
type Rule = LeafRule | { group: Group };

export type SegmentDefinition = Group;

const TABLE: Record<EntityType, string> = {
  company: "companies",
  contact: "contacts",
  client: "clients",
};

type Row = Record<string, unknown> & { id: string; custom_data?: unknown };

export type EvaluationResult = {
  ids: string[];
  rows: Row[];
};

export async function evaluateSegment(
  supabase: SupabaseClient,
  entityType: EntityType,
  definition: SegmentDefinition,
): Promise<EvaluationResult> {
  const { data: rows, error } = await supabase
    .from(TABLE[entityType])
    .select("*");
  if (error) throw new Error(error.message);

  // Tag membership map: entity_id -> Set(tag_id).
  const { data: tagLinks } = await supabase
    .from("entity_tags")
    .select("entity_id, tag_id")
    .eq("entity_type", entityType);
  const tagMap = new Map<string, Set<string>>();
  for (const link of tagLinks ?? []) {
    const l = link as { entity_id: string; tag_id: string };
    if (!tagMap.has(l.entity_id)) tagMap.set(l.entity_id, new Set());
    tagMap.get(l.entity_id)!.add(l.tag_id);
  }

  const matched = (rows as Row[]).filter((row) =>
    matchGroup(row, definition, tagMap),
  );
  return { ids: matched.map((r) => r.id), rows: matched };
}

function matchGroup(
  row: Row,
  group: Group,
  tagMap: Map<string, Set<string>>,
): boolean {
  const rules = group.rules ?? [];
  if (rules.length === 0) return true;
  const fn = group.match === "any" ? "some" : "every";
  return rules[fn]((rule) => matchRule(row, rule, tagMap));
}

function matchRule(
  row: Row,
  rule: Rule,
  tagMap: Map<string, Set<string>>,
): boolean {
  if ("group" in rule) return matchGroup(row, rule.group, tagMap);

  if (rule.op === "has_tag") {
    return tagMap.get(row.id)?.has(String(rule.value)) ?? false;
  }

  const left = resolveField(row, rule.field);
  const right = rule.value;

  switch (rule.op) {
    case "eq":
      return left === right;
    case "neq":
      return left !== right;
    case "gt":
      return num(left) > num(right);
    case "gte":
      return num(left) >= num(right);
    case "lt":
      return num(left) < num(right);
    case "lte":
      return num(left) <= num(right);
    case "in":
      return Array.isArray(right) && right.includes(left as never);
    case "contains":
      return String(left ?? "")
        .toLowerCase()
        .includes(String(right ?? "").toLowerCase());
    case "is_null":
      return left === null || left === undefined;
    case "not_null":
      return left !== null && left !== undefined;
    default:
      return false;
  }
}

function resolveField(row: Row, field: string): unknown {
  if (field.startsWith("custom.")) {
    const key = field.slice("custom.".length);
    const cd = row.custom_data;
    return cd && typeof cd === "object"
      ? (cd as Record<string, unknown>)[key]
      : undefined;
  }
  return row[field];
}

function num(v: unknown): number {
  return typeof v === "number" ? v : Number(v);
}
