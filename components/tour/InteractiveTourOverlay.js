'use client';

import React, { useEffect, useState } from 'react';
import { useTour } from './TourContext';

export default function InteractiveTourOverlay() {
  const { isTourActive, targetRect } = useTour();
  const [viewport, setViewport] = useState({ width: 0, height: 0, scrollY: 0, scrollX: 0 });

  useEffect(() => {
    const updateSize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.scrollY,
        scrollX: window.scrollX,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('scroll', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', updateSize);
    };
  }, []);

  if (!isTourActive) return null;

  // Calculate coordinates relative to viewport
  const padding = 8;
  const rect = targetRect
    ? {
        top: Math.max(0, targetRect.top - viewport.scrollY - padding),
        left: Math.max(0, targetRect.left - viewport.scrollX - padding),
        width: Math.min(viewport.width, targetRect.width + padding * 2),
        height: Math.min(viewport.height, targetRect.height + padding * 2),
      }
    : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] transition-opacity duration-300">
      {/* SVG Mask Cutout */}
      {rect && rect.width > 0 && rect.height > 0 ? (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="tour-spotlight-cutout">
              {/* White fills everything (opaque) */}
              <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
              {/* Black cuts out the spotlight area (transparent) */}
              <rect
                x={rect.left}
                y={rect.top}
                width={rect.width}
                height={rect.height}
                rx="10"
                ry="10"
                fill="#000000"
              />
            </mask>
          </defs>
          {/* Dark backdrop with mask applied */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(15, 23, 42, 0.62)"
            mask="url(#tour-spotlight-cutout)"
          />
        </svg>
      ) : (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-[1px] pointer-events-none transition-opacity duration-300" />
      )}

      {/* Target Focus Ring */}
      {rect && rect.width > 0 && rect.height > 0 && (
        <div
          className="fixed pointer-events-none z-[81] transition-all duration-300 rounded-lg border border-primary/80 ring-4 ring-primary/20 shadow-lg"
          style={{
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          }}
        />
      )}
    </div>
  );
}
