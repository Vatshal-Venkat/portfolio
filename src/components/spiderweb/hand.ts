/* ==========================================================================
   A realistically lit, monochrome suited hand with a machined web-shooter,
   seen from the back. Fingers are built from real phalanx proportions and
   flex in 3D: a flexed segment foreshortens (cos of its tilt) and a segment
   that turns back under the hand is hidden — so the middle and ring fingers
   genuinely fold onto the trigger for the "thwip".

   Local space: +x points at the target, wrist crease at the origin, +y is
   the pinky side. Units are palm widths (`h` px).
   ========================================================================== */

export interface HandPose {
  x: number;
  y: number;
  ang: number;
  h: number;
  /** 0 = relaxed, 1 = middle + ring fully folded onto the trigger */
  curl: number;
}

/** Spinneret orifice, local units. */
export const NOZZLE = { x: 0.41, y: 0 };

type P = [number, number];

interface FingerDef {
  base: P;
  angle: number;
  /** per-segment lateral turn: relaxed fingers gently converge on the middle */
  drift: number;
  lens: [number, number, number];
  widths: [number, number, number, number];
}

// Proportions from adult hand anthropometry (relative to palm width).
const FINGERS: Record<"index" | "middle" | "ring" | "pinky" | "thumb", FingerDef> = {
  // the thumb is rolled ~90° to the palm, so from behind it is seen side-on and foreshortened
  thumb: { base: [0.4, -0.4], angle: -0.62, drift: 0.22, lens: [0.3, 0.26, 0.22], widths: [0.3, 0.255, 0.215, 0.17] },
  index: { base: [1.1, -0.33], angle: -0.07, drift: 0.045, lens: [0.43, 0.25, 0.2], widths: [0.225, 0.2, 0.175, 0.14] },
  middle: { base: [1.16, -0.11], angle: -0.01, drift: 0.01, lens: [0.47, 0.29, 0.21], widths: [0.235, 0.21, 0.185, 0.145] },
  ring: { base: [1.13, 0.12], angle: 0.05, drift: -0.025, lens: [0.44, 0.27, 0.2], widths: [0.22, 0.195, 0.172, 0.138] },
  pinky: { base: [1.03, 0.32], angle: 0.13, drift: -0.05, lens: [0.33, 0.2, 0.17], widths: [0.19, 0.168, 0.148, 0.12] },
};

const RELAXED: [number, number, number] = [0.16, 0.22, 0.12];
const STRAIGHT: [number, number, number] = [0.05, 0.07, 0.04];
const FOLDED: [number, number, number] = [1.38, 1.65, 0.9];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─── Path helpers ──────────────────────────────────────────────────────── */

/** Catmull-Rom through points, as cubic Béziers. */
function smoothThrough(path: Path2D, pts: P[], closed: boolean, moveFirst: boolean) {
  const n = pts.length;
  const at = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  if (moveFirst) path.moveTo(pts[0][0], pts[0][1]);
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    path.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1]
    );
  }
  if (closed) path.closePath();
}

interface FingerGeom {
  path: Path2D;
  center: P[];
  widths: number[];
  folded: boolean;
}

/** Builds a finger's projected centreline from joint flexion, then its outline. */
function buildFinger(f: FingerDef, flex: [number, number, number], h: number, inset = 0.24): FingerGeom {
  const dy = Math.sin(f.angle);
  const center: P[] = [[(f.base[0] - inset) * h, (f.base[1] - dy * inset) * h]];
  const widths = [f.widths[0] * h];
  let cur: P = [f.base[0] * h, f.base[1] * h];
  center.push(cur);
  widths.push(f.widths[0] * 1.05 * h);
  let tilt = 0;
  let folded = false;
  for (let s = 0; s < 3; s++) {
    tilt += flex[s];
    const proj = f.lens[s] * Math.cos(tilt);
    if (proj <= 0.03) {
      folded = true;
      break;
    }
    const a = f.angle + f.drift * (s + 1);
    cur = [cur[0] + Math.cos(a) * proj * h, cur[1] + Math.sin(a) * proj * h];
    center.push(cur);
    widths.push(f.widths[s + 1] * (s < 2 ? 1.04 : 1) * h);
  }

  // outline: left edge out, rounded cap, right edge back
  const normals = center.map((_, i) => {
    const a = center[Math.max(0, i - 1)];
    const b = center[Math.min(center.length - 1, i + 1)];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [-(b[1] - a[1]) / l, (b[0] - a[0]) / l] as P;
  });
  const left = center.map((p, i) => [p[0] + (normals[i][0] * widths[i]) / 2, p[1] + (normals[i][1] * widths[i]) / 2] as P);
  const right = center.map((p, i) => [p[0] - (normals[i][0] * widths[i]) / 2, p[1] - (normals[i][1] * widths[i]) / 2] as P);
  const path = new Path2D();
  smoothThrough(path, left, false, true);
  const tip = center[center.length - 1];
  const nTip = normals[normals.length - 1];
  const an = Math.atan2(nTip[1], nTip[0]);
  path.arc(tip[0], tip[1], widths[widths.length - 1] / 2, an, an - Math.PI, true);
  smoothThrough(path, right.slice().reverse(), false, false);
  path.closePath();
  return { path, center, widths, folded };
}

