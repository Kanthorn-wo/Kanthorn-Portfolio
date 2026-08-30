/* ============================================================
   Theme tokens read from CSS.

   The canvas cannot use CSS variables, so it reads the resolved
   values once at init and again whenever the theme changes.
   CSS stays the single source of truth for colour.
   ============================================================ */

export type ThemeColors = {
  particle: [number, number, number];
  link: [number, number, number];
  linkMax: number;
  accentPurple: [number, number, number];
  accentCyan: [number, number, number];
};

function parseTriplet(v: string, fallback: [number, number, number]): [number, number, number] {
  const parts = v.split(",").map((s) => parseFloat(s.trim()));
  if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
    return [parts[0], parts[1], parts[2]];
  }
  return fallback;
}

function parseHex(v: string, fallback: [number, number, number]): [number, number, number] {
  const m = v.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function readThemeColors(): ThemeColors {
  const s = getComputedStyle(document.documentElement);
  return {
    particle: parseTriplet(s.getPropertyValue("--particle"), [245, 245, 245]),
    link: parseTriplet(s.getPropertyValue("--particle-link"), [245, 245, 245]),
    linkMax: parseFloat(s.getPropertyValue("--particle-link-max")) || 0.35,
    accentPurple: parseHex(s.getPropertyValue("--accent-purple"), [139, 92, 246]),
    accentCyan: parseHex(s.getPropertyValue("--accent-cyan"), [34, 211, 238]),
  };
}
