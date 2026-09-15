'use client';

import { useState } from 'react';
import { Info, BookOpen, X, ChevronRight } from 'lucide-react';

export default function ModuleOrientationBanner({
  badge = 'Warehouse Workflow',
  title,
  description,
  tip,
  actionText,
  onAction,
  actionHref,
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const openGuide = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-demo-guide'));
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/[0.06] via-surface-elevated/40 to-transparent border border-primary/20 rounded-xl p-3.5 sm:p-4 text-xs relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in shadow-2xs">
      <div className="flex items-start gap-3 min-w-0 pr-6 sm:pr-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info size={16} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
              {badge}
            </span>
            <span className="font-bold text-text-primary text-xs sm:text-sm">
              {title}
            </span>
          </div>
          <p className="text-text-secondary text-[11px] sm:text-xs mt-1 leading-relaxed">
            {description}
          </p>
          {tip && (
            <p className="text-text-muted text-[11px] mt-1 italic">
              💡 <strong>Demo Tip:</strong> {tip}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
        <button
          type="button"
          onClick={openGuide}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border hover:bg-surface-elevated text-text-primary text-[11px] font-bold rounded-lg transition-colors"
        >
          <BookOpen size={13} className="text-primary" />
          <span>Full Playbook</span>
        </button>

        {actionText && actionHref && (
          <a
            href={actionHref}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold rounded-lg transition-colors shadow-2xs"
          >
            <span>{actionText}</span>
            <ChevronRight size={12} />
          </a>
        )}

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
