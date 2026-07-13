import React from 'react';
import { PageTexture, Stamp } from './shared';
import { User, MapPin, Briefcase, GraduationCap, Award, ShieldCheck, Flame, Medal, Camera, Plane, Book, Film, Dumbbell, Gamepad, Sparkles, Navigation } from 'lucide-react';

export function IdentityPage() {
    return (
        <div className="w-full h-full p-8 flex flex-col relative bg-[#fdfbf7] font-serif overflow-hidden">
            <PageTexture />
            
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-[3px] border-slate-900 flex items-center justify-center opacity-50">
                        <User className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="font-bold text-xs tracking-widest text-slate-500">IDENTITY PAGE</div>
                </div>
                <div className="font-mono text-xs font-bold text-slate-400 tracking-widest">P&lt;IND</div>
            </div>

            <div className="flex gap-6 z-10 flex-1">
                <div className="w-[120px] shrink-0 flex flex-col">
                    <div className="w-[120px] h-[150px] border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] p-1 bg-white rotate-[-2deg] shadow-sm mb-4">
                        <div className="w-full h-full bg-slate-200 overflow-hidden relative">
                            {/* Passport photo placeholder or actual image */}
                            <img src="/profile-photo.png" alt="Photo" className="w-full h-full object-cover grayscale opacity-90 contrast-125" draggable={false} />
                            <div className="absolute inset-0 bg-blue-500/10 mix-blend-color" />
                            {/* Perforation dots on the photo */}
                            <div className="absolute right-2 top-2 bottom-2 w-1 border-r border-dotted border-white/50" />
                        </div>
                    </div>
                    
                    <div className="mt-auto">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signature</div>
                        <div className="font-[signature] text-2xl text-slate-700 -rotate-3 opacity-80" style={{ fontFamily: 'var(--font-signature, cursive)' }}>
                            Chatriyan D.
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                        <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Surname / Nom</div>
                            <div className="font-bold text-lg text-slate-800 uppercase tracking-wider">D</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Given Name / Prénoms</div>
                            <div className="font-bold text-lg text-slate-800 uppercase tracking-wider">Chatriyan</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Nationality / Nationalité</div>
                            <div className="font-bold text-sm text-slate-800 uppercase tracking-wider">Indian</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Profession</div>
                            <div className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1">UX/UI Designer</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Specialization</div>
                            <div className="font-bold text-xs text-slate-800 uppercase tracking-wider leading-tight">Interaction Design • Design Systems • UX Research • Product Design</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status</div>
                            <div className="font-bold text-sm text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Available for Opportunities
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Contact</div>
                            <div className="font-mono text-[10px] text-slate-800 uppercase tracking-widest">chatruchatriyan@gmail.com | +91 9677421604<br/>Behance | LinkedIn</div>
                        </div>
                    </div>
                    
                    <div className="mt-4 border-t-[3px] border-slate-900 pt-4">
                        <div className="text-[10px] italic text-slate-500 leading-relaxed max-w-[240px]">
                            "I don't design what feels right. I design what people actually intend to do."
                        </div>
                    </div>
                </div>
            </div>

            {/* Machine Readable Zone */}
            <div className="mt-auto pt-6 z-10 flex flex-col font-mono text-sm tracking-widest text-slate-800 font-bold opacity-80 leading-tight">
                <div>P&lt;INDCHATRIYAN&lt;&lt;D&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                <div>UXCD2026&lt;9IND9801017M2612318&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06</div>
            </div>

            <Stamp color="blue" rotate={-15} className="bottom-20 right-8" style={{ width: 80, height: 80, borderRadius: '50%' }}>
                <span className="text-[10px]">ISSUED</span>
                <span className="text-[14px]">2026</span>
            </Stamp>
        </div>
    );
}

