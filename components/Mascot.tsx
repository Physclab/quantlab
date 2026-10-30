"use client";
import { useEffect, useRef } from "react";

// Eye positions measured on public/mascot.png (349 x 539)
const EYES = [{ cx: 174, cy: 165.5, w: 25, h: 40 }, { cx: 270.5, cy: 157, w: 22, h: 39 }];

/** Mascot whose eyes follow the cursor, blink at random and "wake up" on load. */
export default function Mascot({ className = "" }: { className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const look = useRef<SVGGElement>(null);
  const eyes = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    let raf = 0, timer = 0;
    const onMove = (e: PointerEvent) => {
      const r = root.current!.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width * 0.64), dy = e.clientY - (r.top + r.height * 0.3);
      const d = Math.hypot(dx, dy) || 1, s = Math.min(1, d / 300);
      t.x = (dx / d) * s * 7; t.y = (dy / d) * s * 6;
    };
    const tick = () => {
      cur.x += (t.x - cur.x) * 0.14; cur.y += (t.y - cur.y) * 0.14;
      look.current?.setAttribute("transform", `translate(${cur.x.toFixed(2)} ${cur.y.toFixed(2)})`);
      raf = requestAnimationFrame(tick);
    };
    const blink = () => {
      eyes.current.forEach((e) => { if (!e) return; e.classList.remove("blink-now"); void e.getBoundingClientRect(); e.classList.add("blink-now"); });
      timer = window.setTimeout(blink, 2200 + Math.random() * 3800);
    };
    addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    timer = window.setTimeout(blink, 2800);
    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  return (
    <span ref={root} className={`relative inline-block ${className}`} style={{ aspectRatio: "349/539" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/mascot.png" alt="Mascota de QuantLab" draggable={false} className="h-full w-full select-none" />
      <svg viewBox="0 0 349 539" className="absolute inset-0 h-full w-full" aria-hidden>
        {EYES.map(({ cx, cy, w, h }, i) => <rect key={i} x={cx - w / 2 - 6} y={cy - h / 2 - 6} width={w + 12} height={h + 12} rx={16} fill="#0f0f10" />)}
        <g ref={look}>
          {EYES.map(({ cx, cy, w, h }, i) => (
            <g key={i} className="eye-wake">
              <rect ref={(el) => { eyes.current[i] = el; }} className="eye" x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={w / 2} fill="#fff" style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,.9))" }} />
            </g>
          ))}
        </g>
      </svg>
    </span>
  );
}
