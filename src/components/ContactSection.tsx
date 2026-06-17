"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactSection.css";

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Status States
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitTime, setSubmitTime] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("venkatvatshal@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const now = new Date();
      setSubmitTime(now.toLocaleString("en-US", { hour12: false }));
    }, 1500);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  if (!mounted) {
    return (
      <div className="contact-grid">
        <div style={{ height: "400px", background: "var(--bg-surface)", opacity: 0.1, borderRadius: "16px" }} />
        <div style={{ height: "400px", background: "var(--bg-surface)", opacity: 0.1, borderRadius: "16px" }} />
      </div>
    );
  }

  return (
    <div className="contact-grid">
      {/* Left Column: Info & Socials */}
      <motion.div
        className="contact-info-container"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-info-header">
          <h3 className="contact-info-title">Let&apos;s construct the next intelligence.</h3>
          <p className="contact-info-subtitle">
            Available for full-time engineering roles, AI consulting, RAG architectures, 
            and custom LLM pipeline development. Get in touch directly or use the secure message console.
          </p>
        </div>

        {/* Copy-to-Clipboard Email Card */}
        <div className="contact-card-click-copy" onClick={handleCopyEmail} title="Click to copy email">
          <div>
            <div className="contact-card-label">Direct Communication</div>
            <div className="contact-card-value">venkatvatshal@gmail.com</div>
          </div>
          <div className={`contact-copy-indicator ${copied ? "copied" : ""}`}>
            {copied ? (
              <>
                <span>✓</span> Copied
              </>
            ) : (
              <>
                <span>📋</span> Copy
              </>
            )}
          </div>
        </div>

        {/* Location Info Card */}
        <div className="contact-location-card">
          <div className="contact-card-label">Operational Hub</div>
          <div className="contact-card-value" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1.1rem" }}>
            Hyderabad, India // Remote / Hybrid
          </div>
        </div>

        {/* Social Connection Anchors */}
        <div className="contact-info-header" style={{ gap: "0.5rem" }}>
          <div className="contact-card-label">External Channels</div>
          <div className="contact-social-row">
            <a 
              href="https://github.com/Vatshal-Venkat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-social-circle"
              title="GitHub Profile"
            >
              🐙
            </a>
            <a 
              href="https://linkedin.com/in/vatshal-venkat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-social-circle"
              title="LinkedIn Profile"
            >
              🔗
            </a>
            <a 
              href="/resume.pdf" 
              download
              className="contact-social-circle"
              title="Download PDF Resume"
              style={{ fontSize: "1.15rem" }}
            >
              📄
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Dynamic Form / Console Screen */}
      <motion.div
        className="contact-form-wrapper"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            /* Contact Form View */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="name">Name / Entity</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="contact-input"
                  
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="contact-input"
                  
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="subject">Subject / Purpose</label>
                <input
                  type="text"
                  id="subject"
                  className="contact-input"
                  
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="message">Message Payload</label>
                <textarea
                  id="message"
                  required
                  className="contact-textarea"
                  
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="btn-submit"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> Transmitting...
                  </>
                ) : (
                  <>
                    Transmit Message ↗
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            /* Success Terminal View */
            <motion.div
              key="terminal"
              className="contact-terminal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="terminal-header">
                <span>⚡ SECURE CONSOLE LOGS</span>
                <span>SYSTEM ACTIVE</span>
              </div>
              
              <div className="terminal-line">
                <span className="terminal-prefix">&gt;</span>Initializing secure handshake... Done.
              </div>
              <div className="terminal-line">
                <span className="terminal-prefix">&gt;</span>Packaging payload from &quot;{name}&quot; ({email})... Done.
              </div>
              <div className="terminal-line">
                <span className="terminal-prefix">&gt;</span>Handing off to message dispatcher... Done.
              </div>
              <div className="terminal-line">
                <span className="terminal-prefix">&gt;</span>TRANSMISSION STATUS: <span className="terminal-success">200 OK</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prefix">&gt;</span>TIMESTAMP: {submitTime}
              </div>
              
              <div className="terminal-line" style={{ marginTop: "1rem", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                Message transmitted successfully. Thank you for reaching out! I will review your package and follow up shortly.
              </div>

              <button onClick={handleReset} className="terminal-reset-btn">
                <span>⚙</span> Open New Connection
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
