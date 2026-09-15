"use client";

import React from "react";
import { ArrowDownRight, ArrowUpRight, Layers, Sliders, CheckCircle2 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ArrowDownRight,
      tag: "INBOUND FLOW",
      title: "Streamline Inbound Deliveries",
      desc: "Receive supplier shipments, match purchase orders in seconds, and assign designated bays so boxes never sit stranded in the aisle.",
      bullets: [
        "1-tap PO quantity verification",
        "Discrepancy and damaged item logging",
        "Instant stock sync across sales & finance",
      ],
      color: "border-emerald-200 bg-emerald-50/30 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: ArrowUpRight,
      tag: "OUTBOUND FLOW",
      title: "Error-Free Pick, Pack & Dispatch",
      desc: "Cut picking time by half with automated shelf coordinates. Ensure couriers and delivery drivers take the exact right items every single trip.",
      bullets: [
        "Route-optimized digital pick lists",
        "Barcode/SKU verification on packing",
        "Automated courier manifest & driver handoff",
      ],
      color: "border-teal-200 bg-teal-50/30 text-brand-900",
      iconBg: "bg-teal-100 text-brand-700",
    },
    {
      icon: Layers,
      tag: "STOCK & EXPIRY CONTROL",
      title: "Real-Time Stock, Batch & Expiry Tracking",
      desc: "Stop doing painful weekend audits or accidentally dispatching expired products. Monitor active SKUs, batch codes, and shelf-life warnings on one screen.",
      bullets: [
        "Automated expiry alerts & FEFO picking logic",
        "Batch/Lot traceability from dock to customer",
        "Multi-bay, shelf, and cold-room coordinate mapping",
      ],
      color: "border-slate-200 bg-slate-50/60 text-navy-900",
      iconBg: "bg-slate-200 text-slate-800",
    },
    {
      icon: Sliders,
      tag: "100% BESPOKE",
      title: "Customized to Your Exact Workflow",
      desc: "No forced rigid menus or useless features. We customize fields, categories, reports, and screen layouts around your daily routine.",
      bullets: [
        "Your custom fields, tags & product codes",
        "Bilingual readiness (English & Arabic)",
        "Adjusts continuously as your warehouse scales",
      ],
      color: "border-brand-200 bg-teal-50/40 text-brand-950",
      iconBg: "bg-brand-100 text-brand-800",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Everything Your Warehouse Needs. <br className="hidden sm:block" />
            Nothing It Doesn't.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Built specifically to eliminate the four biggest headaches GCC warehouse managers face every day.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-3">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{feat.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {feat.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
