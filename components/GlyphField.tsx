"use client";
import { useEffect, useRef } from "react";

const GLYPHS = "01/%=+-:<>|*.".split("");
const CW = 14, CH = 19, FS = 12, R = 180; // cell size, font size, mouse radius

/** Fixed full-viewport field of glyphs that fade in/out and light up red around the cursor. */
export default function GlyphField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const atlas = document.createElement("canvas");
    let dpr = 1, cols = 0, rows = 0, raf = 0, scrollK = 1;
    let ph = new Float32Array(0), sp = new Float32Array(0), gi = new Uint8Array(0);
    const m = { x: -9999, y: -9999, sx: -9999, sy: -9999 };

    const buildAtlas = () => {
      const cw = Math.ceil(CW * dpr), ch = Math.ceil(CH * dpr);
      atlas.width = cw * GLYPHS.length; atlas.height = ch * 2;
      const a = atlas.getContext("2d")!;
      a.font = `${FS * dpr}px "JetBrains Mono Variable", ui-monospace, monospace`;
      a.textAlign = "center"; a.textBaseline = "middle";
      ["#ffffff", "#ff4452"].forEach((col, r) => {
        a.fillStyle = col;
        GLYPHS.forEach((g, i) => a.fillText(g, i * cw + cw / 2, r * ch + ch / 2));
      });
    };

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      cols = Math.ceil(innerWidth / CW); rows = Math.ceil(innerHeight / CH);
      const n = cols * rows;
      ph = Float32Array.from({ length: n }, () => Math.random() * 6.283);
      sp = Float32Array.from({ length: n }, () => 0.35 + Math.random() * 0.9);
      gi = Uint8Array.from({ length: n }, () => (Math.random() * GLYPHS.length) | 0);
      buildAtlas();
    };

    const draw = (t: number) => {
      m.sx += (m.x - m.sx) * 0.18; m.sy += (m.y - m.sy) * 0.18;
      scrollK = 1 - 0.55 * Math.min(1, scrollY / innerHeight);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cw = Math.ceil(CW * dpr), ch = Math.ceil(CH * dpr);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c, x = c * CW, y = r * CH;
          const s = Math.sin(t * sp[i] + ph[i]);
          const u = Math.max(0, (s + 0.35) / 1.35);
          let a = u * u * 0.34 * scrollK;
          if (u < 0.04 && Math.random() < 0.08) gi[i] = (Math.random() * GLYPHS.length) | 0;
          const dx = x + CW / 2 - m.sx, dy = y + CH / 2 - m.sy;
          const d2 = dx * dx + dy * dy;
          let hot = 0;
          if (d2 < R * R) {
            const k = 1 - Math.sqrt(d2) / R; hot = k * k;
            a += hot * 0.85;
            if (Math.random() < 0.12 * hot + 0.01) gi[i] = (Math.random() * GLYPHS.length) | 0;
          }
          if (a < 0.015) continue;
          ctx.globalAlpha = Math.min(a, 1);
          ctx.drawImage(atlas, gi[i] * cw, hot > 0.12 ? ch : 0, cw, ch, x * dpr, y * dpr, cw, ch);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (ms: number) => { draw(ms / 1000); raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => { m.x = e.clientX; m.y = e.clientY; };
    const onLeave = () => { m.x = m.y = -9999; };

    const start = () => {
      resize();
      if (reduce) { draw(1.5); return; }
      raf = requestAnimationFrame(loop);
    };
    document.fonts.load(`${FS}px "JetBrains Mono Variable"`).finally(start);
    addEventListener("resize", resize);
    if (!reduce) { addEventListener("pointermove", onMove); document.addEventListener("pointerleave", onLeave); }
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
