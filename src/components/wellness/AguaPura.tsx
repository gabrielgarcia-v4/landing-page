import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { agua } from "@/content/wellness";

export default function AguaPura() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.utils.toArray<HTMLElement>("[data-item]").forEach((el) => {
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } })
            .from(el.querySelector("[data-line]"), { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.out" })
            .from(el.querySelectorAll("[data-fade]"), { y: 30, autoAlpha: 0, duration: 1.3, stagger: 0.1, ease: "expo.out" }, 0.15)
            .from(el.querySelector("[data-orb]"), { scale: 0.6, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.1);
        });
        // Ondas suaves no fundo
        gsap.to("[data-ripple]", { scale: 1.6, autoAlpha: 0, duration: 6, ease: "sine.out", stagger: 2, repeat: -1 });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="tecnologia" className="relative z-10 overflow-hidden py-[clamp(100px,11vw,190px)]">
      <div className="pointer-events-none absolute top-24 -right-40 size-[520px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} data-ripple className="absolute inset-0 rounded-full border border-teal/30" />
        ))}
      </div>

      <div className="relative mx-auto grid w-[min(100%-8vw,1440px)] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-5 text-[12px] tracking-[0.35em] text-teal-deep uppercase">Tecnologia Jacuzzi®</p>
          <h2 data-reveal className="font-editorial text-[clamp(40px,5vw,84px)] leading-[0.95] font-light tracking-[-0.03em]">
            Água pura,
            <br />
            <em className="text-teal">cuidado leve</em>
          </h2>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-ink/70">
            Menos manutenção e menos químicos, para que o seu tempo na água seja só descanso.
          </p>
        </div>

        <ul>
          {agua.map((a) => (
            <li key={a.nome} data-item className="relative grid grid-cols-[88px_1fr] gap-6 py-10 sm:grid-cols-[120px_1fr] sm:gap-10">
              <span data-line className="absolute inset-x-0 top-0 h-px bg-line" />
              <div data-orb className="relative aspect-square overflow-hidden rounded-full">
                <Image src={a.imagem} alt={a.nome} fill sizes="120px" className="object-cover" />
              </div>
              <div>
                <p data-fade className="text-[12px] tracking-[0.25em] text-clay uppercase">
                  {a.nome}
                </p>
                <h3 data-fade className="mt-2 font-editorial text-[clamp(30px,2.8vw,46px)] leading-none font-light">
                  {a.titulo}
                </h3>
                <p data-fade className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
                  {a.texto}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
