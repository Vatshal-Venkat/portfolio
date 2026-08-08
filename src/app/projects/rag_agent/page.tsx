"use client";

import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiExternalLink, FiGithub, FiArrowLeft, FiLayers, FiCpu, FiCheckCircle, FiZap } from "react-icons/fi";
import "../ProjectDetail.css";

const project = PROJECTS_DATA.find((p) => p.slug === "rag_agent")!;

export default function RagAgentPage() {
  return (
    <div className="project-detail-container">
      {/* Navigation Back Link */}
      <Link href="/#projects" className="back-link">
        <FiArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Hero Header */}
      <div className="detail-hero">
        <div className="detail-category-badge">
          {project.category}
        </div>
        <h1 className="detail-title text-gradient">
          {project.title}
        </h1>
        <p className="detail-subtitle">
          {project.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="detail-action-row">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-primary"
          >
            <FiExternalLink className="w-4 h-4" />
            Launch Live Demo ↗
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-secondary"
          >
            <FiGithub className="w-4 h-4" />
            GitHub Repository 🐙
          </a>
        </div>
      </div>

      <div className="detail-divider" />

      {/* Section 1: Executive Overview */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiLayers /> Executive Overview & System Goals
        </h2>
        <div className="detail-card">
          <p className="detail-text" style={{ marginBottom: "1.25rem" }}>
            TEASER RAG-AGENT is a high-performance, production-grade Agentic Retrieval-Augmented Generation platform. Standard RAG pipelines suffer from context dilution, chunk truncation errors, and rigid static response generation. TEASER solves these challenges by combining vector similarity retrieval with Model Context Protocol (MCP) dynamic tool execution.
          </p>
          <p className="detail-text">
            By introducing structured tool execution and semantic chunking strategies, the system improved retrieval relevance accuracy by <strong style={{ color: "var(--accent-primary)" }}>35%</strong>, while enabling autonomous decision loops for complex multi-step user queries.
          </p>
        </div>
      </section>

      {/* Section 2: Technical Architecture & Execution Loop */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiCpu /> System Architecture & Execution Loop
        </h2>
        <div className="grid-2col">
          <div className="arch-card">
            <div className="arch-number">STEP // 01</div>
            <h3 className="arch-title">Document Ingestion & Chunking</h3>
            <p className="arch-desc">
              Raw documents (PDFs, Markdown, TXT) are parsed and split into overlapping semantic chunks. Embedding models convert text chunks into high-dimensional vectors stored in a FAISS index.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">STEP // 02</div>
            <h3 className="arch-title">Hybrid Vector Similarity Search</h3>
            <p className="arch-desc">
              Incoming queries undergo vector embedding transformation. The system queries FAISS using L2 / Cosine metrics to extract top-K relevant passages with adaptive distance thresholding.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">STEP // 03</div>
            <h3 className="arch-title">MCP Tool Orchestration</h3>
            <p className="arch-desc">
              If the query requires live web search, mathematical calculations, or external API data, the LLM agent dynamically triggers tools registered via Model Context Protocol (MCP).
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">STEP // 04</div>
            <h3 className="arch-title">Grounded SSE Response Streaming</h3>
            <p className="arch-desc">
              Retrieved chunks, conversation memory, and tool outputs are passed into the LLM synthesis engine, streaming grounded responses token-by-token with inline citations over Server-Sent Events.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Key Features & Capabilities */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiZap /> Key Features & Capabilities
        </h2>
        <div>
          {project.features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <span className="feature-bullet">—</span>
              <span className="feature-text">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Tech Stack Breakdown */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          Technology Stack
        </h2>
        <div className="tech-badge-container">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-badge-item">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Section 5: Live Action Banner */}
      <div className="cta-banner">
        <h3 className="cta-title">Experience TEASER RAG-AGENT Live</h3>
        <p className="cta-desc">
          Test document uploading, vector similarity querying, and agentic response generation on the live Vercel deployment.
        </p>
        <div className="detail-action-row" style={{ justifyContent: "center" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-primary"
          >
            Launch Live App ↗
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-secondary"
          >
            GitHub Repository 🐙
          </a>
        </div>
      </div>
    </div>
  );
}