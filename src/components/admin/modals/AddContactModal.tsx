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

export function AddContactModal() {
  const router = useRouter();
  const { db, addContact } = useAdmin();
  const { closeModal, toast } = useUI();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [segment, setSegment] = useState<Segment>("prospect");
  const [invalid, setInvalid] = useState(false);

  function save() {
    if (!name.trim()) {
      setInvalid(true);
      return;
    }
    addContact({
      name: name.trim(),
      title,
      companyId: companyId || null,
      email,
      phone,
      segment,
    });
    closeModal();
    toast("Contact added");
    router.push("/admin/contacts");
  }

  return (
    <Modal
      title="Add Contact"
      onClose={closeModal}
      footer={
        <>
          <Btn variant="ghost" onClick={closeModal}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={save}>
            Add Contact
          </Btn>
        </>
      }
    >
      <FieldRow>
        <Field label="Full name">
          <TextInput
            autoFocus
            placeholder="e.g. Mike Rodriguez"
            value={name}
            invalid={invalid}
            onChange={(e) => {
              setName(e.target.value);
              setInvalid(false);
            }}
          />
        </Field>
        <Field label="Title">
          <TextInput
            placeholder="Owner"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
      </FieldRow>
      <Field label="Company">
        <Select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
          <option value="">— None / new lead —</option>
          {db.companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </Field>
      <FieldRow>
        <Field label="Email">
          <TextInput
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Phone">
          <TextInput
            placeholder="(555) 555-0100"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
      </FieldRow>
      <Field label="Segment">
        <SegPick
          name="cseg"
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
          options={[
            { value: "prospect", label: "Prospect" },
            { value: "client", label: "Client" },
            { value: "past", label: "Past Client" },
          ]}
        />
      </Field>
    </Modal>
  );
}
