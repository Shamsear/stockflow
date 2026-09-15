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
    <section id="how-it-works" className="py-8 sm:py-12 md:py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-semibold mb-2">
            <span>GETTING STARTED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            From Spreadsheet Headache to Live Dashboard in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            No 6-month enterprise delays. No complex software installations.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-slate-300">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-brand-800 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-900 mb-3">
                    <Icon className="w-4 h-4 text-brand-700" />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-navy-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <a
            href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'd%20like%20to%20discuss%20our%20warehouse%20setup."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs hover:shadow"
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
