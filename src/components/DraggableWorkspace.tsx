import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimation, useMotionValue, useTransform, animate, useSpring, useMotionValueEvent, AnimatePresence } from 'motion/react';
import ContactBoard from './ContactBoard';
import { MapPin, Briefcase, UserRoundPen, Coffee, Download, Mail, Linkedin, ExternalLink, X, LayoutTemplate, ArrowRight, Moon, Sun, Dumbbell, Laptop, CheckCircle, PenTool, Terminal, Layers, Eye, EyeOff, Figma, Bot, Sparkles, Scissors, Brain, Rocket, FlaskConical, Pencil, Search, Move } from 'lucide-react';
import { Passport } from './career-passport';
import PhilosophyCard from './PhilosophyCard';
import gamerRoomStickerImg from '../assets/gamer-room-sticker.png';

type CardType = 'contact_board' | 'sticker' | 'photo' | 'info' | 'proof' | 'personality' | 'resume' | 'contact' | 'lifeclock' | 'timeline' | 'skills' | 'resume_contact' | 'story' | 'greeting' | 'tool_skills' | 'portfolio_folder' | 'passport' | 'philosophy' | 'ticket';

interface CardData {
  id: string;
  type: CardType;
  title?: string;
  subtitle?: string;
  content?: string;
  icon?: React.ReactNode;
  image?: string;
  x: number;
  y: number;
  rotate: number;
}

const ZONE_CENTERS = {
  home: { x: 0, y: -220, name: 'About / Home', color: '#10b981' }, // emerald-500
  work: { x: 700, y: -320, name: 'Case Studies', color: '#3b82f6' }, // blue-500
  contact: { x: -750, y: 480, name: 'Contact', color: '#f59e0b' }, // amber-500
};

// Layout grid (all coordinates are card centers):
//   Row 1 (top center):  greeting
//   Row 2 (y = -20):     story | passport | portfolio_folder, 460px apart
//   Row 3 (y = 390):     contact_board | tool_skills
const CARDS: CardData[] = [
  { id: 'greeting', type: 'greeting', x: 0, y: -370, rotate: 0 },
  { id: 'story', type: 'story', x: -180, y: 0, rotate: 5 },
  { id: 'passport', type: 'passport', x: 180, y: 0, rotate: -5 },
  { id: 'portfolio_folder', type: 'portfolio_folder', x: 700, y: -320, rotate: 3 },
  { id: 'contact_board', type: 'contact_board', x: -750, y: 480, rotate: 2 },
  { id: 'tool_skills', type: 'tool_skills', x: 800, y: 380, rotate: 5 },
  { id: 'sticker', type: 'sticker', x: -450, y: -370, rotate: -4 },
  { id: 'philosophy', type: 'philosophy', x: -680, y: 50, rotate: 0 },
];

function useISTTime() {
  const [timeStr, setTimeStr] = useState('');
  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const tStr = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: '2-digit' });
      setTimeStr(`${tStr} IST`);

      const t24Str = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
      const parts = t24Str.match(/(\d+):(\d+):(\d+)/);
      if (parts) {
        let h = parseInt(parts[1], 10);
        let m = parseInt(parts[2], 10);
        let s = parseInt(parts[3], 10);
        if (h === 24) h = 0;
        setCurrentHour(h + m / 60 + s / 3600);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return { timeStr, currentHour };
}




