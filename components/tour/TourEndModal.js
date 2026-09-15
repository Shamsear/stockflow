'use client';

import React, { useState, useEffect } from 'react';
import { useTour } from './TourContext';
import { CheckCircle2, Star, MessageSquare, X, Send, ArrowRight } from 'lucide-react';

export default function TourEndModal() {
  const { 
    isCompletedModalOpen, 
    setIsCompletedModalOpen, 
    submitSatisfaction, 
    trackWhatsAppClick,
    visitorProfile
  } = useTour();

  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visitorName, setVisitorName] = useState(visitorProfile?.name || '');
  const [visitorCompany, setVisitorCompany] = useState(visitorProfile?.company || '');

  useEffect(() => {
    if (visitorProfile?.name) setVisitorName(visitorProfile.name);
    if (visitorProfile?.company) setVisitorCompany(visitorProfile.company);
  }, [visitorProfile]);

  if (!isCompletedModalOpen) return null;

  const handleSubmitRating = (e) => {
    e?.preventDefault();
    submitSatisfaction(rating, feedback, {
      name: visitorName || visitorProfile?.name,
      company: visitorCompany || visitorProfile?.company,
      location: visitorProfile?.location
    });
    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const finalName = visitorName || visitorProfile?.name || '';
    const finalCompany = visitorCompany || visitorProfile?.company || '';
    const finalLocation = visitorProfile?.location || '';

    trackWhatsAppClick({
      name: finalName,
      company: finalCompany,
      location: finalLocation,
      rating,
      feedback
    });

    const leadIntro = finalName
      ? `My name is ${finalName}${finalCompany ? ` from ${finalCompany}` : ''}${finalLocation ? ` in ${finalLocation}` : ''}.`
      : finalCompany
      ? `I represent ${finalCompany}${finalLocation ? ` in ${finalLocation}` : ''}.`
      : 'I';

    const message = encodeURIComponent(
      `Hi StockFlow! ${leadIntro} I just completed the interactive walkthrough of your warehouse management system. I would like to discuss tailoring StockFlow for our operations.`
    );
    window.open(`https://wa.me/97472360418?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-surface border border-border rounded-2xl w-full max-w-[480px] shadow-2xl p-5 sm:p-6 flex flex-col gap-5 animate-slide-down relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsCompletedModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 pr-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold text-text-primary">
              Walkthrough Completed
            </h3>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              You have explored the end-to-end inbound receiving, FEFO shelf-life control, dispatch picking, delivery notes, and inventory reconciliation.
            </p>
          </div>
        </div>

        {/* Satisfaction Rating Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmitRating} className="flex flex-col gap-4 border-y border-border py-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-primary">
                Was this walkthrough clear and easy to understand?
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    aria-label={`Rate ${star} of 5`}
                  >
                    <Star
                      size={22}
                      className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                    />
                  </button>
                ))}
                <span className="text-xs text-text-muted ml-2">
                  {rating === 5 && 'Excellent and clear'}
                  {rating === 4 && 'Good and helpful'}
                  {rating === 3 && 'Average'}
                  {rating <= 2 && 'Needs improvement'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Your name (optional)"
                className="bg-surface-elevated/40 border border-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="text"
                value={visitorCompany}
                onChange={(e) => setVisitorCompany(e.target.value)}
                placeholder="Company / Warehouse (optional)"
                className="bg-surface-elevated/40 border border-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={2}
              placeholder="Any specific questions or features your warehouse needs?"
              className="bg-surface-elevated/40 border border-border rounded-lg p-2.5 text-xs text-text-primary focus:outline-none focus:border-primary resize-none transition-colors"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface border border-border hover:bg-surface-elevated text-text-primary rounded-lg text-xs font-semibold transition-colors"
              >
                <Send size={13} />
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-3 bg-surface-elevated/50 border border-border rounded-xl text-xs text-emerald-600 font-medium">
            Thank you for your feedback! Your review helps us improve.
          </div>
        )}

        {/* WhatsApp Direct Action */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-between transition-all shadow-md"
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Connect on WhatsApp (+974 7236 0418)</span>
            </div>
            <ArrowRight size={14} />
          </button>
          <p className="text-[11px] text-text-muted text-center">
            Direct access to our Qatar and UAE warehouse implementation consultants.
          </p>
        </div>
      </div>
    </div>
  );
}
