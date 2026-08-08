"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import "./ProjectCard.css";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  category?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  techStack = [],
  liveUrl,
  githubUrl,
  index,
  category = "Featured Project",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="card-wrapper"
    >
      {/* Top Gradient Line */}
      <div className="card-top-accent" />

      {/* Main Minimal Card Content */}
      <div className="card-content">
        <div className="card-meta">
          Project // 0{index + 1} • {category}
        </div>

        <h3 className="card-title">
          {title}
        </h3>

        <p className="card-description">
          {description}
        </p>

        {/* Tech Stack Pills (Limited to 5 for ultra-clean layout) */}
        {techStack.length > 0 && (
          <div className="card-tech-list">
            {techStack.slice(0, 5).map((tech, i) => (
              <span key={i} className="card-tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Action Bar */}
      <div className="card-actions">
        <div className="card-external-btns">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-live"
              title="Launch Live Demo"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              Live Demo ↗
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-github"
              title="View GitHub Repository"
            >
              <FiGithub className="w-3.5 h-3.5" />
              GitHub 🐙
            </a>
          )}
        </div>

        {/* Dedicated Page Detailed Link */}
        <Link href={href} className="card-details-link">
          <span>View Details</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
