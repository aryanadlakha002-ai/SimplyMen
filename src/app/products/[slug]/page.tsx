"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  Clock,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { getProductBySlug, products } from "@/lib/data/products";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "usage">(
    "description"
  );
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-primary-dark">
              Product Not Found
            </h1>
            <p className="text-muted mt-2">The product you are looking for does not exist.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Related products (same category, excluding current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white pb-20">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl bg-gradient-to-br from-surface to-primary/5 h-80 md:h-[450px] flex items-center justify-center relative overflow-hidden p-6"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={500}
                height={400}
                className="w-full h-full object-contain"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 rounded-full bg-danger px-3 py-1 text-xs font-bold text-white">
                  {discount}% OFF
                </span>
              )}
              <span className="absolute top-4 right-4 rounded-full bg-surface px-3 py-1 text-[10px] uppercase tracking-wider text-muted">
                {product.category}
              </span>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs uppercase tracking-wider text-muted mb-3">
                {product.category}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary-dark">
                {product.name}
              </h1>
              <p className="text-sm text-muted mt-2">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber text-amber"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-end gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-lg text-muted line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-bold text-success">
                      Save {formatPrice(product.mrp - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary capitalize"
                  >
                    {tag.replace("-", " ")}
                  </span>
                ))}
              </div>

              {/* Quantity + ATC */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-border">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-2.5 text-muted hover:text-foreground transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2.5 font-medium text-sm min-w-[40px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-2.5 text-muted hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors ${
                    addedToCart
                      ? "bg-success text-white"
                      : product.inStock
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-muted/30 text-muted cursor-not-allowed"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </>
                  )}
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: "Free shipping over ₹999" },
                  { icon: Shield, label: "100% genuine products" },
                  { icon: Clock, label: "Discreet packaging" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 rounded-xl bg-surface p-3 text-center"
                  >
                    <Icon className="h-4 w-4 text-secondary" />
                    <span className="text-[10px] text-muted leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mb-16">
            <div className="flex gap-1 border-b border-border/50 mb-6">
              {(
                [
                  { key: "description", label: "Description" },
                  { key: "ingredients", label: "Ingredients" },
                  { key: "usage", label: "How to Use" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="product-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/50 bg-white p-6"
            >
              {activeTab === "description" && (
                <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </p>
              )}
              {activeTab === "ingredients" && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Ingredients</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
              )}
              {activeTab === "usage" && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">How to Use</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {product.howToUse}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold text-primary-dark mb-6">
                You may also like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.slug}`}
                    className="group rounded-2xl border border-border/50 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-40 bg-gradient-to-br from-surface to-primary/5 flex items-center justify-center">
                      <ShoppingBag className="h-10 w-10 text-primary/20 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-primary-dark line-clamp-2">
                        {rp.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-base font-bold text-primary">
                          {formatPrice(rp.price)}
                        </span>
                        {rp.mrp > rp.price && (
                          <span className="text-xs text-muted line-through">
                            {formatPrice(rp.mrp)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
