import { TimerReset, Shield, ScanFace } from 'lucide-react';
import { sessionRecords } from '@secure-attendance/ui';
import { MetricCard, SectionCard, StatusPill } from '../../../components/console-ui';

export default function SessionsPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="QR sessions" eyebrow="Live token boards" action={<TimerReset className="h-4 w-4" />}>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Live boards" value="24" delta="Rolling tokens active" tone="cyan" />
          <MetricCard label="Scan throughput" value="1.8k" delta="Across the last hour" tone="emerald" />
          <MetricCard label="Token health" value="99.8%" delta="No critical drift" tone="amber" />
        </div>
      </SectionCard>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Session queue" eyebrow="Operational QR state" action={<Shield className="h-4 w-4" />}>
          <div className="space-y-3">
            {sessionRecords.map((session) => (
              <div key={session.name} className="rounded-[22px] glass p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{session.name}</p>
                    <p className="mt-1 text-sm muted">{session.scans} scans · {session.trust}% trust</p>
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

        <SectionCard title="Live QR panel" eyebrow="Session health" action={<ScanFace className="h-4 w-4" />}>
          <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">QR refresh timer</p>
            <p className="mt-4 text-5xl font-semibold text-white">18s</p>
            <p className="mt-3 text-sm leading-7 text-cyan-100/90">Encrypted token rotating, scan waves active, session trust at 97%.</p>
          </div>
        </SectionCard>
      </section>
    </main>
  );
}