import CategoryTable from "@/features/categories/components/CategoryTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard - Categories" };

export default function AdminCategoriesTable() {
  return (
    <div className="p-6 space-y-6">
      <CategoryTable />
    </div>
  );
}
