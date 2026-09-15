"use client";

import React, { useState } from "react";
import { MessageCircle, Check, ArrowRight, SlidersHorizontal, CheckCheck, MapPin, Package, AlertTriangle } from "lucide-react";
import Logo from "./Logo";
import { FlagQatar, FlagUAE } from "./Flags";

export default function AssessmentWidget() {
  const [country, setCountry] = useState<"uae" | "qatar">("qatar");
  const [skuRange, setSkuRange] = useState<string>("200 - 1,500 SKUs");
  const [headache, setHeadache] = useState<string>("Stock Discrepancies (Excel never matches shelf)");

  const skuOptions = [
    "Under 200 SKUs",
    "200 - 1,500 SKUs",
    "1,500 - 5,000 SKUs",
    "5,000+ Enterprise SKUs",
  ];

  const headacheOptions = [
    "Stock Discrepancies (Excel never matches physical shelf)",
    "Slow Inbound Receiving & Paper Delivery Slips",
    "Dispatch Delays & Picking Wrong Items",
    "Need Batch / Expiry / Serial Number Tracking",
  ];

  // Dedicated single WhatsApp number for all inquiries
  const phoneNumber = "97472360418";
  const locationLabel = country === "qatar" ? "Qatar (Doha / Industrial Area)" : "UAE (Dubai / Abu Dhabi)";

  const messageText =
    `Hi StockFlow team! I just completed the warehouse assessment on your site:\n\n` +
    `Location: ${locationLabel}\n` +
    `Inventory Size: ${skuRange}\n` +
    `Biggest Bottleneck: ${headache}\n\n` +
    `Could you show us how StockFlow can be custom tailored for this setup?`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-700" />
            <span>20-SECOND TAILORED SETUP ESTIMATOR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            See How StockFlow Adapts to Your Exact Operation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Pick your warehouse profile below. Watch the live WhatsApp preview update automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Question 1: Country */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  1. Where is your primary warehouse located?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCountry("qatar")}
                    className={`relative flex items-center justify-center gap-2 py-3 px-3.5 sm:px-6 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                      country === "qatar"
                        ? "bg-white border-brand-700 text-brand-900 ring-2 ring-brand-600/20 shadow-sm"
                        : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <FlagQatar className="w-5 h-3.5 shrink-0" />
                    <span className="truncate">State of Qatar</span>
                    {country === "qatar" && (
                      <Check className="w-4 h-4 text-brand-700 absolute right-2.5 top-1/2 -translate-y-1/2" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCountry("uae")}
                    className={`relative flex items-center justify-center gap-2 py-3 px-3.5 sm:px-6 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                      country === "uae"
                        ? "bg-white border-emerald-600 text-emerald-800 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <FlagUAE className="w-5 h-3.5 shrink-0" />
                    <span className="truncate">United Arab Emirates</span>
                    {country === "uae" && (
                      <Check className="w-4 h-4 text-emerald-600 absolute right-2.5 top-1/2 -translate-y-1/2" />
                    )}
                  </button>
                </div>
              </div>

              {/* Question 2: Inventory Scale */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  2. How many active products or SKUs do you manage?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {skuOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSkuRange(opt)}
                      className={`min-h-[50px] p-2.5 rounded-xl border text-xs font-medium transition-all duration-200 flex items-center justify-center text-center cursor-pointer active:scale-[0.98] ${
                        skuRange === opt
                          ? "bg-white border-brand-700 text-navy-900 font-bold ring-2 ring-brand-600/20 shadow-sm"
                          : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Biggest Bottleneck */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  3. What causes the most headaches for your warehouse team?
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {headacheOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setHeadache(opt)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left font-medium transition-all duration-200 flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                        headache === opt
                          ? "bg-white border-brand-700 text-navy-900 font-bold ring-2 ring-brand-600/20 shadow-sm"
                          : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <span className="leading-snug">{opt}</span>
                      {headache === opt && <Check className="w-4 h-4 text-brand-700 shrink-0 ml-3" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200/80">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 p-3.5 sm:px-6 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all duration-150 shadow hover:shadow-md cursor-pointer group text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">Send Assessment to StockFlow on WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="text-center mt-2 text-[11px] text-slate-500">
                Direct chat with our solutions engineering team (No automated bots)
              </div>
            </div>
          </div>

          {/* Right Column: Live WhatsApp Chat Simulation */}
          <div className="lg:col-span-5 rounded-2xl bg-[#EFEAE2] border border-slate-300 shadow-card overflow-hidden flex flex-col justify-between h-full">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center p-1.5 border border-white/20 shrink-0">
                  <Logo size={22} showWordmark={false} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-tight truncate">
                    StockFlow Solutions Team
                  </div>
                  <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0"></span>
                    <span className="truncate">Online • replies in &lt; 8 mins</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] sm:text-xs font-mono bg-white/10 px-2 py-1 rounded text-emerald-100 shrink-0">
                +974 7236 0418
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-end bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Timestamp */}
              <div className="text-center">
                <span className="text-[10px] bg-white/80 backdrop-blur px-2 py-0.5 rounded-full text-slate-500 shadow-subtle">
                  Today
                </span>
              </div>

              {/* User Outgoing Bubble (Simulated live from clicks) */}
              <div className="self-end max-w-[88%] bg-[#E7FFDB] text-slate-800 p-3 rounded-xl rounded-tr-none shadow-sm text-xs leading-relaxed transition-all duration-300">
                <p className="font-semibold text-emerald-950 mb-1">
                  Hi StockFlow team! I need help with our warehouse setup:
                </p>
                <div className="space-y-1 text-[11px] text-slate-700 bg-white/60 p-2 rounded border border-emerald-200/50 my-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                    <span>Location: {locationLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3 h-3 text-emerald-700 shrink-0" />
                    <span>Inventory: {skuRange}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>Challenge: {headache}</span>
                  </div>
                </div>
                <p className="mt-1">
                  Can you show us a custom demo configured for this?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-sky-500" />
                </div>
              </div>

              {/* StockFlow Real Human Incoming Bubble */}
              <div className="self-start max-w-[88%] bg-white text-slate-800 p-3 rounded-xl rounded-tl-none shadow-sm text-xs leading-relaxed">
                <div className="text-[10px] font-bold text-teal-800 mb-0.5">
                  StockFlow GCC Operations
                </div>
                <p>
                  Salam! We have tailored dashboards configured for warehouses managing <strong className="text-slate-900">{skuRange}</strong> in {country === "qatar" ? "Doha" : "UAE"}.
                </p>
                <p className="mt-1.5 text-slate-600">
                  Tap below to start this exact chat on WhatsApp — we'll share a 3-minute video showing how we solve this!
                </p>
                <div className="flex items-center justify-end text-[9px] text-slate-400 mt-1">
                  <span>Just now</span>
                </div>
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="bg-white p-2.5 border-t border-slate-200">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open This Conversation in WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
