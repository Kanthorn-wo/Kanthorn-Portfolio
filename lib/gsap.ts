"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


/* Register once. Module scope guarantees this runs a single time
   per client bundle, even across fast-refresh remounts. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* Mobile browsers fire resize on every URL-bar show/hide. Without this,
     every pinned section recalculates mid-scroll and visibly jumps. */
  ScrollTrigger.config({ ignoreMobileResize: true });

  gsap.defaults({ ease: "power3.out", duration: 1 });
}

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on touch-primary devices, where a custom cursor makes no sense. */
export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export { gsap, ScrollTrigger, SplitText };

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  // @ts-expect-error debug-only exposure
  window.__ScrollTrigger = ScrollTrigger;
}
