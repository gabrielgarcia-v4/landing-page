import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { pilares } from "@/content/wellness";

export default function Pilares() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => revealLines(ref.current!));

      // Desktop: os seis pilares deslizam na horizontal com a seção fixa.
      mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Cada imagem tem um leve parallax interno ligado ao deslize horizontal.
        gsap.utils.toArray<HTMLElement>("[data-pilar-img]").forEach((img) =>
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          ),
        );
      });

      mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-pilar]").forEach((el) =>
          gsap.from(el, { y: 60, autoAlpha: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative z-10 border-t border-line">
      <div data-pin className="flex min-h-svh flex-col justify-center overflow-hidden py-14">
        <div className="mx-auto mb-12 flex w-[min(100%-8vw,1700px)] items-end justify-between gap-8">
          <h2 data-reveal className="font-editorial text-[clamp(40px,5vw,84px)] leading-[0.95] font-light tracking-[-0.03em]">
            Os seis pilares
            <br />
            <em className="text-teal">do bem-estar</em>
          </h2>
          <p className="hidden max-w-xs text-[15px] leading-relaxed text-ink/65 md:block">
            A Jacuzzi® acredita em um bem-estar completo. Cada pilar começa com um momento só seu, dentro da água.
          </p>
        </div>

        <ol data-track className="flex flex-col gap-14 px-[4vw] min-[900px]:w-max min-[900px]:flex-row min-[900px]:gap-[3vw]">
          {pilares.map((p, i) => (
            <li key={p.nome} data-pilar className="flex flex-col gap-6 min-[900px]:w-[min(22vw,360px)]">
              <div className="relative aspect-[5/6] overflow-hidden rounded-t-[999px] rounded-b-[24px]">
                <div data-pilar-img className="absolute inset-[0_-10%]">
                  <Image src={p.imagem} alt="" fill sizes="(max-width: 900px) 92vw, 30vw" className="object-cover saturate-[0.8]" />
                </div>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-editorial text-xl text-clay italic">0{i + 1}</span>
                <div>
                  <h3 className="font-editorial text-[clamp(32px,2.8vw,46px)] leading-none font-light">{p.nome}</h3>
                  <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink/70">{p.texto}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
