/* ==========================================================================
   Intro: Spider-Man's web-shooter fires a single hairline strand to the hub,
   it bursts into spokes, the spiral winds itself outward, and the spider
   abseils in. The animation only *reveals* the live physics web thread by
   thread, so its last frame is exactly the resting web — no swap, no jump.
   ========================================================================== */

import { K_ANCHOR, K_FRAME, K_HUB, K_SPIRAL, K_SPOKE, pluck, type Vec, type WebModel } from "./engine";

/** Timeline in ms. Short, but each beat is readable. */
export const T = {
  THWIP: 220, // hand settles, strand fires
  IMPACT: 500, // thinking orb hits the hub
  SPOKE_DUR: 300,
  FRAME: 690,
  ANCHOR: 770,
  SPIRAL: 700,
  SPIRAL_DUR: 620,
  BEADS: 760,
  BEADS_SPREAD: 540,
  RELEASE: 1150, // shooter line detaches
  HAND_OUT: 1180,
  DROP: 1250, // spider abseils in
  DROP_END: 1700,
  TOTAL: 1760,
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

interface HandPose {
  x: number;
  y: number;
  ang: number;
  h: number;
}

export class WebIntro {
  private dist: Float32Array;
  private maxD = 1;
  private spiral: number[] = [];
  private rank: Int32Array;
  private counts: Record<number, number> = {};
  private spokeEnds: number[];
  private impacted = false;
  private lastNozzle: Vec | null = null;

  constructor(private m: WebModel, private bottomReserve: number) {
    const hub = m.points[m.hub];
    this.dist = new Float32Array(m.points.length);
    m.points.forEach((p, i) => {
      this.dist[i] = Math.hypot(p.ox - hub.ox, p.oy - hub.oy);
    });
    this.spokeEnds = m.grid.map((row) => row[row.length - 1]);
    this.spokeEnds.forEach((e) => (this.maxD = Math.max(this.maxD, this.dist[e])));

    this.rank = new Int32Array(m.threads.length).fill(-1);
    m.threads.forEach((th, i) => {
      const n = this.counts[th.kind] ?? 0;
      this.rank[i] = n;
      this.counts[th.kind] = n + 1;
      if (th.kind === K_SPIRAL) this.spiral.push(i);
    });
  }

  /** Radius of the spoke burst front. */
  private front(it: number) {
    return this.maxD * easeOutCubic(clamp01((it - T.IMPACT) / T.SPOKE_DUR));
  }

  /** Writes per-thread reveal amounts into the model. */
  apply(it: number) {
    const m = this.m;
    if (!this.impacted && it >= T.IMPACT) {
      this.impacted = true;
      const pose = this.hand(T.IMPACT - 1);
      const hub = m.points[m.hub];
      if (pose) {
        const d = Math.hypot(hub.x - pose.x, hub.y - pose.y) || 1;
        pluck(m, m.hub, (hub.x - pose.x) / d, (hub.y - pose.y) / d, 10 * m.scale);
      }
    }

    const front = this.front(it);
    const hubBand = 24 * m.scale;
    for (let i = 0; i < m.threads.length; i++) {
      const th = m.threads[i];
      const dA = this.dist[th.a];
      const dB = this.dist[th.b];
      let r = 0;
      switch (th.kind) {
        case K_SPOKE:
          r = (front - dA) / Math.max(1, dB - dA);
          break;
        case K_HUB:
          r = (front - Math.max(dA, dB)) / hubBand;
          break;
        case K_FRAME: {
          const start = T.FRAME + (this.rank[i] / this.counts[K_FRAME]) * 90;
          r = (it - start) / 120;
          break;
        }
        case K_ANCHOR: {
          const start = T.ANCHOR + (this.rank[i] / this.counts[K_ANCHOR]) * 90;
          r = easeOutCubic(clamp01((it - start) / 150));
          break;
        }
        case K_SPIRAL:
          r = ((it - T.SPIRAL) / T.SPIRAL_DUR) * this.spiral.length - this.rank[i];
          break;
      }
      m.reveal[i] = clamp01(r);
    }
  }

  /** 0 → hidden, overshoots slightly past 1 as each skill knot pops in. */
  beadPop(pointIdx: number, it: number) {
    const start = T.BEADS + (this.dist[pointIdx] / this.maxD) * T.BEADS_SPREAD;
    const f = clamp01((it - start) / 220);
    return f <= 0 ? 0 : easeOutBack(f);
  }

  /** Where the abseiling spider hangs at time `it`, or null once landed. */
  dropY(it: number) {
    const hub = this.m.points[this.m.hub];
    const f = clamp01((it - T.DROP) / (T.DROP_END - T.DROP));
    return -40 + (hub.y + 40) * easeOutBack(f);
  }

  private hand(it: number): HandPose | null {
    const m = this.m;
    const hub = m.points[m.hub];
    const h = 40 * Math.max(0.6, m.scale);
    const bx = Math.max(h * 1.2, m.W * 0.08);
    const by = m.H - Math.max(56, this.bottomReserve * 0.5);
    const baseAng = Math.atan2(hub.y - by, hub.x - bx);
    const dx = Math.cos(baseAng);
    const dy = Math.sin(baseAng);

    const inOff = (1 - easeOutCubic(clamp01(it / T.THWIP))) * 6 * h;
    const k = it >= T.THWIP ? clamp01(1 - (it - T.THWIP) / 170) : 0;
    const recoil = 0.45 * h * k * k;
    const outF = clamp01((it - T.HAND_OUT) / 280);
    if (outF >= 1) return null;
    const outOff = easeInCubic(outF) * 7 * h;
    const back = inOff + recoil + outOff;
    return { x: bx - dx * back, y: by - dy * back, ang: baseAng - 0.1 * k * k, h };
  }

  private nozzle(p: HandPose): Vec {
    const lx = 0.3 * p.h;
    const ly = 0.58 * p.h;
    const c = Math.cos(p.ang);
    const s = Math.sin(p.ang);
    return { x: p.x + lx * c - ly * s, y: p.y + lx * s + ly * c };
  }

  /** Hand, shot strand and thinking orbs — drawn on the top layer. */
  draw(ctx: CanvasRenderingContext2D, it: number, t: number) {
    const m = this.m;
    const P = m.points;
    const hub = P[m.hub];
    const sc = Math.max(0.7, m.scale);
    const pose = this.hand(it);
    const noz = pose ? this.nozzle(pose) : this.lastNozzle;
    if (pose && it <= T.RELEASE) this.lastNozzle = noz;

    // the strand from the web-shooter
    if (noz && it >= T.THWIP && it < T.RELEASE + 200) {
      let ex = hub.x;
      let ey = hub.y;
      let sx = noz.x;
      let sy = noz.y;
      let alpha = 0.9;
      if (it < T.IMPACT) {
        const f = easeOutQuad((it - T.THWIP) / (T.IMPACT - T.THWIP));
        ex = noz.x + (hub.x - noz.x) * f;
        ey = noz.y + (hub.y - noz.y) * f;
      } else if (it >= T.RELEASE && this.lastNozzle) {
        // released: the loose end recoils back into the hub
        const f = easeOutCubic((it - T.RELEASE) / 200);
        sx = this.lastNozzle.x + (hub.x - this.lastNozzle.x) * f;
        sy = this.lastNozzle.y + (hub.y - this.lastNozzle.y) * f;
        alpha = 0.9 * (1 - f);
      }
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(240,234,224,${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();

      if (it < T.IMPACT) drawOrb(ctx, ex, ey, 4.4 * sc, 1, t, 3);
    }

    // muzzle flash
    if (noz && it >= T.THWIP && it < T.THWIP + 120) {
      const f = (it - T.THWIP) / 120;
      drawOrb(ctx, noz.x, noz.y, (3 + f * 5) * sc, 1 - f, t, 0);
    }

    // impact at the hub
    if (it >= T.IMPACT && it < T.IMPACT + 340) {
      const f = (it - T.IMPACT) / 340;
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, (10 + easeOutCubic(f) * 95) * sc, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,226,180,${(0.55 * (1 - f)).toFixed(3)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      drawOrb(ctx, hub.x, hub.y, (6 - f * 3) * sc, 1 - f * f, t, 3);
    }

    // an orb rides the tip of every spoke as it shoots out
    if (it >= T.IMPACT) {
      const front = this.front(it);
      this.spokeEnds.forEach((end) => {
        const L = this.dist[end] || 1;
        const a = front < L ? 1 : 1 - (front - L) / (60 * sc);
        if (a <= 0) return;
        const e = P[end];
        const f = Math.min(1, front / L);
        drawOrb(ctx, hub.x + (e.x - hub.x) * f, hub.y + (e.y - hub.y) * f, 2.2 * sc, a, t, 0);
      });
    }

    // …and one winds the capture spiral
    const q = ((it - T.SPIRAL) / T.SPIRAL_DUR) * this.spiral.length;
    if (q > 0 && q < this.spiral.length) {
      const th = m.threads[this.spiral[Math.floor(q)]];
      const f = q - Math.floor(q);
      const a = P[th.a];
      const b = P[th.b];
      const fade = Math.min(1, (this.spiral.length - q) / 12);
      drawOrb(ctx, a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, 3 * sc, fade, t, 2);
    }

    if (pose) drawHand(ctx, pose);
  }
}

/** A "thinking" orb: hot core, soft glow, hairline halo, orbiting motes. */
export function drawOrb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  a: number,
  t: number,
  satellites: number
) {
  if (a <= 0.01) return;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const R = r * 3.2;
  const g = ctx.createRadialGradient(x, y, 0, x, y, R);
  g.addColorStop(0, `rgba(255,250,240,${a.toFixed(3)})`);
  g.addColorStop(0.18, `rgba(255,214,150,${(0.85 * a).toFixed(3)})`);
  g.addColorStop(0.45, `rgba(245,158,11,${(0.3 * a).toFixed(3)})`);
  g.addColorStop(1, "rgba(245,158,11,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, R, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, r * 1.9, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255,222,175,${(0.28 * a).toFixed(3)})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  for (let j = 0; j < satellites; j++) {
    const ang = t * 7 + (j * Math.PI * 2) / satellites;
    ctx.beginPath();
    ctx.arc(x + Math.cos(ang) * r * 1.9, y + Math.sin(ang) * r * 1.9, Math.max(0.7, r * 0.22), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,230,185,${(0.9 * a).toFixed(3)})`;
    ctx.fill();
  }
  ctx.restore();
}

/** Stylised gloved hand in the "thwip" pose with a wrist web-shooter.
 *  Local space: +x points at the target, wrist at the origin. */
function drawHand(ctx: CanvasRenderingContext2D, p: HandPose) {
  const h = p.h;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.ang);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const red = (y0: number, y1: number) => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, "#e2283b");
    g.addColorStop(0.55, "#b0101f");
    g.addColorStop(1, "#640510");
    return g;
  };
  const metal = (y0: number, y1: number) => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, "#f2f4f7");
    g.addColorStop(0.45, "#9ba1ab");
    g.addColorStop(0.62, "#5c626c");
    g.addColorStop(1, "#d6dae0");
    return g;
  };
  const webInk = "rgba(0,0,0,0.6)";

  // forearm (sleeve) running off-canvas
  const arm = new Path2D();
  arm.moveTo(-6 * h, -0.52 * h);
  arm.lineTo(0, -0.4 * h);
  arm.quadraticCurveTo(0.14 * h, 0, 0, 0.42 * h);
  arm.lineTo(-6 * h, 0.58 * h);
  arm.closePath();
  ctx.fillStyle = red(-0.52 * h, 0.58 * h);
  ctx.fill(arm);
  ctx.save();
  ctx.clip(arm);
  ctx.strokeStyle = webInk;
  ctx.lineWidth = 0.7;
  for (const yy of [-0.3, -0.06, 0.18, 0.42]) {
    ctx.beginPath();
    ctx.moveTo(-6 * h, yy * 1.1 * h);
    ctx.lineTo(0.1 * h, yy * h);
    ctx.stroke();
  }
  for (let xx = -0.7 * h; xx > -6 * h; xx -= 0.72 * h) {
    ctx.beginPath();
    ctx.moveTo(xx, -0.7 * h);
    ctx.quadraticCurveTo(xx + 0.14 * h, 0, xx, 0.7 * h);
    ctx.stroke();
  }
  ctx.restore();

  // fingers: [x0, y0, x1, y1, width] — index & pinky out, middle & ring curled
  const fingers: [number, number, number, number, number][] = [
    [0.5, -0.36, 1.0, -0.86, 0.27], // thumb
    [1.1, -0.26, 2.05, -0.5, 0.23], // index
    [1.08, 0.3, 1.74, 0.56, 0.2], // pinky
    [1.12, -0.04, 1.36, 0.02, 0.24], // middle (curled)
    [1.1, 0.14, 1.33, 0.21, 0.22], // ring (curled)
  ];
  const palm = new Path2D();
  palm.ellipse(0.72 * h, 0, 0.6 * h, 0.5 * h, 0, 0, Math.PI * 2);

  // dark silhouette pass for definition
  ctx.strokeStyle = "rgba(12,0,2,0.8)";
  for (const f of fingers) {
    ctx.beginPath();
    ctx.moveTo(f[0] * h, f[1] * h);
    ctx.lineTo(f[2] * h, f[3] * h);
    ctx.lineWidth = f[4] * h + 2;
    ctx.stroke();
  }
  ctx.lineWidth = 2;
  ctx.stroke(palm);

  // glove fill
  ctx.strokeStyle = red(-0.9 * h, 0.7 * h);
  for (const f of fingers) {
    ctx.beginPath();
    ctx.moveTo(f[0] * h, f[1] * h);
    ctx.lineTo(f[2] * h, f[3] * h);
    ctx.lineWidth = f[4] * h;
    ctx.stroke();
  }
  ctx.fillStyle = red(-0.5 * h, 0.5 * h);
  ctx.fill(palm);

  // hairline web pattern on the glove
  ctx.strokeStyle = webInk;
  ctx.lineWidth = 0.7;
  for (const f of fingers.slice(0, 3)) {
    const x0 = f[0] * h;
    const y0 = f[1] * h;
    const x1 = f[2] * h;
    const y1 = f[3] * h;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const nx = (-(y1 - y0) / len) * f[4] * h * 0.45;
    const ny = ((x1 - x0) / len) * f[4] * h * 0.45;
    for (const k of [0.45, 0.75]) {
      const cx = x0 + (x1 - x0) * k;
      const cy = y0 + (y1 - y0) * k;
      ctx.beginPath();
      ctx.moveTo(cx - nx, cy - ny);
      ctx.lineTo(cx + nx, cy + ny);
      ctx.stroke();
    }
  }
  ctx.save();
  ctx.clip(palm);
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0.72 * h, 0.04 * h);
    ctx.lineTo(0.72 * h + Math.cos(a) * 0.8 * h, 0.04 * h + Math.sin(a) * 0.8 * h);
    ctx.stroke();
  }
  for (const rr of [0.24, 0.44]) {
    ctx.beginPath();
    ctx.ellipse(0.72 * h, 0.04 * h, rr * h, rr * 0.84 * h, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  const sheen = ctx.createRadialGradient(0.55 * h, -0.22 * h, 0, 0.55 * h, -0.22 * h, 0.45 * h);
  sheen.addColorStop(0, "rgba(255,255,255,0.18)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fill(palm);
  ctx.restore();

  // web-shooter: metal cuff + nozzle under the wrist
  ctx.beginPath();
  ctx.roundRect(-0.42 * h, -0.47 * h, 0.36 * h, 0.94 * h, 0.08 * h);
  ctx.fillStyle = metal(-0.47 * h, 0.47 * h);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 0.8;
  ctx.stroke();
  for (const xx of [-0.31, -0.17]) {
    ctx.beginPath();
    ctx.moveTo(xx * h, -0.45 * h);
    ctx.lineTo(xx * h, 0.45 * h);
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.roundRect(-0.14 * h, 0.5 * h, 0.42 * h, 0.16 * h, 0.05 * h);
  ctx.fillStyle = metal(0.5 * h, 0.66 * h);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0.28 * h, 0.58 * h, 0.05 * h, 0, Math.PI * 2);
  ctx.fillStyle = "#1b1d21";
  ctx.fill();

  ctx.restore();
}
