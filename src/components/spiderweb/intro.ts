/* ==========================================================================
   Intro: Spider-Man reaches in from above, squeezes the trigger, and his
   web-shooter fires a single hairline strand to the hub — THWIP. The strand
   bursts into spokes, the spiral winds itself outward, the hand pulls away
   and the spider abseils in. The animation only *reveals* the live physics
   web thread by thread, so its last frame is exactly the resting web.
   ========================================================================== */

import { K_ANCHOR, K_FRAME, K_HUB, K_SPIRAL, K_SPOKE, pluck, type Vec, type WebModel } from "./engine";
import { easeTravel } from "@howells/hairline/kit";
import type { OverlayFrame, Seg } from "./HairlineOverlay";
import { drawHand, preloadGlove, NOZZLE, type HandPose } from "./hand";

export interface OrbPos {
  x: number;
  y: number;
  a: number;
}

/** Timeline in ms — unhurried enough that every beat reads. */
export const T = {
  HAND_IN: 750, // hand descends from above
  THWIP: 1000, // strand fires
  IMPACT: 1600, // thinking orb hits the hub
  SPOKE_DUR: 650,
  FRAME: 2100,
  ANCHOR: 2250,
  SPIRAL: 2150,
  SPIRAL_DUR: 1250,
  BEADS: 2300,
  BEADS_SPREAD: 1100,
  RELEASE: 3250, // shooter line detaches
  HAND_OUT: 3300,
  HAND_OUT_DUR: 480,
  DROP: 3450, // spider abseils in
  DROP_END: 4150,
  TOTAL: 4250,
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
export const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export class WebIntro {
  private dist: Float32Array;
  private maxD = 1;
  private spiral: number[] = [];
  private rank: Int32Array;
  private counts: Record<number, number> = {};
  private spokeEnds: number[];
  private impacted = false;
  private lastNozzle: Vec | null = null;
  private font: string;

  constructor(private m: WebModel) {
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
    this.font = typeof document !== "undefined" ? getComputedStyle(document.body).fontFamily : "sans-serif";
    preloadGlove();
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
          const start = T.FRAME + (this.rank[i] / this.counts[K_FRAME]) * 160;
          r = (it - start) / 220;
          break;
        }
        case K_ANCHOR: {
          const start = T.ANCHOR + (this.rank[i] / this.counts[K_ANCHOR]) * 160;
          r = easeOutCubic(clamp01((it - start) / 280));
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
    const f = clamp01((it - start) / 280);
    return f <= 0 ? 0 : easeOutBack(f);
  }

  /** Where the abseiling spider hangs at time `it`. */
  dropY(it: number) {
    const hub = this.m.points[this.m.hub];
    const f = clamp01((it - T.DROP) / (T.DROP_END - T.DROP));
    return -60 + (hub.y + 60) * easeOutBack(f);
  }

  /** The hand reaches in from above-left, aimed down at the hub. */
  private hand(it: number): HandPose | null {
    const m = this.m;
    const hub = m.points[m.hub];
    const h = 92 * Math.max(0.6, m.scale);
    const bx = hub.x - Math.min(m.W * 0.25, 300 * Math.max(0.62, m.scale));
    // high enough that the faded sleeve runs off the top edge
    const by = Math.max(h * 0.95, hub.y * 0.26);
    const baseAng = Math.atan2(hub.y - by, hub.x - bx);
    const dx = Math.cos(baseAng);
    const dy = Math.sin(baseAng);

    const inOff = (1 - easeOutCubic(clamp01(it / T.HAND_IN))) * 7.5 * h;
    const k = it >= T.THWIP ? clamp01(1 - (it - T.THWIP) / 240) : 0;
    const recoil = 0.5 * h * k * k;
    const outF = clamp01((it - T.HAND_OUT) / T.HAND_OUT_DUR);
    if (outF >= 1) return null;
    const outOff = easeInCubic(outF) * 8 * h;
    const back = inOff + recoil + outOff;
    const sway = it < T.THWIP ? Math.sin(it * 0.006) * 0.02 : 0;
    // The hand points straight at the hub: the strand flies out through the gap
    // the folded middle + ring fingers leave.
    const ang = baseAng - 0.12 * k * k + sway;
    return { x: bx - dx * back, y: by - dy * back, ang, h };
  }

  private nozzle(p: HandPose): Vec {
    const lx = NOZZLE.x * p.h;
    const ly = NOZZLE.y * p.h;
    const c = Math.cos(p.ang);
    const s = Math.sin(p.ang);
    return { x: p.x + lx * c - ly * s, y: p.y + lx * s + ly * c };
  }

  /** Where the fired strand runs at time `it` (null when there is none). */
  private strandAt(it: number, noz: Vec | null): Seg | null {
    const hub = this.m.points[this.m.hub];
    if (!noz || it < T.THWIP || it >= T.RELEASE + 260) return null;
    if (it < T.IMPACT) {
      // Hairline's travel easing (ease-in-out-quart) for the shot
      const f = easeTravel(clamp01((it - T.THWIP) / (T.IMPACT - T.THWIP)));
      return { x0: noz.x, y0: noz.y, x1: noz.x + (hub.x - noz.x) * f, y1: noz.y + (hub.y - noz.y) * f, alpha: 1 };
    }
    if (it >= T.RELEASE && this.lastNozzle) {
      // released: the loose end whips back into the hub
      const f = easeOutCubic((it - T.RELEASE) / 260);
      return {
        x0: this.lastNozzle.x + (hub.x - this.lastNozzle.x) * f,
        y0: this.lastNozzle.y + (hub.y - this.lastNozzle.y) * f,
        x1: hub.x,
        y1: hub.y,
        alpha: 1 - f,
      };
    }
    return { x0: noz.x, y0: noz.y, x1: hub.x, y1: hub.y, alpha: 1 };
  }

  private currentNozzle(it: number) {
    const pose = this.hand(it);
    const noz = pose ? this.nozzle(pose) : this.lastNozzle;
    if (pose && it <= T.RELEASE) this.lastNozzle = noz;
    return { pose, noz };
  }

  /** Engraved hairline layer: aim guide, fired strand, impact ring, callouts. */
  overlay(it: number, skillCount: number): OverlayFrame {
    const m = this.m;
    const hub = m.points[m.hub];
    const sc = Math.max(0.7, m.scale);
    const { pose, noz } = this.currentNozzle(it);
    const frame: OverlayFrame = { plates: [] };

    if (pose && noz && it >= T.HAND_IN - 200 && it < T.THWIP + 160) {
      const a = Math.min(clamp01((it - (T.HAND_IN - 200)) / 220), 1 - clamp01((it - T.THWIP) / 160));
      frame.aim = { x0: noz.x, y0: noz.y, x1: hub.x, y1: hub.y, alpha: a * 0.9 };
    }

    const strand = this.strandAt(it, noz);
    if (strand) frame.strand = strand;

    if (it >= T.IMPACT && it < T.IMPACT + 700) {
      const f = (it - T.IMPACT) / 700;
      frame.ring = { cx: hub.x, cy: hub.y, r: (8 + easeOutCubic(f) * 120) * sc, alpha: 1 - f };
    }

    // callout on the web-shooter while it is being aimed
    if (pose && noz && it >= T.HAND_IN - 100 && it < T.THWIP + 500) {
      const a = Math.min(clamp01((it - (T.HAND_IN - 100)) / 250), 1 - clamp01((it - (T.THWIP + 200)) / 300));
      const dir = Math.atan2(hub.y - noz.y, hub.x - noz.x);
      frame.plates!.push({
        // in the open space just above the shooter
        x: noz.x + Math.cos(dir - Math.PI / 2) * 62 * sc + Math.cos(dir) * 6 * sc,
        y: noz.y + Math.sin(dir - Math.PI / 2) * 62 * sc + Math.sin(dir) * 6 * sc,
        anchor: "start",
        lead: "Web-shooter",
        text: it < T.THWIP ? "armed" : "fired",
        alpha: a,
      });
    }

    // and on the hub once the strand lands
    const hubEnd = T.SPIRAL + T.SPIRAL_DUR;
    if (it >= T.IMPACT + 150 && it < hubEnd + 300) {
      const a = Math.min(clamp01((it - (T.IMPACT + 150)) / 300), 1 - clamp01((it - hubEnd) / 300));
      frame.plates!.push({
        x: hub.x + 48 * sc,
        y: hub.y - 56 * sc,
        lead: "One strand",
        text: `${skillCount} skills`,
        alpha: a,
      });
    }
    return frame;
  }

  /** Positions for the three thinking-orbs (null = hidden). */
  orbs(it: number): { shot: OrbPos | null; hub: OrbPos | null; spiral: OrbPos | null } {
    const m = this.m;
    const P = m.points;
    const hub = P[m.hub];
    const noz = this.lastNozzle;
    const strand = it < T.IMPACT ? this.strandAt(it, noz) : null;
    const shot = strand ? { x: strand.x1, y: strand.y1, a: 1 } : null;

    const hubEnd = T.SPIRAL + T.SPIRAL_DUR;
    let hubOrb: OrbPos | null = null;
    if (it >= T.IMPACT - 40 && it < hubEnd + 260) {
      const a = Math.min(clamp01((it - (T.IMPACT - 40)) / 140), 1 - clamp01((it - hubEnd) / 260));
      hubOrb = { x: hub.x, y: hub.y, a };
    }

    let spiral: OrbPos | null = null;
    const q = ((it - T.SPIRAL) / T.SPIRAL_DUR) * this.spiral.length;
    if (q > 0 && q < this.spiral.length) {
      const th = m.threads[this.spiral[Math.floor(q)]];
      const f = q - Math.floor(q);
      const a = P[th.a];
      const b = P[th.b];
      spiral = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, a: Math.min(1, (this.spiral.length - q) / 12) };
    }
    return { shot, hub: hubOrb, spiral };
  }

  /** Canvas part of the intro: the hand, muzzle flash, THWIP and spoke-tip glints. */
  draw(ctx: CanvasRenderingContext2D, it: number, t: number) {
    const m = this.m;
    const P = m.points;
    const hub = P[m.hub];
    const sc = Math.max(0.7, m.scale);
    const { pose, noz } = this.currentNozzle(it);

    // muzzle flash + speed lines
    if (noz && pose && it >= T.THWIP && it < T.THWIP + 220) {
      const f = (it - T.THWIP) / 220;
      drawOrb(ctx, noz.x, noz.y, (3 + f * 6) * sc, 1 - f, t, 0);
      const dir = Math.atan2(hub.y - noz.y, hub.x - noz.x);
      ctx.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - f)).toFixed(3)})`;
      ctx.lineWidth = 0.7;
      for (const off of [-0.32, 0, 0.32]) {
        const a = dir + off;
        const r0 = (10 + f * 18) * sc;
        const r1 = r0 + 14 * sc;
        ctx.beginPath();
        ctx.moveTo(noz.x + Math.cos(a) * r0, noz.y + Math.sin(a) * r0);
        ctx.lineTo(noz.x + Math.cos(a) * r1, noz.y + Math.sin(a) * r1);
        ctx.stroke();
      }
    }

    // THWIP! — hairline comic lettering out along the strand
    if (noz && it >= T.THWIP && it < T.THWIP + 1100) {
      const e = it - T.THWIP;
      const pop = e < 160 ? 0.6 + (e / 160) * 0.5 : e < 260 ? 1.1 - ((e - 160) / 100) * 0.1 : 1;
      const a = e < 700 ? 1 : 1 - (e - 700) / 400;
      const dir = Math.atan2(hub.y - noz.y, hub.x - noz.x);
      const px = noz.x + Math.cos(dir - Math.PI / 2) * 52 * sc + Math.cos(dir) * 235 * sc;
      const py = noz.y + Math.sin(dir - Math.PI / 2) * 52 * sc + Math.sin(dir) * 235 * sc;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(-0.14);
      ctx.scale(pop, pop);
      ctx.font = `italic 800 ${Math.round(26 * sc)}px ${this.font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      ctx.fillStyle = `rgba(255,255,255,${(0.08 * a).toFixed(3)})`;
      ctx.fillText("THWIP!", 0, 0);
      ctx.strokeStyle = `rgba(255,255,255,${(0.95 * a).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.strokeText("THWIP!", 0, 0);
      ctx.restore();
    }

    // a small glint rides the tip of every spoke as it shoots out
    if (it >= T.IMPACT) {
      const front = this.front(it);
      this.spokeEnds.forEach((end) => {
        const L = this.dist[end] || 1;
        const a = front < L ? 1 : 1 - (front - L) / (60 * sc);
        if (a <= 0) return;
        const e = P[end];
        const f = Math.min(1, front / L);
        drawOrb(ctx, hub.x + (e.x - hub.x) * f, hub.y + (e.y - hub.y) * f, 2 * sc, a, t, 0);
      });
    }

    if (pose) drawHand(ctx, pose);
  }
}

/** A small glowing glint: hot core, soft glow, hairline halo. */
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
