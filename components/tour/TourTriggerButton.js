'use client';

import React from 'react';
import { useTour } from './TourContext';
import { Compass } from 'lucide-react';

export default function TourTriggerButton({ className = '' }) {
  const { startTour, isTourActive } = useTour();

  if (isTourActive) return null;

  return (
    <button
      type="button"
      onClick={() => startTour(0)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border hover:bg-surface-elevated text-text-primary rounded-lg text-xs font-semibold transition-all hover:border-primary/40 shadow-xs ${className}`}
      title="Start guided warehouse walkthrough"
    >
      <Compass size={14} className="text-primary" />
      <span className="hidden sm:inline">Interactive Tour</span>
      <span className="sm:hidden">Tour</span>
    </button>
  );
}