export function EducationPage() {
    return (
        <div className="w-full h-full p-6 sm:p-8 flex flex-col relative bg-[#fdfbf7] font-serif overflow-hidden">
            <PageTexture />
            
            <div className="text-center font-bold text-xs tracking-widest text-slate-400 mb-6 z-10 uppercase">
                Education Visas
            </div>

            <div className="flex-1 flex flex-col gap-4 z-10">
                {/* Visa 1 */}
                <div className="relative border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-md p-3 sm:p-4 bg-emerald-50/30 overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-emerald-800/10">
                        <GraduationCap className="w-24 h-24 rotate-12" strokeWidth={1} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-2 relative z-10">
                        <div>
                            <div className="text-[9px] font-bold text-emerald-800/60 uppercase tracking-widest mb-0.5">Entry Permit: Education</div>
                            <h3 className="font-bold text-lg text-emerald-900 leading-tight">Master of Design</h3>
                            <div className="text-xs font-medium text-emerald-800/80">Lovely Professional University, Punjab, India</div>
                        </div>
                        <div className="font-mono text-[9px] font-bold text-emerald-800/50 bg-emerald-800/5 px-1.5 py-0.5 border border-emerald-800/20 rounded ml-2">
                            M.DES
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2 relative z-10">
                        <div>
                            <div className="text-[7px] font-bold text-emerald-800/50 uppercase tracking-widest mb-0.5">Duration</div>
                            <div className="font-mono text-[10px] text-emerald-900">July 2024 - May 2026</div>
                        </div>
                        <div>
                            <div className="text-[7px] font-bold text-emerald-800/50 uppercase tracking-widest mb-0.5">CGPA</div>
                            <div className="font-mono text-[10px] text-emerald-900 font-bold">8.5</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-[7px] font-bold text-emerald-800/50 uppercase tracking-widest mb-0.5">Specialization</div>
                            <div className="font-mono text-[10px] text-emerald-900">Interaction Design</div>
                        </div>
                    </div>

                    <div className="text-[8px] italic text-emerald-800/60 mt-2 relative z-10 max-w-[200px]">
                        Focused on Interaction Design, UX methodologies, human-centered design, design systems and product thinking...
                    </div>

                    <Stamp color="green" rotate={-8} className="absolute bottom-2 right-2 border-2 p-1" style={{ width: 50, height: 50, borderRadius: '50%' }}>
                        <span className="text-[6px] text-center leading-tight">ENTRY<br/>APPROVED</span>
                    </Stamp>
                </div>

                {/* Visa 2 */}
                <div className="relative border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-md p-3 sm:p-4 bg-blue-50/30 overflow-hidden group">
                    <div className="absolute -left-4 -bottom-4 text-blue-800/10">
                        <GraduationCap className="w-24 h-24 -rotate-12" strokeWidth={1} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-2 relative z-10">
                        <div>
                            <div className="text-[9px] font-bold text-blue-800/60 uppercase tracking-widest mb-0.5">Entry Permit: Education</div>
                            <h3 className="font-bold text-lg text-blue-900 leading-tight">B.E Mechanical</h3>
                            <div className="text-xs font-medium text-blue-800/80">Sri Krishna College of Tech, Coimbatore</div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2 relative z-10">
                        <div>
                            <div className="text-[7px] font-bold text-blue-800/50 uppercase tracking-widest mb-0.5">Duration</div>
                            <div className="font-mono text-[10px] text-blue-900">June 2017 - May 2021</div>
                        </div>
                        <div>
                            <div className="text-[7px] font-bold text-blue-800/50 uppercase tracking-widest mb-0.5">CGPA</div>
                            <div className="font-mono text-[10px] text-blue-900 font-bold">7.6</div>
                        </div>
                    </div>

                    <div className="text-[8px] italic text-blue-800/60 mt-2 relative z-10 max-w-[200px]">
                        Developed structured analytical thinking, engineering problem-solving...
                    </div>

                    <Stamp color="blue" rotate={12} className="absolute bottom-2 right-2 border-2 p-1" style={{ width: 50, height: 50, borderRadius: '50%' }}>
                        <span className="text-[6px]">GRADUATED</span>
                    </Stamp>
                </div>

                {/* Visa 3 */}
                <div className="relative border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-md p-2 bg-slate-50/30 overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h3 className="font-bold text-sm text-slate-900 leading-tight">Higher Secondary</h3>
                            <div className="text-[10px] font-medium text-slate-800/80">Vidya Vikas Matric HSS, Pudukkottai</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-[9px] text-slate-900">June 2015 - May 2016</div>
                            <div className="font-mono text-[9px] text-slate-900 font-bold">69.02%</div>
                        </div>
                    </div>
                    <Stamp color="slate" rotate={-5} className="absolute right-12 top-0 border-2" style={{ width: 60, height: 20 }}>
                        <span className="text-[8px]">COMPLETED</span>
                    </Stamp>
                </div>
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-slate-400 font-mono tracking-widest">
                PAGE 2
            </div>
        </div>
    );
}

