'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Activity, BarChart3, ShieldAlert, Sparkles, TimerReset } from 'lucide-react';
import { requestJson } from '../../lib/api';
import { departmentRecords, enterpriseMetrics, fraudFeed, formatPercent, liveSignals, sessionRecords } from '@secure-attendance/ui';
import { FeedList, MetricCard, SectionCard, StatusPill } from '../../components/console-ui';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function DashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });
  const attendance = overviewQuery.data?.attendanceRate ?? 96.4;
  const fraud = overviewQuery.data?.fraudAttempts ?? 12;
  const sessions = overviewQuery.data?.suspiciousSessions ?? 24;
  const latency = overviewQuery.data?.averageValidationMs ?? 418;

  return (
    <main className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,15,29,0.96),rgba(12,21,38,0.72))] p-8 shadow-[0_20px_80px_rgba(2,6,23,0.45)]"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-sky-300">
            <StatusPill tone="emerald">Live operations</StatusPill>
            <span>Operational trust layer</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Anti-fraud attendance intelligence for modern institutions.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            Monitor QR validity, device trust, anomaly spikes, and attendance quality from a system that feels fast, secure, and always on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {liveSignals.map((signal) => (
              <StatusPill key={signal.label} tone={signal.tone}>
                <span className="uppercase tracking-[0.3em] text-[10px] text-slate-400">{signal.label}</span>
                <span className="font-medium text-white">{signal.value}</span>
              </StatusPill>
            ))}
          </div>
        </motion.div>

        <SectionCard title="Live session pulse" eyebrow="System heartbeat" action={<TimerReset className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            {enterpriseMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} compact />
            ))}
          </div>
          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-sky-300" /> Scan freshness</span>
              <span>Rolling validation every 18 seconds</span>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className={`h-2 rounded-full ${index % 3 === 0 ? 'bg-sky-400/80' : index % 3 === 1 ? 'bg-cyan-300/70' : 'bg-slate-600/60'}`} />
              ))}
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Attendance integrity" value={formatPercent(attendance)} delta="Up from previous cycle" tone="emerald" />
        <MetricCard label="Fraud attempts blocked" value={String(fraud)} delta="Live threat response" tone="rose" />
        <MetricCard label="Active sessions" value={String(sessions)} delta="Refreshing QR states" tone="cyan" />
        <MetricCard label="Median validation" value={`${latency} ms`} delta="Within secure SLA" tone="amber" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="Live attendance heatmap" eyebrow="Classroom density" action={<Sparkles className="h-4 w-4" />}>
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 64 }).map((_, index) => {
              const intensity = index % 7;
              return <div key={index} className={`aspect-square rounded-xl border border-white/5 ${intensity < 2 ? 'bg-slate-800/70' : intensity < 4 ? 'bg-sky-500/35' : intensity < 6 ? 'bg-cyan-400/55' : 'bg-emerald-400/70'}`} />;
            })}
          </div>
        </SectionCard>

        <SectionCard title="Fraud detection feed" eyebrow="Threat intelligence" action={<ShieldAlert className="h-4 w-4" />}>
          <FeedList items={fraudFeed} />
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Real-time session monitor" eyebrow="QR sessions" action={<TimerReset className="h-4 w-4" />}>
          <div className="space-y-3">
            {sessionRecords.map((session) => (
              <div key={session.name} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{session.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{session.scans} scans · Trust score {session.trust}%</p>
                  </div>
                  <StatusPill tone={session.status === 'live' ? 'emerald' : session.status === 'refreshing' ? 'amber' : 'rose'}>{session.status}</StatusPill>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${session.trust}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Department comparison" eyebrow="Institution health" action={<BarChart3 className="h-4 w-4" />}>
          <div className="space-y-4">
            {departmentRecords.map((department) => (
              <div key={department.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{department.name}</span>
                  <span>{department.attendance}% attendance</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" style={{ width: `${department.attendance}%` }} />
                </div>
                <p className="text-xs text-slate-500">Risk index {department.risk}/100</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