/* ─── Materials ─────────────────────────────────────────────────────────── */

let grainCache: HTMLCanvasElement | null = null;
/** Woven suit fabric: fine noise plus a tight diagonal twill. */
function fabricGrain(): HTMLCanvasElement | null {
  if (grainCache || typeof document === "undefined") return grainCache;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  if (!g) return null;
  const img = g.createImageData(64, 64);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 110 + Math.random() * 60;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  g.strokeStyle = "rgba(0,0,0,0.18)";
  g.lineWidth = 1;
  for (let k = -64; k < 128; k += 3) {
    g.beginPath();
    g.moveTo(k, 0);
    g.lineTo(k + 64, 64);
    g.stroke();
  }
  grainCache = c;
  return c;
}

/** Cylinder shading across a limb of width `w` centred on (cx, cy) with normal n. */
function cylinderFill(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  nx: number,
  ny: number,
  w: number,
  litPositive: boolean,
  tone: "fabric" | "steel"
) {
  const g = ctx.createLinearGradient(cx + (nx * w) / 2, cy + (ny * w) / 2, cx - (nx * w) / 2, cy - (ny * w) / 2);
  const fabric = ["#d2d2d2", "#a9a9a9", "#7b7b7b", "#4a4a4a", "#1d1d1d"];
  const steel = ["#ffffff", "#c9ccd1", "#7d828a", "#43474d", "#9aa0a8"];
  const c = tone === "fabric" ? fabric : steel;
  // stops from the +n edge (0) to the −n edge (1); highlight sits on the lit side
  const stops: [number, string][] = litPositive
    ? [
        [0, c[2]],
        [0.2, c[0]],
        [0.38, c[1]],
        [0.72, c[3]],
        [1, c[4]],
      ]
    : [
        [0, c[4]],
        [0.28, c[3]],
        [0.62, c[1]],
        [0.8, c[0]],
        [1, c[2]],
      ];
  if (tone === "steel") stops.splice(3, 0, [litPositive ? 0.55 : 0.45, c[2]]);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  return g;
}

/** An embossed seam: a dark groove with a lit lip on the light side. */
function seam(ctx: CanvasRenderingContext2D, path: Path2D, lx: number, ly: number) {
  ctx.strokeStyle = "rgba(0,0,0,0.32)";
  ctx.lineWidth = 0.9;
  ctx.stroke(path);
  ctx.save();
  ctx.translate(lx * 0.6, ly * 0.6);
  ctx.strokeStyle = "rgba(255,255,255,0.13)";
  ctx.lineWidth = 0.6;
  ctx.stroke(path);
  ctx.restore();
}

/* ─── The hand ──────────────────────────────────────────────────────────── */

