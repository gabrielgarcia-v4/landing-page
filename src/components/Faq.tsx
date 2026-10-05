import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { revealLines } from "@/lib/animations";
import { faq } from "@/content/spas";

export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [aberto, setAberto] = useState<number | null>(0);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set("[data-answer]", { height: 0 });
      gsap.set("[data-answer='0']", { height: "auto" });
      gsap.set("[data-icon='0']", { rotation: 45 });
      gsap.matchMedia().add(MOTION_OK, () => revealLines(ref.current!));
    },
    { scope: ref },
  );

  const toggle = contextSafe((i: number) => {
    const next = aberto === i ? null : i;
    if (aberto !== null) {
      gsap.to(`[data-answer='${aberto}']`, { height: 0, duration: 0.5, ease: "power3.inOut" });
      gsap.to(`[data-icon='${aberto}']`, { rotation: 0, duration: 0.4 });
    }
    if (next !== null) {
      gsap.to(`[data-answer='${next}']`, { height: "auto", duration: 0.6, ease: "power3.inOut" });
      gsap.to(`[data-icon='${next}']`, { rotation: 45, duration: 0.4 });
    }
    setAberto(next);
  });

  return (
    <section ref={ref} id="duvidas" className="relative z-10 border-t border-line py-[clamp(90px,10vw,170px)]">
      <div className="mx-auto grid w-[min(100%-8vw,1440px)] gap-12 lg:grid-cols-[1fr_1.4fr]">
        <h2 data-reveal className="font-editorial text-[clamp(44px,5.6vw,96px)] leading-[0.9] font-light tracking-[-0.045em]">
          PERGUNTAS
          <br />
          FREQUENTES
        </h2>
        <ul>
          {faq.map((item, i) => (
            <li key={item.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={aberto === i}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(17px,1.4vw,22px)] font-medium"
                >
                  {item.q}
                  <span data-icon={i} aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/20 text-xl font-light">
                    +
                  </span>
                </button>
              </h3>
              <div id={`faq-${i}`} data-answer={i} className="overflow-hidden" role="region">
                <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-ink/70">{item.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
