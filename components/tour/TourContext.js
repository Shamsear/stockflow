'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TOUR_STEPS = [
  {
    id: 'login',
    route: '/login',
    targetSelector: '[data-tour="login-submit-btn"]',
    fallbackSelector: 'button[type="submit"]',
    stepNumber: '01',
    title: 'Log In to Demo Sandbox',
    actionRequired: 'Click [Enter Live Demo Dashboard]',
    actionInstruction: 'Click the green button to start your interactive sandbox session.',
    explanation: 'StockFlow WMS is 100% customizable for GCC operations: unlimited users, custom access roles, cold-storage bays, and bilingual delivery slips with your CR and tax numbers.',
    suggestion: 'Production setups include single sign-on (SSO) and biometric entry tablet support.',
    nextRoute: '/dashboard'
  },
  {
    id: 'overview',
    route: '/dashboard',
    targetSelector: '[data-tour="nav-inbound"]',
    fallbackSelector: 'nav a[href="/dashboard/inbound"]',
    stepNumber: '02',
    title: 'Central Command Center',
    actionRequired: 'Click [Inbound (Receive)] in sidebar',
    actionInstruction: 'Click Inbound highlighted in the sidebar.',
    explanation: 'Monitor live multi-brand stock across dry storage and cold rooms in real time with quick KPI cards for products, brands, and low-stock alerts.',
    suggestion: 'Let us now record an incoming supplier container at dock receiving.',
    nextRoute: '/dashboard/inbound'
  },
  {
    id: 'inbound_list',
    route: '/dashboard/inbound',
    targetSelector: '[data-tour="inbound-new-btn"]',
    fallbackSelector: 'header a[href="/dashboard/inbound/new"]',
    stepNumber: '03',
    title: 'Dock Container Receiving',
    actionRequired: 'Click [+ New Inbound Receipt]',
    actionInstruction: 'Click the New Inbound button to open the receiving screen.',
    explanation: 'Incoming shipments from sea containers or local suppliers arrive here. Clerks verify cartons against POs, scan barcodes, and assign goods to racks or cold bays.',
    suggestion: 'Supports Zebra/Honeywell handhelds and instant QR smartphone pairing.',
    nextRoute: '/dashboard/inbound/new'
  },
  {
    id: 'inbound_new',
    route: '/dashboard/inbound/new',
    targetSelector: '[data-tour="nav-expiry"]',
    fallbackSelector: 'nav a[href="/dashboard/expiry"]',
    stepNumber: '04',
    title: 'Barcode & Batch Expiry Capture',
    actionRequired: 'Click [Expiry Tracking] in sidebar',
    actionInstruction: 'Click Expiry Tracking highlighted in the sidebar.',
    explanation: 'On this receiving form, clerks enter supplier, PO number, vehicle plate, and scan barcodes. Expiry dates are recorded immediately for FEFO compliance.',
    suggestion: 'Next, see how StockFlow protects you from retail rejection penalties.',
    nextRoute: '/dashboard/expiry'
  },
  {
    id: 'fefo_expiry',
    route: '/dashboard/expiry',
    targetSelector: '[data-tour="nav-outbound"]',
    fallbackSelector: 'nav a[href="/dashboard/outbound"]',
    stepNumber: '05',
    title: 'FEFO Shelf-Life Protection',
    actionRequired: 'Click [Outbound (Dispatch)] in sidebar',
    actionInstruction: 'Click Outbound Dispatch highlighted in the sidebar.',
    explanation: 'Automatically prioritizes older compliant stock. Regional hypermarkets (Carrefour, Lulu, Al Meera) reject items with under six months shelf life.',
    suggestion: 'Now let us pick and dispatch stock for a retail hypermarket order.',
    nextRoute: '/dashboard/outbound'
  },
  {
    id: 'outbound_dispatch',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="tab-delivery_notes"]',
    fallbackSelector: '[data-tour="delivery-notes-table"]',
    stepNumber: '06',
    title: 'Store Picking & Grouped Delivery Slips',
    actionRequired: 'Click [Grouped Delivery Notes] tab',
    actionInstruction: 'Click the tab highlighted above the dispatch table.',
    explanation: 'Pickers retrieve oldest compliant batches, assign delivery vehicles, and stage pallets for fleet drivers.',
    suggestion: 'Drivers receive automated dispatch alerts via SMS or WhatsApp upon staging.',
    nextRoute: '/dashboard/outbound?tab=delivery_notes'
  },
  {
    id: 'delivery_notes',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="dn-preview-btn"]',
    fallbackSelector: 'button[title="View PDF"]',
    stepNumber: '07',
    title: 'Official Delivery Note PDF',
    actionRequired: 'Click [View PDF] on delivery slip',
    actionInstruction: 'Click the View PDF button highlighted on the first dispatch record.',
    explanation: 'Every dispatch automatically produces an official Delivery Note PDF with store details, product batch numbers, and dual signature lines.',
    suggestion: 'Click View PDF to preview the exact document inside our modal.',
    nextRoute: null
  },
  {
    id: 'pdf_modal',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="modal-continue-btn"]',
    fallbackSelector: 'button',
    stepNumber: '08',
    title: 'Proof of Delivery (POD) Preview',
    actionRequired: 'Click [Continue to Client Returns]',
    actionInstruction: 'Click the button in the bottom right of the modal to continue.',
    explanation: 'Inspect your official delivery note: Commercial Registration (CR), Tax ID, destination store, driver assignment, and dual signature lines.',
    suggestion: 'Next, see how client returns and damaged items are isolated.',
    nextRoute: '/dashboard/client-returns'
  },
  {
    id: 'client_returns',
    route: '/dashboard/client-returns',
    targetSelector: '[data-tour="nav-reports"]',
    fallbackSelector: 'nav a[href="/dashboard/reports"]',
    stepNumber: '09',
    title: 'Client Returns & Damage Quarantine',
    actionRequired: 'Click [Reports] in sidebar',
    actionInstruction: 'Click Reports highlighted in the sidebar.',
    explanation: 'Inspect store returns: good items return to active stock; damaged or expired goods move to Damage Quarantine with photographic records.',
    suggestion: 'Finally, review executive stock reconciliation and brand reports.',
    nextRoute: '/dashboard/reports'
  },
  {
    id: 'reports_export',
    route: '/dashboard/reports',
    targetSelector: '[data-tour="reports-export-btns"]',
    fallbackSelector: 'button',
    stepNumber: '10',
    title: 'Multi-Brand Stock Reconciliation',
    actionRequired: 'Click [Export to Excel]',
    actionInstruction: 'Click the Export button to download the live multi-brand stock ledger.',
    explanation: 'Real-time stock reconciliation segregated across five statuses: In Warehouse, Issued, In Use, Damage Quarantine, and With Clients.',
    suggestion: 'Export formatted Excel spreadsheets with one click.',
    nextRoute: null
  }
];

