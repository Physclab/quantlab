"use client";
import { useEffect, useState } from "react";

const LINKS = [["Plataforma", "#plataforma"], ["Qué es", "#que-es"], ["Planes", "#planes"], ["Academy", "https://quantlab-academy.vercel.app/"]];

export function Logo({ mark = false }: { mark?: boolean }) {
  if (mark) return <svg width="56" height="56" viewBox="0 0 22 22" aria-hidden><rect width="22" height="22" rx="4" fill="#e11d2a" /><path d="M5 15l4-5 3 3 5-7" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return (
    <a href="#" className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.5px]">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden><rect width="22" height="22" rx="4" fill="#e11d2a" /><path d="M5 15l4-5 3 3 5-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      QuantLab
    </a>
  );
}

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(scrollY > 24);
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`enter fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "border-b border-iron bg-carbon/80 backdrop-blur" : "border-b border-transparent"}`} style={{ "--d": "100ms" } as React.CSSProperties}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center md:flex">
            {LINKS.map(([l, h]) => <a key={h} href={h} className="pill">{l}</a>)}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://quantlab-five.vercel.app/web/QuantLab_Journal.html" className="hidden text-[14px] font-medium sm:block">Free Journal</a>
          <a href="https://quantlab-five.vercel.app/web/quantlab.html" className="btn btn-white">Obtener QuantLab</a>
        </div>
      </div>
    </header>
  );
}
