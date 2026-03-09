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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-full"
    >
      <Link href={href} className="flex flex-col h-full perspective-1000">
        {/* VISUAL COMPOSITION - TOP (Vertical Grid Focus) */}
        <div className="relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden">
          {/* Subtle Glow Base */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,139,113,0.1),transparent_70%)] opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Dynamic Light Trace */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10"
            style={{
              background: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.02), transparent 60%)`
            }}
          />

          {/* Large Stylized Number (Smaller for grid) */}
          <span className="text-white/[0.03] text-[15vw] lg:text-[10vw] font-black tracking-tighter select-none group-hover:scale-110 group-hover:text-white/[0.06] transition-all duration-1000">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-[9px] tracking-[0.8em] font-black uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
              Project Node {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* PROJECT DETAILS - BOTTOM (Vertical Grid Focus) */}
        <div className="relative flex-1 p-8 lg:p-10 flex flex-col items-start text-left overflow-hidden">
          {/* Subtle Detail Highlight (Glass/Glow on hover) */}
          <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1000 -z-10" />

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#B38B71]/40" />
            <span className="text-[#B38B71] text-[10px] tracking-[0.6em] uppercase font-black">
              {String(index + 1).padStart(2, "0")} / Evolution
            </span>
          </div>

          <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tighter mb-6 group-hover:text-[#B38B71] transition-colors duration-500">
            {title}
          </h3>

          <p className="text-white/40 text-sm lg:text-base leading-relaxed mb-8 max-w-full font-medium tracking-wide">
            {description}
          </p>

          {/* Minimal Tech List - Inline for grid compactness */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-10">
            {techStack?.map((tech, i) => (
              <span
                key={i}
                className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-[#B38B71]/80 transition-colors duration-500"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Trigger - Highlighted */}
          <div className="mt-auto flex items-center justify-between w-full group/cta">
            <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white/10 group-hover/cta:text-white transition-colors duration-500">
              Explore reflection
            </span>
            <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover/cta:border-[#B38B71]/50 group-hover/cta:bg-[#B38B71]/10 transition-all duration-500">
              <span className="text-lg text-white/20 group-hover/cta:text-white transform group-hover/cta:translate-x-1 transition-all duration-500">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
