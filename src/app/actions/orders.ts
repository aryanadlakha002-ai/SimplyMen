"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase, cuid } from "@/lib/supabase";

interface CreateOrderInput {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shipping: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

export async function createOrder(input: CreateOrderInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized — please sign in." };
  }

  try {
    const orderId = cuid();
    const now = new Date().toISOString();

    // Insert order
    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      userId,
      fullName: input.shipping.fullName,
      email: input.shipping.email,
      phone: input.shipping.phone,
      address: input.shipping.address,
      city: input.shipping.city,
      state: input.shipping.state,
      pincode: input.shipping.pincode,
      country: input.shipping.country,
      subtotal: input.subtotal,
      shipping: input.shippingCost,
      discount: input.discount,
      total: input.total,
      status: "PENDING",
      paymentStatus: "PENDING",
      createdAt: now,
      updatedAt: now,
    });

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = input.items.map((item) => ({
      id: cuid(),
      orderId,
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    if (orderItems.length > 0) {
      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) console.error("Failed to insert order items:", itemsError);
    }

    return { success: true, orderId };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { error: "Failed to create order. Please try again." };
  }
}

export async function getUserOrders() {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    // Fetch orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("userId", userId)
      .order("createdAt", { ascending: false });

    if (error) throw error;

    // Fetch items for all orders
    if (orders && orders.length > 0) {
      const orderIds = orders.map((o: Record<string, unknown>) => o.id as string);
      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .in("orderId", orderIds);

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

    return { orders: orders ?? [] };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return { error: "Failed to fetch orders." };
  }
}
