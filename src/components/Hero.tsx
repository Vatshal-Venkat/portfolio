"use client";

import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          {/* LEFT COLUMN: TYPOGRAPHY & CTAs */}
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                System Core // Active
              </div>
            </motion.div>
            
            <div className="hero-title-container">
              <motion.h1 
                className="hero-title text-gradient"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              >
                VENKAT VATSHAL
              </motion.h1>
            </div>

            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              AI Software Engineer
            </motion.h2>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              Building production-grade Generative AI applications, advanced RAG pipelines, 
              graph intelligence databases, and agentic LLM workflows. Solving complex, 
              real-world challenges with intelligent, scalable digital architecture.
            </motion.p>
            
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE CINEMATIC POSTER CARD */}
          <div className="hero-visual">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            >
              {/* Gentle floating animation for the poster */}
              <motion.div 
                className="poster-card"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {/* Backlight Ambient Glow */}
                <div className="poster-glow"></div>
                
                {/* HUD Overlay Elements */}
                <div className="poster-hud">
                  <div className="hud-top">
                    <span>SEC_04 // ENG-AI</span>
                    <span>SYS_N8N_ACTIVE</span>
                  </div>
                  
                  <div className="hud-bottom">
                    <div className="hud-barcode">
                      ||||| | ||| || ||| |
                    </div>
                    <div className="hud-tech-details">
                      <span>LATENCY // 42MS</span>
                      <span>CORE // STABLE</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Inner Frame */}
                <div className="poster-frame"></div>

                {/* Portrait Image Container */}
                <div className="poster-img-container">
                  <img 
                    src="/Vatshal-Venkat.png" 
                    alt="Venkat Vatshal Portrait" 
                    className="poster-img"
                    onError={(e) => {
                      // Fallback in case of filename variations
                      e.currentTarget.src = "/Venkat-Vatshal.png";
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}