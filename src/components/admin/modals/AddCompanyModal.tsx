"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/admin/ui/Modal";
import { Btn } from "@/components/admin/ui/Btn";
import {
  Field,
  FieldRow,
  TextInput,
  Select,
  SegPick,
} from "@/components/admin/ui/Field";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import type { Segment } from "@/lib/admin/types";

const OWNERS = ["Jordan Mills", "Dana Pruitt"];

export function AddCompanyModal() {
  const router = useRouter();
  const { addCompany } = useAdmin();
  const { closeModal, toast } = useUI();

  const [name, setName] = useState("");
  const [segment, setSegment] = useState<Segment>("prospect");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [revenue, setRevenue] = useState("");
  const [owner, setOwner] = useState(OWNERS[0]);
  const [invalid, setInvalid] = useState(false);

  function save() {
    if (!name.trim()) {
      setInvalid(true);
      return;
    }
    addCompany({
      name: name.trim(),
      segment,
      revenue: Number(revenue) || 0,
      location,
      type,
      owner,
    });
    closeModal();
    toast("Company added");
    router.push("/admin/companies");
  }

  return (
    <Modal
      title="Add Company"
      onClose={closeModal}
      footer={
        <>
          <Btn variant="ghost" onClick={closeModal}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={save}>
            Add Company
          </Btn>
        </>
      }
    >
      <Field label="Company name">
        <TextInput
          autoFocus
          placeholder="e.g. Summit Restoration"
          value={name}
          invalid={invalid}
          onChange={(e) => {
            setName(e.target.value);
            setInvalid(false);
          }}
        />
      </Field>
      <Field label="Segment">
        <SegPick
          name="seg"
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
          options={[
            { value: "prospect", label: "Prospect" },
            { value: "client", label: "Client" },
            { value: "past", label: "Past Client" },
          ]}
        />
      </Field>
      <FieldRow>
        <Field label="Location">
          <TextInput
            placeholder="City, ST"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>
        <Field label="Service focus">
          <TextInput
            placeholder="Water / Fire / Mold"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Annual revenue ($)">
          <TextInput
            type="number"
            placeholder="2000000"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
        </Field>
        <Field label="Owner">
          <Select value={owner} onChange={(e) => setOwner(e.target.value)}>
            {OWNERS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </Field>
      </FieldRow>
    </Modal>
  );
}
