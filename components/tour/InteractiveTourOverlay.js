'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTour } from './TourContext';

export default function InteractiveTourOverlay() {
  const pathname = usePathname();
  const { isTourActive, targetRect, isPdfModalOpen } = useTour();
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
    let rafId = null;
    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateSize();
          rafId = null;
        });
      }
    };
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  // Compute border-radius in pixels so highlight frame is concentric with target element
  const radiusPx = useMemo(() => {
    if (!targetRect?.borderRadius) return 14;
    const str = targetRect.borderRadius;
    if (str.includes('9999px') || str.includes('50%')) return 9999;
    const pxMatch = str.match(/([\d.]+)px/);
    if (pxMatch) {
      return Math.min(48, Math.round(parseFloat(pxMatch[1]) + 4));
    }
    const remMatch = str.match(/([\d.]+)rem/);
    if (remMatch) {
      return Math.min(48, Math.round(parseFloat(remMatch[1]) * 16 + 4));
    }
    return 14;
  }, [targetRect?.borderRadius]);

  const currentCleanPath = pathname ? pathname.split('?')[0] : '';
  const isTourPage = currentCleanPath === '/login' || currentCleanPath.startsWith('/dashboard');

  if (!isTourActive || !isTourPage || isPdfModalOpen) return null;

  // Precision padding: 4px tight hugging
  const padding = 4;
  
  // Use pure viewport coordinates directly from targetRect
  const hasValidTarget = Boolean(targetRect && targetRect.width > 0 && targetRect.height > 0);
  const rect = hasValidTarget
    ? {
        top: Math.round(targetRect.top - padding),
        left: Math.round(targetRect.left - padding),
        width: Math.round(targetRect.width + padding * 2),
        height: Math.round(targetRect.height + padding * 2),
        isOffscreen: targetRect.bottom < 0 || targetRect.top > viewport.height
      }
    : null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-[80] transition-opacity duration-300 ${hasValidTarget ? 'opacity-100' : 'opacity-0'}`}>
      {/* SVG Mask Cutout with Concentric Rounded Rect */}
      {rect && !rect.isOffscreen && rect.width > 0 && rect.height > 0 ? (
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none transition-all duration-200"
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
                rx={radiusPx}
                ry={radiusPx}
                fill="#000000"
                className="transition-all duration-200 ease-out"
              />
            </mask>
          </defs>
          {/* Subtle, cinema-grade dark slate vignette */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(15, 23, 42, 0.58)"
            mask="url(#tour-spotlight-cutout)"
          />
        </svg>
      ) : (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-[1px] pointer-events-none transition-opacity duration-300" />
      )}

      {/* Target Highlight Container: Precision Luminous Frame with Smooth CSS Transitions */}
      {rect && !rect.isOffscreen && rect.width > 0 && rect.height > 0 && (
        <div
          className="fixed pointer-events-none z-[85] transition-all duration-200 ease-out"
          style={{
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            borderRadius: `${radiusPx}px`,
          }}
        >
          {/* Crisp Primary Border with Dual-Tier Ambient Glow */}
          <div
            className="absolute inset-0 rounded-[inherit] border-2 border-emerald-500 dark:border-emerald-400 pointer-events-none"
            style={{
              boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.4), 0 0 20px -2px rgba(16, 185, 129, 0.35), inset 0 0 10px rgba(16, 185, 129, 0.08)',
            }}
          />

          {/* Gentle Breathing Aura Ring */}
          <div
            className="absolute -inset-1 rounded-[inherit] border border-emerald-400/40 pointer-events-none animate-pulse"
            style={{
              animationDuration: '2.4s',
            }}
          />

          {/* Precision Micro Corner Reticles */}
          <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-slate-900 shadow-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
