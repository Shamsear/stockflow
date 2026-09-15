'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTour } from './TourContext';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Send, 
  HelpCircle, 
  Minimize2, 
  Maximize2, 
  Info, 
  Loader2, 
  User, 
  Building2, 
  MapPin, 
  ArrowRight,
  MousePointerClick,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'How does FEFO expiry work?',
  'Can I customize the PDF delivery note?',
  'Can we connect barcode scanners?',
  'Can we track stock by client branch?'
];

export default function AICopilotWidget() {
  const pathname = usePathname();
  const {
    steps,
    currentStep,
    currentStepIndex,
    isTourActive,
    isMinimized,
    isChatOpen,
    isPdfModalOpen,
    chatMessages,
    visitorProfile,
    isOnboardingOpen,
    targetRect,
    saveVisitorProfile,
    skipOnboarding,
    nextStep,
    prevStep,
    skipTour,
    setIsMinimized,
    setIsChatOpen,
    askQuestion
  } = useTour();

  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [profileName, setProfileName] = useState(visitorProfile?.name || '');
  const [profileCompany, setProfileCompany] = useState(visitorProfile?.company || '');
  const [profileLocation, setProfileLocation] = useState(visitorProfile?.location || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const popoverRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Cloud comment placement & coordinate state
  const [coords, setCoords] = useState({ top: 0, left: 0, placement: 'left', arrowOffset: 40 });
  const [isPositionReady, setIsPositionReady] = useState(false);

  // ═══════════════════════════════════════════════════════════════
  // Dynamic Cloud Callout Positioning Calculation
  // ═══════════════════════════════════════════════════════════════
  const updatePosition = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Center if onboarding
    if (isOnboardingOpen) {
      setIsPositionReady(true);
      return;
    }

    const popoverEl = popoverRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Locked to target button - keep hidden until measured
    if (!targetRect || targetRect.width === 0 || targetRect.height === 0) {
      setIsPositionReady(false);
      return;
    }

    // Auto measure card size
    const popoverW = Math.min(popoverEl?.offsetWidth || 340, vw - 24);
    const popoverH = popoverEl?.offsetHeight || 220;

    // Pure viewport coordinates directly from targetRect
    const tTop = targetRect.top;
    const tBottom = targetRect.top + targetRect.height;
    const tLeft = targetRect.left;
    const tRight = targetRect.left + targetRect.width;
    const tCenterX = targetRect.left + targetRect.width / 2;
    const tCenterY = targetRect.top + targetRect.height / 2;

    const gap = 14;
    const pad = 16;

    const spaceBottom = vh - tBottom;
    const spaceTop = tTop;
    const spaceRight = vw - tRight;
    const spaceLeft = tLeft;

    let placement = 'bottom';

    // On narrow screens, prefer bottom or top
    const isMobile = vw < 768;

    if (isMobile) {
      if (spaceBottom >= popoverH + gap) {
        placement = 'bottom';
      } else if (spaceTop >= popoverH + gap) {
        placement = 'top';
      } else {
        placement = spaceBottom >= spaceTop ? 'bottom' : 'top';
      }
    } else {
      // Desktop: evaluate left / right / bottom / top
      if (spaceLeft >= popoverW + gap && tLeft > vw * 0.4) {
        placement = 'left';
      } else if (spaceRight >= popoverW + gap && tRight < vw * 0.6) {
        placement = 'right';
      } else if (spaceBottom >= popoverH + gap) {
        placement = 'bottom';
      } else if (spaceTop >= popoverH + gap) {
        placement = 'top';
      } else {
        const max = Math.max(spaceLeft, spaceRight, spaceBottom, spaceTop);
        if (max === spaceLeft) placement = 'left';
        else if (max === spaceRight) placement = 'right';
        else if (max === spaceBottom) placement = 'bottom';
        else placement = 'top';
      }
    }

    let top = 0;
    let left = 0;

    if (placement === 'bottom') {
      top = tBottom + gap;
      left = tCenterX - popoverW / 2;
    } else if (placement === 'top') {
      top = tTop - popoverH - gap;
      left = tCenterX - popoverW / 2;
    } else if (placement === 'left') {
      left = tLeft - popoverW - gap;
      top = tCenterY - popoverH / 2;
    } else if (placement === 'right') {
      left = tRight + gap;
      top = tCenterY - popoverH / 2;
    }

    // STRICT BOUNDARY CLAMPING: Zero overflow guaranteed
    const clampedLeft = Math.max(pad, Math.min(vw - popoverW - pad, left));
    const clampedTop = Math.max(pad, Math.min(vh - popoverH - pad, top));

    // Calculate cloud pointer arrow alignment to point directly at target center
    let arrowOffset = 24;
    if (placement === 'top' || placement === 'bottom') {
      arrowOffset = Math.max(20, Math.min(popoverW - 20, tCenterX - clampedLeft));
    } else {
      arrowOffset = Math.max(20, Math.min(popoverH - 20, tCenterY - clampedTop));
    }

    setCoords({
      top: clampedTop,
      left: clampedLeft,
      placement,
      arrowOffset
    });
    setIsPositionReady(true);
  }, [targetRect, isOnboardingOpen, pathname]);

  // High-Performance Layout Settling & rAF Scroll Tracking
  useEffect(() => {
    updatePosition();

    let isCancelled = false;
    let scrollRaf = null;

    const handleScroll = () => {
      if (scrollRaf === null) {
        scrollRaf = requestAnimationFrame(() => {
          updatePosition();
          scrollRaf = null;
        });
      }
    };

    // Buffer to let Next.js finish mounting page, tables and banners
    const settleTimer = setTimeout(() => {
      if (!isCancelled) {
        updatePosition();
      }
    }, 120);

    const backupTimer = setTimeout(() => {
      if (!isCancelled) {
        updatePosition();
      }
    }, 350);

    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });

    return () => {
      isCancelled = true;
      clearTimeout(settleTimer);
      clearTimeout(backupTimer);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [updatePosition, currentStepIndex, pathname, isChatOpen, isMinimized]);

  if (!isTourActive) return null;
  if (isPdfModalOpen) return null;
  if (!isOnboardingOpen && !currentStep) return null;
  // If target element has not been measured yet, keep hidden until settled
  if (!isOnboardingOpen && !targetRect) return null;

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputQuestion.trim() || isAsking) return;
    const q = inputQuestion.trim();
    setInputQuestion('');
    setIsAsking(true);
    await askQuestion(q);
    setIsAsking(false);
  };

  const handleChipClick = async (question) => {
    if (isAsking) return;
    setIsAsking(true);
    await askQuestion(question);
    setIsAsking(false);
  };

  const handleProfileSubmit = async (e) => {
    e?.preventDefault();
    if (!profileName.trim()) return;
    setIsSavingProfile(true);
    await saveVisitorProfile({
      name: profileName,
      company: profileCompany,
      location: profileLocation
    });
    setIsSavingProfile(false);
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  // ═══════════════════════════════════════════════════════════════
  // Onboarding Card (Centered or Anchored)
  // ═══════════════════════════════════════════════════════════════
  if (isOnboardingOpen) {
    return (
      <div 
        className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto"
        role="dialog"
        aria-modal="true"
      >
        <div 
          ref={popoverRef}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-[400px] overflow-hidden flex flex-col animate-slide-down text-slate-900 dark:text-slate-100"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Compass size={14} />
              </div>
              <span className="text-xs font-bold tracking-tight">
                Amin • StockFlow Guide
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                WELCOME
              </span>
            </div>

            <button
              type="button"
              onClick={skipTour}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-3.5 select-text">
            <div>
              <h4 className="text-sm font-bold leading-snug">
                Welcome to StockFlow WMS
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                I am <strong className="font-semibold text-slate-800 dark:text-slate-200">Amin</strong>, your implementation guide. StockFlow is 100% customizable for Qatar & UAE logistics: custom roles, unlimited staff accounts, and custom delivery slips. What is your name, company, and location?
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Your Name
                </label>
                <div className="relative flex items-center">
                  <User size={13} className="absolute left-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="e.g. Khalid Al-Mansoor"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Company / Warehouse
                </label>
                <div className="relative flex items-center">
                  <Building2 size={13} className="absolute left-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={profileCompany}
                    onChange={(e) => setProfileCompany(e.target.value)}
                    placeholder="e.g. Al Meera Logistics"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Location (City, Country)
                </label>
                <div className="relative flex items-center">
                  <MapPin size={13} className="absolute left-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={profileLocation}
                    onChange={(e) => setProfileLocation(e.target.value)}
                    placeholder="e.g. Doha, Qatar or Dubai, UAE"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSavingProfile || !profileName.trim()}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Personalizing Walkthrough...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Walkthrough with Amin</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={skipOnboarding}
                    className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors underline-offset-2 hover:underline"
                  >
                    Skip and explore as guest
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // Contextual Cloud Comment (Modern Linear/Stripe Callout)
  // ═══════════════════════════════════════════════════════════════
  return (
    <div
      ref={popoverRef}
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
      className={`fixed z-[95] w-[calc(100vw-24px)] sm:w-[330px] md:w-[350px] transition-[opacity,transform] duration-200 ease-out pointer-events-auto select-none ${
        isPositionReady ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-98 pointer-events-none'
      }`}
      role="region"
      aria-label="Interactive Tour Cloud Callout"
    >
      {/* Cloud Pointer Arrow Beak (Action Phase Only) */}
      {stepPhase === 'action' && targetRect && (
        <>
          {coords.placement === 'bottom' && (
            <div 
              className="absolute -top-1.5 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-800 rotate-45 z-20"
              style={{ left: `${coords.arrowOffset - 7}px` }}
            />
          )}
          {coords.placement === 'top' && (
            <div 
              className="absolute -bottom-1.5 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-b border-r border-slate-200 dark:border-slate-800 rotate-45 z-20"
              style={{ left: `${coords.arrowOffset - 7}px` }}
            />
          )}
          {coords.placement === 'right' && (
            <div 
              className="absolute -left-1.5 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-b border-l border-slate-200 dark:border-slate-800 rotate-45 z-20"
              style={{ top: `${coords.arrowOffset - 7}px` }}
            />
          )}
          {coords.placement === 'left' && (
            <div 
              className="absolute -right-1.5 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-t border-r border-slate-200 dark:border-slate-800 rotate-45 z-20"
              style={{ top: `${coords.arrowOffset - 7}px` }}
            />
          )}
        </>
      )}

      {/* Cloud Container: Unified Crisp Surface */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden flex flex-col relative z-10 text-slate-800 dark:text-slate-100">
        
        {/* Subtle, Clean Header */}
        <div className="px-3.5 py-2.5 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Compass size={12} />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              Amin Guide
            </span>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800/60 shrink-0">
              {`${currentStep?.stepNumber || '01'}/${steps.length < 10 ? '0' + steps.length : steps.length}`}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium border transition-colors flex items-center gap-1 ${
                isChatOpen 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
              title="Ask Amin questions"
            >
              <HelpCircle size={11} />
              <span>Ask Amin</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 size={11} /> : <Minimize2 size={11} />}
            </button>

            <button
              type="button"
              onClick={skipTour}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Close tour"
            >
              <X size={11} />
            </button>
          </div>
        </div>

        {/* Minimized Peek View */}
        {isMinimized ? (
          <div 
            className="px-3 py-2 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors" 
            onClick={() => setIsMinimized(false)}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="font-mono text-[10px] text-slate-400">{currentStep.stepNumber}.</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate text-xs">{currentStep.title}</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold shrink-0">
              Expand
            </span>
          </div>
        ) : isChatOpen ? (
          /* Q&A Assistant Chat Drawer */
          <div className="flex flex-col h-[260px] bg-white dark:bg-slate-900 select-text">
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[9px] font-mono text-slate-400 mb-0.5 px-1">
                    {msg.role === 'user' ? 'You' : 'Amin'}
                  </div>
                  <div
                    className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed text-[11px] ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white font-medium'
                        : 'bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] p-1">
                  <Loader2 size={12} className="animate-spin text-emerald-600" />
                  <span>Looking up answer...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="flex flex-wrap gap-1 max-h-12 overflow-y-auto">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleChipClick(q)}
                    disabled={isAsking}
                    className="text-left text-[9px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSend} className="p-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder="Ask Amin about this step..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                disabled={isAsking}
              />
              <button
                type="submit"
                disabled={!inputQuestion.trim() || isAsking}
                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        ) : (
          /* Main Cloud Card Content */
          <div className="p-3.5 flex flex-col gap-2.5 select-text">
            <div>
              <h4 className="text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
                {currentStep.title}
              </h4>
            </div>

            {/* Action Pill Callout */}
            {currentStep.actionRequired && (
              <div className="flex items-start gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <MousePointerClick size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-snug">
                  <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                    {currentStep.actionRequired}
                  </span>
                  <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">
                    {currentStep.actionInstruction}
                  </span>
                </div>
              </div>
            )}

            {/* Concise Value Explanation */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentStep.explanation}
            </p>

            {/* Subtle Contextual Note */}
            {currentStep.suggestion && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed pt-0.5">
                <Info size={12} className="text-slate-400 shrink-0 mt-0.5" />
                <span>{currentStep.suggestion}</span>
              </div>
            )}

            {/* Footer Navigation Bar */}
            <div className="pt-2.5 mt-0.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 select-none">
              <button
                type="button"
                onClick={skipTour}
                className="text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors font-medium"
              >
                Skip Tour
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow hover:shadow-md"
                  title="Next step"
                >
                  <span>{isLastStep ? 'Complete' : 'Next'}</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
