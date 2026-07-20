"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  Menu,
  X,
  ShoppingCart,
  ClipboardCheck,
  Phone,
  ShoppingBag,
  Mail,
  Shield,
  Truck,
  LogIn,
  Home,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/assessment", label: "Assessment", icon: ClipboardCheck },
  { href: "/blogs", label: "Blogs", icon: BookOpen },
  { href: "/products", label: "Kits", icon: ShoppingBag },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isSignedIn } = useAuth();

  return (
    <>
      {/* Top info bar */}
      <div className="bg-primary-dark text-white/80 text-[11px] font-medium hidden sm:block">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-8">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-accent/80" />
              100% Discreet Packaging
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-3 w-3 text-accent/80" />
              Free Delivery Over ₹999
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+918001234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" />
              +91 800 123 4567
            </a>
            <a href="mailto:care@simplymen.care" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3 w-3" />
              care@simplymen.care
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-xl">
        <nav className="h-16 px-4 sm:px-6 lg:px-10 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Logo — left */}
          <Link href="/" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="SimplyMen"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav — center */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  "text-foreground/70 hover:text-primary hover:bg-surface"
                )}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Phone — desktop only */}
            <a
              href="tel:+918001234567"
              className="hidden lg:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted hover:text-primary hover:bg-surface transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs font-medium">Call Us</span>
            </a>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 hover:bg-surface hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-all duration-200 hover:shadow-md cursor-pointer">
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              </SignInButton>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 hover:bg-surface"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-border/40 bg-white px-4 pb-4 pt-2">
            {/* Mobile top badges */}
            <div className="flex gap-3 mb-3 pb-3 border-b border-border/40">
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <Shield className="h-3 w-3 text-accent" />
                Discreet Packaging
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <Truck className="h-3 w-3 text-accent" />
                Free Delivery ₹999+
              </span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-surface hover:text-primary"
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border/40">
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white cursor-pointer"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center justify-center py-2">
                  <UserButton />
                </div>
              )}
            </div>
            <a
              href="tel:+918001234567"
              className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted"
            >
              <Phone className="h-3.5 w-3.5" />
              Need help? Call +91 800 123 4567
            </a>
          </div>
        )}
      </header>
    </>
  );
}