export function ExperiencePage() {
    return (
        <div className="w-full h-full p-6 sm:p-8 flex flex-col relative bg-[#fdfbf7] font-serif overflow-hidden">
            <PageTexture />
            
            <div className="text-center font-bold text-xs tracking-widest text-slate-400 mb-4 z-10 uppercase">
                Professional Journey
            </div>

            <div className="flex-1 flex flex-col gap-4 z-10 overflow-y-auto no-scrollbar">
                
                {/* Visa 4 */}
                <div className="relative border-b-[3px] border-slate-900 pb-3">
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="font-bold text-sm text-indigo-900 leading-tight">UX/UI Designer</h3>
                            <div className="text-xs font-bold text-indigo-800/80">PSQUARE Company</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-[10px] text-indigo-900">Jan 2026 - Apr 2026</div>
                            <div className="text-[8px] text-indigo-800/60 uppercase tracking-wider font-bold">Mohali, Chandigarh</div>
                        </div>
                    </div>
                    <div className="text-[9px] text-indigo-900/80 mt-1">Designed scalable Design Systems and responsive marketing websites for Construction ERP products. Applied Atomic Design methodology and built reusable components.</div>
                    <div className="text-[8px] italic text-indigo-700/60 mt-1 border-l-2 border-indigo-200 pl-2">Learned how scalable Design Systems accelerate collaboration between designers and developers while maintaining product consistency.</div>
                </div>

                {/* Visa 3 */}
                <div className="relative border-b-[3px] border-slate-900 pb-3">
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="font-bold text-sm text-emerald-900 leading-tight">UX Designer</h3>
                            <div className="text-xs font-bold text-emerald-800/80">HRZWORKZ Private Limited</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-[10px] text-emerald-900">Sep 2025 - Dec 2025</div>
                        </div>
                    </div>
                    <div className="text-[9px] text-emerald-900/80 mt-1">Promoted to UX Designer. Improved user freedom, enhanced navigation consistency, simplified workflows, balanced business logic with usability.</div>
                    <Stamp color="green" rotate={-10} className="absolute right-4 top-4 border-2" style={{ width: 80, height: 30 }}>
                        <span className="text-[7px]">EXTENDED WORK VISA</span>
                    </Stamp>
                </div>

                {/* Visa 2 */}
                <div className="relative border-b-[3px] border-slate-900 pb-3">
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="font-bold text-sm text-purple-900 leading-tight">UX/UI Design Intern</h3>
                            <div className="text-xs font-bold text-purple-800/80">HRZWORKZ Private Limited</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-[10px] text-purple-900">May 2025 - Aug 2025</div>
                            <div className="text-[8px] text-purple-800/60 uppercase tracking-wider font-bold">Remote</div>
                        </div>
                    </div>
                    <div className="text-[9px] text-purple-900/80 mt-1">Designed finance software for SME businesses managing clients, inventory, sales, invoices, and reports. Organized interconnected modules.</div>
                    <div className="text-[8px] italic text-purple-700/60 mt-1 border-l-2 border-purple-200 pl-2">Learned how deeply connected business modules influence each other and how reducing cognitive load improves decision-making.</div>
                </div>

                {/* Visa 1 */}
                <div className="relative pb-2">
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="font-bold text-sm text-red-900 leading-tight">UX/UI Designer</h3>
                            <div className="text-xs font-bold text-red-800/80">Valluva HCM Cloud Suite</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-[10px] text-red-900">Sep 2023 - Jun 2024</div>
                            <div className="text-[8px] text-red-800/60 uppercase tracking-wider font-bold">Chennai</div>
                        </div>
                    </div>
                    
                    <div className="mt-1">
                        <div className="text-[9px] text-red-900/80">Designed enterprise HCM software covering the complete employee lifecycle. Simplified payroll workflows, improved leave approvals, designed tablet app for biometric punch-ins.</div>
                        <div className="text-[8px] italic text-red-700/60 mt-1 border-l-2 border-red-200 pl-2">Learned that product functionality always comes before visual polish, especially in enterprise software where efficiency directly impacts users' daily work.</div>
                    </div>

                    <Stamp color="red" rotate={15} className="absolute right-0 top-6 border-2 bg-white/50 backdrop-blur-sm" style={{ width: 70, height: 35 }}>
                        <span className="text-[8px]">WORK VISA</span>
                    </Stamp>
                </div>
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-slate-400 font-mono tracking-widest">
                PAGE 3
            </div>
        </div>
    );
}

