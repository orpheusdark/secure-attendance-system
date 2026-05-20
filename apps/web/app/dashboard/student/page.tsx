'use client';

import { useQuery } from '@tanstack/react-query';
import { requestJson } from '../../../lib/api';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function StudentDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['student-overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  const stats = [
    { label: 'Attendance streak', value: '12 days' },
    { label: 'Current GPA impact', value: 'None' },
    { label: 'Last marked present', value: '2 hours ago' },
    { label: 'Absences this term', value: '3' },
  ];

  const warnings = [
    { type: 'info', message: 'Biometric verification successful in your last 5 sessions.' },
    { type: 'warning', message: 'Your attendance is below 75% threshold in one subject.' },
  ];

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Your attendance</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Track your presence</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          View your attendance record, current streaks, and any warnings. Your biometric verification keeps you fraud-proof.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        {warnings.map((warning, idx) => (
          <div key={idx} className={`rounded-[28px] border p-6 ${
            warning.type === 'warning'
              ? 'border-amber-400/20 bg-amber-400/10'
              : 'border-cyan-400/20 bg-cyan-400/10'
          }`}>
            <p className={warning.type === 'warning' ? 'text-amber-200' : 'text-cyan-200'}>{warning.message}</p>
          </div>
        ))}
      </section>
    </main>
  );

