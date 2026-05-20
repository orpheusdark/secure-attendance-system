'use client';

import { useQuery } from '@tanstack/react-query';
import { BadgeCheck, Clock3, TrendingUp } from 'lucide-react';
import { requestJson } from '../../../lib/api';
import { MetricCard, SectionCard, StatusPill } from '../../../components/console-ui';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function StudentDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['student-overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  const stats = [
    { label: 'Attendance streak', value: '12 days', tone: 'emerald' as const },
    { label: 'Current GPA impact', value: 'None', tone: 'cyan' as const },
    { label: 'Last marked present', value: '2 hours ago', tone: 'amber' as const },
    { label: 'Absences this term', value: '3', tone: 'rose' as const },
  ];

  const warnings = [
    { type: 'info', message: 'Biometric verification successful in your last 5 sessions.' },
    { type: 'warning', message: 'Your attendance is below 75% threshold in one subject.' },
  ];

  return (
    <main className="space-y-8">
      <SectionCard title="Student trust profile" eyebrow="Personal attendance intelligence" action={<BadgeCheck className="h-4 w-4" />}>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          See your presence streak, class risk, and live verification state in a layout that prioritizes clarity over clutter.
        </p>
      </SectionCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <MetricCard key={stat.label} label={stat.label} value={stat.value} delta="Updated in real time" tone={stat.tone} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
        <SectionCard title="Live verification notes" eyebrow="Trust signals">
          <div className="space-y-3 text-sm leading-7 text-slate-300">
            {warnings.map((warning) => (
              <div key={warning.message} className={`rounded-[20px] border px-4 py-3 ${warning.type === 'warning' ? 'border-amber-400/20 bg-amber-400/10 text-amber-100' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'}`}>
                {warning.message}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Presence ring" eyebrow="Attendance integrity">
          <div className="flex items-center gap-5">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-sky-400/20 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.3),rgba(15,23,42,0.9)_62%)] text-center">
              <div>
                <p className="text-4xl font-semibold text-white">96%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.35em] text-slate-400">Current rate</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Verification channel: biometric + device trust</p>
              <p>Class risk: low</p>
              <StatusPill tone="emerald">Identity confirmed</StatusPill>
            </div>
          </div>
        </SectionCard>
      </section>

      <SectionCard title="Student snapshot" eyebrow="API-backed overview">
        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard label="Attendance rate" value={`${overviewQuery.data?.attendanceRate ?? '—'}%`} delta="Platform overview" tone="emerald" />
          <MetricCard label="Risk count" value={String(overviewQuery.data?.fraudAttempts ?? '—')} delta="Anomaly tracking" tone="rose" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
          <StatusPill tone="emerald"><Clock3 className="h-3.5 w-3.5" /> Last checked in 2h ago</StatusPill>
          <StatusPill tone="cyan"><TrendingUp className="h-3.5 w-3.5" /> Attendance trend improving</StatusPill>
        </div>
      </SectionCard>
    </main>
  );
}