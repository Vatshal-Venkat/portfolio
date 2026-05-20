"use client";

import { motion } from "framer-motion";
import "./Hero.css"; // Create a specific CSS file for Hero if needed, or just use globals

export default function Hero() {
  return (
    <section className="hero-section flex items-center justify-center">
      <div className="glow-effect" style={{ top: "20%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", opacity: 0.5 }}></div>
      <div className="container text-center" style={{ zIndex: 1, position: "relative" }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="badge mb-md">System Online</span>
        </motion.div>
        
        <motion.h1 
          className="h1 mb-sm text-gradient"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          VENKAT VATSHAL
        </motion.h1>

        <motion.p
          className="h3 mb-lg text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          AI Software Engineer
        </motion.p>
        
        <motion.div
          className="flex justify-center gap-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </motion.div>
        
      </div>
    </section>
  );
}