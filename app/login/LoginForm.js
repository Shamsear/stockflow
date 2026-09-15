'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { FlagQatar, FlagUAE } from '@/components/Flags';
import { 
  Lock, 
  User, 
  Loader2, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Package, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  MessageCircle, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('demo_admin');
  const [password, setPassword] = useState('stockflow2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEnterDemo = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    // Immediately establish demo access cookie for server-side route guards
    document.cookie = "stockflow_demo_access=true; path=/; max-age=86400; SameSite=Lax";

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: username || 'demo_admin',
        password: password || 'stockflow2026',
      });

      if (result?.error && username !== 'demo_admin' && username !== 'demo') {
        setError('Invalid credentials. You can enter with the pre-filled demo account.');
        setLoading(false);
        return;
      }

      // Full navigation guarantees cookies are evaluated fresh by server components
      window.location.href = '/dashboard';
    } catch (err) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row items-stretch bg-white">
      
      {/* ═══════ LEFT: StockFlow Identity & Value Panel (Desktop / Large Displays Only) ═══════ */}
      <div className="hidden lg:flex lg:w-[50%] xl:w-[52%] flex-1 self-stretch flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-gradient-to-br from-slate-950 via-[#0F172A] to-[#0D3B37] text-white relative overflow-hidden">
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="25%" x2="100%" y2="25%" stroke="white" strokeWidth="1" strokeDasharray="8,12" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="8,12" />
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="white" strokeWidth="1" strokeDasharray="8,12" />
            <line x1="25%" y1="0" x2="25%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="8,12" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="8,12" />
            <line x1="75%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="8,12" />
          </svg>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-teal-500/[0.08] blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-56 h-56 rounded-full bg-emerald-500/[0.1] blur-[70px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Logo size={36} />
            </Link>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/80 font-medium">
              <span className="flex items-center gap-1"><FlagQatar className="w-4 h-3" /> Qatar</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FlagUAE className="w-4 h-3" /> UAE</span>
            </div>
          </div>

          <div className="mt-8 lg:mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE LIVE DEMO</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
              Test Drive Your <br />
              Tailor-Made Warehouse WMS.
            </h1>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-md">
              Explore real-time stock control, dock-to-shelf inbounds, FEFO expiry tracking, and dispatch configured for GCC operations.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 my-6 lg:my-8 flex flex-col gap-3">
          {[
            { icon: ArrowDownLeft, text: 'Inbound Verification & Bay Allocation', color: 'text-emerald-400' },
            { icon: Clock, text: 'FEFO Expiry Date & Batch Traceability', color: 'text-amber-400' },
            { icon: ArrowUpRight, text: '1-Tap Outbound Pick Lists & Delivery Slips', color: 'text-teal-300' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon size={16} />
              </div>
              <span className="text-xs sm:text-sm text-slate-200 font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-white font-bold text-sm sm:text-base block font-mono">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Tailor-Made</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-white font-bold text-sm sm:text-base block font-mono">3-5 Days</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Rapid Setup</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-white font-bold text-sm sm:text-base block font-mono">Qatar & UAE</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Local Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ RIGHT: StockFlow Compact Demo Login Panel ═══════ */}
      <div className="w-full lg:w-[50%] xl:w-[48%] flex-1 min-h-screen self-stretch flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 xl:p-16 bg-white relative">
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #0F172A 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 w-full max-w-[380px] flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-brand-800 text-[10px] font-bold rounded-full tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
              Live Demo Sandbox
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight">
              StockFlow Live Demo Portal
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
              Test drive all 17+ modules with pre-loaded warehouse products and records.
            </p>
          </div>

          {/* Form with Pre-Filled Credentials */}
          <form onSubmit={handleEnterDemo} className="flex flex-col gap-3.5">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-2.5 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700">Demo Username</label>
                <span className="text-[10px] font-mono text-brand-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  Pre-filled
                </span>
              </div>
              <div className="relative flex items-center">
                <User size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  className="w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-mono focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700">Demo Password</label>
                <span className="text-[10px] font-mono text-brand-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  Pre-filled
                </span>
              </div>
              <div className="relative flex items-center">
                <Lock size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl pl-9 pr-10 py-2 text-xs font-mono focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              data-tour="login-submit-btn"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-1 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-all shadow hover:shadow-md cursor-pointer group"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Entering Demo Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Enter Live Demo Dashboard</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 flex items-center gap-2 text-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>1-Click access. No registration required to explore.</span>
          </div>

          {/* Return Links & Contact */}
          <div className="pt-2 border-t border-slate-100 flex flex-col items-center gap-2 text-xs text-center">
            <Link href="/" className="font-semibold text-brand-800 hover:text-brand-950 flex items-center gap-1 underline underline-offset-4">
              ← Return to StockFlow Landing Page
            </Link>
            
            <a
              href="https://wa.me/97472360418?text=Hi%20StockFlow%20team,%20I'm%20exploring%20your%20live%20demo%20and%20have%20a%20few%20questions."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center gap-1 mt-0.5 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Questions? Chat on WhatsApp (+974 7236 0418)</span>
            </a>
          </div>

          {/* Attribution */}
          <div className="text-center text-[10px] text-slate-400">
            © {new Date().getFullYear()} StockFlow WMS. Built for Qatar & UAE logistics operations.
          </div>
        </div>
      </div>
    </div>
  );
}
