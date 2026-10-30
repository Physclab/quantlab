"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { Logo } from "./Nav";
import { H, Serif, Lupa } from "./bits";

const ITEMS = [
  {
    t: "Convierte cada vela en contexto",
    d: "Entiende el movimiento y la estructura de mercado por datos y no por líneas.",
    c: "</> Régimen HMM",
    pos: "left-[6%] top-[12%]",
  },
  {
    t: "Deja de operar a ciegas el ruido",
    d: "En QuantLab nos centramos en reducir el ruido de mercado y te ayudamos a discernir durante cada operativa.",
    c: "--request Hurst 30/60/120",
    pos: "right-0 top-[34%]",
  },
  {
    t: "Lleva el análisis a tu asistente",
    d: "Opera de la mano con un sistema de inteligencia artificial con tus modelos de IA favoritos con el cual puedes resolver todas tus dudas sobre el mercado.",
    c: "abrir_modulo · Asistente IA",
    pos: "left-0 bottom-[30%]",
  },
  {
    t: "Integra QuantLab a tu flujo",
    d: "Para aprender el porqué de cada movimiento de mercado y aumentar tus ratios sin sacrificar tu winrate.",
    c: "</> Z-Score · Confluencias",
    pos: "right-[6%] bottom-[6%]",
  },
];

export default function Definition() {
  const [a, setA] = useState(0);
  return (
    <section id="que-es" className="mx-auto max-w-[1200px] px-6 py-24">
      <Reveal variant="clip"><h2 className={H}><span className="block">Qué es <Serif big>QuantLab</Serif></span><span className="block">el sistema <Lupa /> cuantitativo</span></h2></Reveal>
      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-16">
          <Reveal delay={100}>
            <p className="max-w-[480px] text-[22px] leading-[1.45] tracking-[-0.4px]">QuantLab es un sistema de trading el cual convierte un análisis cuantitativo institucional en señales fáciles de entender para traders retail que buscan mejorar su trading o persiguen la rentabilidad pero les falta una ventaja estadística.</p>
            <div className="mt-6 flex gap-2"><a href="https://quantlab-five.vercel.app/web/quantlab.html" className="btn btn-red">Unirme a QuantLab</a><a href="#plataforma" className="btn btn-ghost">Ver la plataforma</a></div>
          </Reveal>
          <Reveal delay={200}>
            <ul className="max-w-[520px]">
              {ITEMS.map((it, i) => (
                <li key={it.t}><button onClick={() => setA(i)} className={`block w-full py-3 text-left text-[22px] tracking-[-0.4px] transition-colors ${a === i ? "text-bone" : "text-mist hover:text-ash"}`}>{it.t}</button></li>
              ))}
            </ul>
            <div className="h-px max-w-[520px] bg-iron"><div key={a} className="h-full origin-left bg-bone" style={{ animation: "progress 4.5s linear forwards" }} onAnimationEnd={() => setA((a + 1) % ITEMS.length)} /></div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={150}>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#1e1e1e 1px,transparent 1px),linear-gradient(90deg,#1e1e1e 1px,transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse at center,#000 30%,transparent 72%)", WebkitMaskImage: "radial-gradient(ellipse at center,#000 30%,transparent 72%)" }} />
            <div aria-hidden className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-quant-red/40 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-edge bg-graphite"><Logo mark /></div>
            {ITEMS.map((it, i) => (
              <div key={it.c} className={`float absolute ${it.pos} rounded-lg border bg-graphite px-3 py-2 font-mono text-[12px] transition-colors duration-500 ${a === i ? "border-quant-red-bright text-bone" : "border-iron text-ash"}`} style={{ animationDelay: `${i * -1.4}s` }}>{it.c}</div>
            ))}
          </div>
          <p key={a} className="enter mt-8 max-w-[520px] text-[16px] leading-[1.5] text-ash">{ITEMS[a].d}</p>
          <a href="#plataforma" className="mt-4 inline-block text-[16px] font-medium hover:text-quant-red-bright">Explorar los módulos</a>
        </Reveal>
      </div>
    </section>
  );
}
