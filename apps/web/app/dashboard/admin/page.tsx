'use client';

import { useQuery } from '@tanstack/react-query';
import { requestJson } from '../../../lib/api';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function AdminDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['admin-overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  const managementActions = [
    { title: 'Audit Logs', description: 'Review all system events and access records', icon: '📋' },
    { title: 'User Management', description: 'Create, modify, or suspend user accounts', icon: '👥' },
    { title: 'Fraud Rules', description: 'Configure fraud detection thresholds', icon: '⚙️' },
    { title: 'Reports', description: 'Generate institution-wide compliance reports', icon: '📊' },
  ];

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Platform administration</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Institution operations</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Manage users, configure fraud detection, review audit logs, and generate compliance reports for your institution.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Platform attendance</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.attendanceRate ?? '—'}%</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Total fraud alerts</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.fraudAttempts ?? '—'}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Sessions monitored</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.suspiciousSessions ?? '—'}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm text-slate-400">Avg response time</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overviewQuery.data?.averageValidationMs ?? '—'} ms</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {managementActions.map((action) => (
          <div key={action.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <p className="text-3xl">{action.icon}</p>
            <h3 className="mt-2 font-semibold text-white">{action.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{action.description}</p>
          </div>
        ))}
      </section>
    </main>
  );

