'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, ShieldCheck, Sparkles } from 'lucide-react';

export default function SignupPage() {
  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.section
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[36px] border border-white/10 bg-slate-950/80 p-8 backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Institution onboarding</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">Create a secure attendance workspace.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            Configure trust policies, departments, biometrics, and live fraud rules from a modern enterprise onboarding flow.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { title: 'Institution verification', detail: 'Domain, department, and admin control setup.', icon: Building2 },
              { title: 'Security posture', detail: 'Biometric, OTP, and device trust configuration.', icon: ShieldCheck },
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <item.icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 font-medium text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,15,29,0.98),rgba(9,17,31,0.7))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.5)]"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Get started</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {['Institution name', 'Primary admin', 'Work email', 'Region'].map((label) => (
              <label key={label} className="space-y-2 text-sm text-slate-300">
                <span>{label}</span>
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none focus:border-sky-400/60" placeholder={label} />
              </label>
            ))}
          </div>
          <div className="mt-4 rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
            <Sparkles className="mb-3 h-5 w-5" />
            Premium onboarding automatically enables dashboard, fraud center, and mobile access flows.
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-4 text-sm font-semibold text-slate-950">
            Create workspace <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-sm text-slate-400">
            Already onboarded? <Link className="text-sky-300 transition hover:text-sky-200" href={'/login' as never}>Return to login</Link>
          </p>
        </motion.section>
      </div>
    </main>
  );
}