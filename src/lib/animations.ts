import { gsap, SplitText } from "./gsap";

/**
 * Revela textos linha a linha (máscara por linha), no estilo das duas referências.
 * Chame dentro de useGSAP/matchMedia para que tudo seja revertido no cleanup.
 */
export function revealLines(
  scope: Element,
  { delay = 0, onScroll = true }: { delay?: number; onScroll?: boolean } = {},
) {
  scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      aria: "auto",
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          rotate: 1.5,
          duration: onScroll ? 1.1 : 1.35,
          stagger: 0.09,
          ease: "power4.out",
          delay,
          scrollTrigger: onScroll
            ? { trigger: el, start: "top 88%", once: true }
            : undefined,
        }),
    });
  });
}

/** Imagens que "sobem" por clip-path com leve zoom de saída. */
export function revealImages(scope: Element) {
  scope.querySelectorAll<HTMLElement>("[data-reveal-image]").forEach((el) => {
    const img = el.querySelector("img");
    const radius = getComputedStyle(el).borderRadius || "0px";
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } })
      .fromTo(
        el,
        { clipPath: `inset(100% 0% 0% 0% round ${radius})` },
        { clipPath: `inset(0% 0% 0% 0% round ${radius})`, duration: 1.35, ease: "power4.inOut" },
      )
      .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.45, ease: "power3.out" }, 0.08);
  });
}

/** Parallax simples em imagens de fundo: [data-parallax] dentro do scope. */
export function parallax(scope: Element) {
  scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax || 8);
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}
