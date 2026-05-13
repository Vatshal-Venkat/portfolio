"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import type { SkillShape } from "@/components/SkillsParticle";

const SkillsParticle = dynamic(() => import("@/components/SkillsParticle"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.2)",
        fontSize: 12,
        letterSpacing: "0.2em",
      }}
    >
      INITIALIZING...
    </div>
  ),
});

// ─── Data ─────────────────────────────────────────────────────────────────────

interface SkillCategory {
  id: string;
  label: string;
  subtitle: string;
  shape: SkillShape;
  accent: string;
  glow: string;
  icon: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "corecs",
    label: "Core CS",
    subtitle: "The Foundation",
    shape: "cube3d",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    icon: "⬡",
    skills: ["Data Structures & Algorithms", "OOPS", "DBMS", "Operating Systems"],
  },
  {
    id: "programming",
    label: "Programming",
    subtitle: "The Language",
    shape: "dnahelix",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.18)",
    icon: "⟨/⟩",
    skills: ["Python", "JAVA", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "genai",
    label: "Generative AI",
    subtitle: "The Intelligence",
    shape: "neuralnet",
    accent: "#5B9DFF",
    glow: "rgba(91,157,255,0.18)",
    icon: "✦",
    skills: [
      "RAG Pipelines",
      "Prompt Engineering",
      "LLM Integration",
      "Embedding Models",
      "Transformers",
      "Chunking & Retrieval Tuning",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Backend",
    subtitle: "The Stack",
    shape: "hexgrid",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.18)",
    icon: "◈",
    skills: ["React.js (Vite)", "Next.js", "FastAPI", "REST APIs", "Styled-Components", "Framer Motion", "CORS Configuration"],
  },
  {
    id: "cloud",
    label: "Cloud & Deployment",
    subtitle: "The Infrastructure",
    shape: "cloudorb",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.18)",
    icon: "☁",
    skills: ["AWS — EC2, S3, IAM", "Amazon Connect", "Vercel", "Render", "Docker"],
  },
  {
    id: "database",
    label: "Database & Vector Search",
    subtitle: "The Memory",
    shape: "database",
    accent: "#f97316",
    glow: "rgba(249,115,22,0.18)",
    icon: "⬤",
    skills: ["MySQL", "Firebase", "Neo4j — Graph DB", "FAISS", "Chroma", "Vector Databases"],
  },
  {
    id: "tools",
    label: "Web Platforms & Tools",
    subtitle: "The Workflow",
    shape: "gitgraph",
    accent: "#e879f9",
    glow: "rgba(232,121,249,0.18)",
    icon: "⌥",
    skills: ["Git", "GitHub", "Wix Studio", "Figma"],
  },
  {
    id: "ai",
    label: "AI Frameworks & Automation",
    subtitle: "The Pipeline",
    shape: "circuitboard",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.18)",
    icon: "⊕",
    skills: ["n8n", "Make", "LangChain"],
  },
];

