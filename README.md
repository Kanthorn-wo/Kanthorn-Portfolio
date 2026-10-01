# Kanthorn Wongsoma — Portfolio

Interactive portfolio built on Next.js 16 (App Router), TypeScript, Tailwind v4
and GSAP. Concept: **CODE IS AN EXPERIENCE**.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

---

## Editing content

**All content lives in `data/`. Nothing is hardcoded in components.**

| File | What it controls |
|---|---|
| `data/site.ts` | Name, role, location, email, GitHub/LinkedIn, hero labels, nav sections |
| `data/projects.ts` | The project showcase and the featured project |
| `data/experience.ts` | The career timeline |
| `data/skills.ts` | The "Tools I speak" depth field, the About principles, marquee words |

### Things flagged for you

- **`data/experience.ts`** — the 2024 entry is a `// TODO` placeholder. Your resume
  ends at 2023, so no employment history was invented. Fill it in and remove
  `placeholder: true`.
- **`data/site.ts`** — `linkedin` is empty. The LinkedIn links stay hidden until
  you add a URL.
- **`data/site.ts`** — name is spelled `KANTHORN` (per your resume and email);
  the old site said `KANTHRON`. Location is `Nakhon Ratchasima`. Both are one
  line each if you want them different.

### Project images

Every project works without a screenshot. When `image` is undefined,
`ProjectVisual` draws a particle mesh seeded from the project `id` —
deterministic, so each project always gets the same distinct figure.

To use a real screenshot:

```ts
// 1. drop the file in public/projects/
// 2. point at it:
{ id: "jai-online", image: "/projects/jai-online.png", ... }
```

It swaps to `next/image` automatically. No code changes needed.

---

## Architecture

### The particle field is one entity for the whole page

`components/particles/ParticleNetwork.tsx` mounts a single fixed canvas that
never unmounts. Sections do not own particles — they steer the shared driver:

```ts
// lib/particleDriver.ts — a plain mutable object, never React state
driver.density   // 0-1, fraction of the pool drawn
driver.opacity
driver.zOffset   // pushes the field toward the camera
driver.drift     // lateral travel
driver.converge  // pull toward centre
driver.accent    // tint toward the accent gradient
```

Wrapping a section in `<SectionDriver state="about">` tweens the driver on
enter and back on leave. GSAP animates the numbers, the canvas polls them each
frame — **scroll-linked visual change costs zero React renders.**

Presets and the reasoning for each are in `lib/particleDriver.ts`.

### Why it stays at 60fps

- **Spatial hash grid** for neighbour lookup — O(n), not the O(n²) all-pairs scan.
- **Alpha bucketing** — ~500 links become 6 `stroke()` calls, not 500.
- **One rAF loop** — the canvas and Lenis both run on `gsap.ticker`.
- Density changes draw fewer particles from a fixed pool; nothing reallocates.
- DPR capped at 2, resize debounced, particle count scales by breakpoint
  (60 / 90 / 120 / 160).

### Animation primitives — `components/animation/`

```tsx
<Parallax speed={0.2}>      // scrub-linked drift, half strength under 768px
<Reveal stagger>            // entrance; hidden state applied by JS, never CSS
<Magnetic strength={0.4}>   // quickTo + elastic release
<ScrollText mode="words" from="left">  // SplitText, reverted on cleanup
```

Every one is wrapped in `gsap.context()` and reverted on unmount.

### Theme

`<html data-theme>` is the single source of truth. A blocking script in
`app/layout.tsx` sets it before first paint (no FOUC); `ThemeProvider` subscribes
to that attribute via `useSyncExternalStore` rather than keeping a second copy in
state; the canvas watches it with a `MutationObserver` and tweens its colours to
match. Tokens are real CSS custom properties in `app/globals.css` — no
`filter: invert` anywhere.

### Reduced motion

`prefers-reduced-motion` disables parallax, pinning, scroll animation, the
cursor and the particle loop (which draws one static frame instead).

**All content still renders.** Reveals apply their hidden state through GSAP, so
without JS or with motion disabled nothing is stranded at `opacity: 0`. Three
sections that cross-fade stacked elements (Statement, Experience, Projects) fall
back to plain vertical lists via the rules at the bottom of `globals.css`.

---

## Notes

- **No jQuery.** It would contend with React for DOM ownership and add ~30KB for
  nothing. GSAP is the single animation engine.
- Experience, Projects and Statement render **one** list styled two ways rather
  than duplicate desktop/mobile markup — `hidden` utilities are CSS-only, so
  duplicating would read every entry twice to a screen reader.
