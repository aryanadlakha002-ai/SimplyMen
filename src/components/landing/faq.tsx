"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is my information kept confidential?",
    a: "Absolutely. All your health data is encrypted and stored securely. We never share your personal information with third parties. Your assessment results are only visible to you and your assigned doctor. Billing appears under 'SM Health Services' for discretion.",
  },
  {
    q: "How accurate is the online assessment?",
    a: "Our assessments use internationally validated instruments like IIEF-5 (for ED) and PEDT (for PE), the same tools used by urologists and sexual medicine specialists worldwide. They provide a reliable indication of severity.",
  },
  {
    q: "Will a doctor contact me after I order?",
    a: "Yes! After placing your order, a specialized doctor will call you within our working hours (Mon–Sat, 9 AM – 5 PM) to explain your medication dosage, understand your symptoms, and provide personalized guidance — all at no extra cost.",
  },
  {
    q: "How is the packaging? Will anyone know what's inside?",
    a: "All orders are shipped in plain, unmarked packaging with no product names, logos, or health-related text visible on the outside. The shipping label shows 'SM Health Services' as the sender. Your privacy is our top priority.",
  },
  {
    q: "Do I need a prescription for any products?",
    a: "Our herbal supplements and topical products (like delay sprays) do not require a prescription. For prescription medications like Tadalafil or Dapoxetine, our doctor will assess suitability during your post-order consultation call.",
  },
  {
    q: "How long before I see results?",
    a: "This depends on the treatment type. Topical products like delay sprays work immediately. Prescription ED medications typically work within 30-60 minutes. Herbal supplements and lifestyle changes generally show noticeable improvement within 4-6 weeks of consistent use.",
  },
  {
    q: "What if the treatment doesn't work for me?",
    a: "We offer a 30-day satisfaction guarantee on all non-prescription products. If you're not seeing results, our doctor will help adjust your treatment plan during a follow-up call at no additional cost. Everyone's body is different, and finding the right approach sometimes takes fine-tuning.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary-dark leading-tight">
            Common <span className="text-accent">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className="rounded-xl bg-white border border-border/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-primary-dark pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
