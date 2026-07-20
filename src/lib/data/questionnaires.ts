import type { Question, ConditionKey } from "@/types";

/* ═══════════════════════════════════════════════════
   CONDITION METADATA
   ═══════════════════════════════════════════════════ */

export interface ConditionMeta {
  key: ConditionKey;
  label: string;
  shortLabel: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  color: string;
}

export const conditionMeta: Record<ConditionKey, ConditionMeta> = {
  ed: {
    key: "ed",
    label: "Erectile Dysfunction (ED/Impotence)",
    shortLabel: "Erectile Dysfunction",
    description: "Permanent and holistic solutions using advanced medical protocols and personalized treatment approaches.",
    questionCount: 12,
    estimatedTime: "~4 min",
    color: "blue",
  },
  pe: {
    key: "pe",
    label: "Premature Ejaculation (PE)",
    shortLabel: "Premature Ejaculation",
    description: "Fast and effective treatment plans with proven results for lasting improvement.",
    questionCount: 12,
    estimatedTime: "~4 min",
    color: "purple",
  },
  infertility: {
    key: "infertility",
    label: "Male Infertility & Sperm Issues",
    shortLabel: "Infertility & Sperm",
    description: "Advanced diagnosis, sperm retrieval techniques, and comprehensive fertility solutions.",
    questionCount: 12,
    estimatedTime: "~4 min",
    color: "green",
  },
  libido: {
    key: "libido",
    label: "Low Libido & Sexual Weakness",
    shortLabel: "Low Libido",
    description: "Restoring desire and performance through hormonal evaluation and targeted therapies.",
    questionCount: 12,
    estimatedTime: "~4 min",
    color: "amber",
  },
  hormonal: {
    key: "hormonal",
    label: "Hormonal Disorders",
    shortLabel: "Hormonal Disorders",
    description: "Low testosterone evaluation, replacement therapies, and hormonal balance restoration.",
    questionCount: 12,
    estimatedTime: "~4 min",
    color: "cyan",
  },
};

export const conditionOrder: ConditionKey[] = [
  "ed",
  "pe",
  "infertility",
  "libido",
  "hormonal",
];

/* ═══════════════════════════════════════════════════
   1. ERECTILE DYSFUNCTION — 12 Questions (IIEF-5 based)
   Score per Q: 0–4 → Total 0–48
   ═══════════════════════════════════════════════════ */

