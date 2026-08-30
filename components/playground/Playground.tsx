"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { experiments, type Experiment } from "@/data/playground";
import Reveal from "@/components/animation/Reveal";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { EASE } from "@/lib/animations";

/* Each experiment runs its own rAF loop or pointer handlers, so
   none of it should sit in the initial bundle. They load when the
   section is reached, not when the page opens. */
const MagneticDemo = dynamic(
  () => import("./experiments").then((m) => m.MagneticDemo),
  { ssr: false }
);
const NetworkDemo = dynamic(
  () => import("./experiments").then((m) => m.NetworkDemo),
  { ssr: false }
);
const RevealDemo = dynamic(
  () => import("./experiments").then((m) => m.RevealDemo),
  { ssr: false }
);
const DistortionDemo = dynamic(
  () => import("./experiments").then((m) => m.DistortionDemo),
  { ssr: false }
);
const TiltDemo = dynamic(
  () => import("./experiments").then((m) => m.TiltDemo),
  { ssr: false }
);
const ScrambleDemo = dynamic(
  () => import("./experiments").then((m) => m.ScrambleDemo),
  { ssr: false }
);

function render(kind: Experiment["kind"]) {
  switch (kind) {
    case "magnetic":
      return <MagneticDemo />;
    case "network":
      return <NetworkDemo />;
    case "reveal":
      return <RevealDemo />;
    case "distortion":
      return <DistortionDemo />;
    case "tilt":
      return <TiltDemo />;
    case "scramble":
      return <ScrambleDemo />;
  }
}

export default function Playground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    // Same masked-line technique as Stack's heading - the h2 tag
    // itself stays outside the mask (no SplitText involved), so it
    // keeps its normal place in the accessibility tree.
    const ctx = gsap.context(() => {
      gsap.from(".pg-head-line", {
        yPercent: 115,
        opacity: 0,
        duration: 1,
        ease: EASE.outStrong,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative z-10 mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-14 max-w-2xl md:mb-20">
        {/* No meta label above the heading: unlike Stack (which pairs
            "Stack" with a different heading, "Tools I speak"), the only
            available label here is the same word as the h2 - a label
            would just repeat "Playground" twice in a row. Section-number
            note: this is not a nav destination, see Stack.tsx. */}
        <div className="line-mask mb-6">
          <h2 className="pg-head-line type-section-title">Playground</h2>
        </div>
        <Reveal y={20}>
          <p className="text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-[var(--muted)]">
            Things I build when I&apos;m not building client work. All of
            these are live — try them.
          </p>
        </Reveal>
      </div>

      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((e) => (
          <li key={e.index} className="bg-[var(--bg)]">
            <Reveal className="flex h-full flex-col">
              <div className="flex items-baseline justify-between px-5 pt-5">
                <span className="type-meta">{e.index}</span>
                <span className="type-meta opacity-60">{e.hint}</span>
              </div>
              <div className="h-44 px-2">{render(e.kind)}</div>
              <p className="px-5 pb-5 font-display text-lg font-medium tracking-[-0.02em]">
                {e.title}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
