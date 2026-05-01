import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../order.service";
// import { getOrders } from "../services/orders.service";

export function useOrders(params: {
  page: number;
  limit: number;
  search: string;
  status: string;
  sort: "asc" | "desc";
}) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
  });
}
