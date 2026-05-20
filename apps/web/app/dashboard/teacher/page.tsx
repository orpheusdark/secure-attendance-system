'use client';

import { useQuery } from '@tanstack/react-query';
import { requestJson } from '../../../lib/api';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function TeacherDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['teacher-overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  const actions = [
    { title: 'Create Session', description: 'Start a new attendance session with dynamic QR code', color: 'cyan' },
    { title: 'Refresh QR', description: 'Generate a fresh rolling token for active sessions', color: 'emerald' },
    { title: 'View Fraud Alerts', description: 'Review suspicious activity from your sessions', color: 'amber' },
    { title: 'Export Report', description: 'Download attendance records and analytics', color: 'violet' },
  ];

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Teacher command</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Manage your sessions</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Create attendance sessions, monitor real-time scans, and review fraud detection reports from your classroom or training venue.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Attendance rate</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.attendanceRate ?? '—'}%</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Fraud attempts</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.fraudAttempts ?? '—'}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Suspicious sessions</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.suspiciousSessions ?? '—'}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Avg validation time</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.averageValidationMs ?? '—'} ms</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <div key={action.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <h3 className="font-semibold text-white">{action.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{action.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
