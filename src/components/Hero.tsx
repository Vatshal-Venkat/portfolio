"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-[#020202] overflow-hidden font-sans selection:bg-[#B38B71]/30">

            {/* ========== TOP NAVIGATION / BRAND ========== */}
            <div className="absolute top-8 left-8 md:top-10 md:left-12 lg:left-20 lg:top-12 z-50 flex items-center gap-2">
                <span className="text-white font-black text-3xl tracking-widest">VENKAT</span>
                <span className="text-[#B38B71] font-black text-3xl px-1">✦</span>
                <span className="text-white font-black text-3xl tracking-widest">VATSHAL</span>
            </div>

            {/* ========== TOP RIGHT MENU ========== */}
            <div className="absolute top-8 right-8 md:top-10 md:right-12 lg:right-20 lg:top-12 z-50 flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-full flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-sm group">
                    <span className="w-4 h-[2px] bg-white group-hover:w-5 transition-all"></span>
                    <span className="w-4 h-[2px] bg-white/70 group-hover:w-5 transition-all"></span>
                </div>
            </div>

            {/* ========== BACKGROUND TEXT ========== */}
            <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.04 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-[15vw] md:text-[14vw] font-black text-white leading-none tracking-[0.05em] uppercase whitespace-nowrap translate-x-[5%]"
                >
                    VATSHAL
                </motion.h1>
            </div>

            {/* ========== LEFT CONTENT AREA ========== */}
            <div
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%', zIndex: 30 }}
                className="flex flex-col justify-center pl-8 md:pl-16 lg:pl-28 pr-4 pointer-events-none"
            >
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto mt-10"
                >
                    {/* Role pills */}
                    <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/70 tracking-[0.2em] uppercase font-bold backdrop-blur-md">AI Engineer</span>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/70 tracking-[0.2em] uppercase font-bold backdrop-blur-md">Full Stack</span>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/70 tracking-[0.2em] uppercase font-bold backdrop-blur-md">Systems</span>
                    </div>

                    {/* Main headline */}
                    <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
                        Crafting AI
                        <br />
                        that <span className="text-[#B38B71]">ships</span>
                        <br />
                        <span className="text-[#B38B71]">to prod.</span>
                    </h2>

                    {/* Accent divider */}
                    <div className="w-16 md:w-24 h-[4px] bg-gradient-to-r from-[#B38B71] to-transparent mb-8"></div>

                    {/* Description - Written well and spaced out */}
                    <p className="text-white/60 text-sm md:text-base lg:text-lg leading-loose max-w-[500px] mb-12 font-medium tracking-wide">
                        I am a passionate software engineer building intelligent scalable systems. I transform complex ideas into production-quality, full-stack applications with beautiful user experiences.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-5 mb-12">
                        <a href="/resume.pdf" target="_blank" className="px-8 py-3.5 rounded-md bg-[#B38B71] text-white font-bold tracking-widest text-[11px] md:text-xs hover:bg-white hover:text-black transition-all whitespace-nowrap flex items-center gap-2 group shadow-lg">
                            RESUME
                            <span className="transition-transform group-hover:translate-x-1 font-black text-xs">→</span>
                        </a>
                        <a href="#projects" className="px-8 py-3.5 rounded-md border border-white/20 text-white/80 font-bold tracking-widest text-[11px] md:text-xs hover:border-[#B38B71] hover:text-[#B38B71] transition-all whitespace-nowrap backdrop-blur-md">
                            PROJECTS
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a href="https://linkedin.com/in/venkat-vatshal" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white/40 hover:text-[#B38B71] transition-colors rounded-full border border-white/10 p-2">
                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href="https://github.com/vatshal-venkat" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white/40 hover:text-[#B38B71] transition-colors rounded-full border border-white/10 p-2">
                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a href="mailto:venkatvatshal@gmail.com" className="group flex items-center gap-2 text-white/40 hover:text-[#B38B71] transition-colors rounded-full border border-white/10 p-2">
                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </motion.div>

                {/* Bottom-left status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-8 left-8 md:bottom-12 md:left-16 lg:left-28 flex items-center gap-3"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B38B71] animate-pulse"></span>
                    <span className="text-white/40 text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold">Available for work</span>
                </motion.div>
            </div>

            {/* ========== RIGHT SIDE — Circle + Photo ========== */}
            
            {/* The sleek brown line wrapping from the left exactly to where the photo block begins on desktop! */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-[4px] bg-[#B38B71] z-40 origin-left shadow-[0_0_20px_rgba(179,139,113,0.5)] w-[55%] md:w-[60%] lg:w-[60%]"
            />

            {/* Circle background — positioned perfectly behind photo */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ position: 'absolute', right: '5%', bottom: '5%', zIndex: 15 }}
                className="w-[50vmin] h-[50vmin] md:w-[55vmin] md:h-[55vmin] max-w-[550px] max-h-[550px] bg-[#B38B71] rounded-full shadow-[0_0_80px_rgba(179,139,113,0.2)]"
            />

            {/* Photo — strictly on right side, aligned bottom */}
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', right: '10%', bottom: '0', zIndex: 20, pointerEvents: 'none' }}
                className="h-[65vh] md:h-[80vh] w-[40%] md:w-[35%] flex justify-center items-end"
            >
                <div className="relative w-full h-[95%]">
                    <Image
                        src="/Vatshal1.png"
                        alt="Venkat Vatshal"
                        fill
                        priority
                        className="object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                    />
                </div>
            </motion.div>

            {/* Subtle horizontal line accent overlay */}
            <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, height: '1px', zIndex: 10 }} className="bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            {/* Vertical year text */}
            <div style={{ position: 'absolute', right: '2%', bottom: '25%', zIndex: 35 }} className="text-white/20 text-[10px] md:text-xs tracking-[0.3em] font-medium origin-bottom-right rotate-90">
                [2005-JAN-21]
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 35 }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-bold">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse"></div>
            </motion.div>

        </section>
    );
}