import { SectionCard, StatusPill } from '../../../components/console-ui';

const rows = [
  { name: 'Amina Yusuf', device: 'Trusted iPhone', score: 98, fraud: 'None' },
  { name: 'Tariq Bello', device: 'Managed Android', score: 94, fraud: 'Low' },
  { name: 'Grace Mensah', device: 'Web fallback', score: 87, fraud: 'Medium' },
  { name: 'Ifeanyi Okafor', device: 'Biometric verified', score: 99, fraud: 'None' },
];

export default function AttendancePage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Attendance records" eyebrow="Live data grid">
        <div className="overflow-hidden rounded-[26px] card">
          <div className="grid grid-cols-[1.2fr_1fr_0.7fr_0.6fr] gap-4 border-b px-5 py-4 text-xs uppercase tracking-[0.35em] muted">
            <span>Name</span><span>Device trust</span><span>Confidence</span><span>Fraud</span>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {rows.map((row) => (
              <div key={row.name} className="grid grid-cols-[1.2fr_1fr_0.7fr_0.6fr] gap-4 px-5 py-4 text-sm muted">
                <span className="font-medium text-white">{row.name}</span>
                <span>{row.device}</span>
                <span>{row.score}%</span>
                <StatusPill tone={row.fraud === 'None' ? 'emerald' : row.fraud === 'Low' ? 'amber' : 'rose'}>{row.fraud}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </main>
  );
}