"use client";

import { useUI } from "@/lib/admin/ui-store";
import { AddCompanyModal } from "@/components/admin/modals/AddCompanyModal";
import { AddContactModal } from "@/components/admin/modals/AddContactModal";
import { NewCampaignModal } from "@/components/admin/modals/NewCampaignModal";
import { NewAutomationModal } from "@/components/admin/modals/NewAutomationModal";

export function ModalHost() {
  const { modal } = useUI();
  switch (modal) {
    case "company":
      return <AddCompanyModal />;
    case "contact":
      return <AddContactModal />;
    case "campaign":
      return <NewCampaignModal />;
    case "automation":
      return <NewAutomationModal />;
    default:
      return null;
  }
}
