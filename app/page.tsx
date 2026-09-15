"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ActivityTicker from "@/components/ActivityTicker";
import Hero from "@/components/Hero";
import AssessmentWidget from "@/components/AssessmentWidget";
import TailorMadeSection from "@/components/TailorMadeSection";
import WorkflowsAndExamples from "@/components/WorkflowsAndExamples";
import DashboardPreview from "@/components/DashboardPreview";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header with Live Status & WhatsApp Trigger */}
      <Navbar />

      {/* Live Realistic GCC Warehouse Operations Activity Feed */}
      <ActivityTicker />

      <main className="flex-1">
        {/* Hero Section with Tailored Walkthrough Hook */}
        <Hero />

        {/* 20-Second Interactive Setup Estimator with WhatsApp Chat Simulation */}
        <AssessmentWidget />

        {/* The Core Differentiator: Rigid ERPs vs. 100% Tailor-Made */}
        <TailorMadeSection />

        {/* Concrete Real-World Workflows (Inbound, Outbound, Stock) & GCC Industry Cases */}
        <WorkflowsAndExamples />

        {/* Interactive Live Simulated Warehouse Dashboard with Search & Filter */}
        <DashboardPreview />

        {/* Bento Grid Features */}
        <Features />

        {/* Local GCC Credibility & Real Founders / Engineers (Qatar & UAE) */}
        <TrustSection />

        {/* 3-Step Simple Onboarding Timeline */}
        <HowItWorks />

        {/* Objection-Busting FAQ with Smooth Transitions */}
        <FAQ />
      </main>

      {/* Floating Sticky Mobile WhatsApp Bar */}
      <MobileStickyCTA />

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
}
