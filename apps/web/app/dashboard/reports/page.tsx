import { FileText } from 'lucide-react';
import { SectionCard } from '../../../components/console-ui';

const reports = ['Attendance compliance pack', 'Fraud incident review', 'Department summary', 'Executive export'];

export default function ReportsPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Reports" eyebrow="Signed exports" action={<FileText className="h-4 w-4" />}>
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report) => (
            <div key={report} className="rounded-[22px] glass p-4">
              <p className="font-medium text-white">{report}</p>
              <p className="mt-2 text-sm muted">Generate a secure export with timestamps and audit metadata.</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}