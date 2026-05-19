'use client';

import { useQuery } from '@tanstack/react-query';
import { requestJson } from '../../../lib/api';

export default function AdminDashboardPage() {
  const overviewQuery = useQuery({ queryKey: ['admin-overview'], queryFn: () => requestJson<Record<string, number>>('/analytics/overview') });

  return (
    <main className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-semibold text-white">Admin operations</h1>
      <p className="mt-2 text-slate-400">
        {overviewQuery.data ? 'Platform analytics loaded from the API.' : 'Institution management, audit logs, and platform-wide analytics.'}
      </p>
    </main>
  );
}
