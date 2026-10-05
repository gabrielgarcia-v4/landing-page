import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealImages, revealLines } from "@/lib/animations";
import { modelos } from "@/content/spas";
import { PillLink } from "../ui";

export default function ModelosWellness() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        revealImages(ref.current!);
        gsap.utils.toArray<HTMLElement>("[data-modelo]").forEach((el, i) =>
          gsap.from(el.querySelectorAll("[data-fade]"), {
            y: 24,
            autoAlpha: 0,
            duration: 1.2,
            stagger: 0.08,
            delay: 0.4 + (i % 3) * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="modelos" className="relative z-10 border-t border-line py-[clamp(100px,11vw,190px)]">
      <div className="mx-auto w-[min(100%-8vw,1500px)]">
        <div className="mb-[clamp(50px,6vw,90px)] text-center">
          <h2 data-reveal className="font-editorial text-[clamp(40px,5vw,84px)] leading-[0.95] font-light tracking-[-0.03em]">
            Encontre o seu
            <br />
            <em className="text-teal">lugar de calma</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
            Opções para diversos gostos e orçamentos, sempre com a qualidade e a exclusividade que só a Jacuzzi® pode
            oferecer.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-[clamp(20px,2.4vw,40px)] gap-y-16">
          {modelos.map((m) => (
            <li key={m.slug} data-modelo className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)]">
              <a href="#como-comprar" data-hover="card" className="block">
                <figure data-reveal-image className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[24px]">
                  <Image src={`/images/modelos/${m.slug}.webp`} alt={`SPA Jacuzzi® ${m.nome}`} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw" className="object-cover" />
                  <span
                    data-hover-plus
                    aria-hidden="true"
                    className="absolute right-5 bottom-5 grid size-11 place-items-center rounded-full bg-paper/90 text-xl font-light text-ink"
                  >
                    +
                  </span>
                </figure>
                <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h3 data-fade className="font-editorial text-[clamp(28px,2.4vw,40px)] leading-none font-light">
                    {m.nome}
                  </h3>
                  <span data-fade className="text-sm text-ink/60">
                    {m.pessoas} pessoas
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-20 text-center">
          <PillLink href="#como-comprar">Quero o meu SPA Jacuzzi®</PillLink>
        </div>
      </div>
    </section>
  );
}
