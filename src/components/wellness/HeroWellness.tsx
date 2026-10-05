import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CircleLink } from "../ui";

// Mesma mecânica do hero clássico, mas a janela é um arco que se abre até a tela cheia.
const arch = (side: number) => {
  const r = (window.innerWidth * (50 - side)) / 100;
  return `inset(0% ${side}% 0% ${side}% round ${r}px ${r}px 0px 0px)`;
};
const FULL = "inset(0% 0% 0% 0% round 0px 0px 0px 0px)";

export default function HeroWellness() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, mobile: "(max-width: 700px)" }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        if (!motion) return;
        const side = mobile ? 10 : 33;

        // Entrada lenta, como uma respiração.
        const split = SplitText.create("[data-word]", { type: "chars", mask: "chars" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-window-in]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "power3.inOut" })
          .from("[data-window-in] img", { scale: 1.3, duration: 2.6 }, 0)
          .from(split.chars, { yPercent: 100, autoAlpha: 0, duration: 1.8, stagger: 0.09 }, 0.6)
          .from("[data-small]", { y: 24, autoAlpha: 0, duration: 1.4, stagger: 0.15 }, 1)
          .from("[data-spa-in]", { y: 140, autoAlpha: 0, duration: 2.2 }, 0.9)
          .from("[data-cta-in]", { scale: 0.7, autoAlpha: 0, duration: 1.4, ease: "back.out(1.4)" }, 1.5);

        // A água "respira" dentro do arco enquanto a página está parada.
        gsap.to("[data-breathe]", { scale: 1.05, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.9}`,
              pin: true,
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          })
          .fromTo("[data-window]", { clipPath: () => arch(side) }, { clipPath: FULL, duration: 1 }, 0)
          .to("[data-window] [data-zoom]", { scale: 1.08, duration: 1 }, 0)
          .to("[data-type]", { scale: mobile ? 0.94 : 0.82, yPercent: -6, duration: 1 }, 0)
          .to("[data-type] [data-tint]", { color: "#efe9df", duration: 0.7 }, 0.15)
          .to("[data-spa]", { scale: 0.8, yPercent: 8, duration: 1 }, 0)
          .to("[data-cta]", { autoAlpha: 0, y: 30, duration: 0.3 }, 0);

        gsap.to("[data-spa-drift]", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger: document.getElementById("manifesto"), start: "top bottom", end: "top top", scrub: 1.4 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="inicio" aria-label="SPAs Jacuzzi® — bem-estar" className="relative z-20 h-svh min-h-[640px]">
      <div data-window className="arch-window absolute inset-0">
        <div data-window-in className="absolute inset-0 overflow-hidden">
          <div data-zoom className="absolute inset-0">
            <div data-breathe className="absolute inset-0">
              <Image
                src="/images/jatos.webp"
                alt="Água em movimento com os jatos de hidromassagem Jacuzzi®"
                fill
                preload
                sizes="100vw"
                className="object-cover object-[85%_75%] saturate-[0.55] sepia-[0.15]"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-teal-deep/25 mix-blend-multiply" />
        </div>
      </div>

      <div data-type className="absolute top-[18%] left-[6%] z-10 w-[88%] max-md:top-[24%] max-md:left-[5%] max-md:w-[90%]">
        <p data-small data-tint className="text-[clamp(12px,1vw,15px)] tracking-[0.35em] text-teal-deep uppercase">
          Bem-estar total
        </p>
        <h1
          data-word
          data-tint
          className="-ml-[0.03em] font-editorial text-[clamp(100px,24vw,420px)] leading-[0.95] font-light tracking-[-0.04em] text-teal italic max-md:text-[29vw] max-md:text-teal-deep"
        >
          respire
        </h1>
        <p data-small data-tint className="text-right font-editorial text-[clamp(22px,2.6vw,42px)] leading-none text-teal-deep italic">
          SPAs Jacuzzi<sup className="text-[0.5em]">®</sup>
        </p>
      </div>

      <div
        data-spa
        className="hero-spa pointer-events-none absolute top-[48%] left-1/2 z-20 w-[min(60vw,980px)] -translate-x-1/2 max-md:top-[44%] max-md:w-[112vw]"
      >
        <div data-spa-drift>
          <div data-spa-in>
            <Image
              src="/images/spa-hero.webp"
              alt="SPA Jacuzzi® J-475 com hidromassagem ligada"
              width={1413}
              height={667}
              preload
              sizes="(max-width: 700px) 112vw, 60vw"
              className="h-auto w-full drop-shadow-[0_30px_40px_rgba(46,58,50,0.22)]"
            />
          </div>
        </div>
      </div>

      <div data-cta className="absolute bottom-[8%] left-[6%] z-30">
        <div data-cta-in>
          <CircleLink href="#rituais" variant="outline">
            SEU
            <br />
            RITUAL
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
