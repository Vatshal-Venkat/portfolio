"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    const headlineVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative w-full h-[calc(100vh-6rem)] min-h-[800px] bg-[#020202] overflow-hidden font-sans selection:bg-[#B38B71]/30 -mt-24">

            {/* ========== ANIMATED GRID BACKGROUND ========== */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#020202] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_10%,#000_100%)] pointer-events-none z-0"></div>

            {/* ========== TOP NAVIGATION / BRAND ========== */}
            <div className="absolute top-10 left-8 md:left-16 z-50 flex items-center gap-2">
                <span className="text-white font-black text-2xl tracking-widest">VENKAT</span>
                <span className="text-[#B38B71] font-black text-2xl px-1">✦</span>
                <span className="text-white font-black text-2xl tracking-widest">VATSHAL</span>
            </div>

            {/* ========== TOP RIGHT MENU ========== */}
            <div className="absolute top-10 right-8 md:right-16 z-50 flex items-center gap-4">
                <div className="w-12 h-12 border border-white/20 rounded-full flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-white/5 hover:border-[#B38B71]/50 hover:shadow-[0_0_15px_rgba(179,139,113,0.3)] transition-all backdrop-blur-md group">
                    <span className="w-5 h-[2px] bg-white group-hover:w-6 group-hover:bg-[#B38B71] transition-all"></span>
                    <span className="w-5 h-[2px] bg-white/70 group-hover:w-6 transition-all"></span>
                </div>
            </div>

            {/* ========== BACKGROUND TEXT MARQUEE ========== */}
            <div className="absolute inset-x-0 top-[20%] flex items-center overflow-hidden z-[1] pointer-events-none opacity-20 h-auto">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                    className="flex whitespace-nowrap"
                >
                    <h1 className="text-[12rem] font-black uppercase text-transparent tracking-widest px-8 leading-none" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
                        VATSHAL • VATSHAL • VATSHAL • VATSHAL • 
                    </h1>
                </motion.div>
            </div>

            {/* ========== MAIN CONTENT CONTAINER ========== */}
            <div className="relative z-30 w-full h-full max-w-[1600px] mx-auto px-8 md:px-16 flex items-center pt-24">
                
                {/* LEFT CONTENT */}
                <div className="w-full lg:w-[60%] flex flex-col justify-center">
                    
                    {/* Role pills */}
                    <div className="flex flex-wrap gap-4 mb-14">
                        {['AI Engineer', 'Full Stack', 'Systems Architect'].map((role, i) => (
                            <motion.span 
                                key={role}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                                className="inline-flex px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/80 tracking-[0.25em] uppercase font-bold backdrop-blur-sm shadow-xl"
                            >
                                {role}
                            </motion.span>
                        ))}
                    </div>

                    {/* Main headline */}
                    <motion.h2 
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.15, delayChildren: 0.7 }}
                        className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-12"
                    >
                        <motion.span variants={headlineVariants} className="block drop-shadow-2xl">Crafting AI</motion.span>
                        <motion.span variants={headlineVariants} className="block drop-shadow-xl">
                            that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B38B71] to-[#e1cdbe]">ships</span>
                        </motion.span>
                        <motion.span variants={headlineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e1cdbe] to-[#B38B71] pb-2 drop-shadow-xl">to prod.</motion.span>
                    </motion.h2>

                    {/* Accent divider */}
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="h-[4px] bg-gradient-to-r from-[#B38B71] to-transparent shadow-[0_0_15px_rgba(179,139,113,0.6)] mb-12"
                    ></motion.div>

                    {/* Description */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 1 }}
                        className="text-white/60 text-base md:text-lg lg:text-xl leading-loose max-w-[550px] mb-16 font-medium"
                    >
                        I engineer scalable vector pipelines, powerful AI integrations, and beautifully crafted frontend architecture. Transforming complex ideas into resilient systems.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="flex flex-row items-center gap-6 mb-16"
                    >
                        <a href="/resume.pdf" target="_blank" className="relative px-8 py-4 rounded-md bg-[#B38B71] text-white font-bold tracking-widest text-xs uppercase hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(179,139,113,0.3)] hover:shadow-[0_0_30px_rgba(179,139,113,0.6)] flex items-center justify-center">
                            RESUME
                        </a>
                        <a href="#projects" className="px-8 py-4 rounded-md border border-white/20 text-white/80 font-bold tracking-widest text-xs uppercase hover:bg-white/5 hover:border-white/50 hover:text-white transition-all backdrop-blur-md">
                            PROJECTS
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 1 }}
                        className="flex items-center gap-8"
                    >
                        <a href="https://linkedin.com/in/venkat-vatshal" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#B38B71] transition-all hover:scale-110">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href="https://github.com/vatshal-venkat" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#B38B71] transition-all hover:scale-110">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a href="mailto:venkatvatshal@gmail.com" className="text-white/40 hover:text-[#B38B71] transition-all hover:scale-110">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Bottom-left status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-10 left-8 md:left-16 flex items-center gap-3 z-30"
            >
                <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B38B71] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B38B71]"></span>
                </div>
                <span className="text-white/40 text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold">Currently Building</span>
            </motion.div>

            {/* ========== RIGHT SIDE — Animated Glowing Orb & Photo ========== */}
            <div className="absolute inset-y-0 right-0 w-[50%] z-20 pointer-events-none hidden lg:block overflow-hidden">
                
                {/* 1. Animated Breathing Orb */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.45, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[40%] right-[10%] -translate-y-1/2 w-[550px] aspect-square rounded-full bg-gradient-to-br from-[#B38B71] to-[#735038] blur-[100px] mix-blend-screen -z-10"
                />

                {/* Photo */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 right-[5%] w-[110%] max-w-[700px] h-full"
                >
                    <Image
                        src="/Vatshal1.png"
                        alt="Venkat Vatshal"
                        fill
                        priority
                        className="object-contain object-bottom drop-shadow-[0_-20px_60px_rgba(179,139,113,0.15)] pointer-events-auto"
                    />
                </motion.div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-[25vh] bg-gradient-to-t from-[#020202] to-transparent z-30"></div>
            </div>

            {/* Glowing bottom structural line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-[#B38B71] via-[#B38B71] to-transparent z-40 origin-right shadow-[0_0_20px_rgba(179,139,113,0.8)] w-full lg:w-[45%]"
            />

            {/* Vertical year text */}
            <div className="absolute right-6 bottom-32 z-35 text-white/30 text-[10px] md:text-xs tracking-[0.4em] font-medium origin-bottom-right rotate-90 mix-blend-difference">
                INTL. — EST. 2005
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.2 }}
                className="absolute bottom-8 left-[50%] -translate-x-[50%] z-40 flex flex-col items-center gap-2"
            >
                <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase font-bold">SCROLL</span>
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