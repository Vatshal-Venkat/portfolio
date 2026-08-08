"use client";

import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/lib/constants";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      <div className="container">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#9E7B66]" />
            <span className="text-[#9E7B66] text-xs tracking-[0.3em] uppercase font-bold">
              Part V. — Selected Work
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Engineering & AI Projects
          </h1>

          <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
            A curated portfolio of production-grade AI systems, real-time voice agents, multimodal evaluators,
            and high-concurrency web platforms. Explore live demos, GitHub repositories, and architectural breakdowns.
          </p>
        </motion.div>

        {/* Interactive Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard
              key={project.id}
              index={i}
              title={project.title}
              description={project.shortDescription}
              features={project.features}
              techStack={project.techStack}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              href={`/projects/${project.slug}`}
              accentColor={project.accentColor}
              category={project.category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}