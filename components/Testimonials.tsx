import Reveal from "./Reveal";

const TESTIMONIALS = Array.from({ length: 10 }, (_, index) => ({
  src: `/testimonio${index + 1}.png`,
  alt: `Resultado de un usuario de QuantLab ${index + 1}`,
}));

export default function Testimonials() {
  return (
    <section className="overflow-hidden border-y border-iron bg-carbon py-24" aria-labelledby="testimonios-title">
      <Reveal variant="clip">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="eyebrow">Resultados de nuestra comunidad</p>
          <h2 id="testimonios-title" className="mt-4 max-w-[760px] text-balance text-[clamp(2.25rem,5.6vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.036em]">
            Ellos operan con datos, no a ciegas
          </h2>
        </div>
      </Reveal>

      <div className="testimonials-viewport mt-16">
        <div className="testimonials-track flex w-max gap-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <figure
              key={`${testimonial.src}-${index}`}
              className="w-[78vw] max-w-[560px] shrink-0 overflow-hidden rounded-lg border border-slate-edge bg-graphite md:w-[44vw]"
            >
              <img
                src={testimonial.src}
                alt={testimonial.alt}
                className="block aspect-[1.55/1] h-auto w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
