"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Package,
  User,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  IndianRupee,
  Calendar,
  Pill,
  RefreshCw,
} from "lucide-react";
import { getAllOrders, getUserRole } from "@/app/actions/admin";

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

type CallStatus = "pending" | "talked" | "issue";

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

/* ═══════════════════════════════════════════════════
   LOCAL-STORAGE HELPERS (call-status persistence)
   ═══════════════════════════════════════════════════ */

const STORAGE_KEY = "simplymens_doctor_call_status";

function loadCallStatuses(): Record<string, { status: CallStatus; note: string; updatedAt: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCallStatuses(data: Record<string, { status: CallStatus; note: string; updatedAt: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ═══════════════════════════════════════════════════
   STATUS STYLES
   ═══════════════════════════════════════════════════ */

const callStatusConfig: Record<
  CallStatus,
  { label: string; icon: typeof CheckCircle2; color: string; bg: string; border: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  talked: {
    label: "Talked to Patient",
    icon: CheckCircle2,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  issue: {
    label: "Issue Encountered",
    icon: AlertTriangle,
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */

export default function DoctorDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [callStatuses, setCallStatuses] = useState<
    Record<string, { status: CallStatus; note: string; updatedAt: string }>
  >({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | CallStatus>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load orders — check role first
  async function loadOrders() {
    try {
      setLoading(true);

      // Check user role (returns null if DB unavailable or not authenticated)
      const role = await getUserRole();
      if (role !== "ADMIN" && role !== "DOCTOR") {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      const res = await getAllOrders(page, 50);
      if ("orders" in res) {
        setOrders(res.orders as unknown as Order[]);
        setTotalPages(res.pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Access denied. Doctor/Admin role required.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
    setCallStatuses(loadCallStatuses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Update call status
  function updateCallStatus(orderId: string, status: CallStatus) {
    const updated = {
      ...callStatuses,
      [orderId]: {
        status,
        note: callStatuses[orderId]?.note || noteInputs[orderId] || "",
        updatedAt: new Date().toISOString(),
      },
    };
    setCallStatuses(updated);
    saveCallStatuses(updated);
  }

  // Save note
  function saveNote(orderId: string) {
    const note = noteInputs[orderId]?.trim() || "";
    const updated = {
      ...callStatuses,
      [orderId]: {
        ...callStatuses[orderId],
        status: callStatuses[orderId]?.status || ("pending" as CallStatus),
        note,
        updatedAt: new Date().toISOString(),
      },
    };
    setCallStatuses(updated);
    saveCallStatuses(updated);
  }

  // Get call status for an order
  function getCallStatus(orderId: string): CallStatus {
    return callStatuses[orderId]?.status || "pending";
  }

  // Filter & search
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Filter by call status
      if (filterStatus !== "all" && getCallStatus(o.id) !== filterStatus) return false;
      // Search
      if (search) {
        const q = search.toLowerCase();
        return (
          o.fullName.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.id.toLowerCase().includes(q) ||
          o.items.some((i) => i.name.toLowerCase().includes(q))
        );
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, search, filterStatus, callStatuses]);

  // Stats
  const stats = useMemo(() => {
    const all = orders.length;
    const pending = orders.filter((o) => getCallStatus(o.id) === "pending").length;
    const talked = orders.filter((o) => getCallStatus(o.id) === "talked").length;
    const issues = orders.filter((o) => getCallStatus(o.id) === "issue").length;
    return { all, pending, talked, issues };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, callStatuses]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-muted text-sm">Loading patient orders…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center max-w-sm">
          <Stethoscope className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-primary-dark font-display mb-2">Doctor Dashboard</h1>
          <p className="text-muted text-sm mb-4">{error}</p>
          <p className="text-xs text-muted/60">
            This dashboard requires admin/doctor access via Clerk authentication.
            Contact the administrator to get access.
          </p>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-primary-dark font-display mb-2">Access Denied</h1>
          <p className="text-muted text-sm mb-4">
            This dashboard is restricted to authorized doctors and administrators only.
          </p>
          <p className="text-xs text-muted/60 mb-6">
            If you are a doctor, please contact the administrator to set your role to <strong>DOCTOR</strong> or <strong>ADMIN</strong> in the system.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Stethoscope className="h-7 w-7 text-accent" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold">Doctor Dashboard</h1>
          </div>
          <p className="text-white/60 text-sm">
            Manage patient follow-up calls &middot; Mon – Sat, 9 AM – 5 PM
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Orders", value: stats.all, icon: Package, color: "text-primary", bg: "bg-primary/10" },
            { label: "Pending Calls", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Talked", value: stats.talked, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { label: "Issues", value: stats.issues, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm"
            >
              <div className={`flex items-center gap-2 mb-1.5 ${s.color}`}>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-primary-dark font-display">{s.value}</p>
              <p className="text-[11px] text-muted font-medium uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name, phone, email, or medication…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "talked", "issue"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === f
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white border border-border text-muted hover:text-primary hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Filter className="h-3 w-3" />
                  {f === "all" ? "All" : f === "pending" ? "Pending" : f === "talked" ? "Talked" : "Issues"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-muted/30 mx-auto mb-3" />
            <p className="text-muted text-sm">No orders match your filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order, idx) => {
              const cs = getCallStatus(order.id);
              const csConfig = callStatusConfig[cs];
              const CsIcon = csConfig.icon;
              const isExpanded = expandedId === order.id;
              const orderDate = new Date(order.createdAt);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`rounded-2xl border-2 bg-white overflow-hidden transition-all ${csConfig.border}`}
                >
                  {/* Order Header — always visible */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full px-5 py-4 flex items-center gap-4 text-left cursor-pointer hover:bg-surface/50 transition-colors"
                  >
                    {/* Status badge */}
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${csConfig.bg}`}>
                      <CsIcon className={`h-4 w-4 ${csConfig.color}`} />
                    </div>

                    {/* Patient info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-primary-dark">{order.fullName}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${csConfig.bg} ${csConfig.color}`}>
                          {csConfig.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {(order.total / 100).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Medication count */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
                      <Pill className="h-3.5 w-3.5" />
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted shrink-0" />
                    )}
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-border/40 px-5 py-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Left: Patient & Order Info */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Patient Details</h4>
                            <div className="space-y-1.5 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="h-3.5 w-3.5 text-muted" />
                                <span>{order.fullName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-muted" />
                                <a href={`tel:${order.phone}`} className="text-primary hover:underline font-medium">
                                  {order.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-muted" />
                                <span className="text-muted">{order.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-muted" />
                                <span className="text-muted">{order.city}, {order.state} {order.pincode}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Order Info</h4>
                            <div className="text-sm text-muted space-y-1">
                              <p>Order ID: <span className="font-mono text-foreground">{order.id.slice(0, 12)}…</span></p>
                              <p>Payment: <span className="font-medium text-foreground">{order.paymentStatus}</span></p>
                              <p>Shipping: <span className="font-medium text-foreground">{order.status}</span></p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Medications & Actions */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                              Medications Ordered
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between rounded-lg bg-surface px-3 py-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <Pill className="h-3.5 w-3.5 text-primary/50" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                  </div>
                                  <span className="text-xs text-muted">×{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Call Status Actions */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                              Call Status
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                              {(["pending", "talked", "issue"] as CallStatus[]).map((s) => {
                                const cfg = callStatusConfig[s];
                                const active = cs === s;
                                return (
                                  <button
                                    key={s}
                                    onClick={() => updateCallStatus(order.id, s)}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border-2 ${
                                      active
                                        ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                                        : "bg-white border-border/40 text-muted hover:border-primary/20"
                                    }`}
                                  >
                                    <cfg.icon className="h-3.5 w-3.5" />
                                    {cfg.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Doctor Notes */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                              Notes
                            </h4>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={noteInputs[order.id] ?? callStatuses[order.id]?.note ?? ""}
                                onChange={(e) =>
                                  setNoteInputs((prev) => ({ ...prev, [order.id]: e.target.value }))
                                }
                                placeholder="Add notes about this call…"
                                className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                              <button
                                onClick={() => saveNote(order.id)}
                                className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                            {callStatuses[order.id]?.updatedAt && (
                              <p className="text-[10px] text-muted mt-1">
                                Last updated: {new Date(callStatuses[order.id].updatedAt).toLocaleString("en-IN")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 cursor-pointer hover:bg-surface"
            >
              Previous
            </button>
            <span className="text-sm text-muted">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 cursor-pointer hover:bg-surface"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
