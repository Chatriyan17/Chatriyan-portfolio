import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Ticket } from 'lucide-react';

function TooltipNote() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, y: 10, scale: 0.9, rotate: -2 }}
            className="absolute -top-16 -right-12 z-50 pointer-events-none"
        >
            <div className="bg-white border-[3px] border-slate-900 px-3 py-2 shadow-[4px_4px_0px_#0f172a] relative rotate-3" style={{ borderRadius: '0px' }}>
                <div className="absolute top-0 left-0 w-full h-2 bg-[#e5e5e5]" />
                <p className="font-bold text-sm text-slate-900">
                    OPEN ME!
                </p>
                <svg className="absolute -bottom-2 -left-2 w-4 h-4 text-white" viewBox="0 0 16 16">
                    <path d="M16 0 L0 16 L16 16 Z" fill="currentColor" />
                    <path d="M16 0 L0 16" stroke="#0f172a" strokeWidth="3" />
                </svg>
            </div>
        </motion.div>
    )
}

export function PassportCover({ onClick }: { onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative cursor-pointer select-none group pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPointerDownCapture={(e) => e.stopPropagation()}
            drag
            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
            dragElastic={0.2}
            dragMomentum={false}
            whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            tabIndex={0}
        >
            <motion.div 
                layoutId="passport-container"
                className="relative flex items-start justify-center origin-top w-[160px] h-[210px] md:w-[190px] md:h-[250px] lg:w-[210px] lg:h-[276px]"
                initial={{ rotate: -4 }}
                whileHover={{ 
                    scale: 1.05, 
                    y: -16, 
                    rotate: -2 
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {/* Thumb Pin - brutalist */}
                <motion.div 
                    layoutId="passport-thumb-pin"
                    className="absolute -top-[12px] w-[24px] h-[24px] rounded-full bg-[#EA4335] z-50 flex items-center justify-center shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900"
                >
                    <div className="w-[6px] h-[6px] rounded-full bg-white absolute top-[3px] left-[3px]" />
                </motion.div>

                <AnimatePresence>
                    {isHovered && <TooltipNote />}
                </AnimatePresence>

                {/* Additional Back Papers / Folders peeking out */}
                <motion.div 
                    className="absolute inset-0 bg-white z-[-2] origin-left border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]"
                    style={{ transform: 'translate(8px, 4px) rotate(2deg)' }}
                    animate={{ x: isHovered ? 12 : 8, y: isHovered ? 6 : 4, rotate: isHovered ? 4 : 2 }}
                    transition={{ duration: 0.25 }}
                />

                {/* Tiny sticky tab */}
                <div className="absolute top-[20%] -right-[12px] w-8 h-12 bg-[#34d399] z-[-1] shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900" />

                {/* Boarding Pass Peeking */}
                <motion.div 
                    layoutId="passport-boarding-pass"
                    className="absolute -top-4 -right-8 w-24 h-12 bg-[#fdfbf7] border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] z-0 flex items-center justify-between px-2"
                    initial={{ rotate: 12 }}
                    animate={{ rotate: isHovered ? 16 : 12, y: isHovered ? -4 : 0, x: isHovered ? 4 : 0 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 300 }}
                >
                    <Ticket className="w-6 h-6 text-slate-900 rotate-90" />
                    <div className="w-4 h-full border-l-4 border-dotted border-slate-900" />
                </motion.div>

                {/* Bookmark Ribbon */}
                <motion.div 
                    className="absolute -bottom-8 left-[20%] w-6 h-16 bg-[#0A66C2] border-x-[3px] border-b-[3px] border-slate-900 z-0 shadow-[4px_4px_0px_#0f172a]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                    animate={{ rotate: isHovered ? -5 : 0, transformOrigin: 'top center' }}
                />

                {/* Passport Cover Main */}
                <motion.div 
                    layoutId="passport-cover"
                    className="w-full h-full bg-[#e5e5e5] border-[3px] border-slate-900 flex flex-col items-center justify-between py-[24px] px-[16px] relative z-10 overflow-hidden"
                    animate={{
                        boxShadow: isHovered 
                            ? "8px 8px 0px #0f172a" 
                            : "6px 6px 0px #0f172a"
                    }}
                >
                    {/* Paper edges protruding slightly */}
                    <div className="absolute top-[4px] bottom-[4px] -right-[6px] w-[6px] bg-white z-[-1] border-y-[3px] border-r-[3px] border-slate-900 flex flex-col justify-evenly overflow-hidden">
                         <div className="w-full h-[3px] bg-slate-900" />
                         <div className="w-full h-[3px] bg-slate-900" />
                         <div className="w-full h-[3px] bg-slate-900" />
                    </div>

                    {/* Top Emblem */}
                    <motion.div 
                        className="w-[50px] h-[50px] border-[3px] border-slate-900 rounded-full flex items-center justify-center relative mt-2 bg-[#fdfbf7]"
                    >
                        <Plane className="w-6 h-6 text-slate-900" />
                        <div className="absolute inset-0 border-[3px] border-slate-900 rounded-full scale-110 border-dashed" />
                    </motion.div>
                    
                    {/* Title */}
                    <motion.div 
                        className="font-bold text-slate-900 text-center uppercase text-[24px] sm:text-[28px] leading-[1.1] tracking-tight mt-2 mb-auto z-10 font-mono"
                    >
                        CAREER<br/>PASSPORT
                    </motion.div>

                    {/* Bottom Passport Number */}
                    <motion.div 
                        className="flex flex-col items-center gap-2 z-10 mb-2 bg-white px-2 py-1 border-[3px] border-slate-900 shadow-[2px_2px_0px_#0f172a]"
                    >
                        <div className="font-mono text-slate-900 text-[12px] font-bold uppercase tracking-widest">
                            UX-CD-2026
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
