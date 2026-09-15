"use client";

import React from "react";
import Logo from "./Logo";
import { FlagQatar, FlagUAE } from "./Flags";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 pb-24 md:pb-12 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-2 space-y-3">
            <Logo size={32} />
            <p className="text-slate-500 max-w-sm leading-relaxed text-xs sm:text-sm">
              Custom-tailored warehouse management dashboards built for distributors, traders, and logistics operators across Qatar and the UAE.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <FlagUAE className="w-4 h-3" />
                <span>Dubai / Abu Dhabi</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FlagQatar className="w-4 h-3" />
                <span>Doha / Industrial Area</span>
              </span>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div>
            <h5 className="font-bold text-navy-900 text-xs uppercase tracking-wider mb-3">
              Direct Contact
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FlagQatar className="w-4 h-3" />
                  <FlagUAE className="w-4 h-3" />
                </div>
                <span className="font-mono font-medium">+974 7236 0418</span>
              </li>
              <li className="text-[11px] text-slate-400">
                Official line serving Qatar & UAE
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'd%20like%20to%20learn%20more%20about%20your%20warehouse%20dashboard."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h5 className="font-bold text-navy-900 text-xs uppercase tracking-wider mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#" className="hover:text-brand-800 transition-colors">
                  Top of Page
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'd%20like%20to%20request%20a%20tailored%20dashboard%20demo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-800 transition-colors"
                >
                  Request a Tailored Demo
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/97472360418?text=Hi%20StockFlow,%20we%20want%20to%20discuss%20an%20on-site%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-800 transition-colors"
                >
                  Schedule On-Site Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} StockFlow WMS. Built for GCC Logistics Operations.</p>
          <p className="text-slate-400">All rights reserved. Simple, human, and tailored for you.</p>
        </div>
      </div>
    </footer>
  );
}