export function drawHand(ctx: CanvasRenderingContext2D, p: HandPose) {
  const h = p.h;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.ang);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // key light from the top-left of the screen, expressed in hand space
  const sl = Math.atan2(-0.83, -0.55) - p.ang;
  const lx = Math.cos(sl);
  const ly = Math.sin(sl);
  const lit = (nx: number, ny: number) => nx * lx + ny * ly > 0;

  /* geometry */
  const forearm = new Path2D();
  smoothThrough(
    forearm,
    [
      [-8 * h, -0.62 * h],
      [-3 * h, -0.57 * h],
      [-1 * h, -0.48 * h],
      [0.12 * h, -0.42 * h],
    ],
    false,
    true
  );
  forearm.lineTo(0.12 * h, 0.43 * h);
  smoothThrough(
    forearm,
    [
      [0.12 * h, 0.43 * h],
      [-1 * h, 0.49 * h],
      [-3 * h, 0.58 * h],
      [-8 * h, 0.63 * h],
    ],
    false,
    false
  );
  forearm.closePath();

  const palm = new Path2D();
  smoothThrough(
    palm,
    (
      [
        [0.05, -0.42],
        [0.38, -0.5],
        [0.8, -0.5],
        [1.12, -0.46],
        [1.21, -0.3],
        [1.24, -0.1],
        [1.21, 0.13],
        [1.12, 0.33],
        [0.98, 0.47],
        [0.55, 0.48],
        [0.05, 0.43],
      ] as P[]
    ).map(([x, y]) => [x * h, y * h] as P),
    true,
    true
  );

  const cu = p.curl;
  const thumb = buildFinger(FINGERS.thumb, [0.42, 0.38, 0.3], h);
  const fingers = [
    buildFinger(FINGERS.pinky, STRAIGHT, h),
    buildFinger(
      FINGERS.ring,
      [lerp(RELAXED[0], FOLDED[0], cu), lerp(RELAXED[1], FOLDED[1], cu), lerp(RELAXED[2], FOLDED[2], cu)],
      h
    ),
    buildFinger(
      FINGERS.middle,
      [lerp(RELAXED[0], FOLDED[0], cu), lerp(RELAXED[1], FOLDED[1], cu), lerp(RELAXED[2], FOLDED[2], cu)],
      h
    ),
    buildFinger(FINGERS.index, STRAIGHT, h),
  ];

  const silhouette = new Path2D();
  silhouette.addPath(forearm);
  silhouette.addPath(palm);
  silhouette.addPath(thumb.path);
  fingers.forEach((f) => silhouette.addPath(f.path));

  /* soft shadow of the whole hand falling on the scene below */
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = h * 0.45;
  ctx.shadowOffsetX = -lx * h * 0.28;
  ctx.shadowOffsetY = -ly * h * 0.28;
  ctx.fillStyle = "#2a2a2a";
  ctx.fill(silhouette);
  ctx.restore();

  /* forearm: a cylinder with seams that wrap around it */
  ctx.save();
  ctx.clip(forearm);
  ctx.fillStyle = cylinderFill(ctx, -2 * h, 0, 0, -1, 1.2 * h, lit(0, -1), "fabric");
  ctx.fillRect(-8.2 * h, -0.8 * h, 8.5 * h, 1.6 * h);
  for (const th of [-1.2, -0.6, 0, 0.6, 1.2]) {
    const s = new Path2D();
    const yy = Math.sin(th) * 0.5;
    s.moveTo(-8 * h, yy * 1.22 * h);
    s.lineTo(0.15 * h, yy * 0.84 * h);
    seam(ctx, s, lx, ly);
  }
  for (let xx = -1.0; xx > -8; xx -= 0.78) {
    const s = new Path2D();
    const half = 0.5 + (-xx / 8) * 0.12;
    s.moveTo(xx * h, -half * 1.3 * h);
    s.quadraticCurveTo((xx + 0.2) * h, 0, xx * h, half * 1.3 * h);
    seam(ctx, s, lx, ly);
  }
  ctx.restore();

  /* thumb and extended fingers go under the back of the hand, so the palm's
     knuckle line overlaps their bases the way skin does */
  drawDigit(ctx, thumb, lit, lx, ly, h);
  const tucked = cu > 0.5;
  fingers.forEach((f, i) => {
    if (!(tucked && (i === 1 || i === 2))) drawDigit(ctx, f, lit, lx, ly, h);
  });

  /* back of the hand */
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = h * 0.12;
  ctx.fillStyle = "#808080";
  ctx.fill(palm);
  ctx.restore();
  ctx.save();
  ctx.clip(palm);
  ctx.fillStyle = cylinderFill(ctx, 0.65 * h, 0, 0, -1, 1.05 * h, lit(0, -1), "fabric");
  ctx.fillRect(-0.2 * h, -0.7 * h, 1.6 * h, 1.4 * h);
  // dome highlight where the key light hits the back of the hand
  const dome = ctx.createRadialGradient(0.62 * h + lx * 0.2 * h, ly * 0.2 * h, 0, 0.62 * h, 0, 0.7 * h);
  dome.addColorStop(0, "rgba(255,255,255,0.28)");
  dome.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = dome;
  ctx.fillRect(-0.2 * h, -0.7 * h, 1.6 * h, 1.4 * h);
  // extensor tendons fanning to the knuckles
  for (const fy of [-0.34, -0.11, 0.12, 0.33]) {
    const t = new Path2D();
    t.moveTo(0.28 * h, fy * 0.35 * h);
    t.quadraticCurveTo(0.7 * h, fy * 0.7 * h, 1.06 * h, fy * h);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 0.06 * h;
    ctx.stroke(t);
    ctx.save();
    ctx.translate(-lx * 0.04 * h, -ly * 0.04 * h);
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 0.035 * h;
    ctx.stroke(t);
    ctx.restore();
  }
  // knuckle bumps
  for (const f of [FINGERS.index, FINGERS.middle, FINGERS.ring, FINGERS.pinky]) {
    const kx = (f.base[0] - 0.04) * h;
    const ky = f.base[1] * h;
    const k = ctx.createRadialGradient(kx + lx * 0.04 * h, ky + ly * 0.04 * h, 0, kx, ky, 0.14 * h);
    k.addColorStop(0, "rgba(255,255,255,0.3)");
    k.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = k;
    ctx.fillRect(kx - 0.2 * h, ky - 0.2 * h, 0.4 * h, 0.4 * h);
  }
  // web seams radiating over the back of the hand
  const hub: P = [0.55 * h, 0.04 * h];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 + 0.2;
    const s = new Path2D();
    s.moveTo(hub[0], hub[1]);
    s.lineTo(hub[0] + Math.cos(a) * 0.9 * h, hub[1] + Math.sin(a) * 0.9 * h);
    seam(ctx, s, lx, ly);
  }
  for (const r of [0.3, 0.58]) {
    const s = new Path2D();
    s.ellipse(hub[0], hub[1], r * h * 1.15, r * h, 0, 0, Math.PI * 2);
    seam(ctx, s, lx, ly);
  }
  // occlusion under the shooter
  const ao = ctx.createLinearGradient(0, 0, 0.45 * h, 0);
  ao.addColorStop(0, "rgba(0,0,0,0.55)");
  ao.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = ao;
  ctx.fillRect(-0.1 * h, -0.7 * h, 0.55 * h, 1.4 * h);
  ctx.restore();

  /* folded middle + ring knuckles sit on top of the hand; built with a short
     inset and no outline so they rise out of the knuckle line, not off a seam */
  if (tucked) {
    const fold: [number, number, number] = [
      lerp(RELAXED[0], FOLDED[0], cu),
      lerp(RELAXED[1], FOLDED[1], cu),
      lerp(RELAXED[2], FOLDED[2], cu),
    ];
    [FINGERS.ring, FINGERS.middle].forEach((def) => drawDigit(ctx, buildFinger(def, fold, h, 0.03), lit, lx, ly, h, true));
  }

  /* fabric weave over the whole glove */
  const grain = fabricGrain();
  if (grain) {
    const pat = ctx.createPattern(grain, "repeat");
    if (pat) {
      ctx.save();
      ctx.clip(silhouette);
      ctx.globalCompositeOperation = "soft-light";
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = pat;
      ctx.fillRect(-8.2 * h, -1.6 * h, 10.5 * h, 3.2 * h);
      ctx.restore();
    }
  }

  drawShooter(ctx, h, lit, lx, ly);
  ctx.restore();
}

