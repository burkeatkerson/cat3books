"use client";

import { useUI } from "@/lib/admin/ui-store";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Btn } from "@/components/admin/ui/Btn";
import { CompaniesBoard } from "@/components/admin/kanban/CompaniesBoard";

export default function CompaniesPage() {
  const { openModal } = useUI();
  return (
    <>
      <PageHead
        title="Companies"
        sub="Your prospect pipeline — drag a card between stages to advance it (and fire the matching automations). Click a card to open it."
        actions={
          <Btn variant="primary" onClick={() => openModal("company")}>
            + Add Company
          </Btn>
        }
      />
      <CompaniesBoard />
    </>
  );
}
