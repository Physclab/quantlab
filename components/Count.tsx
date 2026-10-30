"use client";
import { useEffect, useRef } from "react";

export default function Count({ to, decimals = 0, suffix = "", className = "" }: { to: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const set = (v: number) => { el.textContent = v.toFixed(decimals) + suffix; };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { set(to); return; }
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1400); set(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, decimals, suffix]);
  return <span ref={ref} className={className}>{(0).toFixed(decimals) + suffix}</span>;
}
