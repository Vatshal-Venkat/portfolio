"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./SpidermanWebSkills.css";

// Import icons
import { FaBrain, FaDatabase, FaCloud, FaCode, FaTerminal, FaCubes, FaNetworkWired, FaServer, FaMicrochip, FaGlobe, FaWrench, FaRobot, FaLayerGroup, FaAws } from "react-icons/fa";
import { SiPython, SiJavascript, SiReact, SiNextdotjs, SiFastapi, SiDocker, SiVercel, SiMysql, SiFirebase, SiNeo4J, SiGit, SiGithub, SiFigma, SiHtml5, SiCss3, SiPytorch, SiOpenai } from "react-icons/si";
import { GiSpiderWeb } from "react-icons/gi";

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  spoke: number; // 0 to 7
  ring: number;  // 1 to 5
  ringOffset?: number;
  angleOffset?: number;
  relatedIds: string[];
}

const ALL_SKILLS: SkillNode[] = [
  // Spoke 0: Generative AI & ML
  {
    id: "rag_pipelines",
    name: "RAG Pipelines",
    category: "Generative AI",
    icon: <FaBrain />,
    description: "Retrieval-Augmented Generation architectures connecting LLMs with vector search and document knowledge bases.",
    spoke: 0,
    ring: 1,
    relatedIds: ["llm_integration", "embedding_models", "vector_databases", "langchain", "chunking_tuning", "python"]
  },
  {
    id: "prompt_engineering",
    name: "Prompt Engineering",
    category: "Generative AI",
    icon: <FaTerminal />,
    description: "System prompt design, few-shot conditioning, and chain-of-thought orchestration.",
    spoke: 0,
    ring: 2,
    relatedIds: ["rag_pipelines", "llm_integration", "n8n_make"]
  },
  {
    id: "llm_integration",
    name: "LLM Integration",
    category: "Generative AI",
    icon: <SiOpenai />,
    description: "API integration of OpenAI GPT-4, Claude, Gemini, and open-source models.",
    spoke: 0,
    ring: 3,
    relatedIds: ["rag_pipelines", "langchain", "fastapi", "python"]
  },
  {
    id: "embedding_models",
    name: "Embedding Models",
    category: "Generative AI",
    icon: <FaNetworkWired />,
    description: "Dense vector embeddings for semantic similarity search and retrieval.",
    spoke: 0,
    ring: 4,
    relatedIds: ["rag_pipelines", "vector_databases", "deep_learning"]
  },
  {
    id: "transformers",
    name: "Transformers",
    category: "Generative AI",
    icon: <FaMicrochip />,
    description: "Self-attention mechanisms, Transformer architectures, and model fine-tuning fundamentals.",
    spoke: 0,
    ring: 5,
    relatedIds: ["deep_learning", "machine_learning", "python"]
  },

  // Spoke 1: AI Automation & Frameworks
  {
    id: "langchain",
    name: "LangChain",
    category: "AI Frameworks & Automation",
    icon: <FaRobot />,
    description: "Building autonomous AI agents, tool routing, memory chains, and multi-step reasoning.",
    spoke: 1,
    ring: 2,
    relatedIds: ["rag_pipelines", "llm_integration", "python", "vector_databases"]
  },
  {
    id: "n8n_make",
    name: "n8n & Make",
    category: "AI Frameworks & Automation",
    icon: <FaWrench />,
    description: "Workflow automation, webhook orchestration, and serverless AI pipeline triggers.",
    spoke: 1,
    ring: 3,
    relatedIds: ["rest_apis", "prompt_engineering", "git"]
  },
  {
    id: "chunking_tuning",
    name: "Chunking & Retrieval Tuning",
    category: "Generative AI",
    icon: <FaLayerGroup />,
    description: "Optimizing text chunking strategies, overlap ratios, and hybrid re-ranking.",
    spoke: 1,
    ring: 4,
    relatedIds: ["rag_pipelines", "vector_databases", "embedding_models"]
  },

  // Spoke 2: Programming Languages & Core ML
  {
    id: "python",
    name: "Python",
    category: "Programming Languages",
    icon: <SiPython />,
    description: "Primary language for GenAI pipelines, data engineering, backend APIs, and ML scripting.",
    spoke: 2,
    ring: 1,
    relatedIds: ["rag_pipelines", "fastapi", "machine_learning", "deep_learning", "dsa"]
  },
  {
    id: "machine_learning",
    name: "Machine Learning",
    category: "Generative AI",
    icon: <FaBrain />,
    description: "Supervised & unsupervised learning algorithms, feature engineering, and model validation.",
    spoke: 2,
    ring: 2,
    relatedIds: ["deep_learning", "python", "dsa", "transformers"]
  },
  {
    id: "deep_learning",
    name: "Deep Learning",
    category: "Generative AI",
    icon: <SiPytorch />,
    description: "Neural network architectures, PyTorch, gradient descent, and optimization.",
    spoke: 2,
    ring: 3,
    relatedIds: ["machine_learning", "transformers", "python", "oops"]
  },
  {
    id: "java",
    name: "JAVA",
    category: "Programming Languages",
    icon: <FaCode />,
    description: "Object-oriented software development, enterprise architectures, and DSA algorithms.",
    spoke: 2,
    ring: 4,
    relatedIds: ["oops", "dsa", "dbms"]
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming Languages",
    icon: <FaDatabase />,
    description: "Relational query optimization, indexing strategies, and transactional database design.",
    spoke: 2,
    ring: 5,
    relatedIds: ["mysql", "dbms", "python"]
  },

  // Spoke 3: Frontend Web Technologies
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming Languages",
    icon: <SiJavascript />,
    description: "Modern ES6+ asynchronous web development, DOM APIs, and client-side web application logic.",
    spoke: 3,
    ring: 1,
    relatedIds: ["react_vite", "nextjs", "html_css", "rest_apis"]
  },
  {
    id: "react_vite",
    name: "React.js (Vite)",
    category: "Frontend & Backend",
    icon: <SiReact />,
    description: "Component-driven single page app architecture, React hooks, state management, and Vite builds.",
    spoke: 3,
    ring: 2,
    relatedIds: ["javascript", "nextjs", "framer_motion", "rest_apis"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend & Backend",
    icon: <SiNextdotjs />,
    description: "React App Router, Server Components, SSR, SSG, API routes, and full-stack web applications.",
    spoke: 3,
    ring: 3,
    relatedIds: ["react_vite", "javascript", "vercel", "fastapi"]
  },
  {
    id: "framer_motion",
    name: "Framer Motion",
    category: "Frontend & Backend",
    icon: <FaCubes />,
    description: "Fluid UI micro-interactions, layout transitions, and interactive web motion graphics.",
    spoke: 3,
    ring: 4,
    relatedIds: ["react_vite", "nextjs", "html_css"]
  },
  {
    id: "html_css",
    name: "HTML & CSS",
    category: "Programming Languages",
    icon: <SiHtml5 />,
    description: "Semantic HTML5, CSS Grid, Flexbox, responsive layouts, and glassmorphism UI design.",
    spoke: 3,
    ring: 5,
    relatedIds: ["javascript", "react_vite", "figma"]
  },

  // Spoke 4: Backend & API Engineering
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Frontend & Backend",
    icon: <SiFastapi />,
    description: "Asynchronous Python web framework for ultra-fast REST APIs, Pydantic typing, and Swagger docs.",
    spoke: 4,
    ring: 2,
    relatedIds: ["python", "rest_apis", "cors_config", "llm_integration", "docker"]
  },
  {
    id: "rest_apis",
    name: "REST APIs",
    category: "Frontend & Backend",
    icon: <FaServer />,
    description: "RESTful architecture, status codes, JWT authentication, and clean API contract design.",
    spoke: 4,
    ring: 3,
    relatedIds: ["fastapi", "react_vite", "cors_config", "n8n_make"]
  },
  {
    id: "cors_config",
    name: "CORS Configuration",
    category: "Frontend & Backend",
    icon: <FaGlobe />,
    description: "Cross-Origin Resource Sharing security headers, preflight handling, and security origin policies.",
    spoke: 4,
    ring: 4,
    relatedIds: ["fastapi", "rest_apis", "nextjs"]
  },

  // Spoke 5: Database & Vector Search
  {
    id: "vector_databases",
    name: "Vector Databases (FAISS, Chroma)",
    category: "Database & Vector Search",
    icon: <FaDatabase />,
    description: "High-dimensional vector indexing, Cosine similarity search, and similarity vector retrieval.",
    spoke: 5,
    ring: 1,
    relatedIds: ["rag_pipelines", "embedding_models", "chunking_tuning", "python"]
  },
  {
    id: "neo4j",
    name: "Neo4j (Graph DB)",
    category: "Database & Vector Search",
    icon: <SiNeo4J />,
    description: "Graph database modeling, Cypher queries, and Graph RAG knowledge graphs.",
    spoke: 5,
    ring: 2,
    relatedIds: ["vector_databases", "rag_pipelines", "dbms"]
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database & Vector Search",
    icon: <SiMysql />,
    description: "Relational database management, ACID transactions, and schema normalization.",
    spoke: 5,
    ring: 3,
    relatedIds: ["sql", "dbms", "firebase"]
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Database & Vector Search",
    icon: <SiFirebase />,
    description: "NoSQL Firestore database, real-time sync, Firebase Auth, and serverless hosting.",
    spoke: 5,
    ring: 4,
    relatedIds: ["mysql", "react_vite", "vercel"]
  },

  // Spoke 6: Cloud & Deployment
  {
    id: "aws",
    name: "AWS (EC2, S3, IAM, Connect)",
    category: "Cloud & Deployment",
    icon: <FaAws />,
    description: "Cloud infrastructure provisioning on AWS EC2 servers, S3 storage, IAM roles, and Amazon Connect.",
    spoke: 6,
    ring: 2,
    relatedIds: ["docker", "vercel", "render", "fastapi"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & Deployment",
    icon: <SiDocker />,
    description: "Containerizing applications, Dockerfiles, Docker Compose, and environment isolation.",
    spoke: 6,
    ring: 3,
    relatedIds: ["aws", "fastapi", "render"]
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Cloud & Deployment",
    icon: <SiVercel />,
    description: "Instant CI/CD deployment, serverless functions, custom domains, and Next.js optimization.",
    spoke: 6,
    ring: 4,
    relatedIds: ["nextjs", "react_vite", "aws"]
  },
  {
    id: "render",
    name: "Render",
    category: "Cloud & Deployment",
    icon: <FaCloud />,
    description: "Deploying backend Python APIs, background workers, and FastAPI web microservices.",
    spoke: 6,
    ring: 5,
    relatedIds: ["fastapi", "docker", "aws"]
  },

  // Spoke 7: Core Computer Science & Tools
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "Core CS",
    icon: <FaCode />,
    description: "Arrays, Trees, Graphs, Dynamic Programming, Sorting algorithms, and Big-O complexity analysis.",
    spoke: 7,
    ring: 1,
    relatedIds: ["oops", "dbms", "operating_systems", "python", "java"]
  },
  {
    id: "oops",
    name: "OOPS",
    category: "Core CS",
    icon: <FaCubes />,
    description: "Object-Oriented Programming principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.",
    spoke: 7,
    ring: 2,
    relatedIds: ["dsa", "java", "python"]
  },
  {
    id: "dbms",
    name: "DBMS",
    category: "Core CS",
    icon: <FaDatabase />,
    description: "Database Management Systems, schema normalization, ER models, and transaction concurrency.",
    spoke: 7,
    ring: 3,
    relatedIds: ["sql", "mysql", "dsa"]
  },
  {
    id: "operating_systems",
    name: "Operating Systems",
    category: "Core CS",
    icon: <FaTerminal />,
    description: "Process synchronization, multithreading, memory management, virtual memory, and OS fundamentals.",
    spoke: 7,
    ring: 4,
    relatedIds: ["dsa", "docker", "git"]
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Web Platforms & Tools",
    icon: <SiGit />,
    description: "Version control, branching strategies, pull requests, merge conflict resolution, and GitHub Actions.",
    spoke: 7,
    ring: 5,
    relatedIds: ["operating_systems", "docker", "n8n_make"]
  },
  {
    id: "figma",
    name: "Figma & Wix Studio",
    category: "Web Platforms & Tools",
    icon: <SiFigma />,
    description: "UI/UX wireframing, interactive prototyping, vector graphics, and web layout design.",
    spoke: 3,
    ring: 5,
    relatedIds: ["react_vite", "html_css"]
  }
];

