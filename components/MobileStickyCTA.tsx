"use client";

import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function MobileStickyCTA() {
  const whatsAppUrl =
    "https://wa.me/97472360418?text=" +
    encodeURIComponent("Hi StockFlow! I'd like to discuss a custom warehouse dashboard setup for our operations.");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-float md:hidden">
      <div className="max-w-md mx-auto">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 h-12 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-sm transition-all shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 fill-current shrink-0" />
            <div className="text-left leading-tight">
              <div>Chat on WhatsApp</div>
              <div className="text-[11px] font-mono text-emerald-100 font-normal">+974 7236 0418</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}
