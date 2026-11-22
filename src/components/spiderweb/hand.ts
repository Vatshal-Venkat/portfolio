/* ==========================================================================
   The web-slinger's hand: a photographic glove (public/glove_thwip.png,
   derived from glove_no_bg.png with its baked-in strand removed and the cut
   sleeve faded into shadow). The image is anchored on the web-shooter's
   orifice, so the animated strand leaves the real nozzle, and its +x axis
   (the direction the strand fired in the photo) is aimed at the hub.
   ========================================================================== */

export interface HandPose {
  x: number;
  y: number;
  ang: number;
  /** on-screen size: roughly the back-of-hand width in px */
  h: number;
}

/** The nozzle is the image anchor, so it sits at the pose origin. */
export const NOZZLE = { x: 0, y: 0 };

const SRC = "/glove_thwip.png";
/** Spinneret orifice in the source image, px. */
const ANCHOR = { x: 304, y: 431 };
/** Back-of-hand width in the source image, px. */
const PALM_PX = 170;

let img: HTMLImageElement | null = null;

/** Starts loading the glove (safe to call repeatedly; no-op on the server). */
export function preloadGlove() {
  if (!img && typeof Image !== "undefined") {
    img = new Image();
    img.decoding = "async";
    img.src = SRC;
  }
  return img;
}

export function drawHand(ctx: CanvasRenderingContext2D, p: HandPose) {
  const im = preloadGlove();
  if (!im || !im.complete || !im.naturalWidth) return;
  const s = p.h / PALM_PX;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.ang);
  ctx.scale(s, s);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  // soft shadow so the hand floats above the web
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 12;
  ctx.drawImage(im, -ANCHOR.x, -ANCHOR.y);
  ctx.restore();
}
