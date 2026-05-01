import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getOrders({
  page,
  limit,
  search,
  status,
  sort,
}: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: "asc" | "desc";
}) {
  let query = supabase.from("orders").select("*", { count: "exact" });

  if (search) {
    query = query.ilike("customer_name", `%${search}%`);
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  query = query.order("created_at", { ascending: sort === "asc" });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) throw error;

  return {
    data,
    count,
  };
}

export async function updateOrderStatus(id: string, status: string) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}

export async function getOrderDetail(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*),
      payments (*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
