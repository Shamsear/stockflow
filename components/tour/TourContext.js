'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TOUR_STEPS = [
  {
    id: 'login',
    route: '/login',
    targetSelector: '[data-tour="login-submit-btn"]',
    stepNumber: '01',
    title: 'Live Demo Sandbox',
    pageOverviewTitle: 'Welcome to StockFlow WMS',
    pageOverview: 'StockFlow is a production-grade Warehouse Management System engineered for GCC logistics (Qatar & UAE). Everything is 100% customizable: unlimited staff accounts, custom roles, cold-storage bays, and bilingual delivery slips with your CR and Tax IDs.',
    pageFeatures: [
      'Unlimited users with granular role-based permissions',
      'Ambient racks, temperature-controlled cold rooms & staging bays',
      'Arabic / English bilingual delivery notes with official CR & Tax numbers'
    ],
    actionTitle: 'Enter Interactive Sandbox',
    actionRequired: 'Click [Enter Live Demo Dashboard]',
    actionInstruction: 'Click the green button to start your live sandbox session.',
    explanation: 'Your sandbox session comes pre-loaded with multi-brand inventory, hypermarket store accounts, and live dispatch logs.',
    nextRoute: '/dashboard'
  },
  {
    id: 'overview',
    route: '/dashboard',
    targetSelector: '[data-tour="nav-inbound"]',
    stepNumber: '02',
    title: 'Central Command Center',
    pageOverviewTitle: 'Central Command Center',
    pageOverview: 'Your warehouse nerve center: monitor multi-brand stock across dry storage and cold rooms in real time with quick KPI cards for products, active brands, and low-stock alerts.',
    pageFeatures: [
      'Real-time inventory valuation and carton balances',
      'Immediate low-stock and expiry warning banners',
      'Direct shortcuts to all daily warehouse operations'
    ],
    actionTitle: 'Navigate to Dock Receiving',
    actionRequired: 'Click [Inbound (Receive)] in sidebar',
    actionInstruction: 'Click Inbound highlighted in the sidebar to open dock container receiving.',
    explanation: 'Let us now record an incoming supplier container shipment at the receiving dock.',
    nextRoute: '/dashboard/inbound'
  },
  {
    id: 'inbound_list',
    route: '/dashboard/inbound',
    targetSelector: '[data-tour="inbound-new-btn"]',
    stepNumber: '03',
    title: 'Dock Container Receiving',
    pageOverviewTitle: 'Dock Container Receiving Module',
    pageOverview: 'This screen audits incoming supplier shipments and sea containers arriving at your warehouse docks. Clerks verify carton counts against purchase orders, record vehicle plates, and view past intake logs.',
    pageFeatures: [
      'Purchase order (PO) carton count verification',
      'Supplier delivery note and vehicle plate tracking',
      'Assign received stock to ambient racks or cold-storage bays'
    ],
    actionTitle: 'Open Inbound Intake Form',
    actionRequired: 'Click [+ New Inbound Receipt]',
    actionInstruction: 'Click the New Inbound button highlighted on the page to open the intake form.',
    explanation: 'Opening the intake form allows clerks to log container items, verify barcodes, and record batch expiry dates.',
    nextRoute: '/dashboard/inbound/new'
  },
  {
    id: 'inbound_new',
    route: '/dashboard/inbound/new',
    targetSelector: '[data-tour="nav-expiry"]',
    stepNumber: '04',
    title: 'Barcode & Expiry Intake',
    pageOverviewTitle: 'Barcode & Batch Expiry Capture Form',
    pageOverview: 'On this receiving form, clerks enter the supplier, PO number, and vehicle plate, then scan product barcodes. Expiry dates are recorded immediately for FEFO (First-Expired, First-Out) shelf-life compliance.',
    pageFeatures: [
      'Instant barcode scanning with Zebra, Honeywell, or smartphones',
      'Mandatory batch number and expiration date capture',
      'Automatic rack or cold-bay zone assignment'
    ],
    actionTitle: 'Review Shelf-Life Control',
    actionRequired: 'Click [Expiry Tracking] in sidebar',
    actionInstruction: 'Click Expiry Tracking highlighted in the sidebar to review shelf-life protection.',
    explanation: 'Next, see how StockFlow protects your business from costly hypermarket rejection penalties.',
    nextRoute: '/dashboard/expiry'
  },
  {
    id: 'fefo_expiry',
    route: '/dashboard/expiry',
    targetSelector: '[data-tour="nav-outbound"]',
    stepNumber: '05',
    title: 'FEFO Shelf-Life Intelligence',
    pageOverviewTitle: 'FEFO Expiry & Shelf-Life Protection',
    pageOverview: 'StockFlow automatically prioritizes older compliant stock for dispatch picking. Automated 90-day and 30-day warning tiers prevent retail rejection penalties from regional hypermarkets (Carrefour, Lulu, Al Meera).',
    pageFeatures: [
      'Automated 90-day and 30-day shelf-life warning tiers',
      'FEFO picking enforcement ensures oldest safe batches go first',
      'Protects against regional retailer return penalties'
    ],
    actionTitle: 'Open Outbound Picking',
    actionRequired: 'Click [Outbound (Dispatch)] in sidebar',
    actionInstruction: 'Click Outbound Dispatch highlighted in the sidebar to open retail picking.',
    explanation: 'Now let us pick stock and generate an official delivery slip for a hypermarket order.',
    nextRoute: '/dashboard/outbound'
  },
  {
    id: 'outbound_dispatch',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="tab-delivery_notes"]',
    stepNumber: '06',
    title: 'Store Picking & Delivery Slips',
    pageOverviewTitle: 'Store Picking & Outbound Dispatches',
    pageOverview: 'Manage stock allocations and store dispatches. Pickers retrieve the oldest compliant batches, assign delivery vehicles, and stage pallets for fleet drivers.',
    pageFeatures: [
      'Pick lists sorted automatically by oldest compliant batch',
      'Driver and vehicle plate assignment with WhatsApp alerts',
      'Grouped delivery notes for each retail store destination'
    ],
    actionTitle: 'View Grouped Delivery Notes',
    actionRequired: 'Click [Grouped Delivery Notes] tab',
    actionInstruction: 'Click the tab highlighted above the dispatch table.',
    explanation: 'Switch to Grouped Delivery Notes to access official store delivery slips.',
    nextRoute: '/dashboard/outbound?tab=delivery_notes'
  },
  {
    id: 'delivery_notes',
    route: '/dashboard/outbound?tab=delivery_notes',
    targetSelector: '[data-tour="dn-preview-btn"]',
    stepNumber: '07',
    title: 'Official Delivery Note PDF',
    pageOverviewTitle: 'Official Delivery Slips & Proof of Delivery',
    pageOverview: 'Every retail dispatch automatically generates an official Delivery Note PDF. Fleet drivers present these slips at hypermarket receiving bays for physical receiver sign-off and stamps.',
    pageFeatures: [
      'Commercial Registration (CR) and Tax ID (TIN) header',
      'Product batch numbers and expiration dates listed per line',
      'Dual signature lines for dispatch supervisor and store receiver'
    ],
    actionTitle: 'Preview Official Delivery Note',
    actionRequired: 'Click [View PDF] on delivery slip',
    actionInstruction: 'Click the View PDF button highlighted on the first dispatch record.',
    explanation: 'Click View PDF to inspect the exact document inside our embedded modal.',
    nextRoute: null
  },
  {
    id: 'pdf_modal',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="modal-continue-btn"]',
    stepNumber: '08',
    title: 'Proof of Delivery (POD) Preview',
    pageOverviewTitle: 'Official Proof of Delivery (POD)',
    pageOverview: 'Inspect your official delivery note: Commercial Registration (CR), Tax ID, destination store outlet, driver assignment, batch expiration dates, and dual signature lines.',
    pageFeatures: [
      'Full legal compliance for Qatar & UAE hypermarket receiving',
      'Complete batch and expiry traceability per item',
      'Signed physical copy serves as official proof of delivery'
    ],
    actionTitle: 'Continue to Client Returns',
    actionRequired: 'Click [Continue to Client Returns]',
    actionInstruction: 'Click the button in the bottom right of the modal to continue.',
    explanation: 'Next, see how store returns and damaged goods are isolated.',
    nextRoute: '/dashboard/client-returns'
  },
  {
    id: 'client_returns',
    route: '/dashboard/client-returns',
    targetSelector: '[data-tour="nav-reports"]',
    stepNumber: '09',
    title: 'Client Returns & Damage Quarantine',
    pageOverviewTitle: 'Client Returns & Damage Quarantine',
    pageOverview: 'Manage items returned from retail outlets or promoters. Restockable items return to active stock; damaged or expired goods are segregated into Damage Quarantine with photo records.',
    pageFeatures: [
      'Inspection workflow for store returns',
      'Damage Quarantine isolates unsellable stock from pickers',
      'Full audit trail and return gate pass documentation'
    ],
    actionTitle: 'Open Executive Reports',
    actionRequired: 'Click [Reports] in sidebar',
    actionInstruction: 'Click Reports highlighted in the sidebar to review executive stock analytics.',
    explanation: 'Finally, review executive multi-brand stock reconciliation.',
    nextRoute: '/dashboard/reports'
  },
  {
    id: 'reports_export',
    route: '/dashboard/reports',
    targetSelector: '[data-tour="reports-export-btns"]',
    stepNumber: '10',
    title: 'Executive Stock Reconciliation',
    pageOverviewTitle: 'Multi-Brand Stock Reconciliation & Exports',
    pageOverview: 'Real-time stock reconciliation segregated across five statuses: In Warehouse, Issued to Outlets, In Use by Staff, Damage Quarantine, and With Clients. Filter by brand or category and export formatted audit spreadsheets with one click.',
    pageFeatures: [
      'Real-time stock reconciliation segregated across 5 statuses',
      'Instant brand-owner and category filtering',
      '1-click formatted Excel and CSV audit exports'
    ],
    actionTitle: 'Download Live Multi-Brand Ledger',
    actionRequired: 'Click [Export to Excel]',
    actionInstruction: 'Click the Export button highlighted above to download the live multi-brand stock ledger.',
    explanation: 'Exporting formatted Excel spreadsheets completes your live tour walkthrough.',
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

  // 1. Initialize visitor session and restore tour state across page refreshes
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('stockflow_visitor_profile');
      if (savedProfile) {
        setVisitorProfile(JSON.parse(savedProfile));
      }

      const isDismissed = localStorage.getItem('stockflow_tour_dismissed') === 'true';
      const isCompleted = localStorage.getItem('stockflow_tour_completed') === 'true';
      const wasActive = localStorage.getItem('stockflow_tour_active') === 'true';
      const savedStep = localStorage.getItem('stockflow_tour_step_index');

      // If user was actively taking the tour and refreshed the page, resume seamlessly!
      if (wasActive && !isDismissed && !isCompleted) {
        setIsTourActive(true);
        let stepIdx = savedStep !== null ? parseInt(savedStep, 10) : 0;
        if (isNaN(stepIdx) || stepIdx < 0 || stepIdx >= TOUR_STEPS.length) {
          stepIdx = 0;
        }

        // Verify if current page route matches the saved step or another step
        const currentCleanPath = pathname.split('?')[0];
        const stepForRoute = TOUR_STEPS.findIndex(s => s.route && s.route.split('?')[0] === currentCleanPath);
        
        if (stepForRoute !== -1) {
          // If the page is on a valid step route, align with it
          setCurrentStepIndex(stepForRoute);
        } else {
          setCurrentStepIndex(stepIdx);
        }
      } else if (pathname === '/login') {
        // Welcome visitor on /login: start tour at Step 0
        setIsTourActive(true);
        setCurrentStepIndex(0);
        setStepPhase('overview');
        localStorage.setItem('stockflow_tour_active', 'true');
        localStorage.setItem('stockflow_tour_step_index', '0');
        localStorage.removeItem('stockflow_tour_dismissed');
        localStorage.removeItem('stockflow_tour_completed');
        if (!savedProfile || !JSON.parse(savedProfile)?.name) {
          setIsOnboardingOpen(true);
        }
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

  // Ensure tour starts reliably whenever visitor navigates to /login
  useEffect(() => {
    if (pathname === '/login') {
      setIsTourActive(true);
      setCurrentStepIndex(0);
      setIsMinimized(false);
      setIsPdfModalOpen(false);

      try {
        localStorage.removeItem('stockflow_tour_dismissed');
        localStorage.removeItem('stockflow_tour_completed');
        localStorage.setItem('stockflow_tour_active', 'true');
        localStorage.setItem('stockflow_tour_step_index', '0');

        const savedProfile = localStorage.getItem('stockflow_visitor_profile');
        if (!savedProfile || !JSON.parse(savedProfile)?.name) {
          setIsOnboardingOpen(true);
        } else {
          setIsOnboardingOpen(false);
        }
      } catch {}
    }
  }, [pathname]);

  // 2. Persist active tour state and step index to localStorage whenever they change
  useEffect(() => {
    try {
      if (isTourActive) {
        localStorage.setItem('stockflow_tour_active', 'true');
        localStorage.setItem('stockflow_tour_step_index', String(currentStepIndex));
      } else {
        localStorage.setItem('stockflow_tour_active', 'false');
      }
    } catch {}
  }, [isTourActive, currentStepIndex]);

  // 3. Keep step synced with route if user navigates manually
  useEffect(() => {
    if (!isTourActive || !currentStep) return;

    const currentCleanPath = pathname.split('?')[0];
    const stepCleanPath = currentStep.route ? currentStep.route.split('?')[0] : '';

    // If route changed and doesn't match current step, find if there is a matching step
    if (currentCleanPath !== stepCleanPath) {
      const matchingIdx = TOUR_STEPS.findIndex(s => s.route && s.route.split('?')[0] === currentCleanPath);
      if (matchingIdx !== -1) {
        setCurrentStepIndex(matchingIdx);
      }
    }
  }, [pathname, isTourActive, currentStep]);

  // 4. Measure target element bounding rect in pure viewport coordinates with stability detection
  const updateTargetRect = useCallback(() => {
    if (!isTourActive || isOnboardingOpen || !currentStep) {
      setTargetRect(null);
      return false;
    }

    // Special handling for Step 07: Ensure delivery notes tab is open
    if (currentStep.id === 'delivery_notes') {
      const dnBtn = document.querySelector('[data-tour="dn-preview-btn"]');
      if (!dnBtn) {
        const tabBtn = document.querySelector('[data-tour="tab-delivery_notes"]');
        if (tabBtn) {
          tabBtn.click();
        }
      }
    }

    // Special handling for Step 08: Ensure PDF modal is open
    if (currentStep.id === 'pdf_modal' && !isPdfModalOpen) {
      setIsPdfModalOpen(true);
    }

    const targetEl = document.querySelector(currentStep.targetSelector) ||
                     (currentStep.fallbackSelector ? document.querySelector(currentStep.fallbackSelector) : null);

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const style = window.getComputedStyle(targetEl);

      // Verify element is rendered, visible and has physical layout size
      const isVisible = rect.width > 0 &&
                        rect.height > 0 &&
                        style.display !== 'none' &&
                        style.visibility !== 'hidden' &&
                        parseFloat(style.opacity || '1') > 0.05;

      if (isVisible) {
        // Auto scroll into view if offscreen
        const isOffscreen = rect.top < 65 || rect.bottom > window.innerHeight - 30;
        if (isOffscreen && typeof targetEl.scrollIntoView === 'function') {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        const computedRadius = style.borderRadius || '12px';

        // PURE VIEWPORT COORDINATES: matches position: fixed with 1:1 pixel precision
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right,
          borderRadius: computedRadius
        });
        return true;
      }
    }

    setTargetRect(null);
    return false;
  }, [isTourActive, isOnboardingOpen, currentStep, isPdfModalOpen]);

  // Synchronize target measurement with route/step changes, layout stabilization and rAF scroll capture
  useEffect(() => {
    setTargetRect(null);

    // Layout Stability Engine: Wait for page DOM and tables to settle before locking coordinates
    let isCancelled = false;
    let stableCount = 0;
    let lastTop = -999;
    let lastLeft = -999;
    let checkRaf = null;

    const checkElementSettled = () => {
      if (isCancelled) return;

      const targetEl = document.querySelector(currentStep?.targetSelector);
      if (targetEl) {
        const r = targetEl.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          const deltaY = Math.abs(r.top - lastTop);
          const deltaX = Math.abs(r.left - lastLeft);

          if (deltaY < 0.5 && deltaX < 0.5) {
            stableCount++;
            if (stableCount >= 2) {
              updateTargetRect();
              return;
            }
          } else {
            stableCount = 0;
          }

          lastTop = r.top;
          lastLeft = r.left;
        }
      }
      checkRaf = requestAnimationFrame(checkElementSettled);
    };

    // Staggered checks after page mount
    const timer1 = setTimeout(() => {
      checkElementSettled();
    }, 180);

    const timer2 = setTimeout(() => {
      updateTargetRect();
    }, 350);

    // MutationObserver to catch element additions
    let observer = null;
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(() => {
        updateTargetRect();
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: false });
    }

    // HIGH-PERFORMANCE rAF SCROLL CAPTURE: Zero lag, zero scroll stutter
    let scrollRaf = null;
    const handleCapturedScroll = () => {
      if (scrollRaf === null) {
        scrollRaf = requestAnimationFrame(() => {
          updateTargetRect();
          scrollRaf = null;
        });
      }
    };

    window.addEventListener('scroll', handleCapturedScroll, { capture: true, passive: true });
    window.addEventListener('resize', handleCapturedScroll, { passive: true });

    return () => {
      isCancelled = true;
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (checkRaf) cancelAnimationFrame(checkRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      observer?.disconnect();
      window.removeEventListener('scroll', handleCapturedScroll, { capture: true });
      window.removeEventListener('resize', handleCapturedScroll);
    };
  }, [updateTargetRect, pathname, currentStepIndex, isPdfModalOpen, isTourActive, isOnboardingOpen]);

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
      localStorage.removeItem('stockflow_tour_dismissed');
      localStorage.removeItem('stockflow_tour_completed');
      localStorage.setItem('stockflow_tour_active', 'true');
      localStorage.setItem('stockflow_tour_step_index', String(startIndex));
    } catch {}

    setIsTourActive(true);
    setIsMinimized(false);
    setIsCompletedModalOpen(false);

    if (!visitorProfile?.name && pathname === '/login') {
      setIsOnboardingOpen(true);
      return;
    }

    setIsOnboardingOpen(false);
    setCurrentStepIndex(startIndex);
    const step = TOUR_STEPS[startIndex];
    if (step && pathname !== step.route.split('?')[0]) {
      router.push(step.route);
    }
    sendStepTelemetry(step?.id || 'tour', 'started');
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
      try {
        localStorage.setItem('stockflow_tour_completed', 'true');
        localStorage.setItem('stockflow_tour_active', 'false');
      } catch {}
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
      localStorage.setItem('stockflow_tour_dismissed', 'true');
      localStorage.setItem('stockflow_tour_active', 'false');
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
