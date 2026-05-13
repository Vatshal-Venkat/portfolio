"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Skill Category → Shape Definitions ───────────────────────────────────────

export type SkillShape =
  | "neuralnet"
  | "hexgrid"
  | "dnahelix"
  | "cube3d"
  | "cloudorb"
  | "database"
  | "gitgraph"
  | "circuitboard";

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  r: number;
  g: number;
  b: number;
}

// ─── Parse a #RRGGBB hex color to [r, g, b] ─────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  // Strip alpha if 8-char hex
  const clean = hex.replace("#", "").slice(0, 6);
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// ─── Generate target positions for each shape ─────────────────────────────────

function generateTargets(
  shape: SkillShape,
  cx: number,
  cy: number,
  count: number
): { x: number; y: number; r: number; g: number; b: number }[] {
  type Target = { x: number; y: number; r: number; g: number; b: number };
  const points: Target[] = [];

  const pt = (x: number, y: number, hex: string): Target => {
    const [r, g, b] = hexToRgb(hex);
    return { x, y, r, g, b };
  };

  switch (shape) {
    // Neural Network — GenAI
    case "neuralnet": {
      const layers = [3, 5, 5, 3];
      const layerSpacing = 130;
      const totalWidth = (layers.length - 1) * layerSpacing;
      const colors = ["#00f5ff", "#5B9DFF", "#a78bfa"];
      layers.forEach((nodes, li) => {
        const lx = cx - totalWidth / 2 + li * layerSpacing;
        for (let ni = 0; ni < nodes; ni++) {
          const ly = cy - ((nodes - 1) * 50) / 2 + ni * 50;
          points.push(pt(lx, ly, colors[li % colors.length]));
        }
      });
      while (points.length < count) {
        const angle = Math.random() * Math.PI * 2;
        const r = 160 + Math.random() * 60;
        points.push(pt(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, "#1a3a6e"));
      }
      break;
    }

    // Hexagonal Grid — Frontend/Backend
    case "hexgrid": {
      const hexR = 32;
      const cols = 7;
      const rows = 6;
      const w = hexR * Math.sqrt(3);
      const h = hexR * 1.5;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (points.length >= count) break;
          const hx = cx - (cols * w) / 2 + col * w + (row % 2 === 0 ? 0 : w / 2);
          const hy = cy - (rows * h) / 2 + row * h + hexR;
          for (let v = 0; v < 6; v++) {
            if (points.length >= count) break;
            const angle = (Math.PI / 3) * v - Math.PI / 6;
            points.push(pt(
              hx + hexR * 0.85 * Math.cos(angle),
              hy + hexR * 0.85 * Math.sin(angle),
              v % 2 === 0 ? "#a78bfa" : "#7c3aed"
            ));
          }
        }
      }
      while (points.length < count) {
        const a = Math.random() * Math.PI * 2;
        const r = 180 + Math.random() * 50;
        points.push(pt(cx + Math.cos(a) * r, cy + Math.sin(a) * r, "#2d1f5e"));
      }
      break;
    }

    // DNA Helix — Programming
    case "dnahelix": {
      const helixHeight = 340;
      const helixRadius = 80;
      const turns = 3;
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * turns * Math.PI * 2;
        const y = cy - helixHeight / 2 + t * helixHeight;
        const strand = i % 2 === 0;
        points.push(pt(
          cx + (strand ? 1 : -1) * helixRadius * Math.cos(angle),
          y,
          strand ? "#10b981" : "#34d399"
        ));
      }
      break;
    }

    // Wireframe Cube — Core CS
    case "cube3d": {
      const size = 110;
      const depth = 55;
      const vertices: [number, number][] = [
        [-size, -size], [size, -size], [size, size], [-size, size],
        [-size + depth, -size - depth], [size + depth, -size - depth],
        [size + depth, size - depth], [-size + depth, size - depth],
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      const perEdge = Math.ceil(count / edges.length);
      edges.forEach(([a, b]) => {
        for (let i = 0; i <= perEdge; i++) {
          if (points.length >= count) break;
          const t = i / perEdge;
          const vA = vertices[a], vB = vertices[b];
          points.push(pt(
            cx + vA[0] + (vB[0] - vA[0]) * t,
            cy + vA[1] + (vB[1] - vA[1]) * t,
            i % 3 === 0 ? "#f59e0b" : "#fbbf24"
          ));
        }
      });
      break;
    }

    // Cloud Orb — Cloud & Deployment
    case "cloudorb": {
      const ringDefs = [
        { r: 140, n: Math.floor(count * 0.4), color: "#38bdf8" },
        { r: 100, n: Math.floor(count * 0.35), color: "#0ea5e9" },
        { r: 70, n: Math.floor(count * 0.25), color: "#7dd3fc" },
      ];
      ringDefs.forEach(({ r, n, color }, ri) => {
        const tilt = ri === 0 ? 0.3 : ri === 1 ? -0.4 : 0.6;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          points.push(pt(cx + r * Math.cos(a), cy + r * Math.sin(a) * Math.cos(tilt), color));
        }
      });
      break;
    }

    // Cylinder stack — Database
    case "database": {
      const rings = 5;
      const cylR = 100;
      const cylH = 60;
      const perRing = Math.floor(count / rings);
      for (let ri = 0; ri < rings; ri++) {
        const ry = cy - (rings * cylH) / 2 + ri * cylH;
        for (let pi = 0; pi < perRing; pi++) {
          if (points.length >= count) break;
          const a = (pi / perRing) * Math.PI * 2;
          points.push(pt(
            cx + cylR * Math.cos(a),
            ry + cylR * 0.35 * Math.sin(a),
            ri % 2 === 0 ? "#f97316" : "#fb923c"
          ));
        }
      }
      break;
    }

    // Git Graph — Web Tools
    case "gitgraph": {
      const branchColors = ["#e879f9", "#c026d3", "#a21caf", "#d946ef"];
      const branches = [
        { x: cx, yStart: cy - 160, yEnd: cy + 160, commits: 6 },
        { x: cx + 80, yStart: cy - 60, yEnd: cy + 100, commits: 4 },
        { x: cx - 80, yStart: cy - 100, yEnd: cy + 60, commits: 3 },
      ];
      branches.forEach((b, bi) => {
        const stepY = (b.yEnd - b.yStart) / (b.commits - 1);
        for (let ci = 0; ci < b.commits; ci++) {
          const y = b.yStart + ci * stepY;
          points.push(pt(b.x, y, branchColors[bi]));
          for (let t = 1; t < 6; t++) {
            if (points.length >= count) break;
            points.push(pt(
              b.x + (Math.random() - 0.5) * 6,
              b.yStart + (ci + t / 6) * stepY,
              branchColors[(bi + 1) % branchColors.length]
            ));
          }
        }
      });
      while (points.length < count) {
        points.push(pt(
          cx + (Math.random() - 0.5) * 200,
          cy + (Math.random() - 0.5) * 200,
          "#4a1560"
        ));
      }
      break;
    }

    // Circuit Board — AI Frameworks
    case "circuitboard": {
      const gridSize = 40;
      const cols = 8;
      const rows = 8;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (points.length >= count) break;
          const px = cx - (cols * gridSize) / 2 + col * gridSize;
          const py = cy - (rows * gridSize) / 2 + row * gridSize;
          const isNode = (row + col) % 3 === 0;
          points.push(pt(px, py, isNode ? "#22d3ee" : "#06b6d4"));
        }
      }
      while (points.length < count) {
        const a = Math.random() * Math.PI * 2;
        const r = 180 + Math.random() * 40;
        points.push(pt(cx + Math.cos(a) * r, cy + Math.sin(a) * r, "#042b30"));
      }
      break;
    }
  }

  return points.slice(0, count);
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface SkillsParticleProps {
  shape: SkillShape;
}