const TourContext = createContext(null);

export function TourProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfModalData, setPdfModalData] = useState(null);
  const [targetRect, setTargetRect] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [visitorProfile, setVisitorProfile] = useState({ name: '', company: '', location: '' });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to StockFlow WMS. I am Amin, your warehouse guide. Feel free to ask any question about how this warehouse system works in plain words.'
    }
  ]);

  const currentStep = TOUR_STEPS[currentStepIndex] || null;

  // 1. Initialize visitor session and saved profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stockflow_visitor_profile');
      if (saved) {
        setVisitorProfile(JSON.parse(saved));
      }
    } catch {}

    fetch('/api/assistant/session', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data?.sessionId) {
          setSessionId(data.sessionId);
        }
      })
      .catch(() => {});
  }, []);

  // 2. Auto-start tour on /login for new visitors
  useEffect(() => {
    if (pathname === '/login') {
      try {
        const dismissed = sessionStorage.getItem('stockflow_tour_dismissed');
        if (!dismissed) {
          setIsTourActive(true);
          setCurrentStepIndex(0);
          const saved = localStorage.getItem('stockflow_visitor_profile');
          if (!saved || !JSON.parse(saved)?.name) {
            setIsOnboardingOpen(true);
          }
        }
      } catch {}
    }
  }, [pathname]);

  // 3. Keep step synced with route if user navigates manually
  useEffect(() => {
    if (!isTourActive || !currentStep) return;

    // If on /dashboard and currentStep is login, advance to overview
    if (pathname === '/dashboard' && currentStepIndex === 0) {
      setCurrentStepIndex(1);
    }
  }, [pathname, isTourActive, currentStepIndex, currentStep]);

  // 4. Measure target element bounding rect for spotlight
  const updateTargetRect = useCallback(() => {
    if (!isTourActive || isOnboardingOpen || !currentStep) {
      setTargetRect(null);
      return;
    }

    const targetEl = document.querySelector(currentStep.targetSelector) ||
                     document.querySelector(currentStep.fallbackSelector);

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const style = window.getComputedStyle(targetEl);
      const computedRadius = style.borderRadius || '12px';
      // Scroll into view if offscreen
      if (rect.top < 60 || rect.bottom > window.innerHeight) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTargetRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        borderRadius: computedRadius
      });
    } else {
      setTargetRect(null);
    }
  }, [isTourActive, isOnboardingOpen, currentStep]);

  useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect);
    const timer = setTimeout(updateTargetRect, 400);
    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
      clearTimeout(timer);
    };
  }, [updateTargetRect, pathname, currentStepIndex, isPdfModalOpen]);

  // 5. Telemetry helper
  const sendStepTelemetry = useCallback((stepKey, action, extras = {}) => {
    if (!sessionId) return;
    fetch('/api/assistant/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        stepKey,
        action,
        ...extras
      })
    }).catch(() => {});
  }, [sessionId]);

  // 6. Navigation actions
  const startTour = useCallback((startIndex = 0) => {
    try {
      sessionStorage.removeItem('stockflow_tour_dismissed');
    } catch {}

    setIsTourActive(true);
    setIsMinimized(false);
    setIsCompletedModalOpen(false);

    if (!visitorProfile?.name) {
      setIsOnboardingOpen(true);
      return;
    }

    setIsOnboardingOpen(false);
    setCurrentStepIndex(startIndex);
    const step = TOUR_STEPS[startIndex];
    if (step && pathname !== step.route.split('?')[0]) {
      router.push(step.route);
    }
    sendStepTelemetry(step.id, 'started');
  }, [visitorProfile?.name, pathname, router, sendStepTelemetry]);

  const saveVisitorProfile = useCallback(async (profile) => {
    const updated = {
      name: profile?.name?.trim() || '',
      company: profile?.company?.trim() || '',
      location: profile?.location?.trim() || ''
    };
    setVisitorProfile(updated);
    try {
      localStorage.setItem('stockflow_visitor_profile', JSON.stringify(updated));
    } catch {}

    setIsOnboardingOpen(false);

    if (sessionId) {
      fetch('/api/assistant/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          ...updated
        })
      }).catch(() => {});
    }

    const greeting = updated.name
      ? `Welcome ${updated.name}${updated.company ? ` from ${updated.company}` : ''}${updated.location ? ` in ${updated.location}` : ''}! I am Amin, your warehouse implementation guide. StockFlow is 100% customizable for your operations: custom roles, unlimited staff accounts, and custom bay numbering. Let us begin by logging in.`
      : `Welcome to StockFlow WMS. I am Amin, your warehouse guide. Let us begin by logging in.`;

    setChatMessages(prev => [
      ...prev,
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: greeting
      }
    ]);

    // If on login, focus on step 0, else step 1
    if (pathname === '/login') {
      setCurrentStepIndex(0);
      sendStepTelemetry(TOUR_STEPS[0].id, 'started', { profile: updated });
    } else {
      setCurrentStepIndex(1);
      sendStepTelemetry(TOUR_STEPS[1].id, 'started', { profile: updated });
    }
  }, [sessionId, pathname, sendStepTelemetry]);

  const skipOnboarding = useCallback(() => {
    setIsOnboardingOpen(false);
    if (pathname === '/login') {
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex(1);
    }
    sendStepTelemetry(TOUR_STEPS[currentStepIndex]?.id || 'onboarding', 'started', { skippedOnboarding: true });
  }, [pathname, currentStepIndex, sendStepTelemetry]);

  const nextStep = useCallback(() => {
    if (!currentStep) return;

    sendStepTelemetry(currentStep.id, 'completed');
    setCompletedSteps(prev => [...new Set([...prev, currentStep.id])]);

    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      const nextSt = TOUR_STEPS[nextIdx];
      setCurrentStepIndex(nextIdx);

      if (nextSt.route && pathname !== nextSt.route.split('?')[0]) {
        router.push(nextSt.route);
      }
    } else {
      // Tour finished
      setIsTourActive(false);
      setTargetRect(null);
      setIsCompletedModalOpen(true);
      sendStepTelemetry('all_steps', 'completed');
    }
  }, [currentStep, currentStepIndex, pathname, router, sendStepTelemetry]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      const prevSt = TOUR_STEPS[prevIdx];
      setCurrentStepIndex(prevIdx);

      if (prevSt.route && pathname !== prevSt.route.split('?')[0]) {
        router.push(prevSt.route);
      }
    }
  }, [currentStepIndex, pathname, router]);

  const skipTour = useCallback(() => {
    try {
      sessionStorage.setItem('stockflow_tour_dismissed', 'true');
    } catch {}

    if (currentStep) {
      sendStepTelemetry(currentStep.id, 'skipped');
    }
    setIsTourActive(false);
    setIsOnboardingOpen(false);
    setIsPdfModalOpen(false);
    setTargetRect(null);
  }, [currentStep, sendStepTelemetry]);

  // 7. PDF Modal actions
  const openPdfModal = useCallback((data) => {
    setPdfModalData(data || null);
    setIsPdfModalOpen(true);
    // If we're on step 6 (delivery notes), advance to step 7 (pdf modal)
    if (currentStep?.id === 'delivery_notes') {
      setCurrentStepIndex(7);
    }
  }, [currentStep]);

  const closePdfModal = useCallback(() => {
    setIsPdfModalOpen(false);
  }, []);

  // 8. Global Action-Click Interceptor
  useEffect(() => {
    if (!isTourActive || !currentStep || isOnboardingOpen) return;

    const handleGlobalClick = (e) => {
      // Don't intercept clicks inside the copilot widget itself
      if (e.target.closest('[role="region"]') && !e.target.closest('[data-tour]')) {
        return;
      }

      // Check if clicked element matches current target selector
      const target = currentStep.targetSelector 
        ? document.querySelector(currentStep.targetSelector) 
        : null;

      if (target && (target === e.target || target.contains(e.target))) {
        // Special case: delivery notes view PDF button opens modal and moves to step 7
        if (currentStep.id === 'delivery_notes') {
          setTimeout(() => {
            setIsPdfModalOpen(true);
            setCurrentStepIndex(7);
          }, 100);
          return;
        }

        // Special case: modal continue button closes modal and advances
        if (currentStep.id === 'pdf_modal') {
          setTimeout(() => {
            setIsPdfModalOpen(false);
            nextStep();
          }, 100);
          return;
        }

        // Standard step action advancement
        setTimeout(() => {
          nextStep();
        }, 150);
      }
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => {
      window.removeEventListener('click', handleGlobalClick, true);
    };
  }, [isTourActive, currentStep, isOnboardingOpen, nextStep]);

  // 9. Ask Question
  const askQuestion = useCallback(async (questionText) => {
    if (!questionText || !questionText.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user', content: questionText.trim() };
    setChatMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: questionText.trim(),
          sessionId,
          visitorProfile
        })
      });
      const data = await res.json();
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Our warehouse support team can help you directly via WhatsApp.',
        suggestions: data.suggestions || []
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'You can connect directly with our Qatar and UAE logistics team on WhatsApp at +974 7236 0418.'
        }
      ]);
    }
  }, [sessionId, visitorProfile]);

  // 10. Submit Satisfaction
  const submitSatisfaction = useCallback((rating, feedback = '', leadData = {}) => {
    sendStepTelemetry('satisfaction', 'completed', {
      rating,
      feedback,
      leadData: {
        ...leadData,
        name: leadData.name || visitorProfile.name,
        company: leadData.company || visitorProfile.company,
        location: leadData.location || visitorProfile.location
      }
    });
  }, [sendStepTelemetry, visitorProfile]);

  // 11. WhatsApp Click Telemetry
  const trackWhatsAppClick = useCallback((leadData = {}) => {
    sendStepTelemetry('whatsapp_lead', 'completed', {
      clickedWhatsApp: true,
      leadData: {
        ...leadData,
        name: leadData.name || visitorProfile.name,
        company: leadData.company || visitorProfile.company,
        location: leadData.location || visitorProfile.location
      }
    });
  }, [sendStepTelemetry, visitorProfile]);

  return (
    <TourContext.Provider
      value={{
        steps: TOUR_STEPS,
        currentStep,
        currentStepIndex,
        isTourActive,
        isMinimized,
        isChatOpen,
        isCompletedModalOpen,
        isPdfModalOpen,
        pdfModalData,
        targetRect,
        sessionId,
        completedSteps,
        visitorProfile,
        isOnboardingOpen,
        chatMessages,
        startTour,
        saveVisitorProfile,
        skipOnboarding,
        nextStep,
        prevStep,
        skipTour,
        openPdfModal,
        closePdfModal,
        setIsMinimized,
        setIsChatOpen,
        setIsCompletedModalOpen,
        setIsOnboardingOpen,
        setVisitorProfile,
        askQuestion,
        submitSatisfaction,
        trackWhatsAppClick
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    return {
      steps: [],
      currentStep: null,
      currentStepIndex: 0,
      isTourActive: false,
      startTour: () => {},
      openPdfModal: () => {}
    };
  }
  return context;
}
