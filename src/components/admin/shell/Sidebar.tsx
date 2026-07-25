"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useAdmin } from "@/lib/admin/store";
import { Icon, type IconName } from "@/components/admin/ui/icons";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  badge?: number;
};

export function Sidebar() {
  const pathname = usePathname();
  const { db } = useAdmin();
  const clientContacts = db.contacts.filter((c) => c.segment === "client").length;

  const groups: { heading: string; items: NavItem[] }[] = [
    {
      heading: "Workspace",
      items: [
        { href: "/admin", label: "Dashboard", icon: "dashboard" },
        { href: "/admin/companies", label: "Companies", icon: "companies", badge: db.companies.length },
        { href: "/admin/contacts", label: "Contacts", icon: "contacts", badge: db.contacts.length },
        { href: "/admin/clients", label: "Clients", icon: "clients", badge: clientContacts },
      ],
    },
    {
      heading: "Growth",
      items: [
        { href: "/admin/campaigns", label: "Campaigns", icon: "campaigns", badge: db.campaigns.length },
        { href: "/admin/automations", label: "Automations", icon: "automations" },
      ],
    },
    {
      heading: "Manage",
      items: [{ href: "/admin/settings", label: "Settings", icon: "settings" }],
    },
  ];

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="sticky top-0 h-screen bg-c3-dark border-r border-c3-border flex flex-col z-20">
      {/* Logo */}
      <div className="flex items-center px-[22px] py-5 border-b border-c3-border font-disp text-[24px] tracking-[0.04em] leading-none">
        CAT
        <span className="inline-flex items-center justify-center bg-c3-yellow text-[#111] w-[22px] h-[22px] text-[19px] mx-[3px] translate-y-[2px]">
          3
        </span>
        <span className="text-c3-dim max-[860px]:hidden">BOOKS</span>
        <span className="ml-auto font-mono text-[8px] tracking-[0.18em] text-c3-dim border border-c3-border px-[5px] py-[3px] translate-y-[2px] max-[860px]:hidden">
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav className="px-3 py-3.5 flex-1 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.heading} className="mb-[18px]">
            <div className="font-mono text-[8.5px] tracking-[0.24em] uppercase text-c3-dim px-2.5 pb-2 max-[860px]:hidden">
              {g.heading}
            </div>
            {g.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2.5 py-2.5 font-cond font-medium text-[15px] tracking-[0.03em] uppercase border-l-2 transition-all max-[860px]:justify-center",
                    active
                      ? "text-c3-yellow border-c3-yellow bg-[rgba(240,190,0,0.05)]"
                      : "text-c3-mid border-transparent hover:text-c3-text hover:bg-white/[0.02]",
                  )}
                >
                  <Icon name={item.icon} className="w-4 h-4 flex-shrink-0 opacity-90" />
                  <span className="max-[860px]:hidden">{item.label}</span>
                  {item.badge != null && (
                    <span
                      className={cn(
                        "ml-auto font-mono text-[9px] tracking-[0.05em] bg-c3-card border px-1.5 py-px max-[860px]:hidden",
                        active
                          ? "text-c3-yellow border-c3-yellow-dim"
                          : "text-c3-dim border-c3-border",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3.5 py-3.5 border-t border-c3-border flex items-center gap-2.5">
        <span className="w-[34px] h-[34px] flex-shrink-0 bg-c3-card border border-c3-yellow text-c3-yellow flex items-center justify-center font-disp text-[15px]">
          JM
        </span>
        <div className="leading-tight min-w-0 max-[860px]:hidden">
          <div className="font-cond font-semibold text-[14px] text-c3-text uppercase tracking-[0.03em]">
            Jordan Mills
          </div>
          <div className="font-mono text-[8.5px] tracking-[0.16em] text-c3-dim uppercase mt-0.5">
            Founder · Admin
          </div>
        </div>
      </div>
    </aside>
  );
}
