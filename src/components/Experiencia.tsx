import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { parallax, revealImages, revealLines } from "@/lib/animations";

export default function Experiencia() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        revealImages(ref.current!);
        parallax(ref.current!);
        // o card "abre" enquanto entra na tela (referência de viagem)
        gsap.fromTo(
          "[data-exp-card]",
          { y: 100, scale: 0.94, clipPath: "inset(10% 8% 10% 8% round 52px)" },
          {
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 52px)",
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 78%", end: "center center", scrub: 1 },
          },
        );
        gsap.from("[data-eyebrow]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-eyebrow]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative z-10 flex min-h-[clamp(860px,62vw,1200px)] items-center justify-center overflow-hidden py-16">
      <div className="absolute inset-[-8%_0]" data-parallax="7">
        <Image src="/images/jardim-noite.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <article
        data-exp-card
        className="relative grid w-[min(100%-32px,1665px)] gap-[clamp(26px,3.3vw,64px)] rounded-[clamp(26px,3vw,52px)] bg-aqua p-[clamp(18px,2.6vw,48px)] md:w-[calc(100%-clamp(80px,13vw,256px))] md:grid-cols-[2fr_1fr]"
      >
        <figure data-reveal-image className="relative min-h-[360px] overflow-hidden rounded-[clamp(15px,1.4vw,24px)] md:min-h-[clamp(520px,36vw,700px)]">
          <Image src="/images/modelos/j-185-vip.webp" alt="SPA Jacuzzi® J-185 VIP em um deck com lounge" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
        </figure>
        <div className="self-center text-ink">
          <span data-eyebrow className="mb-6 inline-block rounded-lg border-2 border-ink px-3.5 py-1.5 text-[clamp(14px,1.2vw,22px)] font-light">
            Exclusividade e conforto
          </span>
          <h2 data-reveal className="text-[clamp(32px,2.9vw,56px)] leading-[0.98] font-medium tracking-[-0.05em]">
            Seu espaço merece a exclusividade e o conforto de um SPA Jacuzzi®
          </h2>
          <p className="mt-6 max-w-md text-[clamp(15px,1.1vw,18px)] leading-relaxed text-ink/75">
            Todos os modelos vêm de série com hidromassagem, filtração, aquecimento e cobertura térmica.
          </p>
        </div>
      </article>
    </section>
  );
}
