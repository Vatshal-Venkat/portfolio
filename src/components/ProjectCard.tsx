"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
}

export default function ProjectCard({ title, description, href, techStack }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-[#B38B71]/40 transition-all duration-500 block h-full overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#B38B71]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#B38B71] transition-colors duration-500">{title}</h3>
          <p className="text-white/50 text-sm md:text-base leading-relaxed flex-grow">
            {description}
          </p>

          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {techStack.map((tech, i) => (
                <span key={i} className="text-[10px] md:text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 group-hover:border-[#B38B71]/30 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center text-[#B38B71] text-xs tracking-[0.2em] uppercase font-bold">
            <span className="group-hover:mr-3 transition-all duration-300">Explore</span>
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}