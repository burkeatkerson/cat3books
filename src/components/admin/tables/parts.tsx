"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const TD = "px-4 py-[14px] border-b border-c3-border align-middle";
export const SUB = "font-mono text-[11px] text-c3-mid tracking-[0.04em]";

/** Sort state hook shared by the tables. */
export function useSort(initialKey: string) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 }>({
    key: initialKey,
    dir: 1,
  });
  const toggle = (key: string) =>
    setSort((s) =>
      s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: 1 },
    );
  const sortList = <T,>(list: T[]): T[] =>
    [...list].sort((a, b) => {
      let x = (a as Record<string, unknown>)[sort.key];
      let y = (b as Record<string, unknown>)[sort.key];
      if (typeof x === "string") x = x.toLowerCase();
      if (typeof y === "string") y = y.toLowerCase();
      if (x == null) return 1;
      if (y == null) return -1;
      return (x > y ? 1 : x < y ? -1 : 0) * sort.dir;
    });
  return { sort, toggle, sortList };
}

export function Th({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: ReactNode;
  sortKey?: string;
  sort?: { key: string; dir: 1 | -1 };
  onSort?: (key: string) => void;
}) {
  const sortable = sortKey != null && onSort != null;
  return (
    <th
      onClick={sortable ? () => onSort!(sortKey!) : undefined}
      className={cn(
        "font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim text-left px-4 py-[13px] border-b border-c3-b2 whitespace-nowrap select-none",
        sortable && "cursor-pointer hover:text-c3-mid",
      )}
    >
      {label}
      {sortable && sort?.key === sortKey && (
        <span className="opacity-50 ml-1">{sort.dir > 0 ? "▲" : "▼"}</span>
      )}
    </th>
  );
}

export function CellName({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="font-cond font-semibold text-[15px] tracking-[0.02em] uppercase text-c3-text">
      {name}
      {sub && (
        <small className="block font-body font-light text-[11.5px] text-c3-mid normal-case tracking-normal mt-0.5">
          {sub}
        </small>
      )}
    </div>
  );
}

export function NumCell({
  children,
  yellow = false,
}: {
  children: ReactNode;
  yellow?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-disp text-[22px] tracking-[0.02em]",
        yellow ? "text-c3-yellow" : "text-c3-text",
      )}
    >
      {children}
    </span>
  );
}

export function TableShell({
  tools,
  children,
}: {
  tools?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border border-c3-border bg-c3-card overflow-hidden">
      {tools && (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-c3-border bg-c3-card2">
          {tools}
        </div>
      )}
      {children}
    </div>
  );
}

export function Table({ head, body }: { head: ReactNode; body: ReactNode }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>{head}</tr>
      </thead>
      <tbody className="[&>tr:last-child>td]:border-0">{body}</tbody>
    </table>
  );
}
