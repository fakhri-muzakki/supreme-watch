import ProductsTable from "@/features/admin/products/components/ProductsTable";

export default function DashboardProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage your store products
        </p>
      </div>

      <ProductsTable />
    </div>
  );
}
