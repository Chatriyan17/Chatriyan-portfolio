/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

/**
 * Cozy pixel-art "Portfolio" title screen.
 * A parchment game window on the oak floor with a pixel wordmark, pixel
 * sparkles / blocks / dashed orbits and cursor arrows, and a segmented
 * loading bar, all popped in before the portfolio takes over.
 */

const WORD = 'Portfolio';

// Pixel four-point sparkle (twinkle)
function Sparkle({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges">
      <rect x="3" y="0" width="1" height="7" fill="#493529" />
      <rect x="0" y="3" width="7" height="1" fill="#493529" />
      <rect x="2" y="2" width="3" height="3" fill="#493529" />
      <rect x="3" y="3" width="1" height="1" fill="#E8C69A" />
    </svg>
  );
}

// Little pixel cursor / pointer arrow
const CURSOR_ROWS = ['X', 'XX', 'XoX', 'XooX', 'XoooX', 'XooooX', 'XoooXXX', 'XoXoX', 'XX.XoX', '....XX'];
function Cursor({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" shapeRendering="crispEdges">
      {CURSOR_ROWS.flatMap((row, y) =>
        row.split('').map((ch, x) =>
          ch === '.' ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={ch === 'X' ? '#493529' : '#FFF1D6'} />
          ),
        ),
      )}
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
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#DCAA78]"
      style={{
        backgroundImage: 'var(--px-floor-tile)',
        backgroundSize: '128px 64px',
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
            <ellipse cx="250" cy="250" rx="210" ry="150" stroke="#493529" strokeWidth="2" strokeDasharray="6 12" opacity="0.5" />
            <ellipse cx="250" cy="250" rx="160" ry="200" stroke="#493529" strokeWidth="2" strokeDasharray="4 14" opacity="0.3" transform="rotate(30 250 250)" />
          </svg>
        </motion.div>

        {/* ---- Browser window frame ---- */}
        <motion.div
          className="relative pixel-panel"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
          {/* title bar */}
          <div className="flex items-center justify-between border-b-4 border-slate-900 px-5 py-3 pixel-wood" style={{ boxShadow: 'none' }}>
            <div className="flex items-center gap-3 text-[#FFF1D6]">
              <span className="text-xl font-black leading-none">–</span>
              <span className="text-lg font-black leading-none">✕</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 border-2 border-slate-900 bg-[#9AA889]" />
              <span className="h-3 w-3 border-2 border-slate-900 bg-[#E8C69A]" />
              <span className="h-3 w-3 border-2 border-slate-900 bg-[#C96F4A]" />
            </div>
          </div>

          {/* halftone dotted canvas */}
          <div
            className="relative flex items-center justify-center px-6 py-14 sm:py-20 pixel-checker-cream"
          >

            {/* Portfolio wordmark */}
            <h1 className="relative flex select-none">
              {WORD.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  className="font-pixel text-[13vw] font-bold leading-none tracking-normal text-slate-900 sm:text-[92px]"
                  style={{
                    color: i % 3 === 1 ? '#C96F4A' : '#493529',
                    textShadow: '5px 5px 0 #E8C69A',
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
        <motion.span variants={pop} className="absolute -left-4 -top-6 h-10 w-10 bg-[#536B4B] pixel-outline" />
        {/* outlined circle top-left inner */}
        <motion.span variants={pop} className="absolute left-8 -top-9 h-6 w-6 border-4 border-slate-900 bg-white" />
        {/* filled circle top-center */}
        <motion.span variants={pop} className="absolute left-1/2 -top-8 h-7 w-7 -translate-x-1/2 bg-[#C96F4A] pixel-outline" />
        {/* half-tone dot cluster right */}
        <motion.span variants={pop} className="absolute -right-5 top-6 h-5 w-5 border-4 border-slate-900 bg-[#E8C69A]" />

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
          <div className="mb-3 flex items-center justify-between font-pixel text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-900">
            <span>Chatriyan</span>
            <span className="ls-pulse">Loading…</span>
          </div>
          <div className="h-6 w-full overflow-hidden bg-white p-1 pixel-outline">
            <motion.div
              className="h-full"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, #536B4B 0 12px, transparent 12px 16px)' }}
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
