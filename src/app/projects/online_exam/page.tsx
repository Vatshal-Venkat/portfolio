"use client";

import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiExternalLink, FiGithub, FiArrowLeft, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";
import "../ProjectDetail.css";

const project = PROJECTS_DATA.find((p) => p.slug === "online_exam")!;

export default function OnlineExamPage() {
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
            VJITPREP Live Portal ↗
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
            <strong>VJITPREP</strong> is a high-availability online examination platform engineered to serve university students preparing for semester exams and placement assessments.
          </p>
          <p className="detail-text">
            The platform handles dynamic question generation, instant auto-evaluation, state persistence across network interruptions, anti-cheating tab tracking, and real-time leaderboard analytics. Through strategic backend query caching and index optimization, database query latency was reduced by <strong style={{ color: "var(--accent-primary)" }}>40%</strong>.
          </p>
        </div>
      </section>

      {/* Section 2: Key Modules */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiShield /> Architecture & Key Modules
        </h2>
        <div className="grid-2col">
          <div className="arch-card">
            <div className="arch-number">MODULE // 01</div>
            <h3 className="arch-title">Dynamic Quiz Engine</h3>
            <p className="arch-desc">
              Fetches randomized questions from the CMS database based on topic tags, level of difficulty, and timing parameters.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">MODULE // 02</div>
            <h3 className="arch-title">Anti-Cheating Detection</h3>
            <p className="arch-desc">
              Monitors browser window focus events, tab switching, and paste operations during active test sessions to ensure exam integrity.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">MODULE // 03</div>
            <h3 className="arch-title">Automated Instant Evaluation</h3>
            <p className="arch-desc">
              Evaluates responses immediately upon submission, calculating topic-wise accuracy breakdowns and speed metrics.
            </p>
          </div>
          <div className="arch-card">
            <div className="arch-number">MODULE // 04</div>
            <h3 className="arch-title">Real-Time Leaderboard</h3>
            <p className="arch-desc">
              Computes competitive student rankings based on scores and test duration, updating leaderboards in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Feature Highlights */}
      <section className="detail-section">
        <h2 className="detail-section-heading">
          <FiTrendingUp /> Feature Highlights
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
        <h3 className="cta-title">Visit VJITPREP Portal Live</h3>
        <p className="cta-desc">
          Access the live production assessment portal deployed on WixStudio and inspect the GitHub repository.
        </p>
        <div className="detail-action-row" style={{ justifyContent: "center" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-btn-primary"
          >
            Open Live Portal ↗
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