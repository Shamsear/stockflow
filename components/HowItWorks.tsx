"use client";

import React from "react";
import { MessageCircle, MonitorPlay, Rocket, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: MessageCircle,
      title: "Tell Us How Your Warehouse Works",
      desc: "Send us a message on WhatsApp. Share a snapshot of your spreadsheet, your product types, or the biggest bottleneck your team faces today.",
      badge: "5-Minute Chat",
    },
    {
      step: "02",
      icon: MonitorPlay,
      title: "See Your Tailored Dashboard Walkthrough",
      desc: "We show you a live, interactive demonstration configured around your inventory scale, dock workflow, and specific reporting rules.",
      badge: "Interactive Demo",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Deploy & Onboard in 3 to 5 Days",
      desc: "Your staff learns the clean mobile/desktop interface in under 30 minutes. We support you on WhatsApp and on-site across Qatar and the UAE.",
      badge: "Full Local Support",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <span>GETTING STARTED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            From Spreadsheet Headache to Live Dashboard in 3 Steps
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4">
            No 6-month enterprise delays. No complex software installations.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-subtle flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-slate-300">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-bold text-brand-800 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-navy-900 mb-4 shadow-subtle">
                    <Icon className="w-6 h-6 text-brand-700" />
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'd%20like%20to%20discuss%20our%20warehouse%20setup."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow hover:shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Start Step 1 on WhatsApp Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
