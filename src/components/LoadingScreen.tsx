/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

/**
 * Brutalist black & white "Portfolio" loading screen.
 * Recreates the poster wordmark inside a browser window with a halftone
 * background, decorative sparkles / circles / dashed orbits and cursor arrows,
 * then draws + pops everything in before the portfolio takes over.
 */

const WORD = 'Portfolio';

// Four-point sparkle path (star / twinkle)
function Sparkle({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 0 C22 13 27 18 40 20 C27 22 22 27 20 40 C18 27 13 22 0 20 C13 18 18 13 20 0 Z"
        fill="#0f172a"
      />
    </svg>
  );
}

// Little cursor / pointer arrow
function Cursor({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 2 L4 20 L9 15 L12.5 22.5 L15.5 21 L12 13.5 L19 13.5 Z"
        fill="#0f172a"
        stroke="#0f172a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoadingScreen() {
  const [exiting, setExiting] = useState(false);

  // Hold the intro for a beat, then fade the whole screen out (CSS transition).
  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  // container that staggers all the decorative pops
  const stage = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.35 },
    },
  };

  const pop = {
    hidden: { scale: 0, opacity: 0, rotate: -20 },
    show: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 320, damping: 16 },
    },
  };

  const letter = {
    hidden: { y: 60, opacity: 0, rotate: -8 },
    show: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 18 },
    },
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
      style={{
        transition: 'opacity 0.55s ease, filter 0.55s ease, transform 0.55s ease',
        opacity: exiting ? 0 : 1,
        filter: exiting ? 'blur(6px)' : 'none',
        transform: exiting ? 'scale(1.04)' : 'none',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <motion.div
        className="relative w-[min(92vw,760px)]"
        variants={stage}
        initial="hidden"
        animate="show"
      >
        {/* ---- Rotating dashed orbits (behind everything, CSS-driven spin) ---- */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg className="ls-spin h-full w-full" viewBox="0 0 500 500" fill="none">
            <ellipse cx="250" cy="250" rx="210" ry="150" stroke="#0f172a" strokeWidth="2" strokeDasharray="6 12" opacity="0.5" />
            <ellipse cx="250" cy="250" rx="160" ry="200" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 14" opacity="0.3" transform="rotate(30 250 250)" />
          </svg>
        </motion.div>

        {/* ---- Browser window frame ---- */}
        <motion.div
          className="relative rounded-2xl border-[3px] border-slate-900 bg-white shadow-[10px_10px_0px_#0f172a] overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
          {/* title bar */}
          <div className="flex items-center justify-between border-b-[3px] border-slate-900 px-5 py-3">
            <div className="flex items-center gap-3 text-slate-900">
              <span className="text-xl font-black leading-none">–</span>
              <span className="text-lg font-black leading-none">✕</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-900" />
              <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-900" />
              <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-900" />
            </div>
          </div>

          {/* halftone dotted canvas */}
          <div
            className="relative flex items-center justify-center px-6 py-14 sm:py-20"
            style={{
              backgroundImage: 'radial-gradient(#0f172a 1.4px, transparent 1.6px)',
              backgroundSize: '16px 16px',
            }}
          >
            {/* soft white vignette so the wordmark stays legible over dots */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,white_35%,transparent_75%)]" />

            {/* Portfolio wordmark */}
            <h1 className="relative flex select-none">
              {WORD.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  className="font-sans text-[13vw] font-black leading-none tracking-tight text-slate-900 sm:text-[92px]"
                  style={{
                    WebkitTextStroke: i % 3 === 1 ? '2px #0f172a' : undefined,
                    color: i % 3 === 1 ? 'transparent' : '#0f172a',
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>

        {/* ---- Floating decorations ---- */}
        {/* filled circle top-left */}
        <motion.span variants={pop} className="absolute -left-4 -top-6 h-10 w-10 rounded-full bg-slate-900" />
        {/* outlined circle top-left inner */}
        <motion.span variants={pop} className="absolute left-8 -top-9 h-6 w-6 rounded-full border-[3px] border-slate-900 bg-white" />
        {/* filled circle top-center */}
        <motion.span variants={pop} className="absolute left-1/2 -top-8 h-7 w-7 -translate-x-1/2 rounded-full bg-slate-900" />
        {/* half-tone dot cluster right */}
        <motion.span variants={pop} className="absolute -right-5 top-6 h-5 w-5 rounded-full border-[3px] border-slate-900 bg-white" />

        {/* sparkles */}
        <motion.span variants={pop} className="absolute -left-8 top-1/2"><Sparkle size={34} /></motion.span>
        <motion.span variants={pop} className="absolute -right-9 top-1/3"><Sparkle size={40} /></motion.span>
        <motion.span variants={pop} className="absolute -right-4 -bottom-6"><Sparkle size={26} /></motion.span>

        {/* twinkle sparkle (looping, CSS) */}
        <span className="ls-twinkle absolute right-10 -top-10 inline-block">
          <Sparkle size={22} />
        </span>

        {/* cursor arrows */}
        <motion.span variants={pop} className="absolute -left-6 -bottom-4 -rotate-12"><Cursor size={30} /></motion.span>
        <motion.span variants={pop} className="absolute right-1/4 -bottom-9 rotate-12"><Cursor size={26} /></motion.span>

        {/* ---- name + progress bar ---- */}
        <motion.div
          className="mx-auto mt-9 w-[min(80vw,420px)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
            <span>Chatriyan</span>
            <span className="ls-pulse">Loading…</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full border-[3px] border-slate-900 bg-white">
            <motion.div
              className="h-full rounded-full bg-slate-900"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
