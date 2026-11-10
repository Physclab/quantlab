"use client";
import Reveal from "./Reveal";
import Count from "./Count";
import { useEffect, useState } from "react";

const MODS = ["Confluencias", "Favoritos", "Soportes/Resistencias", "Volumen y liquidez", "Indicadores", "Gráficos", "Anomalías", "Estadística", "Ingeniería", "Asistente IA", "Noticias"];
const INTERACTIVE_MODULES = ["Confluencias", "Volumen y liquidez", "Gráficos", "Ingeniería"];
const lbl = "font-mono text-[10px] uppercase tracking-[0.12em] text-mist";
const Select = ({ v }: { v: string }) => <div className="flex items-center justify-between rounded-md border border-iron bg-graphite px-3 py-2 text-[14px]">{v}<span className="text-[10px] text-ash">▼</span></div>;
const Row = ({ a, b, c }: { a: string; b: string; c?: string }) => <div className="flex justify-between border-b border-iron py-1.5 text-[14px] text-ash"><span>{a}</span><span className={c}>{b}</span></div>;
const BARS = [8, 12, 9, 18, 14, 28, 12, 38, 20, 16, 52, 23, 18, 76, 35, 44, 31, 65, 40, 28, 22, 18, 27, 16, 12, 9, 15, 11, 8, 5, 4, 3];
const BarChart = ({ openInterest = false }: { openInterest?: boolean }) => (
  <div className="relative mt-3 h-40 border-b border-slate-edge bg-[linear-gradient(to_bottom,transparent_24%,#252525_25%,transparent_26%,transparent_49%,#252525_50%,transparent_51%,transparent_74%,#252525_75%,transparent_76%)]">
    <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-around gap-0.5 px-2">
      {BARS.map((height, i) => <span key={i} className="flex h-full flex-1 items-end justify-center gap-px">
        <i className="w-1.5 bg-[#22c55e]" style={{ height: `${(openInterest ? height * (i % 5 === 0 ? 1.8 : .55) : height * .8)}%` }} />
        <i className="w-1.5 bg-quant-red-bright" style={{ height: `${(openInterest ? height * (i % 3 === 0 ? .9 : .35) : height * (i % 4 === 0 ? 1.4 : .4))}%` }} />
      </span>)}
    </div>
    <span className="absolute bottom-1 left-1 text-[10px] text-mist">680</span><span className="absolute bottom-1 left-1/2 text-[10px] text-mist">750</span><span className="absolute bottom-1 right-1 text-[10px] text-mist">820</span>
  </div>
);
const VolumeLiquidity = () => (
  <div className="space-y-4">
    <div className="rounded-lg border border-iron bg-black p-4">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">Distribución de Volumen y Open Interest</h3><p className="mt-1 text-[12px] text-mist">Calls vs Puts. Las barras más altas marcan dónde se concentra el dinero y suelen actuar como imanes o barreras de precio.</p></div><div className="flex gap-4 text-[11px]"><span><i className="mr-1 inline-block h-2 w-2 bg-[#22c55e]" />Calls</span><span><i className="mr-1 inline-block h-2 w-2 bg-quant-red-bright" />Puts</span></div></div>
      <div className="mt-4 rounded-md border border-iron p-3"><div className="text-[12px] text-ash">Distribución de Volumen y Open Interest por strike</div><BarChart /></div>
      <div className="mt-3 rounded-md border border-iron p-3"><div className="text-[12px] text-ash">Open Interest por strike · Calls vs Puts</div><BarChart openInterest /></div>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      {["Strikes con más Open Interest", "Strikes con más volumen"].map((title, table) => <div key={title} className="rounded-lg border border-iron bg-black p-4"><h3 className="font-semibold">{title}</h3><div className="mt-3 grid grid-cols-4 border-b border-iron pb-2 font-mono text-[10px] uppercase tracking-wider text-quant-red-bright"><span>Strike</span><span>Calls</span><span>Puts</span><span>Total</span></div>{[["725.00", "3,445", "177,265", "180,710"], ["730.00", "14,000", "161,785", "175,785"], ["800.00", "175,319", "24", "175,343"], ["710.00", "889", "148,489", "149,378"]].map((row, i) => <div key={row[0]} className="grid grid-cols-4 border-b border-iron py-1.5 text-[11px] text-ash"><span>{table ? row[0] : row[0]}</span><span className="text-[#22c55e]">{row[1]}</span><span className="text-quant-red-bright">{row[2]}</span><span>{row[3]}</span></div>)}</div>)}
    </div>
  </div>
);
const TradingViewChart = () => {
  useEffect(() => {
    const container = document.getElementById("tradingview_chart");
    if (!container || container.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "CAPITALCOM:US100",
      interval: "15",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "es",
      enable_publishing: false,
      allow_symbol_change: true,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });
    container.appendChild(script);
  }, []);
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#3a0b0b] bg-gradient-to-r from-[#1c0303] to-graphite p-4">
        <div className="eyebrow text-quant-red-bright">Gráfico TradingView</div>
        <h3 className="mt-2 font-semibold">Lectura visual del mercado</h3>
        <p className="mt-1 text-[12px] text-mist">Visualiza el precio en TradingView y consulta debajo las señales cuantitativas más importantes.</p>
      </div>
      <div className="h-[430px] overflow-hidden rounded-lg border border-iron bg-black">
        <div id="tradingview_chart" className="h-full w-full" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {[["Extremo de mercado", "Dentro de Rango Normal", "0.991"], ["Régimen operativo", "Reversión fuerte", "Mean reversion agresiva"], ["Punto estimado", "$28048.03", "Alcista"], ["Fuerza de tendencia · ADX", "36.41", "Fuerte"], ["Tendencia · MACD", "Bajista", "Valor: -19.4192"]].map(([label, value, detail]) => (
          <div key={label} className="rounded-lg border border-iron bg-black p-3"><div className={lbl}>{label}</div><div className="mt-2 text-[13px] font-semibold">{value}</div><div className="mt-1 text-[10px] text-mist">{detail}</div></div>
        ))}
      </div>
      <div className="rounded-lg border border-[#3a0b0b] bg-gradient-to-r from-[#1c0303] to-graphite p-4"><div className="eyebrow text-quant-red-bright">Gráfico de anomalías</div><h3 className="mt-2 font-semibold">Extremos de los rendimientos</h3><p className="mt-1 text-[12px] text-mist">Retornos logarítmicos, umbrales móviles y anomalías detectadas.</p></div>
    </div>
  );
};
const Engineering = () => {
  const points = "0,35 22,27 44,31 66,25 88,35 110,30 132,43 154,38 176,49 198,45 220,58 242,53 264,62 286,57 308,68 330,60 352,74 374,66 396,79 418,72 440,84 462,78 484,91 506,84 528,96 550,88 572,102 594,94 616,108 638,97 660,112 682,102 704,120 726,108 748,124 770,116";
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-iron bg-black p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {[["Precio base", "28041.0000"], ["Precio ajustado", "28033.6039"], ["Desviación estimada", "7.3961"], ["Factor de ajuste", "0.2702"], ["Proyección siguiente", "28050.4402"], ["Dirección estimada", "Alcista"]].map(([label, value]) => <div key={label} className="rounded-md border border-iron bg-graphite p-3"><div className={lbl}>{label}</div><div className="mt-2 text-[17px] font-semibold">{value}</div><span className="float absolute" /></div>)}
        </div>
      </div>
      <div className="rounded-lg border border-iron bg-black p-4"><div className={lbl}>Lectura del sistema</div><p className="mt-2 text-[14px] font-medium">Sistema de predicción apunta a tomar posiciones en compra</p></div>
      <div className="rounded-lg border border-[#3a0b0b] bg-gradient-to-r from-[#1c0303] to-graphite p-4"><div className="eyebrow text-quant-red-bright">Gráfico de predicción</div><h3 className="mt-2 font-semibold">Sistema de predicción</h3><p className="mt-1 text-[12px] text-mist">Guarda esta visualización para seguir la lectura del precio y su proyección inmediata.</p></div>
      <div className="rounded-lg border border-iron bg-[#101010] p-3">
        <div className="mb-3 flex flex-wrap gap-4 text-[11px] text-ash"><span><i className="mr-1 inline-block h-0.5 w-5 bg-white align-middle" />Precio observado</span><span><i className="mr-1 inline-block h-0.5 w-5 bg-[#22c55e] align-middle" />Precio filtrado</span><span><i className="mr-1 inline-block h-0.5 w-5 border-t border-dashed border-quant-red-bright align-middle" />Tendencia lenta</span><span><i className="mr-1 inline-block h-2 w-2 bg-quant-red-bright align-middle" />Magnitud espectral</span></div>
        <div className="relative overflow-hidden rounded-md bg-[#111]">
          <svg viewBox="0 0 770 145" className="h-auto min-h-[230px] w-full" preserveAspectRatio="none" aria-label="Gráfico de predicción del precio">
            {[25, 55, 85, 115].map((y) => <line key={y} x1="0" x2="770" y1={y} y2={y} stroke="#29313a" strokeWidth="0.7" />)}
            {[80, 190, 300, 410, 520, 630, 740].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="145" stroke="#29313a" strokeWidth="0.7" />)}
            <polyline points={points} fill="none" stroke="#fff" strokeWidth="1.5" />
            <polyline points="0,32 80,31 160,42 240,51 320,62 400,72 480,82 560,92 640,103 770,117" fill="none" stroke="#22c55e" strokeWidth="1.5" />
            <polyline points="0,29 100,34 200,45 300,54 400,68 500,78 600,90 700,105 770,78" fill="none" stroke="#ff4452" strokeWidth="1.2" strokeDasharray="5 4" />
          </svg>
          <div className="absolute bottom-2 left-2 text-[10px] text-mist">Precio</div><div className="absolute bottom-2 right-2 text-[10px] text-mist">Tiempo</div>
        </div>
      </div>
      <div className="rounded-lg border border-iron bg-black p-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Ciclo dominante</h3><span className="eyebrow">Predicción activa</span></div><div className="mt-3 h-16 rounded-md bg-[linear-gradient(to_bottom,transparent_49%,#29313a_50%,transparent_51%)]"><div className="h-full border-l border-dashed border-[#f59e0b] ml-[8%]" /></div></div>
    </div>
  );
};

