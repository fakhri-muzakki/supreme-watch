import CartSidebar from "@/components/CartSidebar";
import { Package, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-3xl border border-border bg-background/90 px-4 py-3 shadow-lg backdrop-blur md:px-6">
        <div className="text-lg font-semibold tracking-tight font-serif">
          Supreme Watch
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-border p-2 transition hover:bg-muted">
            <Package className="h-4 w-4" />
          </button>
          <CartSidebar />
          <button className="rounded-full border border-border p-2 transition hover:bg-muted">
            <User className="h-4 w-4" />
          </button>
          <button className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
