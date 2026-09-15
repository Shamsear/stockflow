"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can we import our existing Excel or Google Sheets data?",
      a: "Yes, 100%. You don't have to manually re-type anything. You can upload your existing Excel or CSV files, or simply send the file to us on WhatsApp and we will format and import all your SKUs, categories, and initial quantities for you.",
    },
    {
      q: "What hardware or barcode scanners do we need to buy?",
      a: "None! StockFlow runs smoothly on standard smartphones (iOS and Android), iPads, tablets, and desktop computers. If your warehouse already uses dedicated Zebra or Honeywell Bluetooth barcode guns, StockFlow connects with them natively with zero drivers required.",
    },
    {
      q: "How does StockFlow differ from rigid ERPs like SAP, Odoo, or NetSuite?",
      a: "Traditional ERPs are built for massive multi-million dollar conglomerates with full-time IT departments. They force you to conform to rigid, confusing menus and charge massive consultant fees whenever you need a single custom field. StockFlow is built around how your team already works — customized to your exact inbounds, outbounds, and floor plan within 3 to 5 days.",
    },
    {
      q: "Is the interface available in Arabic as well as English?",
      a: "Yes. In the GCC, warehouse managers and floor crew often speak different languages. StockFlow can be configured bilingually so your picking staff can navigate in Arabic or English with zero language barriers.",
    },
    {
      q: "How does pricing work?",
      a: "We don't believe in predatory per-user pricing penalties that punish you when you hire more warehouse workers. We offer straightforward, transparent plans based on your warehouse scale and customization needs. Connect with us on WhatsApp for an immediate, transparent estimate.",
    },
    {
      q: "Can someone visit our warehouse in Dubai or Doha?",
      a: "Yes. Our team is locally active in Qatar (Doha / Industrial Area) and the UAE (Dubai, Abu Dhabi, Sharjah). We are happy to visit your facility in person to see your loading docks, inspect your storage bays, and train your staff on-site.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-700" />
            <span>FREQUENT QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Clear Answers to Common Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Everything you need to know about tailoring StockFlow for your warehouse.
          </p>
        </div>

        {/* Accordion with Smooth Grid Transitions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-white border border-slate-200 overflow-hidden transition-all duration-200 shadow-subtle hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-navy-900 hover:text-brand-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-700" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 p-6 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-subtle text-left">
          <div>
            <h4 className="font-bold text-navy-900 text-sm">Have a specific question not listed here?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Ask our GCC team directly on WhatsApp for an immediate answer.
            </p>
          </div>
          <a
            href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I%20have%20a%20question%20about%20your%20warehouse%20dashboard."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
