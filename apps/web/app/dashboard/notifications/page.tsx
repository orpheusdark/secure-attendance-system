import { BellRing } from 'lucide-react';
import { SectionCard, StatusPill } from '../../../components/console-ui';

const notifications = [
  { title: 'Attendance threshold reached', detail: 'Business cohort 2 moved past 95% attendance.', tone: 'emerald' as const },
  { title: 'Fraud watch alert', detail: 'Two replay attempts blocked from unmanaged devices.', tone: 'rose' as const },
  { title: 'QR refresh completed', detail: 'Session board refreshed successfully in Hall A.', tone: 'cyan' as const },
];

export default function NotificationsPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Notifications" eyebrow="Live notification layer" action={<BellRing className="h-4 w-4" />}>
        <div className="space-y-3">
          {notifications.map((item) => (
            <div key={item.title} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{item.title}</p>
                <StatusPill tone={item.tone}>{item.tone}</StatusPill>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}