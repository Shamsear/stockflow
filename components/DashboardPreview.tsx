"use client";

import React, { useState } from "react";
import { Package, ArrowDownRight, ArrowUpRight, Search, Filter, AlertTriangle, CheckCircle2, Sparkles, Check, Clock, Calendar, ShieldCheck } from "lucide-react";

export default function DashboardPreview() {
  const [tab, setTab] = useState<"inventory" | "inbound" | "outbound">("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "low" | "expiring" | "optimal">("all");
  const [verifiedPOs, setVerifiedPOs] = useState<Record<string, boolean>>({});

  const initialInventory = [
    {
      sku: "SF-FMCG-109",
      name: "Organic Raw Honey 500g Jar",
      batch: "LOT-2026-X88",
      category: "Food Trading",
      location: "Aisle D • Cold Shelf 02",
      stock: 890,
      min: 200,
      expiry: "14 Oct 2026",
      daysLeft: 396,
      status: "Optimal",
    },
    {
      sku: "SF-PHARM-220",
      name: "Sterile Saline Solution 500ml",
      batch: "LOT-2025-M04",
      category: "Medical / Pharma",
      location: "Aisle B • Rack 01",
      stock: 140,
      min: 50,
      expiry: "28 Nov 2026",
      daysLeft: 45,
      status: "Expiring Soon",
    },
    {
      sku: "SF-PAL-882",
      name: "Industrial Hydraulic Fluid (20L)",
      batch: "BATCH-HYD-91",
      category: "Lubricants",
      location: "Aisle C • Bay 04",
      stock: 340,
      min: 100,
      expiry: "12 Dec 2027",
      daysLeft: 820,
      status: "Optimal",
    },
    {
      sku: "SF-ELEC-401",
      name: "High-Bay LED Warehouse Fixture 150W",
      batch: "SER-ELEC-88",
      category: "Lighting",
      location: "Aisle A • Bay 12",
      stock: 18,
      min: 25,
      expiry: "N/A (Hardware)",
      daysLeft: 9999,
      status: "Low Stock",
    },
    {
      sku: "SF-AUTO-772",
      name: "Commercial Ceramic Brake Pad Set",
      batch: "LOT-BP-402",
      category: "Spare Parts",
      location: "Aisle B • Bin 09",
      stock: 64,
      min: 30,
      expiry: "N/A (Durable)",
      daysLeft: 9999,
      status: "Optimal",
    },
    {
      sku: "SF-FOOD-304",
      name: "Cold-Pressed Sesame Oil (1L)",
      batch: "LOT-2025-S11",
      category: "Food Trading",
      location: "Aisle D • Shelf 04",
      stock: 55,
      min: 40,
      expiry: "15 Oct 2026",
      daysLeft: 32,
      status: "Expiring Soon",
    },
  ];

  const filteredInventory = initialInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "low"
        ? item.status === "Low Stock"
        : filterStatus === "expiring"
        ? item.status === "Expiring Soon"
        : item.status === "Optimal";

    return matchesSearch && matchesFilter;
  });

  const inboundItems = [
    {
      po: "PO-2026-089",
      supplier: "Gulf Global Logistics FZE",
      items: "Industrial Tools (4 Pallets)",
      batch: "BATCH-TL-90",
      expiryCheck: "Verified Passed",
      dock: "Gate 02",
      time: "Arrived 10:45 AM",
      status: "Ready for Inspection",
    },
    {
      po: "PO-2026-090",
      supplier: "Doha Fresh Imports WLL",
      items: "Perishable Dairy & Dry (60 Boxes)",
      batch: "LOT-DF-2026",
      expiryCheck: "Min 180 Days Confirmed",
      dock: "Gate 04",
      time: "Expected 02:00 PM",
      status: "En Route",
    },
    {
      po: "PO-2026-088",
      supplier: "Al Futtaim Engineering",
      items: "Spare Valves & Flanges",
      batch: "SER-AFE-10",
      expiryCheck: "N/A Hardware",
      dock: "Gate 01",
      time: "Completed 09:15 AM",
      status: "Received & Stored",
    },
  ];

  const outboundItems = [
    {
      order: "ORD-9914",
      customer: "Emirates Retail Co. (Dubai Mall)",
      items: "24 SKUs (88 Units)",
      fefoRule: "FEFO Applied (Earliest expiry picked first)",
      packer: "Ahmed K. (Picker 04)",
      stage: "Ready for Driver",
    },
    {
      order: "ORD-9915",
      customer: "Al Meera Supermarkets (Doha)",
      items: "12 Cartons FMCG",
      fefoRule: "Batch LOT-2026-X88 verified",
      packer: "Rashid M. (Picker 02)",
      stage: "Picking (80% Done)",
    },
    {
      order: "ORD-9916",
      customer: "Sharjah Industrial Supplies",
      items: "Hydraulic Fittings (3 Pallets)",
      fefoRule: "Pallet weight verified",
      packer: "Tariq S. (Picker 01)",
      stage: "Queued for Pack",
    },
  ];

  const handleVerifyPO = (po: string) => {
    setVerifiedPOs((prev) => ({ ...prev, [po]: true }));
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-brand-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>LIVE INTERACTIVE DASHBOARD SIMULATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Track Stock, Expiry & Batches — Exactly How You Need It
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Click the filter buttons below (e.g. <strong>"Expiring Soon"</strong> or <strong>"Low Stock"</strong>) to see how StockFlow gives you 100% control over shelf-life and batches.
          </p>
        </div>

        {/* Dashboard Browser Frame Mockup */}
        <div className="w-full rounded-2xl bg-white border border-slate-300 shadow-card overflow-hidden transition-all duration-300 hover:shadow-float">
          {/* Top Browser Chrome */}
          <div className="h-11 bg-slate-100/95 border-b border-slate-200 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-1 rounded-md border border-slate-200 text-xs text-slate-500 font-mono max-w-xs sm:max-w-md w-full justify-center">
              <span className="text-emerald-600 font-bold">https://</span>
              <span>app.stockflow.io/warehouse-gcc-live</span>
            </div>

            <div className="text-xs text-slate-400 font-medium hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>FEFO & Batch Engine Active</span>
            </div>
          </div>

          {/* Internal Dashboard View */}
          <div className="p-4 sm:p-6 lg:p-8 bg-slate-50/50">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
                    <span>Total Active Stock</span>
                    <Package className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-navy-900">2,418 SKUs</div>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-2 pt-1 border-t border-slate-100">Multi-Bay Mapped</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
                    <span>Expiry & Shelf-Life</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-600">2 Batches &lt; 60d</div>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-2 pt-1 border-t border-slate-100">Auto-prioritized for dispatch</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
                    <span>Inbounds Today</span>
                    <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-navy-900">14 Deliveries</div>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-2 pt-1 border-t border-slate-100">Batch & PO logged</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
                    <span>FEFO Dispatch Queue</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-navy-900">38 Orders</div>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-2 pt-1 border-t border-slate-100">Zero expired shipments</div>
              </div>
            </div>

            {/* Dashboard Sub-Navigation Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTab("inventory")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    tab === "inventory"
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-navy-900 border border-slate-200"
                  }`}
                >
                  Live Stock & Expiry Control
                </button>
                <button
                  type="button"
                  onClick={() => setTab("inbound")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    tab === "inbound"
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-navy-900 border border-slate-200"
                  }`}
                >
                  Inbound & Batch Intake
                </button>
                <button
                  type="button"
                  onClick={() => setTab("outbound")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    tab === "outbound"
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-navy-900 border border-slate-200"
                  }`}
                >
                  Outbound FEFO Dispatch
                </button>
              </div>

              {/* Live Search & Filter Bar for Inventory Tab */}
              {tab === "inventory" && (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-44">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search SKU or Batch..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setFilterStatus("all")}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        filterStatus === "all"
                          ? "bg-slate-200 text-slate-900 font-bold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterStatus("expiring")}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        filterStatus === "expiring"
                          ? "bg-amber-500 text-white font-bold shadow-sm"
                          : "text-amber-700 bg-amber-50 hover:bg-amber-100"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>Expiring Soon</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterStatus("low")}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        filterStatus === "low"
                          ? "bg-rose-500 text-white font-bold shadow-sm"
                          : "text-rose-700 bg-rose-50 hover:bg-rose-100"
                      }`}
                    >
                      Low Stock
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterStatus("optimal")}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        filterStatus === "optimal"
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                    >
                      Optimal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-x-auto">
              {tab === "inventory" && (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="p-3.5 whitespace-nowrap">SKU Code</th>
                      <th className="p-3.5 whitespace-nowrap">Product Description</th>
                      <th className="p-3.5 whitespace-nowrap">Batch / Lot #</th>
                      <th className="p-3.5 whitespace-nowrap">Location</th>
                      <th className="p-3.5 text-right whitespace-nowrap">Qty</th>
                      <th className="p-3.5 whitespace-nowrap">Expiry Date</th>
                      <th className="p-3.5 text-center whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-xs text-slate-400">
                          No items match your search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors duration-150">
                          <td className="p-3.5 font-mono font-bold text-navy-900 whitespace-nowrap">{item.sku}</td>
                          <td className="p-3.5 font-semibold text-slate-900">{item.name}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {item.batch}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">
                            {item.location}
                          </td>
                          <td className="p-3.5 text-right font-black text-navy-900 whitespace-nowrap">{item.stock}</td>
                          <td className="p-3.5 text-xs whitespace-nowrap">
                            <span
                              className={`font-medium ${
                                item.status === "Expiring Soon"
                                  ? "text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                                  : "text-slate-600"
                              }`}
                            >
                              {item.expiry}
                            </span>
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                item.status === "Optimal"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : item.status === "Expiring Soon"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {tab === "inbound" && (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="p-3.5 whitespace-nowrap">PO Number</th>
                      <th className="p-3.5 whitespace-nowrap">Supplier Name</th>
                      <th className="p-3.5 whitespace-nowrap">Assigned Batch Code</th>
                      <th className="p-3.5 whitespace-nowrap">Expiry Verification</th>
                      <th className="p-3.5 whitespace-nowrap">Loading Gate</th>
                      <th className="p-3.5 text-center whitespace-nowrap">Dock Intake Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {inboundItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-navy-900 whitespace-nowrap">{item.po}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{item.supplier}</td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-mono text-xs text-brand-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                            {item.batch}
                          </span>
                        </td>
                        <td className="p-3.5 text-xs text-slate-600 font-medium whitespace-nowrap">
                          {item.expiryCheck}
                        </td>
                        <td className="p-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">{item.dock}</td>
                        <td className="p-3.5 text-center whitespace-nowrap">
                          {verifiedPOs[item.po] || item.status === "Received & Stored" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Batch Stored in Bay</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleVerifyPO(item.po)}
                              className="px-2.5 py-1 rounded-md bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white font-semibold text-[11px] transition-all shadow-sm cursor-pointer"
                            >
                              Verify Batch & PO
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === "outbound" && (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="p-3.5 whitespace-nowrap">Order ID</th>
                      <th className="p-3.5 whitespace-nowrap">Customer / Destination</th>
                      <th className="p-3.5 whitespace-nowrap">Manifest Items</th>
                      <th className="p-3.5 whitespace-nowrap">FEFO Expiry Rule</th>
                      <th className="p-3.5 whitespace-nowrap">Picker</th>
                      <th className="p-3.5 text-center whitespace-nowrap">Dispatch Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {outboundItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-navy-900 whitespace-nowrap">{item.order}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{item.customer}</td>
                        <td className="p-3.5 text-slate-600">{item.items}</td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {item.fefoRule}
                          </span>
                        </td>
                        <td className="p-3.5 text-xs text-slate-700 whitespace-nowrap">{item.packer}</td>
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              item.stage === "Ready for Driver"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-teal-50 text-brand-800 border border-teal-200"
                            }`}
                          >
                            {item.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Bottom Customization Note */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Need custom fields (e.g. Temperature, Pallet Weight, Customs Port Code)? We tailor-make it for you.</span>
              </span>
              <a
                href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20we%20need%20custom%20tracking%20for%20our%20warehouse%20(batches,%20expiry,%20custom%20rules)."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-700 hover:text-brand-900 underline shrink-0"
              >
                Discuss your tracking rules on WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* Full Application Live Demo CTA Bar */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-brand-700 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-navy-900 text-sm sm:text-base">
                Want to test drive the complete working application?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore real products, brands, inbound intake, outbound dispatch, ledgers, and reporting tools.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <span>Launch Full Live Demo</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
