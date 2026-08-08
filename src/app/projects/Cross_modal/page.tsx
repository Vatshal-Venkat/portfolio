"use client";

import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiExternalLink, FiGithub, FiArrowLeft, FiLayers, FiCpu, FiBarChart2 } from "react-icons/fi";
import "../ProjectDetail.css";

const project = PROJECTS_DATA.find((p) => p.slug === "Cross_modal")!;

export default function CrossModalPage() {
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
            Hugging Face Live Space ↗
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
          <FiLayers /> System Concept & Multimodal Challenge
        </h2>
        <div className="detail-card">
          <p className="detail-text" style={{ marginBottom: "1.25rem" }}>
            Modern AI systems operate across diverse media modalities—text descriptions, raw images, audio recordings, and video clips. Evaluating how accurately a model connects concepts across modalities requires a unified vector embedding space.
          </p>
          <p className="detail-text">
            The <strong>Cross-Modal Similarity Evaluation System</strong> projects heterogenous data types into a normalized multi-dimensional vector space using state-of-the-art neural encoders (CLIP, MiniLM, Wav2Vec2). It calculates exact cosine similarity distances, benchmark distributions, and ranking metrics across models.
          </p>
        </div>
      </section>

      {/* Section 2: Multimodal Model Integration Matrix */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiCpu /> Multimodal Embedding Pipeline
        </h2>
        <div className="grid-3col">
          <div className="arch-card">
            <div className="arch-number">MODALITY // 01</div>
            <h3 className="arch-title">Vision & Text (CLIP)</h3>
            <p className="arch-desc">
              Encodes text descriptions and image frames into a shared 512-dimensional embedding space for instant cross-modal similarity scoring.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">MODALITY // 02</div>
            <h3 className="arch-title">Text Semantics (MiniLM)</h3>
            <p className="arch-desc">
              Computes high-density text embeddings for semantic similarity, intent parsing, and natural language matching benchmarks.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">MODALITY // 03</div>
            <h3 className="arch-title">Audio Signal (Wav2Vec2)</h3>
            <p className="arch-desc">
              Transforms acoustic speech waveforms into latent representations to evaluate audio-to-text and speech similarity metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Key Features & Capabilities */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiBarChart2 /> Key System Capabilities
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
          Frameworks & Libraries
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
        <h3 className="cta-title">Try the Live Hugging Face Space</h3>
        <p className="cta-desc">
          Upload text, images, or audio on the live Hugging Face Space to evaluate real-time similarity scores.
        </p>
        <div className="detail-action-row" style={{ justifyContent: "center" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-primary"
          >
            Open Hugging Face Space ↗
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