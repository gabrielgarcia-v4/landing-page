import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealImages, revealLines } from "@/lib/animations";
import { modelos } from "@/content/spas";
import { Arrow } from "./ui";

export default function Modelos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        revealImages(ref.current!);
        gsap.from("[data-actions]", {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-actions]", start: "top 90%", once: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-label]").forEach((el) =>
          gsap.from(el.children, {
            y: 20,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="modelos" className="relative z-10 py-[clamp(90px,10vw,180px)]">
      <div className="mx-auto w-[min(100%-8vw,1920px)]">
        <div className="mb-[clamp(32px,4vw,58px)] flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 data-reveal className="text-[clamp(42px,4.8vw,88px)] leading-[0.98] font-medium tracking-[-0.06em]">
            Encontre o SPA perfeito
            <br />
            para o seu espaço
          </h2>
          <div data-actions className="flex gap-4 self-end md:self-auto">
            <a
              href="#como-comprar"
              data-hover="lift"
              className="inline-flex min-h-[clamp(52px,4.4vw,74px)] items-center rounded-lg bg-ink px-6 text-[clamp(14px,1.2vw,20px)] text-white"
            >
              Fale com um especialista
            </a>
            <a
              href="#como-comprar"
              data-hover="lift"
              aria-label="Fale com um especialista"
              className="grid aspect-square min-h-[clamp(52px,4.4vw,74px)] place-items-center rounded-xl bg-ink text-white"
            >
              <Arrow className="size-7" />
            </a>
          </div>
        </div>

        <p className="mb-8 max-w-xl text-[clamp(15px,1.2vw,19px)] text-ink/70">
          Opções para diversos gostos e orçamentos, sempre com a qualidade e a exclusividade que só a Jacuzzi® pode
          oferecer.
        </p>

        <ul className="grid gap-[clamp(14px,1.4vw,24px)] md:grid-cols-2">
          {modelos.map((m, i) => (
            <li key={m.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <figure
                data-reveal-image
                data-hover="card"
                className={`relative overflow-hidden rounded-[var(--radius-card)] ${i === 0 ? "h-[clamp(300px,36vw,640px)]" : "h-[clamp(240px,21vw,400px)]"}`}
              >
                <Image
                  src={`/images/modelos/${m.slug}.webp`}
                  alt={`SPA Jacuzzi® ${m.nome}`}
                  fill
                  sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover"
                />
                <a
                  href="#como-comprar"
                  data-hover-plus
                  aria-label={`Quero o ${m.nome}`}
                  className="absolute top-5 right-5 z-10 grid size-12 place-items-center rounded-full bg-white text-2xl font-light text-ink shadow-lg"
                >
                  +
                </a>
                <figcaption data-label className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4">
                  <span className="rounded-xl bg-white/85 px-4 py-2 text-[clamp(15px,1.3vw,22px)] font-medium backdrop-blur-md">
                    {m.nome}
                  </span>
                  <span className="rounded-xl bg-teal/90 px-4 py-2 text-[clamp(13px,1vw,16px)] text-white backdrop-blur-md">
                    {m.pessoas} pessoas
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
