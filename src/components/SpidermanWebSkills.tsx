"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./SpidermanWebSkills.css";

// Import icons
import { FaSpider, FaBrain, FaDatabase, FaCloud, FaCode, FaTerminal, FaCubes, FaNetworkWired, FaServer, FaMicrochip, FaGlobe, FaWrench, FaRobot, FaLayerGroup, FaAws } from "react-icons/fa6";
import { SiPython, SiJavascript, SiReact, SiNextdotjs, SiFastapi, SiDocker, SiVercel, SiMysql, SiFirebase, SiNeo4J, SiGit, SiGithub, SiFigma, SiHtml5, SiCss, SiPytorch, SiOpenai } from "react-icons/si";
import { GiSpiderWeb, GiSparkles } from "react-icons/gi";

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  spoke: number; // 0 to 15
  ring: number;  // 1 to 14
  relatedIds: string[];
}

const TOTAL_SPOKES = 16;
const TOTAL_RINGS = 14;

// 16 Fanned Organic Radial Spokes
const SPOKE_ANGLES = Array.from({ length: TOTAL_SPOKES }, (_, i) => {
  const base = (i * (2 * Math.PI / TOTAL_SPOKES)) - (Math.PI / 2);
  const organicShift = Math.sin(i * 1.7) * 0.035;
  return base + organicShift;
});

const SPOKE_STRETCH = Array.from({ length: TOTAL_SPOKES }, (_, i) => {
  return 1.0 + Math.sin(i * 2.1) * 0.08;
});

// Non-equidistant exponential ring radius
function getExponentialRingRadius(r: number, maxR: number, spokeIdx: number): number {
  const minR = 30;
  const t = (r - 1) / (TOTAL_RINGS - 1);
  const expT = Math.pow(t, 1.75);
  const sectorFactor = 1.0 + Math.sin(spokeIdx * 1.5 + r * 0.4) * 0.06;
  return (minR + expT * (maxR - minR)) * sectorFactor;
}