export function SkillsPage() {
    return (
        <div className="w-full h-full p-8 flex flex-col relative bg-[#fdfbf7] font-serif overflow-hidden">
            <PageTexture />
            
            <div className="text-center font-bold text-xs tracking-widest text-slate-400 mb-4 z-10 uppercase">
                Skill Entry Stamps
            </div>

            <div className="flex-1 relative z-10 h-full w-full">
                
                {/* Research Stamps */}
                <Stamp color="blue" rotate={-10} className="top-2 left-2" style={{ width: 100, height: 40 }}>
                    <span className="text-[10px]">UX RESEARCH</span>
                    <span className="text-[6px]">ENTRY APPROVED</span>
                </Stamp>
                <Stamp color="purple" rotate={5} className="top-4 right-4" style={{ width: 90, height: 35 }}>
                    <span className="text-[10px]">USER INTERVIEW</span>
                    <span className="text-[6px]">VERIFIED</span>
                </Stamp>
                <Stamp color="slate" rotate={-15} className="top-14 left-24" style={{ width: 80, height: 30 }}>
                    <span className="text-[9px]">SURVEY</span>
                    <span className="text-[6px]">AUTHORIZED</span>
                </Stamp>
                <Stamp color="green" rotate={12} className="top-16 right-16" style={{ width: 110, height: 40 }}>
                    <span className="text-[10px]">AFFINITY MAPPING</span>
                    <span className="text-[6px]">ENTRY GRANTED</span>
                </Stamp>
                <Stamp color="red" rotate={-5} className="top-24 right-2" style={{ width: 90, height: 30 }}>
                    <span className="text-[9px]">OBSERVATION</span>
                    <span className="text-[6px]">APPROVED</span>
                </Stamp>
                <Stamp color="slate" rotate={8} className="top-28 left-6" style={{ width: 95, height: 35 }}>
                    <span className="text-[9px] leading-tight text-center">COMPETITOR<br/>ANALYSIS</span>
                    <span className="text-[6px] border-t border-current mt-0.5 pt-0.5">VERIFIED</span>
                </Stamp>

                {/* Design Stamps */}
                <Stamp color="red" rotate={-8} className="top-40 left-32" style={{ width: 90, height: 80, borderRadius: '50%' }}>
                    <span className="text-[10px] leading-tight text-center">WIREFRAMING<br/>VERIFIED</span>
                </Stamp>
                <Stamp color="blue" rotate={18} className="top-36 right-6" style={{ width: 85, height: 35 }}>
                    <span className="text-[10px]">PROTOTYPING</span>
                    <span className="text-[6px]">ENTRY APPROVED</span>
                </Stamp>
                <Stamp color="green" rotate={-4} className="top-48 left-4" style={{ width: 120, height: 40 }}>
                    <span className="text-[10px]">MICRO INTERACTIONS</span>
                    <span className="text-[6px]">CERTIFIED</span>
                </Stamp>
                <Stamp color="slate" rotate={10} className="top-52 right-12" style={{ width: 80, height: 30 }}>
                    <span className="text-[9px]">HIGH FIDELITY</span>
                    <span className="text-[6px]">APPROVED</span>
                </Stamp>
                <Stamp color="purple" rotate={-15} className="top-60 left-36" style={{ width: 95, height: 35 }}>
                    <span className="text-[9px] leading-tight text-center">USABILITY<br/>TESTING</span>
                    <span className="text-[6px] border-t border-current mt-0.5 pt-0.5">AUTHORIZED</span>
                </Stamp>
                
                {/* Software Stamps */}
                <Stamp color="slate" rotate={-12} className="bottom-24 left-6" style={{ width: 90, height: 45, borderRadius: '4px' }}>
                    <span className="text-[12px] font-bold">FIGMA</span>
                    <span className="text-[7px]">MASTER ENTRY</span>
                </Stamp>
                <Stamp color="purple" rotate={10} className="bottom-28 right-8" style={{ width: 80, height: 35 }}>
                    <span className="text-[10px]">FRAMER</span>
                    <span className="text-[6px]">VERIFIED</span>
                </Stamp>
                <Stamp color="red" rotate={-20} className="bottom-14 left-28" style={{ width: 75, height: 35 }}>
                    <span className="text-[10px]">SPLINE</span>
                    <span className="text-[6px]">AUTHORIZED</span>
                </Stamp>
                <Stamp color="blue" rotate={15} className="bottom-12 right-20" style={{ width: 80, height: 40 }}>
                    <span className="text-[10px]">BLENDER</span>
                    <span className="text-[6px]">APPROVED</span>
                </Stamp>
                <Stamp color="green" rotate={-5} className="bottom-4 left-6" style={{ width: 90, height: 50, borderRadius: '50%' }}>
                    <span className="text-[9px] leading-tight text-center">ADOBE CC<br/>CERTIFIED</span>
                </Stamp>
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-slate-400 font-mono tracking-widest">
                PAGE 4
            </div>
        </div>
    );
}

