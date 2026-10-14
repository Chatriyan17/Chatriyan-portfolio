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
      className="pixel-panel w-full sm:w-[320px] lg:w-[260px] lg:h-[360px] p-5 flex flex-col relative pointer-events-auto shrink-0 group"
      style={{ rotate }}
      whileHover={{ 
        scale: 1.02, 
        rotate: rotate > 0 ? rotate + 1 : rotate - 1, 
        y: -8,
        zIndex: 10,
        boxShadow: "inset -4px -4px 0 0 rgba(185,130,80,0.28), inset 4px 4px 0 0 rgba(255,255,255,0.6), 0 -4px 0 0 #493529, 0 4px 0 0 #493529, -4px 0 0 0 #493529, 4px 0 0 0 #493529, 0 16px 0 0 rgba(73,53,41,0.35)"
      }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
    >
      {/* Tape */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#E8C69A] border-2 border-slate-900/40 rotate-1 z-10 transition-transform group-hover:scale-105" />

      {/* Folded corner effect (bottom right) */}
      <div className="absolute bottom-0 right-0 border-[10px] border-transparent border-b-[#E8C69A] border-r-[#E8C69A] z-10" />

      <div className="flex items-center gap-4 mb-4">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="pixel-slot bg-white w-9 h-9 flex items-center justify-center shrink-0 hover:-translate-y-0.5 transition-transform cursor-pointer" title={`Open ${title}`}>
            {icon}
          </a>
        ) : (
          <div className="pixel-slot bg-white w-9 h-9 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-pixel font-bold text-lg text-slate-900 uppercase tracking-wide leading-tight">{title}</h3>
          <p className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{helperText}</p>
        </div>
      </div>
      
      {platform === 'linkedin' ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col items-center mt-2 space-y-3">
             <div className="w-16 h-16 bg-slate-200 border-4 border-slate-900 shadow-[4px_4px_0_0_rgba(73,53,41,0.35)] overflow-hidden flex items-center justify-center">
               <img src={linkedinAvatar} alt="Chatriyan" className="w-full h-full object-cover" draggable={false} />
             </div>
             <div className="text-center">
               <p className="font-pixel font-semibold text-slate-900 text-base">AI Product Designer</p>
               <div className="flex items-center justify-center gap-1 text-slate-500 mt-1">
                 <MapPin className="w-3 h-3" />
                 <span className="text-[10px] font-semibold">Bengaluru, India</span>
               </div>
             </div>
             <div className="pixel-badge bg-green-100 text-green-800 text-[10px] font-semibold px-2 py-0.5 flex items-center gap-1.5 mt-2">
               <div className="w-1.5 h-1.5 bg-green-600 px-blink" />
               Open to Work
             </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto pt-4">
            <button
              className="pixel-btn pixel-btn--forest w-full text-xs py-2.5"
              onClick={() => {
                const profile = import.meta.env.VITE_LINKEDIN_PROFILE || 'https://linkedin.com/';
                window.open(profile, '_blank');
              }}
            >
              View Profile <Linkedin className="w-3 h-3" />
            </button>
            <button
              className="pixel-btn w-full text-xs py-2.5"
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
          <div className="flex flex-wrap gap-2.5 mb-4 mt-1">
            {CHIPS.slice(0, 3).map(chip => (
              <button 
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="pixel-badge text-[10px] font-semibold bg-[#E8C69A] px-1.5 py-0.5 text-slate-900 hover:bg-[#9AA889] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="relative flex-1 flex flex-col">
            <textarea 
              className="w-full bg-transparent border-b-4 border-dashed border-slate-900/25 focus:border-slate-900 outline-none resize-none flex-1 min-h-[100px] text-xs font-semibold text-slate-700 placeholder:text-slate-400 leading-relaxed"
              placeholder="Hi Chatriyan, ..."
              value={message}
              onChange={handleMessageChange}
            />
            <div className="font-pixel text-[11px] text-slate-500 text-right mt-1.5">
              {message.length} / 1000
            </div>
          </div>

          <button
            className={`pixel-btn mt-4 w-full text-xs py-2.5 group disabled:pointer-events-none ${platform === 'whatsapp' ? 'pixel-btn--sage' : 'pixel-btn--terracotta'}`}
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
            className="pixel-dialog absolute -bottom-12 left-0 right-0 bg-[#9AA889] p-1.5 text-center font-pixel text-[11px] font-semibold uppercase text-slate-900 z-50"
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
      <div className="absolute inset-0 bg-[#C9935F] border-[16px] border-[#B98250] shadow-[0_0_0_4px_#493529,inset_0_0_0_4px_#493529,0_18px_0_4px_rgba(73,53,41,0.35)] -z-20 overflow-hidden">
        {/* Cork Texture Overlay */}
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(90deg, #8A5E38 4px, transparent 4px), linear-gradient(#8A5E38 4px, transparent 4px)', backgroundSize: '16px 16px, 24px 20px', backgroundPosition: '0 0, 8px 6px' }} />
        
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
        <div className="absolute top-8 right-8 w-3 h-3 bg-red-500 border-2 border-slate-900 z-0" />
        <div className="absolute bottom-8 left-8 w-3 h-3 bg-green-600 border-2 border-slate-900 z-0" />
      </div>
      
      {/* Title */}
      <div className="pixel-wood pixel-sign absolute -top-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[420px] h-[70px] sm:h-[90px] z-30 flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
        <h2 className="font-pixel font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest text-[#FFF1D6]" style={{ textShadow: '3px 3px 0 #493529' }}>Let's Connect</h2>
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
