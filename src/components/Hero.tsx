"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-[#020202] overflow-hidden font-sans selection:bg-red-500/30">

            {/* Top Navigation / Brand (Like CINE DAILY) */}
            <div className="absolute top-8 left-8 z-40 flex items-center gap-1">
                <span className="text-white font-black text-2xl tracking-tighter">VENKAT</span>
                <span className="text-[#C1121F] font-black text-2xl px-0.5">✦</span>
                <span className="text-white font-black text-2xl tracking-tighter">VATSHAL</span>
            </div>

            {/* Top Right Actions */}
            <div className="absolute top-8 right-8 z-40 flex items-center gap-4">
                <div className="flex gap-2 text-white/50">
                    <a href="https://linkedin.com/in/venkatvatshal" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-white transition-colors">IN</a>
                    <a href="https://github.com/venkatvatshal" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-white transition-colors">GH</a>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-neutral-200 transition-colors">
                    <span className="w-4 h-0.5 bg-black"></span>
                    <span className="w-4 h-0.5 bg-black"></span>
                </div>
            </div>

            {/* Top Menu Links (Like TOP CASTS • PRODUCTION) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-8 text-[9px] text-white/40 tracking-[0.3em] font-semibold uppercase">
                <span className="hover:text-white cursor-pointer transition relative">
                    AI ENGINEER
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"></span>
                </span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="hover:text-white cursor-pointer transition">FULL STACK</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="hover:text-white cursor-pointer transition">BACKEND</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="hover:text-white cursor-pointer transition">SYSTEMS</span>
            </div>

            {/* Small pills Top Left under logo */}
            <div className="absolute top-20 left-8 z-40 flex gap-3">
                <span className="px-4 py-1 rounded-full border border-white/20 text-[8px] text-white/60 tracking-widest uppercase">PYTHON</span>
                <span className="px-4 py-1 rounded-full border border-white/20 text-[8px] text-white/60 tracking-widest uppercase">REACT</span>
                <span className="px-4 py-1 rounded-full border border-white/20 text-[8px] text-white/60 tracking-widest uppercase">INFRA</span>
            </div>

            <div className="absolute top-20 right-8 z-40 text-[8px] text-white/60 tracking-[0.2em] uppercase">
                PORTFOLIO [2024]
            </div>

            {/* Red Circle Background */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] min-w-[350px] min-h-[350px] max-w-[550px] max-h-[550px] bg-[#C1121F] rounded-full z-0"
            />

            {/* Concentric rings (radar effect) */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] min-w-[600px] min-h-[600px] border border-white/5 rounded-full z-0 pointer-events-none" />
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] min-w-[800px] min-h-[800px] border border-white/5 rounded-full z-0 pointer-events-none" />
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-screen border-t border-white/5 z-0 pointer-events-none" />
            <div className="absolute top-0 left-1/2 h-screen border-l border-white/5 z-0 pointer-events-none" />

            {/* Top Trait Names (Like Cast Names) */}
            <div className="absolute top-[26%] w-full px-[5%] flex justify-between items-center text-white/90 font-bold tracking-[0.1em] text-xs md:text-xl lg:text-2xl z-10 pointer-events-none">
                <span className="w-1/4 text-center">SCALABLE</span>
                <span className="w-1/4 text-center">INTELLIGENT</span>
                {/* The roman numeral III equivalent */}
                <div className="flex gap-1.5 h-12 lg:h-16 mx-4">
                    <div className="w-2.5 lg:w-3.5 h-full bg-white"></div>
                    <div className="w-2.5 lg:w-3.5 h-full bg-white"></div>
                    <div className="w-2.5 lg:w-3.5 h-full bg-white"></div>
                </div>
                <span className="w-1/4 text-center">PERFORMANT</span>
                <span className="w-1/4 text-center">ROBUST</span>
            </div>

            {/* HUGE BACKGROUND TEXT */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex items-center justify-center pointer-events-none select-none">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-[25vw] font-black text-white leading-none tracking-[-0.07em] m-0 uppercase scale-y-[1.3] transform-gpu"
                >
                    VATSHAL
                </motion.h1>
                <div className="absolute right-[2%] md:right-[5%] bottom-[20%] text-white text-[1.5vw] font-bold tracking-widest origin-bottom-right -rotate-90">
                    [2024]
                </div>
            </div>

            {/* FILM STRIP / HORIZONTAL TAPE */}
            <div className="absolute bottom-[20%] w-full h-[5vh] bg-[#020202]/80 backdrop-blur-sm z-10 border-y border-white/10 flex items-center overflow-hidden">
                <div className="flex w-[200%] animate-[slide_20s_linear_infinite] opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 px-4">
                            <span className="w-3 h-1.5 bg-white rounded-sm" style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)" }}></span>
                            <span className="w-3 h-1.5 bg-white rounded-sm" style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)" }}></span>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN CHARACTER IMAGE */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[75vh] w-full max-w-[800px] z-20 pointer-events-none flex justify-center items-end"
            >
                <div className="relative w-full h-full pb-4">
                    <Image
                        src="/vatshal.png"
                        alt="Venkat Vatshal"
                        fill
                        priority
                        className="object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                    />
                </div>
            </motion.div>

            {/* BOTTOM LEFT STORY / INFO */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-[280px] z-30"
            >
                <div className="flex items-center gap-3 mb-4 text-[#C1121F] text-[9px] font-bold tracking-[0.2em] uppercase">
                    <span className="w-4 h-4 rounded-full border border-[#C1121F] flex items-center justify-center text-[8px]">V</span>
                    VENKAT VATSHAL — STORY
                </div>
                <p className="text-white/60 text-[11px] md:text-[13px] leading-relaxed font-semibold tracking-wide">
                    <span className="text-white font-bold">PART I. &mdash;</span> Building intelligent systems for real-world deployment.
                    Specializing in vector search pipelines, and scalable AI infrastructure.
                </p>
            </motion.div>

            {/* BOTTOM RIGHT BUTTON */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 flex items-center gap-6"
            >
                <a href="#about" className="px-6 py-2.5 rounded-full border border-white/40 text-white font-bold tracking-widest text-[10px] hover:bg-white hover:text-black hover:border-white transition-all whitespace-nowrap flex items-center gap-3 group">
                    EXPLORE NOW
                    <span className="text-current transition-transform group-hover:translate-x-1">&gt;</span>
                </a>
                <div className="hidden md:flex w-16 h-16 rounded-full border border-red-600/50 items-center justify-center relative overflow-hidden group cursor-pointer bg-black/50 backdrop-blur-md hover:border-red-500 transition-colors">
                    {/* The circular badge like in the corner */}
                    <div className="absolute inset-[15%] rounded-full border border-red-500/30 group-hover:rotate-90 transition-transform duration-700"></div>
                    <div className="absolute inset-x-0 h-[1px] bg-red-600/80 rotate-45 z-0"></div>
                    <div className="absolute inset-x-0 h-[1px] bg-red-600/80 -rotate-45 z-0"></div>
                    <span className="text-white font-black text-[10px] relative z-10 uppercase tracking-widest drop-shadow-md">
                        hire
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