const SHAPE_LABELS: Record<SkillShape, string> = {
  neuralnet: "Neural Network",
  hexgrid: "Hex Grid",
  dnahelix: "DNA Helix",
  cube3d: "3D Wireframe",
  cloudorb: "Cloud Orb",
  database: "Cylinder Stack",
  gitgraph: "Git Graph",
  circuitboard: "Circuit Board",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SkillsPage() {
  const [active, setActive] = useState<SkillCategory>(CATEGORIES[2]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020202",
        color: "#fff",
        fontFamily: "inherit",
        overflowX: "hidden",
      }}
    >
      {/* ─── Metadata ─────────────────────────────────────────────────────── */}
      <title>Vatshal | Technical Skills</title>

      {/* ─── Header ───────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "7rem 6% 3rem",
          maxWidth: 1600,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
            overflow: "hidden",
            zIndex: 0,
          }}
          aria-hidden
        >
          <span
            style={{
              fontSize: "18vw",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            }}
          >
            SKILLS
          </span>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              color: "#B38B71",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Part III. — The Arsenal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Technical{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #B38B71, #e1cdbe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            Select a category — the particle system on the right morphs into a
            shape that reflects the nature of that skill domain.
          </motion.p>
        </div>
      </section>

      {/* ─── Main Layout ──────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "0 6% 8rem",
          display: "grid",
          gridTemplateColumns: "minmax(0, 420px) 1fr",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* ═══ LEFT COLUMN — Skill Cards ═══════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {CATEGORIES.map((cat, idx) => {
            const isActive = active.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                onClick={() => setActive(cat)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 16,
                  border: `1px solid ${isActive ? cat.accent + "55" : "rgba(255,255,255,0.06)"}`,
                  background: isActive
                    ? `linear-gradient(135deg, ${cat.accent}14, ${cat.accent}08)`
                    : "rgba(255,255,255,0.015)",
                  boxShadow: isActive ? `0 0 36px ${cat.glow}` : "none",
                  overflow: "hidden",
                  transition: "all 0.28s ease",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                {/* Active bar */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: isActive ? cat.accent : "transparent",
                    boxShadow: isActive ? `0 0 10px ${cat.accent}` : "none",
                    borderRadius: "16px 0 0 16px",
                    transition: "all 0.28s ease",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: isActive ? cat.accent + "20" : "rgba(255,255,255,0.04)",
                    color: isActive ? cat.accent : "rgba(255,255,255,0.25)",
                    fontSize: 16,
                    fontWeight: 900,
                    transition: "all 0.28s ease",
                  }}
                >
                  {cat.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        color: isActive ? cat.accent : "rgba(255,255,255,0.85)",
                        transition: "color 0.28s ease",
                      }}
                    >
                      {cat.label}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {cat.subtitle}
                    </span>
                  </div>

                  {/* Skill pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: 10,
                          padding: "3px 8px",
                          borderRadius: 999,
                          background: isActive ? cat.accent + "16" : "rgba(255,255,255,0.04)",
                          color: isActive ? cat.accent + "cc" : "rgba(255,255,255,0.3)",
                          border: `1px solid ${isActive ? cat.accent + "30" : "rgba(255,255,255,0.06)"}`,
                          transition: "all 0.28s ease",
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    fontSize: 14,
                    color: isActive ? cat.accent : "rgba(255,255,255,0.1)",
                    marginTop: 2,
                    flexShrink: 0,
                    transform: isActive ? "translateX(3px)" : "translateX(0)",
                    transition: "all 0.28s ease",
                  }}
                >
                  →
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ RIGHT COLUMN — Particle Canvas (sticky) ═══════════════════════ */}
        <div style={{ position: "sticky", top: 120 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(420px, 52vh, 600px)",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Base bg */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #080812 0%, #0a0a16 50%, #060608 100%)",
                zIndex: 0,
              }}
            />

            {/* Grid overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                opacity: 0.7,
              }}
            />

            {/* Dynamic glow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "_glow"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${active.glow}, transparent)`,
                  pointerEvents: "none",
                }}
              />
            </AnimatePresence>

            {/* Canvas */}
            <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
              <SkillsParticle shape={active.shape} />
            </div>

            {/* Top-left dots */}
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 20,
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {[1, 0.5, 0.2].map((op, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: active.accent,
                    opacity: op,
                  }}
                />
              ))}
            </div>

            {/* Top-right label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "_toplabel"}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 18,
                  zIndex: 20,
                  textAlign: "right",
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: active.accent + "70",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {active.subtitle}
                </p>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    color: active.accent,
                  }}
                >
                  {active.label}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Bottom-left shape label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "_shapelabel"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 18,
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: active.accent,
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: active.accent + "99",
                  }}
                >
                  {SHAPE_LABELS[active.shape]}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Bottom-right hint */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 18,
                zIndex: 20,
                fontSize: 9,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Hover to repel
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            {[
              { label: "Skill Domains", value: "8" },
              { label: "Technologies", value: "40+" },
              { label: "Shape", value: SHAPE_LABELS[active.shape] },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.015)",
                  padding: "12px 14px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: stat.value.length > 4 ? 11 : 18,
                    fontWeight: 900,
                    letterSpacing: stat.value.length > 4 ? "0" : "-0.01em",
                    marginBottom: 4,
                    color: active.accent,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 800px) {
          section:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
