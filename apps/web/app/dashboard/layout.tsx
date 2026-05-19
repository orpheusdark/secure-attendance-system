export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-6 py-6 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Console</p>
          <nav className="mt-6 space-y-2 text-sm text-slate-300">
            <div className="rounded-2xl bg-white/5 px-4 py-3 text-white">Overview</div>
            <div className="rounded-2xl px-4 py-3">Attendance</div>
            <div className="rounded-2xl px-4 py-3">Fraud Center</div>
            <div className="rounded-2xl px-4 py-3">Institutions</div>
            <div className="rounded-2xl px-4 py-3">Audit Logs</div>
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
