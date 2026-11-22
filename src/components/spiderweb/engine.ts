/* ==========================================================================
   Orb-web engine: geometry, verlet silk physics, light-catching rendering,
   and a procedurally animated spider.
   ========================================================================== */

export const SPOKES = 16;
export const RINGS = 14;

export const K_ANCHOR = 0;
export const K_FRAME = 1;
export const K_SPOKE = 2;
export const K_HUB = 3;
export const K_SPIRAL = 4;

export interface Vec {
  x: number;
  y: number;
}

export interface WebPoint {
  x: number;
  y: number;
  px: number;
  py: number;
  ox: number;
  oy: number;
  pinned: boolean;
}

export interface Thread {
  a: number;
  b: number;
  rest: number;
  stiff: number;
  kind: number;
}

export interface Dew {
  thread: number;
  t: number;
  r: number;
}

export interface WebModel {
  W: number;
  H: number;
  scale: number;
  points: WebPoint[];
  threads: Thread[];
  dew: Dew[];
  hub: number;
  /** grid[spoke][ring] -> point index (ring 0 is the hub) */
  grid: number[][];
  adj: { to: number; w: number }[][];
  /** per-frame scratch: quadratic control points + glint for each thread */
  ctrl: Float32Array;
  spec: Float32Array;
}

export interface Brush {
  x: number;
  y: number;
  vx: number;
  vy: number;
  on: boolean;
}

/* ─── Utilities ──────────────────────────────────────────────────────────── */

export function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cross = (ax: number, ay: number, bx: number, by: number) => ax * by - ay * bx;

function rayPolygon(ox: number, oy: number, dx: number, dy: number, poly: Vec[]) {
  let best: { x: number; y: number; t: number } | null = null;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const ex = q.x - p.x;
    const ey = q.y - p.y;
    const denom = cross(dx, dy, ex, ey);
    if (Math.abs(denom) < 1e-9) continue;
    const wx = p.x - ox;
    const wy = p.y - oy;
    const t = cross(wx, wy, ex, ey) / denom;
    const u = cross(wx, wy, dx, dy) / denom;
    if (t > 0 && u >= 0 && u <= 1 && (!best || t < best.t)) {
      best = { x: ox + dx * t, y: oy + dy * t, t };
    }
  }
  return best;
}

function angleDiff(a: number, b: number) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/* ─── Geometry ───────────────────────────────────────────────────────────── */

/** Fraction of a spoke's length at which ring k sits. Rings 1–2 form the hub,
 *  then a free zone, then a true capture spiral (rings 3..RINGS). */
function ringFraction(s: number, k: number) {
  if (k === 1) return 0.055;
  if (k === 2) return 0.1;
  const step = 0.68 / (RINGS - 3);
  return 0.215 + (k - 3) * step + (s / SPOKES) * step;
}

