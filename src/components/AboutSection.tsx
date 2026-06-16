"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutSection.css";

export default function AboutSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="about" className="about-section-container container">
        <div style={{ height: "450px", opacity: 0.1, background: "var(--bg-surface)", borderRadius: "16px" }} />
      </section>
    );
  }

  return (
    <section id="about" className="about-section-container container">
      {/* Cinematic Career Objective Card Wrapper */}
      <motion.div
        className="about-card-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Frame (Clips circle and background text) */}
        <div className="about-card-frame">
          {/* Cocoa-Brown Circle behind portrait */}
          <div className="about-card-circle"></div>

          {/* Card Content Grid */}
          <div className="about-card-grid">
            {/* Left Column: Objective Description */}
            <div className="about-card-details">
              <div className="about-card-tagline">
                <span className="about-tagline-dot"></span>
                Part II. — Career Objective
              </div>
              
              <p className="about-card-objective">
                AI Software Engineer with hands-on experience in building Generative AI applications, 
                including RAG pipelines and agentic workflows. Skilled in developing scalable, production-ready 
                systems using modern backend technologies and AI frameworks, with a focus on solving 
                real-world problems through intelligent and efficient solutions.
              </p>

              {/* Tech Badges / Skills Pills */}
              <div className="about-card-pills">
                <span className="about-pill">GEN-AI</span>
                <span className="about-pill">AGENTIC</span>
                <span className="about-pill">RAG</span>
              </div>
              
              <div className="about-card-cta">
                <a href="#contact" className="about-btn-book">
                  Connect Now <span className="about-btn-arrow">↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Empty space so the absolute positioned image sits cleanly */}
            <div></div>
          </div>
        </div>

        {/* Overflowing portrait image container (Outside frame so it can overflow top edge) */}
        <div className="about-card-img-container">
          <img
            src="/vatshal.png"
            alt="Venkat Vatshal"
            className="about-card-img"
            onError={(e) => {
              e.currentTarget.src = "/Vatshal1.png";
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
