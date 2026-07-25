"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/ui/Modal";
import { Btn } from "@/components/admin/ui/Btn";
import { Field, TextInput, TextArea, SegPick } from "@/components/admin/ui/Field";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import type { Segment } from "@/lib/admin/types";

export function NewCampaignModal() {
  const router = useRouter();
  const { addCampaign } = useAdmin();
  const { closeModal, toast } = useUI();

  const [name, setName] = useState("");
  const [segment, setSegment] = useState<Segment>("prospect");
  const [desc, setDesc] = useState("");
  const [invalid, setInvalid] = useState(false);

  function save() {
    if (!name.trim()) {
      setInvalid(true);
      return;
    }
    addCampaign({ name: name.trim(), segment, desc });
    closeModal();
    toast("Campaign drafted");
    router.push("/admin/campaigns");
  }

  return (
    <Modal
      title="New Campaign"
      onClose={closeModal}
      footer={
        <>
          <Btn variant="ghost" onClick={closeModal}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={save}>
            Create as Draft
          </Btn>
        </>
      }
    >
      <Field label="Campaign name">
        <TextInput
          autoFocus
          placeholder="e.g. Cat3 Assessment Offer"
          value={name}
          invalid={invalid}
          onChange={(e) => {
            setName(e.target.value);
            setInvalid(false);
          }}
        />
      </Field>
      <Field label="Target segment">
        <SegPick
          name="caseg"
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
          options={[
            { value: "prospect", label: "Prospects" },
            { value: "client", label: "Clients" },
            { value: "past", label: "Past Clients" },
          ]}
        />
      </Field>
      <Field label="Goal / description">
        <TextArea
          rows={3}
          placeholder="What is this campaign trying to do?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </Field>
    </Modal>
  );
}
