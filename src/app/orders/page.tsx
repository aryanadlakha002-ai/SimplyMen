"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/app/actions/orders";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

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
  subtotal: number;
  shipping: number;
  discount: number;
  fullName: string;
  city: string;
  state: string;
  trackingNumber: string | null;
  items: OrderItem[];
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  PENDING: { icon: <Clock className="w-4 h-4" />, color: "text-yellow-600 bg-yellow-50", label: "Pending" },
  CONFIRMED: { icon: <Package className="w-4 h-4" />, color: "text-blue-600 bg-blue-50", label: "Confirmed" },
  PROCESSING: { icon: <Package className="w-4 h-4" />, color: "text-indigo-600 bg-indigo-50", label: "Processing" },
  SHIPPED: { icon: <Package className="w-4 h-4" />, color: "text-purple-600 bg-purple-50", label: "Shipped" },
  DELIVERED: { icon: <CheckCircle className="w-4 h-4" />, color: "text-green-600 bg-green-50", label: "Delivered" },
  CANCELLED: { icon: <XCircle className="w-4 h-4" />, color: "text-red-600 bg-red-50", label: "Cancelled" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    getUserOrders().then((res) => {
      if ("orders" in res) {
        setOrders(res.orders as unknown as Order[]);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="animate-pulse text-[#5D6D7E] font-[family-name:var(--font-body)]">Loading orders…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-36 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0B2545] font-[family-name:var(--font-display)] mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-[#5D6D7E]/30 mx-auto mb-4" />
            <p className="text-[#5D6D7E] font-[family-name:var(--font-body)]">
              No orders yet. Complete an assessment to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const status = statusConfig[order.status] ?? statusConfig.PENDING;
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-[#EBF5FB] shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2C3E50] font-[family-name:var(--font-body)]">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-[#5D6D7E]">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-[#0B2545]">
                        ₹{(order.total / 100).toLocaleString("en-IN")}
                      </p>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#5D6D7E]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#5D6D7E]" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-[#EBF5FB]">
                      <div className="pt-4 space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-[#2C3E50]">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="text-[#5D6D7E]">
                              ₹{((item.price * item.quantity) / 100).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-dashed border-[#EBF5FB] pt-3 space-y-1 text-sm">
                          <div className="flex justify-between text-[#5D6D7E]">
                            <span>Subtotal</span>
                            <span>₹{(order.subtotal / 100).toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between text-[#5D6D7E]">
                            <span>Shipping</span>
                            <span>{order.shipping === 0 ? "FREE" : `₹${(order.shipping / 100).toLocaleString("en-IN")}`}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span>−₹{(order.discount / 100).toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-[#0B2545]">
                            <span>Total</span>
                            <span>₹{(order.total / 100).toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                        {order.trackingNumber && (
                          <div className="mt-3 p-3 bg-[#EBF5FB] rounded-lg text-sm">
                            <span className="text-[#5D6D7E]">Tracking: </span>
                            <span className="font-medium text-[#1A5276]">{order.trackingNumber}</span>
                          </div>
                        )}
                        <p className="text-xs text-[#5D6D7E] mt-2">
                          Delivering to {order.fullName}, {order.city}, {order.state}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
