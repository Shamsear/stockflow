'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  MousePointerClick
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'How does FEFO expiry work?',
  'Can I customize the PDF delivery note?',
  'Can we connect barcode scanners?',
  'Can we track stock by client branch?'
];

export default function AICopilotWidget() {
  const {
    steps,
    currentStep,
    currentStepIndex,
    isTourActive,
    isMinimized,
    isChatOpen,
    chatMessages,
    visitorProfile,
    isOnboardingOpen,
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
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (visitorProfile?.name) setProfileName(visitorProfile.name);
    if (visitorProfile?.company) setProfileCompany(visitorProfile.company);
    if (visitorProfile?.location) setProfileLocation(visitorProfile.location);
  }, [visitorProfile]);

  useEffect(() => {
    if (isChatOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  if (!isTourActive) return null;
  if (!isOnboardingOpen && !currentStep) return null;

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

  return (
    <div 
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[95] w-[calc(100vw-24px)] sm:w-[420px] max-w-[440px] transition-all duration-300 pointer-events-auto select-none"
      role="region"
      aria-label="Interactive Tour Guide"
    >
      <div className="bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md flex flex-col">
        {/* Header Bar */}
        <div className="px-4 py-3 bg-surface-elevated/40 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Compass size={15} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-primary">
                  Amin • StockFlow Guide
                </span>
                <span className="text-[11px] font-mono text-text-muted">
                  {isOnboardingOpen ? 'START' : `STEP ${currentStep?.stepNumber || '01'} / ${steps.length < 10 ? '0' + steps.length : steps.length}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {!isOnboardingOpen && (
              <>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                    isChatOpen 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                  title={isChatOpen ? 'Return to step details' : 'Ask Amin questions about this step'}
                  aria-label="Toggle assistant questions"
                >
                  <HelpCircle size={14} />
                  <span className="text-[11px] font-medium hidden sm:inline">Ask Amin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                  title={isMinimized ? 'Expand tour card' : 'Minimize tour card'}
                  aria-label="Minimize"
                >
                  {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={skipTour}
              className="p-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              title="Close tour"
              aria-label="Close tour"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {isOnboardingOpen ? (
          /* Onboarding Form */
          <div className="p-4 sm:p-5 flex flex-col gap-4 bg-surface select-text">
            <div>
              <h4 className="text-sm font-display font-bold text-text-primary leading-snug">
                Welcome to StockFlow WMS
              </h4>
              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                I am <strong className="text-text-primary font-semibold">Amin</strong>, your warehouse implementation guide. StockFlow is 100% customizable for Qatar & UAE logistics operations: custom roles, unlimited users, and custom delivery slips. To tailor this walkthrough, what is your name, company name, and location?
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider font-mono">
                  Your Name
                </label>
                <div className="relative flex items-center">
                  <User size={14} className="absolute left-3 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="e.g. Khalid Al-Mansoor"
                    className="w-full bg-surface-elevated/50 border border-border rounded-lg pl-9 pr-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider font-mono">
                  Company / Warehouse
                </label>
                <div className="relative flex items-center">
                  <Building2 size={14} className="absolute left-3 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    value={profileCompany}
                    onChange={(e) => setProfileCompany(e.target.value)}
                    placeholder="e.g. Al Meera Logistics"
                    className="w-full bg-surface-elevated/50 border border-border rounded-lg pl-9 pr-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider font-mono">
                  Location (City, Country)
                </label>
                <div className="relative flex items-center">
                  <MapPin size={14} className="absolute left-3 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    value={profileLocation}
                    onChange={(e) => setProfileLocation(e.target.value)}
                    placeholder="e.g. Doha, Qatar or Dubai, UAE"
                    className="w-full bg-surface-elevated/50 border border-border rounded-lg pl-9 pr-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSavingProfile || !profileName.trim()}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
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
                    className="text-[11px] text-text-muted hover:text-text-primary transition-colors underline-offset-2 hover:underline"
                  >
                    Skip and explore as guest
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : isMinimized ? (
          <div className="px-4 py-2.5 flex items-center justify-between text-xs bg-surface cursor-pointer" onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="font-mono text-[11px] text-text-muted">{currentStep.stepNumber}.</span>
              <span className="font-medium text-text-primary truncate">{currentStep.title}</span>
            </div>
            <span className="text-[11px] text-primary hover:underline font-semibold flex-shrink-0">
              Expand
            </span>
          </div>
        ) : isChatOpen ? (
          /* Q&A Assistant Chat Drawer */
          <div className="flex flex-col h-[380px] bg-surface select-text">
            {/* Chat Messages Log */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] font-medium text-text-muted mb-1 px-1">
                    {msg.role === 'user' ? 'You' : 'Amin (StockFlow Guide)'}
                  </div>
                  <div
                    className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white font-medium'
                        : 'bg-surface-elevated/70 border border-border text-text-primary'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="flex items-center gap-2 text-text-muted text-xs p-2">
                  <Loader2 size={14} className="animate-spin text-primary" />
                  <span>Looking up answer...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-border/60 bg-surface-elevated/20">
              <div className="text-[10px] text-text-muted font-medium mb-1.5">Common Questions:</div>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleChipClick(q)}
                    disabled={isAsking}
                    className="text-left text-[11px] px-2.5 py-1 rounded-md border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-border flex items-center gap-2 bg-surface">
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder="Ask Amin about this feature in plain English..."
                className="flex-1 bg-surface-elevated/50 border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                disabled={isAsking}
              />
              <button
                type="submit"
                disabled={!inputQuestion.trim() || isAsking}
                className="p-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        ) : (
          /* Main Step Card */
          <div className="p-4 sm:p-5 flex flex-col gap-3.5 bg-surface select-text">
            {/* Step Title */}
            <div>
              <h4 className="text-sm sm:text-base font-display font-bold text-text-primary leading-snug">
                {currentStep.title}
              </h4>
            </div>

            {/* Action Directive Box */}
            {currentStep.actionRequired && (
              <div className="p-3 rounded-xl border border-primary/30 bg-primary/[0.05] flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-primary text-[10px] font-mono uppercase tracking-wider font-bold">
                  <MousePointerClick size={12} />
                  <span>Action Required</span>
                </div>
                <div className="text-xs font-semibold text-text-primary">
                  {currentStep.actionRequired}
                </div>
                <div className="text-[11px] text-text-secondary">
                  {currentStep.actionInstruction}
                </div>
              </div>
            )}

            {/* Plain-English Explanation */}
            <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
              {currentStep.explanation}
            </p>

            {/* Contextual Suggestion Note */}
            {currentStep.suggestion && (
              <div className="p-3 rounded-xl border border-primary/20 bg-primary/[0.04] text-xs flex items-start gap-2.5">
                <Info size={15} className="text-primary shrink-0 mt-0.5" />
                <div className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                  <span className="font-semibold text-text-primary">Tailoring note: </span>
                  {currentStep.suggestion}
                </div>
              </div>
            )}

            {/* Footer Navigation Bar */}
            <div className="pt-2 border-t border-border flex items-center justify-between gap-2 select-none">
              <button
                type="button"
                onClick={skipTour}
                className="text-xs text-text-muted hover:text-text-primary transition-colors px-2 py-1"
              >
                Skip Tour
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={13} />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  title="Advance to next step"
                >
                  <span>{isLastStep ? 'Complete Walkthrough' : 'Next Step'}</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
