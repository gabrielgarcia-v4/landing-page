import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CircleLink } from "./ui";

// Janela de paisagem que se abre até ocupar a tela (mesma forma da referência de vinho).
const WINDOW_FULL = "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, mobile: "(max-width: 700px)" }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        if (!motion) return;

        // Entrada — cada camada anima um wrapper próprio para não brigar com o scroll.
        const split = SplitText.create("[data-hero-word]", { type: "chars", mask: "chars" });
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .fromTo("[data-hero-window-in]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.inOut" })
          .from("[data-hero-window-in] img", { scale: 1.25, duration: 2 }, 0)
          .from(split.chars, { yPercent: 105, duration: 1.3, stagger: 0.07 }, 0.45)
          .from("[data-hero-small]", { yPercent: 120, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.7)
          .from("[data-hero-spa-in]", { yPercent: 35, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.75)
          .from("[data-hero-cta-in]", { scale: 0.6, rotation: -30, autoAlpha: 0, duration: 1, ease: "back.out(1.6)" }, 1.1);

        // Scroll — hero fixo enquanto a janela se abre, o título encolhe e clareia e o SPA desce.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.8}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to("[data-hero-window]", { clipPath: WINDOW_FULL, duration: 1 }, 0)
          .to("[data-hero-window] img", { scale: 1.07, duration: 1 }, 0)
          .to("[data-hero-type]", { scale: mobile ? 0.94 : 0.8, yPercent: -8, duration: 1 }, 0)
          .to("[data-hero-type] [data-tint]", { color: "#f4f2ec", duration: 0.7 }, 0.15)
          .to("[data-hero-spa]", { scale: 0.78, yPercent: 10, duration: 1 }, 0)
          .to("[data-hero-cta]", { autoAlpha: 0, y: 35, duration: 0.3 }, 0);

        // Depois de soltar o pin, o SPA continua descendo sobre a próxima seção.
        gsap.to("[data-hero-spa-drift]", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: { trigger: document.getElementById("essencia"), start: "top bottom", end: "top top", scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="inicio" aria-label="SPAs Jacuzzi®" className="relative z-20 h-svh min-h-[640px]">
      <div data-hero-window className="hero-window absolute inset-0">
        <div data-hero-window-in className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/jatos.webp"
            alt="Água em movimento com os jatos de hidromassagem Jacuzzi®"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[85%_75%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/30" />
        </div>
      </div>

      <div data-hero-type className="absolute top-[17%] left-[7%] z-10 w-[86%] max-md:top-[24%] max-md:left-[5%] max-md:w-[90%]">
        <div className="overflow-hidden">
          <p data-hero-small data-tint className="font-editorial text-[clamp(24px,3.2vw,52px)] leading-none tracking-[-0.03em] text-teal-deep">
            BEM-ESTAR &amp; LUXO
          </p>
        </div>
        <h1
          data-hero-word
          data-tint
          className="-ml-[0.04em] font-editorial text-[clamp(116px,27vw,460px)] leading-[0.82] font-light tracking-[-0.06em] text-teal max-md:text-[38vw] max-md:leading-[0.95]"
        >
          SPAS
        </h1>
        <div className="overflow-hidden text-right">
          <p data-hero-small data-tint className="mt-3 font-editorial text-[clamp(24px,3.2vw,52px)] leading-none tracking-[-0.03em] text-teal-deep">
            JACUZZI<sup className="text-[0.5em]">®</sup>
          </p>
        </div>
      </div>

      <div
        data-hero-spa
        className="hero-spa pointer-events-none absolute top-[46%] left-1/2 z-20 w-[min(64vw,1040px)] -translate-x-1/2 max-md:top-[41%] max-md:w-[118vw]"
      >
        <div data-hero-spa-drift>
          <div data-hero-spa-in>
            <Image
              src="/images/spa-hero.webp"
              alt="SPA Jacuzzi® J-475 com hidromassagem ligada"
              width={1413}
              height={667}
              preload
              sizes="(max-width: 700px) 118vw, 64vw"
              className="h-auto w-full drop-shadow-[0_30px_30px_rgba(16,35,42,0.25)]"
            />
          </div>
        </div>
      </div>

      <div data-hero-cta className="absolute bottom-[8%] left-[6%] z-30 max-md:bottom-[6%] max-md:left-[6%]">
        <div data-hero-cta-in>
          <CircleLink href="#modelos" variant="outline">
            VER
            <br />
            MODELOS
          </CircleLink>
        </div>
      </div>
    </section>
  );
}
