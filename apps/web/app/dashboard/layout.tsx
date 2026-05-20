'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Overview', href: '/dashboard' as const },
  { label: 'Teacher', href: '/dashboard/teacher' as const },
  { label: 'Student', href: '/dashboard/student' as const },
  { label: 'Admin', href: '/dashboard/admin' as const },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen px-6 py-6 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Console</p>
          <nav className="mt-6 space-y-2 text-sm text-slate-300">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`rounded-2xl px-4 py-3 transition-all ${
                    isActive ? 'bg-white/5 text-white' : 'hover:bg-white/5'
                  }`}>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