/** One finger (or the thumb): cast shadow, cylinder shading, knuckles, creases, seams. */
function drawDigit(
  ctx: CanvasRenderingContext2D,
  f: FingerGeom,
  lit: (nx: number, ny: number) => boolean,
  lx: number,
  ly: number,
  h: number,
  soft = false
) {
  const c = f.center;
  const a = c[1];
  const b = c[c.length - 1];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = -(b[1] - a[1]) / len;
  const ny = (b[0] - a[0]) / len;
  const wMax = Math.max(...f.widths);

  // contact shadow onto the hand / neighbouring finger
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 0.12 * h;
  ctx.shadowOffsetX = -lx * 0.05 * h;
  ctx.shadowOffsetY = -ly * 0.05 * h;
  ctx.fillStyle = "#7a7a7a";
  ctx.fill(f.path);
  ctx.restore();

  ctx.save();
  ctx.clip(f.path);
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  ctx.fillStyle = cylinderFill(ctx, mx, my, nx, ny, wMax, lit(nx, ny), "fabric");
  ctx.fillRect(Math.min(a[0], b[0]) - h, Math.min(a[1], b[1]) - h, Math.abs(b[0] - a[0]) + 2 * h, Math.abs(b[1] - a[1]) + 2 * h);

  // knuckles: the MCP, and the PIP (which is the visible end of a folded finger)
  const knuckles = f.folded ? [c[1], c[c.length - 1]] : c.slice(1, 3);
  knuckles.forEach((k, i) => {
    const r = (f.widths[Math.min(i + 1, f.widths.length - 1)] ?? wMax) * 0.7;
    const g = ctx.createRadialGradient(k[0] + lx * r * 0.35, k[1] + ly * r * 0.35, 0, k[0], k[1], r);
    g.addColorStop(0, `rgba(255,255,255,${f.folded && i === 1 ? 0.38 : 0.24})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(k[0] - r, k[1] - r, 2 * r, 2 * r);
  });

  // skin-tight fabric wrinkles across the PIP and DIP joints
  for (let j = 2; j < c.length - 1; j++) {
    const p = c[j];
    const w = f.widths[j] * 0.42;
    for (const off of [-0.035, 0.035]) {
      const s = new Path2D();
      const ox = (b[0] - a[0]) / len;
      const oy = (b[1] - a[1]) / len;
      s.moveTo(p[0] + nx * w + ox * off * h, p[1] + ny * w + oy * off * h);
      s.quadraticCurveTo(
        p[0] + ox * (off + 0.03) * h,
        p[1] + oy * (off + 0.03) * h,
        p[0] - nx * w + ox * off * h,
        p[1] - ny * w + oy * off * h
      );
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 0.8;
      ctx.stroke(s);
    }
  }

  // web seam down the finger
  if (c.length > 3) {
    const s = new Path2D();
    s.moveTo(a[0], a[1]);
    for (let i = 2; i < c.length; i++) s.lineTo(c[i][0], c[i][1]);
    seam(ctx, s, lx, ly);
  }

  // rim light on the shadow side (bounce from the silk below)
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1.2;
  ctx.stroke(f.path);
  ctx.restore();

  if (!soft) {
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.lineWidth = 0.8;
    ctx.stroke(f.path);
  }
}

/* ─── Web-shooter ───────────────────────────────────────────────────────── */

function drawShooter(
  ctx: CanvasRenderingContext2D,
  h: number,
  lit: (nx: number, ny: number) => boolean,
  lx: number,
  ly: number
) {
  const litTop = lit(0, -1);
  const shadow = () => {
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 0.16 * h;
    ctx.shadowOffsetX = -lx * 0.07 * h;
    ctx.shadowOffsetY = -ly * 0.07 * h;
  };

  // segmented wrist bands wrapping round the wrist
  for (const bx of [-0.56, -0.02]) {
    const band = new Path2D();
    band.roundRect(bx * h, -0.5 * h, 0.13 * h, 1.0 * h, 0.03 * h);
    ctx.save();
    shadow();
    ctx.fillStyle = "#3b3e43";
    ctx.fill(band);
    ctx.restore();
    ctx.save();
    ctx.clip(band);
    // wraps around: bright across the top, falling off toward the sides
    const g = ctx.createLinearGradient(0, -0.5 * h, 0, 0.5 * h);
    g.addColorStop(0, "#1b1d20");
    g.addColorStop(litTop ? 0.3 : 0.7, "#8b9098");
    g.addColorStop(0.5, "#5b5f66");
    g.addColorStop(litTop ? 0.7 : 0.3, "#33363b");
    g.addColorStop(1, "#141518");
    ctx.fillStyle = g;
    ctx.fillRect(bx * h, -0.5 * h, 0.13 * h, h);
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.lineWidth = 0.6;
    for (let yy = -0.46; yy < 0.5; yy += 0.075) {
      const sp = Math.cos((yy / 0.5) * 1.3); // links bunch up as they turn away
      ctx.beginPath();
      ctx.moveTo(bx * h, yy * h);
      ctx.lineTo((bx + 0.13) * h, yy * h);
      ctx.globalAlpha = 0.4 + 0.6 * sp;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // main housing — machined plate with chamfered edges
  const housing = new Path2D();
  housing.roundRect(-0.64 * h, -0.31 * h, 0.78 * h, 0.62 * h, 0.08 * h);
  ctx.save();
  shadow();
  ctx.fillStyle = "#6c7078";
  ctx.fill(housing);
  ctx.restore();
  ctx.save();
  ctx.clip(housing);
  ctx.fillStyle = cylinderFill(ctx, -0.25 * h, 0, 0, -1, 0.66 * h, litTop, "steel");
  ctx.fillRect(-0.7 * h, -0.4 * h, 0.9 * h, 0.8 * h);
  // brushed grain along the length
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.lineWidth = 0.5;
  for (let yy = -0.3; yy < 0.31; yy += 0.022) {
    ctx.beginPath();
    ctx.moveTo(-0.64 * h, yy * h);
    ctx.lineTo(0.14 * h, (yy + 0.004) * h);
    ctx.stroke();
  }
  ctx.restore();
  // chamfer: lit lip + shadowed lip
  ctx.save();
  ctx.translate(lx * 0.012 * h, ly * 0.012 * h);
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 0.9;
  ctx.stroke(housing);
  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,0.85)";
  ctx.lineWidth = 0.9;
  ctx.stroke(housing);

  // recessed panel line + vents
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.roundRect(-0.6 * h, -0.27 * h, 0.7 * h, 0.54 * h, 0.06 * h);
  ctx.stroke();
  for (let k = 0; k < 5; k++) {
    const vx = (-0.56 + k * 0.05) * h;
    ctx.beginPath();
    ctx.moveTo(vx, 0.17 * h);
    ctx.lineTo(vx, 0.24 * h);
    ctx.strokeStyle = "rgba(0,0,0,0.75)";
    ctx.lineWidth = 1.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(vx + 0.012 * h, 0.17 * h);
    ctx.lineTo(vx + 0.012 * h, 0.24 * h);
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // web-fluid cartridge: a glass-walled cylinder seated in the housing
  const cart = new Path2D();
  cart.roundRect(-0.5 * h, -0.12 * h, 0.46 * h, 0.24 * h, 0.12 * h);
  ctx.save();
  shadow();
  ctx.fillStyle = "#26282c";
  ctx.fill(cart);
  ctx.restore();
  ctx.save();
  ctx.clip(cart);
  const glass = ctx.createLinearGradient(0, -0.12 * h, 0, 0.12 * h);
  glass.addColorStop(0, "#0b0c0e");
  glass.addColorStop(litTop ? 0.25 : 0.75, "#3a3e44");
  glass.addColorStop(0.5, "#15171a");
  glass.addColorStop(1, "#08090a");
  ctx.fillStyle = glass;
  ctx.fillRect(-0.5 * h, -0.12 * h, 0.46 * h, 0.24 * h);
  // fluid, settled on the gravity side, with a meniscus
  ctx.beginPath();
  ctx.moveTo(-0.5 * h, 0.0 * h);
  ctx.bezierCurveTo(-0.38 * h, -0.03 * h, -0.16 * h, -0.03 * h, -0.04 * h, 0.0 * h);
  ctx.lineTo(-0.04 * h, 0.12 * h);
  ctx.lineTo(-0.5 * h, 0.12 * h);
  ctx.closePath();
  const fluid = ctx.createLinearGradient(0, -0.02 * h, 0, 0.12 * h);
  fluid.addColorStop(0, "rgba(235,238,242,0.85)");
  fluid.addColorStop(1, "rgba(150,155,162,0.6)");
  ctx.fillStyle = fluid;
  ctx.fill();
  // glass specular streak
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillRect(-0.46 * h, (litTop ? -0.085 : 0.06) * h, 0.38 * h, 0.018 * h);
  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,0.9)";
  ctx.lineWidth = 0.8;
  ctx.stroke(cart);
  // graduation ticks
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 0.5;
  for (let k = 0; k < 6; k++) {
    const tx = (-0.44 + k * 0.07) * h;
    ctx.beginPath();
    ctx.moveTo(tx, -0.12 * h);
    ctx.lineTo(tx, (-0.12 + (k % 2 ? 0.035 : 0.06)) * h);
    ctx.stroke();
  }

  // knurled rear cap
  const cap = new Path2D();
  cap.roundRect(-0.6 * h, -0.1 * h, 0.1 * h, 0.2 * h, 0.03 * h);
  ctx.save();
  ctx.clip(cap);
  ctx.fillStyle = cylinderFill(ctx, -0.55 * h, 0, 0, -1, 0.2 * h, litTop, "steel");
  ctx.fillRect(-0.6 * h, -0.1 * h, 0.1 * h, 0.2 * h);
  ctx.strokeStyle = "rgba(0,0,0,0.45)";
  ctx.lineWidth = 0.5;
  for (let k = 0; k < 9; k++) {
    const yy = (-0.1 + (k + 0.5) * (0.2 / 9)) * h;
    ctx.beginPath();
    ctx.moveTo(-0.6 * h, yy);
    ctx.lineTo(-0.5 * h, yy);
    ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,0.8)";
  ctx.lineWidth = 0.7;
  ctx.stroke(cap);

  // selector toggle on the pinky side
  ctx.beginPath();
  ctx.roundRect(-0.3 * h, 0.17 * h, 0.16 * h, 0.08 * h, 0.03 * h);
  ctx.fillStyle = "#1c1e21";
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(-0.22 * h, 0.175 * h, 0.06 * h, 0.07 * h, 0.02 * h);
  ctx.fillStyle = cylinderFill(ctx, -0.19 * h, 0.21 * h, 0, -1, 0.07 * h, litTop, "steel");
  ctx.fill();

  // Phillips screws at the corners
  for (const [sx, sy] of [
    [-0.58, -0.25],
    [-0.58, 0.25],
    [0.08, -0.25],
    [0.08, 0.25],
  ]) {
    const r = 0.03 * h;
    const g = ctx.createRadialGradient(sx * h + lx * r * 0.4, sy * h + ly * r * 0.4, 0, sx * h, sy * h, r);
    g.addColorStop(0, "#f2f3f5");
    g.addColorStop(1, "#5f636a");
    ctx.beginPath();
    ctx.arc(sx * h, sy * h, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(sx * h - r * 0.6, sy * h);
    ctx.lineTo(sx * h + r * 0.6, sy * h);
    ctx.moveTo(sx * h, sy * h - r * 0.6);
    ctx.lineTo(sx * h, sy * h + r * 0.6);
    ctx.stroke();
  }

  // spinneret turret: ringed barrel → tapered cone → orifice
  const barrel = new Path2D();
  barrel.roundRect(0.1 * h, -0.075 * h, 0.2 * h, 0.15 * h, 0.02 * h);
  ctx.save();
  shadow();
  ctx.fillStyle = "#777b82";
  ctx.fill(barrel);
  ctx.restore();
  ctx.save();
  ctx.clip(barrel);
  ctx.fillStyle = cylinderFill(ctx, 0.2 * h, 0, 0, -1, 0.15 * h, litTop, "steel");
  ctx.fillRect(0.1 * h, -0.08 * h, 0.2 * h, 0.16 * h);
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 0.7;
  for (const rx of [0.15, 0.19, 0.23]) {
    ctx.beginPath();
    ctx.moveTo(rx * h, -0.08 * h);
    ctx.lineTo(rx * h, 0.08 * h);
    ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,0.85)";
  ctx.lineWidth = 0.7;
  ctx.stroke(barrel);

  const cone = new Path2D();
  cone.moveTo(0.3 * h, -0.065 * h);
  cone.lineTo((NOZZLE.x - 0.015) * h, -0.028 * h);
  cone.quadraticCurveTo(NOZZLE.x * h, 0, (NOZZLE.x - 0.015) * h, 0.028 * h);
  cone.lineTo(0.3 * h, 0.065 * h);
  cone.closePath();
  ctx.save();
  ctx.clip(cone);
  ctx.fillStyle = cylinderFill(ctx, 0.35 * h, 0, 0, -1, 0.13 * h, litTop, "steel");
  ctx.fillRect(0.3 * h, -0.07 * h, 0.12 * h, 0.14 * h);
  ctx.restore();
  ctx.strokeStyle = "rgba(0,0,0,0.85)";
  ctx.lineWidth = 0.7;
  ctx.stroke(cone);
  ctx.beginPath();
  ctx.ellipse((NOZZLE.x - 0.008) * h, 0, 0.008 * h, 0.018 * h, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#050506";
  ctx.fill();
}
