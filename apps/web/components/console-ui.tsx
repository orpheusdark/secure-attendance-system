'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeftRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  LayoutDashboard,
  Menu,
  Shield,
  Sparkles,
  UserCircle2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn, consoleNavigation, FeedItem, LiveSignal } from '@secure-attendance/ui';

const toneClasses = {
  emerald: 'pill-emerald border-transparent',
  cyan: 'pill-cyan border-transparent',
  amber: 'pill-amber border-transparent',
  rose: 'pill-rose border-transparent',
} as const;

export function StatusPill({ tone, children }: { tone: keyof typeof toneClasses | LiveSignal['tone']; children: React.ReactNode }) {
  return <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs backdrop-blur-xl', toneClasses[tone])}>{children}</div>;
}

export function SectionCard({
  title,
  eyebrow,
  children,
  action,
  className,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-[32px] p-6 card', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h2>
        </div>
        {action ? <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300" aria-hidden="true">{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function MetricCard({ label, value, delta, tone, compact }: { label: string; value: string; delta: string; tone: keyof typeof toneClasses; compact?: boolean }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 280, damping: 20 }} className={cn('rounded-[28px] p-5 shadow-[0_16px_50px_rgba(2,6,23,0.22)]', toneClasses[tone], compact ? 'min-h-[150px]' : 'min-h-[172px]')}>
      <p className="text-xs uppercase tracking-[0.34em] text-slate-400">{label}</p>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{delta}</p>
    </motion.div>
  );
}

export function FeedList({ items }: { items: FeedItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-white">{item.title}</p>
            <span className={cn('rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.3em]', item.severity === 'high' ? 'bg-rose-400/15 text-rose-200' : item.severity === 'medium' ? 'bg-amber-400/15 text-amber-200' : 'bg-emerald-400/15 text-emerald-200')}>
              {item.severity}
            </span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.34em] text-slate-500">{item.time}</p>
        </div>
      ))}
    </div>
  );
}

export function PageChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const active = useMemo(() => consoleNavigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ?? consoleNavigation[0]!, [pathname]);

  return (
    <div className="min-h-screen px-4 py-4 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-6 xl:grid-cols-[auto_1fr]">
        <aside className={cn('sticky top-4 h-[calc(100vh-2rem)] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,29,0.98),rgba(7,12,24,0.92))] backdrop-blur-xl transition-all duration-300', collapsed ? 'w-[96px]' : 'w-[308px]')}>
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/30">
                <Shield className="h-5 w-5" />
              </div>
              {!collapsed ? (
                <div>
                  <p className="text-sm font-semibold text-white">Secure Attendance</p>
                  <p className="text-xs text-slate-400">Operational trust layer</p>
                </div>
              ) : null}
            </div>
            <button className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle sidebar">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          <div className="px-4 py-4">
            <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-slate-300">
                <CircleGauge className="h-4 w-4 text-emerald-300" />
                {!collapsed ? <span className="text-sm">System health: 99.98%</span> : null}
              </div>
              {!collapsed ? <p className="mt-2 text-sm text-slate-500">All subsystems online with live validation enabled.</p> : null}
            </div>
          </div>

          <nav className="space-y-1 px-3 pb-3">
            {consoleNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link key={item.href} href={item.href as never} className={cn('group flex items-center gap-3 rounded-[22px] border px-4 py-3 text-sm transition', isActive ? 'border-sky-400/25 bg-sky-400/10 text-white shadow-[0_12px_30px_rgba(14,165,233,0.16)]' : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white')}>
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl border', isActive ? 'border-sky-400/30 bg-sky-400/15 text-sky-200' : 'border-white/10 bg-white/5 text-slate-300')}>
                    {item.label === 'Dashboard' ? <LayoutDashboard className="h-4 w-4" /> : item.label === 'Fraud Center' ? <Shield className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                  </div>
                  {!collapsed ? (
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-inherit">{item.label}</span>
                        {item.badge ? <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-300">{item.badge}</span> : null}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-6">
          <header className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,33,0.9),rgba(8,15,29,0.84))] px-5 py-4 shadow-[0_16px_50px_rgba(2,6,23,0.24)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.42em] text-slate-500">Operational header</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <StatusPill tone="emerald">Trusted online</StatusPill>
                  <StatusPill tone="cyan">{active.label}</StatusPill>
                  <StatusPill tone="amber">4 active sessions</StatusPill>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 md:flex">
                  <ArrowLeftRight className="h-4 w-4" />
                  Nexus University
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50" aria-label="Profile">
                  <UserCircle2 className="h-4 w-4" />
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 xl:hidden" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle menu">
                  <Menu className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}