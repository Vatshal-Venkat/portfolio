"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  index: number;
}

export default function ProjectCard({ title, description, href, techStack, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className="group relative block rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/[0.04] hover:border-[#B38B71]/30 transition-all duration-700"
      >
        {/* Top gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#B38B71]/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
          <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/10 group-hover:border-[#B38B71]/40 transition-colors duration-500" />
        </div>

        <div className="relative z-10 p-8 md:p-10">
          {/* Project number */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[#B38B71]/40 text-[11px] font-bold tracking-[0.3em] uppercase">
              Project {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#B38B71]/30 to-transparent group-hover:w-12 transition-all duration-500" />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight mb-4 group-hover:text-[#B38B71] transition-colors duration-500 tracking-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 max-w-md font-medium">
            {description}
          </p>

          {/* Tech stack */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full bg-white/[0.03] text-white/50 border border-white/[0.06] group-hover:border-[#B38B71]/20 group-hover:text-white/60 transition-all duration-500 tracking-wider uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-white/[0.04] group-hover:border-[#B38B71]/15 transition-colors duration-500">
            <span className="text-white/30 text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold group-hover:text-[#B38B71] transition-colors duration-500">
              View Case Study
            </span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#B38B71]/40 group-hover:bg-[#B38B71]/10 transition-all duration-500">
              <span className="text-white/30 group-hover:text-[#B38B71] transition-colors duration-300 text-sm transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}