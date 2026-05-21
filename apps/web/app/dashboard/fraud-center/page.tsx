import { ShieldAlert, TriangleAlert } from 'lucide-react';
import { fraudFeed } from '@secure-attendance/ui';
import { FeedList, MetricCard, SectionCard } from '../../../components/console-ui';

export default function FraudCenterPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Fraud center" eyebrow="Security intelligence">
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Threat level" value="Moderate" delta="Two critical anomalies flagged" tone="rose" compact />
          <MetricCard label="Trust score" value="94/100" delta="Institution-wide stability" tone="emerald" compact />
          <MetricCard label="Replay attempts" value="6" delta="Blocked in last 24h" tone="amber" compact />
        </div>
      </SectionCard>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Suspicious attempts" eyebrow="Threat feed" action={<ShieldAlert className="h-4 w-4" />}>
          <FeedList items={fraudFeed} />
        </SectionCard>

        <SectionCard title="Anomaly timeline" eyebrow="Escalation trail" action={<TriangleAlert className="h-4 w-4" />}>
          <div className="space-y-4">
            {['GPS drift at 08:42', 'Replay token at 09:11', 'Face mismatch at 09:27', 'Trust restored at 09:41'].map((item, index) => (
              <div key={item} className="flex items-start gap-4 rounded-[22px] glass p-4">
                <div className="mt-1 h-3 w-3 rounded-full accent" />
                <div>
                  <p className="font-medium text-white">{item}</p>
                  <p className="mt-1 text-sm muted">Event {index + 1} routed through anti-fraud intelligence.</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </main>
  );
}