import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const days = Number(req.nextUrl.searchParams.get("days") || 7);

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const { data, error } = await supabase
    .from("orders")
    .select("created_at, total_amount")
    .eq("status", "paid")
    .gte("created_at", fromDate.toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // group by date
  const map = new Map<string, number>();

  data.forEach((o) => {
    const date = new Date(o.created_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });

    map.set(date, (map.get(date) || 0) + Number(o.total_amount));
  });

  const result = Array.from(map.entries()).map(([date, total]) => ({
    date,
    total,
  }));

  return NextResponse.json(result);
}
