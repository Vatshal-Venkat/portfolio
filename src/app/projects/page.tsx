"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "TEASER – RAG Agent",
    description: "End-to-end Retrieval-Augmented Generation system with embeddings pipeline, vector search, and production-ready FastAPI backend.",
    techStack: ["FastAPI", "LangChain", "FAISS", "React", "MCP"],
    features: [
      "End-to-end RAG pipeline",
      "Vector search optimization",
      "Production-ready FastAPI backend",
      "Scalable embedding storage"
    ],
    githubUrl: "https://github.com/Vatshal-Venkat/rag-agent",
    accentColor: "from-teal-400 to-emerald-500",
    href: "/projects/rag_agent",
  },
  {
    title: "Online Examination Portal",
    description: "Full-stack scalable examination system with anti-cheating detection, dynamic exam generation, automated evaluation and leaderboard analytics.",
    techStack: ["Next.js", "WixStudio", "Node.js", "JavaScript"],
    features: [
      "Anti-cheating detection system",
      "Dynamic exam generation",
      "Automated evaluation engine",
      "Real-time leaderboard analytics"
    ],
    githubUrl: "https://github.com/Vatshal-Venkat/exam-portal",
    accentColor: "from-orange-500 to-red-600",
    href: "/projects/online_exam",
  },
  {
    title: "Cross-Modal Similarity Engine",
    description: "AI system evaluating similarity across text, images, audio and video using embedding models and cosine similarity scoring.",
    techStack: ["CLIP", "MiniLM", "Wav2Vec2", "Deep Learning"],
    features: [
      "Multi-modal embedding support",
      "Cosine similarity scoring",
      "Text-to-image/video retrieval",
      "Audio similarity analysis"
    ],
    githubUrl: "https://github.com/Vatshal-Venkat/cross-modal-engine",
    accentColor: "from-blue-500 to-purple-600",
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 md:mb-48"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-[2px] bg-gradient-to-r from-[#B38B71] to-transparent" />
            <span className="text-[#B38B71] text-[10px] tracking-[0.5em] uppercase font-black">
              Selected Work
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1] tracking-tighter mb-8">
            The Work
            <br />
            <span className="text-white/20">of a Builder.</span>
          </h1>

          <p className="text-white/40 max-w-xl text-base md:text-lg leading-relaxed font-medium tracking-wide">
            A curated selection of high-impact AI systems, scalable platforms,
            and technical explorations pushed to the edge.
          </p>
        </motion.div>

        {/* Interactive Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>

        {/* Cinematic Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mt-48 pb-32 flex flex-col items-center"
        >
          <div className="flex items-center gap-10 mb-8">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <span className="text-white/5 text-[10px] tracking-[0.8em] font-black uppercase">
              End of Chapter
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent via-white/5 to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}