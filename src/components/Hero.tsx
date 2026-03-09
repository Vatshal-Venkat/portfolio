"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-[#020202] overflow-hidden font-sans selection:bg-[#B38B71]/30">

            {/* Top Navigation / Brand */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-40 flex items-center gap-1">
                <span className="text-white font-black text-xl md:text-2xl tracking-tighter">VENKAT</span>
                <span className="text-[#B38B71] font-black text-xl md:text-2xl px-0.5">✦</span>
                <span className="text-white font-black text-xl md:text-2xl tracking-tighter">VATSHAL</span>
            </div>

            {/* Top Right Actions */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-40 flex items-center gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-neutral-200 transition-colors">
                    <span className="w-3 md:w-4 h-0.5 bg-black"></span>
                    <span className="w-3 md:w-4 h-0.5 bg-black"></span>
                </div>
            </div>

            {/* BACKGROUND TEXT — reduced size, offset to center-right */}
            <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.06 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-[18vw] md:text-[14vw] font-black text-white leading-none tracking-[0.04em] uppercase whitespace-nowrap translate-x-[10%]"
                >
                    VATSHAL
                </motion.h1>
            </div>

            {/* ========== LEFT CONTENT AREA ========== */}
            <div
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%', zIndex: 30 }}
                className="flex flex-col justify-center pl-8 md:pl-14 lg:pl-20 pr-4 pointer-events-none"
            >
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto"
                >
                    {/* Role pills */}
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                        <span className="px-3 py-1 rounded-full border border-white/15 text-[9px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium backdrop-blur-sm">AI Engineer</span>
                        <span className="px-3 py-1 rounded-full border border-white/15 text-[9px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium backdrop-blur-sm">Full Stack</span>
                        <span className="px-3 py-1 rounded-full border border-white/15 text-[9px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium backdrop-blur-sm">Systems</span>
                    </div>

                    {/* Main headline */}
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-4 md:mb-6">
                        Crafting AI
                        <br />
                        that <span className="text-[#B38B71]">ships</span>
                        <br />
                        <span className="text-[#B38B71]">to prod.</span>
                    </h2>

                    {/* Accent divider */}
                    <div className="w-12 md:w-16 h-[2px] bg-gradient-to-r from-[#B38B71] to-transparent mb-5 md:mb-6"></div>

                    {/* Description */}
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-[340px] mb-6 md:mb-8 font-medium tracking-wide">
                        Full-stack engineer specializing in intelligent systems,
                        vector search pipelines, and production-grade AI infrastructure.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                        <a href="/resume.pdf" target="_blank" className="px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-white text-black font-bold tracking-widest text-[10px] md:text-[11px] hover:bg-[#B38B71] hover:text-white transition-all whitespace-nowrap flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            RESUME
                            <span className="transition-transform group-hover:translate-x-1 font-black text-xs">→</span>
                        </a>
                        <a href="#projects" className="px-6 py-2.5 md:px-8 md:py-3 rounded-full border border-white/20 text-white/70 font-bold tracking-widest text-[10px] md:text-[11px] hover:border-white hover:text-white transition-all whitespace-nowrap backdrop-blur-md">
                            PROJECTS
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a href="https://linkedin.com/in/venkat-vatshal" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                            <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-bold group-hover:border-[#B38B71] group-hover:text-[#B38B71] transition-colors">IN</span>
                            <span className="text-[10px] tracking-widest uppercase font-medium hidden md:inline">LinkedIn</span>
                        </a>
                        <a href="https://github.com/vatshal-venkat" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                            <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-bold group-hover:border-[#B38B71] group-hover:text-[#B38B71] transition-colors">GH</span>
                            <span className="text-[10px] tracking-widest uppercase font-medium hidden md:inline">GitHub</span>
                        </a>
                        <a href="mailto:venkatvatshal@gmail.com" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                            <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-bold group-hover:border-[#B38B71] group-hover:text-[#B38B71] transition-colors">@</span>
                            <span className="text-[10px] tracking-widest uppercase font-medium hidden md:inline">Email</span>
                        </a>
                    </div>
                </motion.div>

                {/* Bottom-left status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-8 left-8 md:left-14 lg:left-20 flex items-center gap-3"
                >
                    <span className="w-2 h-2 rounded-full bg-[#B38B71] animate-pulse"></span>
                    <span className="text-white/25 text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-semibold">Available for work</span>
                </motion.div>
            </div>

            {/* ========== RIGHT SIDE — Circle + Photo ========== */}
            {/* Circle background — positioned right */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                className="w-[50vmin] h-[50vmin] md:w-[55vmin] md:h-[55vmin] max-w-[550px] max-h-[550px] bg-[#B38B71] rounded-full"
            />

            {/* Photo — positioned right */}
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', right: '0', bottom: '0', zIndex: 20, pointerEvents: 'none' }}
                className="h-[60vh] md:h-[80vh] w-[45%] md:w-[42%] flex justify-center items-end"
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/Vatshal1.png"
                        alt="Venkat Vatshal"
                        fill
                        priority
                        className="object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
                    />
                </div>
            </motion.div>

            {/* Subtle horizontal line accent */}
            <div style={{ position: 'absolute', bottom: '18%', left: 0, right: 0, height: '1px', zIndex: 25 }} className="bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Vertical year text — right side */}
            <div style={{ position: 'absolute', right: '3%', bottom: '22%', zIndex: 35 }} className="text-white/20 text-[10px] md:text-xs tracking-widest origin-bottom-right -rotate-90">
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
                <span className="text-white/20 text-[8px] tracking-[0.3em] uppercase font-medium">Scroll</span>
                <div className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
            </motion.div>

        </section>
    );
}