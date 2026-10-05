import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Único ponto de registro dos plugins. Importe GSAP sempre daqui.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