export default function Dashboard() {
  const [module, setModule] = useState("Confluencias");
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [cursorTarget, setCursorTarget] = useState("Volumen y liquidez");
  const [cursorKey, setCursorKey] = useState(0);
  const [splitView, setSplitView] = useState(false);
  const [draggingChart, setDraggingChart] = useState(false);
  useEffect(() => {
    if (!autoSwitch) return;
    let index = 0;
    let clickTimer = 0;
    let cycleTimer = 0;
    let dragTimer = 0;
    let splitTimer = 0;
    const cycle = () => {
      const next = INTERACTIVE_MODULES[(index + 1) % INTERACTIVE_MODULES.length];
      setCursorTarget(next);
      setCursorKey((key) => key + 1);
      clickTimer = window.setTimeout(() => setModule(next), 3200);
      if (next === "Volumen y liquidez") {
        dragTimer = window.setTimeout(() => setDraggingChart(true), 3500);
        splitTimer = window.setTimeout(() => {
          setDraggingChart(false);
          setSplitView(true);
        }, 4400);
      } else {
        setSplitView(false);
      }
      index = (index + 1) % INTERACTIVE_MODULES.length;
      cycleTimer = window.setTimeout(cycle, 5000);
    };
    cycle();
    return () => {
      window.clearTimeout(clickTimer);
      window.clearTimeout(cycleTimer);
      window.clearTimeout(dragTimer);
      window.clearTimeout(splitTimer);
    };
  }, [autoSwitch]);
  const selectModule = (name: string) => {
    setModule(name);
    setSplitView(false);
    setDraggingChart(false);
    setAutoSwitch(false);
  };
  const cursorTop = 185 + MODS.indexOf(cursorTarget) * 39;
  return (
    <section id="plataforma" className="mx-auto max-w-[1200px] px-6 pb-6">
      <Reveal variant="rise" className="relative">
        <div className="grid min-h-[760px] overflow-hidden rounded-lg border border-iron bg-pure-black md:grid-cols-[230px_1fr] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
          <aside className="relative hidden border-r border-iron md:block">
            <div className="flex items-center gap-2 border-b border-iron px-4 py-4 text-[18px] font-semibold"><span className="h-2 w-2 rounded-full bg-quant-red-bright" />Quant<span className="text-quant-red-bright">Lab</span></div>
            <div className="space-y-2 p-3"><div className={lbl}>Mercado</div><Select v="NASDAQ" /></div>
            <div className={`${lbl} px-4 pt-2 pb-2`}>Módulos</div>
            <ul>{MODS.map((m) => { const interactive = INTERACTIVE_MODULES.includes(m); return <li key={m}><button type="button" onClick={() => interactive && selectModule(m)} className={`relative w-full px-4 py-2.5 text-left text-[14px] ${module === m ? "bg-quant-red/15 font-medium text-bone" : "text-ash"} ${interactive ? "hover:bg-quant-red/10 hover:text-bone" : "cursor-default"}`}>{m}{interactive && <span className="float absolute right-4 text-[10px] text-ash">⌁</span>}</button></li>; })}</ul>
            {autoSwitch && <span key={cursorKey} aria-hidden className="dashboard-pointer" style={{ "--pointer-top": `${cursorTop}px` } as React.CSSProperties} />}
            <div className="space-y-2 border-t border-iron p-3">
              <div className={lbl}>Temporalidad</div><Select v="15 Minutos" />
              <div className={lbl}>Período de datos</div><Select v="5 Días" />
              <div className="btn btn-red w-full justify-center">▶ Analizar</div>
            </div>
          </aside>

          <div className="relative space-y-5 p-4 sm:p-5 md:min-h-[760px]">
            <div className="flex gap-2 overflow-x-auto md:hidden">
              {INTERACTIVE_MODULES.map((name) => <button key={name} type="button" onClick={() => selectModule(name)} className={`whitespace-nowrap rounded-md border px-3 py-2 text-[12px] ${module === name ? "border-quant-red-bright bg-quant-red/15 text-bone" : "border-iron text-ash"}`}>{name}</button>)}
            </div>
            {draggingChart && <div aria-hidden className="chart-drag-ghost rounded-lg border border-quant-red-bright bg-graphite p-4"><div className="eyebrow text-quant-red-bright">Gráficos</div><div className="mt-2 text-[13px] font-medium">Arrastrando módulo al área de trabajo</div></div>}
            {splitView ? (
              <div className="dashboard-split-view grid gap-4 xl:grid-cols-[1fr_1fr]">
                <div className="min-w-0"><VolumeLiquidity /></div>
                <div className="min-w-0"><TradingViewChart /></div>
              </div>
            ) : (
              <>
                {module === "Volumen y liquidez" && <VolumeLiquidity />}
                {module === "Gráficos" && <TradingViewChart />}
              </>
            )}
            {module === "Ingeniería" && <Engineering />}
            {module === "Confluencias" && <>
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
            </>}
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
