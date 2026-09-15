'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowDownLeft, 
  Clock, 
  ArrowUpRight, 
  FileText, 
  BookOpen, 
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  X
} from 'lucide-react';

export default function DashboardDemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const openGuide = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-demo-guide'));
    }
  };

  const steps = [
    {
      num: '1',
      title: 'Inbound Receiving',
      desc: 'Verify PO shipments, scan barcodes & assign bays',
      link: '/dashboard/inbound',
      icon: ArrowDownLeft,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      num: '2',
      title: 'FEFO Expiry Control',
      desc: 'Automated 90d / 30d shelf-life alerts for GCC retail',
      link: '/dashboard/expiry',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      num: '3',
      title: 'Outbound Dispatch',
      desc: 'Pick stock & generate official PDF Delivery Notes',
      link: '/dashboard/outbound',
      icon: ArrowUpRight,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      num: '4',
      title: 'Audit & Reports',
      desc: 'Multi-brand stock balances & 1-click Excel export',
      link: '/dashboard/reports',
      icon: FileText,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden animate-fade-in">
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
        title="Dismiss demo tour banner"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-6 sm:pr-8">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/25">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-display font-extrabold text-text-primary">
                Welcome to the StockFlow WMS Live Demo
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full uppercase tracking-wider shadow-xs">
                Interactive Walkthrough
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
              Experience end-to-end warehouse distribution tailored for Qatar & UAE logistics: PO receiving, FEFO shelf-life enforcement, bay allocations, and official driver Delivery Notes.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap flex-shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={openGuide}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <BookOpen size={15} />
            <span>How It Works (Guide)</span>
          </button>
          <a
            href="https://wa.me/97472360418?text=Hello%20StockFlow%20team,%20I%20am%20testing%20the%20live%20demo%20and%20would%20like%20to%20discuss%20custom%20setup%20for%20our%20warehouse."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-border hover:bg-surface-elevated text-text-primary text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200"
          >
            <MessageSquare size={14} className="text-[#25D366]" />
            <span>WhatsApp (+974 7236 0418)</span>
          </a>
        </div>
      </div>

      {/* 4 Interactive Steps Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-5 border-t border-primary/15">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <Link
              key={st.num}
              href={st.link}
              className="bg-surface/80 hover:bg-surface border border-border hover:border-primary/40 rounded-xl p-3.5 flex flex-col justify-between gap-2.5 transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${st.color}`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                    {st.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded">
                  0{st.num}
                </span>
              </div>
              <p className="text-[11px] text-text-secondary leading-normal">
                {st.desc}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                <span>Try this workflow</span>
                <ChevronRight size={12} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
