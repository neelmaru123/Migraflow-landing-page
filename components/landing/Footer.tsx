'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-black border-t border-sky-400/40 pt-12 pb-8 text-zinc-400 text-xs font-sans rounded-none relative overflow-hidden">
      {/* Specular Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-sky-400/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-none bg-sky-950/80 border border-sky-400/60 flex items-center justify-center text-sky-400 font-extrabold text-xs">
              M
            </div>
            <span className="font-bold text-base text-white uppercase tracking-tight">
              Migra<span className="text-sky-400">flow</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 font-semibold uppercase tracking-wider text-xs text-zinc-400">
            <a
              href="#overview"
              onClick={(e) => handleNavClick(e, 'overview')}
              className="hover:text-sky-400 transition-colors"
            >
              Architecture
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="hover:text-sky-400 transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#workflow"
              onClick={(e) => handleNavClick(e, 'workflow')}
              className="hover:text-sky-400 transition-colors"
            >
              Workflow
            </a>
            <Link href="/login" className="hover:text-sky-400 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-sky-400 transition-colors">
              Register
            </Link>
          </nav>
        </div>

        {/* Giant Outlined Typography Watermark: Migraflow */}
        <div
          className="w-full my-8 py-2 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ containerType: 'inline-size' }}
        >
          <div className="flex items-center justify-center gap-[clamp(0.5rem,2cqw,1.5rem)] w-full max-w-full">
            {/* Outlined Logo Icon */}
            <div
              className="rounded-none border-2 sm:border-[2.5px] border-sky-400/50 flex items-center justify-center text-transparent font-black font-mono shrink-0 transition-opacity duration-500"
              style={{
                width: 'clamp(2.5rem, 14cqw, 10.75rem)',
                height: 'clamp(2.5rem, 14cqw, 10.75rem)',
              }}
            >
              <span
                className="[-webkit-text-stroke:1.25px_rgba(56,189,248,0.7)] sm:[-webkit-text-stroke:2px_rgba(56,189,248,0.7)] md:[-webkit-text-stroke:2.5px_rgba(56,189,248,0.7)]"
                style={{ fontSize: 'clamp(1.5rem, 8.5cqw, 6.5rem)' }}
              >
                M
              </span>
            </div>

            {/* Giant Stroked Text: Migraflow */}
            <h2
              className="font-black uppercase tracking-tighter leading-none text-transparent [-webkit-text-stroke:1.25px_rgba(56,189,248,0.55)] sm:[-webkit-text-stroke:1.75px_rgba(56,189,248,0.55)] md:[-webkit-text-stroke:2.25px_rgba(56,189,248,0.55)] opacity-85 hover:opacity-100 transition-opacity duration-500 whitespace-nowrap text-[clamp(2.4rem,11vw,10.75rem)]"
              style={{
                fontSize: 'clamp(2.4rem, 14.1cqw, 10.75rem)',
              }}
            >
              Migraflow
            </h2>
          </div>
        </div>

        {/* Bottom Status & Legal Bar */}
        <div className="pt-8 border-t border-sky-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="tracking-wide text-zinc-300">All systems operational</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-zinc-400">
            <a href="#" className="hover:text-sky-400 transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-sky-400 transition-colors">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
