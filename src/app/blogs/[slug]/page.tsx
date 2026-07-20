"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const articles: Record<
  string,
  {
    title: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    categoryColor: string;
    content: string[];
  }
> = {
  "understanding-erectile-dysfunction": {
    title:
      "Understanding Erectile Dysfunction: Causes, Symptoms & Modern Treatments",
    author: "Dr. Rajesh Kumar",
    date: "2026-03-28",
    readTime: "8 min read",
    category: "Erectile Dysfunction",
    categoryColor: "bg-blue-100 text-blue-700",
    content: [
      "Erectile dysfunction (ED) is defined as the persistent inability to achieve or maintain an erection sufficient for satisfactory sexual performance. It affects an estimated 150 million men worldwide, with prevalence increasing with age — though it is not an inevitable part of aging.",
      "## The Physiology of Erection",
      "An erection is a complex neurovascular event. Sexual arousal triggers the brain to send signals through the nervous system to the penile arteries, causing them to relax and expand. Blood flows into the corpora cavernosa — two sponge-like chambers running the length of the penis — filling them and creating rigidity. A membrane called the tunica albuginea helps trap the blood, maintaining the erection.",
      "## Common Causes",
      "**Vascular causes** are the most common, accounting for ~70% of ED cases. Conditions that impair blood flow — atherosclerosis, hypertension, high cholesterol, and diabetes — directly affect the penile arteries. In fact, ED is often considered an early warning sign of cardiovascular disease, as penile arteries are smaller and show damage before larger coronary arteries.",
      "**Neurological causes** include spinal cord injuries, multiple sclerosis, Parkinson's disease, and nerve damage from prostate surgery. The nerve signals required for erection can be disrupted at any point between the brain and the penis.",
      "**Hormonal imbalances**, particularly low testosterone (hypogonadism), can reduce libido and contribute to ED. Thyroid disorders and elevated prolactin levels can also play a role.",
      "**Psychological factors** — including performance anxiety, depression, relationship stress, and past trauma — account for about 10-20% of ED cases, though they frequently coexist with physical causes.",
      "## The IIEF-5 Assessment",
      "The International Index of Erectile Function (IIEF-5) is a validated 5-question self-report tool used by urologists worldwide to assess ED severity. Scores range from 5 to 25, with lower scores indicating more severe dysfunction. This is the same assessment used on SimplyMen to guide your personalized recommendations.",
      "## Modern Treatment Approaches",
      "**PDE5 inhibitors** (Sildenafil, Tadalafil, Vardenafil) remain the first-line treatment, with 60-70% effectiveness. They work by enhancing the natural nitric oxide pathway, improving blood flow to the penis.",
      "**Lifestyle modifications** are critically important and often underutilized. Regular aerobic exercise, weight management, smoking cessation, and limiting alcohol can improve erectile function by 30-40% — sometimes matching medication effectiveness.",
      "**Combination therapy** — using supplements alongside lifestyle changes and, when appropriate, prescription medication — often yields the best outcomes.",
      "## When to See a Doctor",
      "If ED persists for more than a few weeks, occurs with more than 50% of sexual attempts, or is accompanied by other symptoms like reduced libido, painful ejaculation, or difficulty urinating — consult a specialist. Early intervention leads to better outcomes.",
    ],
  },
  "premature-ejaculation-guide": {
    title:
      "The Complete Guide to Premature Ejaculation: What Every Man Should Know",
    author: "Dr. Amit Sharma",
    date: "2026-03-21",
    readTime: "10 min read",
    category: "Premature Ejaculation",
    categoryColor: "bg-purple-100 text-purple-700",
    content: [
      "Premature ejaculation (PE) is the most common male sexual dysfunction, affecting approximately 1 in 3 men at some point in their lives. Despite its prevalence, PE remains significantly underdiagnosed due to embarrassment and a lack of awareness that effective treatments exist.",
      "## What Qualifies as PE?",
      "The International Society for Sexual Medicine (ISSM) defines PE as ejaculation that always or nearly always occurs within about 1 minute of vaginal penetration (for lifelong PE) or within about 3 minutes (for acquired PE), with inability to delay ejaculation and negative personal consequences such as distress and frustration.",
      "## Types of Premature Ejaculation",
      "**Lifelong (primary) PE** has been present since the first sexual experience. It often has a neurobiological basis, particularly involving serotonin receptor sensitivity. Men with lifelong PE typically ejaculate within 1-2 minutes.",
      "**Acquired (secondary) PE** develops after a period of normal ejaculatory control. It often has identifiable causes such as ED (where the man rushes to ejaculate before losing his erection), prostatitis, thyroid disorders, or psychological factors.",
      "## The PEDT Assessment",
      "The Premature Ejaculation Diagnostic Tool (PEDT) is a validated 5-question instrument. Scores of 8 or below indicate no PE, 9-10 suggest probable PE, and 11+ indicate definite PE. SimplyMen uses this same clinical tool to assess your condition.",
      "## Behavioral Techniques",
      "**The Start-Stop Method**: During stimulation, when you feel close to ejaculation, stop all stimulation until the urge subsides (usually 30-60 seconds), then resume. Repeat 3-4 times before allowing ejaculation. With practice, this trains the body to tolerate higher levels of arousal.",
      "**The Squeeze Technique**: Similar to start-stop, but instead of just pausing, firmly squeeze the head of the penis for 10-20 seconds when near ejaculation. This reduces arousal more quickly.",
      "**Pelvic Floor (Kegel) Exercises**: Strengthening the pubococcygeus (PC) muscle gives greater ejaculatory control. Contract the muscle you'd use to stop urinating mid-stream. Hold for 5 seconds, release. Do 3 sets of 10, three times daily.",
      "## Medical Treatments",
      "**Topical anesthetics** (lidocaine sprays/creams) reduce penile sensitivity and can increase time to ejaculation by 2-3x. They work within 10-15 minutes and are available over-the-counter.",
      "**SSRIs** (Dapoxetine, Paroxetine) increase serotonin levels, which delays ejaculation. Dapoxetine is specifically designed for on-demand use, taken 1-3 hours before intercourse.",
      "**Combination approach** — behavioral techniques + topical treatment + supplements for long-term improvement — tends to produce the most satisfying and lasting results.",
    ],
  },
  "testosterone-after-30": {
    title:
      "Testosterone Decline After 30: Natural Ways to Maintain Healthy Levels",
    author: "Dr. Vikram Singh",
    date: "2026-03-15",
    readTime: "7 min read",
    category: "Hormonal Health",
    categoryColor: "bg-amber-100 text-amber-700",
    content: [
      "Testosterone is the primary male sex hormone, responsible for libido, erectile function, muscle mass, bone density, mood, and energy. After age 30, testosterone levels naturally decline by approximately 1-2% per year — a process sometimes called andropause.",
      "## Signs of Low Testosterone",
      "Common symptoms include reduced libido, erectile difficulties, fatigue, loss of muscle mass, increased body fat (especially abdominal), mood changes (irritability, depression), brain fog, and decreased motivation. Many men attribute these to 'just getting older' when they may be addressable.",
      "## Natural Optimization Strategies",
      "**Resistance training** is the single most effective natural testosterone booster. Compound exercises (squats, deadlifts, bench press, rows) trigger the greatest hormonal response. Aim for 3-4 sessions per week with progressive overload.",
      "**Sleep optimization** is critical — most testosterone is produced during deep and REM sleep. Men sleeping less than 5 hours per night have testosterone levels equivalent to someone 10-15 years older. Aim for 7-9 hours in a cool, dark room.",
      "**Body fat management**: Excess body fat contains aromatase, an enzyme that converts testosterone to estrogen. Maintaining body fat below 20% significantly helps testosterone levels. Even a 10% reduction in body weight can meaningfully increase testosterone.",
      "**Stress reduction**: Chronic stress elevates cortisol, which directly suppresses testosterone production. Regular meditation, deep breathing, time in nature, and adequate recovery between workouts all help manage cortisol.",
      "**Micronutrient support**: Zinc (found in oysters, red meat, pumpkin seeds) is essential for testosterone synthesis. Vitamin D acts as a hormone precursor — get 15-20 minutes of sunlight daily or supplement 2000-4000 IU. Magnesium supports hundreds of enzymatic processes including hormone production.",
      "## When to Test",
      "If you're experiencing multiple symptoms of low T, get a morning blood test (testosterone peaks in the AM). Total testosterone below 300 ng/dL is generally considered low. However, free testosterone — the biologically active form — is arguably more important and should be checked alongside SHBG.",
    ],
  },
  "exercise-and-sexual-health": {
    title: "How Exercise Directly Improves Your Sexual Performance",
    author: "Dr. Priya Nair",
    date: "2026-03-08",
    readTime: "6 min read",
    category: "Lifestyle",
    categoryColor: "bg-green-100 text-green-700",
    content: [
      "The connection between physical fitness and sexual performance is direct and well-documented. Men who exercise regularly report better erections, improved stamina, greater confidence, and more satisfying sexual experiences.",
      "## The Blood Flow Connection",
      "Erections depend entirely on healthy blood flow. Exercise strengthens the cardiovascular system, improves endothelial function (the ability of blood vessels to dilate), and increases nitric oxide production — the same molecule targeted by ED medications like Viagra.",
      "A landmark Harvard study found that men who walked just 30 minutes a day had a 41% lower risk of ED compared to sedentary men. The effect was even stronger with more vigorous exercise.",
      "## Best Exercises for Sexual Health",
      "**Aerobic exercise** (running, swimming, cycling, brisk walking) is the foundation. Aim for 150 minutes of moderate or 75 minutes of vigorous cardio per week. This has the strongest evidence base for improving erectile function.",
      "**Resistance training** boosts testosterone, builds confidence, and improves body composition. Focus on compound movements — squats, deadlifts, rows, and presses engage the largest muscle groups and trigger the greatest hormonal response.",
      "**Kegel exercises** strengthen the pelvic floor muscles that support erections and ejaculatory control. The bulbocavernosus muscle, in particular, helps trap blood in the penis during erection. To find it: stop your urine stream mid-flow. That's the muscle. Contract and hold for 5 seconds, relax for 5 seconds. Repeat 10 times, 3 sets daily.",
      "**HIIT (High-Intensity Interval Training)** is particularly effective for boosting testosterone and growth hormone. Even 20 minutes of intervals (e.g., 30 seconds sprint, 90 seconds recovery) can significantly impact hormone levels.",
      "## The Overtraining Caution",
      "Excessive exercise without adequate recovery can actually lower testosterone and libido. Marathon training, extreme endurance events, and training twice daily without rest can elevate cortisol chronically. Balance intensity with recovery — at least 1-2 rest days per week.",
    ],
  },
  "stress-anxiety-sexual-dysfunction": {
    title:
      "The Stress-Sex Connection: How Anxiety Sabotages Your Performance",
    author: "Dr. Priya Nair",
    date: "2026-03-01",
    readTime: "9 min read",
    category: "Mental Health",
    categoryColor: "bg-rose-100 text-rose-700",
    content: [
      "Performance anxiety is one of the most common psychological causes of sexual dysfunction in men. It creates a vicious cycle: stress causes erectile or ejaculatory difficulties, which creates fear of recurrence, which causes more stress, which worsens the problem.",
      "## How Stress Affects Sexual Function",
      "When stressed, the body enters 'fight or flight' mode, activating the sympathetic nervous system. This diverts blood away from non-essential functions (including erection) toward large muscles for escape. Simultaneously, cortisol and adrenaline suppress the parasympathetic 'rest and digest' system that enables arousal and erection.",
      "Chronic stress keeps cortisol persistently elevated, which directly suppresses testosterone production, reduces libido, and impairs the nitric oxide pathway essential for erections.",
      "## Breaking the Anxiety Cycle",
      "**Cognitive Behavioral Therapy (CBT)** techniques help identify and challenge the negative thought patterns that fuel performance anxiety. Instead of 'I'm going to fail again,' learn to reframe: 'Some difficulty is normal and doesn't define me.'",
      "**Mindfulness and presence**: Anxiety pulls you out of the moment and into your head (spectatoring). Mindfulness meditation — even 10 minutes daily — trains the ability to stay present during intimacy rather than monitoring and judging your performance.",
      "**Sensate focus exercises** (developed by Masters and Johnson) gradually rebuild comfort with physical intimacy by removing performance pressure. Start with non-sexual touch, slowly progressing over weeks to more intimate contact — with a strict rule of no 'performance goals.'",
      "**Progressive muscle relaxation**: Before intimacy, spend 5-10 minutes systematically tensing and releasing muscle groups from toes to head. This activates the parasympathetic nervous system, countering the fight-or-flight response.",
      "## When Medication Helps",
      "Sometimes a PDE5 inhibitor used temporarily can help break the anxiety cycle by guaranteeing an erection, which rebuilds confidence. Many men use it as a 'training wheel' for a few months while building psychological resilience, then taper off successfully.",
    ],
  },
  "diet-for-better-erections": {
    title:
      "The Erection Diet: Foods That Boost Blood Flow & Sexual Health",
    author: "Dr. Rajesh Kumar",
    date: "2026-02-22",
    readTime: "7 min read",
    category: "Nutrition",
    categoryColor: "bg-emerald-100 text-emerald-700",
    content: [
      "What you eat directly impacts your sexual function. A large-scale study published in the American Journal of Clinical Nutrition found that men following a Mediterranean diet had a 40% lower risk of developing erectile dysfunction compared to those eating a typical Western diet.",
      "## The Top 10 Foods for Sexual Health",
      "**1. Watermelon** — Contains citrulline, which the body converts to arginine and then to nitric oxide, the molecule that relaxes blood vessels and enables erections. Think of it as 'nature's Viagra.'",
      "**2. Dark leafy greens** (spinach, kale, arugula) — Rich in dietary nitrates that boost nitric oxide production. Just one serving of spinach can significantly increase blood nitrate levels for hours.",
      "**3. Fatty fish** (salmon, mackerel, sardines) — Omega-3 fatty acids improve endothelial function, reduce inflammation, and support cardiovascular health — all critical for erectile function.",
      "**4. Beets** — One of the highest natural sources of dietary nitrates. Beetroot juice has been shown to improve blood flow and exercise performance in clinical trials.",
      "**5. Nuts** (pistachios, walnuts, almonds) — Pistachios specifically have been studied for ED: men eating 100g/day for 3 weeks showed improved IIEF scores. Nuts provide arginine, healthy fats, and antioxidants.",
      "**6. Dark chocolate** (70%+ cacao) — Flavonoids in cocoa improve blood vessel function and lower blood pressure. A small square daily is both pleasurable and functional.",
      "**7. Pomegranate** — Powerful antioxidants that protect nitric oxide from oxidative destruction. Pomegranate juice has shown improvements in erectile quality in preliminary studies.",
      "**8. Oysters** — The classic aphrodisiac, backed by science: they're the richest food source of zinc, essential for testosterone production.",
      "**9. Garlic** — Contains allicin, which improves blood flow by stimulating nitric oxide production and reducing blood pressure.",
      "**10. Olive oil** — The cornerstone of the Mediterranean diet. Rich in monounsaturated fats and polyphenols that protect cardiovascular health.",
      "## Foods to Avoid",
      "**Processed foods, excessive sugar, and trans fats** promote inflammation and damage blood vessels. **Excessive alcohol** (more than 2 drinks/day) depresses nervous system function and lowers testosterone. **Soy in excess** may slightly increase estrogen levels in some men.",
    ],
  },
  "iief5-score-explained": {
    title: "Your IIEF-5 Score Explained: What the Numbers Actually Mean",
    author: "Dr. Amit Sharma",
    date: "2026-02-15",
    readTime: "5 min read",
    category: "Assessments",
    categoryColor: "bg-cyan-100 text-cyan-700",
    content: [
      "The International Index of Erectile Function (IIEF-5), also known as the Sexual Health Inventory for Men (SHIM), is the most widely used clinical tool for assessing erectile dysfunction. Developed by Dr. Raymond Rosen and colleagues, it has been validated in over 30 languages and is considered the gold standard by urological societies worldwide.",
      "## How the IIEF-5 Works",
      "The questionnaire consists of 5 questions about erectile function over the past 6 months. Each question is scored from 1-5 (or 0-5 for questions about attempted intercourse), giving a total score range of 5-25.",
      "## Score Interpretation",
      "**22-25: No ED** — Your erectile function is within normal range. This doesn't mean things can't improve further — preventive wellness measures like exercise, sleep optimization, and proper nutrition help maintain function long-term.",
      "**17-21: Mild ED** — You may experience occasional difficulty achieving or maintaining full erections. This is often the most responsive stage to lifestyle interventions. Natural supplements, regular exercise, and stress management can frequently bring scores into the normal range.",
      "**12-16: Mild-to-Moderate ED** — Erection difficulties are becoming more consistent. A combination of lifestyle changes and possibly supplements or low-dose medication is typically recommended. This is an important stage to intervene — addressing it now prevents progression.",
      "**8-11: Moderate ED** — Significant difficulty with erections that is impacting sexual satisfaction. Medical consultation is recommended to identify underlying causes (vascular, hormonal, neurological). Treatment often involves medication alongside lifestyle optimization.",
      "**5-7: Severe ED** — Persistent inability to achieve or maintain erections. This requires comprehensive medical evaluation, as it may indicate significant cardiovascular, neurological, or hormonal issues. Multiple treatment modalities are usually combined.",
      "## Important Context",
      "Your IIEF-5 score is a snapshot, not a sentence. ED is often situational — stress, fatigue, alcohol, and relationship dynamics all influence scores. A single low score doesn't necessarily indicate a chronic problem. However, consistently low scores warrant investigation.",
      "ED in men under 40 is more often psychogenic (anxiety, depression, porn-related) while in men over 50, vascular causes predominate. Understanding the cause guides the most effective treatment.",
    ],
  },
  "sleep-and-testosterone": {
    title:
      "Why Poor Sleep Is Killing Your Testosterone (and What to Do About It)",
    author: "Dr. Vikram Singh",
    date: "2026-02-08",
    readTime: "6 min read",
    category: "Sleep & Recovery",
    categoryColor: "bg-indigo-100 text-indigo-700",
    content: [
      "The relationship between sleep and testosterone is one of the most well-established in endocrinology. A landmark University of Chicago study found that men who slept only 5 hours per night for one week had testosterone levels equivalent to someone 10-15 years older.",
      "## The Sleep-Testosterone Mechanism",
      "The majority of daily testosterone release occurs during sleep, particularly during the first REM cycle and deep (N3) sleep. Testosterone levels begin rising at sleep onset, peak during the first REM period, and remain elevated until waking. Disrupting this process — through short sleep, fragmented sleep, or sleep disorders — directly reduces testosterone production.",
      "## How Much Sleep Loss Matters",
      "The research is striking: reducing sleep from 8 hours to 5 hours results in a 10-15% drop in testosterone. Going from 8 to 4 hours can reduce levels by up to 60%. Even one week of insufficient sleep causes measurable hormonal changes.",
      "## Sleep Apnea: The Hidden Testosterone Killer",
      "Obstructive sleep apnea (OSA) — where breathing repeatedly stops during sleep — is present in an estimated 25% of men over 40 and is strongly linked to both low testosterone and erectile dysfunction. The repeated oxygen drops fragment sleep and trigger cortisol release. If you snore heavily, feel unrested despite 'enough' sleep, or your partner notices you stop breathing at night — get tested.",
      "## Evidence-Based Sleep Optimization",
      "**Temperature**: Keep your bedroom at 18-20°C (65-68°F). Core body temperature needs to drop to initiate sleep. A cool room, breathable bedding, and possibly a warm shower 90 minutes before bed (which paradoxically helps cooling) all help.",
      "**Light exposure**: Get bright light within 30 minutes of waking (ideally sunlight). This sets your circadian clock. Conversely, avoid blue light (screens) for 1-2 hours before bed, or use blue-light blocking glasses.",
      "**Consistency**: Go to bed and wake at the same time every day — including weekends. Your circadian rhythm thrives on regularity. A consistent schedule is more important than total hours.",
      "**Caffeine cutoff**: Caffeine has a half-life of 5-7 hours. An afternoon coffee at 3 PM means significant caffeine in your system at 10 PM. Cut off caffeine by noon if you're having sleep issues.",
      "**Alcohol awareness**: While alcohol may help you fall asleep faster, it profoundly disrupts sleep architecture, particularly REM sleep — precisely when testosterone production peaks. Even 2 drinks in the evening measurably reduce sleep quality.",
    ],
  },
};

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles[slug];

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-surface">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-primary-dark mb-4">
              Article Not Found
            </h1>
            <p className="text-muted mb-6">
              This article doesn&apos;t exist yet.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="bg-gradient-to-b from-surface to-white py-12 lg:py-16 px-4">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span
                className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${article.categoryColor}`}
              >
                {article.category}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article Body */}
        <article className="px-4 pb-20">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="prose prose-lg max-w-none"
            >
              {article.content.map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="font-display text-xl font-bold text-primary-dark mt-10 mb-4"
                    >
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                // Render bold text by splitting on **
                const parts = block.split(/(\*\*.*?\*\*)/g);
                return (
                  <p
                    key={i}
                    className="text-foreground/80 leading-relaxed mb-4"
                  >
                    {parts.map((part, j) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={j} className="text-foreground font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </p>
                );
              })}
            </motion.div>

            {/* Share + CTA */}
            <div className="mt-12 pt-8 border-t border-border/40">
              <div className="flex items-center justify-between mb-10">
                <span className="text-sm text-muted">
                  Found this helpful? Share it with someone who might benefit.
                </span>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-8 text-center">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  Want to check your sexual health?
                </h3>
                <p className="text-white/70 mb-5 text-sm">
                  Take our free 2-minute clinically validated assessment.
                </p>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  Start Assessment
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