const CATEGORIES = [
  "ALL",
  "Generative AI",
  "Programming Languages",
  "Frontend & Backend",
  "Database & Vector Search",
  "Cloud & Deployment",
  "Core CS",
  "AI Frameworks & Automation"
];

export default function SpidermanWebSkills() {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  const [viewportSize, setViewportSize] = useState({ w: 800, h: 560 });

  const updateDimensions = useCallback(() => {
    if (viewportRef.current) {
      const W = viewportRef.current.clientWidth;
      const H = viewportRef.current.clientHeight || 560;
      setViewportSize({ w: W, h: H });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Compute precise polar positions for each skill on the web canvas
  const nodePositions = useMemo(() => {
    const cx = viewportSize.w / 2;
    const cy = viewportSize.h / 2;
    const maxRadius = Math.min(cx, cy) * 0.82;

    const totalSpokes = 8;
    const totalRings = 5;

    const map: Record<string, { x: number; y: number }> = {};

    ALL_SKILLS.forEach((skill) => {
      const baseAngle = (skill.spoke * (2 * Math.PI / totalSpokes)) - (Math.PI / 2);
      const angle = baseAngle + (skill.angleOffset || 0);

      const ringRatio = (skill.ring + (skill.ringOffset || 0)) / (totalRings + 0.4);
      const radius = 55 + ringRatio * (maxRadius - 55);

      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;

      map[skill.id] = { x: px, y: py };
    });

    return map;
  }, [viewportSize]);

  // Active skill node object
  const activeSkill = useMemo(() => {
    return ALL_SKILLS.find((s) => s.id === hoveredSkillId) || null;
  }, [hoveredSkillId]);

  // Active set of related skill IDs
  const activeSet = useMemo(() => {
    const set = new Set<string>();

    if (hoveredSkillId) {
      set.add(hoveredSkillId);
      const node = ALL_SKILLS.find((s) => s.id === hoveredSkillId);
      if (node) {
        node.relatedIds.forEach((rid) => set.add(rid));
        ALL_SKILLS.forEach((other) => {
          if (other.relatedIds.includes(hoveredSkillId)) {
            set.add(other.id);
          }
        });
      }
    } else if (activeCategory !== "ALL") {
      ALL_SKILLS.forEach((s) => {
        if (s.category === activeCategory) {
          set.add(s.id);
        }
      });
    }

    return set;
  }, [hoveredSkillId, activeCategory]);

  // Canvas Web Render Loop (Silver-Gray & Amber Aesthetic)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = viewportSize.w;
    const H = viewportSize.h;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let rafId: number;

    const cx = W / 2;
    const cy = H / 2;
    const totalSpokes = 8;
    const totalRings = 5;
    const maxRadius = Math.min(cx, cy) * 0.82;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const isHoveredState = hoveredSkillId !== null || activeCategory !== "ALL";

      // 1. Draw Spider Web Radial Spokes (Silver-Gray)
      for (let s = 0; s < totalSpokes; s++) {
        const angle = s * (2 * Math.PI / totalSpokes) - (Math.PI / 2);
        const endX = cx + Math.cos(angle) * maxRadius;
        const endY = cy + Math.sin(angle) * maxRadius;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(endX, endY);

        ctx.lineWidth = 1;
        ctx.strokeStyle = isHoveredState ? "rgba(140, 145, 160, 0.12)" : "rgba(160, 165, 180, 0.28)";
        ctx.stroke();
      }

      // 2. Draw Concentric Catenary Web Rings (Sagging Silver Threads)
      for (let r = 1; r <= totalRings; r++) {
        const ringRatio = r / (totalRings + 0.4);
        const radius = 55 + ringRatio * (maxRadius - 55);

        ctx.beginPath();
        for (let s = 0; s < totalSpokes; s++) {
          const a1 = s * (2 * Math.PI / totalSpokes) - (Math.PI / 2);
          const a2 = ((s + 1) % totalSpokes) * (2 * Math.PI / totalSpokes) - (Math.PI / 2);

          const x1 = cx + Math.cos(a1) * radius;
          const y1 = cy + Math.sin(a1) * radius;
          const x2 = cx + Math.cos(a2) * radius;
          const y2 = cy + Math.sin(a2) * radius;

          const midA = (a1 + a2) / 2;
          const sagR = radius * 0.93;
          const midX = cx + Math.cos(midA) * sagR;
          const midY = cy + Math.sin(midA) * sagR;

          if (s === 0) ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(midX, midY, x2, y2);
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = isHoveredState ? "rgba(140, 145, 160, 0.1)" : "rgba(160, 165, 180, 0.24)";
        ctx.stroke();
      }

      // 3. Draw Active Related Web Lines (Clean Amber / Warm Gold Strands)
      if (isHoveredState && activeSet.size > 0) {
        ALL_SKILLS.forEach((skill) => {
          if (!activeSet.has(skill.id)) return;

          const p1 = nodePositions[skill.id];
          if (!p1) return;

          const isHoveredNode = skill.id === hoveredSkillId;

          skill.relatedIds.forEach((rid) => {
            if (!activeSet.has(rid)) return;
            const p2 = nodePositions[rid];
            if (!p2) return;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.lineWidth = isHoveredNode ? 2.2 : 1.5;
            ctx.strokeStyle = isHoveredNode
              ? "rgba(245, 158, 11, 0.85)"
              : "rgba(217, 119, 6, 0.65)";
            ctx.shadowColor = "#f59e0b";
            ctx.shadowBlur = isHoveredNode ? 10 : 5;
            ctx.stroke();
            ctx.shadowBlur = 0;
          });
        });
      }

      // 4. Draw Web Intersection Knots / Dots
      ALL_SKILLS.forEach((skill) => {
        const pos = nodePositions[skill.id];
        if (!pos) return;

        const isLit = activeSet.has(skill.id);
        const isActive = skill.id === hoveredSkillId;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isActive ? 5 : isLit ? 3.5 : 2.5, 0, Math.PI * 2);

        if (isActive) {
          ctx.fillStyle = "#f59e0b";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 12;
        } else if (isLit) {
          ctx.fillStyle = "#d97706";
          ctx.shadowColor = "#d97706";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = "rgba(180, 185, 200, 0.4)";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [viewportSize, hoveredSkillId, activeCategory, activeSet, nodePositions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -9999, y: -9999 };
    setHoveredSkillId(null);
  };

  return (
    <div className="spiderman-web-section">
      {/* Background Mesh */}
      <div className="spiderman-web-bg-overlay" />

      {/* Top Header & Category Filter Controls (Cleanly Separated) */}
      <div className="spider-top-panel">
        <div className="spider-header-row">
          <div className="spider-title-box">
            <div className="spider-icon-badge">
              <GiSpiderWeb size={20} />
            </div>
            <div>
              <h4 className="spider-main-title">Interactive Skill Web</h4>
              <p className="spider-main-subtitle">Explore technical expertise & interdisciplinary connections</p>
            </div>
          </div>

          <div className="spider-status-pill">
            <span>WEB MATRIX // ACTIVE</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="spider-category-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`spider-cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "ALL" && <GiSpiderWeb size={13} />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div
        ref={viewportRef}
        className="spider-canvas-viewport"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="spider-web-canvas" />

        {/* Center Spider Hub Node */}
        <div
          className="center-spider-hub"
          onClick={() => {
            setHoveredSkillId(null);
            setActiveCategory("ALL");
          }}
          title="Web Hub — Reset View"
        >
          <GiSpiderWeb size={24} />
        </div>

        {/* HTML Skill Nodes Layer */}
        <div className="spider-nodes-layer">
          {ALL_SKILLS.map((skill) => {
            const pos = nodePositions[skill.id];
            if (!pos) return null;

            const isActive = skill.id === hoveredSkillId;
            const isRelated = !isActive && activeSet.has(skill.id);
            const isCategoryMatch = activeCategory !== "ALL" && skill.category === activeCategory;
            const isLit = isActive || isRelated || isCategoryMatch;

            const isHoveringAny = hoveredSkillId !== null || activeCategory !== "ALL";

            let nodeClass = "spider-node-item";
            if (!isHoveringAny) {
              nodeClass += " is-hidden-default";
            } else if (isActive) {
              nodeClass += " is-active";
            } else if (isLit) {
              nodeClass += " is-related";
            } else {
              nodeClass += " is-dimmed";
            }

            return (
              <div
                key={skill.id}
                className={nodeClass}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`
                }}
                onMouseEnter={() => setHoveredSkillId(skill.id)}
              >
                <div className="spider-node-badge">
                  <span className="spider-node-icon">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Detail Card (Bottom Overlay) */}
        {activeSkill ? (
          <div className="spider-hud-card">
            <div className="spider-hud-card-header">
              <div className="spider-hud-card-title-group">
                <div className="spider-hud-card-icon">{activeSkill.icon}</div>
                <h3 className="spider-hud-card-name">{activeSkill.name}</h3>
              </div>
              <span className="spider-hud-card-cat">{activeSkill.category}</span>
            </div>

            <p className="spider-hud-card-desc">{activeSkill.description}</p>

            <div className="spider-hud-related-tags">
              <span className="related-tag-label">Connected Web Nodes:</span>
              {activeSkill.relatedIds.map((rid) => {
                const relNode = ALL_SKILLS.find((s) => s.id === rid);
                return relNode ? (
                  <span key={rid} className="related-tag-pill">
                    {relNode.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <div className="spider-web-hint">
            <GiSpiderWeb size={16} color="#d97706" />
            <span>Hover over any web node to reveal connected skills</span>
          </div>
        )}
      </div>
    </div>
  );
}
