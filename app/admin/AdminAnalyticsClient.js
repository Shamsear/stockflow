'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  Compass,
  MessageSquare,
  Star,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Smartphone,
  Monitor,
  Globe,
  RotateCcw,
  ArrowLeft,
  X,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function AdminAnalyticsClient({ initialData }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'COMPLETED' | 'WHATSAPP' | 'CHATTED'
  
  // Chat Transcript Modal
  const [selectedSessionForChat, setSelectedSessionForChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const { kpis, funnel, geography, devices, recentSessions } = data || {};

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleViewChat = async (session) => {
    setSelectedSessionForChat(session);
    setIsLoadingChat(true);
    try {
      const res = await fetch(`/api/assistant/chat/history?sessionId=${session.id}`);
      const json = await res.json();
      setChatMessages(json.messages || []);
    } catch {
      setChatMessages([]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Filtered Sessions
  const filteredSessions = (recentSessions || []).filter((s) => {
    const matchesSearch =
      !searchFilter ||
      (s.country && s.country.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (s.city && s.city.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (s.leadName && s.leadName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (s.leadCompany && s.leadCompany.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (s.id && s.id.toLowerCase().includes(searchFilter.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'COMPLETED') return s.completedTour;
    if (statusFilter === 'WHATSAPP') return s.clickedWhatsApp;
    if (statusFilter === 'CHATTED') return s.messagesCount > 0;
    return true;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Session ID',
      'Country',
      'City',
      'Device',
      'Started At',
      'Last Active',
      'Tour Completed',
      'Steps Completed Count',
      'Steps List',
      'Satisfaction Rating',
      'Feedback',
      'Clicked WhatsApp',
      'Lead Name',
      'Lead Company',
      'Questions Asked Count'
    ];

    const rows = (recentSessions || []).map((s) => [
      s.id,
      s.country || 'Unknown',
      s.city || 'Unknown',
      s.deviceType || 'Desktop',
      s.startedAt ? new Date(s.startedAt).toISOString() : '',
      s.lastActiveAt ? new Date(s.lastActiveAt).toISOString() : '',
      s.completedTour ? 'YES' : 'NO',
      (s.completedSteps || []).length,
      (s.completedSteps || []).join('; '),
      s.satisfactionRating != null ? s.satisfactionRating : '',
      `"${(s.feedbackComment || '').replace(/"/g, '""')}"`,
      s.clickedWhatsApp ? 'YES' : 'NO',
      `"${(s.leadName || '').replace(/"/g, '""')}"`,
      `"${(s.leadCompany || '').replace(/"/g, '""')}"`,
      s.messagesCount || 0
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `StockFlow-Visitor-Analytics-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalVisitorsCount = kpis?.totalVisitors || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/dashboard" className="hover:text-text-primary transition-colors flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>Back to Warehouse Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-text-secondary">Executive Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-text-primary tracking-tight">
            Walkthrough Telemetry &amp; Lead Analytics
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            Live visitor engagement tracking, step completion funnels, client questions, and WhatsApp inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-border hover:bg-surface-elevated text-text-secondary hover:text-text-primary rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <RotateCcw size={14} className={isRefreshing ? 'animate-spin text-primary' : ''} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Visitors */}
        <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Total Demo Visitors</span>
            <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-text-secondary">
              <Users size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-black text-text-primary">
            {kpis?.totalVisitors || 0}
          </div>
          <div className="text-[11px] text-text-muted">
            Unique browser sessions tracked
          </div>
        </div>

        {/* KPI 2: Walkthrough Completion Rate */}
        <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Full Walkthroughs</span>
            <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-primary">
              <Compass size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-display font-black text-text-primary">
              {kpis?.completionRate || 0}%
            </span>
            <span className="text-xs text-text-muted font-medium">
              ({kpis?.completedTourCount || 0} finished)
            </span>
          </div>
          <div className="text-[11px] text-text-muted">
            Completed all 5 core modules
          </div>
        </div>

        {/* KPI 3: WhatsApp Inquiries */}
        <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">WhatsApp Connections</span>
            <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-emerald-600">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-display font-black text-emerald-600">
              {kpis?.whatsAppClicks || 0}
            </span>
            <span className="text-xs text-text-muted font-medium">
              ({kpis?.conversionRate || 0}% lead rate)
            </span>
          </div>
          <div className="text-[11px] text-text-muted">
            Direct high-intent consultation requests
          </div>
        </div>

        {/* KPI 4: Satisfaction Rating */}
        <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Avg Client Rating</span>
            <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-amber-500">
              <Star size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-display font-black text-text-primary">
              {kpis?.averageRating > 0 ? kpis.averageRating.toFixed(1) : '—'}
            </span>
            <span className="text-xs text-text-muted font-medium">
              / 5.0 ({kpis?.ratedSessionsCount || 0} reviews)
            </span>
          </div>
          <div className="text-[11px] text-text-muted">
            Overall walkthrough clarity score
          </div>
        </div>
      </div>

      {/* Funnel & Demographics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step-by-Step Funnel (2 Cols) */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
          <div>
            <h3 className="text-sm sm:text-base font-display font-bold text-text-primary">
              Module Walkthrough Funnel
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Visitor progression across the 5 core warehouse stages
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {(funnel || []).map((step, idx) => {
              const pct = totalVisitorsCount > 0 ? Math.round((step.count / totalVisitorsCount) * 100) : 0;
              return (
                <div key={step.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-text-primary">
                      {idx + 1}. {step.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-text-muted">{step.count} visitors</span>
                      <span className="font-bold text-text-primary w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, Math.min(100, pct))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geo & Devices (1 Col) */}
        <div className="bg-surface border border-border rounded-xl p-5 sm:p-6 flex flex-col gap-5 shadow-xs">
          <div>
            <h3 className="text-sm sm:text-base font-display font-bold text-text-primary">
              Top Visitor Locations
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Breakdown by country / IP origin
            </p>
          </div>

          <div className="space-y-3">
            {(geography || []).length === 0 ? (
              <div className="text-xs text-text-muted py-4 text-center">No location records yet</div>
            ) : (
              (geography || []).map((geo) => {
                const geoPct = totalVisitorsCount > 0 ? Math.round((geo.count / totalVisitorsCount) * 100) : 0;
                return (
                  <div key={geo.country} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Globe size={13} className="text-text-muted" />
                      <span className="text-text-primary">{geo.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-text-muted">{geo.count}</span>
                      <span className="text-[11px] text-text-secondary w-8 text-right font-medium">{geoPct}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-xs font-medium text-text-primary mb-2">Device Breakdown</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(devices || []).map((d) => (
                <div key={d.device} className="p-2.5 rounded-lg bg-surface-elevated/40 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    {d.device.toLowerCase() === 'mobile' ? <Smartphone size={13} /> : <Monitor size={13} />}
                    <span className="capitalize">{d.device}</span>
                  </div>
                  <span className="font-bold text-text-primary font-mono">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Sessions & Lead Records Table */}
      <div className="bg-surface border border-border rounded-xl shadow-xs overflow-hidden flex flex-col">
        {/* Table Header / Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-display font-bold text-text-primary">
              Visitor Sessions &amp; Inquiries
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Live log of visiting clients, their progress, and interactions
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search location or lead..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-surface-elevated/40 border border-border rounded-lg text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Status Filter Tabs (Minimal outline buttons, no rounded-full badges) */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden p-0.5 bg-surface">
              {[
                { key: 'ALL', label: 'All' },
                { key: 'COMPLETED', label: 'Completed Tour' },
                { key: 'WHATSAPP', label: 'WhatsApp Leads' },
                { key: 'CHATTED', label: 'Asked Questions' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors rounded-md ${
                    statusFilter === tab.key
                      ? 'bg-surface-elevated text-text-primary font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-xs">
            <thead>
              <tr className="text-left text-text-muted uppercase text-[10px] tracking-wider bg-surface-elevated/30">
                <th className="py-3 px-4">Visitor / Location</th>
                <th className="py-3 px-4">Device</th>
                <th className="py-3 px-4">Walkthrough Progress</th>
                <th className="py-3 px-4">Satisfaction &amp; Feedback</th>
                <th className="py-3 px-4">WhatsApp Contact</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Inquiries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-text-primary">
              {filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted">
                    No visitor sessions matching the current filter.
                  </td>
                </tr>
              ) : (
                filteredSessions.map((s) => {
                  const completedCount = (s.completedSteps || []).length;
                  const hasQuestions = s.messagesCount > 0;
                  const timeFormatted = s.lastActiveAt
                    ? new Date(s.lastActiveAt).toLocaleString('en-AE', {
                        timeZone: 'Asia/Dubai',
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : '—';

                  return (
                    <tr key={s.id} className="hover:bg-surface-elevated/20 transition-colors">
                      {/* Visitor / Location */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-text-primary">
                            {s.leadName || s.leadCompany || 'Anonymous Visitor'}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {s.city ? `${s.city}, ` : ''}{s.country || 'Unknown Location'}
                          </span>
                        </div>
                      </td>

                      {/* Device */}
                      <td className="py-3 px-4 text-text-secondary capitalize">
                        {s.deviceType || 'Desktop'}
                      </td>

                      {/* Walkthrough Progress */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              s.completedTour ? 'bg-emerald-500' : completedCount > 0 ? 'bg-primary' : 'bg-slate-300'
                            }`}
                          />
                          <span className="font-mono text-xs">
                            {completedCount} of 5 steps
                          </span>
                          {s.completedTour && (
                            <span className="text-[11px] text-emerald-600 font-semibold">
                              (Finished)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Rating & Feedback */}
                      <td className="py-3 px-4">
                        {s.satisfactionRating ? (
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1 text-amber-500 font-semibold">
                              <Star size={13} className="fill-amber-500" />
                              <span>{s.satisfactionRating} / 5</span>
                            </div>
                            {s.feedbackComment && (
                              <span className="text-[11px] text-text-secondary truncate max-w-[200px]" title={s.feedbackComment}>
                                "{s.feedbackComment}"
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-text-muted text-[11px]">No rating</span>
                        )}
                      </td>

                      {/* WhatsApp Contact */}
                      <td className="py-3 px-4">
                        {s.clickedWhatsApp ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 size={13} />
                            <span>Clicked Chat</span>
                          </span>
                        ) : (
                          <span className="text-text-muted text-[11px]">Not initiated</span>
                        )}
                      </td>

                      {/* Last Active */}
                      <td className="py-3 px-4 text-text-secondary whitespace-nowrap text-[11px]">
                        {timeFormatted}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        {hasQuestions ? (
                          <button
                            type="button"
                            onClick={() => handleViewChat(s)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface border border-border hover:bg-surface-elevated text-primary rounded-md font-semibold text-[11px] transition-colors"
                          >
                            <MessageSquare size={12} />
                            <span>{s.messagesCount} Q&amp;A</span>
                          </button>
                        ) : (
                          <span className="text-text-muted text-[11px]">None</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat Transcript Modal */}
      {selectedSessionForChat && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface border border-border rounded-2xl w-full max-w-[540px] shadow-2xl p-5 flex flex-col gap-4 animate-slide-down max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-text-primary">
                  Visitor Q&amp;A Transcript
                </h3>
                <span className="text-xs text-text-muted">
                  Session: {selectedSessionForChat.id} • {selectedSessionForChat.country || 'Unknown'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSessionForChat(null)}
                className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[220px]">
              {isLoadingChat ? (
                <div className="py-12 text-center text-xs text-text-muted">
                  Loading conversation transcript...
                </div>
              ) : chatMessages.length === 0 ? (
                <div className="py-12 text-center text-xs text-text-muted">
                  No recorded messages for this visitor.
                </div>
              ) : (
                chatMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-text-muted mb-1 px-1">
                      {m.role === 'user' ? 'Visitor Question' : 'Amin (StockFlow Guide)'}
                    </div>
                    <div
                      className={`p-3 rounded-xl text-xs max-w-[90%] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-primary text-white font-medium'
                          : 'bg-surface-elevated/80 border border-border text-text-primary'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSessionForChat(null)}
                className="px-4 py-2 border border-border bg-surface hover:bg-surface-elevated text-text-primary rounded-lg text-xs font-semibold transition-colors"
              >
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
