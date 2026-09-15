"use client";

import React from "react";
import { Check, X, Sparkles, Sliders, Layers, Users, Zap, Clock, Tag, MapPin, QrCode, FileText, AlertOctagon } from "lucide-react";

export default function TailorMadeSection() {
  const comparisonItems = [
    {
      feature: "How the software works",
      offTheShelf: "Forces your team to change daily habits and memorize 50 complex sub-menus.",
      stockflow: "Molded 100% around your existing team's routine, terminology, and physical layout.",
    },
    {
      feature: "Batch, Lot & Expiry tracking",
      offTheShelf: "Rigid schema. Setting up custom expiry alerts or lot tracking requires enterprise add-on modules.",
      stockflow: "Tailor-made expiry alerts (FEFO rules), custom lot formats, and shelf-life warning thresholds.",
    },
    {
      feature: "Custom fields & tracking tags",
      offTheShelf: "Adding a custom pallet ID, customs clearance code, or temperature rule costs thousands.",
      stockflow: "We add your exact custom data columns, expiry formats, and bin labels with zero hassle.",
    },
    {
      feature: "Implementation time",
      offTheShelf: "3 to 6 months of painful IT installation and disruptive staff training.",
      stockflow: "Ready in 3 to 5 days. Your staff learns it in under 30 minutes on their phones or PCs.",
    },
    {
      feature: "Support & communication",
      offTheShelf: "Helpless ticketing portals and automated bots across distant time zones.",
      stockflow: "Direct WhatsApp group with the builders serving Qatar & the UAE (+974 7236 0418).",
    },
  ];

  const customTrackingCapabilities = [
    {
      icon: Clock,
      title: "Expiry Dates & Shelf-Life (FEFO)",
      desc: "Stop shipping expired items. Automatically alert staff 30, 60, or 90 days before expiry and prioritize First-Expired, First-Out (FEFO) picking.",
    },
    {
      icon: Tag,
      title: "Batch & Lot Traceability",
      desc: "Track items by supplier lot, container receipt, or production batch. Instant recall tracking if a specific batch has an issue.",
    },
    {
      icon: MapPin,
      title: "Aisle, Rack & Bin Coordinates",
      desc: "Molded to your physical layout: Aisle 04 • Shelf B • Bin 12 • Cold Room. Staff walk directly to the right coordinate every time.",
    },
    {
      icon: QrCode,
      title: "Serial Numbers & Barcodes",
      desc: "Individual unit serialization for electronics, machinery, and high-value tools. Works on phone cameras or dedicated handheld scanners.",
    },
    {
      icon: FileText,
      title: "GCC Customs & Clearance Tags",
      desc: "Store HS tariff codes, Bill of Lading references, and customs port paperwork directly alongside your shipment records.",
    },
    {
      icon: AlertOctagon,
      title: "Quarantine & Damaged Goods",
      desc: "Digitally isolate damaged or pending-inspection stock so it is physically impossible for pickers to accidentally pack or sell it.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-brand-900 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5 text-brand-700" />
            <span>THE TAILOR-MADE PROMISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            You Don’t Adapt to the Software. <br className="hidden sm:block" />
            The Software Adapts to You.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Every warehouse operates differently. Whether you need strict expiry-date tracking for food, serial numbers for electronics, or custom container logs for imports — we tailor-make the tracking fields around your exact requirements.
          </p>
        </div>

        {/* 6 Tailored Tracking Modules Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-navy-900">
              Whatever Your Warehouse Needs to Track — We Configure It
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select or combine any of these tracking dimensions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {customTrackingCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-700 flex items-center justify-center mb-4 border border-teal-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-navy-900 text-base mb-2">{cap.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-brand-800">
                    <Check className="w-3.5 h-3.5 text-brand-600" />
                    <span>Configured for your operation</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          {/* Header Row (Desktop only) */}
          <div className="hidden md:grid md:grid-cols-12 border-b border-slate-200 bg-slate-100/60 font-bold text-sm text-slate-800">
            <div className="md:col-span-4 p-4 text-slate-500 uppercase tracking-wider text-xs font-bold">
              Warehouse Requirement
            </div>
            <div className="md:col-span-4 p-4 text-slate-600 md:border-l border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Rigid Off-The-Shelf ERPs</span>
            </div>
            <div className="md:col-span-4 p-4 bg-teal-50/80 text-brand-950 md:border-l border-teal-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-700" />
              <span>StockFlow Tailor-Made</span>
            </div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 text-sm transition-colors hover:bg-slate-50/50"
              >
                {/* Feature Name */}
                <div className="md:col-span-4 p-4 font-bold text-slate-900 flex items-center bg-slate-100/60 md:bg-transparent border-b md:border-b-0 border-slate-200">
                  <span className="text-xs md:text-sm uppercase tracking-wide md:normal-case md:tracking-normal text-brand-900 md:text-slate-900">
                    {item.feature}
                  </span>
                </div>

                {/* Off The Shelf */}
                <div className="md:col-span-4 p-4 text-slate-600 md:border-l border-slate-200 flex items-start gap-2.5 bg-rose-50/20 md:bg-transparent border-b md:border-b-0 border-slate-100">
                  <div className="md:hidden text-[10px] font-bold uppercase tracking-wider text-rose-600 shrink-0 w-24">
                    Rigid ERP:
                  </div>
                  <X className="hidden md:block w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-xs sm:text-sm">{item.offTheShelf}</span>
                </div>

                {/* StockFlow */}
                <div className="md:col-span-4 p-4 bg-teal-50/30 text-slate-900 md:border-l border-teal-200 flex items-start gap-2.5 font-medium">
                  <div className="md:hidden text-[10px] font-bold uppercase tracking-wider text-teal-800 shrink-0 w-24">
                    StockFlow:
                  </div>
                  <Check className="hidden md:block w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-xs sm:text-sm">{item.stockflow}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tailor-Made Callout Banner */}
        <div className="mt-8 max-w-6xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-center shrink-0 text-teal-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Have specific tracking criteria or unique items?
              </h3>
              <p className="text-sm text-slate-300 mt-0.5">
                Tell us what you need to track on WhatsApp. We build your dashboard around your exact workflow in days.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20we%20have%20specific%20warehouse%20tracking%20rules%20(batches,%20expiry,%20custom%20fields)%20and%20want%20to%20discuss%20a%20tailor-made%20setup."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-all shadow-sm inline-flex items-center gap-2"
          >
            <span>Discuss Custom Setup</span>
            <Check className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