const PARTICLE_COUNT = 140;

export default function SkillsParticle({ shape }: SkillsParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const shapeRef = useRef<SkillShape>(shape);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const cx = canvas.width / (2 * window.devicePixelRatio);
    const cy = canvas.height / (2 * window.devicePixelRatio);
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 50 + Math.random() * 120;
      particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        tx: cx,
        ty: cy,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.5,
        r: 91, g: 157, b: 255,
      });
    }
    particlesRef.current = particles;
  }, []);

  const assignTargets = useCallback((canvas: HTMLCanvasElement, s: SkillShape) => {
    const dpr = window.devicePixelRatio;
    const cx = canvas.width / (2 * dpr);
    const cy = canvas.height / (2 * dpr);
    const targets = generateTargets(s, cx, cy, PARTICLE_COUNT);
    particlesRef.current.forEach((p, i) => {
      const t = targets[i] ?? targets[targets.length - 1];
      p.tx = t.x;
      p.ty = t.y;
      p.r = t.r;
      p.g = t.g;
      p.b = t.b;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let initialized = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!initialized) {
        initParticles(canvas);
        initialized = true;
      }
      assignTargets(canvas, shapeRef.current);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      timeRef.current += 0.015;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;

      // Connection lines
      ctx.lineWidth = 0.35;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            const alpha = 0.18 * (1 - dist / 55);
            const { r, g, b } = particles[i];
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        // Spring to target
        p.vx += (p.tx - p.x) * 0.08;
        p.vy += (p.ty - p.y) * 0.08;

        // Mouse repulsion
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 80 && mdist > 0.01) {
          const force = (80 - mdist) / 80;
          p.vx += (mdx / mdist) * force * 6;
          p.vy += (mdy / mdist) * force * 6;
        }

        // Damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        const pSize = p.size * (1 + 0.25 * Math.sin(timeRef.current * 2 + p.x * 0.05));
        const { r, g, b } = p;

        // Glow halo
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pSize * 4);
        gradient.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles, assignTargets]);

  // Shape change → reassign targets
  useEffect(() => {
    shapeRef.current = shape;
    const canvas = canvasRef.current;
    if (canvas && particlesRef.current.length > 0) {
      assignTargets(canvas, shape);
    }
  }, [shape, assignTargets]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
