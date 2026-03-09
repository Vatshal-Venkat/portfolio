"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiPlay } from "react-icons/fi";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  features?: string[];
  githubUrl?: string;
  accentColor?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  href,
  techStack,
  features,
  githubUrl,
  accentColor = "from-teal-400 to-emerald-500",
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-[#111827]/80 rounded-2xl overflow-hidden border border-white/5 backdrop-blur-sm"
    >
      {/* Top Accent Border */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentColor}`} />

      <div className="p-8 md:p-10 flex flex-col h-full">
        {/* Header: Title & GitHub */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h3>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
          {description}
        </p>

        {/* Key Features */}
        {features && features.length > 0 && (
          <div className="mb-8">
            <h4 className="text-[#3b82f6] text-sm font-bold mb-4 uppercase tracking-wider">
              Key Features
            </h4>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-10">
          <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {techStack?.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/60 text-[11px] font-bold tracking-tight hover:bg-white/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project View & Media Preview */}
        <div className="mt-auto space-y-6">
          <Link
            href={href}
            className="flex items-center gap-2 text-emerald-400 text-sm font-bold hover:gap-4 transition-all"
          >
            <FiPlay className="w-5 h-5" />
            My Complete Project Overview
          </Link>

          {/* Media Placeholder Area */}
          <div className="group/visual relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
            {/* Dynamic Ambient Blur */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-5 group-hover/visual:opacity-10 transition-opacity`} />

            {/* Center Label */}
            <div className="flex flex-col items-center gap-2 text-white/20 group-hover/visual:text-white/40 transition-colors">
              <FiPlay className="w-10 h-10" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Phase {String(index + 1).padStart(2, '0')} / Preview</span>
            </div>

            {/* Inner Border Overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
