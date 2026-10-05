import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { parallax, revealLines } from "@/lib/animations";
import { tecnologias } from "@/content/spas";
import { CircleLink } from "./ui";

export default function Tecnologia() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add({ motion: MOTION_OK, mobile: "(max-width: 700px)" }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        if (!motion) return;
        revealLines(ref.current!);
        parallax(ref.current!);
        gsap.from("[data-tech]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-tech-list]", start: "top 85%", toggleActions: "play none none reverse" },
        });
        // cartões inclinados que se endireitam com o scroll (retratos da referência de vinho)
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            el,
            { y: mobile ? 25 : 90, rotation: 18 * dir },
            {
              y: mobile ? -10 : -40,
              rotation: 7 * dir,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 + i * 0.15 },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="tecnologia" className="relative z-10 overflow-hidden bg-ink text-paper">
      <div className="absolute inset-[-8%_0]" data-parallax="6">
        <Image src="/images/spa-jardim.webp" alt="" fill sizes="100vw" className="object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/90" />

      <div className="relative mx-auto w-[min(100%-8vw,1440px)] py-[clamp(100px,12vw,200px)]">
        <p className="mb-5 font-editorial text-[clamp(18px,2vw,30px)] text-aqua">Cada detalhe importa</p>
        <h2 data-reveal className="font-editorial text-[clamp(48px,7vw,120px)] leading-[0.86] font-light tracking-[-0.05em]">
          TECNOLOGIA
          <br />
          EXCLUSIVA
        </h2>

        <ul data-tech-list className="mt-[clamp(60px,7vw,120px)] grid gap-[clamp(48px,5vw,80px)] md:grid-cols-3">
          {tecnologias.map((t) => (
            <li key={t.nome} data-tech className="flex flex-col gap-6">
              <div data-tilt className="relative aspect-[313/265] w-[min(70%,260px)] overflow-hidden rounded-[14px] shadow-2xl">
                <Image src={t.imagem} alt={`${t.tipo} ${t.nome}`} fill sizes="260px" className="object-cover" />
              </div>
              <div>
                <span className="text-[12px] tracking-[0.18em] text-aqua uppercase">{t.tipo}</span>
                <h3 className="mt-1 font-editorial text-[clamp(36px,3.4vw,56px)] leading-none font-light">{t.nome}</h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/75">{t.texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(80px,9vw,150px)] flex flex-col items-start justify-between gap-10 border-t border-paper/20 pt-12 md:flex-row md:items-center">
          <h2 data-reveal className="font-editorial text-[clamp(30px,3.4vw,56px)] leading-[0.95] font-light tracking-[-0.03em]">
            DESIGN AVANÇADO,
            <br />
            TECNOLOGIA DE PONTA
            <br />E CONFORTO ABSOLUTO.
          </h2>
          <CircleLink href="#como-comprar" variant="light">
            FALE
            <br />
            CONOSCO
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