export default function WorkspaceCanvas() {
  const [isDesktop, setIsDesktop] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(220);
  
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const [activeZone, setActiveZone] = useState<keyof typeof ZONE_CENTERS>('home');
  const prevZoneRef = useRef<keyof typeof ZONE_CENTERS>('home');
  const [showToast, setShowToast] = useState(false);

  const { timeStr, currentHour } = useISTTime();

  const getLightingColor = (hour: number) => {
    return '#ffffff';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Animate pan hint on mount
    const hintPan = async () => {
      await animate(x, -60, { duration: 1, ease: 'easeInOut', delay: 0.5 });
      await animate(x, 0, { duration: 1, ease: 'easeInOut' });
    };
    hintPan();
  }, [x]);

  useMotionValueEvent(x, "change", (latestX) => {
    const canvasY = y.get();
    const viewX = -latestX;
    const viewY = -canvasY;

    let closestZone: keyof typeof ZONE_CENTERS = 'home';
    let minDistance = Infinity;
    
    for (const [key, zone] of Object.entries(ZONE_CENTERS)) {
      const dist = Math.hypot(viewX - zone.x, viewY - zone.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestZone = key as keyof typeof ZONE_CENTERS;
      }
    }
    
    if (closestZone !== activeZone) {
      setActiveZone(closestZone);
    }
  });

  useEffect(() => {
    if (activeZone !== prevZoneRef.current) {
      prevZoneRef.current = activeZone;
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeZone]);

  const panTo = (targetX: number, targetY: number) => {
    animate(x, -targetX, { type: 'spring', damping: 25, stiffness: 120 });
    animate(y, -targetY, { type: 'spring', damping: 25, stiffness: 120 });
  };

  const handleReset = () => {
    animate(x, 0, { type: 'spring', damping: 25, stiffness: 120 });
    animate(y, 220, { type: 'spring', damping: 25, stiffness: 120 });
  };

  const dragConstraints = isDesktop 
    ? { left: -800, right: 800, top: -500, bottom: 500 }
    : { left: -600, right: 600, top: -500, bottom: 500 };

  const mobileCards = ['lifeclock', 'greeting', 'status', 'portfolio_folder', 'timeline', 'resume_contact', 'contact_board', 'passport', 'philosophy', 'sticker'];
  const cardsToRender = isDesktop ? CARDS : CARDS.filter(c => mobileCards.includes(c.id));

  return (
    <div 
      className="w-full min-h-screen flex flex-col relative overflow-hidden font-sans text-slate-900 transition-colors duration-[3000ms]" 
      style={{ backgroundColor: getLightingColor(currentHour) }}
      role="region" 
      aria-label="Interactive design portfolio canvas. Drag or swipe to navigate. Keyboard users can press Tab key to focus and automatically center portfolio cards."
    >
      {isDesktop && <VisitorCursor mouseX={mouseX} mouseY={mouseY} />}
      
      {/* Top Navigation */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-start pointer-events-none">
        
        {/* Left: Logo */}
        <div className="pointer-events-auto flex items-center justify-start min-w-[200px]">
          <div className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl px-5 py-3 flex items-center justify-center cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] hover:bg-[#34d399] transition-all" onClick={() => panTo(0, -220)}>
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-slate-900" aria-hidden="true">
              <path d="M 79.49 29.35 A 36 36 0 1 0 79.49 70.65" fill="none" stroke="currentColor" strokeWidth="11"/>
              <circle cx="86" cy="50" r="6" className="fill-[#35577A]"/>
            </svg>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl px-5 py-3 font-bold uppercase tracking-wider text-sm text-slate-900 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] hover:bg-[#fbbf24] transition-all focus:outline-none focus:ring-4 focus:ring-amber-400" onClick={() => panTo(0, 0)}>
            About Me
          </button>
          <button className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl px-5 py-3 font-bold uppercase tracking-wider text-sm text-slate-900 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] hover:bg-[#fbbf24] transition-all focus:outline-none focus:ring-4 focus:ring-amber-400" onClick={() => panTo(700, -320)}>
            Case Studies
          </button>
          <button className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl px-5 py-3 font-bold uppercase tracking-wider text-sm text-slate-900 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] hover:bg-[#fbbf24] transition-all focus:outline-none focus:ring-4 focus:ring-amber-400" onClick={() => panTo(-750, 480)}>
            Contact
          </button>
        </div>

        {/* Right: Resume */}
        <div className="pointer-events-auto flex justify-end min-w-[200px]">
          <button className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl px-5 py-3 font-bold uppercase tracking-wider text-sm text-slate-900 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] hover:bg-[#a78bfa] transition-all flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-purple-400" onClick={() => window.open('https://drive.google.com/file/d/1Mo8Jn7Loq0jjwwpUcycHDjFHikZ9h_o5/view?usp=sharing', '_blank', 'noopener,noreferrer')}>
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>
      </div>
      
      {/* Draggable Canvas Area */}
      <div className="flex-1 w-full relative min-h-[80vh] flex items-center justify-center overflow-hidden z-10">
        
        <motion.div
          drag
          dragConstraints={dragConstraints}
          dragElastic={0.05}
          style={{
            x,
            y,
            backgroundImage: `
              radial-gradient(circle at center, transparent 40%, #ffffff 90%),
              repeating-linear-gradient(to right, rgba(15,23,42,0.05) 0, rgba(15,23,42,0.05) 1px, transparent 1px, transparent 50px),
              repeating-linear-gradient(to bottom, rgba(15,23,42,0.05) 0, rgba(15,23,42,0.05) 1px, transparent 1px, transparent 50px)
            `,
            left: '50%',
            top: '50%',
            marginLeft: '-2000px',
            marginTop: '-2000px',
          }}
          className="absolute w-[4000px] h-[4000px] cursor-grab active:cursor-grabbing"
          role="application"
          aria-label="Interactive infinite canvas workspace"
        >
          <div className="absolute top-1/2 left-1/2">
            {/* Landmark glow blips */}

            
            <svg className="absolute top-0 left-0 overflow-visible pointer-events-none opacity-40 z-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path 
                d="M 250 250 Q 350 350, 450 400 T 750 150" 
                fill="none" 
                stroke="#2dd4bf" 
                strokeWidth="2" 
                strokeDasharray="6 6" 
              />
            </svg>

            {cardsToRender.map((card) => (
              <StaticCard 
                key={card.id} 
                card={card} 
                isDesktop={isDesktop} 
                timeStr={timeStr} 
                currentHour={currentHour} 
                canvasX={x}
                canvasY={y}
              />
            ))}
            <ChatriyanCursor canvasX={x} canvasY={y} mouseX={mouseX} mouseY={mouseY} />
            
          </div>
        </motion.div>

        <WorldMinimap x={x} y={y} isDesktop={isDesktop} activeZone={activeZone} mouseX={mouseX} />
      </div>

      {/* Reset View Button */}
      <button 
        onClick={handleReset}
        className="absolute right-8 bottom-8 px-5 py-2.5 text-sm font-bold text-slate-900 bg-white hover:-translate-y-1 rounded-xl shadow-[4px_4px_0px_#0f172a] hover:shadow-[6px_6px_0px_#0f172a] border-2 border-slate-900 transition-all cursor-pointer z-50"
      >
        Reset View
      </button>

      {/* Drag Indicator */}
      {isDesktop && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-40 opacity-80">
          <div className="bg-white px-5 py-2.5 rounded-full border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] flex items-center gap-3 font-bold text-sm text-slate-800 tracking-tight animate-bounce">
            <Move className="w-5 h-5 text-slate-800" />
            <span>Hold & Drag to explore</span>
          </div>
        </div>
      )}

      {/* Zone Entry Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-24 right-8 bg-white text-slate-900 px-5 py-3 rounded-2xl shadow-[6px_6px_0px_#0f172a] z-50 text-sm font-bold flex items-center gap-3 pointer-events-none border-[3px] border-slate-900"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ZONE_CENTERS[activeZone].color }} />
            New Area Discovered: {ZONE_CENTERS[activeZone].name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorldMinimap({ x, y, isDesktop, activeZone, mouseX }: { x: any, y: any, isDesktop: boolean, activeZone: keyof typeof ZONE_CENTERS, mouseX?: any }) {
  const handleMinimapClick = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    // Reverse scale calculation: minimap is 160x160. canvas mapped to 2000x1400 total pan area.
    const targetViewX = (offsetX / 160) * 2000 - 1000;
    const targetViewY = (offsetY / 160) * 1400 - 700;
    
    animate(x, -targetViewX, { type: 'spring', damping: 25, stiffness: 120 });
    animate(y, -targetViewY, { type: 'spring', damping: 25, stiffness: 120 });
  };

  const indicatorX = useTransform(x, (v: number) => ((-v + 1000) / 2000) * 160 - 4);
  const indicatorY = useTransform(y, (v: number) => ((-v + 700) / 1400) * 160 - 4);
  const defaultMouseX = useMotionValue(0);
  const mouseRotation = useTransform(mouseX || defaultMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-45, 45]);
  
  return (
    <div 
      className={`absolute bottom-8 left-8 flex flex-col gap-3 z-50 transition-transform ${isDesktop ? 'scale-100' : 'scale-75 origin-bottom-left'}`}
      role="region"
      aria-label="Radar Minimap Navigation"
    >
      <div 
        className={`w-[160px] h-[160px] bg-white rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] overflow-hidden relative ${isDesktop ? 'cursor-crosshair' : ''} focus-visible:ring-2 focus-visible:ring-[#2dd4bf] focus:outline-none`}
        onClick={handleMinimapClick}
        role="button"
        tabIndex={0}
        aria-label="Radar minimap. Click to pan canvas perspective. Press Enter or Space to reset view to home."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            animate(x, 0, { type: 'spring', damping: 25, stiffness: 120 });
            animate(y, 220, { type: 'spring', damping: 25, stiffness: 120 });
          }
        }}
      >
        {/* Radar Background Noise/Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '3px 3px' }} aria-hidden="true" />
        
        {/* Concentric Circles & Crosshairs SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="49" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
           <circle cx="50" cy="50" r="33" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
           <circle cx="50" cy="50" r="16.5" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
           <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
           <line x1="0" y1="50" x2="100" y2="50" stroke="#cbd5e1" strokeWidth="0.5" />
        </svg>

        {/* Sweeping Radar Beam */}
        <div 
          className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]"
          style={{
            background: 'conic-gradient(from 0deg, transparent 70%, rgba(15,23,42,0.05) 90%, rgba(15,23,42,0.1) 100%)'
          }}
        />
        
        {/* Zone Blips */}
        {Object.entries(ZONE_CENTERS).map(([key, zone]) => (
           <div 
             key={key} 
             className="absolute w-2 h-2 rounded-full -ml-1 -mt-1 transition-all duration-300 shadow-[0_0_8px_currentColor]"
             style={{ 
               left: ((zone.x + 1000) / 2000) * 160, 
               top: ((zone.y + 700) / 1400) * 160,
               backgroundColor: zone.color,
               color: zone.color,
               opacity: activeZone === key ? 1 : 0.4,
             }}
           >
             {/* Pulse effect for active zone */}
             {activeZone === key && (
               <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
             )}
           </div>
        ))}

        {/* Viewport Indicator (You) */}
        <motion.div 
          className="absolute w-4 h-4 drop-shadow-[0_0_8px_rgba(255,255,255,1)] z-10 -ml-1 -mt-1"
          style={{ x: indicatorX, y: indicatorY, rotate: mouseRotation }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,15 90,85 50,70 10,85" fill="white" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <div className="w-[160px] h-1.5 flex gap-1 rounded-full overflow-hidden">
        <div className={`h-full w-1/3 transition-colors duration-300 ${activeZone === 'home' ? 'bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-stone-800'}`} />
        <div className={`h-full w-1/3 transition-colors duration-300 ${activeZone === 'work' ? 'bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-stone-800'}`} />
        <div className={`h-full w-1/3 transition-colors duration-300 ${activeZone === 'contact' ? 'bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-stone-800'}`} />
      </div>
    </div>
  );
}




