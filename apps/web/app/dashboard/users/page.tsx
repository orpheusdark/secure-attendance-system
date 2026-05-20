import { Users } from 'lucide-react';
import { SectionCard, StatusPill } from '../../../components/console-ui';

const users = [
  { name: 'Amina Yusuf', role: 'Teacher', status: 'Active' },
  { name: 'Tariq Bello', role: 'Student', status: 'Flagged' },
  { name: 'Grace Mensah', role: 'Admin', status: 'Verified' },
];

export default function UsersPage() {
  return (
    <main className="space-y-8">
      <SectionCard title="Admin tools" eyebrow="User management" action={<Users className="h-4 w-4" />}>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.name} className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="mt-1 text-sm text-slate-400">{user.role}</p>
              </div>
              <StatusPill tone={user.status === 'Active' ? 'emerald' : user.status === 'Verified' ? 'cyan' : 'amber'}>{user.status}</StatusPill>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}