import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.085, anchors: true, autoRaf: false });
    const tick = (time: number) => instance.raf(time * 1000);

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.current = instance;

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
