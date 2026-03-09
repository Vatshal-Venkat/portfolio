"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-[#020202] overflow-hidden font-sans selection:bg-[#B38B71]/30 flex flex-col items-center justify-center">

            {/* Top Navigation / Brand */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-40 flex items-center gap-1">
                <span className="text-white font-black text-xl md:text-2xl tracking-tighter">VENKAT</span>
                <span className="text-[#B38B71] font-black text-xl md:text-2xl px-0.5">✦</span>
                <span className="text-white font-black text-xl md:text-2xl tracking-tighter">VATSHAL</span>
            </div>

            {/* Top Right Actions */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-40 flex items-center gap-4">
                <div className="hidden md:flex gap-2 text-white/50">
                    <a href="https://linkedin.com/in/venkatvatshal" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-white transition-colors">IN</a>
                    <a href="https://github.com/venkatvatshal" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-white transition-colors">GH</a>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-neutral-200 transition-colors">
                    <span className="w-3 md:w-4 h-0.5 bg-black"></span>
                    <span className="w-3 md:w-4 h-0.5 bg-black"></span>
                </div>
            </div>

            {/* Top Menu Links */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-6 xl:gap-8 text-[9px] text-white/40 tracking-[0.3em] font-semibold uppercase">
                <span className="hover:text-white cursor-pointer transition relative">
                    AI ENGINEER
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#B38B71] rounded-full"></span>
                </span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="hover:text-white cursor-pointer transition">FULL STACK</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="hover:text-white cursor-pointer transition">BACKEND</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="hover:text-white cursor-pointer transition">SYSTEMS</span>
            </div>

            {/* Small pills Top Left under logo */}
            <div className="absolute top-16 left-6 md:top-20 md:left-8 z-40 hidden md:flex gap-2">
                <span className="px-3 py-1 rounded-full border border-white/20 text-[8px] text-white/60 tracking-widest uppercase">PYTHON</span>
                <span className="px-3 py-1 rounded-full border border-white/20 text-[8px] text-white/60 tracking-widest uppercase">REACT</span>
                <span className="px-3 py-1 rounded-full border border-white/20 text-[8px] text-white/60 tracking-widest uppercase">INFRA</span>
            </div>

            <div className="absolute top-16 right-6 md:top-20 md:right-8 z-40 text-[8px] text-white/60 tracking-[0.2em] uppercase">
                PORTFOLIO [2026]
            </div>

            {/* Circle Background */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] max-w-[500px] max-h-[500px] bg-[#B38B71] rounded-full z-0"
            />

            {/* Top Trait Names */}
            <div className="absolute top-[28%] md:top-[25%] w-full max-w-6xl px-[5%] flex justify-between items-center text-white/90 font-bold tracking-[0.1em] text-[10px] md:text-sm lg:text-lg z-10 pointer-events-none">
                <span className="flex-1 text-center">SCALABLE</span>
                <span className="flex-1 text-center">INTELLIGENT</span>
                <div className="flex gap-1 h-8 md:h-12 mx-2 md:mx-4">
                    <div className="w-1.5 md:w-2.5 h-full bg-white"></div>
                    <div className="w-1.5 md:w-2.5 h-full bg-white"></div>
                    <div className="w-1.5 md:w-2.5 h-full bg-white"></div>
                </div>
                <span className="flex-1 text-center">PERFORMANT</span>
                <span className="flex-1 text-center">ROBUST</span>
            </div>

            {/* BACKGROUND TEXT */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden h-full">
                {/* VATSHAL - Centered */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-[16vw] font-black text-white leading-none tracking-[0.02em] m-0 uppercase scale-y-110"
                >
                    VATSHAL
                </motion.h1>

                {/* Vertical Year text */}
                <div className="absolute right-[4%] bottom-[25%] text-white text-[10px] md:text-xs tracking-widest origin-bottom-right -rotate-90">
                    [2005-JAN-21]
                </div>
            </div>

            {/* MAIN CHARACTER IMAGE */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[65vh] md:h-[75vh] w-full max-w-[700px] z-20 pointer-events-none flex justify-center items-end"
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/Vatshal1.png"
                        alt="Venkat Vatshal"
                        fill
                        priority
                        className="object-contain object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    />
                </div>
            </motion.div>

            {/* FILM STRIP / HORIZONTAL BORDER */}
            <div className="absolute bottom-[20%] w-full h-12 bg-black/60 backdrop-blur-sm z-30 border-y border-white/10 flex items-center overflow-hidden">
                <div className="flex w-[300%] animate-[slide_30s_linear_infinite] opacity-30">
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 px-3">
                            <span className="w-2.5 h-1 bg-white rounded-sm" style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)" }}></span>
                            <span className="w-2.5 h-1 bg-white rounded-sm" style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)" }}></span>
                        </div>
                    ))}
                </div>
            </div>

            {/* LEFT CORNER INFO — vertically centered on the left side */}
            <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 60 }} className="pointer-events-none max-w-[160px] md:max-w-[220px] lg:max-w-[280px]">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Accent line */}
                    <div className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-[#B38B71] to-transparent mb-4 md:mb-6"></div>

                    {/* Name label */}
                    <p className="text-[#B38B71] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2 md:mb-3">
                        VENKAT VATSHAL
                    </p>

                    {/* Main headline */}
                    <h2 className="text-white text-sm md:text-lg lg:text-xl font-black leading-tight tracking-tight mb-3 md:mb-4">
                        Crafting AI that
                        <br />
                        <span className="text-[#B38B71]">ships to prod.</span>
                    </h2>

                    {/* Description */}
                    <p className="text-white/50 text-[10px] md:text-xs leading-relaxed font-medium tracking-wide">
                        Full-stack engineer building
                        <br className="hidden md:block" /> intelligent, production-grade systems.
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-4 md:mt-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#B38B71] animate-pulse"></span>
                        <span className="text-white/30 text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-semibold">Available for work</span>
                    </div>
                </motion.div>
            </div>

            {/* BOTTOM RIGHT ACTIONS */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-10 right-4 md:bottom-12 md:right-12 z-[100] flex items-center gap-3 md:gap-4"
            >
                {/* Resume button */}
                <a href="/resume.pdf" target="_blank" className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border-2 border-white text-white font-bold tracking-widest text-[10px] md:text-[11px] hover:bg-white hover:text-black transition-all whitespace-nowrap flex items-center gap-2 group bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.15)] pointer-events-auto">
                    RESUME
                    <span className="text-current transition-transform group-hover:translate-x-1 font-black">&gt;</span>
                </a>

                {/* Badge */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 items-center justify-center relative overflow-hidden flex bg-black/80 backdrop-blur-xl cursor-pointer hover:border-white transition-colors group shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-auto">
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="w-full h-[2px] bg-[#B38B71] rotate-45"></div>
                        <div className="w-full h-[2px] bg-[#B38B71] -rotate-45 absolute"></div>
                        <div className="w-[2px] h-full bg-[#B38B71] rotate-12 absolute"></div>
                    </div>
                    <span className="text-white font-black text-[8px] md:text-[10px] relative z-10 leading-none text-center -rotate-12 italic tracking-tighter drop-shadow-md">
                        VAT<br />SHAL
                    </span>
                </div>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slide {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}} />
        </section>
    );
}