import { gsap, useGSAP } from "@/lib/gsap";

type Build = (el: HTMLElement) => gsap.core.Timeline;

// Hovers em movimento também são GSAP (regra do CLAUDE.md). Marque o elemento com data-hover.
const effects: Record<string, Build> = {
  // círculo da referência de vinho
  rotate: (el) => gsap.timeline({ paused: true }).to(el, { rotation: -8, duration: 0.35, ease: "power2.out" }),
  // botões da referência de viagem
  lift: (el) => gsap.timeline({ paused: true }).to(el, { y: -5, duration: 0.4, ease: "power3.out" }),
  // pílula com seta que gira
  pill: (el) =>
    gsap
      .timeline({ paused: true })
      .to(el, { scale: 1.025, duration: 0.45, ease: "power3.out" })
      .to(el.querySelector("[data-hover-arrow]"), { rotation: -28, duration: 0.45, ease: "power3.out" }, 0),
  // cards de imagem: zoom leve + botão "+" girando
  card: (el) =>
    gsap
      .timeline({ paused: true })
      .to(el.querySelector("img"), { scale: 1.035, duration: 1, ease: "power3.out" })
      .to(el.querySelector("[data-hover-plus]"), { rotation: 90, scale: 1.06, duration: 0.4, ease: "power3.out" }, 0),
  // sublinhado que entra da esquerda e sai pela direita
  underline: (el) => {
    const line = el.querySelector("[data-underline]");
    return gsap
      .timeline({ paused: true })
      .fromTo(line, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.4, ease: "power3.out" });
  },
  nudge: (el) => gsap.timeline({ paused: true }).to(el, { x: 5, duration: 0.3, ease: "power2.out" }),
};

export default function HoverEffects() {
  // Delegação no document: funciona para qualquer elemento [data-hover], mesmo os que
  // montam depois deste componente (páginas, troca de rota).
  useGSAP(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const timelines = new Map<HTMLElement, gsap.core.Timeline>();
    const get = (el: HTMLElement) => {
      let tl = timelines.get(el);
      if (!tl) {
        const build = effects[el.dataset.hover ?? ""];
        if (!build) return null;
        tl = build(el);
        timelines.set(el, tl);
      }
      return tl;
    };
    const find = (node: EventTarget | null) =>
      node instanceof Element ? node.closest<HTMLElement>("[data-hover]") : null;

    const over = (e: Event) => {
      const el = find(e.target);
      const from = find((e as MouseEvent).relatedTarget);
      if (el && el !== from) get(el)?.timeScale(1).play();
    };
    const out = (e: Event) => {
      const el = find(e.target);
      const to = find((e as MouseEvent).relatedTarget);
      if (el && el !== to && !el.contains((e as MouseEvent).relatedTarget as Node)) get(el)?.timeScale(1.4).reverse();
    };

    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("focusin", over);
    document.addEventListener("focusout", out);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("focusin", over);
      document.removeEventListener("focusout", out);
      timelines.forEach((tl) => tl.kill());
    };
  });

  return null;
}
