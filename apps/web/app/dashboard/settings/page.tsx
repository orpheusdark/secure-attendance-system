import { ShieldCheck } from 'lucide-react';
import { SectionCard, StatusPill } from '../../../components/console-ui';

export default function SettingsPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Settings" eyebrow="Security and preferences" action={<ShieldCheck className="h-4 w-4" />}>
        <div className="grid gap-4 md:grid-cols-2">
          {['Biometric lock', 'Trusted device list', 'QR rotation interval', 'Fraud alert sensitivity'].map((item, index) => (
            <div key={item} className="rounded-[22px] glass p-4">
              <p className="text-sm muted">{item}</p>
              <p className="mt-2 font-medium text-white">{index % 2 === 0 ? 'Enabled' : 'Configured'}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <StatusPill tone="emerald">Dark mode primary</StatusPill>
          <StatusPill tone="cyan">Security policies synced</StatusPill>
        </div>
      </SectionCard>
    </main>
  );
}