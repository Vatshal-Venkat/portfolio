"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "TEASER – RAG Agent",
    description:
      "End-to-end Retrieval-Augmented Generation system with embeddings pipeline, vector search, and production-ready FastAPI backend.",
    techStack: ["FastAPI", "LangChain", "FAISS", "React", "MCP"],
    href: "/projects/rag_agent",
  },
  {
    title: "Online Examination Portal",
    description:
      "Full-stack scalable examination system with anti-cheating detection, dynamic exam generation, automated evaluation and leaderboard analytics.",
    techStack: ["Next.js", "WixStudio", "Node.js", "JavaScript"],
    href: "/projects/online_exam",
  },
  {
    title: "Cross-Modal Similarity Engine",
    description:
      "AI system evaluating similarity across text, images, audio and video using embedding models and cosine similarity scoring.",
    techStack: ["CLIP", "MiniLM", "Wav2Vec2", "Deep Learning"],
    href: "/projects/Cross_modal",
  },
];

export default function ProjectsPage() {
  return (
    <section
      className="relative bg-[#020202] min-h-screen py-40 overflow-hidden"
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[22vw] font-black tracking-[0.08em] text-white/[0.02]">
          WORK
        </span>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-8 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-28"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-[2px] bg-gradient-to-r from-[#B38B71] to-transparent" />
            <span className="text-[#B38B71] text-xs tracking-[0.35em] uppercase font-semibold">
              Selected Work
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Projects
            <br />
            <span className="text-white/20">that define my work.</span>
          </h1>

          <p className="mt-6 text-white/40 max-w-xl text-base leading-relaxed">
            A collection of production-grade AI systems and scalable
            engineering projects built around real-world complexity.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="mt-20">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>

        {/* Footer/More works */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-40 mb-20 flex flex-col items-center"
        >
          <div className="flex items-center gap-8 mb-8">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-white/10 text-[10px] tracking-[0.6em] uppercase font-black">
              End of Selection
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent via-white/10 to-transparent" />
          </div>

          <p className="text-white/20 text-xs tracking-widest uppercase font-bold">
            Expanding the horizon soon.
          </p>
        </motion.div>

      </div>
    </section>
  );
}