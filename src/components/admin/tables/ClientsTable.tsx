"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { money } from "@/lib/admin/seed";
import { Pill } from "@/components/admin/ui/Pill";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Btn } from "@/components/admin/ui/Btn";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import {
  Table,
  TableShell,
  Th,
  TD,
  SUB,
  NumCell,
  useSort,
} from "@/components/admin/tables/parts";

const ROW = "hover:bg-[rgba(240,190,0,0.03)] transition-colors cursor-pointer";

export function ClientsTable() {
  const { db, companyById } = useAdmin();
  const { openDrawer, toast } = useUI();
  const { sort, toggle, sortList } = useSort("name");

  const list = sortList(db.contacts.filter((p) => p.segment === "client"));
  const th = (label: string, key: string) => (
    <Th label={label} sortKey={key} sort={sort} onSort={toggle} />
  );

  const tools = (
    <>
      <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mr-auto">
        {list.length} client contacts · saved filter
      </span>
      <Pill variant="client" dot>
        Segment = Client
      </Pill>
    </>
  );

  if (!list.length) {
    return (
      <TableShell tools={tools}>
        <EmptyState message="No clients yet — convert a prospect to get started" />
      </TableShell>
    );
  }

  const head = (
    <>
      {th("Contact", "name")}
      {th("Title", "title")}
      <Th label="Company" />
      <Th label="Tier" />
      <Th label="MRR" />
      {th("Owner", "owner")}
      {th("Last Touch", "lastTouch")}
      <Th label="" />
    </>
  );

  const body = list.map((p) => {
    const co = companyById(p.companyId);
    return (
      <tr
        key={p.id}
        className={ROW}
        onClick={() => openDrawer({ kind: "contact", id: p.id })}
      >
        <td className={TD}>
          <div className="flex items-center gap-3">
            <Avatar name={p.name} yellow />
            <div>
              <div className="font-cond font-semibold text-[14px] tracking-[0.02em]">
                {p.name}
              </div>
              <div className={SUB}>{p.email}</div>
            </div>
          </div>
        </td>
        <td className={`${TD} ${SUB}`}>{p.title}</td>
        <td className={`${TD} ${SUB}`}>{co ? co.name : "—"}</td>
        <td className={TD}>
          {co ? (
            <Pill variant={co.tier === "Books + CFO" ? "client" : "draft"}>
              {co.tier}
            </Pill>
          ) : (
            "—"
          )}
        </td>
        <td className={TD}>
          {co ? <NumCell yellow>{money(co.mrr)}</NumCell> : "—"}
        </td>
        <td className={`${TD} ${SUB}`}>{p.owner}</td>
        <td className={`${TD} ${SUB}`}>{p.lastTouch}</td>
        <td className={TD}>
          <Btn
            sm
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toast(`Composing to ${p.name}`);
            }}
          >
            Email
          </Btn>
        </td>
      </tr>
    );
  });

  return (
    <TableShell tools={tools}>
      <Table head={head} body={body} />
    </TableShell>
  );
}
