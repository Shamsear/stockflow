import React from "react";

export function FlagUAE({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`inline-block shrink-0 rounded-[2px] shadow-subtle overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* UAE Flag: Green, White, Black horizontal bands with Red vertical band on hoist */}
      <rect width="24" height="5.33" fill="#00732F" />
      <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
      <rect y="10.66" width="24" height="5.34" fill="#000000" />
      <rect width="6" height="16" fill="#FE0000" />
    </svg>
  );
}

export function FlagQatar({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`inline-block shrink-0 rounded-[2px] shadow-subtle overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Qatar Flag: White hoist with serrated edge + Maroon (#8A1538) fly */}
      <rect width="24" height="16" fill="#8A1538" />
      <path
        d="M0 0H7L9 0.89L7 1.78L9 2.67L7 3.56L9 4.44L7 5.33L9 6.22L7 7.11L9 8L7 8.89L9 9.78L7 10.67L9 11.56L7 12.44L9 13.33L7 14.22L9 15.11L7 16H0V0Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
