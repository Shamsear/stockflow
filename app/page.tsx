"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Header with Live Status & WhatsApp Trigger */}
      <Navbar />

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

      {/* Floating Sticky Mobile WhatsApp Bar */}
      <MobileStickyCTA />

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
}

