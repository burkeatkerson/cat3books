"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/ui/Modal";
import { Btn } from "@/components/admin/ui/Btn";
import { Field, TextInput, Select, SegPick } from "@/components/admin/ui/Field";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import type { Segment } from "@/lib/admin/types";

const TRIGGERS = [
  "Contact added as Prospect",
  "Segment changes to Client",
  "Segment changes to Past Client",
  "Stage = Assessment booked",
  "Proposal sent + 4 days no reply",
  "Monthly close marked complete",
];

export function NewAutomationModal() {
  const router = useRouter();
  const { addAutomation } = useAdmin();
  const { closeModal, toast } = useUI();

  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState(TRIGGERS[0]);
  const [segment, setSegment] = useState<Segment>("prospect");
  const [steps, setSteps] = useState("");
  const [invalid, setInvalid] = useState(false);

  function save() {
    if (!name.trim()) {
      setInvalid(true);
      return;
    }
    addAutomation({
      name: name.trim(),
      trigger,
      segment,
      steps: steps
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    closeModal();
    toast("Automation created");
    router.push("/admin/automations");
  }

  return (
    <Modal
      title="New Automation"
      onClose={closeModal}
      footer={
        <>
          <Btn variant="ghost" onClick={closeModal}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={save}>
            Create Workflow
          </Btn>
        </>
      }
    >
      <Field label="Workflow name">
        <TextInput
          autoFocus
          placeholder="e.g. New Lead Welcome"
          value={name}
          invalid={invalid}
          onChange={(e) => {
            setName(e.target.value);
            setInvalid(false);
          }}
        />
      </Field>
      <Field label="Trigger">
        <Select value={trigger} onChange={(e) => setTrigger(e.target.value)}>
          {TRIGGERS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <Field label="Target segment">
        <SegPick
          name="auseg"
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
          options={[
            { value: "prospect", label: "Prospects" },
            { value: "client", label: "Clients" },
            { value: "past", label: "Past Clients" },
          ]}
        />
      </Field>
      <Field label="Steps (comma-separated)">
        <TextInput
          placeholder="Send intro email, Wait 3 days, Create task"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </Field>
    </Modal>
  );
}
