'use client';

import { useQuery } from '@tanstack/react-query';
import { Settings2, ShieldAlert } from 'lucide-react';
import { requestJson } from '../../../lib/api';
import { MetricCard, SectionCard, StatusPill } from '../../../components/console-ui';

type Overview = {
  attendanceRate: number;
  fraudAttempts: number;
  suspiciousSessions: number;
  averageValidationMs: number;
};

export default function AdminDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['admin-overview'], queryFn: () => requestJson<Overview>('/analytics/overview') });

  const managementActions = [
    { title: 'Audit logs', description: 'Review every system event and access record.', tone: 'cyan' as const },
    { title: 'User management', description: 'Create, modify, or suspend user accounts.', tone: 'emerald' as const },
    { title: 'Fraud rules', description: 'Adjust detection thresholds and escalation behavior.', tone: 'amber' as const },
    { title: 'Reports', description: 'Generate signed compliance reports for leadership.', tone: 'rose' as const },
  ];

  return (
    <main className="space-y-8">
      <SectionCard title="Institution operations" eyebrow="Platform administration" action={<Settings2 className="h-4 w-4" />}>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          Centralize users, policies, audit logs, fraud rules, and compliance reporting in a visual system designed for operational trust.
        </p>
      </SectionCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Platform attendance" value={`${overviewQuery.data?.attendanceRate ?? '—'}%`} delta="System-wide validity" tone="emerald" />
        <MetricCard label="Total fraud alerts" value={String(overviewQuery.data?.fraudAttempts ?? '—')} delta="Threat radar output" tone="rose" />
        <MetricCard label="Sessions monitored" value={String(overviewQuery.data?.suspiciousSessions ?? '—')} delta="Live boards online" tone="cyan" />
        <MetricCard label="Avg response time" value={`${overviewQuery.data?.averageValidationMs ?? '—'} ms`} delta="Operations SLA" tone="amber" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {managementActions.map((action) => (
          <SectionCard key={action.title} title={action.title} eyebrow="Admin control" action={<StatusPill tone={action.tone}>{action.title}</StatusPill>}>
            <p className="text-sm leading-7 text-slate-400">{action.description}</p>
          </SectionCard>
        ))}
      </section>

      <SectionCard title="Compliance shield" eyebrow="Institution safeguards" action={<ShieldAlert className="h-4 w-4" />}>
        <p className="max-w-3xl text-sm leading-7 text-slate-400">
          Every action is logged, every role change is auditable, and fraud policy adjustments remain traceable across the institution.
        </p>
      </SectionCard>
    </main>
  );
}