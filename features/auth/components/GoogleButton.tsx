"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const GoogleButton = () => {
  const handleClick = async (): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full rounded-xl"
      onClick={handleClick}
    >
      Google
    </Button>
  );
};

export default GoogleButton;
