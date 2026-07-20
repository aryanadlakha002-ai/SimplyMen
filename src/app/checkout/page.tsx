"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Truck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Lock,
  ChevronDown,
  Search,
  Phone,
  Clock,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/app/actions/orders";
import { countriesSorted, getCountryByCode, type CountryData } from "@/lib/data/countries";

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;   // ISO code e.g. "IN"
  dialCode: string;      // e.g. "+91"
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;       // ISO code e.g. "IN"
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "IN",
    dialCode: "+91",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "IN",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ccOpen, setCcOpen] = useState(false);
  const [ccSearch, setCcSearch] = useState("");
  const ccRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node)) {
        setCcOpen(false);
        setCcSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filtered countries for phone code search
  const filteredCcCountries = useMemo(() => {
    if (!ccSearch.trim()) return countriesSorted;
    const q = ccSearch.toLowerCase();
    return countriesSorted.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [ccSearch]);

  // Derive states from selected country
  const selectedCountry = useMemo(
    () => getCountryByCode(formData.country),
    [formData.country]
  );
  const statesList = selectedCountry?.states ?? [];
  const selectedPhoneCountry = useMemo(
    () => getCountryByCode(formData.countryCode),
    [formData.countryCode]
  );

  // Redirect if cart is empty (except success)
  if (items.length === 0 && step !== "success") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-12 w-12 text-muted/30 mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-primary-dark">Cart is empty</h2>
            <p className="text-sm text-muted mt-2 mb-4">Add products before checking out.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Required";
    if (!formData.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.phone.trim()) errs.phone = "Required";
    else if (formData.phone.length < 7) errs.phone = "Enter a valid phone number";
    if (!formData.address.trim()) errs.address = "Required";
    if (!formData.city.trim()) errs.city = "Required";
    if (statesList.length > 0 && !formData.state.trim()) errs.state = "Select a state";
    if (!formData.pincode.trim()) errs.pincode = "Required";
    if (!formData.country.trim()) errs.country = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueToPayment = () => {
    if (!validate()) return;
    setStep("payment");
  };

  const handlePayment = async () => {
    // Create order in database, then simulate Razorpay flow
    try {
      const result = await createOrder({
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: Math.round(item.product.price * 100), // store in paise
          quantity: item.quantity,
        })),
        shipping: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.dialCode}${formData.phone}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        subtotal: Math.round(subtotal * 100),
        shippingCost: Math.round(shipping * 100),
        discount: 0,
        total: Math.round(total * 100),
      });

      // Log error but don't block checkout if DB is unavailable
      if (result.error) {
        console.warn("Order DB save failed (proceeding anyway):", result.error);
      }
    } catch (err) {
      console.warn("Order creation failed (proceeding anyway):", err);
    }

    // Simulated Razorpay payment — replace with real integration later
    setTimeout(() => {
      setStep("success");
      clearCart();
    }, 1500);
  };

  const updateField = (key: keyof FormData, val: string) => {
    setFormData((f) => {
      const updated = { ...f, [key]: val };
      // When country changes, reset state and update dial code to match
      if (key === "country") {
        updated.state = "";
        const c = getCountryByCode(val);
        if (c) {
          updated.countryCode = val;
          updated.dialCode = c.dialCode;
        }
      }
      // When phone country code changes, update dial code
      if (key === "countryCode") {
        const c = getCountryByCode(val);
        if (c) updated.dialCode = c.dialCode;
      }
      return updated;
    });
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white pb-20">
        <div className="mx-auto max-w-4xl px-4 py-10">
          {/* Page title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-primary-dark mb-2"
          >
            Checkout
          </motion.h1>

          {/* Steps bar */}
          {step !== "success" && (
            <div className="flex items-center gap-2 mb-8">
              {["Shipping Address", "Payment"].map((label, i) => {
                const stepKeys = ["address", "payment"] as const;
                const isActive = stepKeys.indexOf(step as "address" | "payment") >= i;
                const isCurrent = stepKeys[i] === step;
                return (
                  <div key={label} className="flex items-center gap-2">
                    {i > 0 && (
                      <div className={`w-10 h-px ${isActive ? "bg-primary" : "bg-border"}`} />
                    )}
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        isCurrent
                          ? "bg-primary text-white"
                          : isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-surface text-muted"
                      }`}
                    >
                      {i + 1}. {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {step !== "success" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form area */}
              <div className="lg:col-span-2">
                {step === "address" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-border/50 bg-white p-6"
                  >
                    <h3 className="font-display text-lg font-semibold text-primary-dark mb-5">
                      Shipping Address
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Full Name — full width */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          placeholder="John Doe"
                          className={`w-full rounded-xl border ${
                            errors.fullName ? "border-danger" : "border-border"
                          } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-danger mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@email.com"
                          className={`w-full rounded-xl border ${
                            errors.email ? "border-danger" : "border-border"
                          } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                        />
                        {errors.email && (
                          <p className="text-xs text-danger mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone with searchable country code */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Phone
                        </label>
                        <div className="flex">
                          {/* Searchable country code picker */}
                          <div className="relative shrink-0" ref={ccRef}>
                            <button
                              type="button"
                              onClick={() => { setCcOpen(!ccOpen); setCcSearch(""); }}
                              className="flex items-center gap-1 h-full rounded-l-xl border border-r-0 border-border bg-surface/60 pl-3 pr-2 py-2.5 text-sm font-medium text-foreground hover:bg-surface transition-colors cursor-pointer"
                            >
                              <span>{selectedPhoneCountry?.flag}</span>
                              <span className="text-xs">{formData.dialCode}</span>
                              <ChevronDown className={`h-3 w-3 text-muted transition-transform ${ccOpen ? "rotate-180" : ""}`} />
                            </button>

                            {ccOpen && (
                              <div className="absolute top-full left-0 mt-1 z-50 w-64 rounded-xl border border-border bg-white shadow-xl overflow-hidden">
                                {/* Search input */}
                                <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40">
                                  <Search className="h-3.5 w-3.5 text-muted shrink-0" />
                                  <input
                                    type="text"
                                    value={ccSearch}
                                    onChange={(e) => setCcSearch(e.target.value)}
                                    placeholder="Search country or code..."
                                    autoFocus
                                    className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-muted/50"
                                  />
                                </div>
                                {/* List */}
                                <div className="max-h-48 overflow-y-auto">
                                  {filteredCcCountries.length > 0 ? (
                                    filteredCcCountries.map((c) => (
                                      <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => {
                                          updateField("countryCode", c.code);
                                          setCcOpen(false);
                                          setCcSearch("");
                                        }}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-surface transition-colors text-left ${
                                          formData.countryCode === c.code ? "bg-primary/5 text-primary font-medium" : "text-foreground"
                                        }`}
                                      >
                                        <span className="text-base">{c.flag}</span>
                                        <span className="flex-1 truncate">{c.name}</span>
                                        <span className="text-xs text-muted font-mono">{c.dialCode}</span>
                                      </button>
                                    ))
                                  ) : (
                                    <p className="px-3 py-4 text-xs text-muted text-center">No countries found</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 15))}
                            placeholder="9876543210"
                            className={`flex-1 min-w-0 rounded-r-xl border ${
                              errors.phone ? "border-danger" : "border-border"
                            } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-danger mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Address — full width */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Address
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateField("address", e.target.value)}
                          placeholder="House/Flat no, Street, Locality"
                          className={`w-full rounded-xl border ${
                            errors.address ? "border-danger" : "border-border"
                          } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                        />
                        {errors.address && (
                          <p className="text-xs text-danger mt-1">{errors.address}</p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          placeholder="Mumbai"
                          className={`w-full rounded-xl border ${
                            errors.city ? "border-danger" : "border-border"
                          } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                        />
                        {errors.city && (
                          <p className="text-xs text-danger mt-1">{errors.city}</p>
                        )}
                      </div>

                      {/* State — dropdown (dynamic based on country) */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          State / Province
                        </label>
                        <div className="relative">
                          {statesList.length > 0 ? (
                            <>
                              <select
                                value={formData.state}
                                onChange={(e) => updateField("state", e.target.value)}
                                className={`w-full appearance-none rounded-xl border ${
                                  errors.state ? "border-danger" : "border-border"
                                } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white cursor-pointer ${
                                  !formData.state ? "text-muted/50" : "text-foreground"
                                }`}
                              >
                                <option value="" disabled>
                                  Select state
                                </option>
                                {statesList.map((st) => (
                                  <option key={st} value={st}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                            </>
                          ) : (
                            <input
                              type="text"
                              value={formData.state}
                              onChange={(e) => updateField("state", e.target.value)}
                              placeholder="Enter state / province"
                              className={`w-full rounded-xl border ${
                                errors.state ? "border-danger" : "border-border"
                              } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                            />
                          )}
                        </div>
                        {errors.state && (
                          <p className="text-xs text-danger mt-1">{errors.state}</p>
                        )}
                      </div>

                      {/* Pincode / ZIP */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          {formData.country === "IN" ? "Pincode" : "Postal / ZIP Code"}
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => updateField("pincode", e.target.value.replace(/[^a-zA-Z0-9\s-]/g, "").slice(0, 10))}
                          placeholder={formData.country === "IN" ? "400001" : "Enter postal code"}
                          className={`w-full rounded-xl border ${
                            errors.pincode ? "border-danger" : "border-border"
                          } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted/50`}
                        />
                        {errors.pincode && (
                          <p className="text-xs text-danger mt-1">{errors.pincode}</p>
                        )}
                      </div>

                      {/* Country — full dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Country
                        </label>
                        <div className="relative">
                          <select
                            value={formData.country}
                            onChange={(e) => updateField("country", e.target.value)}
                            className={`w-full appearance-none rounded-xl border ${
                              errors.country ? "border-danger" : "border-border"
                            } px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white cursor-pointer text-foreground`}
                          >
                            {countriesSorted.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        </div>
                        {errors.country && (
                          <p className="text-xs text-danger mt-1">{errors.country}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Link
                        href="/cart"
                        className="flex items-center gap-1 text-sm text-muted hover:text-primary"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cart
                      </Link>
                      <button
                        onClick={handleContinueToPayment}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                      >
                        Continue to Payment
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-border/50 bg-white p-6"
                  >
                    <h3 className="font-display text-lg font-semibold text-primary-dark mb-5">
                      Payment
                    </h3>

                    {/* Shipping summary */}
                    <div className="rounded-xl bg-surface p-4 mb-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-2">
                        Shipping to
                      </h4>
                      <p className="text-sm font-medium text-foreground">{formData.fullName}</p>
                      <p className="text-xs text-muted">
                        {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                      </p>
                      <p className="text-xs text-muted">{formData.dialCode} {formData.phone} · {formData.email}</p>
                      <button
                        onClick={() => setStep("address")}
                        className="text-xs text-primary hover:underline mt-1"
                      >
                        Edit address
                      </button>
                    </div>

                    {/* Payment CTA */}
                    <div className="border-2 border-dashed border-primary/20 rounded-xl p-6 text-center">
                      <CreditCard className="h-10 w-10 text-primary/40 mx-auto mb-3" />
                      <p className="text-sm text-foreground font-medium mb-1">
                        Secure Payment via Razorpay
                      </p>
                      <p className="text-xs text-muted mb-4">
                        UPI, Cards, NetBanking, Wallets — all supported.
                      </p>
                      <button
                        onClick={handlePayment}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                      >
                        <Lock className="h-4 w-4" />
                        Pay {formatPrice(total)}
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => setStep("address")}
                        className="flex items-center gap-1 text-sm text-muted hover:text-primary"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-border/50 bg-white p-5 sticky top-24">
                  <h3 className="font-display text-sm font-semibold text-primary-dark mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
                          <ShoppingBag className="h-4 w-4 text-primary/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-muted">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-xs font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border/40 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Shipping</span>
                      <span className={shipping === 0 ? "text-success" : ""}>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="border-t border-border/40 pt-2 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 8 }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10"
              >
                <CheckCircle2 className="h-8 w-8 text-success" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-primary-dark">
                Order Placed Successfully!
              </h2>
              <p className="text-sm text-muted mt-2 mb-6">
                Thank you for your order. We&apos;ll send a confirmation email with tracking
                details shortly. Your package will arrive in discreet packaging.
              </p>

              {/* ─── Doctor Call Card ─── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5 mb-6 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary-dark">
                      A Specialist Doctor Will Call You
                    </h3>
                    <p className="text-xs text-muted">Included free with your order</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  Our specialized doctor will connect with you to <strong>explain your medication dosage</strong> and <strong>understand your symptoms</strong> in detail — so your treatment is personalized and effective.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Mon – Sat, 9 AM – 5 PM
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    We&apos;ll call on {formData.dialCode} {formData.phone}
                  </div>
                </div>
              </motion.div>

              <div className="rounded-xl bg-surface p-4 text-left mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Order ID</span>
                  <span className="font-mono font-medium text-foreground">
                    SM-{Date.now().toString(36).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Ship to</span>
                  <span className="font-medium text-foreground">{formData.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Delivery</span>
                  <span className="font-medium text-foreground">3-5 business days</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  href="/products"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
