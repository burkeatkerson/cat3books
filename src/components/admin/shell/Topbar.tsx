"use client";

import { usePathname } from "next/navigation";
import { Btn } from "@/components/admin/ui/Btn";
import { Icon } from "@/components/admin/ui/icons";
import { useUI } from "@/lib/admin/ui-store";

function crumbFromPath(pathname: string): string {
  const seg = pathname.replace(/^\/admin\/?/, "").split("/")[0] || "dashboard";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

export function Topbar() {
  const pathname = usePathname();
  const { openModal } = useUI();
  const crumb = crumbFromPath(pathname);

  return (
    <div className="sticky top-0 z-[15] h-[62px] bg-[rgba(9,9,8,0.82)] backdrop-blur-[14px] border-b border-c3-border flex items-center gap-5 px-7">
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim">
        CAT3 ADMIN / <b className="text-c3-text font-normal">{crumb}</b>
      </div>

      <div className="ml-auto relative w-[280px] max-w-[36vw]">
        <Icon
          name="search"
          strokeWidth={1.8}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-c3-dim"
        />
        <input
          type="search"
          placeholder="Search companies, contacts…"
          className="w-full bg-c3-card border border-c3-border pl-8 pr-3 py-[9px] font-body text-[13px] text-c3-text outline-none transition-colors focus:border-c3-yellow-dim placeholder:text-c3-dim"
        />
      </div>

      <Btn sm variant="ghost" onClick={() => openModal("contact")}>
        + Contact
      </Btn>
      <Btn sm variant="primary" onClick={() => openModal("company")}>
        + Company
      </Btn>
    </div>
  );
}
