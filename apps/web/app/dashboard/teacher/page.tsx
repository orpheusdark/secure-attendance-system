'use client';

import { useQuery } from '@tanstack/react-query';
import { requestJson } from '../../../lib/api';

export default function TeacherDashboardPage() {
  const sessionQuery = useQuery({ queryKey: ['teacher-latest-session'], queryFn: () => requestJson<Record<string, unknown>>('/attendance/sessions/latest') });

  return (
    <main className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h1 className="text-3xl font-semibold text-white">Teacher command center</h1>
      <p className="mt-2 text-slate-400">
        {sessionQuery.data ? 'Latest session loaded from the API.' : 'Create attendance sessions, monitor live scans, and resolve fraud alerts.'}
      </p>
    </main>
  );
}
