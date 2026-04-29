"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const handleClick = async (): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };
  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