export function buildWeb(W: number, H: number, bottomReserve: number): WebModel {
  const rand = mulberry32(1337);
  const points: WebPoint[] = [];
  const threads: Thread[] = [];

  const add = (x: number, y: number, pinned = false) => {
    points.push({ x, y, px: x, py: y, ox: x, oy: y, pinned });
    return points.length - 1;
  };
  const link = (a: number, b: number, kind: number, stiff: number, slack = 1) => {
    const d = Math.hypot(points[b].x - points[a].x, points[b].y - points[a].y);
    threads.push({ a, b, rest: d * slack, stiff, kind });
  };

  const Hw = Math.max(240, H - bottomReserve);
  const scale = Math.max(0.55, Math.min(1.15, Math.min(W, Hw * 1.3) / 1000));
  const cx = W / 2;
  const cy = Hw * 0.47;
  const margin = 16;
  const up = cy - margin;
  const down = Hw - cy - margin;
  const rx = Math.min(W / 2 - margin, Math.max(up, down) * 1.28);

  // Irregular frame polygon — the bridge threads a real spider lays first.
  const FRAME = 7;
  const verts: Vec[] = [];
  for (let i = 0; i < FRAME; i++) {
    const a = (i / FRAME) * Math.PI * 2 - Math.PI / 2 + 0.2 + (rand() - 0.5) * 0.28;
    const sy = Math.sin(a);
    const f = 0.86 + rand() * 0.12;
    verts.push({ x: cx + Math.cos(a) * rx * f, y: cy + sy * (sy < 0 ? up : down) * f });
  }

  const hub = add(cx, cy);
  const grid: number[][] = [];
  const frameNodes: { idx: number; ang: number }[] = [];

  for (let s = 0; s < SPOKES; s++) {
    const ang = (s / SPOKES) * Math.PI * 2 - Math.PI / 2 + (rand() - 0.5) * 0.09;
    const dx = Math.cos(ang);
    const dy = Math.sin(ang);
    const hit = rayPolygon(cx, cy, dx, dy, verts) ?? { x: cx + dx * rx, y: cy + dy * rx, t: rx };
    const L = hit.t;
    const row = [hub];
    for (let k = 1; k <= RINGS; k++) {
      const jitter = (rand() - 0.5) * (k <= 2 ? 0.016 : 0.007);
      const f = ringFraction(s, k) + jitter;
      row.push(add(cx + dx * L * f, cy + dy * L * f));
    }
    const end = add(hit.x, hit.y);
    row.push(end);
    frameNodes.push({ idx: end, ang });
    grid.push(row);
  }

  // Frame vertices + anchor (guy) lines out to the edges of the canvas.
  verts.forEach((v, i) => {
    const idx = add(v.x, v.y);
    frameNodes.push({ idx, ang: Math.atan2(v.y - cy, v.x - cx) });

    const baseA = Math.atan2(v.y - cy, v.x - cx);
    const dirs = i % 2 === 0 ? [baseA - 0.32, baseA + 0.38] : [baseA + (rand() - 0.5) * 0.3];
    dirs.forEach((a) => {
      const dx = Math.cos(a);
      const dy = Math.sin(a);
      const tx = dx > 0 ? (W + 30 - v.x) / dx : dx < 0 ? (-30 - v.x) / dx : Infinity;
      const ty = dy > 0 ? (H + 30 - v.y) / dy : dy < 0 ? (-30 - v.y) / dy : Infinity;
      const t = Math.min(tx, ty);
      const anchor = add(v.x + dx * t, v.y + dy * t, true);
      link(idx, anchor, K_ANCHOR, 1, 0.997);
    });
  });

  // Frame chain, ordered around the hub.
  const norm = (a: number) => (a + Math.PI * 4) % (Math.PI * 2);
  frameNodes.sort((p, q) => norm(p.ang) - norm(q.ang));
  for (let i = 0; i < frameNodes.length; i++) {
    link(frameNodes[i].idx, frameNodes[(i + 1) % frameNodes.length].idx, K_FRAME, 1, 0.997);
  }

  // Radial spokes (pre-tensioned so they read as taut).
  for (let s = 0; s < SPOKES; s++) {
    const row = grid[s];
    for (let k = 0; k < row.length - 1; k++) link(row[k], row[k + 1], K_SPOKE, 1, 0.996);
  }

  // Hub mesh rings.
  for (let k = 1; k <= 2; k++) {
    for (let s = 0; s < SPOKES; s++) link(grid[s][k], grid[(s + 1) % SPOKES][k], K_HUB, 0.9);
  }

  // Capture spiral — one continuous thread winding outward.
  for (let k = 3; k <= RINGS; k++) {
    for (let s = 0; s < SPOKES; s++) {
      if (s < SPOKES - 1) link(grid[s][k], grid[s + 1][k], K_SPIRAL, 0.55);
      else if (k < RINGS) link(grid[s][k], grid[0][k + 1], K_SPIRAL, 0.55);
    }
  }

  // Dew beads strung along the sticky spiral.
  const dew: Dew[] = [];
  threads.forEach((th, i) => {
    if (th.kind !== K_SPIRAL) return;
    const roll = rand();
    const n = roll < 0.42 ? 0 : roll < 0.82 ? 1 : 2;
    for (let j = 0; j < n; j++) {
      const r = (0.55 + Math.pow(rand(), 2.4) * 1.9) * Math.max(0.8, scale);
      dew.push({ thread: i, t: 0.12 + rand() * 0.76, r });
    }
  });

  const adj: { to: number; w: number }[][] = points.map(() => []);
  threads.forEach((th) => {
    if (th.kind < K_SPOKE) return;
    adj[th.a].push({ to: th.b, w: th.rest });
    adj[th.b].push({ to: th.a, w: th.rest });
  });

  return {
    W,
    H,
    scale,
    points,
    threads,
    dew,
    hub,
    grid,
    adj,
    ctrl: new Float32Array(threads.length * 2),
    spec: new Float32Array(threads.length),
  };
}

