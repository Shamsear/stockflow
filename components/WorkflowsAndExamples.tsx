"use client";

import React, { useState } from "react";
import { ArrowDownRight, ArrowUpRight, ShieldAlert, CheckCircle, Clock, Truck, Package, Layers, ChevronRight } from "lucide-react";

export default function WorkflowsAndExamples() {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound" | "stock">("inbound");
  const [industryTab, setIndustryTab] = useState<"fmcg" | "ecommerce" | "parts">("fmcg");

  const workflows = {
    inbound: {
      title: "Inbound Receiving: From Supplier Truck to Shelf in 3 Minutes",
      before: {
        title: "The Spreadsheet / Paper Chaos",
        points: [
          "Supplier arrives with printed paper delivery notes.",
          "Worker ticks boxes with a pen while standing on the dock.",
          "Slip sits on an office desk until 5 PM.",
          "Someone manually re-types numbers into Excel.",
          "Missing or damaged items discovered 4 days later when it's too late to dispute.",
        ],
      },
      after: {
        title: "The StockFlow Way",
        steps: [
          {
            step: "01",
            title: "Pull Up Supplier PO on Phone or Tablet",
            desc: "Worker taps PO #4021. Expected items, variants, and quantities load immediately.",
          },
          {
            step: "02",
            title: "Instant Quantity Verification & Defect Flagging",
            desc: "Count boxes with 1 tap. Mark damaged items with a photo right at the loading bay.",
          },
          {
            step: "03",
            title: "Assigned Bay & Real-Time Company Sync",
            desc: "System recommends Bay B-04. Stock counts update live for sales and accounting teams instantly.",
          },
        ],
      },
    },
    outbound: {
      title: "Outbound Dispatch: Zero Wrong Shipments, Rapid Picking",
      before: {
        title: "The WhatsApp Voice Note Chaos",
        points: [
          "Sales rep sends frantic WhatsApp voice note: 'Do we have 50 units of Item X in stock?'",
          "Warehouse picker walks down aisles searching shelves blindly.",
          "Wrong batch or expired stock packed in a rush.",
          "Customer receives incorrect item, files a complaint, and demands returns.",
        ],
      },
      after: {
        title: "The StockFlow Way",
        steps: [
          {
            step: "01",
            title: "Digital Pick List with Exact Shelf Coordinates",
            desc: "Orders automatically populate with exact aisle, rack, and bin coordinates (e.g. Aisle 3 • Shelf B • Bin 12).",
          },
          {
            step: "02",
            title: "1-Tap Barcode & Variant Verification",
            desc: "Picker checks off items. System physically prevents packing the wrong size, color, or batch.",
          },
          {
            step: "03",
            title: "Driver Handoff & Auto-Deduction",
            desc: "Print delivery slip, log driver name/plate, and stock is automatically deducted in real time.",
          },
        ],
      },
    },
    stock: {
      title: "Live Stock Health: No More Surprises or Friday Night Audits",
      before: {
        title: "The Spreadsheet Nightmare",
        points: [
          "Spreadsheet file version 'Inventory_v4_FINAL_edit2.xlsx' has 3 different copies.",
          "Sales sells 100 units of an item that was actually out of stock 2 days ago.",
          "Weekend-long physical counts required just to know what is actually inside the warehouse.",
        ],
      },
      after: {
        title: "The StockFlow Way",
        steps: [
          {
            step: "01",
            title: "Single Source of Truth",
            desc: "One central cloud dashboard accessible from mobile, desktop, or tablet simultaneously.",
          },
          {
            step: "02",
            title: "Automated Low-Stock & Reorder Alerts",
            desc: "Set minimum thresholds per SKU. Get alerted before critical inventory runs completely dry.",
          },
          {
            step: "03",
            title: "Rapid Rolling Cycle Counts",
            desc: "Audit one aisle or high-value zone in 10 minutes without shutting down normal operations.",
          },
        ],
      },
    },
  };

  const currentWorkflow = workflows[activeTab];

  const industries = {
    fmcg: {
      badge: "Doha & Dubai Food / FMCG Traders",
      heading: "Wholesale & FMCG Distribution",
      challenge: "High container turnover, batch numbers, and strict expiration date compliance.",
      solution: "StockFlow tracks batch codes upon container intake and alerts warehouse managers 60 days before expiration, prioritizing First-In First-Out (FIFO) picking for customer deliveries.",
      metrics: "99.4% batch accuracy • Zero expired stock write-offs",
    },
    ecommerce: {
      badge: "Al Quoz & Dubai E-commerce Hubs",
      heading: "E-commerce Multi-Channel Brands",
      challenge: "Simultaneous sales on Shopify, Noon, Amazon, and offline store locations causing accidental overselling.",
      solution: "StockFlow acts as the central stock nervous system. Pickers get fast route-optimized pick lists to fulfill 200+ courier orders before the 4 PM dispatch cutoff.",
      metrics: "3x faster pick-and-pack • Zero out-of-stock cancel penalties",
    },
    parts: {
      badge: "Sharjah & Birkat Al Awamer Industrial",
      heading: "Automotive & Industrial Spare Parts",
      challenge: "Managing 3,000+ tiny SKUs across dense shelf bins where part numbers differ by just one letter.",
      solution: "Visual bin mapping and rapid search. Counter staff type the part number and see the exact shelf location in 2 seconds while the customer is standing at the desk.",
      metrics: "Under 10 seconds to locate any part • Zero lost inventory",
    },
  };

  const currentIndustry = industries[industryTab];

  return (
    <section id="workflows" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-brand-700" />
            <span>SEE IT IN ACTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            How StockFlow Solves Your Real Daily Workflows
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4">
            See the exact difference between the spreadsheet way and the StockFlow way across inbounds, outbounds, and stock control.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 p-1.5 rounded-xl bg-slate-100 border border-slate-200 w-full sm:w-auto gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("inbound")}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "inbound"
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <ArrowDownRight className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Inbound Receiving</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("outbound")}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "outbound"
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Outbound Dispatch</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("stock")}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "stock"
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <Package className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Live Stock & Health</span>
            </button>
          </div>
        </div>

        {/* Workflow Showcase: Before vs After */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* The Old Spreadsheet Way */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-rose-50/40 border border-rose-200/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-4">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>THE OLD WAY (SPREADSHEETS & PAPER)</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {currentWorkflow.before.title}
              </h3>
              <ul className="space-y-3.5">
                {currentWorkflow.before.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ×
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-rose-200/60 text-xs font-medium text-rose-700">
              Result: Discrepancies, delayed shipments, and stressed warehouse managers.
            </div>
          </div>

          {/* The StockFlow Way */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-teal-50/40 border border-teal-200/90 shadow-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-brand-900 text-xs font-bold mb-4">
                <CheckCircle className="w-3.5 h-3.5 text-brand-700" />
                <span>THE STOCKFLOW FLOW</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-6">
                {currentWorkflow.title}
              </h3>

              <div className="space-y-5">
                {currentWorkflow.after.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-teal-100 shadow-subtle">
                    <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                      {st.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 text-sm">{st.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-teal-200/70 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-900">
                Result: 100% data confidence, zero guesswork.
              </span>
              <a
                href="https://wa.me/97472360418?text=Hi%20StockFlow,%20I'd%20like%20to%20see%20a%20demo%20of%20this%20exact%20flow."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-800 hover:text-brand-950 flex items-center gap-1"
              >
                <span>See Demo on WhatsApp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Real GCC Industry Scenarios */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              GCC Regional Use Cases
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineered for Your Specific Industry
            </h3>
          </div>

          {/* Industry Switcher Buttons */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <button
              type="button"
              onClick={() => setIndustryTab("fmcg")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                industryTab === "fmcg"
                  ? "bg-teal-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              FMCG & Food Trading
            </button>
            <button
              type="button"
              onClick={() => setIndustryTab("ecommerce")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                industryTab === "ecommerce"
                  ? "bg-teal-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              E-Commerce Brands
            </button>
            <button
              type="button"
              onClick={() => setIndustryTab("parts")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                industryTab === "parts"
                  ? "bg-teal-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Spare Parts & Hardware
            </button>
          </div>

          {/* Industry Content Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-medium">
                {currentIndustry.badge}
              </div>
              <h4 className="text-lg font-bold text-white">{currentIndustry.heading}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">The Challenge:</strong> {currentIndustry.challenge}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-teal-400 font-semibold">The StockFlow Solution:</strong> {currentIndustry.solution}
              </p>
            </div>

            <div className="flex flex-col justify-between p-4 rounded-lg bg-slate-900/90 border border-slate-700/80 text-left">
              <div>
                <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Typical GCC Outcome
                </div>
                <div className="text-sm font-bold text-teal-300 mt-2">
                  {currentIndustry.metrics}
                </div>
              </div>

              <a
                href={`https://wa.me/97472360418?text=${encodeURIComponent(
                  `Hi StockFlow team! We run an ${currentIndustry.heading} warehouse and want to see how this fits our business.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-all"
              >
                Discuss Our Workflow on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
