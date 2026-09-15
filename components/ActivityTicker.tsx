"use client";

import React, { useState, useEffect } from "react";
import { Activity, CheckCircle2, Clock, MapPin } from "lucide-react";

interface ActivityItem {
  time: string;
  location: string;
  action: string;
  detail: string;
}

const activities: ActivityItem[] = [
  {
    time: "2 mins ago",
    location: "Doha • Gate 02",
    action: "Inbound Verified",
    detail: "PO-4021 (4 Pallets Dry Goods) checked in & stored",
  },
  {
    time: "6 mins ago",
    location: "Dubai • Al Quoz",
    action: "Outbound Dispatched",
    detail: "Courier manifest ORD-9914 handed to driver",
  },
  {
    time: "11 mins ago",
    location: "Sharjah • Industrial 10",
    action: "Stock Adjusted",
    detail: "Bay B-04 cycle count completed (100% matched)",
  },
  {
    time: "18 mins ago",
    location: "Abu Dhabi • Mussafah",
    action: "Reorder Triggered",
    detail: "SKU-AUTO-772 reached minimum threshold (PO drafted)",
  },
];

export default function ActivityTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % activities.length);
        setFade(true);
      }, 250);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const current = activities[currentIdx];

  return (
    <div className="w-full bg-slate-900 text-white border-y border-slate-800 py-2.5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        {/* Left: Ticker Label */}
        <div className="flex items-center gap-2 text-teal-400 font-semibold shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="uppercase tracking-wider font-mono text-[11px]">Live GCC Warehouse Feed</span>
        </div>

        {/* Center: Dynamic Event */}
        <div
          className={`flex items-center justify-center sm:justify-start gap-2 text-slate-300 transition-opacity duration-300 text-center sm:text-left min-w-0 max-w-full ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono text-[10px] font-bold border border-slate-700 shrink-0">
            {current.action}
          </span>
          <span className="font-semibold text-white truncate max-w-[190px] xs:max-w-xs sm:max-w-none">{current.detail}</span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400 shrink-0">
            <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
            <span>{current.location}</span>
          </span>
        </div>

        {/* Right: Timestamp */}
        <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-[11px] font-mono shrink-0">
          <Clock className="w-3 h-3" />
          <span>{current.time}</span>
        </div>
      </div>
    </div>
  );
}
