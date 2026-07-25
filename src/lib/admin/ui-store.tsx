"use client";

/**
 * UI state for the admin shell: transient toast, the active modal, and the
 * active detail drawer. Kept separate from the data store so the shell can host
 * a single Toast/Modal/Drawer and any view can trigger them.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ModalKind = "company" | "contact" | "campaign" | "automation";
export type DrawerState =
  | { kind: "company" | "contact" | "campaign"; id: string }
  | null;

type UIContextValue = {
  toastMsg: string | null;
  toast: (msg: string) => void;
  modal: ModalKind | null;
  openModal: (kind: ModalKind) => void;
  closeModal: () => void;
  drawer: DrawerState;
  openDrawer: (state: NonNullable<DrawerState>) => void;
  closeDrawer: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalKind | null>(null);
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({
      toastMsg,
      toast,
      modal,
      openModal: (kind) => setModal(kind),
      closeModal: () => setModal(null),
      drawer,
      openDrawer: (state) => setDrawer(state),
      closeDrawer: () => setDrawer(null),
    }),
    [toastMsg, toast, modal, drawer],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
