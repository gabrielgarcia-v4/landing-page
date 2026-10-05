import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealImages, revealLines } from "@/lib/animations";
import { rituais } from "@/content/wellness";

export default function Rituais() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        revealImages(ref.current!);

        // Guia de respiração: 4s inspirando, 4s expirando.
        gsap
          .timeline({ repeat: -1 })
          .to("[data-breath-circle]", { scale: 1, duration: 4, ease: "sine.inOut" })
          .to("[data-breath-in]", { autoAlpha: 0, duration: 0.4 }, 3.6)
          .to("[data-breath-out]", { autoAlpha: 1, duration: 0.4 }, 3.8)
          .to("[data-breath-circle]", { scale: 0.55, duration: 4, ease: "sine.inOut" })
          .to("[data-breath-out]", { autoAlpha: 0, duration: 0.4 }, 7.6)
          .to("[data-breath-in]", { autoAlpha: 1, duration: 0.4 }, 7.8);

        gsap.from("[data-ritual]", {
          y: (i) => 60 + i * 40,
          autoAlpha: 0,
          duration: 1.6,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-rituais]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="rituais" className="relative z-10 bg-mist py-[clamp(100px,11vw,190px)]">
      <div className="mx-auto w-[min(100%-8vw,1600px)]">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-12 grid size-40 place-items-center" aria-hidden="true">
            <div data-breath-circle className="absolute inset-0 scale-[0.55] rounded-full bg-teal/15 ring-1 ring-teal/30" />
            <span data-breath-in className="relative font-editorial text-xl text-teal-deep italic">
              inspire
            </span>
            <span data-breath-out className="invisible absolute font-editorial text-xl text-teal-deep italic opacity-0">
              expire
            </span>
          </div>
          <h2 data-reveal className="font-editorial text-[clamp(40px,5vw,84px)] leading-[0.95] font-light tracking-[-0.03em]">
            Um ritual para
            <br />
            <em className="text-teal">cada momento do dia</em>
          </h2>
        </div>

        <ul data-rituais className="mt-[clamp(60px,7vw,110px)] grid items-end gap-[clamp(28px,3vw,56px)] md:grid-cols-3">
          {rituais.map((r, i) => (
            <li key={r.momento} data-ritual className={i === 1 ? "md:-translate-y-16" : ""}>
              <figure data-reveal-image className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[24px]">
                <Image src={r.imagem} alt={`SPA Jacuzzi® — ritual de ${r.momento.toLowerCase()}`} fill sizes="(max-width: 768px) 92vw, 30vw" className="object-cover" />
              </figure>
              <h3 className="mt-7 font-editorial text-[clamp(30px,2.6vw,44px)] leading-none font-light italic">{r.momento}</h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-ink/70">{r.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
