'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  BookOpen, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  FileText, 
  RotateCcw, 
  QrCode, 
  ShieldCheck, 
  Smartphone, 
  Truck, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Layers,
  MapPin,
  ChevronRight,
  Package,
  Store,
  Users,
  Tag,
  AlertTriangle
} from 'lucide-react';

export default function DemoGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('workflows');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const workflows = [
    {
      step: '01',
      title: 'Inbound Receiving & Dock Staging',
      role: 'Dock Clerk / Receiving Team',
      desc: 'Receive sea container or local distributor shipments. Verify item quantities against Purchase Orders, scan unit/carton barcodes, capture expiry dates, and assign to storage racks or cold bays.',
      output: 'Generates official Goods Received Note (GRN) PDF with supplier details.',
      link: '/dashboard/inbound',
      linkText: 'Test Inbound Receiving',
      icon: ArrowDownLeft,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      step: '02',
      title: 'FEFO Expiry Date & Shelf-Life Control',
      role: 'Quality & Inventory Auditor',
      desc: 'StockFlow automatically sequences inventory by First-Expired, First-Out (FEFO). Batches nearing 90-day and 30-day shelf-life limits are flagged with critical alerts to prevent GCC supermarket rejections and municipality penalties.',
      output: 'Automated color-coded expiry badges & batch recall filtering.',
      link: '/dashboard/expiry',
      linkText: 'Test Expiry Monitor',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      step: '03',
      title: 'Outbound Picking & Driver Delivery Notes',
      role: 'Dispatch Supervisor / Picking Crew',
      desc: 'Pick stock for retail hypermarkets (Carrefour, Lulu, Al Meera, Safari). The system prevents picking expired batches, confirms serialized items, and compiles multi-pallet dispatches with assigned drivers.',
      output: 'Auto-generates official StockFlow Delivery Note PDF with dual driver/store sign-off.',
      link: '/dashboard/outbound',
      linkText: 'Test Outbound Dispatch',
      icon: ArrowUpRight,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      step: '04',
      title: 'Returns, Damage Quarantine & Rebranding',
      role: 'Returns & Quality Inspector',
      desc: 'Handle returns from retail chains cleanly. Segregate unsellable stock into Damage Quarantine with damage slips, process store returns with official Return Gate Passes, or swap product labels via Rebrand maps.',
      output: 'Generates Return Gate Pass PDFs and segregated non-sellable stock ledgers.',
      link: '/dashboard/client-returns',
      linkText: 'Test Returns & Gate Passes',
      icon: RotateCcw,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      step: '05',
      title: 'Real-Time Reconciliation & Principal Reports',
      role: 'Warehouse Operations Manager & Accounts',
      desc: 'Instantly view multi-brand stock balances broken down by: In Warehouse, Issued, With Client, Used, Damaged, and Lost. Filter by brand or category and export audit-ready Excel or CSV files in one click.',
      output: 'Instant branded Excel (.xlsx) and CSV exports with zero lag.',
      link: '/dashboard/reports',
      linkText: 'Test Reports & Export',
      icon: FileText,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    },
  ];

  const modulesList = [
    { category: 'Warehouse Floor Operations', items: [
      { name: 'Inbound Receipts', href: '/dashboard/inbound', desc: 'Log and verify inbound supplier shipments', icon: ArrowDownLeft, badge: 'Core' },
      { name: 'Outbound Dispatch', href: '/dashboard/outbound', desc: 'Pick and dispatch orders with delivery notes', icon: ArrowUpRight, badge: 'Core' },
      { name: 'Client Returns', href: '/dashboard/client-returns', desc: 'Process store returns & generate gate passes', icon: RotateCcw, badge: 'Audit' },
      { name: 'Damage Quarantine', href: '/dashboard/damage', desc: 'Isolate damaged units and issue damage slips', icon: AlertTriangle, badge: 'Quality' },
      { name: 'Loss Records', href: '/dashboard/loss', desc: 'Track lost items with discrepancy documentation', icon: FileText, badge: 'Audit' },
      { name: 'Rebranding Maps', href: '/dashboard/rebrand', desc: 'Convert stock codes for private-label or re-stickered SKUs', icon: Sparkles, badge: 'Ops' },
    ]},
    { category: 'Warehouse Master Data', items: [
      { name: 'Brands Directory', href: '/dashboard/brands', desc: 'Segregate inventory by brand principal', icon: Tag, badge: 'Setup' },
      { name: 'Products Catalog', href: '/dashboard/products', desc: 'Manage SKUs, barcodes, unit prices, and serialized items', icon: Package, badge: 'Setup' },
      { name: 'Retail Outlets & Stores', href: '/dashboard/stores', desc: 'Manage destination hypermarkets, cold stores, and branches', icon: Store, badge: 'Setup' },
      { name: 'Supervisors & Drivers', href: '/dashboard/supervisors', desc: 'Fleet drivers and dispatch supervisors', icon: Truck, badge: 'Team' },
      { name: 'Store Promoters & Staff', href: '/dashboard/staff', desc: 'On-ground retail staff and merchandising reps', icon: Users, badge: 'Team' },
    ]},
    { category: 'Intelligence & Auditing', items: [
      { name: 'FEFO Expiry Tracker', href: '/dashboard/expiry', desc: 'First-Expired, First-Out monitoring & shelf-life alerts', icon: Clock, badge: 'Compliance' },
      { name: 'Transactions Ledger', href: '/dashboard/transactions', desc: 'Complete chronological trail of all movements', icon: Layers, badge: 'Audit' },
      { name: 'Executive Reports', href: '/dashboard/reports', desc: 'Consolidated balances, stock health, and Excel export', icon: FileText, badge: 'Reports' },
      { name: 'Inbound Barcode Station', href: '/dashboard/inbound/new', desc: 'Scan and verify serials & carton barcodes on receiving', icon: QrCode, badge: 'Scanner' },
    ]}
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-[999] flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-slide-down">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-border bg-gradient-to-r from-surface to-surface-elevated flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-display font-extrabold text-text-primary">
                  StockFlow WMS Demo Guide
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 rounded-full uppercase">
                  Playbook
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                Understand how our warehouse management system operates in GCC distribution facilities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            aria-label="Close guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-border px-4 sm:px-6 bg-surface-elevated/30 overflow-x-auto gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('workflows')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'workflows'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Sparkles size={16} />
            <span>Core Workflows (5 Steps)</span>
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'modules'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Layers size={16} />
            <span>All 17 Modules Directory</span>
          </button>
          <button
            onClick={() => setActiveTab('scanners')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'scanners'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Smartphone size={16} />
            <span>Scanners & Mobile Sync</span>
          </button>
          <button
            onClick={() => setActiveTab('customization')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'customization'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <MapPin size={16} />
            <span>Qatar & UAE Deployment</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: CORE WORKFLOWS */}
          {activeTab === 'workflows' && (
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">How Goods Move Through StockFlow</h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Click any stage below to jump straight into that module and test live data entry, barcode scanning, and PDF delivery note generation.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
                  <span>Interactive Pipeline</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {workflows.map((wf) => {
                  const Icon = wf.icon;
                  return (
                    <div 
                      key={wf.step}
                      className="border border-border hover:border-primary/30 rounded-xl p-4 sm:p-5 bg-surface-elevated/20 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${wf.color}`}>
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                              Step {wf.step}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-text-primary">
                              {wf.title}
                            </h3>
                            <span className="text-[11px] text-text-muted">
                              • {wf.role}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                            {wf.desc}
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                            <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                            <span>{wf.output}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                        <Link
                          href={wf.link}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap"
                        >
                          <span>{wf.linkText}</span>
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MODULE DIRECTORY */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-text-secondary">
                StockFlow WMS comprises 17 purpose-built modules designed for GCC distribution operations. Click any module to navigate directly.
              </p>

              {modulesList.map((group) => (
                <div key={group.category} className="space-y-3">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{group.category}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={onClose}
                          className="p-3.5 border border-border hover:border-primary/40 bg-surface-elevated/20 hover:bg-surface-elevated/40 rounded-xl flex flex-col justify-between gap-2 transition-all group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                                <Icon size={16} />
                              </div>
                              <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface border border-border text-text-secondary">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-text-secondary line-clamp-2">
                            {item.desc}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SCANNERS & MOBILE SYNC */}
          {activeTab === 'scanners' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Handheld Hardware */}
                <div className="border border-border rounded-xl p-5 bg-surface-elevated/20 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                    <QrCode size={22} />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">
                    Rugged Warehouse Handhelds
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    StockFlow works natively with industrial mobile computers and barcode guns via standard USB, Bluetooth, or WiFi:
                  </p>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span><strong>Zebra</strong> TC21, TC26, TC52, MC3300 series</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span><strong>Honeywell</strong> ScanPal EDA51, Dolphin, Voyager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span><strong>Datalogic</strong> Memor 10 & 20 series</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>Zero software or drivers required — plug and scan!</span>
                    </li>
                  </ul>
                </div>

                {/* Mobile Camera Companion */}
                <div className="border border-border rounded-xl p-5 bg-surface-elevated/20 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <Smartphone size={22} />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">
                    Instant Smartphone Companion Mode
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    No expensive handhelds? Every warehouse worker can use their personal smartphone (iPhone or Android) as a live scanner:
                  </p>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>Click the <strong>Mobile Phone Icon</strong> on any receipt or dispatch screen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>Scan the generated QR code with any phone camera</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>The phone pairs instantly — barcodes scanned on the phone populate the desktop in real time!</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/inbound/new"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <span>Try Mobile Companion on Inbound Receiving →</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: QATAR & UAE CUSTOMIZATION */}
          {activeTab === 'customization' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={22} className="text-emerald-600" />
                  <h3 className="text-base font-bold text-text-primary">
                    Tailored for GCC Warehouse Logistics (Qatar & UAE)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                  We customize StockFlow to match your exact warehouse physical layout, ERP software, and regulatory compliance standards:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-xl bg-surface-elevated/20 space-y-2">
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Floor Plan & Bay Numbering</span>
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Custom rack, aisle, shelf, and cold-storage chamber numbering matching your physical warehouse blueprints in Industrial Area (Qatar) or Al Quoz / JAFZA / Dubai South (UAE).
                  </p>
                </div>

                <div className="p-4 border border-border rounded-xl bg-surface-elevated/20 space-y-2">
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>3-5 Day Rapid Onboarding</span>
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Complete turnkey rollout in 3 to 5 business days: Master SKU import via Excel, staff training, driver mobile setups, and barcode label printer configuration.
                  </p>
                </div>

                <div className="p-4 border border-border rounded-xl bg-surface-elevated/20 space-y-2">
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Local Document Compliance</span>
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Bilingual delivery notes, return gate passes, municipality-ready expiry logs, and VAT/tax number integration compliant with regional authorities.
                  </p>
                </div>

                <div className="p-4 border border-border rounded-xl bg-surface-elevated/20 space-y-2">
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Direct WhatsApp Technical Support</span>
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Dedicated engineering hotline via WhatsApp with sub-30 minute response times during operational warehouse shifts.
                  </p>
                </div>
              </div>

              {/* Direct CTA Box */}
              <div className="p-5 border border-emerald-500/30 bg-emerald-500/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Want to discuss your warehouse requirements?</h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Our team can prepare a customized staging deployment with your actual SKU list and floor plan.
                  </p>
                </div>
                <a
                  href="https://wa.me/97472360418?text=Hello%20StockFlow!%20I%20reviewed%20the%20live%20demo%20and%20would%20like%20to%20discuss%20deploying%20StockFlow%20for%20our%20warehouse."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all whitespace-nowrap self-start sm:self-center"
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp (+974 7236 0418)</span>
                </a>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border bg-surface-elevated/40 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>StockFlow WMS Enterprise Demo • Qatar & UAE</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-surface border border-border hover:bg-surface-elevated text-text-secondary hover:text-text-primary text-xs font-semibold rounded-lg transition-colors"
            >
              Close Playbook
            </button>
            <a
              href="https://wa.me/97472360418?text=Hi%20StockFlow!%20Can%20you%20share%20pricing%20and%20setup%20timeline%20for%20our%20warehouse?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              <MessageSquare size={14} />
              <span>Contact Logistics Team</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
