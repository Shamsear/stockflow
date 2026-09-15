'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './Toast';
import { TourProvider } from './tour/TourContext';
import InteractiveTourOverlay from './tour/InteractiveTourOverlay';
import AICopilotWidget from './tour/AICopilotWidget';
import DeliveryNotePreviewModal from './tour/DeliveryNotePreviewModal';
import TourEndModal from './tour/TourEndModal';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <TourProvider>
          {children}
          <InteractiveTourOverlay />
          <AICopilotWidget />
          <DeliveryNotePreviewModal />
          <TourEndModal />
        </TourProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
