import { createClient } from "@/lib/supabase/client";

export async function getCategories({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const supabase = createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data,
    count,
  };
}

export async function createCategory(payload: { name: string; slug: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCategory(
  id: string,
  payload: { name: string; slug: string },
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteCategory(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
