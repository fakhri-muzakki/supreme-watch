"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function TanSTackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ penting: pakai useState biar tidak recreate setiap render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
