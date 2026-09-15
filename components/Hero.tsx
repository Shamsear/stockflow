"use client";

import React from "react";
import {
  MessageCircle,
  ArrowRight,
  Clock,
  Package,
  Layers,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
} from "lucide-react";
import { FlagQatar, FlagUAE } from "./Flags";

export default function Hero() {
  const whatsAppUrl =
    "https://wa.me/97472360418?text=" +
    encodeURIComponent(
      "Hi StockFlow team! I'd like to discuss a custom warehouse dashboard setup for our operations."
    );

  const capabilities = [
    {
      icon: ArrowDownLeft,
      title: "Inbound Receiving",
      desc: "Instant PO quantity verification & bay placement",
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    },
    {
      icon: Clock,
      title: "FEFO Expiry Protection",
      desc: "Automated batch alerts before stock spoils",
      color: "text-amber-700 bg-amber-50 border-amber-100",
    },
    {
      icon: ArrowUpRight,
      title: "Driver Pick & Dispatch",
      desc: "Shelf-guided pick lists & digital proof slips",
      color: "text-teal-700 bg-teal-50 border-teal-100",
    },
    {
      icon: Package,
      title: "Live Bay Stock Sync",
      desc: "Real-time SKU balances on phones, iPads & PCs",
      color: "text-brand-800 bg-brand-50 border-brand-100",
    },
  ];

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-semibold mb-3 sm:mb-4 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="tracking-wide uppercase text-[11px] sm:text-xs">
              Tailor-Made WMS • Qatar & UAE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-navy-900 tracking-tight leading-[1.18] mb-3 sm:mb-4">
            Replace Spreadsheet Chaos with a{" "}
            <span className="text-brand-700">Custom Warehouse Dashboard</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-5 sm:mb-6">
            Eliminate lost stock, expired batches, and WhatsApp dispatch confusion.
            We build and deploy a live dashboard tailored to your exact warehouse layout
            in 3 to 5 days.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 max-w-md mx-auto mb-4 sm:mb-5">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href="/login"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow cursor-pointer border border-slate-800 group text-center"
            >
              <span>Explore Live Demo</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Micro Trust Line */}
          <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs text-slate-500 font-medium mb-6 sm:mb-8">
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Typical reply in &lt;8 mins</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <FlagQatar className="w-3.5 h-2.5" />
              <FlagUAE className="w-3.5 h-2.5" />
              <span className="text-slate-600 font-medium">Doha & Dubai On-Site</span>
            </span>
          </div>

          {/* 4 Crisp Capabilities Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-left">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${item.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h2 className="text-xs font-bold text-navy-900 leading-tight">
                      {item.title}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
