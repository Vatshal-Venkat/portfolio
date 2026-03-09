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
        duration: 1.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <Link href={href} className="block relative z-20 py-16 md:py-24">
        <div
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-12 md:gap-20 px-4 md:px-0`}
        >
          {/* VISUAL COMPOSITION - "The Ethereal Glow" */}
          <div className="relative w-full md:w-[45%] aspect-[16/10] flex items-center justify-center">
            {/* Soft Ambient Light (Borderless) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(179,139,113,0.08),transparent_70%)] opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Dynamic Tracking Light */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.03), transparent 60%)`
              }}
            />

            {/* Central Typographic Sculpture */}
            <div className="relative z-10 text-center">
              <span className="block text-white/5 text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none select-none group-hover:text-white/10 transition-colors duration-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 text-[10px] tracking-[1em] font-black uppercase whitespace-nowrap blur-[1px] group-hover:blur-0 transition-all duration-700">
                  Phase {String(index + 1).padStart(2, "0")} / Digital
                </span>
              </div>
            </div>

            {/* Subtle floating particles area - just CSS dots */}
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }}
            />
          </div>

          {/* TEXT SIDE - Typographic Elegance */}
          <div
            className={`w-full md:w-[55%] flex flex-col ${isEven ? "items-start text-left" : "items-end text-right"
              }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#B38B71] text-[10px] tracking-[0.8em] uppercase font-black">
                Node {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter mb-10 group-hover:text-[#B38B71] transition-colors duration-700">
              {title}
            </h3>

            <p
              className={`text-white/30 text-base md:text-xl leading-relaxed mb-10 max-w-lg font-medium tracking-wide ${!isEven && "md:ml-auto"
                }`}
            >
              {description}
            </p>

            {/* Tech Stack - Minimal list */}
            <div
              className={`flex flex-wrap gap-x-8 gap-y-4 mb-12 opacity-40 group-hover:opacity-100 transition-all duration-700 ${!isEven && "justify-end"
                }`}
            >
              {techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover:text-[#B38B71] transition-colors duration-500"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Interactive Link */}
            <div className="flex items-center gap-6 group/cta">
              <span className="text-[11px] tracking-[0.6em] uppercase font-black text-white/20 group-hover/cta:text-white transition-colors duration-500">View Reflection</span>
              <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover/cta:border-[#B38B71]/40 group-hover/cta:bg-white/5 transition-all duration-500">
                <span className="text-xl text-white/40 group-hover/cta:text-white transform group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-all duration-500">↗</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* BACKGROUND DEPTH (Subtle) */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 flex items-center justify-center overflow-hidden">
        <span className="text-[50vw] font-black tracking-tighter leading-none text-white opacity-[0.005] group-hover:opacity-[0.015] transition-all duration-[5000ms] ease-out">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* INVISIBLE SEPARATOR (For layout stability) */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
    </motion.div>
  );
}
