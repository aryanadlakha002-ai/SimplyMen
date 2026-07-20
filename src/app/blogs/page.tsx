"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: "understanding-erectile-dysfunction",
    title: "Understanding Erectile Dysfunction: Causes, Symptoms & Modern Treatments",
    excerpt:
      "Erectile dysfunction affects over 150 million men worldwide. Learn about the physiological and psychological causes, early warning signs, and the latest evidence-based treatment options available today.",
    author: "Dr. Rajesh Kumar",
    date: "2026-03-28",
    readTime: "8 min read",
    category: "Erectile Dysfunction",
    categoryColor: "bg-blue-100 text-blue-700",
    featured: true,
  },
  {
    slug: "premature-ejaculation-guide",
    title: "The Complete Guide to Premature Ejaculation: What Every Man Should Know",
    excerpt:
      "PE is the most common male sexual dysfunction, affecting 1 in 3 men. Discover the PEDT scoring system, behavioral techniques like start-stop and squeeze method, and when to seek professional help.",
    author: "Dr. Amit Sharma",
    date: "2026-03-21",
    readTime: "10 min read",
    category: "Premature Ejaculation",
    categoryColor: "bg-purple-100 text-purple-700",
    featured: true,
  },
  {
    slug: "testosterone-after-30",
    title: "Testosterone Decline After 30: Natural Ways to Maintain Healthy Levels",
    excerpt:
      "Testosterone drops ~1% per year after age 30. Learn how sleep, exercise, diet, and stress management can naturally optimize your hormone levels without TRT.",
    author: "Dr. Vikram Singh",
    date: "2026-03-15",
    readTime: "7 min read",
    category: "Hormonal Health",
    categoryColor: "bg-amber-100 text-amber-700",
  },
  {
    slug: "exercise-and-sexual-health",
    title: "How Exercise Directly Improves Your Sexual Performance",
    excerpt:
      "150 minutes of moderate exercise per week can reduce ED risk by 40%. Understand the science of blood flow, nitric oxide, and why kegels aren't just for women.",
    author: "Dr. Priya Nair",
    date: "2026-03-08",
    readTime: "6 min read",
    category: "Lifestyle",
    categoryColor: "bg-green-100 text-green-700",
  },
  {
    slug: "stress-anxiety-sexual-dysfunction",
    title: "The Stress-Sex Connection: How Anxiety Sabotages Your Performance",
    excerpt:
      "Performance anxiety creates a vicious cycle — stress causes dysfunction, which causes more stress. Learn CBT techniques, mindfulness practices, and when medication might help break the cycle.",
    author: "Dr. Priya Nair",
    date: "2026-03-01",
    readTime: "9 min read",
    category: "Mental Health",
    categoryColor: "bg-rose-100 text-rose-700",
  },
  {
    slug: "diet-for-better-erections",
    title: "The Erection Diet: Foods That Boost Blood Flow & Sexual Health",
    excerpt:
      "A Mediterranean diet can improve erectile function by 40%. Discover the top 10 foods for sexual health, the role of nitric oxide, and supplements that actually have clinical evidence behind them.",
    author: "Dr. Rajesh Kumar",
    date: "2026-02-22",
    readTime: "7 min read",
    category: "Nutrition",
    categoryColor: "bg-emerald-100 text-emerald-700",
  },
  {
    slug: "iief5-score-explained",
    title: "Your IIEF-5 Score Explained: What the Numbers Actually Mean",
    excerpt:
      "The IIEF-5 is the gold standard for assessing erectile dysfunction severity. We break down each score range, what it means for your health, and the recommended next steps for every severity level.",
    author: "Dr. Amit Sharma",
    date: "2026-02-15",
    readTime: "5 min read",
    category: "Assessments",
    categoryColor: "bg-cyan-100 text-cyan-700",
  },
  {
    slug: "sleep-and-testosterone",
    title: "Why Poor Sleep Is Killing Your Testosterone (and What to Do About It)",
    excerpt:
      "Men who sleep less than 5 hours have testosterone levels of someone 10-15 years older. Learn the REM-testosterone connection and science-backed sleep hygiene tips for better hormonal health.",
    author: "Dr. Vikram Singh",
    date: "2026-02-08",
    readTime: "6 min read",
    category: "Sleep & Recovery",
    categoryColor: "bg-indigo-100 text-indigo-700",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogsPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-surface to-white">
        {/* Hero */}
        <section className="py-16 lg:py-20 px-4">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-secondary mb-3">
                <BookOpen className="h-3.5 w-3.5" />
                SimplyMen Blog
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark tracking-tight">
                Men&apos;s Sexual Health,
                <br />
                <span className="text-primary">Explained by Experts</span>
              </h1>
              <p className="mt-4 text-muted max-w-2xl mx-auto text-base sm:text-lg">
                Evidence-based articles from certified specialists to help you
                understand, manage, and improve your sexual well-being.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                Featured
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-border/60 bg-white overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  {/* Gradient Header */}
                  <div className="h-40 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center relative">
                    <BookOpen className="h-12 w-12 text-primary/20" />
                    <span
                      className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.categoryColor}`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-7xl">
            <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-6">
              All Articles
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl border border-border/60 bg-white p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${post.categoryColor}`}
                  >
                    {post.category}
                  </span>
                  <h2 className="font-display text-base font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <span>·</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-8 sm:p-12 text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Concerned about your sexual health?
              </h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Take our free, clinically-validated assessment to understand your
                condition and get personalized recommendations.
              </p>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
              >
                Start Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
