import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Linkedin, Paperclip, MapPin, Plane, Coffee, Scissors, Bookmark } from 'lucide-react';
import { WhatsappIcon } from './WhatsappIcon';
import { EmailIcon } from './EmailIcon';
import linkedinAvatar from '../assets/linkedin-avatar.jpg';

const CHIPS = ['Project Inquiry', 'Freelance', 'Job Opportunity', 'Collaboration', 'Just Saying Hi'];

interface MessageNoteProps {
  platform: 'whatsapp' | 'linkedin' | 'email';
  icon: React.ReactNode;
  title: string;
  helperText: string;
  rotate: number;
  href?: string;
}

function MessageNote({ platform, icon, title, helperText, rotate, href }: MessageNoteProps) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem(`draft_${platform}`);
    if (saved) setMessage(saved);
  }, [platform]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value.slice(0, 1000);
    setMessage(val);
    localStorage.setItem(`draft_${platform}`, val);
  };

  const handleChipClick = (chip: string) => {
    const newVal = message ? `${message}\n${chip}` : chip;
    setMessage(newVal.slice(0, 1000));
    localStorage.setItem(`draft_${platform}`, newVal.slice(0, 1000));
  };

  const handleSend = () => {
    if (!message.trim() && platform !== 'linkedin') return;
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      if (typeof window !== 'undefined') {
        const text = encodeURIComponent(message);
        if (platform === 'whatsapp') {
          window.open(`https://wa.me/919677421604?text=${text}`, '_blank');
        } else if (platform === 'linkedin') {
          navigator.clipboard.writeText(message).catch(() => {});
          const profile = import.meta.env.VITE_LINKEDIN_PROFILE || 'https://linkedin.com/';
          window.open(profile, '_blank');
        } else if (platform === 'email') {
          const email = 'chatruchatriyan@gmail.com';
          const subject = 'Portfolio Inquiry';
          window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${text}`, '_blank');
        }
      }

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
        localStorage.removeItem(`draft_${platform}`);
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div 
      className="bg-[#fdfbf7] w-full sm:w-[320px] lg:w-[260px] lg:h-[360px] p-5 shadow-[8px_8px_0px_#0f172a] border-[3px] border-slate-900 flex flex-col relative pointer-events-auto shrink-0 group rounded-md"
      style={{ rotate }}
      whileHover={{ 
        scale: 1.02, 
        rotate: rotate > 0 ? rotate + 1 : rotate - 1, 
        y: -8,
        zIndex: 10,
        boxShadow: "12px 12px 0px #0f172a"
      }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#e5e5e5] opacity-90 shadow-sm border border-slate-900/10 rotate-1 z-10 transition-transform group-hover:scale-105" />

      {/* Folded corner effect (bottom right) */}
      <div className="absolute bottom-0 right-0 border-[10px] border-transparent border-b-[#e5e5e5] border-r-[#e5e5e5] z-10" />

      <div className="flex items-center gap-3 mb-4">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="bg-white w-9 h-9 border-[2.5px] border-slate-900 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-[2px_2px_0px_#0f172a] hover:shadow-[4px_4px_0px_#0f172a] hover:-translate-y-0.5 cursor-pointer" title={`Open ${title}`}>
            {icon}
          </a>
        ) : (
          <div className="bg-white w-9 h-9 border-[2.5px] border-slate-900 rounded-full flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-black text-base text-slate-900 uppercase tracking-wide leading-tight">{title}</h3>
          <p className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{helperText}</p>
        </div>
      </div>
      
      {platform === 'linkedin' ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center mt-2 space-y-3">
             <div className="w-16 h-16 bg-slate-200 border-[3px] border-slate-900 rounded-full overflow-hidden flex items-center justify-center">
               <img src={linkedinAvatar} alt="Chatriyan" className="w-full h-full object-cover" draggable={false} />
             </div>
             <div className="text-center">
               <p className="font-bold text-slate-900 text-sm">AI Product Designer</p>
               <div className="flex items-center justify-center gap-1 text-slate-500 mt-1">
                 <MapPin className="w-3 h-3" />
                 <span className="text-[10px] font-semibold">Bengaluru, India</span>
               </div>
             </div>
             <div className="bg-green-100 border border-slate-900 text-green-800 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 mt-1">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               Open to Work
             </div>
          </div>

          <div className="flex flex-col gap-2 mt-auto pt-4">
            <button
              className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white font-black text-xs uppercase tracking-widest py-2.5 transition-colors flex items-center justify-center gap-2 border-[2.5px] border-slate-900 shadow-[3px_3px_0px_#0f172a] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#0f172a]"
              onClick={() => {
                const profile = import.meta.env.VITE_LINKEDIN_PROFILE || 'https://linkedin.com/';
                window.open(profile, '_blank');
              }}
            >
              View Profile <Linkedin className="w-3 h-3" />
            </button>
            <button
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-widest py-2.5 transition-colors flex items-center justify-center gap-2 border-[2.5px] border-slate-900 shadow-[3px_3px_0px_#0f172a] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#0f172a]"
              onClick={() => {
                const profile = import.meta.env.VITE_LINKEDIN_PROFILE || 'https://linkedin.com/';
                window.open(`${profile}/overlay/contact-info/`, '_blank');
              }}
            >
              Message
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {CHIPS.slice(0, 3).map(chip => (
              <button 
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="text-[9px] font-black uppercase tracking-wider bg-white border-[2px] border-slate-900 px-1.5 py-0.5 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="relative flex-1 flex flex-col">
            <textarea 
              className="w-full bg-transparent border-b-[2px] border-slate-900/20 focus:border-slate-900 outline-none resize-none flex-1 min-h-[100px] text-xs font-semibold text-slate-700 placeholder:text-slate-400 leading-relaxed"
              placeholder="Hi Chatriyan, ..."
              value={message}
              onChange={handleMessageChange}
            />
            <div className="text-[9px] font-bold text-slate-400 text-right mt-1.5">
              {message.length} / 1000
            </div>
          </div>

          <button
            className={`mt-3 w-full font-black text-xs uppercase tracking-widest py-2.5 transition-colors flex items-center justify-center gap-2 group border-[2.5px] border-slate-900 shadow-[3px_3px_0px_#0f172a] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#0f172a] disabled:bg-[#8f9699] disabled:border-[#8f9699] disabled:shadow-none disabled:text-white disabled:pointer-events-none ${platform === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#1da851] text-white' : 'bg-[#EA4335] hover:bg-[#c5221f] text-white'}`}
            onClick={handleSend}
            disabled={!message.trim() || status !== 'idle'}
          >
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div key="idle" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  Send <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.div>
              )}
              {status === 'sending' && (
                <motion.div key="sending" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  Sending... <Send className="w-3.5 h-3.5 animate-bounce" />
                </motion.div>
              )}
              {status === 'sent' && (
                <motion.div key="sent" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  Sent <Check className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </>
      )}

      {/* Success Toast */}
      <AnimatePresence>
        {status === 'sent' && (
          <motion.div 
            className="absolute -bottom-10 left-0 right-0 bg-[#34d399] border-[2.5px] border-slate-900 shadow-[3px_3px_0px_#0f172a] p-1.5 text-center text-[10px] font-extrabold uppercase text-slate-900 z-50"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {platform === 'whatsapp' ? 'Opening WhatsApp...' : 'Opening mail client...'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactBoard() {
  return (
    <motion.div 
      className="relative w-full max-w-[960px] lg:w-[960px] lg:h-[560px] min-h-[560px] p-6 lg:p-9 pointer-events-auto flex flex-col items-center justify-center my-8 lg:my-0 group"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      
      {/* Wooden Frame + Corkboard Background */}
      <div className="absolute inset-0 bg-[#dcae82] border-[12px] border-[#8b5a2b] shadow-[16px_16px_0px_#0f172a] rounded-md -z-20 overflow-hidden">
        {/* Cork Texture Overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        
        {/* Background Decorations (Scrapbook feel) */}
        <div className="absolute top-12 left-12 w-28 h-16 bg-blue-50 -rotate-6 shadow-sm border border-slate-900/10 flex items-center justify-center opacity-70 z-0">
           <Plane className="w-5 h-5 text-blue-200" />
           <span className="absolute bottom-1 right-2 text-[8px] font-bold text-blue-300">BLR -&gt; NYC</span>
        </div>
        <div className="absolute bottom-16 left-24 w-12 h-12 bg-yellow-100 rotate-12 shadow-sm border border-slate-900/10 flex items-center justify-center opacity-80 z-0">
           <Coffee className="w-4 h-4 text-yellow-500/50" />
        </div>
        <div className="absolute top-24 right-16 w-32 h-20 bg-rose-50 rotate-3 shadow-sm border border-slate-900/10 opacity-70 z-0 flex flex-col p-2">
           <div className="h-2 w-12 bg-rose-200/50 mb-1 rounded-full" />
           <div className="h-2 w-20 bg-rose-200/50 mb-1 rounded-full" />
           <Scissors className="w-6 h-6 text-rose-300 absolute bottom-2 right-2" />
        </div>
        <div className="absolute bottom-12 right-20 w-16 h-24 bg-teal-50 -rotate-12 shadow-sm border border-slate-900/10 flex items-center justify-center opacity-60 z-0">
           <Bookmark className="w-5 h-5 text-teal-200" />
        </div>
        
        {/* Random Pins */}
        <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-red-500 shadow-sm border border-slate-900 z-0" />
        <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-blue-500 shadow-sm border border-slate-900 z-0" />
      </div>
      
      {/* Title */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[420px] h-[70px] sm:h-[90px] bg-white border-[3px] sm:border-[4px] border-slate-900 shadow-[6px_6px_0px_#0f172a] -rotate-1 z-30 flex flex-col items-center justify-center transition-transform hover:-rotate-2">
        {/* Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-5 sm:h-6 bg-[#e5e5e5] opacity-90 shadow-sm border border-slate-900/10 rotate-2 z-40" />
        <h2 className="font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest text-slate-900" style={{ fontFamily: 'var(--font-sans)' }}>Let's Connect</h2>
      </div>

      {/* Cards Container */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 z-10 mt-12 lg:mt-0 pt-6 lg:pt-0 pb-[130px] lg:pb-0">
        <MessageNote 
          platform="whatsapp" 
          icon={<WhatsappIcon className="w-4 h-4 text-[#25D366]" />}
          title="WhatsApp"
          helperText="+91-9677421604"
          rotate={-2}
          href="https://wa.me/919677421604"
        />
        <MessageNote 
          platform="linkedin" 
          icon={<Linkedin className="w-4 h-4 text-[#0A66C2] fill-[#0A66C2]" />}
          title="LinkedIn"
          helperText="Professional inquiries."
          rotate={1}
          href={import.meta.env.VITE_LINKEDIN_PROFILE || 'https://linkedin.com/'}
        />
        <MessageNote 
          platform="email" 
          icon={<EmailIcon className="w-4 h-4 text-[#EA4335]" />}
          title="Email"
          helperText="chatruchatriyan@gmail.com"
          rotate={-1.5}
          href="mailto:chatruchatriyan@gmail.com"
        />
      </div>
    </motion.div>
  );
}
