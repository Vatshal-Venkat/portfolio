"use client";

/* Hairline layer for the web-shooter intro, drawn with @howells/hairline's
   engraved kit: a dotted aim guide, the pixel-crisp fired strand, a dotted
   impact ring and paper-plate callouts. Positions change every frame, so the
   render loop pushes frames in through an imperative handle and only this
   small SVG re-renders. */

import { forwardRef, useImperativeHandle, useState } from "react";
import "@howells/hairline/hairline.css";
import { DotRing, DottedPath, PixelLine, PlateLabel } from "@howells/hairline/kit";
import { deriveTheme } from "@howells/hairline/theme";

export interface Seg {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  alpha: number;
}

export interface Plate {
  x: number;
  y: number;
  lead?: string;
  text: string;
  anchor?: "start" | "middle" | "end";
  alpha: number;
}

export interface OverlayFrame {
  aim?: Seg;
  strand?: Seg;
  ring?: { cx: number; cy: number; r: number; alpha: number };
  plates?: Plate[];
}

export interface HairlineOverlayHandle {
  set(frame: OverlayFrame | null): void;
}

// Ink, paper and hero matched to the skill web's palette.
const THEME = deriveTheme({ paper: "#0c0806", ink: "#f6f1ea", hero: "#f5a524", mode: "dark" });

const r1 = (v: number) => Math.round(v);

export const HairlineOverlay = forwardRef<HairlineOverlayHandle, { width: number; height: number }>(
  function HairlineOverlay({ width, height }, ref) {
    const [frame, setFrame] = useState<OverlayFrame | null>(null);
    useImperativeHandle(ref, () => ({ set: setFrame }), []);

    if (!frame || !width || !height) return null;
    const { aim, strand, ring, plates } = frame;

    return (
      <div className="hl-root sw-hairline" style={THEME} aria-hidden>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {aim && aim.alpha > 0.01 && (
            <g opacity={aim.alpha}>
              <DottedPath
                tone="fill-l4"
                pitch={4}
                points={[
                  { x: r1(aim.x0), y: r1(aim.y0) },
                  { x: r1(aim.x1), y: r1(aim.y1) },
                ]}
              />
            </g>
          )}
          {strand && strand.alpha > 0.01 && (
            <g opacity={strand.alpha}>
              <PixelLine tone="fill-l6" x0={r1(strand.x0)} y0={r1(strand.y0)} x1={r1(strand.x1)} y1={r1(strand.y1)} />
            </g>
          )}
          {ring && ring.alpha > 0.01 && (
            <g opacity={ring.alpha}>
              <DotRing tone="fill-hero" cx={r1(ring.cx)} cy={r1(ring.cy)} r={Math.max(2, ring.r)} step={6} />
            </g>
          )}
          {plates?.map(
            (p, i) =>
              p.alpha > 0.01 && (
                <g key={i} opacity={p.alpha}>
                  <PlateLabel x={r1(p.x)} y={r1(p.y)} lead={p.lead} text={p.text} anchor={p.anchor ?? "start"} />
                </g>
              )
          )}
        </svg>
      </div>
    );
  }
);
