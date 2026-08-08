"use client";

import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/lib/constants";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="section container" style={{ paddingTop: "120px" }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-lg"
      >
        <div className="section-title">
          Part V. — Selected Work
        </div>

        <h1 className="text-gradient" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1rem" }}>
          Engineering & AI Projects
        </h1>

        <p className="text-secondary" style={{ maxWidth: "680px", fontSize: "1.1rem", lineHeight: 1.7 }}>
          A curated selection of production-grade AI applications, real-time voice intelligence, multimodal evaluation frameworks, and scalable web platforms. Select any card to explore its detailed technical architecture.
        </p>
      </motion.div>

      {/* Interactive Projects Grid */}
      <div className="grid grid-cols-2 gap-lg">
        {PROJECTS_DATA.map((project, i) => (
          <ProjectCard
            key={project.id}
            index={i}
            title={project.title}
            description={project.shortDescription}
            techStack={project.techStack}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            href={`/projects/${project.slug}`}
            category={project.category}
          />
        ))}
      </div>
    </section>
  );
}