"use client";

import React from "react";
import Link from "next/link";
import { Home, LayoutDashboard, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";

export default function NotFound() {
  const whatsAppUrl =
    "https://wa.me/97472360418?text=" +
    encodeURIComponent("Hi StockFlow team! I encountered a 404 missing page error.");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* Top Simple Header */}
      <header className="w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
          </Link>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Support</span>
          </a>
        </div>
      </header>

      {/* Main Error Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 text-brand-700 font-mono text-2xl font-black mb-6 shadow-xs">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mb-2">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8 max-w-sm mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xs mx-auto mb-6">
            <Link
              href="/"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-200 shadow-xs"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-700" />
              <span>Dashboard</span>
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            StockFlow WMS • Qatar & UAE Operations
          </p>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="py-4 border-t border-slate-200/60 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} StockFlow. All rights reserved.
      </footer>
    </div>
  );
}
