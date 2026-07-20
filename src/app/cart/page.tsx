"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Truck,
  Shield,
  Tag,
  Package,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());
  const itemCount = useCartStore((s) => s.getItemCount());

  const isEmpty = items.length === 0;

  // Calculate MRP total for savings display
  const mrpTotal = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const savings = mrpTotal - subtotal;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white pb-20">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-primary-dark mb-2"
          >
            Your Cart
          </motion.h1>
          <p className="text-sm text-muted mb-8">
            {isEmpty ? "Your cart is empty" : `${itemCount} item${itemCount > 1 ? "s" : ""} in your cart`}
          </p>

          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ShoppingBag className="h-16 w-16 text-muted/30 mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-primary-dark">
                Nothing here yet
              </h2>
              <p className="text-sm text-muted mt-2 mb-6">
                Browse our products or take the assessment to get personalized recommendations.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary text-primary px-6 py-3 text-sm font-semibold hover:bg-primary/5 transition-colors"
                >
                  Take Assessment
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items — read-only bundle list */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border/50 bg-white overflow-hidden">
                  {/* Bundle header */}
                  <div className="bg-gradient-to-r from-primary-dark to-primary px-5 py-4 flex items-center gap-3">
                    <Package className="h-5 w-5 text-accent" />
                    <span className="text-white font-semibold text-sm">
                      Your Recommended Kit &middot; {itemCount} Products
                    </span>
                  </div>

                  {/* Product list — no remove / no quantity controls */}
                  <div className="divide-y divide-border/40">
                    {items.map((item, idx) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        {/* Quantity badge + product image */}
                        <div className="relative shrink-0">
                          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-surface to-primary/5 flex items-center justify-center border border-border/40">
                            <ShoppingBag className="h-7 w-7 text-primary/20" />
                          </div>
                          <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            {item.quantity}
                          </span>
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.product.slug}`}>
                            <h3 className="text-sm font-semibold text-primary-dark hover:text-primary transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-muted mt-0.5 line-clamp-1">
                            {item.product.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-foreground">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          {item.product.mrp > item.product.price && (
                            <p className="text-[10px] text-muted line-through">
                              {formatPrice(item.product.mrp * item.quantity)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Discount code placeholder */}
                <div className="mt-4 rounded-xl border border-border/50 bg-white p-4 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Discount code or gift card"
                    className="flex-1 text-sm border border-border/60 rounded-lg px-4 py-2.5 bg-surface/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted/60"
                  />
                  <button className="shrink-0 rounded-lg border border-border/60 px-5 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:border-primary/40 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-border/50 bg-white p-6 sticky top-24">
                  <h3 className="font-display text-lg font-semibold text-primary-dark mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Subtotal &middot; {itemCount} items</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-success">
                        <span>You save</span>
                        <span className="font-medium">-{formatPrice(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted">Shipping</span>
                      <span className={`font-medium ${shipping === 0 ? "text-success" : ""}`}>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-muted">
                        Free shipping on orders above ₹999
                      </p>
                    )}
                    <div className="border-t border-border/40 pt-3">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-foreground">Total</span>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                          {mrpTotal > subtotal && (
                            <p className="text-xs text-muted line-through">{formatPrice(mrpTotal)}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted mt-1">Inclusive of all taxes</p>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-5 flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Trust */}
                  <div className="mt-5 space-y-2">
                    {[
                      { icon: Truck, text: "Free shipping over ₹999" },
                      { icon: Shield, text: "Secure payment with Razorpay" },
                      { icon: Tag, text: "Discreet packaging guaranteed" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-xs text-muted">
                        <Icon className="h-3.5 w-3.5 text-secondary" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
