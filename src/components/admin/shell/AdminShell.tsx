"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AdminProvider } from "@/lib/admin/store";
import { UIProvider } from "@/lib/admin/ui-store";
import { Sidebar } from "@/components/admin/shell/Sidebar";
import { Topbar } from "@/components/admin/shell/Topbar";
import { ModalHost } from "@/components/admin/shell/ModalHost";
import { DrawerHost } from "@/components/admin/shell/DrawerHost";
import { Toast } from "@/components/admin/ui/Toast";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // The (unused, out-of-scope) login page renders without the admin chrome.
  if (pathname === "/admin/login") return <>{children}</>;
  return (
    <AdminProvider>
      <UIProvider>
        <div className="grid grid-cols-[248px_1fr] max-[860px]:grid-cols-[64px_1fr] min-h-screen">
          <Sidebar />
          <div className="flex flex-col min-w-0">
            <Topbar />
            {/* key by pathname so each view replays the fade-up transition */}
            <div key={pathname} className="p-7 flex-1 animate-fade-up">
              {children}
            </div>
          </div>
        </div>
        <ModalHost />
        <DrawerHost />
        <Toast />
      </UIProvider>
    </AdminProvider>
  );
}
