'use client';

import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { requestJson } from '../../../lib/api';
import { LockKeyhole, Shield, Sparkles, UserCheck } from 'lucide-react';
import { SectionCard, StatusPill } from '../../../components/console-ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: async () =>
      requestJson<{ accessToken: string; refreshToken: string; user: { id: string; role: string } }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, method: 'password', deviceId: 'web-console' }),
      }),
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-between rounded-[36px] p-8 card">
        
          <div>
            <div className="flex items-center gap-3 text-sm muted">
              <Shield className="h-4 w-4 accent" />
              Secure Attendance
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-white md:text-6xl">A trust-first operating system for attendance.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 muted md:text-base">
              Manage institution access with live validation, fraud intelligence, and premium operational clarity.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] glass p-5">
                <LockKeyhole className="h-5 w-5 accent" />
                <p className="mt-3 text-sm muted">Encrypted session flow</p>
              </div>
              <div className="rounded-[24px] glass p-5">
                <UserCheck className="h-5 w-5 accent" />
                <p className="mt-3 text-sm muted">Institution verified access</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <StatusPill tone="emerald">Live trust layer</StatusPill>
            <StatusPill tone="cyan">Anti-fraud radar</StatusPill>
            <StatusPill tone="amber">Real-time validation</StatusPill>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[36px] p-8 card">
          <SectionCard title="Sign in" eyebrow="Secure access" className="border-none bg-transparent p-0 shadow-none">
            <div className="space-y-4 text-sm muted">
              <p>Institution-aware login with live security messaging and state-driven feedback.</p>
            </div>
          </SectionCard>

          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              loginMutation.mutate();
            }}
          >
            <label className="block space-y-2 text-sm muted">
              <span>Email</span>
              <input
                className="w-full rounded-2xl glass px-4 py-4 text-sm text-white outline-none transition"
                placeholder="teacher@nexus.edu"
                value={email}
                onChange={(event) => setEmail((event.target as HTMLInputElement).value)}
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-300">
              <span>Password</span>
              <input
                className="w-full rounded-2xl glass px-4 py-4 text-sm text-white outline-none transition"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
              />
            </label>
            <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]" type="submit">
              {loginMutation.isPending ? 'Signing in...' : 'Enter console'}
              <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
            </button>
          </form>

          {loginMutation.isError ? <p className="mt-4 rounded-2xl p-3 pill-rose">{loginMutation.error.message}</p> : null}

          <p className="mt-6 text-sm muted">
            New institution? <Link className="accent transition hover:text-sky-200" href={'/signup' as never}>Create access flow</Link>
          </p>
        </motion.section>
      </div>
    </main>
  );
}
