"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-[calc(100vh-6rem)] min-h-[800px] bg-[#020202] overflow-hidden font-sans selection:bg-[#B38B71]/30 -mt-24">

            {/* ========== ANIMATED GRID BACKGROUND ========== */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#020202] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none z-0"></div>

            {/* ========== BACKGROUND TEXT ========== */}
            <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.15 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-[17vw] md:text-[15vw] font-black uppercase whitespace-nowrap translate-x-[5%] text-transparent"
                    style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)", letterSpacing: "0.05em" }}
                >
                    VATSHAL
                </motion.h1>
            </div>

            {/* ========== MAIN GRID ========== */}
            <div className="relative z-30 w-full h-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between px-8 md:px-12 lg:px-20 pt-24">
                
                {/* ========== LEFT CONTENT ========== */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-[60%] lg:w-[55%] flex flex-col justify-center pointer-events-auto h-full pb-10"
                >
                    {/* Role pills */}
                    <div className="flex flex-wrap gap-4 mb-12">
                        <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-sm text-white/80 tracking-[0.25em] uppercase font-bold backdrop-blur-md shadow-lg">AI Engineer</span>
                        <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-sm text-white/80 tracking-[0.25em] uppercase font-bold backdrop-blur-md shadow-lg">Full Stack</span>
                        <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-sm text-white/80 tracking-[0.25em] uppercase font-bold backdrop-blur-md shadow-lg">Systems</span>
                    </div>

                    {/* Main headline */}
                    <h2 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.1] tracking-tight mb-12">
                        Crafting AI
                        <br />
                        that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B38B71] to-[#e1cdbe]">ships</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1cdbe] to-[#B38B71]">to prod.</span>
                    </h2>

                    {/* Accent divider */}
                    <div className="w-24 h-[4px] bg-gradient-to-r from-[#B38B71] to-transparent shadow-[0_0_15px_rgba(179,139,113,0.6)] mb-12"></div>

                    {/* Description */}
                    <p className="text-white/60 text-base md:text-lg lg:text-xl leading-loose max-w-[600px] mb-12 font-medium tracking-wide">
                        I am a passionate software engineer building intelligent scalable systems. I transform complex ideas into production-quality, full-stack applications with beautiful user experiences.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-6 mb-12">
                        <a href="/resume.pdf" target="_blank" className="px-10 py-5 rounded-md bg-[#B38B71] text-white font-bold tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(179,139,113,0.5)] transition-all whitespace-nowrap flex items-center gap-3">
                            RESUME
                            <span className="font-black text-sm transition-transform hover:translate-x-1">→</span>
                        </a>
                        <a href="#projects" className="px-10 py-5 rounded-md border border-white/20 text-white/80 font-bold tracking-widest text-sm hover:border-[#B38B71] hover:text-[#B38B71] transition-all whitespace-nowrap backdrop-blur-md hover:bg-white/5">
                            PROJECTS
                        </a>
                    </div>

                </motion.div>
                
                {/* ========== RIGHT CONTENT (Spacer) ========== */}
                <div className="hidden md:block w-[45%] h-full relative"></div>

            </div>

            {/* ========== RIGHT SIDE — Orb + Photo (EXPLICIT DIMENSIONS FOR ANTI-COLLAPSE) ========== */}
            
            {/* Glowing Background Orb */}
            <motion.div
                animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] right-4 md:right-10 lg:right-16 -translate-y-1/2 w-[80vw] md:w-[45vw] max-w-[480px] aspect-square rounded-full bg-gradient-to-br from-[#B38B71] to-[#735038] blur-[80px] z-10 mix-blend-screen"
            />

            {/* Photo */}
            <div className="absolute bottom-0 right-[-10%] md:right-4 lg:right-16 z-50 pointer-events-none">
                <Image
                    src="/Vatshal1.png"
                    alt="Venkat Vatshal"
                    width={700}
                    height={980}
                    priority
                    className="w-[110vw] md:w-[55vw] lg:w-[45vw] max-w-[650px] h-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] pointer-events-auto"
                />
            </div>

            {/* ========== BOTTOM ACCENTS ========== */}
            
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-[4px] bg-[#B38B71] z-40 origin-left shadow-[0_0_20px_rgba(179,139,113,0.7)] w-full lg:w-[65%]"
            />

            {/* Bottom-left status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-8 md:bottom-10 lg:left-20 flex items-center gap-3 z-40"
            >
                <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B38B71] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B38B71]"></span>
                </div>
                <span className="text-white/40 text-[10px] md:text-sm tracking-[0.25em] uppercase font-bold">Available for work</span>
            </motion.div>

            {/* Vertical year text */}
            <div className="absolute right-[2%] bottom-[25%] z-35 text-white/30 text-[10px] lg:text-xs tracking-[0.4em] font-medium origin-bottom-right rotate-90 mix-blend-difference">
                [2005-JAN-21]
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-6 left-[50%] -translate-x-[50%] z-40 flex flex-col items-center gap-3"
            >
                <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-bold">SCROLL</span>
                <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
                    <motion.div 
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-[#B38B71]" 
                    />
                </div>
            </motion.div>

        </section>
    );
}