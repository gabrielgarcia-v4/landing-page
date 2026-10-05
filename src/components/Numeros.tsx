import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealImages, revealLines } from "@/lib/animations";
import { PillLink } from "./ui";

export default function Numeros() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        revealImages(ref.current!);
        gsap.from("[data-pill]", {
          scale: 0.86,
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: "[data-pill]", start: "top 90%", once: true },
        });
        gsap.from("[data-stat]", {
          y: (i) => 85 + i * 30,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-stats]", start: "top 88%", once: true },
        });
        // contadores
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const value = { n: 0 };
          gsap.to(value, {
            n: Number(el.dataset.count),
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => (el.textContent = Math.round(value.n).toString()),
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative z-10 pb-[clamp(95px,8vw,150px)]">
      <div className="mx-auto w-[min(100%-8vw,1920px)] text-center">
        <p data-reveal className="mx-auto max-w-[24ch] text-[clamp(30px,3.4vw,62px)] leading-[1] font-medium tracking-[-0.055em]">
          Tenha no seu lar uma experiência de relaxamento que vai além do comum.
        </p>
        <div data-pill className="mt-[clamp(40px,4.5vw,75px)]">
          <PillLink href="#como-comprar">Quero ter um SPA Jacuzzi®</PillLink>
        </div>
      </div>

      <div
        data-stats
        className="mx-auto mt-[clamp(80px,9vw,180px)] grid w-[min(100%-8vw,1700px)] items-end gap-[clamp(18px,3vw,60px)] md:grid-cols-[588fr_606fr_428fr]"
      >
        <article data-stat className="h-[clamp(460px,38vw,560px)] overflow-hidden rounded-[var(--radius-card)] bg-aqua px-3 pt-9 pb-3 text-ink">
          <div className="mx-[clamp(14px,2vw,34px)] mb-7 flex flex-col">
            <strong className="text-[clamp(46px,4vw,72px)] leading-none font-medium">
              +<span data-count="60">60</span>
            </strong>
            <span className="mt-1 text-[clamp(16px,1.35vw,24px)] font-light">anos de tradição em SPAs</span>
          </div>
          <figure data-reveal-image className="relative h-[calc(100%-140px)] overflow-hidden rounded-[14px]">
            <Image src="/images/spa-noite.webp" alt="SPA Jacuzzi® em área externa à noite" fill sizes="(max-width: 768px) 100vw, 36vw" className="object-cover" />
          </figure>
        </article>

        <figure data-stat data-reveal-image className="relative h-[clamp(480px,44vw,660px)] overflow-hidden rounded-[var(--radius-card)]">
          <Image src="/images/spa-retrato.webp" alt="SPA Jacuzzi® integrado ao paisagismo" fill sizes="(max-width: 768px) 100vw, 38vw" className="object-cover" />
        </figure>

        <article data-stat className="h-[clamp(480px,44vw,660px)] overflow-hidden rounded-[var(--radius-card)] bg-aqua px-3 pt-9 pb-3 text-ink">
          <div className="mx-[clamp(14px,2vw,28px)] flex flex-col">
            <strong className="text-[clamp(40px,3.4vw,62px)] leading-none font-medium">
              <span data-count="3">3</span> a <span data-count="9">9</span>
            </strong>
            <span className="mt-1 text-[clamp(16px,1.35vw,24px)] font-light">pessoas, em modelos para cada espaço</span>
          </div>
          <figure data-reveal-image className="relative mt-8 h-[calc(100%-150px)] overflow-hidden">
            <Image src="/images/modelos/j-220.webp" alt="SPA Jacuzzi® J-220 em um deck de madeira" fill sizes="(max-width: 768px) 100vw, 26vw" className="object-cover" />
          </figure>
        </article>
      </div>
    </section>
  );
}
