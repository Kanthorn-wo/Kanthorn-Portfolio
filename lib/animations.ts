/* ============================================================
   Shared motion vocabulary.
   Keeping easings and durations in one place is what makes the
   whole site feel like a single piece rather than a pile of
   independently-tuned animations.
   ============================================================ */

export const EASE = {
  /** Default for entrances - decisive, settles cleanly. */
  out: "power3.out",
  /** Bigger entrances that need more travel. */
  outStrong: "power4.out",
  /** Large transitions and reveals - the "expensive" feel. */
  expo: "expo.out",
  /** Two-sided moves (scale up then down). */
  inOut: "power2.inOut",
  /** Magnetic snap-back ONLY. Used anywhere else it reads as cheap. */
  elastic: "elastic.out(1, 0.5)",
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  reveal: 1.4,
} as const;

/** Stagger presets so sequences across sections stay in the same rhythm. */
export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic PRNG so generated visuals are stable across reloads. */
export function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
