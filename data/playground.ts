/* ============================================================
   PLAYGROUND
   Each entry maps to a real, interactive mini-experiment.
   `kind` selects the component - see components/playground/.
   ============================================================ */

import type { Localized } from "@/lib/localized";

export type Experiment = {
  index: string;
  title: Localized;
  kind: "magnetic" | "network" | "reveal" | "distortion" | "tilt" | "scramble";
  hint: Localized;
};

export const experiments: Experiment[] = [
  {
    index: "01",
    title: { en: "Magnetic Button", th: "ปุ่มแม่เหล็ก" },
    kind: "magnetic",
    hint: { en: "Move closer", th: "ขยับเข้าใกล้" },
  },
  {
    index: "02",
    title: { en: "Particle Node", th: "อนุภาคเชื่อมโยง" },
    kind: "network",
    hint: { en: "Drag inside", th: "ลากภายใน" },
  },
  {
    index: "03",
    title: { en: "Scroll Reveal", th: "เผยผลเมื่อเลื่อน" },
    kind: "reveal",
    hint: { en: "Click to replay", th: "คลิกเพื่อเล่นซ้ำ" },
  },
  {
    index: "04",
    title: { en: "Text Distortion", th: "ข้อความบิดเบี้ยว" },
    kind: "distortion",
    hint: { en: "Sweep across", th: "กวาดผ่าน" },
  },
  {
    index: "05",
    title: { en: "Parallax Card", th: "การ์ดพารัลแลกซ์" },
    kind: "tilt",
    hint: { en: "Hover to tilt", th: "ชี้เมาส์เพื่อเอียง" },
  },
  {
    index: "06",
    title: { en: "Scramble Text", th: "ข้อความสลับอักษร" },
    kind: "scramble",
    hint: { en: "Hover to decode", th: "ชี้เมาส์เพื่อถอดรหัส" },
  },
];
