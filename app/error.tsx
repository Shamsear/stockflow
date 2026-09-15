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
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-slate-800 p-4 sm:p-6 pt-20 md:pt-28 pb-12">

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
