/* ============================================================
   PLAYGROUND
   Each entry maps to a real, interactive mini-experiment.
   `kind` selects the component - see components/playground/.
   ============================================================ */

export type Experiment = {
  index: string;
  title: string;
  kind: "magnetic" | "network" | "reveal" | "distortion" | "tilt" | "scramble";
  hint: string;
};

export const experiments: Experiment[] = [
  { index: "01", title: "Magnetic Button", kind: "magnetic", hint: "Move closer" },
  { index: "02", title: "Particle Node", kind: "network", hint: "Drag inside" },
  { index: "03", title: "Scroll Reveal", kind: "reveal", hint: "Click to replay" },
  { index: "04", title: "Text Distortion", kind: "distortion", hint: "Sweep across" },
  { index: "05", title: "Parallax Card", kind: "tilt", hint: "Hover to tilt" },
  { index: "06", title: "Scramble Text", kind: "scramble", hint: "Hover to decode" },
];
