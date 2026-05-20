'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { requestJson } from '../../../lib/api';

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
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Secure Attendance</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Sign in to the enterprise console</h1>
        <p className="mt-2 text-sm text-slate-400">
          Monitor institutions, sessions, fraud events, and analytics in real time.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            loginMutation.mutate();
          }}
        >
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail((event.target as HTMLInputElement).value)}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
          />
          <button className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950" type="submit">
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        {loginMutation.isError ? <p className="mt-3 text-sm text-rose-300">{loginMutation.error.message}</p> : null}
      </div>
    </main>
  );
}
