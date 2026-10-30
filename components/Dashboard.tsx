import Reveal from "./Reveal";
import Count from "./Count";

const MODS = ["Confluencias", "Favoritos", "Soportes/Resistencias", "Volumen y liquidez", "Indicadores", "Gráficos", "Anomalías", "Estadística", "Ingeniería", "Asistente IA", "Noticias"];
const lbl = "font-mono text-[10px] uppercase tracking-[0.12em] text-mist";
const Select = ({ v }: { v: string }) => <div className="flex items-center justify-between rounded-md border border-iron bg-graphite px-3 py-2 text-[14px]">{v}<span className="text-[10px] text-ash">▼</span></div>;
const Row = ({ a, b, c }: { a: string; b: string; c?: string }) => <div className="flex justify-between border-b border-iron py-1.5 text-[14px] text-ash"><span>{a}</span><span className={c}>{b}</span></div>;

/** HTML recreation of the QuantLab app (Confluencias module). All copy is placeholder. */
export default function Dashboard() {
  return (
    <section id="plataforma" className="mx-auto max-w-[1200px] px-6 pb-6">
      <Reveal variant="rise" className="relative">
        <div className="grid overflow-hidden rounded-lg border border-iron bg-pure-black md:grid-cols-[230px_1fr] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
          <aside className="hidden border-r border-iron md:block">
            <div className="flex items-center gap-2 border-b border-iron px-4 py-4 text-[18px] font-semibold"><span className="h-2 w-2 rounded-full bg-quant-red-bright" />Quant<span className="text-quant-red-bright">Lab</span></div>
            <div className="space-y-2 p-3"><div className={lbl}>Mercado</div><Select v="NASDAQ" /></div>
            <div className={`${lbl} px-4 pt-2 pb-2`}>Módulos</div>
            <ul>{MODS.map((m, i) => <li key={m} className={`px-4 py-2.5 text-[14px] ${i === 0 ? "bg-quant-red/15 font-medium text-bone" : "text-ash"}`}>{m}</li>)}</ul>
            <div className="space-y-2 border-t border-iron p-3">
              <div className={lbl}>Temporalidad</div><Select v="15 Minutos" />
              <div className={lbl}>Período de datos</div><Select v="5 Días" />
              <div className="btn btn-red w-full justify-center">▶ Analizar</div>
            </div>
          </aside>

          <div className="space-y-5 p-4 sm:p-5">
            <div className="rounded-lg border border-[#3a0b0b] bg-[#1c0303] p-5 text-center">
              <div className="t-heading-lg font-semibold uppercase">Señal: venta fuerte</div>
              <div className="relative mt-4 h-7 overflow-hidden rounded-full bg-[#3b2626]">
                <div className="fill h-full rounded-full bg-white" style={{ "--w": "60%" } as React.CSSProperties} />
                <span className="absolute inset-0 flex items-center justify-center text-[14px] font-medium text-carbon">Confianza: 60%</span>
              </div>
              <p className="mt-3 text-[14px] font-medium">Score Compra: 2 | Score Venta: 6</p>
            </div>

            <div className="rounded-lg border border-iron border-l-2 border-l-[#4f9bff] bg-black p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className={lbl}>Estado de mercado</div>
                  <div className="t-heading-lg mt-1 font-semibold text-[#4f9bff]">🔄 Reversión Potencial</div>
                  <p className="mt-2 max-w-[420px] text-[14px] text-ash">El mercado muestra tendencia a regresar a la media en un ambiente tranquilo.</p>
                </div>
                <div className="text-right"><div className={lbl}>Confianza del diagnóstico</div><Count to={83} suffix="%" className="text-[40px] font-semibold leading-tight text-[#22c55e]" />
                  <div className="ml-auto mt-1 h-1 w-28 rounded-full bg-iron"><div className="fill h-full rounded-full bg-[#22c55e]" style={{ "--w": "83%" } as React.CSSProperties} /></div></div>
              </div>
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                <div className="rounded-lg border border-iron p-4"><div className={lbl}>Estrategia</div><div className="my-2 font-semibold text-[#4f9bff]">Mean reversion</div>
                  <Row a="Extremos del rango en 18,572 - entrada contraria" b="" /><Row a="Objetivo: media del rango (VWAP, BB Media)" b="" /><Row a="Stop loss por encima/debajo de los 18,600" b="" /></div>
                <div className="rounded-lg border border-iron p-4"><div className={lbl}>Régimen HMM</div><div className="my-2 font-semibold text-[#22c55e]">Baja Volatilidad</div>
                  <Row a="Duración" b="11 velas" /><Row a="Prob. continuidad" b="93.5%" c="text-[#22c55e]" /><div className={`${lbl} mt-3`}>Tamaño de posición</div><div className="text-[14px] text-[#22c55e]">Tamaño normal (100%)</div></div>
                <div className="rounded-lg border border-iron p-4"><div className={lbl}>Hurst multi-escala</div><div className="mt-2 text-[12px] text-ash">Convergencia: <span className="text-[#22c55e]">Alta</span></div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">{[["Corto", 0.5, "ruido", "text-ash"], ["Medio", 0.443, "revisión débil", "text-[#4f9bff]"], ["Largo", 0.433, "revisión débil", "text-[#4f9bff]"]].map(([k, v, s, c]) => (
                    <div key={k as string} className="rounded-md border border-iron px-1 py-3"><div className={lbl}>{k}</div><Count to={v as number} decimals={3} className={`text-[18px] font-semibold ${c}`} /><div className="text-[10px] text-mist">{s}</div></div>))}</div></div>
              </div>
              <div className="mt-4 rounded-md border-l-2 border-[#f59e0b] bg-[#1a1203] px-3 py-2 font-mono text-[11px] text-[#f59e0b]">⚠ Escala corta (0.50) diverge de escala media (0.44)</div>
            </div>

            <div>
              <h3 className="t-heading mb-3 font-semibold">Razones de la Señal</h3>
              <ul className="rounded-lg bg-graphite px-4">{["Lorem ipsum dolor sit amet consectetur", "Adipiscing elit sed do eiusmod tempor", "Incididunt ut labore et dolore magna", "Ut enim ad minim veniam quis nostrud"].map((t) => <li key={t} className="flex gap-3 border-b border-iron py-3 text-[14px] last:border-0"><span>✓</span>{t}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* Floating assistant */}
        <aside className="mt-4 w-full rounded-lg border border-slate-edge bg-graphite p-4 lg:absolute lg:-right-4 lg:bottom-16 lg:mt-0 lg:w-[310px]">
          <div className="mb-3 flex items-center justify-between border-b border-iron pb-2 text-[14px] font-medium"><span>Asistente IA</span><span className="eyebrow">Beta</span></div>
          <Reveal delay={400}><p className="ml-auto w-fit max-w-[90%] rounded-lg bg-iron px-3 py-2 text-[14px]">¿Qué dice el régimen en 15 minutos?</p></Reveal>
          <Reveal delay={900}><p className="mt-2 max-w-[92%] rounded-lg border border-slate-edge px-3 py-2 text-[14px] text-ash">Nuestros Sitemas nos indican durante el  régimen en 15 minutos estamos en...</p></Reveal>
          <Reveal delay={1300}><p className="eyebrow mt-2 text-quant-red-bright">abrir_modulo · cambiar_temporalidad</p></Reveal>
          <div className="mt-3 rounded-md border border-iron px-3 py-2 text-[14px] text-mist">Pregunta algo…<span className="blink ml-0.5">|</span></div>
        </aside>
      </Reveal>
    </section>
  );
}
