// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

import DashboardSidebar from "@/features/admin/components/DashboardSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const supabase = await createClient();

  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   if (!user) redirect("/login");
  //   if (user.role !== "admin") redirect("/");

  return (
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* CONTENT */}
      <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