export const edQuestions: Question[] = [
  {
    id: "ed_q1",
    text: "How often were you able to get an erection during sexual activity?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely (less than 25% of attempts)" },
      { value: 2, label: "Sometimes (about half the time)" },
      { value: 3, label: "Often (more than half the time)" },
      { value: 4, label: "Almost always or always" },
    ],
  },
  {
    id: "ed_q2",
    text: "How often were your erections hard enough for penetration?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Almost always or always" },
    ],
  },
  {
    id: "ed_q3",
    text: "How often could you maintain your erection after penetration?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Almost always or always" },
    ],
  },
  {
    id: "ed_q4",
    text: "How difficult was it to maintain your erection till completion of intercourse?",
    options: [
      { value: 0, label: "Extremely difficult" },
      { value: 1, label: "Very difficult" },
      { value: 2, label: "Difficult" },
      { value: 3, label: "Slightly difficult" },
      { value: 4, label: "Not difficult at all" },
    ],
  },
  {
    id: "ed_q5",
    text: "How satisfied were you with your overall sexual performance?",
    options: [
      { value: 0, label: "Very dissatisfied" },
      { value: 1, label: "Dissatisfied" },
      { value: 2, label: "Neutral" },
      { value: 3, label: "Satisfied" },
      { value: 4, label: "Very satisfied" },
    ],
  },
  {
    id: "ed_q6",
    text: "Do you experience morning erections?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely (once a week or less)" },
      { value: 2, label: "Sometimes (2–3 times a week)" },
      { value: 3, label: "Most mornings" },
      { value: 4, label: "Daily" },
    ],
  },
  {
    id: "ed_q7",
    text: "Do you lose your erection during intercourse?",
    options: [
      { value: 0, label: "Always" },
      { value: 1, label: "Most of the time" },
      { value: 2, label: "About half the time" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Never or almost never" },
    ],
  },
  {
    id: "ed_q8",
    text: "Do you feel anxious or worried about your sexual performance?",
    options: [
      { value: 0, label: "Extremely anxious" },
      { value: 1, label: "Very anxious" },
      { value: 2, label: "Moderately anxious" },
      { value: 3, label: "Slightly anxious" },
      { value: 4, label: "Not anxious at all" },
    ],
  },
  {
    id: "ed_q9",
    text: "Do you have any chronic illness such as diabetes, high blood pressure, or heart disease?",
    options: [
      { value: 0, label: "Yes, multiple conditions or severe" },
      { value: 1, label: "Yes, one significant condition" },
      { value: 2, label: "Yes, but well controlled" },
      { value: 3, label: "Possibly / borderline" },
      { value: 4, label: "No chronic illness" },
    ],
  },
  {
    id: "ed_q10",
    text: "Do you smoke or consume alcohol frequently?",
    options: [
      { value: 0, label: "Heavy smoker & heavy drinker" },
      { value: 1, label: "Regular smoker or heavy drinker" },
      { value: 2, label: "Social smoker or moderate drinker" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Neither — I don't smoke or drink" },
    ],
  },
  {
    id: "ed_q11",
    text: "Are you currently on any medication that may affect libido or sexual function?",
    options: [
      { value: 0, label: "Yes, multiple medications" },
      { value: 1, label: "Yes, one medication" },
      { value: 2, label: "Not sure / possibly" },
      { value: 3, label: "I was in the past, not now" },
      { value: 4, label: "No medications affecting sexual function" },
    ],
  },
  {
    id: "ed_q12",
    text: "How would you rate your overall energy level throughout the day?",
    options: [
      { value: 0, label: "Extremely low — fatigued all the time" },
      { value: 1, label: "Low energy most of the day" },
      { value: 2, label: "Moderate — up and down" },
      { value: 3, label: "Good energy most of the time" },
      { value: 4, label: "High energy — active and alert" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   2. PREMATURE EJACULATION — 12 Questions (PEDT based)
   Score per Q: 0–4 → Total 0–48
   ═══════════════════════════════════════════════════ */

export const peQuestions: Question[] = [
  {
    id: "pe_q1",
    text: "How difficult is it for you to delay ejaculation?",
    options: [
      { value: 0, label: "Not difficult at all" },
      { value: 1, label: "Somewhat difficult" },
      { value: 2, label: "Moderately difficult" },
      { value: 3, label: "Very difficult" },
      { value: 4, label: "Extremely difficult" },
    ],
  },
  {
    id: "pe_q2",
    text: "Do you ejaculate before you want to?",
    options: [
      { value: 0, label: "Almost never or never" },
      { value: 1, label: "Less than half the time" },
      { value: 2, label: "About half the time" },
      { value: 3, label: "More than half the time" },
      { value: 4, label: "Almost always or always" },
    ],
  },
  {
    id: "pe_q3",
    text: "Do you ejaculate with very little stimulation?",
    options: [
      { value: 0, label: "Almost never or never" },
      { value: 1, label: "Less than half the time" },
      { value: 2, label: "About half the time" },
      { value: 3, label: "More than half the time" },
      { value: 4, label: "Almost always or always" },
    ],
  },
  {
    id: "pe_q4",
    text: "Do you feel frustrated because of ejaculating before you want to?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Slightly" },
      { value: 2, label: "Moderately" },
      { value: 3, label: "Very much" },
      { value: 4, label: "Extremely" },
    ],
  },
  {
    id: "pe_q5",
    text: "How concerned are you that early ejaculation is not satisfying for your partner?",
    options: [
      { value: 0, label: "Not at all concerned" },
      { value: 1, label: "Slightly concerned" },
      { value: 2, label: "Moderately concerned" },
      { value: 3, label: "Very concerned" },
      { value: 4, label: "Extremely concerned" },
    ],
  },
  {
    id: "pe_q6",
    text: "How long do you typically last after penetration?",
    options: [
      { value: 4, label: "Less than 1 minute" },
      { value: 3, label: "1–3 minutes" },
      { value: 2, label: "3–5 minutes" },
      { value: 1, label: "5–10 minutes" },
      { value: 0, label: "More than 10 minutes" },
    ],
  },
  {
    id: "pe_q7",
    text: "Do you avoid sex due to fear of early ejaculation?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Always" },
    ],
  },
  {
    id: "pe_q8",
    text: "Do you feel a lack of control during intercourse?",
    options: [
      { value: 0, label: "Full control" },
      { value: 1, label: "Good control" },
      { value: 2, label: "Some control" },
      { value: 3, label: "Little control" },
      { value: 4, label: "No control at all" },
    ],
  },
  {
    id: "pe_q9",
    text: "Does stress or anxiety worsen your ejaculation timing?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Slightly" },
      { value: 2, label: "Moderately" },
      { value: 3, label: "Significantly" },
      { value: 4, label: "Extremely — it's the main cause" },
    ],
  },
  {
    id: "pe_q10",
    text: "Do you experience performance anxiety during sexual activity?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Almost always" },
    ],
  },
  {
    id: "pe_q11",
    text: "Have you tried techniques like start-stop or squeeze method?",
    options: [
      { value: 4, label: "Never tried any" },
      { value: 3, label: "Tried but didn't help" },
      { value: 2, label: "Tried with some improvement" },
      { value: 1, label: "Use them regularly, moderate effect" },
      { value: 0, label: "Use them effectively — good control now" },
    ],
  },
  {
    id: "pe_q12",
    text: "Has this problem been lifelong or did it develop recently?",
    options: [
      { value: 4, label: "Lifelong — since first sexual experience" },
      { value: 3, label: "For several years" },
      { value: 2, label: "Started in the last 1–2 years" },
      { value: 1, label: "Recent — last few months" },
      { value: 0, label: "Occasional / situational" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   3. LOW LIBIDO & SEXUAL WEAKNESS — 12 Questions
   ═══════════════════════════════════════════════════ */

export const libidoQuestions: Question[] = [
  {
    id: "lib_q1",
    text: "How often do you feel sexual desire or interest in sex?",
    options: [
      { value: 0, label: "Never or almost never" },
      { value: 1, label: "Rarely (once a month or less)" },
      { value: 2, label: "Sometimes (a few times a month)" },
      { value: 3, label: "Often (several times a week)" },
      { value: 4, label: "Very frequently (daily)" },
    ],
  },
  {
    id: "lib_q2",
    text: "Do you initiate or show interest in physical intimacy with your partner?",
    options: [
      { value: 0, label: "Never — I avoid it" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Regularly — I'm usually the one initiating" },
    ],
  },
  {
    id: "lib_q3",
    text: "Do you feel mentally interested in sex but physically unable to respond?",
    options: [
      { value: 4, label: "No — both mental and physical drive are good" },
      { value: 3, label: "Rarely" },
      { value: 2, label: "Sometimes — there's a disconnect" },
      { value: 1, label: "Often — mind is willing but body isn't" },
      { value: 0, label: "Always — no physical response at all" },
    ],
  },
  {
    id: "lib_q4",
    text: "How often do you experience physical or mental fatigue?",
    options: [
      { value: 0, label: "Constantly — I feel exhausted all the time" },
      { value: 1, label: "Most days" },
      { value: 2, label: "Several times a week" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Rarely — I have good energy" },
    ],
  },
  {
    id: "lib_q5",
    text: "How would you rate your current stress and anxiety levels?",
    options: [
      { value: 0, label: "Extremely high — overwhelmed constantly" },
      { value: 1, label: "High — stressed most of the time" },
      { value: 2, label: "Moderate — manageable but present" },
      { value: 3, label: "Low — occasional stress" },
      { value: 4, label: "Very low — I feel calm and in control" },
    ],
  },
  {
    id: "lib_q6",
    text: "How is your sleep quality?",
    options: [
      { value: 0, label: "Very poor — insomnia or very broken sleep" },
      { value: 1, label: "Poor — I wake up tired most days" },
      { value: 2, label: "Average — 5–6 hours, not great" },
      { value: 3, label: "Good — 7+ hours, generally restful" },
      { value: 4, label: "Excellent — I sleep deeply and wake refreshed" },
    ],
  },
  {
    id: "lib_q7",
    text: "Have you ever had your testosterone levels tested?",
    options: [
      { value: 0, label: "Yes — and levels were low" },
      { value: 1, label: "Yes — borderline low" },
      { value: 2, label: "No — but I suspect it may be low" },
      { value: 3, label: "No — never felt the need" },
      { value: 4, label: "Yes — levels were normal" },
    ],
  },
  {
    id: "lib_q8",
    text: "Do you frequently watch pornography?",
    options: [
      { value: 0, label: "Daily — I feel dependent on it" },
      { value: 1, label: "Several times a week" },
      { value: 2, label: "Once a week" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Rarely or never" },
    ],
  },
  {
    id: "lib_q9",
    text: "How would you rate the emotional satisfaction in your relationship?",
    options: [
      { value: 0, label: "Very dissatisfied — significant issues" },
      { value: 1, label: "Dissatisfied" },
      { value: 2, label: "Neutral / It's complicated" },
      { value: 3, label: "Satisfied" },
      { value: 4, label: "Very satisfied — strong connection" },
    ],
  },
  {
    id: "lib_q10",
    text: "How often do you exercise per week?",
    options: [
      { value: 0, label: "Never — sedentary lifestyle" },
      { value: 1, label: "Rarely — once a week or less" },
      { value: 2, label: "Sometimes — 2–3 times a week" },
      { value: 3, label: "Regularly — 4–5 times a week" },
      { value: 4, label: "Daily — active and disciplined" },
    ],
  },
  {
    id: "lib_q11",
    text: "How would you rate your overall diet quality?",
    options: [
      { value: 0, label: "Very poor — mostly junk food" },
      { value: 1, label: "Below average" },
      { value: 2, label: "Average — mix of healthy and unhealthy" },
      { value: 3, label: "Good — mostly balanced" },
      { value: 4, label: "Excellent — clean, nutrient-rich diet" },
    ],
  },
  {
    id: "lib_q12",
    text: "How would you rate your overall confidence in sexual situations?",
    options: [
      { value: 0, label: "Very low — I avoid it completely" },
      { value: 1, label: "Low" },
      { value: 2, label: "Moderate" },
      { value: 3, label: "High" },
      { value: 4, label: "Very high — confident and comfortable" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   4. HORMONAL DISORDERS (Testosterone) — 12 Questions
   ═══════════════════════════════════════════════════ */

export const hormonalQuestions: Question[] = [
  {
    id: "hor_q1",
    text: "How would you rate your overall energy levels throughout the day?",
    options: [
      { value: 0, label: "Extremely low — exhausted constantly" },
      { value: 1, label: "Low — fatigue most of the day" },
      { value: 2, label: "Moderate — energy comes and goes" },
      { value: 3, label: "Good — active for most of the day" },
      { value: 4, label: "Very high — energetic and alert" },
    ],
  },
  {
    id: "hor_q2",
    text: "Have you noticed a decrease in muscle strength or mass recently?",
    options: [
      { value: 0, label: "Yes — significant loss" },
      { value: 1, label: "Noticeable decline" },
      { value: 2, label: "Some change — not sure" },
      { value: 3, label: "Minimal change" },
      { value: 4, label: "No — I maintain or build muscle well" },
    ],
  },
  {
    id: "hor_q3",
    text: "Have you noticed increased body fat, especially around the abdomen?",
    options: [
      { value: 0, label: "Yes — significant weight gain" },
      { value: 1, label: "Noticeable increase" },
      { value: 2, label: "Slight increase" },
      { value: 3, label: "Stable" },
      { value: 4, label: "No — I'm lean and fit" },
    ],
  },
  {
    id: "hor_q4",
    text: "Do you experience morning erections?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Most mornings" },
      { value: 4, label: "Every day" },
    ],
  },
  {
    id: "hor_q5",
    text: "Have you experienced frequent mood swings, irritability, or emotional changes?",
    options: [
      { value: 0, label: "Constantly — severe mood issues" },
      { value: 1, label: "Frequently" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Rarely" },
      { value: 4, label: "Never — emotionally stable" },
    ],
  },
  {
    id: "hor_q6",
    text: "Have you noticed reduced facial or body hair growth?",
    options: [
      { value: 0, label: "Yes — significant thinning" },
      { value: 1, label: "Noticeable reduction" },
      { value: 2, label: "Slight change" },
      { value: 3, label: "Normal growth" },
      { value: 4, label: "No change — strong hair growth" },
    ],
  },
  {
    id: "hor_q7",
    text: "How is your sleep quality and pattern?",
    options: [
      { value: 0, label: "Very poor — insomnia or broken sleep" },
      { value: 1, label: "Poor — restless sleep" },
      { value: 2, label: "Average" },
      { value: 3, label: "Good — 7+ hours most nights" },
      { value: 4, label: "Excellent — deep, refreshing sleep" },
    ],
  },
  {
    id: "hor_q8",
    text: "How would you rate your sexual desire / libido?",
    options: [
      { value: 0, label: "Absent — no interest at all" },
      { value: 1, label: "Very low" },
      { value: 2, label: "Below average" },
      { value: 3, label: "Normal" },
      { value: 4, label: "Strong / high" },
    ],
  },
  {
    id: "hor_q9",
    text: "Have you experienced feelings of depression or lack of motivation?",
    options: [
      { value: 0, label: "Constantly — severe depression" },
      { value: 1, label: "Frequently" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Rarely" },
      { value: 4, label: "Never — I feel motivated and positive" },
    ],
  },
  {
    id: "hor_q10",
    text: "Do you feel unusually fatigued even after rest?",
    options: [
      { value: 0, label: "Always — nothing helps" },
      { value: 1, label: "Most of the time" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Rarely" },
      { value: 4, label: "Never — rest restores me fully" },
    ],
  },
  {
    id: "hor_q11",
    text: "Have you experienced unexplained weight gain in the past year?",
    options: [
      { value: 0, label: "Yes — more than 10 kg" },
      { value: 1, label: "Yes — 5–10 kg" },
      { value: 2, label: "Slight gain — 2–5 kg" },
      { value: 3, label: "Weight is stable" },
      { value: 4, label: "No — I've lost or maintained weight" },
    ],
  },
  {
    id: "hor_q12",
    text: "How well do you recover after physical exercise?",
    options: [
      { value: 0, label: "Very poorly — takes days to recover" },
      { value: 1, label: "Slowly — longer than expected" },
      { value: 2, label: "Average" },
      { value: 3, label: "Well — recover within a day" },
      { value: 4, label: "Excellent — quick and full recovery" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   5. MALE INFERTILITY & SPERM ISSUES — 12 Questions
   ═══════════════════════════════════════════════════ */

export const infertilityQuestions: Question[] = [
  {
    id: "inf_q1",
    text: "How long have you been trying to conceive?",
    options: [
      { value: 4, label: "More than 3 years" },
      { value: 3, label: "1–3 years" },
      { value: 2, label: "6 months – 1 year" },
      { value: 1, label: "Less than 6 months" },
      { value: 0, label: "Not currently trying" },
    ],
  },
  {
    id: "inf_q2",
    text: "Have you experienced any ejaculation problems (pain, reduced volume, retrograde)?",
    options: [
      { value: 0, label: "Yes — severe or frequent" },
      { value: 1, label: "Yes — moderate" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Rarely" },
      { value: 4, label: "No ejaculation problems" },
    ],
  },
  {
    id: "inf_q3",
    text: "Have you ever had a semen analysis (sperm test) done?",
    options: [
      { value: 0, label: "Yes — results were abnormal" },
      { value: 1, label: "Yes — borderline results" },
      { value: 2, label: "No — but I'm concerned about it" },
      { value: 3, label: "No — never felt the need" },
      { value: 4, label: "Yes — results were normal" },
    ],
  },
  {
    id: "inf_q4",
    text: "Do you currently smoke or use tobacco products?",
    options: [
      { value: 0, label: "Heavy smoker (10+ cigarettes/day)" },
      { value: 1, label: "Regular smoker" },
      { value: 2, label: "Occasional / social smoker" },
      { value: 3, label: "Former smoker (quit)" },
      { value: 4, label: "Never smoked" },
    ],
  },
  {
    id: "inf_q5",
    text: "How much alcohol do you consume?",
    options: [
      { value: 0, label: "Heavy drinker (daily / binge)" },
      { value: 1, label: "Regular drinker (4–5 times/week)" },
      { value: 2, label: "Moderate (2–3 times/week)" },
      { value: 3, label: "Social / occasional" },
      { value: 4, label: "Rarely or never" },
    ],
  },
  {
    id: "inf_q6",
    text: "Are you regularly exposed to high heat (hot baths, saunas, tight underwear, laptop on lap)?",
    options: [
      { value: 0, label: "Yes — daily or very frequently" },
      { value: 1, label: "Often" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Rarely" },
      { value: 4, label: "No — I avoid heat exposure" },
    ],
  },
  {
    id: "inf_q7",
    text: "Have you been diagnosed with varicocele (enlarged veins in the scrotum)?",
    options: [
      { value: 0, label: "Yes — severe / untreated" },
      { value: 1, label: "Yes — mild or treated" },
      { value: 2, label: "Not sure — I have symptoms" },
      { value: 3, label: "No — but never checked" },
      { value: 4, label: "No — confirmed by doctor" },
    ],
  },
  {
    id: "inf_q8",
    text: "Have you been diagnosed with any hormonal imbalance?",
    options: [
      { value: 0, label: "Yes — significant imbalance" },
      { value: 1, label: "Yes — borderline" },
      { value: 2, label: "Not sure / never tested" },
      { value: 3, label: "No — likely normal" },
      { value: 4, label: "No — all levels confirmed normal" },
    ],
  },
  {
    id: "inf_q9",
    text: "How often do you engage in sexual intercourse?",
    options: [
      { value: 0, label: "Less than once a month" },
      { value: 1, label: "Once a month" },
      { value: 2, label: "2–3 times a month" },
      { value: 3, label: "1–2 times a week" },
      { value: 4, label: "3+ times a week" },
    ],
  },
  {
    id: "inf_q10",
    text: "How would you rate your current sexual desire / libido?",
    options: [
      { value: 0, label: "Very low / absent" },
      { value: 1, label: "Low" },
      { value: 2, label: "Below average" },
      { value: 3, label: "Normal" },
      { value: 4, label: "High" },
    ],
  },
  {
    id: "inf_q11",
    text: "Do you have difficulty achieving or maintaining an erection?",
    options: [
      { value: 0, label: "Always" },
      { value: 1, label: "Often" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Rarely" },
      { value: 4, label: "Never" },
    ],
  },
  {
    id: "inf_q12",
    text: "Are you currently on any medications, steroids, or supplements that may affect fertility?",
    options: [
      { value: 0, label: "Yes — steroids or known fertility-affecting drugs" },
      { value: 1, label: "Yes — other medications" },
      { value: 2, label: "Not sure" },
      { value: 3, label: "Previously, but not now" },
      { value: 4, label: "No" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   QUESTION MAP & SCORING CONFIG
   ═══════════════════════════════════════════════════ */

export const questionsByCondition: Record<ConditionKey, Question[]> = {
  ed: edQuestions,
  pe: peQuestions,
  libido: libidoQuestions,
  hormonal: hormonalQuestions,
  infertility: infertilityQuestions,
};

export interface SeverityBand {
  label: "normal" | "mild" | "moderate" | "severe";
  min: number;
  max: number;
}

export const scoringConfig: Record<
  ConditionKey,
  { maxScore: number; bands: SeverityBand[]; highIsGood: boolean }
> = {
  ed: {
    maxScore: 48,
    highIsGood: true,
    bands: [
      { label: "normal", min: 40, max: 48 },
      { label: "mild", min: 30, max: 39 },
      { label: "moderate", min: 20, max: 29 },
      { label: "severe", min: 0, max: 19 },
    ],
  },
  pe: {
    maxScore: 48,
    highIsGood: false,
    bands: [
      { label: "normal", min: 0, max: 15 },
      { label: "mild", min: 16, max: 25 },
      { label: "moderate", min: 26, max: 35 },
      { label: "severe", min: 36, max: 48 },
    ],
  },
  libido: {
    maxScore: 48,
    highIsGood: true,
    bands: [
      { label: "normal", min: 36, max: 48 },
      { label: "mild", min: 25, max: 35 },
      { label: "moderate", min: 15, max: 24 },
      { label: "severe", min: 0, max: 14 },
    ],
  },
  hormonal: {
    maxScore: 48,
    highIsGood: true,
    bands: [
      { label: "normal", min: 36, max: 48 },
      { label: "mild", min: 25, max: 35 },
      { label: "moderate", min: 15, max: 24 },
      { label: "severe", min: 0, max: 14 },
    ],
  },
  infertility: {
    maxScore: 48,
    highIsGood: true,
    bands: [
      { label: "normal", min: 36, max: 48 },
      { label: "mild", min: 25, max: 35 },
      { label: "moderate", min: 15, max: 24 },
      { label: "severe", min: 0, max: 14 },
    ],
  },
};

export function calculateSeverity(
  condition: ConditionKey,
  score: number
): "normal" | "mild" | "moderate" | "severe" {
  const config = scoringConfig[condition];
  for (const band of config.bands) {
    if (score >= band.min && score <= band.max) return band.label;
  }
  return "moderate";
}

/* ═══════════════════════════════════════════════════
   RECOMMENDATION + ADVICE per condition/severity
   ═══════════════════════════════════════════════════ */

export const recommendationAdvice: Record<
  ConditionKey,
  Record<string, { title: string; advice: string; action: string }>
> = {
  ed: {
    normal: {
      title: "No Erectile Dysfunction",
      advice: "Great news — your score indicates healthy erectile function. Maintaining a healthy lifestyle, regular exercise, and good sleep will help sustain performance.",
      action: "Explore our wellness supplements to stay at your best.",
    },
    mild: {
      title: "Mild Erectile Dysfunction",
      advice: "Your responses suggest mild difficulty. This is very common and highly treatable. Lifestyle changes, natural supplements, and stress management can make a significant difference.",
      action: "We recommend our ED Support Kit with Ayurvedic supplements.",
    },
    moderate: {
      title: "Moderate Erectile Dysfunction",
      advice: "Your results indicate moderate difficulty. A combination of supplements, lifestyle modifications, and PDE5 inhibitors (e.g., Sildenafil/Tadalafil) is typically most effective at this stage.",
      action: "Start with our Complete ED Kit. Our doctor will call you to guide treatment.",
    },
    severe: {
      title: "Severe Erectile Dysfunction",
      advice: "Your score suggests significant concerns that need professional medical attention. Severe ED can indicate underlying cardiovascular or hormonal conditions. Treatment is available and effective.",
      action: "Our doctor will call you after ordering to create a personalized treatment plan.",
    },
  },
  pe: {
    normal: {
      title: "Normal Ejaculation Control",
      advice: "Your score falls within the normal range. You have good ejaculatory control. Maintaining overall sexual wellness will help sustain this.",
      action: "Explore our wellness supplements for general health.",
    },
    mild: {
      title: "Mild Premature Ejaculation",
      advice: "Your responses suggest mild concerns with timing. Behavioral techniques (start-stop, squeeze), pelvic floor exercises, and natural supplements can improve control.",
      action: "We recommend our Stamina Plus Kit with behavioral guides.",
    },
    moderate: {
      title: "Moderate Premature Ejaculation",
      advice: "Your results indicate moderate PE. A combination of topical delay treatments, SSRIs, and behavioral therapy tends to be most effective.",
      action: "Start with our PE Control Kit. Our doctor will discuss prescription options on call.",
    },
    severe: {
      title: "Severe Premature Ejaculation",
      advice: "Your score indicates significant PE. Combination therapy — medication + behavioral + topical — produces the best outcomes.",
      action: "Our doctor will call you after ordering to create a personalized plan.",
    },
  },
  libido: {
    normal: {
      title: "Healthy Libido",
      advice: "Your sexual desire and drive are healthy. Continue maintaining good lifestyle habits.",
      action: "Explore our Daily Wellness supplements for long-term health.",
    },
    mild: {
      title: "Mildly Reduced Libido",
      advice: "You may be experiencing a slight dip in desire — often linked to stress, sleep, or lifestyle factors. Simple changes can help.",
      action: "Our libido-support supplements and lifestyle guide can help.",
    },
    moderate: {
      title: "Moderately Low Libido",
      advice: "Noticeable reduction in desire — may relate to hormonal changes, chronic stress, or relationship factors. Testosterone check recommended.",
      action: "Start with our Testosterone Support Kit. Consider hormone testing.",
    },
    severe: {
      title: "Severely Low Libido",
      advice: "Significant loss of desire requiring professional evaluation — could indicate hormonal deficiency, depression, or medication side effects.",
      action: "Doctor follow-up essential. Hormone testing strongly recommended.",
    },
  },
  hormonal: {
    normal: {
      title: "Hormonal Balance Normal",
      advice: "Your responses suggest healthy hormonal function. Resistance training, quality sleep, and nutrient-rich diet will help maintain levels.",
      action: "Our Daily Wellness supplements support ongoing hormonal health.",
    },
    mild: {
      title: "Mild Hormonal Signs",
      advice: "Some early signs of imbalance. Lifestyle optimization — weight management, sleep, exercise — often resolves mild issues.",
      action: "Try our Testosterone Support Kit with zinc, vitamin D, and adaptogens.",
    },
    moderate: {
      title: "Moderate Hormonal Concerns",
      advice: "Multiple signs consistent with low testosterone. Blood test (Total T, Free T, SHBG) recommended.",
      action: "Start supplements and get a hormone panel done. Our doctor will guide you.",
    },
    severe: {
      title: "Significant Hormonal Imbalance",
      advice: "Strong indicators of hormonal dysfunction. Comprehensive medical evaluation required. TRT may be appropriate.",
      action: "Our doctor will call you after ordering. Full hormone panel is essential.",
    },
  },
  infertility: {
    normal: {
      title: "Low Fertility Risk",
      advice: "No major fertility concerns indicated. Healthy lifestyle supports optimal sperm health.",
      action: "Our Daily Wellness supplements support reproductive health.",
    },
    mild: {
      title: "Mild Fertility Concerns",
      advice: "Some lifestyle/history factors suggest mild risk. Reducing heat exposure, improving diet, and antioxidant supplements can improve sperm quality.",
      action: "Our Fertility Support supplement with CoQ10, zinc, and L-carnitine can help.",
    },
    moderate: {
      title: "Moderate Fertility Concerns",
      advice: "Multiple risk factors identified. Semen analysis and hormonal evaluation recommended.",
      action: "Get a semen analysis done. Our supplements + doctor follow-up can guide you.",
    },
    severe: {
      title: "Significant Fertility Concerns",
      advice: "Significant risk factors that need specialist attention. Early intervention with a reproductive urologist dramatically improves outcomes.",
      action: "Specialist follow-up essential. Semen analysis and hormonal panel critical.",
    },
  },
};
