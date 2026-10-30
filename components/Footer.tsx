import { Logo } from "./Nav";

const COLS: [string, [string, string][]][] = [
  ["Plataforma", [["Módulos", "#plataforma"], ["Asistente IA", "#plataforma"], ["Journal", "https://quantlab-five.vercel.app/web/QuantLab_Journal.html"], ["Planes", "https://quantlab-five.vercel.app/web/quantlab.html"]]],
  ["Recursos", [["Guía de trading cuantitativo", "https://quantlab-five.vercel.app/web/learn.html"], ["Comunidad", "https://discord.gg/yaftTkadHQ"], ["Soporte", "#contacto"]]],
  ["Legal", [["Términos y condiciones", "https://quantlab-five.vercel.app/terms/quantlab-terms.html"], ["Aviso de riesgo", "https://quantlab-five.vercel.app/terms/quantlab-terms.html"], ["Privacidad", "https://quantlab-five.vercel.app/terms/quantlab-terms.html"]]],
];

export default function Footer() {
  return (
    <>
            <footer id="contacto" className="relative z-10 border-t border-iron bg-carbon">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div><Logo /><p className="mt-4 max-w-[280px] text-[14px] leading-[1.57] text-ash">Herramientas cuantitativas de nivel institucional para traders que se toman en serio su trabajo.</p></div>
          {COLS.map(([t, ls]) => (
            <div key={t}>
              <h4 className="eyebrow text-bone">{t}</h4>
              <ul className="mt-4 space-y-3 text-[14px]">{ls.map(([l, href]) => <li key={l}><a href={href} className="transition-colors hover:text-quant-red-bright">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-[1200px] border-t border-iron px-6 py-6 text-[12px] leading-[1.5] text-mist">
          Operar en los mercados financieros implica riesgo de pérdida. QuantLab es una herramienta de análisis y no constituye asesoría financiera ni garantiza resultados. © {new Date().getFullYear()} QuantLab.
        </p>
      </footer>
    </>
  );
}
