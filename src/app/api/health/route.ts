import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Quick health check — GET /api/health
// Tests: DB connection via Supabase REST, table existence
export async function GET() {
  try {
    const [usersRes, productsRes, ordersRes] = await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      status: "ok",
      database: "connected (supabase REST)",
      tables: {
        users: usersRes.count ?? 0,
        products: productsRes.count ?? 0,
        orders: ordersRes.count ?? 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", database: "disconnected", error: message },
      { status: 500 }
    );
  }
}