/* ─── Graph ──────────────────────────────────────────────────────────────── */

export function shortestPaths(m: WebModel, src: number) {
  const n = m.points.length;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const done = new Uint8Array(n);
  dist[src] = 0;
  for (let iter = 0; iter < n; iter++) {
    let u = -1;
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      if (!done[i] && dist[i] < best) {
        best = dist[i];
        u = i;
      }
    }
    if (u < 0) break;
    done[u] = 1;
    for (const e of m.adj[u]) {
      const nd = dist[u] + e.w;
      if (nd < dist[e.to]) {
        dist[e.to] = nd;
        prev[e.to] = u;
      }
    }
  }
  return prev;
}

export function tracePath(prev: Int32Array, src: number, dst: number) {
  const path: number[] = [];
  let cur = dst;
  while (cur !== -1) {
    path.push(cur);
    if (cur === src) break;
    cur = prev[cur];
  }
  return path[path.length - 1] === src ? path.reverse() : [];
}

/* ─── Physics ────────────────────────────────────────────────────────────── */

export function stepWeb(m: WebModel, t: number, breeze: number, brush: Brush) {
  const P = m.points;
  const R = 48 * m.scale;
  const R2 = R * R;

  for (let i = 0; i < P.length; i++) {
    const p = P[i];
    if (p.pinned) continue;
    const vx = (p.x - p.px) * 0.962;
    const vy = (p.y - p.py) * 0.962;
    p.px = p.x;
    p.py = p.y;

    let fx = (p.ox - p.x) * 0.0024;
    let fy = (p.oy - p.y) * 0.0024;

    if (breeze > 0) {
      const gust = Math.sin(t * 0.55 + p.oy * 0.004) * 0.6 + Math.sin(t * 1.6 + p.ox * 0.009 + p.oy * 0.003) * 0.4;
      fx += gust * 0.016 * breeze;
      fy += Math.cos(t * 0.42 + p.ox * 0.005) * 0.011 * breeze;
    }

    if (brush.on) {
      const dx = p.x - brush.x;
      const dy = p.y - brush.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2) {
        let f = 1 - Math.sqrt(d2) / R;
        f = f * f * 0.2;
        fx += brush.vx * f;
        fy += brush.vy * f;
      }
    }

    p.x += vx + fx;
    p.y += vy + fy;
  }

  const T = m.threads;
  for (let iter = 0; iter < 6; iter++) {
    for (let i = 0; i < T.length; i++) {
      const th = T[i];
      const a = P[th.a];
      const b = P[th.b];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      // Silk is a rope: it pulls when stretched, never pushes.
      if (d <= th.rest || d === 0) continue;
      const diff = ((d - th.rest) / d) * th.stiff;
      if (a.pinned) {
        b.x -= dx * diff;
        b.y -= dy * diff;
      } else if (b.pinned) {
        a.x += dx * diff;
        a.y += dy * diff;
      } else {
        a.x += dx * diff * 0.5;
        a.y += dy * diff * 0.5;
        b.x -= dx * diff * 0.5;
        b.y -= dy * diff * 0.5;
      }
    }
  }
}

export function pluck(m: WebModel, idx: number, dx: number, dy: number, strength: number) {
  const p = m.points[idx];
  if (!p || p.pinned) return;
  p.px = p.x - dx * strength;
  p.py = p.y - dy * strength;
}

