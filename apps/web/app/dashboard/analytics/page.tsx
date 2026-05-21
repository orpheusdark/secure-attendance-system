import { SectionCard, StatusPill } from '../../../components/console-ui';

const attendanceData = [91, 94, 89, 96, 97, 92, 95];
const riskData = [18, 14, 23, 11, 9, 16, 13];

export default function AnalyticsPage() {
  const maxAttendance = Math.max(...attendanceData);
  const maxRisk = Math.max(...riskData);

  return (
    <main className="space-y-8">
      <SectionCard title="Analytics" eyebrow="Institution trends">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[26px] p-4 card">
            <p className="mb-4 text-sm muted">Attendance trend</p>
            <div className="flex h-[260px] items-end gap-2">
              {attendanceData.map((value, index) => (
                <div key={index} className="flex-1 items-center">
                  <div className="flex h-[220px] items-end rounded-2xl bg-slate-900/80 p-1">
                    <div className="w-full rounded-2xl bg-gradient-to-t from-sky-500 to-emerald-400" style={{ height: `${(value / maxAttendance) * 100}%` }} />
                  </div>
                  <p className="mt-2 text-center text-xs text-slate-500">D{index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] p-4 card">
            <p className="mb-4 text-sm muted">Risk prediction</p>
            <div className="space-y-4">
              {riskData.map((value, index) => (
                <div key={index}>
                  <div className="mb-2 flex items-center justify-between text-sm muted">
                    <span>Period {index + 1}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400" style={{ width: `${(value / maxRisk) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatusPill tone="emerald">attendance trending up</StatusPill>
          <StatusPill tone="amber">risk watch active</StatusPill>
          <StatusPill tone="cyan">weekly cohort review</StatusPill>
        </div>
      </SectionCard>
    </main>
  );
}