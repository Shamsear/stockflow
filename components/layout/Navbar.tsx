'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { MessageCircle, ChevronDown, MonitorPlay } from 'lucide-react';
import { FlagQatar, FlagUAE } from '@/components/Flags';

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdownItems?: NavDropdownItem[];
}

const PUBLIC_NAV_ITEMS: NavItem[] = [
  {
    label: 'Capabilities',
    href: '#features',
    dropdownItems: [
      { label: 'Inbound Receiving', href: '#features' },
      { label: 'FEFO Expiry & Batch Alerts', href: '#features' },
      { label: 'Driver Pick Lists & POD', href: '#features' },
      { label: 'Live Bay & Stock Sync', href: '#features' },
    ],
  },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const whatsAppUrl =
    'https://wa.me/97472360418?text=' +
    encodeURIComponent('Hi StockFlow team! I\'d like to discuss a custom warehouse dashboard setup for our operations.');

  // 1. Scroll listener to expand / collapse navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Close dropdowns on route changes
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // 3. Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => !ref || !ref.contains(target)
      );
      if (isOutside) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Route suppression for dashboard, login, scan companion, and pdf preview
  if (
    pathname?.startsWith('/dashboard') ||
    pathname === '/login' ||
    pathname?.startsWith('/scan-companion') ||
    pathname?.startsWith('/pdf-preview')
  ) {
    return null;
  }

  const isActiveLink = (href: string) => {
    if (href.startsWith('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isActiveDropdown = (items: NavDropdownItem[]) => {
    return items.some((item) => isActiveLink(item.href));
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50 hidden md:block w-[95%] max-w-6xl transition-all duration-300 ${
        isScrolled ? 'top-3 max-w-[88%]' : 'top-5'
      }`}
    >
      <nav
        className={`rounded-2xl transition-all duration-300 border ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-emerald-500/25 shadow-[0_10px_30px_rgba(16,185,129,0.12)] shadow-black/5'
            : 'bg-white/65 backdrop-blur-md border-slate-200/90 shadow-sm shadow-emerald-500/5'
        }`}
      >
        <div
          className="px-6 flex justify-between items-center relative transition-all duration-300"
          style={{ height: isScrolled ? '54px' : '64px' }}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center group gap-3 shrink-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-xs bg-white ring-2 ring-emerald-500/20 flex items-center justify-center p-0.5">
              <Image
                src="/stockflow-whatsapp-profile.png"
                alt="StockFlow"
                width={36}
                height={36}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-navy-900 leading-none tracking-tight">
                Stock<span className="text-brand-700">Flow</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-none mt-1">
                Qatar & UAE WMS
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-1">
            {PUBLIC_NAV_ITEMS.map((item) => {
              if (item.dropdownItems) {
                const active = isActiveDropdown(item.dropdownItems);
                const isOpen = openDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    ref={(el) => {
                      dropdownRefs.current[item.label] = el;
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className={`relative z-10 px-3 py-2 transition-all duration-200 rounded-lg flex items-center gap-1 font-semibold text-xs sm:text-sm group cursor-pointer ${
                        active || isOpen ? 'text-emerald-700 font-bold' : 'text-slate-700 hover:text-emerald-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`absolute inset-0 bg-emerald-500/10 rounded-lg transition-all duration-200 -z-10 ${
                          active || isOpen
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                        }`}
                      />
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-emerald-700' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl py-2 z-50 border border-slate-200/90 animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.dropdownItems.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors rounded-xl mx-1.5"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const active = isActiveLink(item.href || '');
              return (
                <a
                  key={item.label}
                  href={item.href || '#'}
                  className={`relative z-10 px-3 py-2 transition-all duration-200 rounded-lg font-semibold text-xs sm:text-sm group ${
                    active ? 'text-emerald-700 font-bold' : 'text-slate-700 hover:text-emerald-700'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-0 bg-emerald-500/10 rounded-lg transition-all duration-200 -z-10 ${
                      active
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs transition-all border border-slate-200 shadow-2xs"
            >
              <MonitorPlay className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Live Demo</span>
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs hover:shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
              </span>
              <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
