"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiExternalLink, FiGithub, FiArrowLeft, FiCheckCircle, FiCpu, FiLayers, FiZap } from "react-icons/fi";

const project = PROJECTS_DATA.find((p) => p.slug === "rag_agent")!;

export default function RagAgentPage() {
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
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
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
              Launch Live Demo ↗
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
            <FiLayers className="w-6 h-6" /> Executive Overview & Objectives
          </h2>
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6">
              TEASER RAG-AGENT is a high-performance, production-ready Agentic Retrieval-Augmented Generation platform. Standard RAG pipelines suffer from context dilution, chunk truncation errors, and rigid static response generation. TEASER solves these challenges by combining vector similarity retrieval with Model Context Protocol (MCP) dynamic tool execution.
            </p>
            <p className="text-white/80 leading-relaxed text-base md:text-lg">
              By introducing structured tool execution and semantic chunking strategies, the system improved retrieval relevance accuracy by **35%**, while enabling autonomous decision loops for complex multi-step user queries.
            </p>
          </div>
        </section>

        {/* Section 2: Technical Architecture & Workflow */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiCpu className="w-6 h-6" /> System Architecture & Execution Loop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-3">1. Document Ingestion & Chunking</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Raw documents (PDFs, Markdown, TXT) are parsed and split into overlapping semantic chunks. Embedding models convert text chunks into high-dimensional vectors stored in a FAISS index.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-3">2. Hybrid Vector Similarity Search</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Incoming queries undergo vector embedding transformation. The system queries FAISS using L2 / Cosine metrics to extract the top-K relevant passages with adaptive distance thresholding.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-3">3. MCP Tool Orchestration</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                If the query requires live web search, mathematical calculations, or external API data, the LLM agent dynamically triggers tools registered via Model Context Protocol (MCP).
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-3">4. Grounded SSE Response Streaming</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Retrieved chunks, conversation memory, and tool outputs are passed into the LLM synthesis engine, streaming grounded responses token-by-token with inline citations over Server-Sent Events.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Core Features & Achievements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiZap className="w-6 h-6" /> Key Features & Capabilities
          </h2>
          <div className="space-y-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <FiCheckCircle className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                <span className="text-white/90 text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Tech Stack Breakdown */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66]">Technology Stack</h2>
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
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-teal-500/30 bg-gradient-to-r from-teal-950/40 to-slate-900/60 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Experience TEASER RAG-AGENT Live</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Test document uploading, vector similarity querying, and agentic response generation on the live Vercel deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#0B0A09] font-bold text-sm hover:bg-[#9E7B66] hover:text-white transition-all shadow-xl"
            >
              Open Live App ↗
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