/**
 * Admin route-group layout. Wraps every /admin view in the AdminShell
 * (sidebar + topbar + mock-data providers + modal/drawer/toast hosts).
 * Frontend-only for now — no auth, no API.
 */
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/shell/AdminShell";

export const metadata = {
  title: "Cat3 Books — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-c3-black text-c3-text font-body font-light">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
