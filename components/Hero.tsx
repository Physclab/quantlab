import type { CSSProperties } from "react";
import Mascot from "./Mascot";

const MODULES = ["Confluencia", "Regímenes HMM", "Z-Score", "Exponente de Hurst", "Fourier", "Kalman", "Volumen", "Patrones", "Anomalías", "Noticias"];
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const W = ({ children, ms }: { children: string; ms: number }) => <span className="word"><span style={d(ms)}>{children}</span></span>;

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[640px] flex-col justify-between pt-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-start justify-between gap-10 px-6">
        <div className="max-w-[560px]">
          <p className="enter text-[18px] leading-[1.5] tracking-[-0.3px] text-ash sm:text-[20px]" style={d(350)}>
            <span className="text-bone">El sistema de trading cuantitativo</span> que pone las herramientas de nivel institucional al alcance de los traders que se toman en serio su trabajo.
          </p>
          <div className="enter mt-6 flex flex-wrap gap-2" style={d(500)}>
            <a href="https://quantlab-five.vercel.app/web/quantlab.html" className="btn btn-red">Obtener QuantLab</a>
            <a href="#plataforma" className="btn btn-ghost">Ver la plataforma</a>
          </div>
        </div>
        <ul className="enter flex gap-8" style={d(650)}>
          {["Regímenes HMM", "Hurst 30/60/120", "Asistente IA"].map((t) => (
            <li key={t} className="eyebrow flex items-center gap-2"><span className="blink h-1.5 w-1.5 rounded-full bg-quant-red-bright" />{t}</li>
          ))}
        </ul>
      </div>

      <h1 className="mx-auto w-full max-w-[1200px] px-6 text-[clamp(3.25rem,12vw,11rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
        <span className="block"><W ms={200}>Cuantifica</W>{" "}
          <span className="pop mx-[0.06em] inline-block h-[1.15em] align-[-0.2em] -my-[0.2em]" style={d(800)}><Mascot className="h-full" /></span>
        </span>
        <span className="block"><W ms={320}>tu</W> <W ms={400}>ventaja</W></span>
      </h1>

      <div className="enter overflow-hidden border-t border-iron/80 py-6" style={d(1000)} aria-label="Módulos de QuantLab">
        <div className="marquee flex w-max gap-14 pr-14 text-[20px] font-medium tracking-[-0.4px] text-mist">
          {[...MODULES, ...MODULES].map((m, i) => <span key={i} className="whitespace-nowrap">{m}</span>)}
        </div>
      </div>
    </section>
  );
}
