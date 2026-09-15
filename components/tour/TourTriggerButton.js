'use client';

import React from 'react';
import { useTour } from './TourContext';
import { usePathname } from 'next/navigation';
import { Compass } from 'lucide-react';

export default function TourTriggerButton({ className = '' }) {
  const pathname = usePathname();
  const { 
    startTour, 
    isTourActive, 
    currentStepIndex, 
    setIsMinimized, 
    setStepPhase, 
    steps 
  } = useTour();

  const handleClick = () => {
    if (isTourActive) {
      // If already active, unminimize and bring overview into focus
      setIsMinimized(false);
      if (setStepPhase) setStepPhase('overview');
    } else {
      // If starting tour from dashboard, align with current page or dashboard overview
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

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
        isTourActive
          ? 'bg-primary/10 border border-primary/40 text-primary hover:bg-primary/15'
          : 'bg-surface border border-border hover:bg-surface-elevated text-text-primary hover:border-primary/40'
      } ${className}`}
      title={
        isTourActive
          ? `Interactive Tour in progress (Step ${stepNumber} of 10) - Click to view guide`
          : 'Start interactive warehouse tour'
      }
    >
      <Compass size={14} className={isTourActive ? 'text-primary' : 'text-primary'} />
      <span className="hidden sm:inline">
        {isTourActive ? `Tour (Step ${stepNumber}/10)` : 'Interactive Tour'}
      </span>
      <span className="sm:hidden">
        {isTourActive ? `${stepNumber}/10` : 'Tour'}
      </span>
    </button>
  );
}
