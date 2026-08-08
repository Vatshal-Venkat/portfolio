"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor?: string;
  index: number;
  category?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  techStack,
  features,
  liveUrl,
  githubUrl,
  accentColor = "from-teal-400 to-emerald-500",
  index,
  category = "Featured Project",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-[#111827]/80 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl hover:border-white/20 transition-all duration-300"
    >
      {/* Top Accent Line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentColor}`} />

      <div className="p-7 md:p-9 flex flex-col h-full justify-between">
        <div>
          {/* Header Tag & Category */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-mono tracking-widest text-[#9E7B66] uppercase font-bold">
              Project // 0{index + 1} • {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-[#9E7B66] transition-colors">
            {title}
          </h3>

          {/* Short Description */}
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
            {description}
          </p>

          {/* Key Features List */}
          {features && features.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                Highlights & Capabilities
              </h4>
              <ul className="space-y-2">
                {features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/80 text-xs md:text-sm">
                    <span className="text-[#9E7B66] font-bold">—</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <h4 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-semibold tracking-tight hover:bg-white/10 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Bar: Live Link, GitHub Link, Deep Dive */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
          {/* External Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8F5] text-[#0B0A09] text-xs font-bold tracking-wide hover:bg-[#9E7B66] hover:text-white transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                <FiExternalLink className="w-4 h-4" />
                Live Demo ↗
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold tracking-wide hover:bg-white/20 transition-all transform hover:-translate-y-0.5"
              >
                <FiGithub className="w-4 h-4" />
                GitHub Repo 🐙
              </a>
            )}
          </div>

          {/* Internal Deep Dive Navigation Link */}
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-[#9E7B66] hover:text-white text-xs md:text-sm font-bold tracking-wider uppercase group/link transition-colors pt-1"
          >
            <span>Explore Detailed Architecture & Deep-Dive</span>
            <FiArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
