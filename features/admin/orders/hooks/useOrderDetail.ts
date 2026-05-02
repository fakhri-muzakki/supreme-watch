import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "../order.service";

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ["order-detail", id],
    queryFn: () => getOrderDetail(id),
    enabled: !!id,
  });
}
