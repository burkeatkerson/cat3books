"use client";

import {
  Drawer,
  DrawerHead,
  DrawerBody,
  DrawerStat,
  DrawerStatCell,
  DL,
  DLRow,
} from "@/components/admin/ui/Drawer";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { HealthDot } from "@/components/admin/ui/HealthDot";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Btn } from "@/components/admin/ui/Btn";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { SEG, money, stageCls } from "@/lib/admin/seed";

export function CompanyDrawer({ id }: { id: string }) {
  const { companyById, contactsForCompany, convertToClient } = useAdmin();
  const { closeDrawer, toast } = useUI();
  const c = companyById(id);
  if (!c) return null;
  const contacts = contactsForCompany(id);
  const seg = SEG[c.segment];

  const secondStat =
    c.segment === "client"
      ? { label: "MRR", value: money(c.mrr) }
      : c.segment === "prospect"
        ? { label: "Est. Value", value: `${money(c.value)}/mo` }
        : { label: "Was", value: c.since || "—" };

  return (
    <Drawer onClose={closeDrawer}>
      <DrawerHead>
        <Pill variant={seg.cls as PillVariant} dot>
          {seg.dot}
        </Pill>
        <h2 className="font-disp text-[38px] tracking-[0.02em] mt-3.5 leading-[0.95]">
          {c.name}
        </h2>
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-2">
          {c.location} · {c.type}
        </div>
      </DrawerHead>
      <DrawerBody>
        <DrawerStat>
          <DrawerStatCell label="Annual Revenue" value={money(c.revenue)} />
          <DrawerStatCell label={secondStat.label} value={secondStat.value} />
        </DrawerStat>

        <DL>
          {c.segment === "prospect" && (
            <DLRow
              k="Stage"
              v={<Pill variant={stageCls(c.stage) as PillVariant}>{c.stage}</Pill>}
            />
          )}
          {c.segment === "client" && (
            <DLRow k="Tier" v={`${c.tier} · client since ${c.since}`} />
          )}
          {c.segment === "past" && (
            <DLRow k="Churned" v={`${c.churned} — ${c.reason}`} />
          )}
          <DLRow k="Owner" v={c.owner} />
          <DLRow k="Health" v={c.health ? <HealthDot health={c.health} /> : "—"} />
        </DL>

        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-6 mb-3">
          Contacts ({contacts.length})
        </div>
        {contacts.length ? (
          contacts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 py-2.5 border-b border-dashed border-c3-border"
            >
              <Avatar name={p.name} />
              <div className="flex-1">
                <div className="font-cond font-semibold text-[15px] uppercase tracking-[0.02em]">
                  {p.name}
                </div>
                <div className="font-mono text-[11px] text-c3-mid tracking-[0.04em]">
                  {p.title} · {p.email}
                </div>
              </div>
              <Btn sm variant="ghost" onClick={() => toast(`Composing to ${p.name}`)}>
                Email
              </Btn>
            </div>
          ))
        ) : (
          <div className="font-mono text-[11px] text-c3-mid">No contacts yet.</div>
        )}

        <div className="flex gap-2.5 mt-6">
          {c.segment === "prospect" && (
            <Btn
              variant="primary"
              onClick={() => {
                convertToClient(c.id);
                closeDrawer();
                toast(`${c.name} is now a client`);
              }}
            >
              Convert to Client
            </Btn>
          )}
          <Btn variant="ghost" onClick={closeDrawer}>
            Close
          </Btn>
        </div>
      </DrawerBody>
    </Drawer>
  );
}
