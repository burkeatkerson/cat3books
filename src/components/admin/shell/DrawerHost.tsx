"use client";

import { useUI } from "@/lib/admin/ui-store";
import { CompanyDrawer } from "@/components/admin/drawers/CompanyDrawer";
import { ContactDrawer } from "@/components/admin/drawers/ContactDrawer";
import { CampaignDrawer } from "@/components/admin/drawers/CampaignDrawer";

export function DrawerHost() {
  const { drawer } = useUI();
  if (!drawer) return null;
  switch (drawer.kind) {
    case "company":
      return <CompanyDrawer id={drawer.id} />;
    case "contact":
      return <ContactDrawer id={drawer.id} />;
    case "campaign":
      return <CampaignDrawer id={drawer.id} />;
    default:
      return null;
  }
}
