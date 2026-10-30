"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { H, L, Serif, Key } from "./bits";

const ITEMS = [
  {
    t: "Prueba órdenes antes de enviarlas",
    d: "Prueba tus hipótesis de mercado y verifica si cuantitativamente tienes ventaja.",
    o: "Comprar NQ 15m · reversión en soporte",
    tip: "Simular orden en el broker",
  },
  {
    t: "Lleva la evidencia a cada operación",
    d: "Utiliza información de calidad para respaldar tus análisis.",
    o: "Vender ES 1H · régimen de alta volatilidad",
    tip: "Adjuntar evidencia a la orden",
  },
  {
    t: "Alinea tu estrategia con el régimen",
    d: "Determina cuándo tomar posiciones a favor o en contra de la tendencia.",
    o: "Comprar EURUSD · Hurst persistente",
    tip: "Alinear con el régimen",
  },
  {
    t: "Automatiza todo tu flujo de ejecución",
    d: "QuantLab te permite crear flujos cuantitativos bajo los módulos de tu decisión.",
    o: "Cerrar parcial NQ · objetivo alcanzado",
    tip: "Automatizar el flujo",
  },
];
const SPARK = "M2 34 L12 20 L20 30 L30 12 L40 28 L50 16 L60 32 L70 10 L80 26 L90 14 L100 30 L110 18 L122 24 L132 8 L142 22 L152 14 L162 26";
const Chip = ({ children, dim = false }: { children: string; dim?: boolean }) => <span className={`rounded-md px-2 py-0.5 text-[12px] ${dim ? "bg-iron text-ash" : "bg-quant-red/20 text-quant-red-bright"}`}>{children}</span>;
const M = ({ k, v }: { k: string; v: string }) => <span className="whitespace-nowrap text-mist">{k} <b className="font-medium text-bone">{v}</b></span>;

export default function Execution() {
  const [a, setA] = useState(0);
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <Reveal variant="clip">
        <h2 className={H}>
          <span className="block">Ejecuta tu orden</span>
          <span className="block">donde <Key /> <Serif>los institucionales</Serif></span>
          <span className="block">ponen las suyas</span>
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-16">
          <Reveal delay={100}>
            <p className="max-w-[480px] text-[22px] leading-[1.45] tracking-[-0.4px]">QuantLab te permite hacer una lectura de los movimientos institucionales para que puedas rastrear las mejores órdenes y operar como los expertos.</p>
            <div className="mt-6 flex gap-2"><a href="https://quantlab-five.vercel.app/web/quantlab.html" className="btn btn-red">Unirme a QuantLab</a><a href="https://quantlab-five.vercel.app/web/learn.html" className="btn btn-ghost">Aprende a usar Quantlab</a></div>
          </Reveal>
          <Reveal delay={200}>
            <ul className="max-w-[520px]">
              {ITEMS.map((it, i) => (
                <li key={it.t}>
                  <button onClick={() => setA(i)} className={`block w-full py-3 text-left text-[22px] tracking-[-0.4px] transition-colors ${a === i ? "text-bone" : "text-mist hover:text-ash"}`}>{it.t}</button>
                  {a === i && <div className="h-px bg-iron"><div key={a} className="h-full origin-left bg-bone" style={{ animation: "progress 4.5s linear forwards" }} onAnimationEnd={() => setA((a + 1) % ITEMS.length)} /></div>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={150}>
          <div className="relative mx-auto h-[430px] w-full max-w-[560px]">
            {/* faded card behind */}
            <div aria-hidden className="absolute inset-x-0 top-[250px] h-[180px] rounded-lg border border-iron bg-graphite p-5 opacity-40" style={{ maskImage: "linear-gradient(#000,transparent 90%)", WebkitMaskImage: "linear-gradient(#000,transparent 90%)" }}>
              <div className="pl-[170px] text-[16px] font-medium">Vender ES 1H · cobertura de riesgo</div>
              <div className="mt-3 flex gap-2 pl-[170px]"><Chip>Régimen Alta vol</Chip><Chip>Hurst 0.61</Chip></div>
            </div>

            {/* main order card */}
            <div className="absolute inset-x-0 top-0 rounded-lg border border-slate-edge bg-graphite p-5">
              <div className="flex items-start justify-between gap-4">
                <div key={a} className="enter text-[16px] font-medium leading-snug" style={{ "--d": "0ms" } as React.CSSProperties}>{ITEMS[a].o}</div>
                <div className="relative shrink-0">
                  <div className="flex overflow-hidden rounded-lg border border-slate-edge bg-iron">
                    <span className="flex h-9 w-9 items-center justify-center"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#ff4452" /></svg></span>
                    <span className="flex h-9 w-8 items-center justify-center border-l border-slate-edge text-ash">⌄</span>
                  </div>
                  <svg aria-hidden className="float absolute left-5 top-5" width="18" height="18" viewBox="0 0 18 18"><path d="M3 2l11 5-5 1.5L7 14z" fill="#fff" stroke="#0a0a0a" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                  <div key={`t${a}`} className="enter absolute right-0 top-full z-10 mt-1 whitespace-nowrap rounded-md border border-slate-edge bg-carbon px-2 py-1 text-[11px]" style={{ "--d": "0ms" } as React.CSSProperties}>{ITEMS[a].tip}</div>
                </div>
              </div>
              <span className="mt-3 inline-block rounded-md bg-iron px-2 py-0.5 text-[12px] text-ash">Señal activa</span>
              <div className="mt-3 flex flex-wrap gap-2"><Chip>Régimen Baja vol</Chip><Chip>Hurst 0.44</Chip><Chip>Confianza 83%</Chip><Chip dim>+3</Chip></div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]"><M k="Entrada" v="18,420" /><M k="Stop" v="18,395" /><M k="Objetivo" v="18,470" /><M k="R:R" v="1:2" /></div>
              <div className="h-24" />
            </div>

            {/* data card overlay */}
            <div className="absolute left-[-8px] top-[170px] w-[210px] rounded-lg border border-slate-edge bg-carbon p-3">
              <div className="flex items-center justify-between text-[12px] font-medium"><span>Precio NQ</span><span className="rounded-md bg-[#1f3d0f] px-1.5 text-[11px] text-[#a3e635]">Tendencia</span></div>
              <svg viewBox="0 0 164 40" className="my-3 w-full" aria-hidden><path className="line" pathLength={1} d={SPARK} fill="none" stroke="#c7d2fe" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" /></svg>
              {[["Cambio", "↑ 0.84%", "text-[#22c55e]"], ["Rango 5 días", "170 pts", ""], ["Sesión previa", "142 pts", ""]].map(([k, v, c]) => <div key={k} className="flex justify-between text-[12px] leading-[1.7]"><span className="text-ash">{k}</span><span className={`font-medium ${c}`}>{v}</span></div>)}
            </div>
            <span className="eyebrow absolute bottom-0 right-0">Vista ilustrativa</span>
          </div>
          <p key={a} className="enter mt-6 max-w-[520px] text-[16px] leading-[1.5] text-ash">{ITEMS[a].d}</p>
          <a href="https://quantlab-five.vercel.app/web/quantlab.html" className="mt-4 inline-block text-[16px] font-medium hover:text-quant-red-bright">Explorar ejecución</a>
        </Reveal>
      </div>
    </section>
  );
}
