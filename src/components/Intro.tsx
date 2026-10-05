import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("p", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-intro-copy]", start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="essencia" className="relative z-10 mx-auto w-[min(100%-8vw,1440px)] border-b border-line pt-[clamp(110px,14vw,220px)] pb-[clamp(60px,7vw,110px)]">
      <h2 data-reveal className="max-w-[16ch] font-editorial text-[clamp(44px,6vw,96px)] leading-[0.9] font-light tracking-[-0.045em]">
        UMA EXPERIÊNCIA DE RELAXAMENTO QUE VAI ALÉM DO COMUM
      </h2>
      <div data-intro-copy className="mt-[clamp(32px,4vw,60px)] grid max-w-5xl gap-8 text-[clamp(15px,1.3vw,20px)] leading-relaxed text-ink/80 md:grid-cols-2 md:gap-[14%]">
        <p>
          Cada SPA Jacuzzi® é uma obra de arte que combina design avançado, tecnologia de ponta e conforto absoluto, com
          água sempre pronta e aquecida para quando você quiser.
        </p>
        <p>
          Líder global em produtos de luxo para banho e spa, a Jacuzzi® oferece uma experiência de wellness ímpar: bem-estar
          físico, mental e emocional, no seu próprio espaço.
        </p>
      </div>
    </section>
  );
}
