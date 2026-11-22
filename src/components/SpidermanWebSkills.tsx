"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./SpidermanWebSkills.css";
import {
  SPOKES,
  buildWeb,
  stepWeb,
  pluck,
  nearestPoint,
  shortestPaths,
  tracePath,
  renderSilk,
  renderDew,
  renderPath,
  renderBead,
  Spider,
  type WebModel,
  type Brush,
} from "./spiderweb/engine";
import { WebIntro, T as INTRO, type OrbPos } from "./spiderweb/intro";
import { HairlineOverlay, type HairlineOverlayHandle } from "./spiderweb/HairlineOverlay";
import { ThinkingOrb } from "thinking-orbs";

import {
  FaBrain,
  FaDatabase,
  FaCloud,
  FaCode,
  FaTerminal,
  FaCubes,
  FaNetworkWired,
  FaServer,
  FaMicrochip,
  FaGlobe,
  FaWrench,
  FaRobot,
  FaLayerGroup,
  FaAws,
} from "react-icons/fa6";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiDocker,
  SiVercel,
  SiMysql,
  SiFirebase,
  SiNeo4J,
  SiGit,
  SiFigma,
  SiHtml5,
  SiPytorch,
  SiOpenai,
} from "react-icons/si";
import { GiSpiderWeb } from "react-icons/gi";
import { FiRotateCcw } from "react-icons/fi";

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  spoke: number; // 0 to 15
  ring: number; // 3 to 14 (1–2 are the hub)
  relatedIds: string[];
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
  "AI Frameworks & Automation",
  "Web Platforms & Tools",
];

const SKILL_BY_ID: Record<string, SkillNode> = Object.fromEntries(ALL_SKILLS.map((s) => [s.id, s]));

const CATEGORY_COUNTS: Record<string, number> = ALL_SKILLS.reduce<Record<string, number>>((acc, s) => {
  acc[s.category] = (acc[s.category] ?? 0) + 1;
  return acc;
}, {});

interface LitPath {
  path: number[];
  born: number;
  alpha: number;
  dying: boolean;
  phase: number;
}

interface Engine {
  model: WebModel | null;
  spider: Spider | null;
  brush: Brush;
  lightX: number;
  W: number;
  H: number;
  /** intro state, shared with pointer handlers */
  introDone: boolean;
  startRequested: boolean;
  replayRequested: boolean;
}

const bottomReserveFor = (w: number) => (w < 640 ? 150 : 128);

/** Centre a thinking-orb wrapper on a canvas point (or hide it). */
function placeOrb(el: HTMLDivElement | null, pos: OrbPos | null, size: number) {
  if (!el) return;
  if (!pos || pos.a <= 0.01) {
    el.style.opacity = "0";
    return;
  }
  el.style.opacity = pos.a.toFixed(3);
  el.style.transform = `translate3d(${(pos.x - size / 2).toFixed(1)}px, ${(pos.y - size / 2).toFixed(1)}px, 0)`;
}

