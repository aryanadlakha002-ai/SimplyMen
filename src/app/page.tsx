"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import IMABanner from "@/components/landing/ima-banner";
import HowItWorks from "@/components/landing/how-it-works";
import Conditions from "@/components/landing/conditions";
import TreatmentPrograms from "@/components/home/treatment-programs";
import ProgramShowcase from "@/components/home/program-showcase";
import WhyBetter from "@/components/home/why-better";
import RoutineGraph from "@/components/landing/routine-graph";
import MeetOurExperts from "@/components/home/meet-our-experts";
import Testimonials from "@/components/landing/testimonials";
import WhyChooseSimplyMen from "@/components/home/why-choose-simplymen";
import FAQ from "@/components/landing/faq";
import WellnessKnowledge from "@/components/landing/wellness-knowledge";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <IMABanner />
        <HowItWorks />
        <Conditions />
        <TreatmentPrograms />
        <ProgramShowcase />
        <WhyBetter />
        <RoutineGraph />
        <MeetOurExperts />
        <Testimonials />
        <WhyChooseSimplyMen />
        <FAQ />
        <WellnessKnowledge />
      </main>
      <Footer />
    </>
  );
}
