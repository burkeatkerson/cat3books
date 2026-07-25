"use client";

/**
 * In-memory mock CRM store (localStorage-backed), replicating the prototype's
 * behavior exactly. This is the ONLY data source for the admin UI right now —
 * no API/DB. Later it can be swapped for API calls without changing components.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED } from "@/lib/admin/seed";
import type {
  AdminDB,
  Audience,
  Campaign,
  Company,
  Contact,
  Segment,
} from "@/lib/admin/types";

const LS_KEY = "cat3_crm_v1";

const clone = (db: AdminDB): AdminDB => JSON.parse(JSON.stringify(db));
const uid = (p: string) => p + Math.random().toString(36).slice(2, 7);

export type NewCompanyInput = {
  name: string;
  segment: Segment;
  revenue: number;
  location: string;
  type: string;
  owner: string;
};
export type NewContactInput = {
  name: string;
  title: string;
  companyId: string | null;
  email: string;
  phone: string;
  segment: Segment;
};
export type NewCampaignInput = { name: string; segment: Segment; desc: string };
export type NewAutomationInput = {
  name: string;
  trigger: string;
  segment: Segment;
  steps: string[];
};

type AdminContextValue = {
  db: AdminDB;
  // selectors
  companyById: (id: string | null) => Company | undefined;
  contactsForCompany: (id: string) => Contact[];
  // mutators
  addCompany: (input: NewCompanyInput) => void;
  addContact: (input: NewContactInput) => void;
  convertToClient: (companyId: string) => void;
  winBack: (companyId: string) => void;
  toggleTask: (index: number) => void;
  toggleAutomation: (id: string) => void;
  addCampaign: (input: NewCampaignInput) => void;
  launchCampaign: (id: string) => void;
  pauseCampaign: (id: string) => void;
  addAutomation: (input: NewAutomationInput) => void;
  resetData: () => void;
  exportData: () => void;
  // board controls
  setCompanyStage: (id: string, stage: string) => void;
  markCompanyLost: (id: string) => void;
  setContactSegment: (id: string, segment: Segment) => void;
  enrollInAutomation: (automationId: string, subjectName: string) => void;
  togglePriority: (kind: "company" | "contact", id: string) => void;
  setAudience: (
    kind: "company" | "contact",
    id: string,
    audience: Audience,
  ) => void;
  cycleHealth: (id: string) => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<AdminDB>(() => clone(SEED));

  // Hydrate from localStorage on the client (post-mount, avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setDb(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const update = useCallback((fn: (draft: AdminDB) => void) => {
    setDb((prev) => {
      const next = clone(prev);
      fn(next);
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const companyById = useCallback(
    (id: string | null) => db.companies.find((c) => c.id === id),
    [db.companies],
  );
  const contactsForCompany = useCallback(
    (id: string) => db.contacts.filter((p) => p.companyId === id),
    [db.contacts],
  );

  const addCompany = useCallback(
    (input: NewCompanyInput) =>
      update((d) => {
        const rev = input.revenue || 1000000;
        const co: Company = {
          id: uid("c"),
          name: input.name,
          segment: input.segment,
          revenue: rev,
          location: input.location || "—",
          type: input.type || "Restoration",
          owner: input.owner,
        };
        if (input.segment === "prospect") {
          co.stage = "New lead";
          co.value = Math.max(750, Math.round((rev / 12) * 0.0085));
          co.health = "cold";
        } else if (input.segment === "client") {
          co.tier = "Core";
          co.mrr = Math.max(750, Math.round((rev / 12) * 0.0085));
          co.since = "2026-06";
          co.health = "good";
        } else {
          co.since = "—";
          co.churned = "2026-06";
          co.reason = "—";
        }
        d.companies.unshift(co);
        d.activity.unshift({
          type: "win",
          who: input.owner,
          txt: `added <b>${input.name}</b> as a ${input.segment}`,
          time: "just now",
        });
      }),
    [update],
  );

  const addContact = useCallback(
    (input: NewContactInput) =>
      update((d) => {
        d.contacts.unshift({
          id: uid("p"),
          name: input.name,
          title: input.title || "—",
          companyId: input.companyId || null,
          email: input.email || "—",
          phone: input.phone || "—",
          segment: input.segment,
          owner: "Jordan Mills",
          lastTouch: "2026-06-01",
        });
        d.activity.unshift({
          type: "note",
          who: "Jordan Mills",
          txt: `added contact <b>${input.name}</b>`,
          time: "just now",
        });
      }),
    [update],
  );

  const convertToClient = useCallback(
    (companyId: string) =>
      update((d) => {
        const c = d.companies.find((x) => x.id === companyId);
        if (!c) return;
        c.segment = "client";
        c.tier = "Core";
        c.mrr = c.value || Math.max(750, Math.round((c.revenue / 12) * 0.0085));
        c.since = "2026-06";
        c.health = "good";
        delete c.stage;
        d.contacts
          .filter((p) => p.companyId === companyId)
          .forEach((p) => (p.segment = "client"));
        d.activity.unshift({
          type: "client",
          who: c.owner,
          txt: `<b>${c.name}</b> converted to Client 🎉`,
          time: "just now",
        });
      }),
    [update],
  );

  const winBack = useCallback(() => {
    /* prototype: visual toast only — handled by caller */
  }, []);

  const toggleTask = useCallback(
    (index: number) =>
      update((d) => {
        if (d.tasks[index]) d.tasks[index].done = !d.tasks[index].done;
      }),
    [update],
  );

  const toggleAutomation = useCallback(
    (id: string) =>
      update((d) => {
        const a = d.automations.find((x) => x.id === id);
        if (a) a.active = !a.active;
      }),
    [update],
  );

  const addCampaign = useCallback(
    (input: NewCampaignInput) =>
      update((d) => {
        const c: Campaign = {
          id: uid("cam"),
          name: input.name,
          channel: "Email",
          segment: input.segment,
          status: "draft",
          desc: input.desc || "New campaign draft.",
          sent: 0,
          opened: 0,
          replied: 0,
          booked: 0,
        };
        d.campaigns.unshift(c);
      }),
    [update],
  );

  const launchCampaign = useCallback(
    (id: string) =>
      update((d) => {
        const c = d.campaigns.find((x) => x.id === id);
        if (c) c.status = "live";
      }),
    [update],
  );

  const pauseCampaign = useCallback(
    (id: string) =>
      update((d) => {
        const c = d.campaigns.find((x) => x.id === id);
        if (c) c.status = "paused";
      }),
    [update],
  );

  const addAutomation = useCallback(
    (input: NewAutomationInput) =>
      update((d) => {
        d.automations.unshift({
          id: uid("a"),
          name: input.name,
          trigger: input.trigger,
          steps: input.steps.length ? input.steps : ["Send email"],
          segment: input.segment,
          active: true,
          enrolled: 0,
        });
      }),
    [update],
  );

  const resetData = useCallback(() => {
    const fresh = clone(SEED);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(fresh));
    } catch {
      /* ignore */
    }
    setDb(fresh);
  }, []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(db, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cat3-crm-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [db]);

  // ---- Board controls -----------------------------------------------------
  const setCompanyStage = useCallback(
    (id: string, stage: string) =>
      update((d) => {
        const c = d.companies.find((x) => x.id === id);
        if (c) c.stage = stage;
      }),
    [update],
  );

  const markCompanyLost = useCallback(
    (id: string) =>
      update((d) => {
        const c = d.companies.find((x) => x.id === id);
        if (!c) return;
        c.segment = "past";
        c.reason = "Lost";
        c.churned = "2026-06";
        delete c.stage;
        d.activity.unshift({
          type: "churn",
          who: "System",
          txt: `<b>${c.name}</b> marked Lost`,
          time: "just now",
        });
      }),
    [update],
  );

  const setContactSegment = useCallback(
    (id: string, segment: Segment) =>
      update((d) => {
        const p = d.contacts.find((x) => x.id === id);
        if (p) p.segment = segment;
      }),
    [update],
  );

  const enrollInAutomation = useCallback(
    (automationId: string, subjectName: string) =>
      update((d) => {
        const a = d.automations.find((x) => x.id === automationId);
        if (!a) return;
        a.enrolled += 1;
        d.activity.unshift({
          type: "mail",
          who: "Automation",
          txt: `<b>${subjectName}</b> enrolled in <b>${a.name}</b>`,
          time: "just now",
        });
      }),
    [update],
  );

  const togglePriority = useCallback(
    (kind: "company" | "contact", id: string) =>
      update((d) => {
        const list = kind === "company" ? d.companies : d.contacts;
        const item = list.find((x) => x.id === id);
        if (item) item.priority = !item.priority;
      }),
    [update],
  );

  const setAudience = useCallback(
    (kind: "company" | "contact", id: string, audience: Audience) =>
      update((d) => {
        const list = kind === "company" ? d.companies : d.contacts;
        const item = list.find((x) => x.id === id);
        if (!item) return;
        item.audience = audience;
        d.activity.unshift({
          type: "note",
          who: "Jordan Mills",
          txt: `<b>${item.name}</b> moved to ${audience} audience`,
          time: "just now",
        });
      }),
    [update],
  );

  const cycleHealth = useCallback(
    (id: string) =>
      update((d) => {
        const c = d.companies.find((x) => x.id === id);
        if (!c) return;
        const ring =
          c.segment === "client"
            ? (["good", "watch"] as const)
            : (["hot", "warm", "cold"] as const);
        const cur = ring.indexOf((c.health ?? ring[0]) as never);
        c.health = ring[(cur + 1) % ring.length] as Company["health"];
      }),
    [update],
  );

  const value = useMemo<AdminContextValue>(
    () => ({
      db,
      companyById,
      contactsForCompany,
      addCompany,
      addContact,
      convertToClient,
      winBack,
      toggleTask,
      toggleAutomation,
      addCampaign,
      launchCampaign,
      pauseCampaign,
      addAutomation,
      resetData,
      exportData,
      setCompanyStage,
      markCompanyLost,
      setContactSegment,
      enrollInAutomation,
      togglePriority,
      setAudience,
      cycleHealth,
    }),
    [
      db,
      companyById,
      contactsForCompany,
      addCompany,
      addContact,
      convertToClient,
      winBack,
      toggleTask,
      toggleAutomation,
      addCampaign,
      launchCampaign,
      pauseCampaign,
      addAutomation,
      resetData,
      exportData,
      setCompanyStage,
      markCompanyLost,
      setContactSegment,
      enrollInAutomation,
      togglePriority,
      setAudience,
      cycleHealth,
    ],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
