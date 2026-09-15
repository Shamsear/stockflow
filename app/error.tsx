"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("StockFlow App Error:", error);
  }, [error]);

  const whatsAppUrl =
    "https://wa.me/97472360418?text=" +
    encodeURIComponent(
      `Hi StockFlow team! I encountered an error on the system: ${error?.message || "Unknown error"}`
    );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* Top Header */}
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
            <span>Emergency Support</span>
          </a>
        </div>
      </header>

      {/* Error Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mb-6 shadow-xs">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mb-2">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-sm mx-auto">
            {error?.message || "An unexpected error occurred while processing your request."}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xs mx-auto mb-6">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-200 shadow-xs"
            >
              <Home className="w-4 h-4 text-brand-700" />
              <span>Home</span>
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            StockFlow WMS • Qatar & UAE Operations
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200/60 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} StockFlow. All rights reserved.
      </footer>
    </div>
  );
}
