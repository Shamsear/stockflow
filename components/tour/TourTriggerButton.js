'use client';

import React from 'react';
import { useTour } from './TourContext';
import { usePathname } from 'next/navigation';
import { BookOpen, Compass } from 'lucide-react';

export default function TourTriggerButton({ className = '', variant = 'default' }) {
  const pathname = usePathname();
  const { 
    startTour, 
    isTourActive, 
    currentStepIndex, 
    setIsMinimized, 
    steps 
  } = useTour();

  const handleClick = () => {
    if (isTourActive) {
      setIsMinimized(false);
    } else {
      if (pathname === '/login') {
        startTour(0);
      } else {
        const cleanPath = pathname ? pathname.split('?')[0] : '';
        const stepIdx = (steps || []).findIndex(s => s.route && s.route.split('?')[0] === cleanPath);
        startTour(stepIdx !== -1 ? stepIdx : 1);
      }
    }
  };

  const stepNumber = (currentStepIndex ?? 0) + 1;

  if (variant === 'topbar') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`text-amber-300 hover:text-amber-200 flex items-center gap-1.5 font-bold text-xs bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1 rounded-md border border-amber-500/30 transition-colors shrink-0 cursor-pointer ${className}`}
        title={isTourActive ? `WMS Guide in progress (Step ${stepNumber} of 10) - Click to view` : 'Open interactive warehouse guide'}
      >
        <BookOpen size={12} />
        <span className="hidden xs:inline">
          {isTourActive ? `WMS Guide (${stepNumber}/10)` : 'How This WMS Works'}
        </span>
        <span className="xs:hidden">Guide</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer ${
        isTourActive
          ? 'bg-primary/10 border border-primary/40 text-primary hover:bg-primary/15'
          : 'bg-surface border border-border hover:bg-surface-elevated text-text-primary hover:border-primary/40'
      } ${className}`}
      title={
        isTourActive
          ? `Interactive Guide in progress (Step ${stepNumber} of 10) - Click to view`
          : 'Open interactive warehouse walkthrough guide'
      }
    >
      <Compass size={14} className="text-primary shrink-0" />
      <span className="hidden sm:inline">
        {isTourActive ? `WMS Guide (Step ${stepNumber}/10)` : 'WMS Interactive Guide'}
      </span>
      <span className="sm:hidden">
        {isTourActive ? `${stepNumber}/10` : 'Guide'}
      </span>
    </button>
  );
}
