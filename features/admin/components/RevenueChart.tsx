"use client";

import { useEffect, useRef, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export interface Revenue {
  date: string;
  total: number;
}

export default function RevenueChart({
  initialData,
}: {
  initialData: Revenue[];
}) {
  const [range, setRange] = useState(7);
  const [data, setData] = useState<Revenue[]>(initialData);
  const mounted = useRef(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (days: number) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/revenue?days=${days}`);
      const json = await res.json();

      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) {
      fetchData(range);
    }

    mounted.current = true;
  }, [range]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Revenue</h2>

        {/* DROPDOWN */}
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border rounded-xl px-3 py-2 text-sm bg-background"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </div>

      {/* CHART */}
      <div className="h-80 w-full border rounded-2xl p-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("id-ID", {
                    notation: "compact",
                  }).format(value)
                }
              />

              <Tooltip
                formatter={(value) => {
                  if (typeof value !== "number") return value;

                  return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(value);
                }}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#111827"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
