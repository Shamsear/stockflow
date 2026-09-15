"use client";

import React from "react";
import { MapPin, Phone, MessageCircle, ShieldCheck, Users, Building2, HeartHandshake } from "lucide-react";
import { FlagQatar, FlagUAE } from "./Flags";

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>REAL HUMANS • LOCAL GCC PRESENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Built by Real Engineers in Your Time Zone. <br className="hidden sm:block" />
            Not an Anonymous AI or Offshore Call Center.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            When you message StockFlow, you speak directly with the people building and customizing your dashboard in Doha and Dubai.
          </p>
        </div>

        {/* Human Team Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {/* UAE Lead Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base border border-emerald-200 shrink-0">
                    OK
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">Omar K.</h3>
                    <div className="text-xs text-slate-500 font-medium">
                      Co-founder & Solutions Engineer (UAE)
                    </div>
                  </div>
                </div>
                <FlagUAE className="w-6 h-4 shrink-0" />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                "I spend my days walking loading docks in Al Quoz, JAFZA, and Sharjah. We build StockFlow because off-the-shelf ERPs are ridiculously complicated for floor crews who just need to pack boxes fast."
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Available for on-site visits across Dubai & Sharjah</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-mono font-bold text-slate-800">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+974 7236 0418</span>
              </div>
              <a
                href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'm%20reaching%20out%20about%20a%20warehouse%20dashboard%20in%20the%20UAE."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp UAE Inquiry</span>
              </a>
            </div>
          </div>

          {/* Qatar Lead Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-brand-900 font-bold flex items-center justify-center text-base border border-teal-200 shrink-0">
                    AM
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">Ahmed M.</h3>
                    <div className="text-xs text-slate-500 font-medium">
                      Co-founder & Operations Lead (Qatar)
                    </div>
                  </div>
                </div>
                <FlagQatar className="w-6 h-4 shrink-0" />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                "Based right here in Doha. We focus on batch tracking, expiry date compliance, and supplier PO intakes for trading companies in the Industrial Area and Birkat Al Awamer."
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span>Available for on-site visits across Doha & Industrial Area</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-mono font-bold text-slate-800">
                <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                <span>+974 7236 0418</span>
              </div>
              <a
                href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'm%20reaching%20out%20about%20a%20warehouse%20dashboard%20in%20Qatar."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current text-emerald-400 shrink-0" />
                <span>WhatsApp Qatar Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Core Trust Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-subtle flex flex-col items-center justify-start h-full">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-navy-900 shrink-0">
              <Users className="w-5 h-5 text-brand-700" />
            </div>
            <h4 className="font-bold text-navy-900 text-sm">No Commission Sales Reps</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              You chat with builders who care about fixing your warehouse bottlenecks, not closing a quota.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-subtle flex flex-col items-center justify-start h-full">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-navy-900 shrink-0">
              <Building2 className="w-5 h-5 text-brand-700" />
            </div>
            <h4 className="font-bold text-navy-900 text-sm">Direct On-Site Visits</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              We visit your facility to inspect bays, verify barcodes, and test scanner compatibility in person.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-subtle flex flex-col items-center justify-start h-full">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-navy-900 shrink-0">
              <HeartHandshake className="w-5 h-5 text-brand-700" />
            </div>
            <h4 className="font-bold text-navy-900 text-sm">Ongoing WhatsApp Support</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Direct group with your operations managers for quick questions, adjustments, and updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
