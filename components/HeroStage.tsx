"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Pins the hero while the next block slides over it; the hero shrinks and fades with scroll. */
export default function HeroStage({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const pin = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const f = () => {
      raf = 0;
      const p = Math.min(1, scrollY / (innerHeight * 0.95)), el = pin.current!;
      el.style.transform = `translate3d(0,${-p * 80}px,0) scale(${1 - 0.12 * p})`;
      el.style.opacity = String(1 - p);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(f); };
    f(); addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="relative">
      <div className="sticky top-0 z-0 h-screen"><div ref={pin} className="h-full origin-top will-change-transform">{hero}</div></div>
      <div className="relative z-10 bg-carbon"><div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-carbon to-transparent" />{children}</div>
    </div>
  );
}
