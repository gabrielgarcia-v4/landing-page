import { useRef, useState } from "react";
import Image from "@/components/Image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

const links = [
  { href: "#modelos", label: "Modelos" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#como-comprar", label: "Como comprar" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(ref.current, { y: -30, autoAlpha: 0, duration: 1, delay: 0.6, ease: "power3.out" });
    },
    { scope: ref },
  );

  const toggle = contextSafe((next: boolean) => {
    setOpen(next);
    if (next) {
      gsap
        .timeline()
        .fromTo(
          "[data-mobile-nav]",
          { autoAlpha: 0, y: -12, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
        )
        .fromTo("[data-mobile-nav] a", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.3 }, 0.1);
      lenis.current?.stop();
    } else {
      gsap.to("[data-mobile-nav]", { autoAlpha: 0, y: -12, scale: 0.98, duration: 0.25, ease: "power2.in" });
      lenis.current?.start();
    }
  });

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[4vw] py-6 text-white ${open ? "" : "mix-blend-difference"}`}
    >
      <a href="#inicio" aria-label="Jacuzzi — voltar ao início" className="block w-[clamp(92px,8vw,128px)]">
        <Image src="/images/logo-branco.webp" alt="Jacuzzi®" width={800} height={321} preload className={open ? "invert" : ""} />
      </a>

      <nav aria-label="Navegação principal" className="hidden gap-[clamp(24px,3vw,52px)] text-[13px] tracking-[0.12em] uppercase md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} data-hover="underline" className="relative py-3">
            {l.label}
            <span data-underline className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-current" />
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className={`relative z-10 flex size-12 flex-col items-center justify-center gap-1.5 rounded-2xl border md:hidden ${open ? "border-ink/20 text-ink" : "border-white/60"}`}
      >
        <span className={`block h-px w-5 bg-current ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
        <span className={`block h-px w-5 bg-current ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
      </button>

      <nav
        id="menu-mobile"
        data-mobile-nav
        aria-label="Navegação principal"
        aria-hidden={!open}
        className="invisible absolute inset-x-4 top-4 flex flex-col rounded-3xl bg-paper/95 px-4 pt-20 pb-4 text-ink opacity-0 shadow-2xl backdrop-blur-xl md:hidden"
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => toggle(false)} tabIndex={open ? 0 : -1} className="rounded-xl px-3 py-4 font-editorial text-3xl">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
