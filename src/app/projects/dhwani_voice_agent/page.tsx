"use client";

import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiGithub, FiArrowLeft, FiLayers, FiMic, FiRadio, FiCheckCircle } from "react-icons/fi";
import "../ProjectDetail.css";

const project = PROJECTS_DATA.find((p) => p.slug === "dhwani_voice_agent")!;

export default function DhwaniVoiceAgentPage() {
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
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-primary"
          >
            <FiGithub className="w-4 h-4" />
            Explore Dhwani on GitHub 🐙
          </a>
        </div>
      </div>

      <div className="detail-divider" />

      {/* Section 1: Executive Overview */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiLayers /> System Vision & Concept
        </h2>
        <div className="detail-card">
          <p className="detail-text" style={{ marginBottom: "1.25rem" }}>
            <strong>Dhwani</strong> is an advanced, low-latency AI Voice Agent system engineered to deliver natural, human-like voice conversations. Traditional voice chatbots introduce noticeable pauses (3–5 seconds) between speech recognition, text processing, and audio output.
          </p>
          <p className="detail-text">
            Dhwani addresses latency through streaming audio WebSockets, real-time Voice Activity Detection (VAD), continuous Speech-to-Text (STT) transcription, streaming LLM token generation, and real-time Text-to-Speech (TTS) audio synthesis.
          </p>
        </div>
      </section>

      {/* Section 2: Real-Time Pipeline Architecture */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiMic /> Real-Time Voice Processing Pipeline
        </h2>
        <div className="grid-2col">
          <div className="arch-card">
            <div className="arch-number">STAGE // 01</div>
            <h3 className="arch-title">Audio Ingestion & VAD</h3>
            <p className="arch-desc">
              Captures raw microphone audio over bi-directional WebSockets. Voice Activity Detection (VAD) detects speech boundaries and handles user interruptions dynamically.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">STAGE // 02</div>
            <h3 className="arch-title">Speech-to-Text (STT)</h3>
            <p className="arch-desc">
              Converts incoming audio streams into text transcripts in real-time with automatic punctuation and entity recognition.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">STAGE // 03</div>
            <h3 className="arch-title">LLM Reasoning & Functions</h3>
            <p className="arch-desc">
              Transcribed user speech is evaluated by an LLM reasoning engine capable of executing function calls (e.g. database lookups, API actions) mid-conversation.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">STAGE // 04</div>
            <h3 className="arch-title">Streaming TTS Synthesis</h3>
            <p className="arch-desc">
              LLM response tokens are streamed directly to the TTS engine, generating and playing natural speech audio chunks before the complete sentence finishes generating.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Feature Highlights */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiCheckCircle /> Key Innovations & Capabilities
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

      {/* Section 5: GitHub Action Banner */}
      <div className="cta-banner">
        <h3 className="cta-title">Explore Dhwani on GitHub</h3>
        <p className="cta-desc">
          Star, clone, or contribute to the Dhwani Voice Agent repository on GitHub.
        </p>
        <div className="detail-action-row" style={{ justifyContent: "center" }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-primary"
          >
            GitHub Repository 🐙
          </a>
        </div>
      </div>
    </div>
  );
}
