'use client';

import React, { useEffect } from 'react';
import { useTour } from './TourContext';
import { FileText, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DeliveryNotePreviewModal() {
  const { isPdfModalOpen, closePdfModal, continueFromPdfModal, currentStep } = useTour();

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isPdfModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePdfModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPdfModalOpen, closePdfModal]);

  if (!isPdfModalOpen) return null;

  const handleContinue = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (continueFromPdfModal) {
      continueFromPdfModal();
    } else {
      closePdfModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePdfModal();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Delivery Note Preview"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-surface border border-border rounded-2xl w-full max-w-[640px] max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-surface-elevated/40 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-primary">
                  Official Delivery Note & Proof of Delivery (POD)
                </span>
                <span className="text-[10px] font-mono text-text-muted">
                  DN-2026-0841
                </span>
              </div>
              <div className="text-[11px] text-text-secondary">
                Auto-generated upon outbound order picking and bay staging
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={closePdfModal}
            className="p-1.5 rounded-lg border border-border text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
            aria-label="Close preview"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable Document Paper Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/60 dark:bg-slate-900/40">
          <div className="bg-white dark:bg-surface border border-border/80 shadow-md rounded-xl p-5 sm:p-7 text-slate-800 dark:text-text-primary text-xs flex flex-col gap-5">
            
            {/* Document Header */}
            <div className="border-b border-slate-200 dark:border-border pb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-text-primary font-display uppercase">
                  STOCKFLOW LOGISTICS WMS
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-text-secondary mt-0.5 font-mono">
                  CR No: 1048291 • Tax Identification (TIN): 30049281900003
                </p>
                <p className="text-[11px] text-slate-500 dark:text-text-secondary font-mono">
                  Qatar Logistics Park & Dubai JAFZA Central Distribution
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                  OFFICIAL DISPATCH
                </span>
                <p className="text-xs font-mono font-bold mt-1 text-slate-800 dark:text-text-primary">
                  DN-2026-0841
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Date: 15 Sep 2026
                </p>
              </div>
            </div>

            {/* Destination & Driver Dispatch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-surface-elevated/40 border border-slate-200 dark:border-border text-[11px]">
              <div>
                <span className="font-mono uppercase text-slate-400 text-[10px] block">Destination Retail Store</span>
                <strong className="text-slate-800 dark:text-text-primary text-xs">Carrefour Hypermarket — City Center Doha</strong>
                <p className="text-slate-500 dark:text-text-secondary mt-0.5">Commercial Bay 03, Delivery Gate 02</p>
              </div>
              <div>
                <span className="font-mono uppercase text-slate-400 text-[10px] block">Assigned Delivery Vehicle & Driver</span>
                <strong className="text-slate-800 dark:text-text-primary text-xs">Tariq Mahmoud (ID: SF-DRV-08)</strong>
                <p className="text-slate-500 dark:text-text-secondary mt-0.5">Refrigerated Van • Plate QA-49201</p>
              </div>
            </div>

            {/* Product & Batch Table */}
            <div className="border border-slate-200 dark:border-border rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 dark:bg-surface-elevated/70 border-b border-slate-200 dark:border-border font-mono text-[10px] text-slate-500 dark:text-text-muted uppercase">
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">Batch / Lot</th>
                    <th className="p-2.5">FEFO Expiry</th>
                    <th className="p-2.5 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-border font-medium">
                  <tr>
                    <td className="p-2.5">Fresh Milk Full Cream 1L (Almarai)</td>
                    <td className="p-2.5 font-mono text-slate-500">LOT-2026-B94</td>
                    <td className="p-2.5 font-mono text-emerald-600">28 Oct 2026</td>
                    <td className="p-2.5 font-mono text-right font-bold">240 Units</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Greek Yogurt Strawberry 150g (Baladna)</td>
                    <td className="p-2.5 font-mono text-slate-500">LOT-2026-Y12</td>
                    <td className="p-2.5 font-mono text-emerald-600">15 Nov 2026</td>
                    <td className="p-2.5 font-mono text-right font-bold">120 Units</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Cheddar Cheese Block 200g (Puck)</td>
                    <td className="p-2.5 font-mono text-slate-500">LOT-2026-C08</td>
                    <td className="p-2.5 font-mono text-emerald-600">14 Jan 2027</td>
                    <td className="p-2.5 font-mono text-right font-bold">80 Units</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dual Proof of Delivery (POD) Signature Lines */}
            <div className="border-t border-slate-200 dark:border-border pt-3 grid grid-cols-2 gap-4">
              <div className="p-3 border border-dashed border-slate-300 dark:border-border rounded-lg text-center flex flex-col justify-between h-24">
                <span className="text-[10px] uppercase font-mono text-slate-400">Warehouse Supervisor Sign-Off</span>
                <div className="font-mono text-xs text-slate-400 italic">Signed electronically at dock</div>
                <span className="text-[10px] font-semibold text-slate-600 dark:text-text-secondary">StockFlow Dispatch Bay</span>
              </div>
              <div className="p-3 border border-dashed border-slate-300 dark:border-border rounded-lg text-center flex flex-col justify-between h-24">
                <span className="text-[10px] uppercase font-mono text-slate-400">Store Receiver Signature & Stamp</span>
                <div className="font-mono text-xs text-slate-400 italic">Physical / Digital Sign on Delivery</div>
                <span className="text-[10px] font-semibold text-slate-600 dark:text-text-secondary">Carrefour Receiving Officer</span>
              </div>
            </div>

            {/* Customization Notice */}
            <div className="p-2.5 rounded-lg bg-primary/[0.04] border border-primary/20 text-[11px] text-text-secondary flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary shrink-0" />
              <span>Bilingual Arabic and English terms, custom logos, CR numbers, and footer terms are configured for your specific company setup.</span>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="px-5 py-3 bg-surface-elevated/40 border-t border-border flex items-center justify-between gap-3">
          <div className="text-[11px] text-text-muted hidden sm:block font-mono">
            {currentStep?.stepNumber ? `STEP ${currentStep.stepNumber}` : 'STEP 08'}: PROOF OF DELIVERY VERIFICATION
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={closePdfModal}
              className="px-3 py-1.5 border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary rounded-lg text-xs font-semibold transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              data-tour="modal-continue-btn"
              onClick={handleContinue}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              <span>Continue to Client Returns</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
