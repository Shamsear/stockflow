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
    title: 'Customizable Setup & Secure Live Demo Login',
    actionRequired: 'Click [Enter Live Demo Dashboard]',
    actionInstruction: 'Click the green button below to enter your live sandbox.',
    explanation: 'StockFlow WMS is 100% customizable for GCC logistics. Everything can be tailored to your operations: unlimited users, custom access roles (clerks, pickers, drivers, brand supervisors), customizable bay/rack numbering (dry, chilled, frozen), and bilingual delivery notes with your CR and tax numbers.',
    suggestion: 'In live production, we can integrate with your single sign-on (SSO) or biometric warehouse entry tablets.',
    nextRoute: '/dashboard'
  },
  {
    id: 'overview',
    route: '/dashboard',
    targetSelector: '[data-tour="nav-inbound"]',
    fallbackSelector: 'nav a[href="/dashboard/inbound"]',
    stepNumber: '02',
    title: 'Central Command Center & Real-Time Metrics',
    actionRequired: 'Click [Inbound (Receive)] in the sidebar',
    actionInstruction: 'Click the Inbound link highlighted in the sidebar.',
    explanation: 'This is your central command center. StockFlow segregates multi-brand inventory in real time across dry storage, cold rooms, and client consignments. You can monitor quick metric cards: Total Products, Active Brands, Store Outlets, and Low Stock Alerts.',
    suggestion: 'Let us now record an incoming supplier shipment or container at dock receiving.',
    nextRoute: '/dashboard/inbound'
  },
  {
    id: 'inbound_list',
    route: '/dashboard/inbound',
    targetSelector: '[data-tour="inbound-new-btn"]',
    fallbackSelector: 'header a[href="/dashboard/inbound/new"]',
    stepNumber: '03',
    title: 'Dock Container Receiving & PO Verification',
    actionRequired: 'Click [+ New Inbound Receipt]',
    actionInstruction: 'Click the New Inbound button to open the receiving screen.',
    explanation: 'Incoming shipments from sea containers or local suppliers arrive here. Clerks verify received cartons against Purchase Orders, scan barcodes, record batch expiration dates, and assign goods to storage racks or cold bays.',
    suggestion: 'Notice the camera barcode scanner option: warehouse staff can scan directly using any smartphone or Zebra terminal.',
    nextRoute: '/dashboard/inbound/new'
  },
  {
    id: 'inbound_new',
    route: '/dashboard/inbound/new',
    targetSelector: '[data-tour="nav-expiry"]',
    fallbackSelector: 'nav a[href="/dashboard/expiry"]',
    stepNumber: '04',
    title: 'Staging, Barcode Scanning & Expiry Logging',
    actionRequired: 'Click [Expiry Tracking] in the sidebar',
    actionInstruction: 'Click Expiry Tracking highlighted in the sidebar.',
    explanation: 'On this receiving form, clerks enter the supplier, PO number, vehicle plate, and scan carton barcodes. The system logs batch manufacturing and expiry dates immediately to enforce First-Expired, First-Out (FEFO) rules.',
    suggestion: 'Now let us inspect how StockFlow protects distributors from shelf-life penalties and retail rejection.',
    nextRoute: '/dashboard/expiry'
  },
  {
    id: 'fefo_expiry',
    route: '/dashboard/expiry',
    targetSelector: '[data-tour="nav-outbound"]',
    fallbackSelector: 'nav a[href="/dashboard/outbound"]',
    stepNumber: '05',
    title: 'FEFO Expiry Date & Shelf-Life Protection',
    actionRequired: 'Click [Outbound (Dispatch)] in the sidebar',
    actionInstruction: 'Click Outbound Dispatch highlighted in the sidebar.',
    explanation: 'First-Expired, First-Out automatically ensures older compliant batches are picked first. In Qatar and the UAE, retail hypermarkets like Carrefour, Lulu, and Al Meera reject goods with under six months shelf life. StockFlow flags approaching batches with color-coded risk alerts and locks expired items.',
    suggestion: 'Now let us fulfill a retail store order and dispatch goods with an official delivery note.',
    nextRoute: '/dashboard/outbound'
  },
  {
    id: 'outbound_dispatch',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="tab-delivery_notes"]',
    fallbackSelector: '[data-tour="delivery-notes-table"]',
    stepNumber: '06',
    title: 'Store Picking & Grouped Delivery Notes',
    actionRequired: 'Click the [Grouped Delivery Notes] tab',
    actionInstruction: 'Click the Grouped Delivery Notes tab above the table.',
    explanation: 'When retail stores order stock, pickers retrieve items matching the oldest compliant FEFO batches. Every dispatch logs the delivery vehicle, driver, and destination outlet. Let us switch to the Grouped Delivery Notes tab to inspect official dispatch slips.',
    suggestion: 'Delivery drivers and fleet supervisors can also be notified automatically via SMS or WhatsApp as soon as an order is staged.',
    nextRoute: '/dashboard/outbound?tab=delivery_notes'
  },
  {
    id: 'delivery_notes',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="dn-preview-btn"]',
    fallbackSelector: 'button[title="View PDF"]',
    stepNumber: '07',
    title: 'Official Delivery Note PDF Inspection',
    actionRequired: 'Click [View PDF] on the delivery note',
    actionInstruction: 'Click the View PDF button highlighted on the first dispatch record.',
    explanation: 'Every dispatch produces an official PDF Delivery Note. It contains your company header, destination branch, driver details, product list with lot numbers, and dedicated dual signature lines for proof of delivery.',
    suggestion: 'Click View PDF now to preview the exact document inside our interactive dialog.',
    nextRoute: null
  },
  {
    id: 'pdf_modal',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="modal-continue-btn"]',
    fallbackSelector: 'button',
    stepNumber: '08',
    title: 'Delivery Note Preview & Proof of Delivery (POD)',
    actionRequired: 'Inspect the document & click [Continue to Client Returns]',
    actionInstruction: 'Click the button in the bottom right of the modal to continue.',
    explanation: 'Here is your official Delivery Note: Commercial Registration (CR), Tax ID, destination store, driver assignment, batch expiration dates, and dual signature lines. Store managers sign this slip upon receiving.',
    suggestion: 'Now let us look at how store returns and damaged stock are isolated from good inventory.',
    nextRoute: '/dashboard/client-returns'
  },
  {
    id: 'client_returns',
    route: '/dashboard/client-returns',
    targetSelector: '[data-tour="nav-reports"]',
    fallbackSelector: 'nav a[href="/dashboard/reports"]',
    stepNumber: '09',
    title: 'Client Returns & Damage Quarantine',
    actionRequired: 'Click [Reports] in the sidebar',
    actionInstruction: 'Click Reports highlighted in the sidebar.',
    explanation: 'When retail outlets return unsold or damaged items, warehouse supervisors inspect them here. Good items return to active stock; damaged or expired goods are segregated into Damage Quarantine with photo evidence. The system generates an official Return Gate Pass for the driver.',
    suggestion: 'Finally, let us review executive inventory reconciliation and multi-brand reporting.',
    nextRoute: '/dashboard/reports'
  },
  {
    id: 'reports_export',
    route: '/dashboard/reports',
    targetSelector: '[data-tour="reports-export-btns"]',
    fallbackSelector: 'button',
    stepNumber: '10',
    title: 'Multi-Brand Stock Ledger & Excel Export',
    actionRequired: 'Click [Export to Excel]',
    actionInstruction: 'Click the Export button to download the live multi-brand stock ledger.',
    explanation: 'This central ledger provides real-time stock reconciliation segregated across five statuses: In Warehouse, Issued to Outlets, In Use, Damage Quarantine, and With Clients. Filter by brand or category and export clean Excel spreadsheets with one click.',
    suggestion: 'StockFlow can be configured to automatically email daily stock reconciliation spreadsheets to brand principals every morning.',
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
      // Scroll into view if offscreen
      if (rect.top < 60 || rect.bottom > window.innerHeight) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTargetRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
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
