"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={signOut}
      className="text-c3-mid hover:text-c3-text text-sm underline underline-offset-4"
    >
      Sign out
    </button>
  );
}
