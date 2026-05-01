import type { SortOrder } from "../order";

interface OrdersToolBarProps {
  status: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  sort: SortOrder;
  setSort: React.Dispatch<React.SetStateAction<SortOrder>>;
}

const OrdersToolBar = ({
  status,
  sort,
  search,
  setSearch,
  setStatus,
  setSort,
}: OrdersToolBarProps) => {
  return (
    <div className="flex gap-3">
      <input
        placeholder="Search..."
        className="border rounded-xl px-3 py-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded-xl px-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        className="border rounded-xl px-3"
        value={sort}
        onChange={(e) => setSort(e.target.value as "asc" | "desc")}
      >
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
    </div>
  );
};

export default OrdersToolBar;
