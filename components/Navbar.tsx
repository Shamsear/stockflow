"use client";

import React from "react";
import Logo from "./Logo";
import { FlagUAE, FlagQatar } from "./Flags";
import { MessageCircle, ShieldCheck, MonitorPlay } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Brandmark & Regional Tag */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <a href="#" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-brand-700 rounded-lg">
            <Logo size={30} />
          </a>

          {/* Clean, compact Regional Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100/90 border border-slate-200/80 rounded-full">
            <span className="flex items-center gap-1"><FlagQatar /> Qatar</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1"><FlagUAE /> UAE</span>
          </div>
        </div>

        {/* Center: Breathable Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-brand-900 transition-colors">
            Capabilities
          </a>
          <a href="#how-it-works" className="hover:text-brand-900 transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-brand-900 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right: Clean, Spacious Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/login"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs sm:text-sm transition-all border border-slate-200 shadow-xs"
          >
            <MonitorPlay className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-700 shrink-0" />
            <span className="whitespace-nowrap">Live Demo</span>
          </a>

          <a
            href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'm%20interested%20in%20a%20tailored%20warehouse%20dashboard%20demo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-5 sm:py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all duration-150 shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {/* Live Online Pulse inside CTA */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
            </span>
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current" />
            <span className="hidden sm:inline whitespace-nowrap">Chat on WhatsApp</span>
            <span className="sm:hidden whitespace-nowrap">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
