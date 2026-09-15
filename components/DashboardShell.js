'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import DashboardNav from '@/components/DashboardNav';
import GlobalSearch from '@/components/GlobalSearch';
import PushSubscriptionBtn from '@/components/PushSubscriptionBtn';
import Logo from '@/components/Logo';
import DemoGuideModal from '@/components/DemoGuideModal';
import { PanelLeftClose, PanelLeftOpen, LogOut, Menu, X, Loader2, BookOpen } from 'lucide-react';
import TourTriggerButton from '@/components/tour/TourTriggerButton';

export default function DashboardShell({ user, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDemoGuide, setShowDemoGuide] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();

  // Listen for global open-demo-guide event from any module banner
  useEffect(() => {
    const handleOpenGuide = () => setShowDemoGuide(true);
    window.addEventListener('open-demo-guide', handleOpenGuide);
    return () => window.removeEventListener('open-demo-guide', handleOpenGuide);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    // Clear demo access cookie
    document.cookie = "stockflow_demo_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Show a brief message before redirecting
    setTimeout(() => {
      signOut({ callbackUrl: '/login' });
    }, 800); // Give user time to see the "Signing out..." message
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col bg-background text-text-primary relative">
      {/* Top Live Demo Quick Bar */}
      <div className="bg-slate-900 text-white px-3 sm:px-5 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs border-b border-slate-800 z-50 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold truncate">StockFlow Live Demo</span>
          <span className="text-slate-400 hidden md:inline">• Exploring actual warehouse management software</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowDemoGuide(true)}
            className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold text-xs bg-amber-500/15 hover:bg-amber-500/25 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-amber-500/30 transition-colors shrink-0"
          >
            <BookOpen size={12} />
            <span className="hidden xs:inline">How This WMS Works</span>
            <span className="xs:hidden">Guide</span>
          </button>
          <Link href="/" className="text-slate-300 hover:text-white flex items-center gap-1 font-medium hover:underline text-xs shrink-0">
            <span className="hidden sm:inline">← Back to Main Site</span>
            <span className="sm:hidden">← Site</span>
          </Link>
          <a 
            href="https://wa.me/97472360418?text=Hi%20StockFlow!%20I'm%20exploring%20your%20live%20demo%20and%20want%20to%20tailor%20this%20for%20our%20warehouse."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-2.5 py-1 sm:px-3 sm:py-1 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
          >
            <span className="truncate">Tailor For My Warehouse</span>
            <span className="text-[10px] font-mono text-emerald-100 hidden sm:inline">(WhatsApp)</span>
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex relative">
        {/* Mobile Drawer Overlay */}
        {mobileOpen && (
          <div 
            onClick={() => setMobileOpen(false)} 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          />
        )}

      {/* Sidebar aside — width transitions, no overflow-hidden or transform on desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-surface z-50 flex flex-col transition-[width] duration-[130ms] ease-[cubic-bezier(0.2,0,0,1)] lg:static lg:h-full ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 h-14 sm:h-16 border-b border-border flex-shrink-0">
          <div className="flex items-center min-w-0">
            {/* Full logo — fades */}
            <div className={`flex items-center transition-opacity duration-150 ${(!collapsed || mobileOpen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ position: (!collapsed || mobileOpen) ? 'relative' : 'absolute' }}>
              <Logo size={26} />
            </div>
            {/* Compact logo — fades */}
            <div className={`transition-opacity duration-150 ${(!collapsed || mobileOpen) ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 mx-auto'}`}>
              <Logo size={26} showWordmark={false} />
            </div>
          </div>
          
          {/* Collapse sidebar trigger */}
          <div className="hidden lg:flex flex-shrink-0">
            <div className="has-tooltip">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center p-1.5 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
                type="button"
              >
                <span className="sr-only">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
                {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
              <span className="tooltip-box tooltip-right">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
            </div>
          </div>
          
          {/* Close mobile drawer */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex items-center justify-center p-1.5 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation list */}
        <div className={`sidebar-nav flex-1 overflow-y-auto py-4 px-3 transition-[padding] duration-[130ms] ease-[cubic-bezier(0.2,0,0,1)] ${collapsed && !mobileOpen ? 'px-2' : 'px-3'}`}>
          <DashboardNav collapsed={collapsed && !mobileOpen} />
        </div>

        {/* User Info footer inside sidebar */}
        <div className="sidebar-footer p-4 border-t border-border flex items-center justify-between gap-2 bg-surface-elevated/30 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className={`flex flex-col min-w-0 transition-opacity duration-200 ${(!collapsed || mobileOpen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-xs font-semibold text-text-primary truncate whitespace-nowrap">{user?.name}</span>
              <span className="text-[10px] text-text-secondary truncate whitespace-nowrap">Administrator</span>
            </div>
          </div>
          <div className={`transition-opacity duration-200 ${(!collapsed || mobileOpen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="has-tooltip">
              <button 
                type="button" 
                onClick={() => setShowLogoutModal(true)}
                className="p-2 rounded-md hover:bg-danger/10 hover:text-danger text-text-secondary transition-colors"
                aria-label="Sign Out"
              >
                <LogOut size={15} />
              </button>
              <span className="tooltip-box">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto border-l border-border">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 sm:gap-4 h-14 sm:h-16 px-3 sm:px-6 bg-surface/85 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 h-full">
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors flex-shrink-0" 
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1 min-w-0 h-full flex items-center">
              <GlobalSearch />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 h-full">
            {/* Tour Launcher Trigger */}
            <TourTriggerButton />

            {/* Demo Guide Launcher */}
            <button
              type="button"
              onClick={() => setShowDemoGuide(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border hover:bg-surface-elevated text-text-secondary hover:text-text-primary rounded-lg text-xs font-semibold transition-colors"
            >
              <BookOpen size={13} />
              <span className="hidden md:inline">How It Works</span>
              <span className="md:hidden">Guide</span>
            </button>

            <PushSubscriptionBtn />
            <div className="hidden sm:block h-6 w-px bg-border" />
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="text-sm font-medium text-text-primary">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page children wrapped in standard container */}
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-[380px] shadow-2xl flex flex-col gap-4 animate-slide-down">
            <div className="flex flex-col gap-1.5 text-center sm:text-left">
              <h3 className="font-display font-extrabold text-base text-text-primary">
                {isSigningOut ? 'Signing Out...' : 'Confirm Sign Out'}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {isSigningOut 
                  ? 'Please wait while we securely sign you out...' 
                  : 'Are you sure you want to sign out? You will need to enter your admin credentials again to access the portal.'
                }
              </p>
            </div>
            
            {!isSigningOut && (
              <div className="flex gap-2.5 mt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 sm:flex-initial px-4 py-2 border border-border hover:bg-surface-elevated text-text-secondary hover:text-text-primary rounded-lg text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-danger hover:bg-danger-hover text-white rounded-lg text-xs font-bold shadow-md transition-colors inline-flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {isSigningOut && (
              <div className="flex items-center justify-center gap-2 mt-2 text-primary">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-xs font-semibold">Signing out...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Demo Playbook Modal */}
      <DemoGuideModal 
        isOpen={showDemoGuide} 
        onClose={() => setShowDemoGuide(false)} 
      />

      </div>
    </div>
  );
}
