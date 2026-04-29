import LogoutButton from "@/features/auth/components/LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ExamplePage" };

export default function Home() {
  return (
    <div>
      <LogoutButton />
    </div>
  );
}
