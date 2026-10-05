import type { ReactNode } from "react";

export function Arrow({ className = "size-[1em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Círculo com seta diagonal — assinatura da referência de vinho. */
export function CircleLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
}) {
  const styles = {
    solid: "bg-teal text-white border-teal outline outline-1 outline-teal outline-offset-[3px]",
    outline: "bg-paper/95 text-ink border-ink/30",
    light: "bg-transparent text-white border-white/60",
  }[variant];
  return (
    <a
      href={href}
      data-hover="rotate"
      className={`flex aspect-square w-[clamp(96px,10vw,150px)] flex-col justify-center rounded-full border px-6 font-editorial text-[clamp(18px,1.9vw,28px)] leading-[0.86] ${styles}`}
    >
      <span aria-hidden="true" className="mb-2 font-serif text-[1.5em] leading-[0.8]">
        ↗
      </span>
      {children}
    </a>
  );
}

/** Pílula escura com seta em círculo — assinatura da referência de viagem. */
export function PillLink({ href, children, tone = "dark" }: { href: string; children: ReactNode; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      data-hover="pill"
      className={`inline-flex h-[clamp(60px,5.4vw,88px)] items-center gap-5 rounded-full py-2 pr-2 pl-[clamp(28px,2.6vw,48px)] text-[clamp(17px,1.5vw,24px)] font-medium ${dark ? "bg-ink text-white" : "bg-white text-ink"}`}
    >
      <span>{children}</span>
      <span
        data-hover-arrow
        className={`grid aspect-square h-full place-items-center rounded-full ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}
      >
        <Arrow className="size-[42%]" />
      </span>
    </a>
  );
}
