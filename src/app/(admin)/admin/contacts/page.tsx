"use client";

import { useUI } from "@/lib/admin/ui-store";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Btn } from "@/components/admin/ui/Btn";
import { ContactsBoard } from "@/components/admin/kanban/ContactsBoard";

export default function ContactsPage() {
  const { openModal } = useUI();
  return (
    <>
      <PageHead
        title="Contacts"
        sub="Every owner, operator, and finance lead by lifecycle. Drag a card between columns to change segment (and fire automations). Click a card to open it."
        actions={
          <Btn variant="primary" onClick={() => openModal("contact")}>
            + Add Contact
          </Btn>
        }
      />
      <ContactsBoard />
    </>
  );
}
