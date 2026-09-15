import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export default function Logo({
  className = "",
  size = 36,
  showWordmark = true,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Flow Glyph */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-navy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="logo-teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>

        {/* Top Inbound Tier (Dock & Inbound Flow) */}
        <path
          d="M10 14C10 10.6863 12.6863 8 16 8H36C37.1046 8 38 8.89543 38 10V16C38 17.1046 37.1046 18 36 18H20C17.7909 18 16 19.7909 16 22C16 22.5523 15.5523 23 15 23H11C10.4477 23 10 22.5523 10 22V14Z"
          fill="url(#logo-navy)"
        />

        {/* Dynamic Center Pivot */}
        <rect x="20" y="21" width="8" height="6" rx="3" fill="#0F766E" />

        {/* Bottom Outbound Tier (Shelf & Dispatch Flow) */}
        <path
          d="M38 34C38 37.3137 35.3137 40 32 40H12C10.8954 40 10 39.1046 10 38V32C10 30.8954 10.8954 30 12 30H28C30.2091 30 32 28.2091 32 26C32 25.4477 32.4477 25 33 25H37C37.5523 25 38 25.4477 38 26V34Z"
          fill="url(#logo-teal)"
        />
      </svg>

      {showWordmark && (
        <div className="flex items-baseline tracking-tight font-sans shrink-0">
          <span className="text-lg sm:text-xl font-extrabold text-navy-900 tracking-tight">
            Stock
          </span>
          <span className="text-lg sm:text-xl font-bold text-brand-700 tracking-tight">
            Flow
          </span>
          <span className="ml-1.5 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-50 border border-brand-100 rounded">
            WMS
          </span>
        </div>
      )}
    </div>
  );
}
