import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const linkColumns = [
  {
    heading: "Treatment Programs",
    links: [
      { label: "Confidence Recovery", href: "/programs/confidence-recovery" },
      { label: "Performance Control", href: "/programs/performance-control" },
      { label: "Restore Hormonal Balance", href: "/programs/testosterone-restore" },
      { label: "Revive Your Libido", href: "/programs/libido-revival" },
      { label: "Complete Men's Health", href: "/programs/complete-health" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQs", href: "/#faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Simply Men", href: "/about" },
      { label: "Meet Our Experts", href: "/#experts" },
      { label: "Health Blog", href: "/blogs" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaXTwitter, label: "X (Twitter)", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#F7F3EE" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-x-24 gap-y-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/images/logo.png"
                alt="SimplyMen"
                className="w-[170px] h-auto object-contain"
              />
            </Link>
            <p
              className="text-[18px] leading-[1.8] max-w-[360px]"
              style={{ color: "#667085" }}
            >
              Premium clinical wellness for the modern man. Backed by doctors, driven by science, delivered with absolute discretion.
            </p>
            <div className="flex items-center gap-3 mt-7">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center justify-center h-7 w-7 text-foreground/50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {linkColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[18px] font-semibold text-primary-dark mb-6">
                {column.heading}
              </h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label} className="leading-[2.2]">
                    <Link
                      href={link.href}
                      className="text-[17px] hover:text-teal-600 transition-colors no-underline"
                      style={{ color: "#667085" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t" style={{ borderColor: "#E4DDD2" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: "#667085" }}>
              © 2026 Simply Men Health Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm" style={{ color: "#667085" }}>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                +91 XXXXX XXXXX
              </a>
              <a href="mailto:care@simplymen.care" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                <Mail className="h-4 w-4" strokeWidth={1.75} />
                care@simplymen.care
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