// Background Silk Dust Particles
interface SilkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const ALL_SKILLS: SkillNode[] = [
  // ─── Generative AI & LLMs ────────────────────────────────────────────
  {
    id: "rag_pipelines",
    name: "RAG Pipelines",
    category: "Generative AI",
    icon: <FaBrain />,
    description: "Retrieval-Augmented Generation architectures connecting LLMs with vector search and document knowledge bases.",
    spoke: 0,
    ring: 3,
    relatedIds: ["llm_integration", "embedding_models", "vector_databases", "langchain", "chunking_tuning", "python"]
  },
  {
    id: "prompt_engineering",
    name: "Prompt Engineering",
    category: "Generative AI",
    icon: <FaTerminal />,
    description: "System prompt design, few-shot conditioning, and chain-of-thought orchestration.",
    spoke: 0,
    ring: 7,
    relatedIds: ["rag_pipelines", "llm_integration", "n8n_make"]
  },
  {
    id: "transformers",
    name: "Transformers",
    category: "Generative AI",
    icon: <FaMicrochip />,
    description: "Self-attention mechanisms, Transformer architectures, and model fine-tuning fundamentals.",
    spoke: 0,
    ring: 11,
    relatedIds: ["deep_learning", "machine_learning", "python"]
  },
  {
    id: "llm_integration",
    name: "LLM Integration",
    category: "Generative AI",
    icon: <SiOpenai />,
    description: "API integration of OpenAI GPT-4, Claude, Gemini, and open-source models.",
    spoke: 1,
    ring: 5,
    relatedIds: ["rag_pipelines", "langchain", "fastapi", "python"]
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI Frameworks & Automation",
    icon: <FaRobot />,
    description: "Building autonomous AI agents, tool routing, memory chains, and multi-step reasoning.",
    spoke: 2,
    ring: 8,
    relatedIds: ["rag_pipelines", "llm_integration", "python", "vector_databases"]
  },

  // ─── Vector Search & Embeddings ──────────────────────────────────────
  {
    id: "embedding_models",
    name: "Embedding Models",
    category: "Generative AI",
    icon: <FaNetworkWired />,
    description: "Dense vector embeddings for semantic similarity search and document retrieval.",
    spoke: 3,
    ring: 4,
    relatedIds: ["rag_pipelines", "vector_databases", "deep_learning"]
  },
  {
    id: "chunking_tuning",
    name: "Chunking & Retrieval Tuning",
    category: "Generative AI",
    icon: <FaLayerGroup />,
    description: "Optimizing text chunking strategies, overlap ratios, and hybrid re-ranking.",
    spoke: 3,
    ring: 9,
    relatedIds: ["rag_pipelines", "vector_databases", "embedding_models"]
  },
  {
    id: "vector_databases",
    name: "Vector Databases (FAISS, Chroma)",
    category: "Database & Vector Search",
    icon: <FaDatabase />,
    description: "High-dimensional vector indexing, Cosine similarity search, and similarity vector retrieval.",
    spoke: 4,
    ring: 12,
    relatedIds: ["rag_pipelines", "embedding_models", "chunking_tuning", "python"]
  },

  // ─── Python & Machine Learning ───────────────────────────────────────
  {
    id: "python",
    name: "Python",
    category: "Programming Languages",
    icon: <SiPython />,
    description: "Primary language for GenAI pipelines, data engineering, backend APIs, and ML scripting.",
    spoke: 4,
    ring: 3,
    relatedIds: ["rag_pipelines", "fastapi", "machine_learning", "deep_learning", "dsa"]
  },
  {
    id: "machine_learning",
    name: "Machine Learning",
    category: "Generative AI",
    icon: <FaBrain />,
    description: "Supervised & unsupervised learning algorithms, feature engineering, and model validation.",
    spoke: 5,
    ring: 6,
    relatedIds: ["deep_learning", "python", "dsa", "transformers"]
  },
  {
    id: "deep_learning",
    name: "Deep Learning",
    category: "Generative AI",
    icon: <SiPytorch />,
    description: "Neural network architectures, PyTorch, gradient descent, and optimization.",
    spoke: 5,
    ring: 10,
    relatedIds: ["machine_learning", "transformers", "python", "oops"]
  },

  // ─── Backend & APIs ──────────────────────────────────────────────────
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Frontend & Backend",
    icon: <SiFastapi />,
    description: "Asynchronous Python web framework for ultra-fast REST APIs, Pydantic typing, and Swagger docs.",
    spoke: 6,
    ring: 5,
    relatedIds: ["python", "rest_apis", "cors_config", "llm_integration", "docker"]
  },
  {
    id: "rest_apis",
    name: "REST APIs",
    category: "Frontend & Backend",
    icon: <FaServer />,
    description: "RESTful architecture, status codes, JWT authentication, and clean API contract design.",
    spoke: 6,
    ring: 9,
    relatedIds: ["fastapi", "react_vite", "cors_config", "n8n_make"]
  },
  {
    id: "cors_config",
    name: "CORS Configuration",
    category: "Frontend & Backend",
    icon: <FaGlobe />,
    description: "Cross-Origin Resource Sharing security headers, preflight handling, and security origin policies.",
    spoke: 7,
    ring: 13,
    relatedIds: ["fastapi", "rest_apis", "nextjs"]
  },
  {
    id: "n8n_make",
    name: "n8n & Make",
    category: "AI Frameworks & Automation",
    icon: <FaWrench />,
    description: "Workflow automation, webhook orchestration, and serverless AI pipeline triggers.",
    spoke: 7,
    ring: 7,
    relatedIds: ["rest_apis", "prompt_engineering", "git"]
  },

  // ─── JavaScript & Frontend Frameworks ────────────────────────────────
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming Languages",
    icon: <SiJavascript />,
    description: "Modern ES6+ asynchronous web development, DOM APIs, and client-side web application logic.",
    spoke: 8,
    ring: 3,
    relatedIds: ["react_vite", "nextjs", "html_css", "rest_apis"]
  },
  {
    id: "react_vite",
    name: "React.js (Vite)",
    category: "Frontend & Backend",
    icon: <SiReact />,
    description: "Component-driven single page app architecture, React hooks, state management, and Vite builds.",
    spoke: 8,
    ring: 7,
    relatedIds: ["javascript", "nextjs", "framer_motion", "rest_apis"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend & Backend",
    icon: <SiNextdotjs />,
    description: "React App Router, Server Components, SSR, SSG, API routes, and full-stack web applications.",
    spoke: 9,
    ring: 11,
    relatedIds: ["react_vite", "javascript", "vercel", "fastapi"]
  },
  {
    id: "framer_motion",
    name: "Framer Motion",
    category: "Frontend & Backend",
    icon: <FaCubes />,
    description: "Fluid UI micro-interactions, layout transitions, and interactive web motion graphics.",
    spoke: 9,
    ring: 5,
    relatedIds: ["react_vite", "nextjs", "html_css"]
  },
  {
    id: "html_css",
    name: "HTML & CSS",
    category: "Programming Languages",
    icon: <SiHtml5 />,
    description: "Semantic HTML5, CSS Grid, Flexbox, responsive layouts, and glassmorphism UI design.",
    spoke: 10,
    ring: 8,
    relatedIds: ["javascript", "react_vite", "figma"]
  },
  {
    id: "figma",
    name: "Figma & Wix Studio",
    category: "Web Platforms & Tools",
    icon: <SiFigma />,
    description: "UI/UX wireframing, interactive prototyping, vector graphics, and web layout design.",
    spoke: 10,
    ring: 12,
    relatedIds: ["react_vite", "html_css"]
  },

  // ─── Databases & Graph DB ────────────────────────────────────────────
  {
    id: "neo4j",
    name: "Neo4j (Graph DB)",
    category: "Database & Vector Search",
    icon: <SiNeo4J />,
    description: "Graph database modeling, Cypher queries, and Graph RAG knowledge graphs.",
    spoke: 11,
    ring: 4,
    relatedIds: ["vector_databases", "rag_pipelines", "dbms"]
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database & Vector Search",
    icon: <SiMysql />,
    description: "Relational database management, ACID transactions, and schema normalization.",
    spoke: 11,
    ring: 9,
    relatedIds: ["sql", "dbms", "firebase"]
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Database & Vector Search",
    icon: <SiFirebase />,
    description: "NoSQL Firestore database, real-time sync, Firebase Auth, and serverless hosting.",
    spoke: 12,
    ring: 13,
    relatedIds: ["mysql", "react_vite", "vercel"]
  },

  // ─── Cloud & Deployment ──────────────────────────────────────────────
  {
    id: "aws",
    name: "AWS (EC2, S3, IAM, Connect)",
    category: "Cloud & Deployment",
    icon: <FaAws />,
    description: "Cloud infrastructure provisioning on AWS EC2 servers, S3 storage, IAM roles, and Amazon Connect.",
    spoke: 12,
    ring: 5,
    relatedIds: ["docker", "vercel", "render", "fastapi"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & Deployment",
    icon: <SiDocker />,
    description: "Containerizing applications, Dockerfiles, Docker Compose, and environment isolation.",
    spoke: 13,
    ring: 8,
    relatedIds: ["aws", "fastapi", "render"]
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Cloud & Deployment",
    icon: <SiVercel />,
    description: "Instant CI/CD deployment, serverless functions, custom domains, and Next.js optimization.",
    spoke: 13,
    ring: 11,
    relatedIds: ["nextjs", "react_vite", "aws"]
  },
  {
    id: "render",
    name: "Render",
    category: "Cloud & Deployment",
    icon: <FaCloud />,
    description: "Deploying backend Python APIs, background workers, and FastAPI web microservices.",
    spoke: 14,
    ring: 13,
    relatedIds: ["fastapi", "docker", "aws"]
  },

  // ─── Core CS Foundations ─────────────────────────────────────────────
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "Core CS",
    icon: <FaCode />,
    description: "Arrays, Trees, Graphs, Dynamic Programming, Sorting algorithms, and Big-O complexity analysis.",
    spoke: 14,
    ring: 3,
    relatedIds: ["oops", "dbms", "operating_systems", "python", "java"]
  },
  {
    id: "oops",
    name: "OOPS",
    category: "Core CS",
    icon: <FaCubes />,
    description: "Object-Oriented Programming principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.",
    spoke: 14,
    ring: 6,
    relatedIds: ["dsa", "java", "python"]
  },
  {
    id: "dbms",
    name: "DBMS",
    category: "Core CS",
    icon: <FaDatabase />,
    description: "Database Management Systems, schema normalization, ER models, and transaction concurrency.",
    spoke: 15,
    ring: 4,
    relatedIds: ["sql", "mysql", "dsa"]
  },
  {
    id: "operating_systems",
    name: "Operating Systems",
    category: "Core CS",
    icon: <FaTerminal />,
    description: "Process synchronization, multithreading, memory management, virtual memory, and OS fundamentals.",
    spoke: 15,
    ring: 8,
    relatedIds: ["dsa", "docker", "git"]
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Web Platforms & Tools",
    icon: <SiGit />,
    description: "Version control, branching strategies, pull requests, merge conflict resolution, and GitHub Actions.",
    spoke: 15,
    ring: 11,
    relatedIds: ["operating_systems", "docker", "n8n_make"]
  },
  {
    id: "java",
    name: "JAVA",
    category: "Programming Languages",
    icon: <FaCode />,
    description: "Object-oriented software development, enterprise architectures, and DSA algorithms.",
    spoke: 1,
    ring: 10,
    relatedIds: ["oops", "dsa", "dbms"]
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming Languages",
    icon: <FaDatabase />,
    description: "Relational query optimization, indexing strategies, and transactional database design.",
    spoke: 11,
    ring: 12,
    relatedIds: ["mysql", "dbms", "python"]
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

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

export default function SpidermanWebSkills() {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  const [viewportSize, setViewportSize] = useState({ w: 980, h: 800 });

  const animatedOpacitiesRef = useRef<Record<string, number>>({});
  const animatedLineProgressRef = useRef<Record<string, number>>({});
  const silkDustRef = useRef<SilkParticle[]>([]);

  const updateDimensions = useCallback(() => {
    if (viewportRef.current) {
      const W = viewportRef.current.clientWidth;
      const H = viewportRef.current.clientHeight || 800;
      setViewportSize({ w: W, h: H });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Initialize Background Silk Dust Particles
  useEffect(() => {
    const W = viewportSize.w;
    const H = viewportSize.h;
    const particles: SilkParticle[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.3
      });
    }
    silkDustRef.current = particles;
  }, [viewportSize]);

  // Compute node positions on the 16-spoke x 14-ring spider web
  const nodePositions = useMemo(() => {
    const cx = viewportSize.w / 2;
    const cy = viewportSize.h / 2 - 10;
    const maxRadius = Math.min(cx, cy) * 0.88;

    const map: Record<string, { x: number; y: number }> = {};

    ALL_SKILLS.forEach((skill) => {
      const spokeIdx = skill.spoke % TOTAL_SPOKES;
      const angle = SPOKE_ANGLES[spokeIdx];
      const stretch = SPOKE_STRETCH[spokeIdx];

      const radius = getExponentialRingRadius(skill.ring, maxRadius, spokeIdx) * stretch;

      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;

      map[skill.id] = { x: px, y: py };
    });

    return map;
  }, [viewportSize]);

  const activeSkill = useMemo(() => {
    return ALL_SKILLS.find((s) => s.id === hoveredSkillId) || null;
  }, [hoveredSkillId]);

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

  // Advanced Canvas Render Engine — Elastic Web Physics & Bioluminescent Energy Pulses
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
    let time = 0;

    const cx = W / 2;
    const cy = H / 2 - 10;
    const maxRadius = Math.min(cx, cy) * 0.88;

    const anchorPoints = [
      { x: 30, y: 30 },
      { x: W - 30, y: 30 },
      { x: W - 30, y: H - 30 },
      { x: 30, y: H - 30 },
      { x: W / 2, y: 10 },
      { x: W / 2, y: H - 10 },
      { x: 10, y: H / 2 },
      { x: W - 10, y: H / 2 }
    ];

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, W, H);

      const isHoveredState = hoveredSkillId !== null || activeCategory !== "ALL";

      // 0. Render Background Silk Dust Particles
      const particles = silkDustRef.current;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 119, 6, ${p.alpha * 0.5})`;
        ctx.fill();
      });

      // 1. Draw Outer Anchor Guy-Lines
      anchorPoints.forEach((ap, idx) => {
        const spokeAngle = SPOKE_ANGLES[(idx * 2) % TOTAL_SPOKES];
        const stretch = SPOKE_STRETCH[(idx * 2) % TOTAL_SPOKES];
        const endX = cx + Math.cos(spokeAngle) * maxRadius * stretch;
        const endY = cy + Math.sin(spokeAngle) * maxRadius * stretch;

        // Interactive Tug Deflection
        const mdx = (ap.x + endX) / 2 - mousePosRef.current.x;
        const mdy = (ap.y + endY) / 2 - mousePosRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const tug = mdist < 100 ? (100 - mdist) * 0.12 : 0;
        const tugX = mdist > 0 ? (mdx / mdist) * tug : 0;
        const tugY = mdist > 0 ? (mdy / mdist) * tug : 0;

        ctx.beginPath();
        ctx.moveTo(ap.x, ap.y);
        ctx.quadraticCurveTo((ap.x + endX) / 2 + tugX, (ap.y + endY) / 2 + tugY, endX, endY);
        ctx.lineWidth = 0.85;
        ctx.strokeStyle = "rgba(180, 185, 200, 0.18)";
        ctx.stroke();
      });

      // 2. Draw 16 Curved Elastic Radial Spokes
      for (let s = 0; s < TOTAL_SPOKES; s++) {
        const angle = SPOKE_ANGLES[s];
        const stretch = SPOKE_STRETCH[s];
        const endX = cx + Math.cos(angle) * maxRadius * stretch;
        const endY = cy + Math.sin(angle) * maxRadius * stretch;

        // Interactive Mouse Tug Physics
        const midPointX = (cx + endX) / 2;
        const midPointY = (cy + endY) / 2;
        const mdx = midPointX - mousePosRef.current.x;
        const mdy = midPointY - mousePosRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const tug = mdist < 120 ? (120 - mdist) * 0.18 : 0;
        const tugX = mdist > 0 ? (mdx / mdist) * tug : 0;
        const tugY = mdist > 0 ? (mdy / mdist) * tug : 0;

        const bowing = Math.sin(s * 1.5) * 10;
        const midX = midPointX + Math.sin(angle) * bowing + tugX;
        const midY = midPointY - Math.cos(angle) * bowing + tugY;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(midX, midY, endX, endY);

        ctx.lineWidth = 1;
        ctx.strokeStyle = isHoveredState ? "rgba(160, 165, 180, 0.12)" : "rgba(200, 205, 220, 0.32)";
        ctx.stroke();
      }

      // 3. Draw 14 Exponential Catenary Web Rings with Elastic Tension
      for (let r = 1; r <= TOTAL_RINGS; r++) {
        const breath = Math.sin(time * 1.5 + r) * 0.9;

        ctx.beginPath();
        for (let s = 0; s < TOTAL_SPOKES; s++) {
          const a1 = SPOKE_ANGLES[s];
          const a2 = SPOKE_ANGLES[(s + 1) % TOTAL_SPOKES];
          const st1 = SPOKE_STRETCH[s];
          const st2 = SPOKE_STRETCH[(s + 1) % TOTAL_SPOKES];

          const radius1 = getExponentialRingRadius(r, maxRadius, s) * st1 + breath;
          const radius2 = getExponentialRingRadius(r, maxRadius, (s + 1) % TOTAL_SPOKES) * st2 + breath;

          const x1 = cx + Math.cos(a1) * radius1;
          const y1 = cy + Math.sin(a1) * radius1;
          const x2 = cx + Math.cos(a2) * radius2;
          const y2 = cy + Math.sin(a2) * radius2;

          const midA = (a1 + a2) / 2;
          const sagRatio = 0.93 - (r * 0.005);
          const midR = ((radius1 + radius2) / 2) * sagRatio;

          // Mouse Tug Deflection on Web Ring Segments
          const baseMidX = cx + Math.cos(midA) * midR;
          const baseMidY = cy + Math.sin(midA) * midR;
          const mdx = baseMidX - mousePosRef.current.x;
          const mdy = baseMidY - mousePosRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const tug = mdist < 100 ? (100 - mdist) * 0.14 : 0;
          const tugX = mdist > 0 ? (mdx / mdist) * tug : 0;
          const tugY = mdist > 0 ? (mdy / mdist) * tug : 0;

          const midX = baseMidX + tugX;
          const midY = baseMidY + tugY;

          if (s === 0) ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(midX, midY, x2, y2);
        }

        ctx.lineWidth = r <= 3 ? 1.25 : 0.95;
        ctx.strokeStyle = isHoveredState ? "rgba(150, 155, 170, 0.1)" : "rgba(190, 195, 210, 0.28)";
        ctx.stroke();
      }

      // 4. Smooth Lerp & Energy Pulses Along Connected Strands (Bioluminescent Amber Gold Silk)
      ALL_SKILLS.forEach((skill) => {
        const p1 = nodePositions[skill.id];
        if (!p1) return;

        const isSkillLit = activeSet.has(skill.id);

        skill.relatedIds.forEach((rid) => {
          const p2 = nodePositions[rid];
          if (!p2) return;

          const isRelLit = activeSet.has(rid);
          const edgeKey = [skill.id, rid].sort().join("--");
          const currentProgress = animatedLineProgressRef.current[edgeKey] || 0;

          const targetProgress = (isHoveredState && isSkillLit && isRelLit) ? 1.0 : 0.0;
          const nextProgress = lerp(currentProgress, targetProgress, 0.12);
          animatedLineProgressRef.current[edgeKey] = nextProgress;

          if (nextProgress > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const isHoveredNode = skill.id === hoveredSkillId || rid === hoveredSkillId;
            ctx.lineWidth = 1.2 + nextProgress * (isHoveredNode ? 1.4 : 0.7);

            const alpha = nextProgress * (isHoveredNode ? 0.95 : 0.7);
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.shadowColor = "#f59e0b";
            ctx.shadowBlur = nextProgress * (isHoveredNode ? 12 : 6);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Shooting Bioluminescent Energy Pulse Particle along Active Web Strand
            if (isHoveredNode && nextProgress > 0.5) {
              const pulsePos = (time * 1.5) % 1;
              const px = lerp(p1.x, p2.x, pulsePos);
              const py = lerp(p1.y, p2.y, pulsePos);

              ctx.beginPath();
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fillStyle = "#ffffff";
              ctx.shadowColor = "#f59e0b";
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      // 5. Smooth Interpolation for Web Intersection Knot Dots
      ALL_SKILLS.forEach((skill) => {
        const pos = nodePositions[skill.id];
        if (!pos) return;

        const isLit = activeSet.has(skill.id);
        const isActive = skill.id === hoveredSkillId;

        const key = skill.id;
        const currentProgress = animatedOpacitiesRef.current[key] || 0;
        const targetProgress = isActive ? 1.0 : isLit ? 0.6 : 0.0;
        const nextProgress = lerp(currentProgress, targetProgress, 0.15);
        animatedOpacitiesRef.current[key] = nextProgress;

        const r = 2.5 + nextProgress * 2.5;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);

        if (nextProgress > 0.1) {
          ctx.fillStyle = `rgba(245, 158, 11, ${0.4 + nextProgress * 0.6})`;
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = nextProgress * 12;
        } else {
          ctx.fillStyle = "rgba(210, 215, 230, 0.5)";
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

      {/* Top Header & Category Filter Controls */}
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

        {/* Center Spider Core Node with Radar Senses Aura */}
        <div
          className="center-spider-hub"
          onClick={() => {
            setHoveredSkillId(null);
            setActiveCategory("ALL");
          }}
          title="Spider Hub — Reset View"
        >
          <FaSpider size={28} />
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

        {/* Floating Detail Card (Bottom Overlay with Clickable Navigation) */}
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
              <span className="related-tag-label">
                <GiSparkles size={11} style={{ display: 'inline', marginRight: 4, color: '#f59e0b' }} />
                {activeSkill.relatedIds.length} Connected Nodes (Click to Jump):
              </span>
              {activeSkill.relatedIds.map((rid) => {
                const relNode = ALL_SKILLS.find((s) => s.id === rid);
                return relNode ? (
                  <span
                    key={rid}
                    className="related-tag-pill clickable-pill"
                    onClick={() => setHoveredSkillId(rid)}
                    title={`Jump to ${relNode.name}`}
                  >
                    {relNode.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <div className="spider-web-hint">
            <GiSpiderWeb size={16} color="#d97706" />
            <span>Hover over any web node or category to activate skill sensors</span>
          </div>
        )}
      </div>
    </div>
  );
}
