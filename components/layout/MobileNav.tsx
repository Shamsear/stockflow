'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, MonitorPlay } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const [isShrunk, setIsShrunk] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  // Suppress on dashboard, login, scan-companion, and pdf-preview
  if (
    pathname?.startsWith('/dashboard') ||
    pathname === '/login' ||
    pathname?.startsWith('/scan-companion') ||
    pathname?.startsWith('/pdf-preview')
  ) {
    return null;
  }

  const whatsAppUrl =
    'https://wa.me/97472360418?text=' +
    encodeURIComponent('Hi StockFlow! I\'d like to discuss a custom warehouse dashboard setup for our operations.');

  // 1. Virtual Keyboard Offset Listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleViewportChange = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.getAttribute('contenteditable') === 'true');

      if (!isInputFocused) {
        setKeyboardOffset(0);
        return;
      }
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardOffset(offset > 50 ? offset : 0);
    };

    const vv = window.visualViewport;
    vv.addEventListener('resize', handleViewportChange);
    vv.addEventListener('scroll', handleViewportChange);
    return () => {
      vv.removeEventListener('resize', handleViewportChange);
      vv.removeEventListener('scroll', handleViewportChange);
    };
  }, []);

  // 2. Auto-Shrink on Scroll Down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedDiff = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsShrunk(false);
        lastScrollY = currentScrollY;
        return;
      }
      const diff = currentScrollY - lastScrollY;
      if (diff > 0) {
        if (accumulatedDiff < 0) accumulatedDiff = 0;
        accumulatedDiff += diff;
        if (accumulatedDiff > 20) setIsShrunk(true);
      } else {
        if (accumulatedDiff > 0) accumulatedDiff = 0;
        accumulatedDiff += diff;
        if (accumulatedDiff < -20) setIsShrunk(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`md:hidden fixed left-3 right-3 z-[1001] rounded-2xl border bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-float px-3 py-2 transition-all duration-300 origin-bottom ${
        isShrunk ? 'scale-90 opacity-60 translate-y-2' : 'scale-100 opacity-100 translate-y-0'
      }`}
      style={{
        bottom:
          keyboardOffset > 0
            ? `${keyboardOffset + 8}px`
            : 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Left: Direct WhatsApp Action */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Center: StockFlow Logo (WhatsApp Profile Image - No Text) */}
        <div className="flex items-center justify-center shrink-0">
          <Link
            href="/"
            className="flex items-center justify-center p-0.5 rounded-full hover:scale-105 transition-transform focus:outline-none ring-2 ring-emerald-500/20"
            aria-label="StockFlow Home"
          >
            <Image
              src="/stockflow-whatsapp-profile.png"
              alt="StockFlow"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover shadow-xs"
              priority
            />
          </Link>
        </div>

        {/* Right: Live Demo Sandbox Entry */}
        <Link
          href="/login"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 active:bg-slate-950 text-white font-bold text-xs transition-colors shadow-xs shrink-0"
        >
          <MonitorPlay className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Live Demo</span>
        </Link>
      </div>
    </nav>
  );
}
