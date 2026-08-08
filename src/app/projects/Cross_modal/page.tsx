"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiExternalLink, FiGithub, FiArrowLeft, FiCheckCircle, FiLayers, FiCpu, FiBarChart2 } from "react-icons/fi";

const project = PROJECTS_DATA.find((p) => p.slug === "Cross_modal")!;

export default function CrossModalPage() {
  return (
    <div className="py-28 min-h-screen text-white">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Navigation Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E7B66] hover:text-white transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] text-[#0B0A09] text-sm font-bold hover:bg-[#9E7B66] hover:text-white transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              <FiExternalLink className="w-4 h-4" />
              Launch Hugging Face Live Space ↗
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all transform hover:-translate-y-0.5"
            >
              <FiGithub className="w-4 h-4" />
              View Source Code on GitHub 🐙
            </a>
          </div>
        </motion.div>

        <hr className="border-white/10 my-12" />

        {/* Section 1: Executive Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiLayers className="w-6 h-6" /> System Concept & Multimodal Challenge
          </h2>
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6">
              Modern AI systems operate across diverse media modalities—text descriptions, raw images, audio recordings, and video clips. Evaluating how accurately a model connects concepts across modalities requires a unified vector embedding space.
            </p>
            <p className="text-white/80 leading-relaxed text-base md:text-lg">
              The **Cross-Modal Similarity Evaluation System** projects heterogenous data types into a normalized multi-dimensional vector space using state-of-the-art neural encoders (CLIP, MiniLM, Wav2Vec2). It calculates exact cosine similarity distances, benchmark distributions, and ranking metrics across models.
            </p>
          </div>
        </section>

        {/* Section 2: Multimodal Model Integration Matrix */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiCpu className="w-6 h-6" /> Multimodal Embedding Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 text-blue-400">Vision & Text</h3>
              <p className="text-white/70 text-xs font-mono mb-3">Model: OpenAI CLIP (ViT-B/32)</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Encodes text descriptions and image frames into a shared 512-dimensional embedding space for instant cross-modal similarity scoring.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 text-purple-400">Text Semantics</h3>
              <p className="text-white/70 text-xs font-mono mb-3">Model: sentence-transformers MiniLM</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Computes high-density dense text embeddings for semantic similarity, intent parsing, and natural language matching benchmarks.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 text-pink-400">Audio Signal</h3>
              <p className="text-white/70 text-xs font-mono mb-3">Model: Meta Wav2Vec2</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Transforms acoustic speech waveforms into latent representations to evaluate audio-to-text and speech similarity metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Evaluation Metrics & Dashboard Capabilities */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiBarChart2 className="w-6 h-6" /> Key System Capabilities
          </h2>
          <div className="space-y-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <FiCheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <span className="text-white/90 text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66]">Frameworks & Libraries</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white font-mono text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Section 5: Live Action Banner */}
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 to-slate-900/60 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Try the Live Hugging Face Space</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Upload text, images, or audio on the live Hugging Face Space to evaluate real-time similarity scores.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#0B0A09] font-bold text-sm hover:bg-[#9E7B66] hover:text-white transition-all shadow-xl"
            >
              Open Hugging Face Space ↗
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all"
            >
              GitHub Repository 🐙
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}