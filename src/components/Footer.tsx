import { useRef } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { PillLink } from "./ui";

const colunas = [
  { titulo: "Linha", links: [["Modelos", "#modelos"], ["Tecnologia", "#tecnologia"]] },
  { titulo: "Compra", links: [["Como comprar", "#como-comprar"], ["Fale com um especialista", "#como-comprar"]] },
  { titulo: "Suporte", links: [["Perguntas frequentes", "#duvidas"], ["Assistência técnica", "#duvidas"]] },
  { titulo: "Legal", links: [["Política de Privacidade", "#"], ["Termos de uso", "#"]] },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        revealLines(ref.current!);
        gsap.from("[data-col]", {
          y: 55,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cols]", start: "top 92%", once: true },
        });
        gsap.to("[data-footer-bg]", {
          scale: 1.09,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 1.2 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative z-10 min-h-[clamp(820px,60vw,1120px)] overflow-hidden bg-ink text-white">
      <div data-footer-bg className="absolute inset-0">
        <Image src="/images/spa-noite.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />

      <div className="relative mx-auto flex min-h-[inherit] w-[min(100%-8vw,1700px)] flex-col justify-between pt-[clamp(120px,11vw,210px)] pb-10">
        <div className="text-center">
          <h2 data-reveal className="mx-auto max-w-[20ch] text-[clamp(40px,5vw,96px)] leading-[0.98] font-light tracking-[-0.05em] text-white/85">
            Bem-estar total, no conforto da sua casa
          </h2>
          <div className="mt-12">
            <PillLink href="#como-comprar" tone="light">
              Quero ter um SPA Jacuzzi®
            </PillLink>
          </div>
        </div>

        <div className="mt-24">
          <div data-cols className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-16">
            {colunas.map((c) => (
              <div key={c.titulo} data-col className="flex flex-col items-start gap-1.5">
                <h3 className="mb-3 text-[clamp(19px,1.6vw,28px)] font-light text-white/80">{c.titulo}</h3>
                {c.links.map(([label, href]) => (
                  <a key={label} href={href} data-hover="nudge" className="text-[clamp(14px,1.05vw,17px)] font-light text-white/80 hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/15 pt-8 text-xs text-white/55 md:flex-row md:items-center">
            <Image src="/images/logo-branco.webp" alt="Jacuzzi®" width={800} height={321} className="w-24 opacity-80" />
            <p>JACUZZI DO BRASIL IND. E COM. LTDA. · CNPJ 59.105.007/0001-10 · Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
