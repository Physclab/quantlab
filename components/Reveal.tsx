"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({ children, variant = "rise", delay = 0, className = "" }: {
  children: ReactNode; variant?: "rise" | "clip" | "scale"; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.setAttribute("data-in", ""); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal={variant} style={{ "--d": `${delay}ms` } as CSSProperties} className={className}>
      {children}
    </div>
  );
}
