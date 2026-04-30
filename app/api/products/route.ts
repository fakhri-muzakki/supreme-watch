import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const page = Number(req.nextUrl.searchParams.get("page") ?? "1");
  const search = req.nextUrl.searchParams.get("search");
  const category = req.nextUrl.searchParams.get("category");
  const sort = req.nextUrl.searchParams.get("sort");

  const limit = 6;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("products").select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `);

  // 🔍 SEARCH
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  // 📦 CATEGORY (FIXED)
  if (category) {
    query = query.eq("categories.slug", category);
  }

  // 🔄 SORT
  if (sort === "price_asc") {
    query = query.order("price", { ascending: true });
  } else if (sort === "price_desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({
    data,
    nextPage: data.length === limit ? page + 1 : null,
  });
}
