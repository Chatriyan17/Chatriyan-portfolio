import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { IdentityPage, EducationPage, ExperiencePage, SkillsPage, CertificatesPage, AchievementsPage } from './Pages';
import { PageTexture } from './shared';

const PAGES = [
    { id: 'cover-inside', component: () => <div className="w-full h-full bg-[#e5e5e5] border-r-[3px] border-slate-900 shadow-[-8px_0_0_#0f172a_inset] relative overflow-hidden"><PageTexture /></div> },
    { id: 'identity', component: IdentityPage, tab: 'PROFILE' },
    { id: 'education', component: EducationPage, tab: 'EDUCATION' },
    { id: 'experience', component: ExperiencePage, tab: 'EXPERIENCE' },
    { id: 'skills', component: SkillsPage, tab: 'SKILLS' },
    { id: 'certificates', component: CertificatesPage, tab: 'CERTIFICATES' },
    { id: 'achievements', component: AchievementsPage, tab: 'ACHIEVEMENTS' },
    { id: 'back-inside', component: () => <div className="w-full h-full bg-[#e5e5e5] shadow-[8px_0_0_#0f172a_inset] relative overflow-hidden"><PageTexture /></div> }
];

export function PassportModal({ onClose }: { onClose: () => void }) {
    const [currentSpread, setCurrentSpread] = useState(0); // 0, 1, 2, 3
    const totalSpreads = 4;
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && currentSpread < totalSpreads - 1) {
                setDirection(1);
                setCurrentSpread(prev => prev + 1);
            }
            if (e.key === 'ArrowLeft' && currentSpread > 0) {
                setDirection(-1);
                setCurrentSpread(prev => prev - 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSpread, onClose, totalSpreads]);

    const handleNext = () => {
        if (currentSpread < totalSpreads - 1) {
            setDirection(1);
            setCurrentSpread(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSpread > 0) {
            setDirection(-1);
            setCurrentSpread(prev => prev - 1);
        }
    };

    // Calculate which pages are visible
    const leftPageIndex = currentSpread * 2;
    const rightPageIndex = currentSpread * 2 + 1;
    
    const LeftComponent = PAGES[leftPageIndex]?.component;
    const RightComponent = PAGES[rightPageIndex]?.component;

    // Tabs calculation
    const tabs = PAGES.filter(p => p.tab).map(p => p.tab!);
    
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Backdrop blur */}
            <motion.div 
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-slate-900/40 pointer-events-auto"
                onClick={onClose}
            />

            <motion.div 
                layoutId="passport-container"
                className="relative w-[980px] max-w-[90vw] h-[680px] max-h-[90vh] perspective-[2000px] pointer-events-auto z-10"
                initial={{ rotateX: 10, y: 40, scale: 0.95 }}
                animate={{ rotateX: 0, y: 0, scale: 1 }}
                exit={{ rotateX: -10, y: 40, scale: 0.95 }}
                transition={{ duration: 0.7, type: 'spring', damping: 25, stiffness: 100 }}
            >
                {/* Close Button */}
                <motion.button 
                    onClick={onClose}
                    className="absolute -top-12 right-0 w-10 h-10 bg-red-500 hover:bg-red-400 border-[3px] border-slate-900 rounded-none flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] transition-all"
                >
                    <X className="w-6 h-6 stroke-[3]" />
                </motion.button>

                {/* The Passport Book Spread */}
                <motion.div 
                    layoutId="passport-cover"
                    className="w-full h-full bg-[#e5e5e5] rounded-none shadow-[16px_16px_0px_#0f172a] flex relative overflow-visible border-[3px] border-slate-900"
                >
                    {/* Bookmark Ribbon */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-8 h-32 bg-[#0A66C2] z-0 border-x-[3px] border-b-[3px] border-slate-900 shadow-[8px_8px_0px_#0f172a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />

                    {/* Left Pages Stack (simulating thickness) */}
                    <div className="absolute top-2 bottom-2 left-2 w-[5px] bg-white rounded-none border-y-[3px] border-l-[3px] border-slate-900 z-0" />
                    
                    {/* Right Pages Stack */}
                    <div className="absolute top-2 bottom-2 right-2 w-[5px] bg-white rounded-none border-y-[3px] border-r-[3px] border-slate-900 z-0" />

                    {/* Spread Container */}
                    <div className="relative w-full h-full flex p-2 z-10 overflow-visible">
                        {/* Center Spine Crease */}
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[24px] bg-gradient-to-r from-transparent via-black/30 to-transparent z-50 pointer-events-none mix-blend-multiply" />
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[4px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-50 pointer-events-none" />

                        {/* Page Tabs */}
                        <div className="absolute -right-8 top-12 bottom-12 flex flex-col justify-between w-8 z-0">
                            {tabs.map((tab) => {
                                // Find which spread this tab belongs to
                                const pageIndex = PAGES.findIndex(p => p.tab === tab);
                                const spreadIndex = Math.floor(pageIndex / 2);
                                const isActive = currentSpread === spreadIndex;
                                const isPast = currentSpread > spreadIndex;
                                
                                return (
                                    <div 
                                        key={tab}
                                        className={`w-full py-3 px-1 border-[3px] border-slate-900 border-l-0 rounded-r-md shadow-sm flex items-center justify-center cursor-pointer transition-all ${isPast ? 'opacity-0' : 'opacity-100'}`}
                                        style={{
                                            backgroundColor: isActive ? '#fdfbf7' : '#cbd5e1',
                                            transformOrigin: 'left center',
                                            transform: isActive ? 'scaleX(1.1)' : 'scaleX(1)'
                                        }}
                                        onClick={() => setCurrentSpread(spreadIndex)}
                                    >
                                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                            {tab}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Left Page content */}
                        <div className="flex-1 relative bg-[#fdfbf7] rounded-none border-l-[3px] border-y-[3px] border-slate-900 overflow-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)] transform origin-right perspective-[1500px]">
                            {LeftComponent && <LeftComponent />}
                        </div>

                        {/* Right Page content */}
                        <div className="flex-1 relative bg-[#fdfbf7] rounded-none border-r-[3px] border-y-[3px] border-slate-900 overflow-hidden shadow-[8px_0_0_#0f172a_inset] transform origin-left perspective-[1500px]">
                            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                                <motion.div
                                    key={currentSpread}
                                    custom={direction}
                                    initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0, zIndex: 10 }}
                                    animate={{ rotateY: 0, opacity: 1, zIndex: 1 }}
                                    exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0, zIndex: 10 }}
                                    transition={{ duration: 0.7, type: "spring", damping: 20, stiffness: 80 }}
                                    className="absolute inset-0 origin-left"
                                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                                >
                                    {RightComponent && <RightComponent />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Controls */}
                <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-between text-slate-900 z-50">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentSpread === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 rounded-none hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0f172a] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none shadow-[2px_2px_0px_#0f172a] font-bold"
                    >
                        <ChevronLeft className="w-4 h-4" /> PREV
                    </button>
                    
                    <div className="font-mono text-sm tracking-widest bg-slate-200 px-4 py-2 rounded-none border-[3px] border-slate-900 shadow-[2px_2px_0px_#0f172a] font-bold">
                        {Math.min(currentSpread * 2, 6)} / 6
                    </div>

                    <button 
                        onClick={handleNext} 
                        disabled={currentSpread === totalSpreads - 1}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 rounded-none hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0f172a] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none shadow-[2px_2px_0px_#0f172a] font-bold"
                    >
                        NEXT <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body
    );
}

