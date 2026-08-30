"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/* ============================================================
   Lenis is driven by the GSAP ticker rather than its own rAF.
   One loop for the whole site means scroll position, ScrollTrigger
   and every tween resolve in the same frame - which is what stops
   pinned sections from shimmering by one frame against the content.
   ============================================================ */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than anything we simulate.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* Anchor links have to go through Lenis, otherwise the native
       jump desynchronises every ScrollTrigger on the page. */
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    /* ------------------------------------------------------------
       Lenis owns scroll, so the browser's native "scroll the newly
       focused element into view" never fires against the real
       document position - a keyboard user can Tab onto a link that
       is sitting hundreds of pixels below the fold and nothing
       visibly happens. Re-implement that behaviour through Lenis,
       but only for genuine keyboard focus: a mouse click already
       put the element in front of the person who clicked it, so
       auto-scrolling on every pointer-driven focus would just be
       jarring. `:focus-visible` is the browser's own signal for
       "this focus came from the keyboard" - lean on it, with a
       manually-tracked flag as a fallback for browsers where the
       pseudo-class selector throws instead of just not matching.
       ------------------------------------------------------------ */
    let usingKeyboard = false;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") usingKeyboard = true;
    };
    const onPointerDown = () => {
      usingKeyboard = false;
    };

    const supportsFocusVisible = (() => {
      try {
        document.body.matches(":focus-visible");
        return true;
      } catch {
        return false;
      }
    })();

    // Content sits under the fixed header, so "in view" has to account
    // for it rather than just the raw viewport edge.
    const topPadding = () => {
      const header = document.querySelector("header");
      const h = header?.getBoundingClientRect().height ?? 0;
      return h + 16;
    };
    const BOTTOM_GAP = 24;

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const isKeyboardFocus = supportsFocusVisible
        ? target.matches(":focus-visible")
        : usingKeyboard;
      if (!isKeyboardFocus) return;

      const rect = target.getBoundingClientRect();
      const top = topPadding();
      const bottom = window.innerHeight - BOTTOM_GAP;

      // Minimal correction, like scrollIntoView({ block: "nearest" }):
      // only move as far as it takes to clear whichever edge the
      // element is crossing, never re-center it.
      let delta = 0;
      if (rect.top < top) {
        delta = rect.top - top;
      } else if (rect.bottom > bottom) {
        delta = rect.bottom - bottom;
        if (rect.top - delta < top) delta = rect.top - top;
      }
      if (!delta) return;

      lenis.scrollTo(lenis.scroll + delta, {
        immediate: prefersReducedMotion(),
        duration: 0.6,
      });
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("focusin", onFocusIn);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
