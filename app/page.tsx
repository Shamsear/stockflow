"use client";

import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-20 md:pb-0 overflow-x-hidden">
      <main className="flex-1">
        {/* Punchy Minimal Hero with direct CTAs */}
        <Hero />

        {/* 4 Core Pillars: Inbound, Outbound, Stock & Expiry, Bespoke */}
        <Features />

        {/* 3-Step Simple Onboarding Timeline */}
        <HowItWorks />

        {/* Clear Answers to Common Questions */}
        <FAQ />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
}
