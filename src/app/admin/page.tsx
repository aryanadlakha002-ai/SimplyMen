"use client";

import { useEffect, useState } from "react";
import { getAdminStats, getAllOrders, updateOrderStatus, updateTrackingNumber } from "@/app/actions/admin";
import { motion } from "framer-motion";
import {
  Package,
  Users,
  IndianRupee,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Search,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  paymentStatus: string;
  total: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  trackingNumber: string | null;
  items: OrderItem[];
}

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalUsers: number;
}

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-700",
  CONFIRMED: "bg-blue-50 text-blue-700",
  PROCESSING: "bg-indigo-50 text-indigo-700",
  SHIPPED: "bg-purple-50 text-purple-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  async function loadData() {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        getAdminStats(),
        getAllOrders(page),
      ]);
      setStats(statsRes);
      if ("orders" in ordersRes) {
        setOrders(ordersRes.orders as unknown as Order[]);
        setTotalPages(ordersRes.pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Access denied");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function handleStatusChange(orderId: string, status: string) {
    await updateOrderStatus(orderId, status as typeof STATUS_OPTIONS[number]);
    loadData();
  }

  async function handleAddTracking(orderId: string) {
    const num = trackingInputs[orderId]?.trim();
    if (!num) return;
    await updateTrackingNumber(orderId, num);
    setTrackingInputs((prev) => ({ ...prev, [orderId]: "" }));
    loadData();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="animate-pulse text-[#5D6D7E] font-[family-name:var(--font-body)]">
          Loading dashboard…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-xl font-bold text-[#0B2545] font-[family-name:var(--font-display)]">
            Access Denied
          </p>
          <p className="text-[#5D6D7E] mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.fullName.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.phone.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-36 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0B2545] font-[family-name:var(--font-display)] mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { label: "Total Orders", value: stats.totalOrders, icon: <Package className="w-5 h-5" /> },
              { label: "Pending", value: stats.pendingOrders, icon: <Clock className="w-5 h-5" /> },
              {
                label: "Revenue",
                value: `₹${(stats.totalRevenue / 100).toLocaleString("en-IN")}`,
                icon: <IndianRupee className="w-5 h-5" />,
              },
              { label: "Users", value: stats.totalUsers, icon: <Users className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[#EBF5FB] p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 text-[#1A5276] mb-2">
                  {stat.icon}
                  <span className="text-xs font-medium text-[#5D6D7E] uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#0B2545] font-[family-name:var(--font-display)]">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D6D7E]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or order ID…"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#EBF5FB] bg-white text-sm text-[#2C3E50] placeholder:text-[#5D6D7E]/50 focus:outline-none focus:ring-2 focus:ring-[#48C9B0]/40"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#EBF5FB] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#EBF5FB]/50 text-left text-xs uppercase tracking-wider text-[#5D6D7E]">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Tracking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBF5FB]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#EBF5FB]/20">
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#2C3E50]">#{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-[#5D6D7E]">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[#2C3E50]">{order.fullName}</p>
                      <p className="text-xs text-[#5D6D7E]">{order.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      {order.items.map((item) => (
                        <p key={item.id} className="text-[#5D6D7E]">
                          {item.name} ×{item.quantity}
                        </p>
                      ))}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#0B2545]">
                      ₹{(order.total / 100).toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer ${statusStyles[order.status] ?? ""}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      {order.trackingNumber ? (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Truck className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-[#2C3E50]">{order.trackingNumber}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={trackingInputs[order.id] ?? ""}
                            onChange={(e) =>
                              setTrackingInputs((prev) => ({
                                ...prev,
                                [order.id]: e.target.value,
                              }))
                            }
                            placeholder="AWB #"
                            className="w-24 text-xs px-2 py-1 rounded-lg border border-[#EBF5FB] focus:outline-none focus:ring-1 focus:ring-[#48C9B0]"
                          />
                          <button
                            onClick={() => handleAddTracking(order.id)}
                            className="text-xs text-[#148F77] font-medium hover:underline"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-[#5D6D7E]">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-[#EBF5FB]">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-sm text-[#1A5276] disabled:text-[#5D6D7E]/30"
              >
                ← Previous
              </button>
              <span className="text-sm text-[#5D6D7E]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-sm text-[#1A5276] disabled:text-[#5D6D7E]/30"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