export function nearestPoint(m: WebModel, x: number, y: number, maxD: number) {
  let best = -1;
  let bestD = maxD * maxD;
  m.points.forEach((p, i) => {
    if (p.pinned) return;
    const d = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

/* ─── Rendering ──────────────────────────────────────────────────────────── */

const KIND_STYLE: Record<number, { a: number; w: number }> = {
  [K_ANCHOR]: { a: 0.15, w: 0.9 },
  [K_FRAME]: { a: 0.24, w: 1.05 },
  [K_SPOKE]: { a: 0.3, w: 0.8 },
  [K_HUB]: { a: 0.36, w: 0.7 },
  [K_SPIRAL]: { a: 0.23, w: 0.6 },
};

/** Silk is anisotropic: threads running perpendicular to the light flare
 *  bright, which produces the glinting band you see on backlit webs. */
export function renderSilk(ctx: CanvasRenderingContext2D, m: WebModel, light: number, alphaMul: number) {
  const P = m.points;
  const hub = P[m.hub];
  const lx = Math.cos(light);
  const ly = Math.sin(light);
  ctx.lineCap = "round";

  for (let i = 0; i < m.threads.length; i++) {
    const th = m.threads[i];
    const a = P[th.a];
    const b = P[th.b];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const c = (dx * lx + dy * ly) / len;
    const spec = Math.pow(1 - c * c, 14);
    m.spec[i] = spec;

    const style = KIND_STYLE[th.kind];
    const alpha = Math.min(1, (style.a + spec * 0.55) * alphaMul);

    // faint thin-film iridescence on the brightest glints
    const mx = (a.x + b.x) * 0.5;
    const my = (a.y + b.y) * 0.5;
    const phase = Math.hypot(mx - hub.x, my - hub.y) * 0.035;
    const iri = spec * spec * 34;
    const r = Math.min(255, 205 + 50 * spec + iri * Math.sin(phase)) | 0;
    const g = Math.min(255, 196 + 46 * spec + iri * Math.sin(phase + 2.1)) | 0;
    const bl = Math.min(255, 182 + 40 * spec + iri * Math.sin(phase + 4.2)) | 0;

    ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha.toFixed(3)})`;
    ctx.lineWidth = style.w * (1 + spec * 0.5);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);

    if (th.kind === K_SPIRAL || th.kind === K_HUB) {
      const slack = Math.max(0, th.rest - len);
      const sag = len * 0.02 + slack * 0.9;
      const hx = hub.x - mx;
      const hy = hub.y - my;
      const hl = Math.sqrt(hx * hx + hy * hy) || 1;
      const qx = mx + (hx / hl) * sag * 0.7;
      const qy = my + (hy / hl) * sag * 0.7 + sag * 0.45;
      m.ctrl[i * 2] = qx;
      m.ctrl[i * 2 + 1] = qy;
      ctx.quadraticCurveTo(qx, qy, b.x, b.y);
    } else {
      ctx.lineTo(b.x, b.y);
    }
    ctx.stroke();
  }
}

export function renderDew(ctx: CanvasRenderingContext2D, m: WebModel, light: number, alphaMul: number) {
  const P = m.points;
  const lx = Math.cos(light + Math.PI);
  const ly = Math.sin(light + Math.PI);

  for (const d of m.dew) {
    const th = m.threads[d.thread];
    const a = P[th.a];
    const b = P[th.b];
    const qx = m.ctrl[d.thread * 2];
    const qy = m.ctrl[d.thread * 2 + 1];
    const t = d.t;
    const u = 1 - t;
    const x = u * u * a.x + 2 * u * t * qx + t * t * b.x;
    const y = u * u * a.y + 2 * u * t * qy + t * t * b.y;
    const spec = m.spec[d.thread];

    // droplet body (refracts the dark background, so mostly a rim)
    ctx.beginPath();
    ctx.arc(x, y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,222,206,${((0.08 + 0.2 * spec) * alphaMul).toFixed(3)})`;
    ctx.fill();

    // specular highlight
    ctx.beginPath();
    ctx.arc(x + lx * d.r * 0.32, y + ly * d.r * 0.32, Math.max(0.42, d.r * 0.4), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,251,242,${((0.22 + 0.78 * spec) * alphaMul).toFixed(3)})`;
    ctx.fill();

    if (spec > 0.55 && d.r > 1.3) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, d.r * 5);
      g.addColorStop(0, `rgba(255,236,200,${(0.3 * spec * alphaMul).toFixed(3)})`);
      g.addColorStop(1, "rgba(255,236,200,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, d.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** A highlighted route along real silk threads — a vibration travelling
 *  from the hovered skill to each connected one. */
export function renderPath(
  ctx: CanvasRenderingContext2D,
  m: WebModel,
  path: number[],
  reveal: number,
  alpha: number,
  t: number,
  phase: number
) {
  if (path.length < 2 || alpha < 0.01) return;
  const P = m.points;
  const cum = [0];
  for (let i = 1; i < path.length; i++) {
    const a = P[path[i - 1]];
    const b = P[path[i]];
    cum.push(cum[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
  }
  const total = cum[cum.length - 1];
  const limit = total * Math.min(1, reveal);

  const pointAt = (dist: number): Vec => {
    let i = 1;
    while (i < cum.length - 1 && cum[i] < dist) i++;
    const a = P[path[i - 1]];
    const b = P[path[i]];
    const seg = cum[i] - cum[i - 1] || 1;
    const f = Math.max(0, Math.min(1, (dist - cum[i - 1]) / seg));
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  };

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(P[path[0]].x, P[path[0]].y);
  for (let i = 1; i < path.length; i++) {
    if (cum[i] <= limit) {
      ctx.lineTo(P[path[i]].x, P[path[i]].y);
    } else {
      const e = pointAt(limit);
      ctx.lineTo(e.x, e.y);
      break;
    }
  }
  const sc = Math.max(0.8, m.scale);
  ctx.strokeStyle = `rgba(245,158,11,${(0.14 * alpha).toFixed(3)})`;
  ctx.lineWidth = 6 * sc;
  ctx.stroke();
  ctx.strokeStyle = `rgba(251,191,36,${(0.4 * alpha).toFixed(3)})`;
  ctx.lineWidth = 2 * sc;
  ctx.stroke();
  ctx.strokeStyle = `rgba(255,238,205,${(0.85 * alpha).toFixed(3)})`;
  ctx.lineWidth = 0.9;
  ctx.stroke();

  if (reveal >= 1) {
    for (let j = 0; j < 2; j++) {
      const f = (t * 0.5 + phase + j * 0.5) % 1;
      const p = pointAt(f * total);
      const r = 7 * sc;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, `rgba(255,245,225,${(0.95 * alpha).toFixed(3)})`);
      g.addColorStop(0.35, `rgba(251,191,36,${(0.45 * alpha).toFixed(3)})`);
      g.addColorStop(1, "rgba(245,158,11,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/** Skill knot: a dew bead lit amber. level: 0.4 dimmed · 1 idle · 2 related · 3 active */
export function renderBead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  level: number,
  t: number,
  seed: number,
  scale: number
) {
  const sc = Math.max(0.85, scale);
  const a = Math.max(0, Math.min(1, level / 3));
  const idle = level > 0.7 && level < 1.5 ? 1 : 0;
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.1 + seed * 1.7);
  const r = (1.7 + level * 0.85) * sc;
  const haloR = r * (3.4 + Math.max(0, level - 2) * 1.6);

  const g = ctx.createRadialGradient(x, y, 0, x, y, haloR);
  g.addColorStop(0, `rgba(251,176,60,${(0.12 + 0.3 * a + 0.1 * pulse * idle).toFixed(3)})`);
  g.addColorStop(1, "rgba(251,176,60,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, haloR, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,208,128,${(0.35 + 0.6 * a).toFixed(3)})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,250,${(0.25 + 0.6 * a).toFixed(3)})`;
  ctx.fill();

  if (level > 2.6) {
    const f = (t * 0.8) % 1;
    ctx.beginPath();
    ctx.arc(x, y, r + f * 20 * sc, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(251,191,36,${((1 - f) * 0.5).toFixed(3)})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

/* ─── Spider ─────────────────────────────────────────────────────────────── */

interface Leg {
  side: number;
  i: number;
  group: number;
  tx: number;
  ty: number;
  fx: number;
  fy: number;
  p: number;
}

const LEG_ANGLES = [0.62, 1.22, 1.98, 2.58];
const LEG_REACH = [2.75, 2.25, 1.95, 2.5];

export class Spider {
  x: number;
  y: number;
  vx = 0;
  vy = 0;
  heading = Math.PI / 2;
  u: number;
  legs: Leg[] = [];
  mode: "rest" | "hunt" | "inspect" | "return" = "rest";
  target = -1;
  until = 0;
  drag = 0;
  turn = 0;

  constructor(x: number, y: number, scale: number) {
    this.x = x;
    this.y = y;
    this.u = 9.5 * scale;
    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        const leg: Leg = { side, i, group: (i + (side > 0 ? 1 : 0)) % 2, tx: 0, ty: 0, fx: 0, fy: 0, p: -1 };
        const d = this.desired(leg);
        leg.tx = d.x;
        leg.ty = d.y;
        this.legs.push(leg);
      }
    }
  }

  private desired(leg: Leg): Vec {
    const a = this.heading + leg.side * LEG_ANGLES[leg.i];
    const r = LEG_REACH[leg.i] * this.u;
    return { x: this.x + Math.cos(a) * r + this.vx * 3, y: this.y + Math.sin(a) * r + this.vy * 3 };
  }

  hunt(idx: number) {
    this.mode = "hunt";
    this.target = idx;
  }

  update(m: WebModel, now: number, faceTo: Vec | null, calm: boolean) {
    const hub = m.points[m.hub];
    const tp = this.mode === "hunt" || this.mode === "inspect" ? m.points[this.target] ?? hub : hub;
    const dx = tp.x - this.x;
    const dy = tp.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (this.mode === "rest" || this.mode === "inspect") {
      this.x += dx * 0.3;
      this.y += dy * 0.3;
      this.vx *= 0.6;
      this.vy *= 0.6;
      if (this.mode === "inspect" && now > this.until) this.mode = "return";
    } else {
      const maxV = (calm ? 1.4 : 2.9) * (this.u / 9.5);
      const sp = Math.min(maxV, dist * 0.09 + 0.4);
      this.vx += ((dx / dist) * sp - this.vx) * 0.12;
      this.vy += ((dy / dist) * sp - this.vy) * 0.12;
      this.x += this.vx;
      this.y += this.vy;
      if (this.mode === "hunt" && dist < 3) {
        this.mode = "inspect";
        this.until = now + 1100;
      } else if (this.mode === "return" && dist < 2) {
        this.mode = "rest";
      }
    }

    this.drag += ((this.mode === "rest" ? 0 : 1) - this.drag) * 0.06;

    const speed = Math.hypot(this.vx, this.vy);
    let want = Math.PI / 2; // orb weavers rest head-down
    if (speed > 0.5) want = Math.atan2(this.vy, this.vx);
    else if (faceTo) want = Math.atan2(faceTo.y - this.y, faceTo.x - this.x);
    if (this.mode === "inspect") want += Math.sin(now * 0.018) * 0.18;
    this.heading += angleDiff(want, this.heading) * 0.07;

    // Alternating tetrapod gait: one group of four legs steps while the other
    // stays planted, then they swap — so neither group can be starved.
    const thresh = (speed > 0.5 ? 0.7 : 1.05) * this.u;
    let turnBusy = false;

    for (const leg of this.legs) {
      const d = this.desired(leg);
      const off = Math.hypot(d.x - leg.tx, d.y - leg.ty);
      if (off > LEG_REACH[leg.i] * this.u * 2.5) {
        // teleported (e.g. after a resize) — just re-plant
        leg.tx = d.x;
        leg.ty = d.y;
        leg.p = -1;
        continue;
      }
      if (leg.p < 0 && leg.group === this.turn && off > thresh) {
        leg.p = 0;
        leg.fx = leg.tx;
        leg.fy = leg.ty;
      }
      if (leg.p >= 0 && leg.group === this.turn) turnBusy = true;
      if (leg.p >= 0) {
        leg.p += speed > 0.5 ? 0.27 : 0.13;
        const e = Math.min(1, leg.p);
        const ease = e * e * (3 - 2 * e);
        leg.tx = leg.fx + (d.x - leg.fx) * ease;
        leg.ty = leg.fy + (d.y - leg.fy) * ease;
        if (leg.p >= 1) leg.p = -1;
      }
    }
    if (!turnBusy) this.turn = 1 - this.turn;
  }

  draw(ctx: CanvasRenderingContext2D, m: WebModel) {
    const u = this.u;
    const c = Math.cos(this.heading);
    const s = Math.sin(this.heading);
    const toW = (lx: number, ly: number): Vec => ({ x: this.x + lx * c - ly * s, y: this.y + lx * s + ly * c });

    // dragline back to the hub while away
    if (this.drag > 0.02) {
      const hub = m.points[m.hub];
      const tail = toW(-2.2 * u, 0);
      ctx.beginPath();
      ctx.moveTo(hub.x, hub.y);
      ctx.lineTo(tail.x, tail.y);
      ctx.strokeStyle = `rgba(235,226,210,${(0.35 * this.drag).toFixed(3)})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    // soft rim of lamplight so the dark body separates from the night
    const halo = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 4 * u);
    halo.addColorStop(0, "rgba(245,165,60,0.14)");
    halo.addColorStop(1, "rgba(245,165,60,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4 * u, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const leg of this.legs) {
      const ra = leg.side * (0.55 + leg.i * 0.42);
      const root = toW(0.15 * u + Math.cos(ra) * 0.5 * u, Math.sin(ra) * 0.42 * u);
      const reach = LEG_REACH[leg.i] * u;
      const femur = reach * 0.62;
      const tibia = reach * 0.66;
      // never draw a leg longer than it really is
      let tipX = leg.tx;
      let tipY = leg.ty;
      const span = Math.hypot(tipX - root.x, tipY - root.y);
      const maxSpan = (femur + tibia) * 0.98;
      if (span > maxSpan) {
        tipX = root.x + ((tipX - root.x) / span) * maxSpan;
        tipY = root.y + ((tipY - root.y) / span) * maxSpan;
      }
      const knee = solveKnee(root.x, root.y, tipX, tipY, femur, tibia, this.x, this.y);
      const lift = leg.p >= 0 ? Math.sin(Math.min(1, leg.p) * Math.PI) : 0;

      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      ctx.lineTo(knee.x, knee.y);
      ctx.strokeStyle = "#3d2817";
      ctx.lineWidth = 0.34 * u;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(knee.x, knee.y);
      ctx.lineTo(tipX, tipY);
      ctx.lineWidth = 0.22 * u * (1 + lift * 0.3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      ctx.lineTo(knee.x, knee.y);
      ctx.lineTo(tipX, tipY);
      ctx.strokeStyle = `rgba(250,190,115,${(0.5 + lift * 0.2).toFixed(3)})`;
      ctx.lineWidth = 0.09 * u;
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);

    // abdomen
    const ag = ctx.createRadialGradient(-1.45 * u, -0.35 * u, 0.1 * u, -1.25 * u, 0, 1.15 * u);
    ag.addColorStop(0, "#a8723f");
    ag.addColorStop(0.45, "#4a2c17");
    ag.addColorStop(1, "#140b06");
    ctx.fillStyle = ag;
    ctx.beginPath();
    ctx.ellipse(-1.3 * u, 0, 1.1 * u, 0.82 * u, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(250,195,120,0.45)";
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // folium pattern
    ctx.strokeStyle = "rgba(245,200,140,0.55)";
    ctx.lineWidth = Math.max(0.6, 0.1 * u);
    for (let j = 0; j < 3; j++) {
      const ox = -0.75 * u - j * 0.36 * u;
      const w = (0.42 - j * 0.07) * u;
      ctx.beginPath();
      ctx.moveTo(ox, -w);
      ctx.lineTo(ox - 0.2 * u, 0);
      ctx.lineTo(ox, w);
      ctx.stroke();
    }

    // cephalothorax
    const cg = ctx.createRadialGradient(0.05 * u, -0.2 * u, 0.05 * u, 0.15 * u, 0, 0.7 * u);
    cg.addColorStop(0, "#8a5a32");
    cg.addColorStop(1, "#1a0f08");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.ellipse(0.15 * u, 0, 0.66 * u, 0.52 * u, 0, 0, Math.PI * 2);
    ctx.fill();

    // pedipalps
    ctx.strokeStyle = "#3d2817";
    ctx.lineWidth = 0.18 * u;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0.7 * u, side * 0.18 * u);
      ctx.lineTo(1.05 * u, side * 0.34 * u);
      ctx.stroke();
    }

    // eyes
    ctx.fillStyle = "rgba(255,232,200,0.85)";
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(0.66 * u, side * 0.12 * u, Math.max(0.5, 0.075 * u), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function solveKnee(rx: number, ry: number, tx: number, ty: number, a: number, b: number, bx: number, by: number): Vec {
  const dx = tx - rx;
  const dy = ty - ry;
  let d = Math.hypot(dx, dy);
  d = Math.max(Math.abs(a - b) + 0.01, Math.min(d, (a + b) * 0.999));
  const ang = Math.atan2(dy, dx);
  const cosA = (a * a + d * d - b * b) / (2 * a * d);
  const A = Math.acos(Math.max(-1, Math.min(1, cosA)));
  const k1 = { x: rx + Math.cos(ang + A) * a, y: ry + Math.sin(ang + A) * a };
  const k2 = { x: rx + Math.cos(ang - A) * a, y: ry + Math.sin(ang - A) * a };
  const d1 = (k1.x - bx) ** 2 + (k1.y - by) ** 2;
  const d2 = (k2.x - bx) ** 2 + (k2.y - by) ** 2;
  return d1 > d2 ? k1 : k2;
}
