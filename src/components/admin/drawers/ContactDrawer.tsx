"use client";

import {
  Drawer,
  DrawerHead,
  DrawerBody,
  DL,
  DLRow,
} from "@/components/admin/ui/Drawer";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Btn } from "@/components/admin/ui/Btn";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { SEG } from "@/lib/admin/seed";

export function ContactDrawer({ id }: { id: string }) {
  const { db, companyById } = useAdmin();
  const { closeDrawer, toast } = useUI();
  const p = db.contacts.find((x) => x.id === id);
  if (!p) return null;
  const co = companyById(p.companyId);
  const seg = SEG[p.segment];

  return (
    <Drawer onClose={closeDrawer}>
      <DrawerHead>
        <div className="flex items-center gap-3">
          <Avatar name={p.name} yellow className="w-12 h-12 text-xl" />
          <div>
            <h2 className="font-cond font-bold text-[26px] uppercase tracking-[0.03em]">
              {p.name}
            </h2>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
              {p.title}
              {co ? ` · ${co.name}` : ""}
            </div>
          </div>
        </div>
        <div className="mt-3.5">
          <Pill variant={seg.cls as PillVariant} dot>
            {seg.dot}
          </Pill>
        </div>
      </DrawerHead>
      <DrawerBody>
        <DL>
          <DLRow k="Email" v={p.email} />
          <DLRow k="Phone" v={p.phone} />
          <DLRow k="Company" v={co ? co.name : "— unlinked —"} />
          <DLRow k="Owner" v={p.owner} />
          <DLRow k="Last touch" v={p.lastTouch} />
        </DL>

        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-6 mb-3">
          Quick actions
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <Btn variant="primary" onClick={() => toast(`Composing to ${p.name}`)}>
            Send Email
          </Btn>
          <Btn variant="ghost" onClick={() => toast("Call logged")}>
            Log Call
          </Btn>
          <Btn variant="ghost" onClick={closeDrawer}>
            Close
          </Btn>
        </div>
      </DrawerBody>
    </Drawer>
  );
}
