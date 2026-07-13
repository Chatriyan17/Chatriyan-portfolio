import React from 'react';

export function PageTexture() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[8px] z-0 mix-blend-overlay opacity-40">
            <svg className="absolute inset-0 w-full h-full">
                <filter id="paper-texture">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.9 0 0 0  0 0.8 0 0 0  0 0 0 0.1 0" in="noise" result="coloredNoise" />
                    <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-texture)" />
            </svg>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMMCA0TDIgNEwyIDBaIiBmaWxsPSIjMDAwIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] rotate-[-30deg] scale-150 pointer-events-none">
                <div className="w-64 h-64 border-[10px] border-current rounded-full flex items-center justify-center">
                    <div className="text-6xl font-serif font-bold uppercase tracking-widest">PASSPORT</div>
                </div>
            </div>

            {/* Micro printing lines */}
            <div className="absolute top-4 left-4 right-4 h-1 border-t border-b border-black/5 flex flex-col justify-between overflow-hidden">
                <div className="text-[3px] text-black/20 font-mono tracking-widest whitespace-nowrap">OFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENT</div>
                <div className="text-[3px] text-black/20 font-mono tracking-widest whitespace-nowrap">OFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENT</div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 h-1 border-t border-b border-black/5 flex flex-col justify-between overflow-hidden">
                <div className="text-[3px] text-black/20 font-mono tracking-widest whitespace-nowrap">OFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENT</div>
                <div className="text-[3px] text-black/20 font-mono tracking-widest whitespace-nowrap">OFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENTOFFICIALDOCUMENT</div>
            </div>
            
            {/* Security fibers */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
                <path d="M 10 50 Q 20 20 50 10" stroke="#f87171" strokeWidth="0.5" fill="none" />
                <path d="M 150 200 Q 180 250 200 220" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
                <path d="M 300 80 Q 320 100 350 90" stroke="#f87171" strokeWidth="0.5" fill="none" />
                <path d="M 400 300 Q 380 320 420 350" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
                <path d="M 50 400 Q 80 380 100 420" stroke="#f87171" strokeWidth="0.5" fill="none" />
            </svg>
        </div>
    );
}

export function Stamp({ children, color = 'red', rotate = 0, style, className = '' }: { children: React.ReactNode, color?: string, rotate?: number, style?: React.CSSProperties, className?: string }) {
    const colorMap: Record<string, string> = {
        red: 'text-red-700 border-red-700/80',
        blue: 'text-blue-700 border-blue-700/80',
        green: 'text-emerald-700 border-emerald-700/80',
        purple: 'text-purple-700 border-purple-700/80',
        slate: 'text-slate-600 border-slate-600/80',
    };

    return (
        <div 
            className={`absolute flex items-center justify-center p-2 border-[3px] rounded-sm font-mono font-bold uppercase tracking-widest opacity-80 mix-blend-multiply ${colorMap[color] || colorMap.red} ${className}`}
            style={{ 
                transform: `rotate(${rotate}deg)`, 
                ...style 
            }}
        >
            <div className="border border-current p-1.5 w-full h-full flex flex-col items-center justify-center text-center leading-none">
                {children}
            </div>
            
            {/* Stamp grunge effect overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen text-white">
                <filter id="grunge">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" in="noise" result="coloredNoise" />
                    <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" />
                </filter>
                <rect width="100%" height="100%" fill="currentColor" filter="url(#grunge)" />
            </svg>
        </div>
    );
}

