/* ============================================================
   PARTICLE DRIVER

   The particle field is ONE entity that lives for the whole page.
   Sections do not own their own canvas - they steer this shared
   object, and the render loop reads it every frame.

   This is a plain mutable object on purpose. GSAP tweens its
   numbers directly, so scroll-linked visual change costs zero
   React renders. Never put this in state.
   ============================================================ */

export type ParticleDriver = {
  /** 0-1 fraction of the pool actually drawn. Cheaper than reallocating. */
  density: number;
  /** Master alpha of the whole field. */
  opacity: number;
  /** Alpha multiplier for the connecting lines only. */
  linkAlpha: number;
  /** Pushes the field toward the camera - the "walking through it" feeling. */
  zOffset: number;
  /** Horizontal drift, px/frame at z=1. Reads as lateral camera travel. */
  drift: number;
  /** 0-1 pull toward viewport centre. The ending-scene convergence. */
  converge: number;
  /** Multiplier on ambient particle motion. */
  speed: number;
  /** 0-1 tint of nodes toward the accent gradient. */
  accent: number;
};

export const driver: ParticleDriver = {
  density: 1,
  opacity: 0,
  linkAlpha: 1,
  zOffset: 0,
  drift: 0,
  converge: 0,
  speed: 1,
  accent: 0,
};

/* ------------------------------------------------------------
   Section presets.

   Every value here answers "why does this move?" - the field
   recedes where type needs to dominate, drifts where the section
   is about travelling through time, and closes in at the end.
   ------------------------------------------------------------ */
export const DRIVER_STATES = {
  hero: { density: 1.0, opacity: 0.55, linkAlpha: 1.0, drift: 0, converge: 0, speed: 1, accent: 0 },
  statement: { density: 0.35, opacity: 0.2, linkAlpha: 0.6, drift: 0, converge: 0, speed: 0.7, accent: 0 },
  about: { density: 0.6, opacity: 0.3, linkAlpha: 0.8, drift: 0, converge: 0, speed: 0.8, accent: 0 },
  experience: { density: 0.5, opacity: 0.28, linkAlpha: 0.7, drift: 0.35, converge: 0, speed: 1, accent: 0 },
  stack: { density: 0.8, opacity: 0.34, linkAlpha: 1.0, drift: 0, converge: 0, speed: 1.1, accent: 0.15 },
  projects: { density: 0.25, opacity: 0.15, linkAlpha: 0.5, drift: 0, converge: 0, speed: 0.6, accent: 0 },
  playground: { density: 0.55, opacity: 0.26, linkAlpha: 0.8, drift: 0, converge: 0, speed: 1, accent: 0.2 },
  contact: { density: 1.0, opacity: 0.7, linkAlpha: 1.0, drift: 0, converge: 0.55, speed: 1.2, accent: 0.6 },
} as const;

export type DriverStateName = keyof typeof DRIVER_STATES;
