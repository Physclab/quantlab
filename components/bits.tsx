export const L = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
export const H = "text-balance text-[clamp(2.25rem,5.6vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.036em]";
export const Serif = ({ children, big = false }: { children: string; big?: boolean }) => <span className={`font-serif font-normal tracking-normal ${big ? "text-[1.4em]" : "text-[1.08em]"}`}>{children}</span>;
export const Head = () => <span aria-hidden className="mx-[0.08em] inline-block h-[0.85em] w-[0.85em] rounded-lg border border-slate-edge bg-graphite bg-[url(/mascot.png)] bg-[length:100%_auto] bg-top bg-no-repeat align-[-0.05em]" />;

export const Lupa = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/magnifier.png" alt="" aria-hidden className="mx-[0.06em] -my-[0.2em] inline-block h-[1.25em] w-auto select-none align-[-0.3em]" />
);

export const Key = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/keycap.png" alt="" aria-hidden className="press mx-[0.08em] -my-[0.3em] inline-block h-[1.4em] w-auto select-none align-[-0.4em]" />
);
