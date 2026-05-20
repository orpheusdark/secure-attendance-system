'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { requestJson } from '../../../lib/api';
import { sessionRecords } from '@secure-attendance/ui';
import { MetricCard, SectionCard, StatusPill } from '../../../components/console-ui';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function TeacherDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['teacher-overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  const actions = [
    { title: 'Create secure session', description: 'Launch a rolling QR code with trust validation.', tone: 'cyan' as const },
    { title: 'Refresh live QR', description: 'Rotate tokens and reset the session timer.', tone: 'emerald' as const },
    { title: 'Review alerts', description: 'Inspect suspicious scans and spoofing patterns.', tone: 'amber' as const },
    { title: 'Export report', description: 'Download a signed attendance pack for compliance.', tone: 'rose' as const },
  ];

  return (
    <main className="space-y-8">
      <SectionCard title="Teacher command center" eyebrow="QR session orchestration" action={<PlayCircle className="h-4 w-4" />}>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          Create trusted attendance sessions, monitor rolling QR validation, and react to fraud signals without leaving the classroom.
        </p>
      </SectionCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Attendance rate" value={`${overviewQuery.data?.attendanceRate ?? '—'}%`} delta="Across active classes" tone="emerald" />
        <MetricCard label="Fraud attempts" value={String(overviewQuery.data?.fraudAttempts ?? '—')} delta="Blocked by radar" tone="rose" />
        <MetricCard label="Suspicious sessions" value={String(overviewQuery.data?.suspiciousSessions ?? '—')} delta="Under review" tone="amber" />
        <MetricCard label="Avg validation time" value={`${overviewQuery.data?.averageValidationMs ?? '—'} ms`} delta="Real-time verification" tone="cyan" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <SectionCard key={action.title} title={action.title} eyebrow="Operational action" action={<StatusPill tone={action.tone}>{action.tone}</StatusPill>}>
            <p className="text-sm leading-7 text-slate-400">{action.description}</p>
          </SectionCard>
        ))}
      </section>

      <SectionCard title="Live command strip" eyebrow="Rapid teacher actions" action={<ChevronRight className="h-4 w-4" />}>
        <div className="flex flex-wrap gap-3">
          <StatusPill tone="cyan">Start session</StatusPill>
          <StatusPill tone="emerald">Refresh QR</StatusPill>
          <StatusPill tone="amber">View warnings</StatusPill>
          <StatusPill tone="rose">Export audit</StatusPill>
        </div>
      </SectionCard>

      <SectionCard title="Live sessions" eyebrow="Active QR boards">
        <div className="grid gap-4 xl:grid-cols-2">
          {sessionRecords.map((session) => (
            <div key={session.name} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{session.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{session.scans} scans · {session.trust}% trust</p>
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
    </main>
  );
}