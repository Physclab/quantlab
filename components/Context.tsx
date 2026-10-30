import Reveal from "./Reveal";
import Count from "./Count";
import Mascot from "./Mascot";
import Definition from "./Definition";
import Execution from "./Execution";
import { H, Serif } from "./bits";

const GLYPHS = Array.from({ length: 16 }, (_, r) => Array.from({ length: 70 }, (_, c) => "01/%=+-:<> .*"[(r * 7 + c * 13) % 13]).join(" ")).join("\n");
const fade = "linear-gradient(to top,#000,transparent 75%)";

export default function Context() {
  return (
    <>
      <Definition />

      {/* Testimonial + stat */}
      <section className="mx-auto grid max-w-[1200px] gap-3 px-6 py-12 md:grid-cols-[2fr_1fr]">
        <Reveal variant="scale">
          <figure className="relative flex h-full min-h-[330px] flex-col justify-between gap-10 overflow-hidden rounded-lg bg-quant-red p-8 sm:p-12">
            <pre aria-hidden className="blink pointer-events-none absolute inset-0 select-none overflow-hidden whitespace-pre font-mono text-[12px] leading-[20px] text-white/15" style={{ animationDuration: "6s", maskImage: fade, WebkitMaskImage: fade }}>{GLYPHS}</pre>
            <blockquote className="relative max-w-[640px] text-[22px] leading-[1.45] tracking-[-0.4px]">“Luego de años tradeando de la mano de QuantLab puedo decir que operar sin datos es como apostar tu dinero, y operar sin QuantLab es como regalar tu dinero al mercado”</blockquote>
            <figcaption className="relative flex items-center justify-between gap-4 text-[14px]">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/30 font-medium">GG</span><div><div className="font-medium">Geremy Gómez</div><div className="text-white/75">CEO, QuantLab</div></div></div>
              <span className="rounded-lg bg-white px-3 py-2 font-semibold text-carbon">Logo</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal variant="scale" delay={150}>
          <div className="flex h-full min-h-[330px] flex-col justify-between gap-10 rounded-lg border border-iron bg-graphite p-8">
            <div className="font-serif text-[88px] leading-none"><span className="text-quant-red-bright">+</span><Count to={87} suffix="%" /></div>
            <div><h3 className="font-medium">Precisión en nuestros sistemas</h3><p className="mt-1 text-[14px] leading-[1.57] text-ash">Más de un 87% de precisión en nuestros sistemas de predicción.</p></div>
          </div>
        </Reveal>
      </section>

      {/* Invite */}
      <section id="planes" className="mx-auto max-w-[1100px] px-6 py-28 text-center">
        <Reveal variant="clip">
          <h2 className={H}>
            <span className="block">Cambia el ruido <span className="mx-[0.1em] -my-[0.2em] inline-block h-[1.1em] align-[-0.2em]"><Mascot className="h-full" /></span> y las líneas</span>
            <span className="block">por <Serif>valores reales del mercado</Serif></span>
          </h2>
        </Reveal>
        <Reveal delay={120}><p className="mx-auto mt-8 max-w-[640px] text-[20px] leading-[1.5] tracking-[-0.3px]">Convierte el análisis cuantitativo institucional en decisiones claras y basadas en datos.</p></Reveal>
        <Reveal delay={220} className="mt-8 flex justify-center gap-2"><a href="https://quantlab-five.vercel.app/web/quantlab.html" className="btn btn-red">Unirme a QuantLab</a><a href="#contacto" className="btn btn-ghost">Aprende a usar Quantlab</a></Reveal>
      </section>
    
      <Execution />
    </>
  );
}
