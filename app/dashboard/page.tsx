'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '../../hooks/queries/useAuthUser';
import { useLogout } from '../../hooks/mutations/useAuthMutations';
import { User, LogOut, ArrowRight, Database, CheckCircle2, ShieldCheck, Home } from 'lucide-react';

export default function DashboardBridgePage() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useAuthUser();
  const logoutMutation = useLogout();

  const handleSignOut = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-400/[0.05] rounded-full blur-[160px] pointer-events-none" />

      {/* Top Header */}
      <header className="flex items-center justify-between relative z-10 max-w-5xl mx-auto w-full border-b border-sky-400/15 pb-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-sky-950/80 border border-sky-400/40 flex items-center justify-center text-sky-400 font-extrabold text-sm tracking-widest">
            M
          </div>
          <span className="font-bold text-base tracking-tight text-white uppercase">
            Migra<span className="text-sky-400">flow</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-mono text-zinc-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors uppercase tracking-wider"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </Link>
          <button
            onClick={handleSignOut}
            disabled={logoutMutation.isPending}
            className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 border border-red-500/20 bg-red-500/10 hover:border-red-500/40 transition-colors uppercase tracking-wider"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{logoutMutation.isPending ? 'Signing Out...' : 'Sign Out'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto w-full my-auto py-10 relative z-10">
        <div className="p-8 sm:p-10 bg-gradient-to-b from-sky-400/[0.08] via-sky-400/[0.02] to-transparent border border-sky-400/25 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                Authentication Status
              </div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Account Active & Verified
              </h1>
            </div>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-zinc-500 font-mono text-xs animate-pulse">
              Retrieving account profile...
            </div>
          ) : user ? (
            <div className="space-y-4">
              <div className="p-4 bg-black border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Name:</span>
                  <span className="text-white font-semibold">{user.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Email:</span>
                  <span className="text-sky-300 font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">User ID:</span>
                  <span className="text-zinc-400 text-[11px] truncate max-w-[200px]">{user.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-zinc-900">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Session</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                You have successfully signed in to the Migraflow platform via secure HTTP-only cookies.
              </p>

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={appUrl}
                  className="w-full py-3 px-4 bg-sky-400 hover:bg-sky-300 text-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  <span>Launch Platform Console</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/"
                  className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider text-center border border-zinc-800 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-center py-4">
              <p className="text-xs text-zinc-400">
                You are currently not signed in or your session has expired.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 py-2 px-4 bg-sky-400 text-black text-xs font-bold uppercase tracking-wider"
              >
                <span>Go to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs font-mono text-zinc-600 relative z-10">
        &copy; {new Date().getFullYear()} Migraflow Platform. All sessions verified via HTTP-only JWTs.
      </footer>
    </div>
  );
}
