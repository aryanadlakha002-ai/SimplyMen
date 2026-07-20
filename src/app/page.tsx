"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import IMABanner from "@/components/landing/ima-banner";
import HowItWorks from "@/components/landing/how-it-works";
import Conditions from "@/components/landing/conditions";
import NotSureCTA from "@/components/home/not-sure-cta";
import TreatmentPrograms from "@/components/home/treatment-programs";
import ProgramShowcase from "@/components/home/program-showcase";
import WhyBetter from "@/components/home/why-better";
import MeetOurExperts from "@/components/home/meet-our-experts";
import WhyChooseSimplyMen from "@/components/home/why-choose-simplymen";
import Testimonials from "@/components/landing/testimonials";
import WellnessKnowledge from "@/components/landing/wellness-knowledge";
import RoutineGraph from "@/components/landing/routine-graph";
import FAQ from "@/components/landing/faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <IMABanner />
        <Conditions />
        <NotSureCTA />
        <TreatmentPrograms />
        <ProgramShowcase />
        <HowItWorks />
        <WhyBetter />
        <RoutineGraph />
        <MeetOurExperts />
        <WhyChooseSimplyMen />
        <Testimonials />
        <WellnessKnowledge />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
