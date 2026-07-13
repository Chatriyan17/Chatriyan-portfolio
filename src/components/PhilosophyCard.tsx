import React from 'react';
import { motion } from 'motion/react';
import { Search, MousePointer2 } from 'lucide-react';

/* Hand-drawn style pencil doodle (yellow body, red eraser) */
function PencilDoodle() {
  return (
    <svg viewBox="0 0 24 64" className="w-7 h-14 rotate-[130deg] drop-shadow-[2px_2px_0px_rgba(15,23,42,0.25)]" aria-hidden="true">
      <rect x="4" y="2" width="16" height="10" rx="4" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
      <rect x="4" y="12" width="16" height="5" fill="#7c3aed" stroke="#0f172a" strokeWidth="2.5" />
      <rect x="4" y="17" width="16" height="28" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" />
      <path d="M4 45 L12 60 L20 45 Z" fill="#fde68a" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M9.5 50 L12 60 L14.5 50 Z" fill="#0f172a" />
    </svg>
  );
}

/* Lightbulb with a blue brain inside */
function BrainBulb() {
  return (
    <svg viewBox="0 0 40 48" className="w-11 h-13" aria-hidden="true">
      <circle cx="20" cy="18" r="13" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
      <path
        d="M12 17 q1.5-7 8-7 q7.5 0 8 7 q0.5 5-4.5 6.5 q-5.5 1.8-9.5-1 q-2.8-2-2-5.5 Z"
        fill="#60a5fa" stroke="#0f172a" strokeWidth="2"
      />
      <path d="M16 13 q2 3 0 6 M20 11.5 q1.5 4 0 8 M24 13 q-1.5 3 0 6" fill="none" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="14" y="31" width="12" height="4" rx="1" fill="#e5e7eb" stroke="#0f172a" strokeWidth="2" />
      <rect x="15" y="35" width="10" height="4" rx="1" fill="#e5e7eb" stroke="#0f172a" strokeWidth="2" />
      <rect x="16.5" y="39" width="7" height="3.5" rx="1.75" fill="#0f172a" />
    </svg>
  );
}

export default function PhilosophyCard() {
  return (
    <div className="w-[560px] relative pointer-events-none flex items-center justify-center select-none">
      <div className="relative flex flex-col items-center py-8 pointer-events-auto">

        {/* "Stop" box + pencil */}
        <motion.div
          className="relative z-30 self-start ml-6 -mb-5"
          initial={{ rotate: -5 }}
          animate={{ rotate: -5 }}
          whileHover={{ scale: 1.06, rotate: -8 }}
        >
          <div className="bg-white border-[3px] border-slate-900 px-6 py-1 shadow-[3px_3px_0px_rgba(15,23,42,0.15)]">
            <span className="font-black text-4xl text-slate-900 tracking-tight">Stop</span>
          </div>
          <div className="absolute -top-8 -right-9">
            <PencilDoodle />
          </div>
        </motion.div>

        {/* Blue pill: "Defending Your Design," */}
        <motion.div className="relative z-10" whileHover={{ scale: 1.03 }}>
          <div className="bg-[#93c5fd] rounded-[2.5rem] px-10 py-5">
            <span className="font-black text-[2.5rem] leading-none text-slate-900 tracking-tight whitespace-nowrap">
              Relying on intuition
            </span>
          </div>
        </motion.div>

        {/* Magnifying glass on the left */}
        <div className="absolute left-2 top-[44%] -rotate-[25deg] z-20">
          <Search className="w-12 h-12 text-slate-900" strokeWidth={2.5} />
        </div>

        {/* "Start" box */}
        <motion.div
          className="relative z-30 -my-5"
          initial={{ rotate: -2 }}
          animate={{ rotate: -2 }}
          whileHover={{ scale: 1.06, rotate: 0 }}
        >
          <div className="bg-white border-[3px] border-slate-900 px-7 py-1.5 shadow-[3px_3px_0px_rgba(15,23,42,0.15)]">
            <span className="font-black text-4xl text-slate-900 tracking-tight">Start</span>
          </div>
        </motion.div>

        {/* Yellow pill: "Explaining the Brain" + brain bulb */}
        <motion.div className="relative z-10" initial={{ rotate: -1 }} animate={{ rotate: -1 }} whileHover={{ scale: 1.03 }}>
          <div className="bg-[#fcd34d] rounded-[2.5rem] px-10 py-5">
            <span className="font-black text-[2.5rem] leading-none text-slate-900 tracking-tight whitespace-nowrap">
              Designing with intent
            </span>
          </div>
          <div className="absolute -right-7 -top-6 rotate-6">
            <BrainBulb />
          </div>
        </motion.div>

        {/* Bottom strip: tagline + cursor */}
        <motion.div
          className="relative z-30 mt-1"
          initial={{ rotate: -3 }}
          animate={{ rotate: -3 }}
          whileHover={{ rotate: -1, scale: 1.03 }}
        >
          <div className="bg-white border-[2.5px] border-slate-900 px-5 py-2 shadow-[3px_3px_0px_rgba(15,23,42,0.15)]">
            <span className="font-bold text-lg text-slate-900 whitespace-nowrap">
              Good design isn't taste; It's psychology
            </span>
          </div>
          <div className="absolute -bottom-6 right-4 rotate-[-10deg]">
            <MousePointer2 className="w-8 h-8 fill-white text-slate-900" strokeWidth={2} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
