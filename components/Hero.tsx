"use client";

import React from "react";
import { MessageCircle, CheckCircle2, ArrowRight, Sparkles, Clock, Shield, Package, Tag, MapPin, SlidersHorizontal, Layers } from "lucide-react";
import { FlagQatar, FlagUAE } from "./Flags";

export default function Hero() {
  const whatsAppUrl =
    "https://wa.me/97472360418?text=" +
    encodeURIComponent("Hi StockFlow team! I'd like to discuss a custom warehouse dashboard setup for our operations.");

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-brand-800 text-xs sm:text-sm font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-600"></span>
            <span>BUILT FOR GCC WAREHOUSES, DISTRIBUTORS & TRADERS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15] mb-6">
            Tired of Spreadsheet Chaos in Your Warehouse?
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-6">
            Stop losing track of missing pallets, expired stock, and delivery slips buried in WhatsApp chats. 
            We build a <span className="font-semibold text-navy-900 underline decoration-teal-500/50 decoration-2 underline-offset-4">custom real-time dashboard</span> tailor-made around your exact inventory rules, batch tracking, expiry dates, and warehouse floor plan.
          </p>

          {/* Core Tracking Capability Chips (Pure SVG Icons, Zero Emojis) */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle font-medium">
              <Package className="w-3.5 h-3.5 text-brand-700" />
              <span>Live Stock Levels</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Expiry Tracking (FEFO)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle font-medium">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Batch & Lot Numbers</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-subtle font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Bin & Rack Coordinates</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-brand-900 font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-700" />
              <span>100% Tailor-Made For You</span>
            </span>
          </div>

          {/* The High-Converting Tailored Demo Offer Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card text-left max-w-3xl mx-auto mb-10 relative">
            <div className="absolute -top-3.5 right-4 sm:right-6 px-3 py-1 bg-brand-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              Tailored Walkthrough
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-brand-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-navy-900">
                  Discuss Your Warehouse Workflow with Our Team
                </h2>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Tell us what you store and where your team loses time. We'll show you a 
                  <strong className="text-slate-800 font-semibold"> live, tailored dashboard walkthrough</strong> configured for your exact dock layout, items, and dispatch rules.
                </p>
              </div>
            </div>

            {/* Action Buttons: WhatsApp & Live Demo */}
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:col-span-8 flex items-center justify-between px-5 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base transition-all shadow hover:shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 fill-current shrink-0 transition-transform group-hover:scale-110" />
                  <div className="text-left leading-tight">
                    <div className="font-bold text-base sm:text-lg">Message Us on WhatsApp</div>
                    <div className="text-xs text-emerald-100 font-mono font-medium flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span>+974 7236 0418</span>
                      <span className="text-emerald-200 hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <FlagQatar className="w-3.5 h-2.5 shrink-0" />
                        <FlagUAE className="w-3.5 h-2.5 shrink-0" />
                        <span>Serving Qatar & UAE</span>
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 ml-2" />
              </a>

              <a
                href="/login"
                className="sm:col-span-4 flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm sm:text-base transition-all shadow hover:shadow-md cursor-pointer border border-slate-700 group text-center"
              >
                <span>Explore Live Demo</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Direct Human Guarantee */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Typical reply in under 8 minutes</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Shield className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>Direct chat with our solutions engineers (No bots)</span>
              </span>
            </div>
          </div>

          {/* 3 Value Bullets in a Unified Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-subtle">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Tailored to your rules</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-subtle">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Phones, tablets & PCs</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/80 border border-slate-200/80 shadow-subtle">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>On-site GCC setup available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
