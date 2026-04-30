"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const handleClick = async (): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };
  return (
    <button
      onClick={handleClick}
      className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
