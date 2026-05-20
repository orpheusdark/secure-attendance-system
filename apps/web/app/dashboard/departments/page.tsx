import { Building2 } from 'lucide-react';
import { departmentRecords } from '@secure-attendance/ui';
import { SectionCard } from '../../../components/console-ui';

export default function DepartmentsPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Departments" eyebrow="Institution comparison" action={<Building2 className="h-4 w-4" />}>
        <div className="space-y-4">
          {departmentRecords.map((department) => (
            <div key={department.name} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{department.name}</span>
                <span>{department.attendance}% attendance</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" style={{ width: `${department.attendance}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}