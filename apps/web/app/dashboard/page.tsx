'use client';

import { useQuery } from '@tanstack/react-query';
import { requestJson } from '../../lib/api';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

const metrics: Array<{ label: string; key: keyof Overview; suffix?: string }> = [
  { label: 'Attendance rate', key: 'attendanceRate', suffix: '%' },
  { label: 'Suspicious scans', key: 'fraudAttempts' },
  { label: 'Validated sessions', key: 'suspiciousSessions' },
  { label: 'Mean check latency', key: 'averageValidationMs', suffix: ' ms' },
] ;

export default function DashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Enterprise overview</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Fraud-resistant attendance operations</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Track live sessions, institution policies, device trust, QR freshness, and escalation queues from a single control plane.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {overviewQuery.data ? `${overviewQuery.data[metric.key]}${metric.suffix ?? ''}` : 'Loading...'}
            </p>
          </div>
        ))}
      </section>
      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Live attendance stream</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">API-connected overview feeds live session data into the console.</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">Fraud attempts, suspicious sessions, and timing stats are read from the API.</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">Add WebSocket subscriptions next for real-time push updates.</div>
          </div>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Risk queue</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">3 face confidence checks require manual review.</li>
            <li className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">2 devices were flagged for multi-device fraud.</li>
            <li className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">1 offline token is pending secure sync.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
