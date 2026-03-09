"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  index: number;
}

export default function ProjectCard({
  title,
  description,
  href,
  techStack,
  index,
}: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <Link href={href} className="block relative z-20 py-20 md:py-32">
        <div
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-16 md:gap-24 lg:gap-32 px-4 md:px-0`}
        >
          {/* IMAGE / VISUAL SIDE - "The Glass Canvas" */}
          <div className="relative w-full md:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#050505] group-hover:border-[#B38B71]/40 transition-all duration-700 shadow-2xl">
            {/* Cinematic Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
            />

            {/* Dynamic Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
              style={{
                background: `radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(179,139,113,0.15), transparent 50%)`
              }}
            />

            {/* Visual Placeholder Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/5 text-[9px] tracking-[0.8em] font-black uppercase select-none">
                Phase {String(index + 1).padStart(2, "0")} / Digital Node
              </span>
            </div>

            {/* Subtle Inner Glow */}
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#B38B71]/[0.05] to-transparent" />
          </div>

          {/* TEXT SIDE */}
          <div
            className={`w-full md:w-1/2 flex flex-col ${isEven ? "items-start text-left" : "items-end text-right"
              }`}
          >
            <div className="flex items-center gap-4 mb-8">
              {!isEven && <div className="w-12 h-[1px] bg-[#B38B71]/20 group-hover:w-20 transition-all duration-700" />}
              <span className="text-[#B38B71] text-[10px] tracking-[0.5em] uppercase font-black">
                Sequence {String(index + 1).padStart(2, "0")}
              </span>
              {isEven && <div className="w-12 h-[1px] bg-[#B38B71]/20 group-hover:w-20 transition-all duration-700" />}
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1] tracking-tighter mb-8 group-hover:text-[#B38B71] transition-colors duration-500">
              {title}
            </h3>

            <p
              className={`text-white/40 text-base md:text-lg leading-relaxed mb-12 max-w-lg font-medium tracking-wide ${!isEven && "md:ml-auto"
                }`}
            >
              {description}
            </p>

            {/* Tech Stack Sticker style */}
            <div
              className={`flex flex-wrap gap-2 mb-12 ${!isEven && "justify-end"
                }`}
            >
              {techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="text-[9px] font-bold px-4 py-2 rounded-full border border-white/10 text-white/40 uppercase tracking-[0.2em] group-hover:border-[#B38B71]/40 group-hover:text-white transition-all duration-500"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Direct Interaction area */}
            <div className="flex items-center gap-6 group/cta text-white/30 hover:text-[#B38B71] transition-colors duration-500">
              <span className="text-[10px] tracking-[0.6em] uppercase font-black">Open Case Study</span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/cta:border-[#B38B71]/50 group-hover/cta:bg-[#B38B71]/10 transition-all duration-500">
                <span className="text-xl transform group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform duration-500">↗</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* HUGE BACKGROUND TYPOGRAPHY (The Perspective Element) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10 h-full w-full">
        <span className="text-[45vw] font-black tracking-tighter leading-none text-white opacity-[0.015] translate-y-[-5%] group-hover:opacity-[0.03] transform group-hover:scale-110 transition-all duration-[4000ms] ease-out">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* STABLE SEPARATOR (No negative position) */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </motion.div>
  );
}
