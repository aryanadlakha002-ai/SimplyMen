"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// Hardcoded admin/doctor emails — fallback when DB is unreachable
const ADMIN_EMAILS = ["aryanadlakha002@gmail.com"];
const DOCTOR_EMAILS: string[] = []; // add doctor emails here

/** Get the signed-in user's email from Clerk API */
async function getClerkEmail(): Promise<string | null> {
  try {
    const user = await currentUser();
    return user?.emailAddresses?.[0]?.emailAddress ?? null;
  } catch {
    return null;
  }
}

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // DB check via Supabase REST
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (user?.role === "ADMIN") return user;

  // Fallback: check Clerk email against admin list
  const email = await getClerkEmail();
  if (email && ADMIN_EMAILS.includes(email)) return { id: userId, role: "ADMIN" as const, email };
  throw new Error("Forbidden");
}

/** Allow both ADMIN and DOCTOR roles */
async function requireDoctorOrAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (user && (user.role === "ADMIN" || user.role === "DOCTOR")) return user;

  const email = await getClerkEmail();
  if (email && (ADMIN_EMAILS.includes(email) || DOCTOR_EMAILS.includes(email))) {
    return { id: userId, role: "ADMIN" as const, email: email };
  }
  throw new Error("Forbidden");
}

/** Check user role without throwing — returns role string or null */
export async function getUserRole(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (user?.role) return user.role;

  // Fallback: check Clerk email
  const email = await getClerkEmail();
  if (email && ADMIN_EMAILS.includes(email)) return "ADMIN";
  if (email && DOCTOR_EMAILS.includes(email)) return "DOCTOR";
  return null;
}

export async function getAllOrders(page = 1, limit = 20) {
  await requireDoctorOrAdmin();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Fetch orders (with pagination)
  const { data: orders, count } = await supabase
    .from("orders")
    .select("*", { count: "exact" })
    .order("createdAt", { ascending: false })
    .range(from, to);

  const total = count ?? 0;

  // Fetch order_items for these orders
  if (orders && orders.length > 0) {
    const orderIds = orders.map((o: Record<string, unknown>) => o.id as string);
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .in("orderId", orderIds);

    // Attach items to each order
    const itemsByOrder = new Map<string, Record<string, unknown>[]>();
    for (const item of items ?? []) {
      const list = itemsByOrder.get(item.orderId as string) ?? [];
      list.push(item as Record<string, unknown>);
      itemsByOrder.set(item.orderId as string, list);
    }
    for (const order of orders) {
      (order as Record<string, unknown>).items = itemsByOrder.get(order.id as string) ?? [];
    }
  }

  return { orders: orders ?? [], total, pages: Math.ceil(total / limit) };
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) {
  await requireAdmin();

  const { data: order, error } = await supabase
    .from("orders")
    .update({ status, updatedAt: new Date().toISOString() })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { success: true, order };
}

export async function updateTrackingNumber(orderId: string, trackingNumber: string) {
  await requireAdmin();

  const { data: order, error } = await supabase
    .from("orders")
    .update({ trackingNumber, status: "SHIPPED", updatedAt: new Date().toISOString() })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { success: true, order };
}

export async function getAdminStats() {
  await requireAdmin();

  const [ordersRes, pendingRes, paidRes, usersRes] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    supabase.from("orders").select("total").eq("paymentStatus", "PAID"),
    supabase.from("users").select("*", { count: "exact", head: true }),
  ]);

  const totalRevenue = (paidRes.data ?? []).reduce(
    (sum: number, o: Record<string, unknown>) => sum + ((o.total as number) ?? 0),
    0
  );

  return {
    totalOrders: ordersRes.count ?? 0,
    pendingOrders: pendingRes.count ?? 0,
    totalRevenue,
    totalUsers: usersRes.count ?? 0,
  };
}