function ChatriyanCursor({ canvasX, canvasY, mouseX, mouseY }: { canvasX: any; canvasY: any; mouseX: any; mouseY: any }) {
  const x = useMotionValue(200);
  const y = useMotionValue(-100);
  const [showGreeting, setShowGreeting] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    // Ensure we run on the client side
    if (typeof window !== 'undefined') {
      const hasGreeted = sessionStorage.getItem('chatriyan_has_greeted');
      if (!hasGreeted) {
        setShowGreeting(true);
        sessionStorage.setItem('chatriyan_has_greeted', 'true');
        
        // Hide greeting after 9 seconds
        setTimeout(() => {
          setShowGreeting(false);
        }, 9000);
      }
    }
  }, []);

  const refs = useRef({ canvasX, canvasY, mouseX, mouseY, x, y });
  refs.current = { canvasX, canvasY, mouseX, mouseY, x, y };

  useEffect(() => {
    let active = true;

    const TARGET_POINTS = [
      { x: 0, y: -270 }, // greeting
      { x: -120, y: -250 }, // lifeclock
      { x: -180, y: -200 }, // status
      { x: -330, y: 160 }, // philosophy
      { x: 280, y: 0 }, // portfolio_folder
      { x: 250, y: 350 }, // tool_skills
      { x: -260, y: -20 }, // resume_contact
      { x: 0, y: 0 }, // home center
      { x: 650, y: 50 }, // work center
      { x: 0, y: 400 }, // contact center
    ];

    const runBehavior = async () => {
      // Small warm up delay
      await new Promise(r => setTimeout(r, 1000));

      while (active) {
        const choice = Math.random();
        let targetX = 0;
        let targetY = 0;

        const mx = refs.current.mouseX.get();
        const my = refs.current.mouseY.get();
        const cx = refs.current.canvasX.get();
        const cy = refs.current.canvasY.get();

        const isUserActive = mx > -900 && my > -900;

        if (choice < 0.4 && isUserActive) {
          // 40% chance: gently wander near the user to "collaborate" / "interact"
          const viewportW = window.innerWidth;
          const viewportH = window.innerHeight;
          const userCanvasX = mx - (viewportW / 2) - cx;
          const userCanvasY = my - (viewportH / 2) - cy;

          // Add a random offset of 60 to 140px so we don't overlap completely
          const angle = Math.random() * Math.PI * 2;
          const distance = 60 + Math.random() * 80;
          targetX = userCanvasX + Math.cos(angle) * distance;
          targetY = userCanvasY + Math.sin(angle) * distance;
        } else if (choice < 0.8) {
          // 40% chance: target one of the interesting cards/sections
          const point = TARGET_POINTS[Math.floor(Math.random() * TARGET_POINTS.length)];
          // Add a small jitter so it doesn't land EXACTLY on the same pixel
          targetX = point.x + (Math.random() * 60 - 30);
          targetY = point.y + (Math.random() * 40 - 20);
        } else {
          // 20% chance: wander to a random open canvas area
          targetX = Math.random() * 1000 - 500;
          targetY = Math.random() * 700 - 350;
        }

        // Animate smoothly to target (human-like duration and easing)
        const duration = 1.0 + Math.random() * 1.2; // 1s to 2.2s
        const ease = Math.random() < 0.5 ? "easeOut" : "easeInOut";

        await Promise.all([
          animate(x, targetX, { duration, ease }),
          animate(y, targetY, { duration, ease })
        ]);

        // Pause/inspect for a natural human amount of time (1.5s to 4s)
        const pauseTime = 1500 + Math.random() * 2500;
        await new Promise(r => setTimeout(r, pauseTime));
      }
    };

    runBehavior();

    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.div
      className="absolute pointer-events-none z-50 flex flex-col items-start"
      style={{ x, y }}
      role="figure"
      aria-label="Chatriyan collaborator greeting"
    >
      <div className="relative">
        {/* Sleek, standard cursor SVG */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fbbf24" stroke="#0f172a" strokeWidth="2"  className="drop-shadow-md">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
        </svg>

        <AnimatePresence mode="wait">
          {showGreeting ? (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, scale: 0.85, originX: 0, originY: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", damping: 18, stiffness: 260 }}
              className="absolute left-3.5 top-3.5 bg-amber-500 rounded-lg p-2.5 shadow-[0_6px_20px_rgba(245,158,11,0.35)] border border-amber-300/40 whitespace-nowrap min-w-[180px]"
            >
              <div className="text-[9px] font-bold text-amber-100 uppercase tracking-wider mb-1">
                Chatriyan · UX Designer
              </div>
              <div className="text-[13px] font-medium text-white flex items-center gap-1.5">
                Hello, how are you?
                <motion.span
                  className="origin-bottom-right inline-block"
                  animate={{ rotate: [0, 18, -8, 18, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  👋
                </motion.span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.85, originX: 0, originY: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", damping: 18, stiffness: 260 }}
              className="absolute left-3.5 top-3.5 px-2 py-0.5 text-[10px] font-semibold text-white rounded-md shadow-sm whitespace-nowrap bg-amber-500 tracking-wide border border-amber-300/40"
            >
              Chatriyan
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function VisitorCursor({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  return (
    <motion.div
      className="fixed pointer-events-none z-[100] flex flex-col items-start"
      style={{ x: smoothX, y: smoothY }}
    >
      {/* Offset slightly from the real cursor to not obscure it */}
      <div className="ml-4 mt-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3B82F6"  className="drop-shadow-md -ml-2 -mt-2">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
        </svg>
        <div className="px-2 py-1 text-[10px] font-semibold text-white rounded-full shadow-md whitespace-nowrap bg-blue-500 tracking-wide -mt-2 ml-2">
          You
        </div>
      </div>
    </motion.div>
  );
}

const StaticCard: React.FC<{ 
  card: CardData, 
  isDesktop: boolean, 
  timeStr: string, 
  currentHour: number,
  canvasX: any,
  canvasY: any
}> = ({ card, isDesktop, timeStr, currentHour, canvasX, canvasY }) => {
  const controls = useAnimation();
  
  const isFixed = true;
  // Positions come from the CARDS layout grid; stale localStorage
  // overrides from older drag-enabled builds are intentionally ignored.
  const initialX = card.x;
  const initialY = card.y;

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const targetScale = card.type === 'passport' ? 0.75 : (card.type === 'contact_board' ? 0.75 : (card.type === 'personality' ? 0.5 : (card.type === 'story' ? 0.75 : (card.type === 'philosophy' ? 0.75 : (card.type === 'ticket' ? 1.0 : (card.type === 'tool_skills' ? 1.5 : 1))))));

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1, 
        scale: targetScale, 
        rotate: card.rotate,
        transition: { type: "spring", damping: 20, stiffness: 100 }
      });
      if (card.id === 'status') {
        await controls.start({
          rotate: [card.rotate, card.rotate - 6, card.rotate + 6, card.rotate, card.rotate - 6, card.rotate + 6, card.rotate],
          transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 }
        });
      }
    };
    sequence();
  }, [card, controls, targetScale]);

  return (
    <div className="absolute w-0 h-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{ 
          x, 
          y, 
          width: card.type === 'contact_board' ? (isDesktop ? '960px' : '360px') : (card.type === 'personality' ? '380px' : (card.id === 'story' ? '651px' : (card.type === 'portfolio' ? '740px' : (card.type === 'ticket' ? '360px' : (card.type === 'useful_board' ? '600px' : undefined))))),
          transformOrigin: 'center center'
        }}
        initial={{ rotate: card.rotate, opacity: 0, scale: targetScale * 0.8 }}
        animate={controls}
        drag={!isFixed}
        dragMomentum={false}
        whileDrag={!isFixed ? { scale: targetScale * 1.05, cursor: "grabbing" } : undefined}
        onDragEnd={() => {
          if (!isFixed) {
            localStorage.setItem(`card_pos_${card.id}`, JSON.stringify({ x: x.get(), y: y.get() }));
          }
        }}
        tabIndex={0}
        onFocus={() => {
          // Smoothly pan canvas to center the focused card
          animate(canvasX, -x.get(), { type: 'spring', damping: 25, stiffness: 120 });
          animate(canvasY, -y.get(), { type: 'spring', damping: 25, stiffness: 120 });
        }}
        className={`will-change-transform pointer-events-none ${!isFixed ? 'cursor-grab' : ''} focus-visible:ring-4 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus:outline-none rounded-xl`}
      >
        <CardContent card={card} isDesktop={isDesktop} timeStr={timeStr} currentHour={currentHour} />
      </motion.div>
    </div>
  );
}

function TimelineCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[6px_6px_0px_#0f172a] border-[3px] border-slate-900 w-72 select-none hover:-translate-y-1 hover:shadow-[8px_8px_0px_#0f172a] transition-all">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-slate-900" /> Experience Journey
      </h3>
      <div className="relative pt-2 pb-2">
        <div className="absolute left-0 top-1/2 -mt-px w-full h-[3px] bg-slate-900" />
        
        <div className="relative flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 mb-2 z-10" />
            <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">Service Design</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 mb-2 z-10" />
            <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">Product Design</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] border-2 border-slate-900 mb-2 z-10 animate-pulse" />
            <span className="text-[10px] text-slate-900 font-bold whitespace-nowrap">AI x UX</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsCard() {
  interface LetterItem {
    char: string;
    rotate?: string;
    translateY?: string;
    marginRight?: string;
    marginLeft?: string;
    hasLoop?: boolean;
    loopOffset?: { x: string; y: string; w?: string; h?: string };
  }

  const row1: LetterItem[] = [
    { char: 'T', rotate: '-6deg', translateY: '-2px', marginRight: '-2px' },
    { char: 'o', rotate: '8deg', translateY: '4px', marginRight: '-4px', hasLoop: true, loopOffset: { x: '50%', y: '56%', w: '16px', h: '16px' } },
    { char: 'o', rotate: '-5deg', translateY: '-1px', marginRight: '-4px', hasLoop: true, loopOffset: { x: '50%', y: '56%', w: '16px', h: '16px' } },
    { char: 'l', rotate: '4deg', translateY: '-4px', marginRight: '-2px' },
    { char: 's', rotate: '-8deg', translateY: '2px', marginRight: '16px' }, // Space after Tools
    { char: 'u', rotate: '6deg', translateY: '-1px', marginRight: '-3px', hasLoop: true, loopOffset: { x: '50%', y: '60%', w: '14px', h: '10px' } },
    { char: 's', rotate: '-4deg', translateY: '2px', marginRight: '-2px' },
    { char: 'e', rotate: '7deg', translateY: '-3px', marginRight: '-3px', hasLoop: true, loopOffset: { x: '50%', y: '44%', w: '12px', h: '12px' } },
    { char: 'd', rotate: '-6deg', translateY: '1px', hasLoop: true, loopOffset: { x: '40%', y: '56%', w: '16px', h: '16px' } },
  ];

  const row2: LetterItem[] = [
    { char: 't', rotate: '-4deg', translateY: '-1px', marginRight: '-2px' },
    { char: 'o', rotate: '8deg', translateY: '3px', marginRight: '32px', hasLoop: true, loopOffset: { x: '50%', y: '56%', w: '16px', h: '16px' } }, // Space after to
    { char: 'D', rotate: '-8deg', translateY: '-3px', marginRight: '-4px', hasLoop: true, loopOffset: { x: '45%', y: '52%', w: '20px', h: '24px' } },
    { char: 'e', rotate: '6deg', translateY: '1px', marginRight: '-3px', hasLoop: true, loopOffset: { x: '50%', y: '44%', w: '12px', h: '12px' } },
    { char: 's', rotate: '-5deg', translateY: '-2px', marginRight: '-2px' },
    { char: 'i', rotate: '4deg', translateY: '3px', marginRight: '-2px' },
    { char: 'g', rotate: '-6deg', translateY: '-1px', marginRight: '-3px', hasLoop: true, loopOffset: { x: '48%', y: '58%', w: '15px', h: '14px' } },
    { char: 'n', rotate: '8deg', translateY: '2px' },
  ];

  // 4-point star sparkle component in SVG style
  const Sparkle = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg 
      viewBox="0 0 24 24" 
      className={`absolute fill-amber-400 stroke-[#0f172a] stroke-[1.5px] drop-shadow-[1px_1px_0px_#020617] ${className}`}
      style={{ width: '12px', height: '12px', ...style }}
    >
      <path d="M12 0 L15.5 8.5 L24 12 L15.5 15.5 L12 24 L8.5 15.5 L0 12 L8.5 8.5 Z" />
    </svg>
  );

  return (
    <div className="relative select-none">
      <div 
        className="relative overflow-visible flex flex-col items-center justify-center p-2"
        style={{
          width: '201px',
          height: '100px',
          fontSize: '14px'
        }}
      >
        {/* Sparkles */}
        <Sparkle className="top-1 left-3 animate-pulse" />
        <Sparkle className="bottom-2 right-4 animate-pulse delay-75 fill-[#fab82c]" />
        <Sparkle className="bottom-6 left-1 scale-75 opacity-95" />

        {/* Letters Body Wrapper */}
        <div className="flex flex-col items-center justify-center gap-0.5 z-10 select-none">
          
          {/* Row 1: Tools used */}
          <div className="flex items-center justify-center">
            {row1.map((item, idx) => (
              <div 
                key={`r1-${idx}`}
                className="relative select-none inline-block"
                style={{
                  transform: `rotate(${item.rotate || '0deg'}) translateY(${item.translateY || '0px'})`,
                  marginRight: item.marginRight ? `calc(${item.marginRight} * 0.4)` : '0px',
                  marginLeft: item.marginLeft ? `calc(${item.marginLeft} * 0.4)` : '0px',
                }}
              >
                {/* Yellow counter shape behind letter loop */}
                {item.hasLoop && item.loopOffset && (
                  <div 
                    className="absolute rounded-full bg-[#fab82c] border border-[#0f172a] shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)] z-0"
                    style={{
                      left: item.loopOffset.x,
                      top: item.loopOffset.y,
                      width: `calc(${item.loopOffset.w || '14px'} * 0.45)`,
                      height: `calc(${item.loopOffset.h || '14px'} * 0.45)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                {/* Styled letter */}
                <span 
                  className="relative z-10 font-bubbly text-[22px] font-black italic tracking-normal leading-none select-none text-amber-400"
                  style={{
                    display: 'block',
                    textShadow: `
                      -1.2px -1.2px 0 #0f172a, 1.2px -1.2px 0 #0f172a, -1.2px 1.2px 0 #0f172a, 1.2px 1.2px 0 #0f172a,
                      -1.2px 0px 0 #0f172a, 1.2px 0px 0 #0f172a, 0px -1.2px 0 #0f172a, 0px 1.2px 0 #0f172a,
                      0.5px 1.5px 0 #020617, 1px 2px 0 #020617, 1.5px 2.5px 0 #020617
                    `
                  }}
                >
                  {item.char}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: to Design */}
          <div className="flex items-center justify-center -mt-1">
            {row2.map((item, idx) => (
              <div 
                key={`r2-${idx}`}
                className="relative select-none inline-block"
                style={{
                  transform: `rotate(${item.rotate || '0deg'}) translateY(${item.translateY || '0px'})`,
                  marginRight: item.marginRight ? `calc(${item.marginRight} * 0.4)` : '0px',
                  marginLeft: item.marginLeft ? `calc(${item.marginLeft} * 0.4)` : '0px',
                }}
              >
                {/* Yellow counter shape behind letter loop */}
                {item.hasLoop && item.loopOffset && (
                  <div 
                    className="absolute rounded-full bg-[#fab82c] border border-[#0f172a] shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)] z-0"
                    style={{
                      left: item.loopOffset.x,
                      top: item.loopOffset.y,
                      width: `calc(${item.loopOffset.w || '14px'} * 0.45)`,
                      height: `calc(${item.loopOffset.h || '14px'} * 0.45)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                {/* Styled letter */}
                <span 
                  className="relative z-10 font-bubbly text-[22px] font-black italic tracking-normal leading-none select-none text-amber-400"
                  style={{
                    display: 'block',
                    textShadow: `
                      -1.2px -1.2px 0 #0f172a, 1.2px -1.2px 0 #0f172a, -1.2px 1.2px 0 #0f172a, 1.2px 1.2px 0 #0f172a,
                      -1.2px 0px 0 #0f172a, 1.2px 0px 0 #0f172a, 0px -1.2px 0 #0f172a, 0px 1.2px 0 #0f172a,
                      0.5px 1.5px 0 #020617, 1px 2px 0 #020617, 1.5px 2.5px 0 #020617
                    `
                  }}
                >
                  {item.char}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

function StoryCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShortRead, setIsShortRead] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Open About Me notebook"
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        whileHover={{ y: -6, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-[220px] h-[300px] bg-[#fdfbf7] rounded-none shadow-[8px_8px_0px_#0f172a] border-[3px] border-slate-900 flex cursor-pointer relative group transition-colors select-none pointer-events-auto"
      >
        {/* Paper edges */}
        <div className="absolute right-[-6px] top-[2px] bottom-[2px] w-[6px] bg-white border-y-[3px] border-r-[3px] border-slate-900 rounded-none z-[-1]" />
        
        {/* Binder / spine */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#34d399] border-r-[3px] border-slate-900 rounded-none flex flex-col justify-evenly py-2 items-center">
            {/* Notebook spirals on cover */}
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-5 h-2 bg-slate-900 border-[2px] border-slate-900 rounded-none" />
            ))}
        </div>
        
        {/* Cover content */}
        <div className="flex-1 flex flex-col justify-center items-center pl-8 text-slate-900 text-center relative z-10">
           <h3 className="font-mono font-black uppercase text-3xl tracking-tighter mb-3 text-slate-900">About Me</h3>
           <div className="h-[3px] w-12 bg-slate-900 mb-3" />
           <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest bg-[#fbbf24] px-1 border-2 border-slate-900">Written by</p>
           <p className="text-sm font-black text-slate-900 mt-1">Chatriyan</p>
        </div>
        
        {/* Bookmark ribbon */}
        <div className="absolute bottom-[-20px] right-[30px] w-4 h-12 bg-[#0A66C2] border-x-[3px] border-b-[3px] border-slate-900 rounded-none group-hover:translate-y-2 origin-top transition-transform shadow-md z-[-2]" />
        {/* Sticky note */}
        <div className="absolute top-[40px] right-[-14px] w-8 h-10 bg-[#EA4335] border-[3px] border-slate-900 rounded-none rotate-3 group-hover:rotate-6 transition-transform shadow-[2px_2px_0px_rgba(0,0,0,0.2)] z-[-2]" />
      </motion.div>

      {isMounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              />

              <motion.div
                initial={{ scale: 0.8, y: 100, rotateX: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative z-10 w-full h-full sm:w-[95vw] max-w-[780px] sm:h-[90vh] sm:max-h-[700px] bg-white sm:rounded-none shadow-[16px_16px_0px_#0f172a] border-0 sm:border-[3px] border-slate-900 flex overflow-hidden origin-bottom"
                style={{
                  backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '-1px -1px',
                }}
              >
                {/* Spiral binding holes */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 flex flex-col justify-evenly py-4 items-center bg-[#34d399] border-r-[3px] border-slate-900 shadow-[inset_-2px_0_0_#0f172a] z-10" aria-hidden="true">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-900 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.2)] relative">
                      <div className="absolute top-1/2 left-1/2 -mt-[1.5px] sm:-mt-[2px] -ml-[8px] sm:-ml-[12px] w-6 sm:w-8 h-[3px] sm:h-[4px] bg-slate-900 border border-white -rotate-12 rounded-full shadow-sm" />
                    </div>
                  ))}
                </div>
                
                {/* Close button */}                <button                  onClick={() => setIsOpen(false)}                  className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 bg-[#EA4335] border-[3px] border-slate-900 rounded-none flex items-center justify-center shadow-[2px_2px_0px_#0f172a] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0f172a] transition-all z-[100] cursor-pointer"                >                  <X className="w-5 h-5 text-slate-900" />                </button>
                <div className="flex-1 w-full max-w-[740px] pl-10 pr-4 py-8 sm:pl-12 sm:p-12 overflow-y-auto relative custom-scrollbar">
                  {/* Rest of the original StoryCard content, wrapped in motion elements for entrance animation */}
                  <div className="flex justify-between items-start mb-8 pr-12">
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                     >
                       <h3 className="text-4xl md:text-5xl font-mono font-black text-slate-900 uppercase tracking-tighter -rotate-2 leading-tight" style={{ textShadow: '4px 4px 0px #fbbf24, 8px 8px 0px #0f172a' }}>
                        The Story
                       </h3>
                       <svg className="absolute -top-4 -right-8 w-8 h-8 text-[#EA4335] fill-[#EA4335]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                       </svg>
                     </motion.div>
                     
                     <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        onClick={(e) => { e.stopPropagation(); setIsShortRead(!isShortRead); }}
                        className="flex items-center gap-2 text-xs font-bold text-slate-900 bg-white px-3 py-2 uppercase font-black tracking-widest rounded-none shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] transition-all z-20 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus:outline-none"
                        aria-pressed={isShortRead}
                        aria-label="Toggle story length between short read and long read"
                      >
                        {isShortRead ? (
                          <><EyeOff className="w-3 h-3" aria-hidden="true" /> Short Read</>
                        ) : (
                          <><Eye className="w-3 h-3" aria-hidden="true" /> Long Read</>
                        )}
                     </motion.button>
                  </div>

                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     className="relative"
                  >
                    <svg className="absolute -left-6 top-2 w-6 h-6 text-slate-800 rotate-[120deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                       <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <p className="text-slate-800 font-mono text-[16px] md:text-[18px] leading-relaxed transition-all duration-500 pl-4 mb-6 font-bold border-l-[4px] border-slate-900 bg-[#fbbf24] py-2">
                       Growing up, everyone thought I was good at math — good grades, quick with numbers. But looking back, that was never really the thing.
                    </p>
                  </motion.div>

                  <motion.p 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.45 }}
                     className="text-slate-900 font-mono text-[14px] md:text-[16px] leading-relaxed transition-all duration-500 mb-8 px-4 font-bold border-[3px] border-slate-900 bg-white p-4 shadow-[4px_4px_0px_#0f172a]"
                  >
                    <strong className="text-slate-900 font-black">What I was actually good at was understanding how a problem gets solved. </strong>
                    <span className={isShortRead ? "line-through text-slate-400 transition-all duration-500" : "transition-all duration-500"}>I'd watch how my teacher worked through something, understand the logic behind it, then find my own way to reach the same answer. I didn't have a word for that back then. Now I do — </span>
                    <strong className="text-slate-900 font-black bg-[#34d399] px-2 py-1 rounded-none border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] whitespace-pre-wrap leading-loose">design thinking: understanding a problem deeply enough that a better way just shows up on its own. </strong>
                    <span className={isShortRead ? "line-through text-slate-400 transition-all duration-500" : "transition-all duration-500"}>That same instinct is what makes me a designer today. </span>
                    <strong className="text-slate-900 font-black">In every project, I try to understand "why" before "how," and I try to see the person behind the problem</strong>
                    <span className={isShortRead ? "line-through text-slate-400 transition-all duration-500" : "transition-all duration-500"}> — not just the problem on paper. That's what I'm genuinely grateful for — this work gave a name to something I've been doing since I was a kid, </span>
                    <strong className="text-slate-900 font-black">solving things my own way.</strong>
                  </motion.p>


                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function PortfolioFolder() {
  const [isOpen, setIsOpen] = useState(false);

  const projects: Array<{
    id: string; title: string; subtitle: string; image: string; url?: string;
    startX: number; endX: number; startRotate: number; endRotate: number; endY: number; delay: number;
  }> = [
    {
      id: 'p1', title: 'YouTube Shorts', subtitle: 'AI Product Discovery',
      image: '/youtube-thumbnail.png',
      url: '/case-studies/youtube-shorts/index.html',
      startX: -25, endX: -260, startRotate: -7, endRotate: -18, endY: -160, delay: 0.1
    },
    {
      id: 'p2', title: 'NoBrokerHood', subtitle: 'Delivery Access Flow',
      image: 'https://images.unsplash.com/photo-1581362036005-ce9248742918?w=500&q=80',
      startX: 0, endX: 0, startRotate: 0, endRotate: 0, endY: -220, delay: 0.5
    },
    {
      id: 'p4', title: 'Design System', subtitle: 'Global Component Library',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80',
      startX: 25, endX: 260, startRotate: 7, endRotate: 18, endY: -160, delay: 0.9
    },
  ];

  return (
    <div
      className="relative flex items-end justify-center w-[740px] h-[300px] select-none scale-[0.56] pointer-events-none"
      style={{ perspective: '1200px' }}
      role="group"
      aria-label="Case Studies Portfolio Folder"
    >
      
      {/* Folder Back */}
      <div 
        className="absolute bottom-0 w-[360px] h-[240px] bg-[#fbbf24] border-[3px] border-slate-900" 
        style={{ 
          zIndex: 5, 
          clipPath: 'polygon(0 15%, 35% 15%, 40% 0, 100% 0, 100% 100%, 0 100%)',
        }} 
        aria-hidden="true"
      />

      {/* Cards inside folder */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 pointer-events-auto" style={{ zIndex: isOpen ? 30 : 10 }}>
        <AnimatePresence>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              drag={isOpen}
              dragMomentum={true}
              className="absolute bottom-0 w-[240px] h-[320px] bg-white border-[3px] border-slate-900 overflow-hidden origin-bottom cursor-grab active:cursor-grabbing"
              tabIndex={isOpen ? 0 : -1}
              role="button"
              aria-label={
                project.url
                  ? `Project Card: ${project.title}, ${project.subtitle}. Opens case study in a new tab.`
                  : `Project Card: ${project.title}, ${project.subtitle}`
              }
              onClick={(e) => {
                if (isOpen && project.url) {
                  e.stopPropagation();
                  window.open(project.url, '_blank', 'noopener,noreferrer');
                }
              }}
              onKeyDown={(e) => {
                if (isOpen && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  if (project.url) {
                    window.open(project.url, '_blank', 'noopener,noreferrer');
                  }
                }
              }}
              initial={false}
              animate={isOpen ? { 
                rotate: [project.startRotate, project.startRotate * 0.5, project.endRotate, project.endRotate + (project.endRotate > 0 ? 2 : -2), project.endRotate], 
                x: [`calc(-50% + ${project.startX}px)`, `calc(-50% + ${project.startX * 1.2}px)`, `calc(-50% + ${project.endX}px)`, `calc(-50% + ${project.endX + (project.endX > 0 ? 5 : -5)}px)`, `calc(-50% + ${project.endX}px)`], 
                y: [0, -420, project.endY, project.endY - 30, project.endY], 
                opacity: 1, 
                scale: 1,
                zIndex: 30 + i,
                boxShadow: ['6px 6px 0px #0f172a', '10px 10px 0px #0f172a', '6px 6px 0px #0f172a', '8px 8px 0px #0f172a', '6px 6px 0px #0f172a']
              } : { 
                rotate: project.startRotate, 
                x: `calc(-50% + ${project.startX}px)`, 
                y: (i % 2 === 0 ? 10 : 25), 
                opacity: 0.9, 
                scale: 0.95,
                zIndex: 10 + i,
                boxShadow: '6px 6px 0px #0f172a'
              }}
              transition={isOpen ? { 
                duration: 1.6,
                times: [0, 0.4, 0.8, 0.9, 1],
                ease: [0.25, 1, 0.3, 1], 
                delay: project.delay
              } : {
                type: 'spring', damping: 20, stiffness: 100, delay: (projects.length - i) * 0.05
              }}
              whileHover={isOpen ? { scale: 1.05, zIndex: 50, transition: { duration: 0.2 } } : { y: -20, transition: { duration: 0.2 } }}
            >
              <img src={project.image} alt={`Preview image of ${project.title}`} className="w-full h-full object-cover pointer-events-none p-1 pb-16 bg-white" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <div className="bg-[#fbbf24] px-3 py-1.5 border-2 border-slate-900 text-[10px] font-extrabold text-slate-900 uppercase tracking-wider w-max mb-3 shadow-[2px_2px_0px_#0f172a]">
                  {project.subtitle}
                </div>
                <h4 className="text-white font-bold text-2xl leading-tight drop-shadow-md">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Folder Front Flap */}
      <motion.div
        className="absolute bottom-0 w-[360px] h-[240px] bg-[#fbbf24] border-[3px] border-slate-900 shadow-[8px_8px_0px_#0f172a] flex flex-col items-center justify-end pb-8 cursor-pointer overflow-hidden group focus:outline-none pointer-events-auto"
        onClick={(e) => { if (!isOpen) { e.stopPropagation(); setIsOpen(true); } }}
        role="button"
        tabIndex={isOpen ? -1 : 0}
        aria-expanded={isOpen}
        aria-label="Case Studies folder. Click or press Enter to open and expand."
        onKeyDown={(e) => {
          if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }
        }}
        style={{ 
          zIndex: 20, 
          transformOrigin: 'bottom',
        }}
        animate={isOpen ? { rotateX: -60, y: 30, opacity: 0.2, scale: 0.95 } : { rotateX: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        whileHover={!isOpen ? { scale: 1.02, rotateX: -5 } : {}}
      >
        
        
        {!isOpen && (
          <button 
            className="absolute top-6 left-6 bg-[#34d399] hover:bg-[#10b981] text-slate-900 text-xs font-bold px-6 py-3 border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:translate-y-1 hover:shadow-[2px_2px_0px_#0f172a] transition-all z-30 group-hover:scale-105 cursor-pointer uppercase tracking-widest"
            onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
            tabIndex={isOpen ? -1 : 0}
            aria-label="Open Folder"
          >
            Open Folder
          </button>
        )}
        <h3 className="text-white text-4xl font-extrabold tracking-wide drop-shadow-xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>Case Studies</h3>
      </motion.div>

      {/* Close Button Below Folder */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="absolute -bottom-[80px] left-1/2 -translate-x-1/2 bg-white text-slate-900 w-14 h-14 rounded-full border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] transition-all z-[60] cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none flex items-center justify-center pointer-events-auto"
            aria-label="Close Case Studies folder"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
function TicketCard() {
  return (
    <div className="relative pointer-events-auto select-none w-[360px] h-[216px] origin-center" draggable={false}>
      <div className="relative w-full h-full filter drop-shadow-[8px_8px_0px_#0f172a] hover:-translate-y-1.5 transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing group">
        <svg viewBox="0 0 400 240" className="w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            {/* Rough paper fiber/grunge pattern */}
            <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2" result="light">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
              <feBlend mode="multiply" in="SourceGraphic" in2="light" />
            </filter>
            
            {/* Soft linear gradient for aged paper look */}
            <linearGradient id="paper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8d8bc" />
              <stop offset="50%" stopColor="#dfceaf" />
              <stop offset="100%" stopColor="#d5c2a3" />
            </linearGradient>

            {/* Inner glow shadow for ticket borders */}
            <filter id="vintage-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Ticket Body with Hand-Torn Deckled Edges */}
          <path 
            d="M 15 10 
               L 385 10
               C 387 15, 383 20, 386 25
               C 382 30, 388 35, 384 40
               C 387 45, 383 50, 386 55
               C 382 60, 388 65, 384 70
               C 387 75, 383 80, 386 85
               C 382 90, 388 95, 384 100
               C 387 105, 383 110, 386 115
               C 382 120, 388 125, 384 130
               C 387 135, 383 140, 386 145
               C 382 150, 388 155, 384 160
               C 387 165, 383 170, 386 175
               C 382 180, 388 185, 384 190
               C 387 195, 383 200, 386 205
               C 382 210, 388 215, 384 220
               C 387 225, 383 228, 385 230
               L 15 230
               C 13 225, 17 220, 14 215
               C 18 210, 12 205, 16 200
               C 13 195, 17 190, 14 185
               C 18 180, 12 175, 16 170
               C 13 165, 17 160, 14 155
               C 18 150, 12 145, 16 140
               C 13 135, 17 130, 14 125
               C 18 120, 12 115, 16 110
               C 13 105, 17 100, 14 95
               C 18 90, 12 85, 16 80
               C 13 75, 17 70, 14 65
               C 18 60, 12 55, 16 50
               C 13 45, 17 40, 14 35
               C 18 30, 12 25, 16 20
               C 13 15, 17 12, 15 10 Z" 
            fill="url(#paper-grad)" 
            stroke="#201a15" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
            filter="url(#paper-texture)"
          />

          {/* Realistic Paper Imperfections / Creases */}
          <path d="M 50 10 Q 55 120, 48 230" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.08" strokeDasharray="3 15 10 5" />
          <path d="M 120 10 Q 115 140, 125 230" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.06" strokeDasharray="8 8" />
          <path d="M 280 10 Q 282 100, 278 230" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.09" />
          <circle cx="85" cy="140" r="1.5" fill="#3e2d1d" opacity="0.15" />
          <circle cx="210" cy="65" r="2.5" fill="#3e2d1d" opacity="0.1" />
          <circle cx="310" cy="180" r="1.2" fill="#3e2d1d" opacity="0.2" />

          {/* Outer Border Box */}
          <rect 
            x="24" 
            y="18" 
            width="352" 
            height="204" 
            fill="none" 
            stroke="#261e16" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />

          {/* Ticket Dividers */}
          <line 
            x1="334" 
            y1="18" 
            x2="334" 
            y2="222" 
            stroke="#261e16" 
            strokeWidth="2.5" 
          />

          {/* "Ticket To" centered text */}
          <text 
            x="179" 
            y="105" 
            textAnchor="middle" 
            className="font-vintage text-[18px] font-bold fill-[#261e16] tracking-tight"
            style={{ fontFamily: '"Special Elite", "Courier New", monospace' }}
          >
            Stop design using intuitive
          </text>

          {/* "Anywhere" centered text */}
          <text 
            x="179" 
            y="155" 
            textAnchor="middle" 
            className="font-vintage text-[18px] font-bold fill-[#261e16] tracking-tight"
            style={{ fontFamily: '"Special Elite", "Courier New", monospace' }}
          >
            & Start Design using Intends
          </text>

          {/* Ticket Number */}
          <text 
            x="356" 
            y="120" 
            textAnchor="middle" 
            className="font-vintage text-[26px] font-black fill-[#261e16] tracking-wider"
            transform="rotate(90, 356, 120)"
            style={{ fontFamily: '"Special Elite", "Courier New", monospace' }}
          >
            146017
          </text>
        </svg>

        {/* Small floating tooltip on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-[#fbbf24] border-2 border-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-[2px_2px_0px_#0f172a] rotate-3 translate-y-24">
            Draggable Souvenir 🎟️
          </div>
        </div>
      </div>
    </div>
  );
}

function CardContent({ card, isDesktop, timeStr, currentHour }: { card: CardData, isDesktop: boolean, timeStr: string, currentHour: number }) {

  const Wrapper = motion.div;

  if (card.type === 'contact_board') {
    return <ContactBoard />;
  }

  if (card.type === 'portfolio_folder') {
    return <PortfolioFolder />;
  }

  if (card.type === 'passport') {
    return <Passport />;
  }

  if (card.type === 'philosophy') {
    return <PhilosophyCard />;
  }

  if (card.type === 'ticket') {
    return <TicketCard />;
  }

  if (card.type === 'sticker') {
    return (
      <div className="relative pointer-events-auto select-none w-[300px] group" style={{ transform: 'scaleX(-1)' }} draggable={false}>
        <img
          src={gamerRoomStickerImg}
          alt="Retro gamer sitting in a room full of NES games, a bookshelf, and a Mario poster"
          className="w-full h-auto cursor-grab active:cursor-grabbing transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-[4px_8px_10px_rgba(0,0,0,0.35)]"
          draggable={false}
        />
      </div>
    );
  }

  if (card.type === 'photo') {
    return (
      <div className="bg-white border-[3px] border-slate-900 p-3 pb-8 rounded shadow-[5px_5px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#0f172a] transition-all select-none w-[280px]">
        <div className="w-full h-[220px] bg-slate-100 rounded border-2 border-slate-900 overflow-hidden mb-3 relative">
          {card.image && <img src={card.image} alt="Photo" className="w-full h-full object-cover pointer-events-none" draggable={false} referrerPolicy="no-referrer" />}
        </div>
        <div className="flex justify-center">
          <span className="font-bubbly text-slate-800 text-xl font-bold -rotate-2">Retro gaming nights</span>
        </div>
      </div>
    );
  }

  if (card.type === 'greeting') {
    return <GreetingCard timeStr={timeStr} currentHour={currentHour} />;
  }

  if (card.type === 'story') {
    return <StoryCard />;
  }

  if (card.type === 'timeline') {
    return <TimelineCard />;
  }

  if (card.type === 'skills') {
    return <SkillsCard />;
  }

  if (card.type === 'tool_skills') {
    return <ToolSkillsCard />;
  }

  if (card.type === 'info') {
    return (
      <div className="bg-white border-[3px] border-slate-900 rounded-2xl px-5 py-3 shadow-[5px_5px_0px_#0f172a] flex items-center gap-3 max-w-[300px] select-none hover:-translate-y-1 hover:shadow-[7px_7px_0px_#0f172a] transition-all">
        <div className="shrink-0">{card.icon}</div>
        <span className="text-sm md:text-base font-bold tracking-tight text-slate-900">{card.content}</span>
      </div>
    );
  }

  if (card.type === 'proof') {
    if (card.image) {
      return (
        <Wrapper
          whileHover={{ y: -5 }}
          onClick={(e) => { e.stopPropagation(); console.log('Navigate to:', card.title) }}
          className="bg-[#1e293b]/90 backdrop-blur-md rounded-xl p-2 shadow-lg border border-stone-700 group cursor-pointer" style={{ width: card.id === "cs1" ? "800px" : "16rem" }}
        >
          <div className="h-36 rounded-lg bg-stone-900 overflow-hidden mb-3 relative border border-stone-700/50">
            <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" draggable={false} />
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
            </div>
            <div className="absolute top-2 left-2 bg-[#0a0e14]/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#2dd4bf] uppercase tracking-wider border border-[#2dd4bf]/20">
              Mission
            </div>
          </div>
          <div className="px-2 pb-2 select-none">
            <h3 className="font-semibold text-stone-200 text-sm">{card.title}</h3>
            <p className="text-xs text-stone-400 mt-0.5">{card.subtitle}</p>
          </div>
        </Wrapper>
      );
    }
  }

  if (card.type === 'personality') {
    return (
      <div className="relative select-none w-[380px] h-[300px] flex flex-col items-center justify-center p-6 gap-4 font-sans bg-transparent pointer-events-auto">
        {/* Row 1: "Stop" sticker + Pencil */}
        <div className="flex items-center gap-1 self-start ml-2 z-20">
          <motion.div 
            className="bg-white border-[3.5px] border-slate-900 px-6 py-2 rounded-xl shadow-[5px_5px_0px_#0f172a] -rotate-6 flex items-center justify-center relative"
            whileHover={{ scale: 1.05, rotate: -3 }}
          >
            <span className="font-sans font-extrabold text-3xl tracking-tight text-slate-900 uppercase">Stop</span>
            
            {/* Cute Cartoonish Pencil sticking out of the "Stop" block */}
            <div className="absolute -top-7 -right-7 rotate-[35deg] bg-amber-400 border-[3px] border-slate-900 rounded-xl p-1.5 shadow-[3px_3px_0px_#0f172a] flex items-center justify-center">
              <Pencil className="w-6 h-6 text-slate-900 fill-amber-300 stroke-[2.5px]" />
            </div>
          </motion.div>
        </div>

        {/* Row 2: "Defending Your Design," Pill + Search */}
        <div className="w-full relative z-10 -mt-2">
          <motion.div 
            className="bg-[#93c5fd] border-[3.5px] border-slate-900 px-7 py-3.5 rounded-full shadow-[5px_5px_0px_#0f172a] rotate-[2deg] flex items-center gap-3 w-max mx-auto relative"
            whileHover={{ scale: 1.03, rotate: 0 }}
          >
            {/* Magnifying Glass Icon sticking out */}
            <div className="absolute -left-6 -top-4 rotate-[-15deg] bg-white border-[3px] border-slate-900 rounded-full p-2 shadow-[3px_3px_0px_#0f172a] flex items-center justify-center">
              <Search className="w-5 h-5 text-slate-900 stroke-[3px]" />
            </div>
            
            <span className="font-sans font-black text-2xl md:text-3xl tracking-tight text-slate-900 pl-4 pr-1">
              Chasing Intuition,
            </span>
          </motion.div>
        </div>

        {/* Row 3: "Start" sticker */}
        <div className="flex items-center self-center z-20 -mt-2">
          <motion.div 
            className="bg-white border-[3.5px] border-slate-900 px-6 py-2 rounded-xl shadow-[5px_5px_0px_#0f172a] rotate-[4deg] flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <span className="font-sans font-extrabold text-3xl tracking-tight text-slate-900 uppercase">Start</span>
          </motion.div>
        </div>

        {/* Row 4: "Explaining the Brain" Pill + Brain */}
        <div className="w-full relative z-10 -mt-2">
          <motion.div 
            className="bg-[#fcd34d] border-[3.5px] border-slate-900 px-7 py-3.5 rounded-full shadow-[5px_5px_0px_#0f172a] -rotate-[2deg] flex items-center gap-3 w-max mx-auto relative"
            whileHover={{ scale: 1.03, rotate: 0 }}
          >
            <span className="font-sans font-black text-2xl md:text-3xl tracking-tight text-slate-900 pr-5 pl-1">
              Designing for Intent
            </span>

            {/* Brain Icon sticking out on the right */}
            <div className="absolute -right-6 -bottom-3 rotate-[12deg] bg-white border-[3px] border-slate-900 rounded-full p-2 shadow-[3px_3px_0px_#0f172a] flex items-center justify-center">
              <Brain className="w-6 h-6 text-slate-900 fill-pink-200 stroke-[2.5px]" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}


function AnalogClock() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [reducedMotion, setReducedMotion] = useState(false);

  // Base values (initialized to current time)
  const baseMin = useMotionValue(0);
  const baseHour = useMotionValue(0);

  // Offset values for interactions
  const hoverMin = useMotionValue(0);
  const hoverHour = useMotionValue(0);
  
  const microMin = useMotionValue(0);

  useEffect(() => {
    // Check reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    const initialMin = minutes * 6 + seconds * 0.1;
    const initialHour = (hours % 12) * 30 + minutes * 0.5;

    // Load animation: animate from 0 to current position
    if (!mq.matches) {
      animate(baseMin, initialMin, { duration: 1.2, ease: "easeOut" });
      animate(baseHour, initialHour, { duration: 1.2, ease: "easeOut" });
    } else {
      baseMin.set(initialMin);
      baseHour.set(initialHour);
    }

    if (mq.matches) return;

    // Idle animation: every 20s
    const idleInterval = setInterval(() => {
      const currentMin = baseMin.get();
      const currentHour = baseHour.get();
      animate(baseMin, currentMin + 0.5, { duration: 1, ease: "easeInOut" });
      animate(baseHour, currentHour + (0.5 / 12), { duration: 1, ease: "easeInOut" });
    }, 20000);

    // Micro motion: Every few seconds (3s)
    const microInterval = setInterval(() => {
      animate(microMin, [0, 0.2, 0], { 
        duration: 0.3, 
        times: [0, 0.5, 1],
        ease: "easeInOut" 
      });
    }, 3000);

    return () => {
      clearInterval(idleInterval);
      clearInterval(microInterval);
    };
  }, [baseMin, baseHour, microMin]);

  const handleHoverStart = () => {
    if (reducedMotion) return;
    
    // Sweep 15deg and return for minute hand, 3deg for hour hand
    animate(hoverMin, [0, 15, 0], {
      duration: 1.5,
      times: [0, 0.4, 1],
      ease: "easeInOut"
    });
    animate(hoverHour, [0, 3, 0], {
      duration: 1.5,
      times: [0, 0.4, 1],
      ease: "easeInOut"
    });
  };

  const totalMinDeg = useTransform(() => baseMin.get() + microMin.get() + hoverMin.get());
  const totalHourDeg = useTransform(() => baseHour.get() + hoverHour.get());

  return (
    <div 
      className="relative w-[75px] h-[75px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] flex items-center justify-center p-0.5 select-none pointer-events-auto transition-transform duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a]" 
      
      onMouseEnter={handleHoverStart}
      ref={containerRef}
    >
      <svg width="100%" height="100%" viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
        <defs>
          <filter id="hand-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.08" />
          </filter>
          <linearGradient id="min-hand-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16233A" />
            <stop offset="100%" stopColor="#2c3e5d" />
          </linearGradient>
        </defs>

        {/* Outer Rim */}
        <rect x="-95" y="-95" width="190" height="190" fill="#ffffff" stroke="#0f172a" strokeWidth="6" />

        {/* Minute and Hour Ticks (Pins) */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isHour = i % 5 === 0;
          return (
            <line
              key={`pin-${i}`}
              x1="0"
              y1={isHour ? "-88" : "-91"}
              x2="0"
              y2="-95"
              stroke={isHour ? "#64748b" : "#cbd5e1"}
              strokeWidth={isHour ? "2" : "1.2"}
              transform={`rotate(${i * 6})`}
            />
          );
        })}

        {/* Brand Name "IPURAS" */}
        <text x="0" y="44" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#0f172a" fontFamily="monospace" letterSpacing="2.5">
          IPURAS
        </text>

        {/* Hour Markers */}
        <circle cx="0" cy="-74" r="5.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
        <line x1="0" y1="-78" x2="0" y2="-68" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" transform="rotate(30)" />
        <g transform="rotate(60) translate(0, -74)">
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill="#0f172a" fontFamily="Inter, sans-serif">
            2
          </text>
        </g>
        <circle cx="74" cy="0" r="5.5" fill="#0A66C2" stroke="#0f172a" strokeWidth="2" />
        <g transform="rotate(120) translate(0, -74)">
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill="#0f172a" fontFamily="Inter, sans-serif">
            4
          </text>
        </g>
        <g transform="rotate(150) translate(0, -74)">
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill="#0f172a" fontFamily="Inter, sans-serif">
            5
          </text>
        </g>
        <circle cx="0" cy="74" r="5.5" fill="#EA4335" stroke="#0f172a" strokeWidth="2" />
        <g transform="rotate(210) translate(0, -74)">
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill="#0f172a" fontFamily="Inter, sans-serif">
            7
          </text>
        </g>
        <g transform="rotate(240) translate(0, -74)">
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill="#0f172a" fontFamily="Inter, sans-serif">
            8
          </text>
        </g>
        <circle cx="-74" cy="0" r="5.5" fill="#34d399" stroke="#0f172a" strokeWidth="2" />
        <g transform="rotate(300) translate(0, -74)">
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill="#0f172a" fontFamily="Inter, sans-serif">
            10
          </text>
        </g>
        <g transform="rotate(330)">
          <line x1="-2" y1="-78" x2="-2" y2="-68" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="-78" x2="2" y2="-68" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Premium Hands */}
        <g filter="url(#hand-shadow)">
          {/* Hour Hand */}
          <motion.g style={{ rotate: totalHourDeg }}>
            {/* Invisible bounding box to ensure CSS transform-origin 50% 50% maps to exactly (0,0) */}
            <circle cx="0" cy="0" r="44" fill="none" pointerEvents="none" />
            <rect x="-4" y="-40" width="8" height="44" rx="0" fill="#0f172a" />
            
          </motion.g>

          {/* Minute Hand */}
          <motion.g style={{ rotate: totalMinDeg }}>
            {/* Invisible bounding box to ensure CSS transform-origin 50% 50% maps to exactly (0,0) */}
            <circle cx="0" cy="0" r="65" fill="none" pointerEvents="none" />
            <rect x="-2.5" y="-60.5" width="5" height="63" rx="0" fill="#0f172a" />
          </motion.g>

          {/* Center Cap */}
          <circle cx="0" cy="0" r="9" fill="#ffffff" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="#0f172a" strokeWidth="3" />
          <circle cx="0" cy="0" r="3" fill="#EA4335" />
        </g>
      </svg>
    </div>
  );
}

function GreetingCard({ timeStr, currentHour }: { timeStr: string, currentHour: number }) {
  const [temperature, setTemperature] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('bangalore_temp');
      return cached ? parseFloat(cached) : 28;
    }
    return 28;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m&current_weather=true");
        if (!res.ok) {
          console.warn("Weather API limit reached or failed, using fallback temperature.");
          return;
        }
        const data = await res.json();
        const temp = data.current?.temperature_2m ?? data.current_weather?.temperature;
        if (temp != null && active) {
          const roundedTemp = Math.round(temp);
          setTemperature(roundedTemp);
          localStorage.setItem('bangalore_temp', roundedTemp.toString());
        }
      } catch (err) {
        console.warn("Could not update temperature:", err instanceof Error ? err.message : String(err));
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchWeather();

    // Refresh temperature every 5 minutes (300,000 ms)
    const interval = setInterval(fetchWeather, 300000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  let greeting = 'Rest\nWell 🌙';
  if (currentHour >= 6 && currentHour < 12) greeting = 'Good\nmorning ☀️';
  else if (currentHour >= 12 && currentHour < 17) greeting = 'Good\nafternoon 🌤️';
  else if (currentHour >= 17 && currentHour < 21) greeting = 'Good\nevening 🌇';

  const WeatherIcon = currentHour >= 6 && currentHour < 18 ? Sun : Moon;

  return (
    <div className="flex flex-col items-center justify-center p-0 text-slate-900 pointer-events-none" style={{ width: '400px' }}>
      <div className="mb-8">
        <AnalogClock />
      </div>
      <h1 className="text-6xl font-serif font-medium tracking-tight text-center leading-[1.05] mb-6">
        {greeting.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}<br />
          </React.Fragment>
        ))}
      </h1>
      <div className="flex items-center gap-2 font-medium opacity-90 text-sm">
        <WeatherIcon className="w-4 h-4" />
        <span>It's {temperature !== null ? `${temperature}°` : '...'} in Bangalore, India</span>
        {loading && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" title="Updating..." />
        )}
      </div>
      <div className="mt-8 font-serif italic text-lg opacity-80 text-center text-slate-800">
        "Stop intuiting, start intending"
      </div>
    </div>
  );
}

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#0acf83" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/>
    <path fill="#a259ff" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/>
    <path fill="#f24e1e" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/>
    <path fill="#ff7262" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/>
    <path fill="#1abcfe" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/>
  </svg>
);

const ChatGPTIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.282 9.821a6 6 0 0 0-.516-4.91 6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206 6 6 0 0 0 3.997-2.9 6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023-.141-.085-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z"/>
  </svg>
);const AIStudioIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <defs>
      <mask id="aistudio-star-mask">
        <rect width="24" height="24" fill="white" />
        <path d="M18 13.5 Q 18 6 25.5 6 Q 18 6 18 -1.5 Q 18 6 10.5 6 Q 18 6 18 13.5 Z" fill="black" stroke="black" strokeWidth="3" strokeLinejoin="round" />
      </mask>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="4.5" stroke="currentColor" strokeWidth="2.5" mask="url(#aistudio-star-mask)" />
    <path d="M18 13.5 Q 18 6 25.5 6 Q 18 6 18 -1.5 Q 18 6 10.5 6 Q 18 6 18 13.5 Z" fill="currentColor" />
  </svg>
);

const ClaudeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const points = 15;
  const cx = 50;
  const cy = 50;
  let path = '';
  // Generate a somewhat irregular starburst
  const radii = [45, 12, 38, 12, 42, 12, 35, 12, 44, 12, 37, 12, 40, 12, 36, 12, 43, 12, 39, 12, 41, 12, 38, 12, 46, 12, 34, 12, 45, 12];
  
  for (let i = 0; i < 30; i++) {
    const angle = (i * Math.PI * 2) / 30 - Math.PI / 2;
    const r = radii[i];
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) path += `M ${x} ${y} `;
    else path += `L ${x} ${y} `;
  }
  path += 'Z';
  
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d={path} strokeLinejoin="round" strokeWidth="4" stroke="currentColor" />
    </svg>
  );
};

const AntigravityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" {...props}>
    <defs>
      <linearGradient id="ag-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="25%" stopColor="#4ade80" />
        <stop offset="45%" stopColor="#fbbf24" />
        <stop offset="55%" stopColor="#ef4444" />
        <stop offset="80%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M 18 85 C 30 65 38 20 50 20 C 62 20 70 65 82 85" stroke="url(#ag-gradient)" strokeWidth="18" strokeLinecap="round" />
  </svg>
);

const GoogleLabsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 2v7.31l-6.49 11.27a2 2 0 0 0 1.73 3h13.52a2 2 0 0 0 1.73-3L14 9.31V2" />
    <path d="M8.5 2h7" />
    <path fill="currentColor" stroke="none" d="M 6.73 15 C 9 13, 11 13, 12 15 C 13 17, 15 17, 17.27 15 L 20.49 20.58 A 2 2 0 0 1 18.76 23.58 L 5.24 23.58 A 2 2 0 0 1 3.51 20.58 Z" />
  </svg>
);

const GeminiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EA4335" />
        <stop offset="33%" stopColor="#FBBC05" />
        <stop offset="66%" stopColor="#34A853" />
        <stop offset="100%" stopColor="#4285F4" />
      </linearGradient>
    </defs>
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" fill="url(#gemini-gradient)" />
  </svg>
);

const EmptyPlaceholder = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function ToolSkillsCard() {
  const tools = [
    { name: 'Figma', icon: FigmaIcon, color: '#F24E1E', useOriginalColors: true },
    { name: 'ChatGPT', icon: ChatGPTIcon, color: '#000000', useOriginalColors: false },
    { name: 'AI Studio', icon: AIStudioIcon, color: '#4285F4', useOriginalColors: false },
    { name: 'Gemini', icon: GeminiIcon, color: '#4285F4', useOriginalColors: true },
    { name: 'Claude.ai', icon: ClaudeIcon, color: '#D97757', useOriginalColors: false },
    { name: 'Antigravity', icon: AntigravityIcon, color: '#00e5ff', useOriginalColors: true },
    { name: 'Google Labs', icon: GoogleLabsIcon, color: '#000000', useOriginalColors: false },
  ];

  const radius = 150;
  const duration = 60; // slow, elegant rotation

  return (
    <div className="relative flex items-center justify-center w-[400px] h-[400px] pointer-events-none rounded-full scale-[0.7] sm:scale-100 bg-white shadow-[8px_8px_0px_#0f172a] border-[3px] border-slate-900">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes anti-orbit {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes breathe-center {
          0%, 100% { box-shadow: 0 0 0 rgba(59,130,246,0); }
          50% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
        }
      `}</style>

      {/* Orbit Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border-2 border-slate-900 border-dashed rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] h-[230px] border border-slate-300 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[2px] border-slate-900 rounded-full" />

      {/* Particles travelling along the outer ring (radius 150 -> width 300) */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0" style={{ animation: `orbit 10s linear infinite` }}>
        <div className="absolute top-0 left-[150px] w-3 h-3 bg-amber-500 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Center Icon */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-5 rounded-full border-[3px] border-slate-900 bg-white shadow-[4px_4px_0px_#0f172a] pointer-events-auto"
        style={{ animation: 'breathe-center 4s ease-in-out infinite' }}
      >
        <UserRoundPen className="w-8 h-8 text-slate-900" />
      </div>

      {/* Orbiting Container */}
      <div 
        className="absolute top-1/2 left-1/2 w-0 h-0"
        style={{ animation: `orbit ${duration}s linear infinite` }}
      >
        {tools.map((tool, i) => {
          const angle = (i * 360) / tools.length;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          const Icon = tool.icon;

          return (
            <div 
              key={tool.name}
              className="absolute pointer-events-auto group"
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              <div 
                className="absolute flex flex-col items-center justify-center gap-3"
                style={{ 
                  transform: 'translate(-50%, -50%)',
                  animation: `anti-orbit ${duration}s linear infinite`
                }}
              >
                <button 
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_#0f172a] cursor-pointer focus-visible:ring-4 focus-visible:ring-blue-400 focus:outline-none"
                  aria-label={`Tool: ${tool.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {tool.useOriginalColors ? (
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Icon className="w-6 h-6" style={{ color: tool.name === 'ChatGPT' ? '#10a37f' : tool.color }} aria-hidden="true" />
                  )}
                </button>
                <span className="text-[12px] font-bold text-slate-900 whitespace-nowrap bg-white px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                  {tool.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}