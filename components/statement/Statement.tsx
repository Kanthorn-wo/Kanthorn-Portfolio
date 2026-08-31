"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { pick } from "@/lib/localized";
import { PHRASE_A, PHRASE_B } from "@/data/statement";

/* ============================================================
   STATEMENT

   Pinned, and the two phrases share the same physical space:
   the first is struck through and pushed back as the second
   arrives. Reading it feels like a correction being made, which
   is exactly what the copy is doing.
   ============================================================ */
export default function Statement({ ready }: { ready: boolean }) {
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    /* Gated on `ready`, same as Hero. Every pinned section used to
       create its ScrollTrigger the instant it mounted - which for
       Statement/Projects/Experience meant DURING the preloader, while
       Hero's own pin (gated on `ready`) didn't exist yet. That let
       different sections calculate their pin start/end positions
       against different, momentarily-inconsistent document layouts,
       producing a stray ~900px (one viewport) gap between whichever
       two pins happened to straddle the moment Hero's pin appeared.
       refreshPriority alone didn't fix it - it only moved the gap to
       a different boundary. Creating every pin in the same batch,
       after the layout has fully settled, removes the race outright. */
    if (!root || !ready || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // No `pin` option - see the comment in lib/pinLayout.ts. Sticky
      // positioning (in the JSX below) replaces it; ScrollTrigger only
      // has to scrub the timeline across the outer wrapper's height.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.from(".stmt-a .stmt-line-inner", {
        xPercent: (i) => (PHRASE_A[i].from === "left" ? -70 : 70),
        opacity: 0,
        stagger: 0.12,
        ease: "power3.out",
      })
        .to(".stmt-strike", { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, ">-0.1")
        .to(
          ".stmt-a",
          { scale: 0.86, opacity: 0, filter: "blur(6px)", duration: 0.7 },
          ">"
        )
        .from(
          ".stmt-b .stmt-line-inner",
          {
            xPercent: (i) => (PHRASE_B[i].from === "left" ? -70 : 70),
            opacity: 0,
            stagger: 0.12,
            ease: "power3.out",
          },
          "<0.25"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  // Same sticky mechanism as ProjectShowcase/ExperienceSection - see the
  // comment in lib/pinLayout.ts for why GSAP's own `pin` option is not
  // used. The original pin ran for "+=200%" (2 extra viewport heights),
  // so the wrapper is 300vh: 100vh for the sticky box itself + 200vh of
  // scroll-through underneath it.
  const scrollVh = (1 + 2) * 100;

  return (
    <div
      ref={rootRef}
      className="stmt-scroll-outer relative"
      style={{ "--scroll-h": `${scrollVh}vh` } as React.CSSProperties}
    >
      <div className="sticky top-0 z-10 flex min-h-[100svh] items-center px-6 md:px-12">
        <div className="relative w-full max-w-[1600px]">
          {/* Phrase A */}
          <div className="stmt-a">
            {PHRASE_A.map((line) => (
              <span key={line.id} className="line-mask">
                <span className="stmt-line-inner type-statement">
                  {/* `.line-mask > *` forces display:block, so the strike
                      needs its own inline-block box to measure against -
                      on the block it stretched to the full container. */}
                  <span className="relative inline-block">
                    {pick(line.text, locale)}
                    {line.strike && (
                      <span
                        aria-hidden="true"
                        className="stmt-strike absolute left-0 top-[54%] h-[3px] w-full origin-left scale-x-0 bg-[var(--accent-purple)]"
                      />
                    )}
                  </span>
                </span>
              </span>
            ))}
          </div>

          {/* Phrase B occupies the same space */}
          <div className="stmt-b absolute inset-0">
            {PHRASE_B.map((line, i) => (
              <span key={line.id} className="line-mask">
                <span
                  className={`stmt-line-inner type-statement inline-block ${
                    i === 2 ? "gradient-text" : ""
                  }`}
                >
                  {pick(line.text, locale)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
