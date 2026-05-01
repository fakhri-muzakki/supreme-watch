"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrders } from "../hooks/useOrders";
import DeleteOrderDialog from "./DeleteOrderDialog";
import OrderStatusModal from "./OrderStatusModal";
import type { Order, SortOrder } from "../order";
import OrdersToolBar from "./OrdersToolBar";

export default function OrdersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortOrder>("desc");

  const [selected, setSelected] = useState<Order | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useOrders({
    page,
    limit: 5,
    search,
    status,
    sort,
  });

  const totalPages = Math.ceil((data?.count || 0) / 5);

  return (
    <>
      {/* FILTER */}
      <OrdersToolBar
        search={search}
        setSearch={setSearch}
        setSort={setSort}
        setStatus={setStatus}
        sort={sort}
        status={status}
      />

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((order: Order, i: number) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{(page - 1) * 5 + i + 1}</td>
                <td className="p-3">{order.customer_name}</td>
                <td className="p-3 capitalize">{order.status}</td>

                <td className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelected(order);
                          setOpen(true);
                        }}
                      >
                        Update
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          console.log("detail", order.id);
                        }}
                      >
                        Detail
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => {
                          setSelected(order);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <p className="p-4 text-sm text-muted-foreground">Loading orders...</p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>

      {/* MODAL */}
      {open && selected && (
        <OrderStatusModal
          open={open}
          onClose={() => setOpen(false)}
          order={selected}
          refetch={refetch}
        />
      )}

      {deleteOpen && selected && (
        <DeleteOrderDialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          order={selected}
          refetch={() => refetch()}
        />
      )}
    </>
  );
}