export function CertificatesPage() {
    return (
        <div className="w-full h-full p-8 flex flex-col relative bg-[#fdfbf7] font-serif overflow-hidden">
            <PageTexture />
            
            <div className="text-center font-bold text-xs tracking-widest text-slate-400 mb-6 z-10 uppercase">
                Official Certifications
            </div>

            <div className="flex-1 flex flex-col gap-6 z-10 items-center justify-center">
                <div className="w-full border-[3px] border-slate-800/80 p-1 relative">
                    <div className="border border-slate-800/40 p-4 relative bg-white/40">
                        {/* Decorative corners */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-slate-800" />
                        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-slate-800" />
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-slate-800" />
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-slate-800" />
                        
                        <div className="text-center mb-4">
                            <ShieldCheck className="w-8 h-8 mx-auto text-slate-700/80 mb-2" />
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Coursera</div>
                            <h3 className="font-bold text-xl text-slate-800 uppercase tracking-widest leading-tight mt-1">Google UX Design<br/>Professional<br/>Certificate</h3>
                        </div>
                        
                        <div className="flex justify-between items-end border-t border-slate-800/20 pt-2 mt-4">
                            <div>
                                <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Approval Date</div>
                                <div className="font-mono text-[10px] text-slate-700">DEC 2022</div>
                            </div>
                            <div>
                                <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status</div>
                                <div className="font-mono text-[10px] text-slate-700 font-bold">CERTIFIED</div>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                            <Award className="w-32 h-32 text-slate-900" />
                        </div>
                    </div>
                </div>

                <div className="w-full border-[3px] border-slate-800/80 p-1 relative">
                    <div className="border border-slate-800/40 p-4 relative bg-white/40">
                        {/* Decorative corners */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-slate-800" />
                        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-slate-800" />
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-slate-800" />
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-slate-800" />
                        
                        <div className="text-center mb-4">
                            <Flame className="w-8 h-8 mx-auto text-slate-700/80 mb-2" />
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">WebDSchool Chennai</div>
                            <h3 className="font-bold text-lg text-slate-800 uppercase tracking-widest leading-tight mt-1">Diploma in<br/>UX/UI Design</h3>
                        </div>
                        
                        <div className="flex justify-between items-end border-t border-slate-800/20 pt-2 mt-4">
                            <div>
                                <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Duration</div>
                                <div className="font-mono text-[10px] text-slate-700">MAY - AUG 2023</div>
                            </div>
                            <div>
                                <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status</div>
                                <div className="font-mono text-[10px] text-slate-700 font-bold">CERTIFIED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-slate-400 font-mono tracking-widest">
                PAGE 5
            </div>
        </div>
    );
}

export function AchievementsPage() {
    return (
        <div className="w-full h-full p-8 flex flex-col relative bg-[#fdfbf7] font-serif overflow-hidden">
            <PageTexture />
            
            <div className="text-center font-bold text-xs tracking-widest text-slate-400 mb-6 z-10 uppercase">
                Achievements & Interests
            </div>

            <div className="flex-1 relative z-10 flex flex-col gap-6">
                
                <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500 border-2 border-amber-600 flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm">
                        <div className="absolute inset-0 border-[2px] border-dashed border-amber-200/50 rounded-full" />
                        <Medal className="w-6 h-6 text-amber-100 relative z-10" />
                    </div>
                    <div>
                        <div className="font-bold text-sm text-slate-800">Design Hackathon</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Upslide Studios</div>
                        <div className="text-xs text-slate-600 mt-1">Apr 2025</div>
                    </div>
                    <Stamp color="amber" rotate={-15} className="absolute right-0 top-0 border-2" style={{ width: 80, height: 40 }}>
                        <span className="text-[7px] text-center leading-tight">SPECIAL<br/>ACHIEVEMENT</span>
                    </Stamp>
                </div>

                <div className="border-t-[3px] border-slate-900 pt-4 mt-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Travel Stickers (Interests)</div>
                    <div className="flex flex-wrap gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[-10deg] shadow-sm relative group">
                            <Camera className="w-5 h-5 text-blue-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Photography</div>
                        </div>
                        <div className="w-12 h-8 bg-red-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[5deg] shadow-sm relative group" style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}>
                            <Plane className="w-4 h-4 text-red-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Travel</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[15deg] shadow-sm relative group">
                            <Book className="w-4 h-4 text-emerald-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Books</div>
                        </div>
                        <div className="w-10 h-10 rounded bg-purple-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[-5deg] shadow-sm relative group">
                            <Film className="w-5 h-5 text-purple-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Film Enthusiast</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[20deg] shadow-sm relative group">
                            <Navigation className="w-4 h-4 text-orange-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Badminton</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[-15deg] shadow-sm relative group">
                            <Dumbbell className="w-4 h-4 text-slate-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Fitness</div>
                        </div>
                        <div className="w-10 h-10 bg-yellow-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[10deg] shadow-sm relative group">
                            <Sparkles className="w-5 h-5 text-yellow-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Meditation</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-pink-100 border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center rotate-[-20deg] shadow-sm relative group">
                            <Gamepad className="w-5 h-5 text-pink-600" />
                            <div className="absolute -bottom-4 opacity-0 group-hover:opacity-100 text-[8px] font-mono whitespace-nowrap bg-white px-1 border border-slate-200 z-20">Video Games</div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-auto pb-4 text-center">
                    <p className="font-[signature] text-lg text-slate-700 leading-tight rotate-[-2deg]" style={{ fontFamily: 'var(--font-signature, cursive)' }}>
                        "Every project added a stamp. Every challenge became a destination. I'm still collecting pages."
                    </p>
                </div>
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-slate-400 font-mono tracking-widest">
                PAGE 6
            </div>
        </div>
    );
}
