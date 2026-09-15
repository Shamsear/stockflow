'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TOUR_STEPS = [
  {
    id: 'inbound',
    route: '/dashboard/inbound',
    targetSelector: '[data-tour="inbound-new-btn"]',
    fallbackSelector: 'header',
    stepNumber: '01',
    title: 'Dock Receiving and PO Verification',
    explanation: 'This is where incoming shipments from sea freight containers or local suppliers are recorded. Warehouse clerks verify received cartons against the purchase order, scan barcodes, record batch expiration dates, and assign goods to storage racks or cold bays.',
    suggestion: 'If your warehouse handles temperature-sensitive or frozen goods, we can enable automated cold-storage temperature logging for this receiving screen.',
    nextRoute: '/dashboard/expiry'
  },
  {
    id: 'fefo',
    route: '/dashboard/expiry',
    targetSelector: '[data-tour="fefo-status-cards"]',
    fallbackSelector: 'header',
    stepNumber: '02',
    title: 'FEFO Expiry Date and Shelf-Life Protection',
    explanation: 'First-Expired, First-Out ensures products with earlier expiration dates are picked before newer stock. The system highlights batches approaching their 90-day and 30-day thresholds to protect distributors from retail rejection and regional municipality penalties.',
    suggestion: 'We can configure custom minimum shelf-life rules per retail client (for example, requiring Carrefour or Lulu deliveries to have at least six months remaining).',
    nextRoute: '/dashboard/outbound'
  },
  {
    id: 'outbound',
    route: '/dashboard/outbound',
    targetSelector: '[data-tour="outbound-new-btn"]',
    fallbackSelector: 'header',
    stepNumber: '03',
    title: 'Outbound Order Picking and Dispatch',
    explanation: 'When retail hypermarkets or branches place stock orders, pickers retrieve items matching the oldest compliant batches. The system validates each barcode and records the assigned delivery vehicle and driver.',
    suggestion: 'Delivery drivers and fleet supervisors can be notified automatically via SMS or WhatsApp as soon as an order is staged at the dispatch bay.',
    nextRoute: '/dashboard/outbound?tab=delivery_notes'
  },
  {
    id: 'pdf',
    route: '/dashboard/outbound?tab=delivery_notes',
    targetSelector: '[data-tour="delivery-notes-table"]',
    fallbackSelector: 'header',
    stepNumber: '04',
    title: 'Official Delivery Notes and Driver Sign-Off',
    explanation: 'Every dispatch produces an official PDF Delivery Note. It contains your company header, destination branch, driver details, product list with lot numbers, and dedicated dual signature lines for proof of delivery.',
    suggestion: 'We customize your delivery slips with your official commercial registration (CR), tax identification numbers, and bilingual Arabic/English terms.',
    nextRoute: '/dashboard/reports'
  },
  {
    id: 'reports',
    route: '/dashboard/reports',
    targetSelector: '[data-tour="reports-export-btns"]',
    fallbackSelector: 'header',
    stepNumber: '05',
    title: 'Multi-Brand Stock Ledger and Reconciliation',
    explanation: 'This central screen provides clear visibility into total stock segregated by status: In Warehouse, Issued, In Use, Damage Quarantine, and With Clients. Filter by brand or category and export clean Excel spreadsheets with one click.',
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
  const [targetRect, setTargetRect] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to StockFlow WMS. I am your guide. Feel free to ask any question about how this warehouse system works in plain words.'
    }
  ]);

  const currentStep = TOUR_STEPS[currentStepIndex] || null;

  // 1. Initialize visitor session on mount
  useEffect(() => {
    fetch('/api/assistant/session', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data?.sessionId) {
          setSessionId(data.sessionId);
        }
      })
      .catch(() => {});
  }, []);

  // 2. Measure target element bounding rect for spotlight
  const updateTargetRect = useCallback(() => {
    if (!isTourActive || !currentStep) {
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
  }, [isTourActive, currentStep]);

  useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect);
    const timer = setTimeout(updateTargetRect, 400); // Allow route transition render
    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
      clearTimeout(timer);
    };
  }, [updateTargetRect, pathname, currentStepIndex]);

  // 3. Telemetry helper
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

  // 4. Navigation actions
  const startTour = useCallback((startIndex = 0) => {
    setCurrentStepIndex(startIndex);
    setIsTourActive(true);
    setIsMinimized(false);
    setIsCompletedModalOpen(false);

    const step = TOUR_STEPS[startIndex];
    if (step && pathname !== step.route.split('?')[0]) {
      router.push(step.route);
    }
    sendStepTelemetry(step.id, 'started');
  }, [pathname, router, sendStepTelemetry]);

  const nextStep = useCallback(() => {
    if (!currentStep) return;

    // Record step completion
    sendStepTelemetry(currentStep.id, 'completed');
    setCompletedSteps(prev => [...new Set([...prev, currentStep.id])]);

    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      const nextSt = TOUR_STEPS[nextIdx];
      setCurrentStepIndex(nextIdx);

      if (pathname !== nextSt.route.split('?')[0]) {
        router.push(nextSt.route);
      }
    } else {
      // Tour completed!
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

      if (pathname !== prevSt.route.split('?')[0]) {
        router.push(prevSt.route);
      }
    }
  }, [currentStepIndex, pathname, router]);

  const skipTour = useCallback(() => {
    if (currentStep) {
      sendStepTelemetry(currentStep.id, 'skipped');
    }
    setIsTourActive(false);
    setTargetRect(null);
  }, [currentStep, sendStepTelemetry]);

  // 5. Ask Question
  const askQuestion = useCallback(async (questionText) => {
    if (!questionText || !questionText.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user', content: questionText.trim() };
    setChatMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: questionText.trim(), sessionId })
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
  }, [sessionId]);

  // 6. Submit Satisfaction
  const submitSatisfaction = useCallback((rating, feedback = '', leadData = {}) => {
    sendStepTelemetry('satisfaction', 'completed', {
      rating,
      feedback,
      leadData
    });
  }, [sendStepTelemetry]);

  // 7. WhatsApp Click Telemetry
  const trackWhatsAppClick = useCallback((leadData = {}) => {
    sendStepTelemetry('whatsapp_lead', 'completed', {
      clickedWhatsApp: true,
      leadData
    });
  }, [sendStepTelemetry]);

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
        targetRect,
        sessionId,
        completedSteps,
        chatMessages,
        startTour,
        nextStep,
        prevStep,
        skipTour,
        setIsMinimized,
        setIsChatOpen,
        setIsCompletedModalOpen,
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
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