export default function SpidermanWebSkills() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [introDone, setIntroDone] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const [vpSize, setVpSize] = useState({ w: 0, h: 0 });

  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HairlineOverlayHandle>(null);
  const shotOrbRef = useRef<HTMLDivElement>(null);
  const hubOrbRef = useRef<HTMLDivElement>(null);
  const spiralOrbRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLButtonElement>(null);
  const labelRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const engineRef = useRef<Engine>({
    model: null,
    spider: null,
    brush: { x: 0, y: 0, vx: 0, vy: 0, on: false },
    lightX: 0.5,
    W: 0,
    H: 0,
    introDone: false,
    startRequested: false,
    replayRequested: false,
  });

  const activeSet = useMemo(() => {
    const set = new Set<string>();
    if (hoveredId) {
      set.add(hoveredId);
      SKILL_BY_ID[hoveredId]?.relatedIds.forEach((rid) => SKILL_BY_ID[rid] && set.add(rid));
      ALL_SKILLS.forEach((other) => {
        if (other.relatedIds.includes(hoveredId)) set.add(other.id);
      });
    } else if (activeCategory !== "ALL") {
      ALL_SKILLS.forEach((s) => s.category === activeCategory && set.add(s.id));
    }
    return set;
  }, [hoveredId, activeCategory]);

  const selRef = useRef({ hovered: hoveredId, category: activeCategory, activeSet });
  useEffect(() => {
    selRef.current = { hovered: hoveredId, category: activeCategory, activeSet };
  }, [hoveredId, activeCategory, activeSet]);

  const activeSkill = hoveredId ? SKILL_BY_ID[hoveredId] ?? null : null;
  const focus = hoveredId !== null || activeCategory !== "ALL";

  /* ─── Render loop ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    const topCanvas = topCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const topCtx = topCanvas?.getContext("2d");
    if (!viewport || !canvas || !ctx || !topCanvas || !topCtx) return;

    const eng = engineRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const labelSize: Record<string, { w: number; h: number }> = {};
    const labelPos: Record<string, { x: number; y: number; shown: boolean }> = {};
    const beadLevel = new Float32Array(ALL_SKILLS.length).fill(1);
    let paths: LitPath[] = [];
    let pathKey = "";
    let dimMul = 1;
    let raf = 0;
    let visible = true;
    let needsResize = true;
    let last = performance.now();
    let t = 0;
    let dpr = 1;
    let intro: WebIntro | null = null;
    let introStart: number | null = null;

    const finishIntro = () => {
      eng.introDone = true;
      introStart = null;
      eng.model?.reveal.fill(1);
      eng.spider?.land();
      setIntroDone(true);
      setIntroPlaying(false);
      overlayRef.current?.set(null);
    };
    if (reduceMotion) finishIntro();

    const nodeIndex = (s: SkillNode) => eng.model!.grid[s.spoke % SPOKES][s.ring];

    const measure = () => {
      ALL_SKILLS.forEach((s) => {
        const el = labelRefs.current[s.id];
        if (el) labelSize[s.id] = { w: el.offsetWidth, h: el.offsetHeight };
      });
    };

    const resize = () => {
      const rect = viewport.getBoundingClientRect();
      const W = Math.max(1, Math.round(rect.width));
      const H = Math.max(1, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = topCanvas.width = Math.round(W * dpr);
      canvas.height = topCanvas.height = Math.round(H * dpr);
      eng.W = W;
      eng.H = H;
      setVpSize({ w: W, h: H });
      eng.model = buildWeb(W, H, bottomReserveFor(W));
      const hub = eng.model.points[eng.model.hub];
      eng.spider = new Spider(hub.x, hub.y, eng.model.scale);
      intro = new WebIntro(eng.model);
      eng.model.reveal.fill(eng.introDone ? 1 : 0);
      paths = [];
      pathKey = "";
      measure();
    };

    const ro = new ResizeObserver(() => {
      needsResize = true;
    });
    ro.observe(viewport);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        // play the web-shooter intro once the web is properly in view
        if (entry.intersectionRatio >= 0.35 && !eng.introDone && introStart === null) eng.startRequested = true;
      },
      { threshold: [0, 0.35] }
    );
    io.observe(viewport);
    document.fonts?.ready.then(measure).catch(() => {});

    const syncPaths = () => {
      const m = eng.model!;
      const { hovered, category, activeSet: lit } = selRef.current;
      const key = hovered ? `h:${hovered}` : category !== "ALL" ? `c:${category}` : "";
      if (key === pathKey) return;
      pathKey = key;
      paths.forEach((p) => (p.dying = true));
      if (!key) return;

      let src: number;
      let targets: SkillNode[];
      if (hovered) {
        src = nodeIndex(SKILL_BY_ID[hovered]);
        targets = ALL_SKILLS.filter((s) => s.id !== hovered && lit.has(s.id));
        // a little tremor at the touched knot
        const a = Math.random() * Math.PI * 2;
        pluck(m, src, Math.cos(a), Math.sin(a), 2.2 * m.scale);
      } else {
        src = m.hub;
        targets = ALL_SKILLS.filter((s) => s.category === category);
      }
      const prev = shortestPaths(m, src);
      targets.forEach((s, i) => {
        const path = tracePath(prev, src, nodeIndex(s));
        if (path.length > 1) paths.push({ path, born: t, alpha: 0, dying: false, phase: i * 0.137 });
      });
    };

    const layoutLabels = () => {
      const m = eng.model!;
      const { hovered, category, activeSet: lit } = selRef.current;
      const isFocus = hovered !== null || category !== "ALL";
      const hub = m.points[m.hub];
      const W = eng.W;
      const maxY = eng.H - 10;
      const gap = 11 * Math.max(0.8, m.scale);

      const items = ALL_SKILLS.map((s) => {
        const p = m.points[nodeIndex(s)];
        const size = labelSize[s.id] ?? { w: 120, h: 26 };
        const side = p.x >= hub.x ? 1 : -1;
        let x = side > 0 ? p.x + gap : p.x - gap - size.w;
        x = Math.max(8, Math.min(W - size.w - 8, x));
        const y = p.y - size.h / 2;
        return { s, p, x, y, w: size.w, h: size.h, shown: isFocus && lit.has(s.id) };
      });

      // Resolve overlaps between visible labels by nudging them apart vertically.
      const shown = items.filter((it) => it.shown);
      for (let iter = 0; iter < 10; iter++) {
        let moved = false;
        for (let i = 0; i < shown.length; i++) {
          for (let j = i + 1; j < shown.length; j++) {
            const a = shown[i];
            const b = shown[j];
            const pad = 4;
            const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + pad;
            const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + pad;
            if (ox > 0 && oy > 0) {
              const push = oy / 2;
              if (a.p.y <= b.p.y) {
                a.y -= push;
                b.y += push;
              } else {
                a.y += push;
                b.y -= push;
              }
              moved = true;
            }
          }
        }
        shown.forEach((it) => (it.y = Math.max(8, Math.min(maxY - it.h, it.y))));
        if (!moved) break;
      }

      // Leader lines for labels that were displaced from their knot.
      ctx.save();
      ctx.lineWidth = 0.8;
      items.forEach((it) => {
        const prev = labelPos[it.s.id];
        const pos = prev && prev.shown && it.shown ? prev : { x: it.x, y: it.y, shown: it.shown };
        pos.x += (it.x - pos.x) * 0.35;
        pos.y += (it.y - pos.y) * 0.35;
        pos.shown = it.shown;
        labelPos[it.s.id] = pos;

        const el = labelRefs.current[it.s.id];
        if (el) el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;

        if (it.shown) {
          const cy = pos.y + it.h / 2;
          const ex = pos.x + it.w / 2 < it.p.x ? pos.x + it.w : pos.x;
          if (Math.abs(cy - it.p.y) > 5 || Math.abs(ex - it.p.x) > gap + 4) {
            ctx.beginPath();
            ctx.moveTo(it.p.x, it.p.y);
            ctx.lineTo(ex, cy);
            ctx.strokeStyle = "rgba(245,190,120,0.35)";
            ctx.stroke();
          }
        }
      });
      ctx.restore();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (needsResize) {
        needsResize = false;
        resize();
      }
      const m = eng.model;
      if (!visible || !m || !eng.spider || !intro) {
        last = now;
        return;
      }

      if (eng.replayRequested) {
        eng.replayRequested = false;
        eng.introDone = false;
        const hub0 = m.points[m.hub];
        eng.spider = new Spider(hub0.x, hub0.y, m.scale);
        intro = new WebIntro(m);
        m.reveal.fill(0);
        eng.startRequested = true;
      }
      if (eng.startRequested) {
        eng.startRequested = false;
        introStart = now;
        setIntroPlaying(true);
      }
      const it = introStart === null ? (eng.introDone ? Infinity : -1) : now - introStart;
      if (!eng.introDone) {
        if (it >= INTRO.TOTAL) finishIntro();
        else if (it >= 0) intro.apply(it);
      }
      const inIntro = !eng.introDone;
      const sp = eng.spider;

      const elapsed = Math.min(64, now - last);
      last = now;
      const steps = Math.max(1, Math.min(3, Math.round(elapsed / 16.67)));
      for (let i = 0; i < steps; i++) {
        t += 1 / 60;
        stepWeb(m, t, reduceMotion ? 0 : 1, eng.brush);
      }
      eng.brush.vx *= 0.55;
      eng.brush.vy *= 0.55;

      const { hovered, category, activeSet: lit } = selRef.current;
      const isFocus = hovered !== null || category !== "ALL";
      dimMul += ((isFocus ? 0.55 : 1) - dimMul) * 0.08;
      const light = -0.8 + (eng.lightX - 0.5) * 1.2 + (reduceMotion ? 0 : Math.sin(t * 0.12) * 0.28);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, eng.W, eng.H);

      renderSilk(ctx, m, light, dimMul);
      renderDew(ctx, m, light, dimMul);

      if (!inIntro) syncPaths();
      paths = paths.filter((p) => !(p.dying && p.alpha < 0.01));
      paths.forEach((p) => {
        p.alpha += ((p.dying ? 0 : 1) - p.alpha) * (p.dying ? 0.15 : 0.12);
        const reveal = p.dying ? 1 : Math.min(1, (t - p.born) * 2.2);
        renderPath(ctx, m, p.path, reveal, p.alpha, t, p.phase);
      });

      if (!inIntro) layoutLabels();

      ALL_SKILLS.forEach((s, i) => {
        const target = s.id === hovered ? 3 : lit.has(s.id) ? 2 : isFocus ? 0.4 : 1;
        beadLevel[i] += (target - beadLevel[i]) * 0.14;
        const idx = nodeIndex(s);
        const p = m.points[idx];
        const pop = inIntro ? (it < 0 ? 0 : intro!.beadPop(idx, it)) : 1;
        if (pop <= 0) return;
        if (pop === 1) {
          renderBead(ctx, p.x, p.y, beadLevel[i], t, i, m.scale);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.scale(pop, pop);
          renderBead(ctx, 0, 0, beadLevel[i], t, i, m.scale);
          ctx.restore();
        }
      });

      // Top layer: the spider walks above the skill labels; the intro's
      // hand, strand and thinking orbs are drawn here too.
      topCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      topCtx.clearRect(0, 0, eng.W, eng.H);
      if (inIntro && it >= 0) {
        intro.draw(topCtx, it, t);
        overlayRef.current?.set(intro.overlay(it, ALL_SKILLS.length));
        const o = intro.orbs(it);
        placeOrb(shotOrbRef.current, o.shot, 32);
        placeOrb(hubOrbRef.current, o.hub, 64);
        placeOrb(spiralOrbRef.current, o.spiral, 20);
      }

      if (!inIntro || it >= INTRO.DROP) {
        if (inIntro) {
          const hubP = m.points[m.hub];
          if (it < INTRO.DROP_END) sp.setDrop(hubP.x, intro.dropY(it));
          else sp.land();
        }
        const faceTo = hovered ? m.points[nodeIndex(SKILL_BY_ID[hovered])] : null;
        sp.update(m, now, faceTo, reduceMotion);
        sp.draw(topCtx, m);
      }

      const hub = m.points[m.hub];
      if (hubRef.current) {
        hubRef.current.style.transform = `translate3d(${(hub.x - 22).toFixed(1)}px, ${(hub.y - 22).toFixed(1)}px, 0)`;
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /* ─── Pointer interaction ─────────────────────────────────────────────── */
  const localPoint = (e: React.PointerEvent) => {
    const r = viewportRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const isUiTarget = (target: EventTarget) =>
    target instanceof Element && !!target.closest(".sw-card, .sw-label, .sw-hub, .sw-replay");

  const findSkillNear = useCallback((x: number, y: number, radius: number) => {
    const m = engineRef.current.model;
    if (!m) return null;
    let best: string | null = null;
    let bestD = radius * radius;
    ALL_SKILLS.forEach((s) => {
      const p = m.points[m.grid[s.spoke % SPOKES][s.ring]];
      const d = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = s.id;
      }
    });
    return best;
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const eng = engineRef.current;
    if (!eng.introDone) return;
    const { x, y } = localPoint(e);
    const b = eng.brush;
    if (b.on) {
      b.vx = Math.max(-24, Math.min(24, x - b.x));
      b.vy = Math.max(-24, Math.min(24, y - b.y));
    }
    b.x = x;
    b.y = y;
    b.on = e.pointerType === "mouse";
    eng.lightX = eng.W ? x / eng.W : 0.5;

    if (e.pointerType === "mouse" && !isUiTarget(e.target)) {
      const near = findSkillNear(x, y, 22);
      if (viewportRef.current) viewportRef.current.style.cursor = near ? "pointer" : "";
      if (near && near !== selRef.current.hovered) setHoveredId(near);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const eng = engineRef.current;
    eng.brush.on = false;
    eng.lightX = 0.5;
    if (e.pointerType === "mouse") setHoveredId(null);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isUiTarget(e.target)) return;
    const eng = engineRef.current;
    const m = eng.model;
    if (!m || !eng.introDone) return;
    const { x, y } = localPoint(e);
    const near = findSkillNear(x, y, e.pointerType === "mouse" ? 22 : 30);
    if (near) {
      setHoveredId(near);
      return;
    }
    const idx = nearestPoint(m, x, y, 40 * Math.max(0.8, m.scale));
    if (idx >= 0 && idx !== m.hub) {
      const p = m.points[idx];
      const hub = m.points[m.hub];
      const a = Math.atan2(p.y - hub.y, p.x - hub.x) + Math.PI / 2;
      pluck(m, idx, Math.cos(a), Math.sin(a), 9 * m.scale);
      eng.spider?.hunt(idx);
    } else if (e.pointerType !== "mouse") {
      setHoveredId(null);
    }
  };

  const resetView = () => {
    setHoveredId(null);
    setActiveCategory("ALL");
  };

  const replayIntro = () => {
    resetView();
    setIntroDone(false);
    engineRef.current.replayRequested = true;
  };

  return (
    <div className="sw-section">
      <div className="sw-bg" aria-hidden />

      <header className="sw-header">
        <div className="sw-title-wrap">
          <span className="sw-eyebrow">
            <GiSpiderWeb aria-hidden /> Skill Web
          </span>
          <h3 className="sw-title">Everything I build with, woven together.</h3>
          <p className="sw-sub">
            Hover a glowing knot to trace its connections through the silk. Click a thread to pluck it.
          </p>
        </div>
        <dl className="sw-stats">
          <div>
            <dt>Skills</dt>
            <dd>{ALL_SKILLS.length}</dd>
          </div>
          <div>
            <dt>Domains</dt>
            <dd>{CATEGORIES.length - 1}</dd>
          </div>
        </dl>
      </header>

      <nav className="sw-filters" aria-label="Filter skills by domain">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`sw-filter ${isActive ? "is-active" : ""}`}
              aria-pressed={isActive}
              onClick={() => {
                setHoveredId(null);
                setActiveCategory(isActive && cat !== "ALL" ? "ALL" : cat);
              }}
            >
              {cat === "ALL" ? "All skills" : cat}
              <span className="sw-filter-count">{cat === "ALL" ? ALL_SKILLS.length : CATEGORY_COUNTS[cat] ?? 0}</span>
            </button>
          );
        })}
      </nav>

      <div
        ref={viewportRef}
        className="sw-viewport"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <canvas ref={canvasRef} className="sw-canvas" aria-hidden />
        <canvas ref={topCanvasRef} className="sw-canvas sw-canvas-top" aria-hidden />

        <HairlineOverlay ref={overlayRef} width={vpSize.w} height={vpSize.h} />

        {introPlaying && (
          <div className="sw-orbs" aria-hidden>
            <div ref={shotOrbRef} className="sw-orb">
              <ThinkingOrb state="weaving" size={32} theme="dark" speed={1.4} />
            </div>
            <div ref={hubOrbRef} className="sw-orb">
              <ThinkingOrb state="connecting" size={64} theme="dark" speed={1.2} />
            </div>
            <div ref={spiralOrbRef} className="sw-orb">
              <ThinkingOrb state="weaving" size={20} theme="dark" speed={1.6} />
            </div>
          </div>
        )}

        {introPlaying && (
          <p className="sw-caption" role="status">
            <span className="sw-caption-sfx">Thwip!</span> Spider-Man is spinning every skill into one web
          </p>
        )}

        <button
          type="button"
          className={`sw-replay${introDone ? " is-ready" : ""}`}
          onClick={replayIntro}
          aria-label="Replay the web-shooter animation"
          tabIndex={introDone ? 0 : -1}
        >
          <FiRotateCcw aria-hidden /> Replay
        </button>

        <button ref={hubRef} type="button" className="sw-hub" onClick={resetView} aria-label="Reset skill web" title="Reset view" />

        <div className="sw-labels">
          {ALL_SKILLS.map((skill) => {
            const isActive = skill.id === hoveredId;
            const lit = focus && activeSet.has(skill.id);
            return (
              <button
                key={skill.id}
                ref={(el) => {
                  labelRefs.current[skill.id] = el;
                }}
                type="button"
                className={`sw-label${lit ? " is-visible" : ""}${isActive ? " is-active" : lit ? " is-related" : ""}`}
                onMouseEnter={() => setHoveredId(skill.id)}
                onFocus={() => setHoveredId(skill.id)}
                onClick={() => setHoveredId(skill.id)}
                aria-label={`${skill.name}, ${skill.category}`}
              >
                <span className="sw-label-icon" aria-hidden>
                  {skill.icon}
                </span>
                <span>{skill.name}</span>
              </button>
            );
          })}
        </div>

        {activeSkill ? (
          <div className="sw-card" key={activeSkill.id} role="status">
            <div className="sw-card-head">
              <div className="sw-card-icon" aria-hidden>
                {activeSkill.icon}
              </div>
              <div className="sw-card-heading">
                <span className="sw-card-cat">{activeSkill.category}</span>
                <h4 className="sw-card-name">{activeSkill.name}</h4>
              </div>
            </div>
            <p className="sw-card-desc">{activeSkill.description}</p>
            <div className="sw-card-links">
              <span className="sw-card-links-label">Connected</span>
              {activeSkill.relatedIds
                .filter((rid) => SKILL_BY_ID[rid])
                .map((rid) => (
                  <button key={rid} type="button" className="sw-chip" onClick={() => setHoveredId(rid)}>
                    {SKILL_BY_ID[rid].name}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div className={`sw-hint${introDone ? " is-ready" : ""}`}>
            <span className="sw-hint-dot" aria-hidden />
            {activeCategory === "ALL"
              ? "Hover a glowing knot · click the silk to pluck it"
              : `${CATEGORY_COUNTS[activeCategory] ?? 0} skills in ${activeCategory} · hover one to see its links`}
          </div>
        )}
      </div>
    </div>
  );
}
