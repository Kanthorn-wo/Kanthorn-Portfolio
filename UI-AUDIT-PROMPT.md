# UI Audit Prompt

Paste the block below into a session that has browser tooling (Claude in Chrome,
Playwright MCP, or a human with DevTools open).

---

```
You are auditing a production portfolio site for UI bugs. Be adversarial:
your job is to find what is broken, not to confirm that it works. Report only
things you actually observed — never guess from reading the code.

## The site

Next.js 16 App Router + React 19 + Tailwind v4 + GSAP 3.15 + Lenis.
Single page, dark-first, heavy scroll choreography.
Run: `npm run dev` in kanthorn-portfolio, open http://localhost:3000

Section order: Preloader → Hero → Statement → Projects (pinned stack) →
Featured → Marquee → About → Experience (pinned) → Stack → Playground →
Contact → Footer.

A fixed <canvas> particle field sits behind everything at z-0 and never
unmounts; sections steer it via a shared driver object.

## Test matrix — run EVERY section at EVERY width

375 · 768 · 1024 · 1440 · 1920

At each width, scroll the whole page top to bottom SLOWLY, then again FAST,
then scroll back UP. Bugs in scroll choreography usually only appear on the
reverse pass or under fast flicks.

SESSION LEARNING: window.scrollTo() bypasses Lenis (this site's smooth-
scroll library) and produces false readings — a position that looked broken
under scrollTo() turned out to be correct under real page.mouse.wheel()
calls. Always drive scroll with mouse.wheel(), never scrollTo(), when
checking anything scroll-triggered.


## Highest-risk areas — check these first

1. PIN COLLISIONS. Four sections create pinned ScrollTriggers: Hero,
   Statement, ProjectShowcase (.showcase-stage), ExperienceSection
   (.exp-stage). Look for: content jumping at pin start/end, a section
   overlapping the next one, blank gaps where pin spacing was
   over-allocated, or the pinned element detaching and scrolling away.

2. STALE TRIGGER POSITIONS AFTER THE PRELOADER. The preloader locks
   `body { overflow: hidden }` for ~1.2s and the Hero pin is only created
   after it finishes, which changes total page height. Check whether every
   section below the Hero starts and ends where it should on a HARD RELOAD
   (Ctrl+Shift+R) versus a soft one. A soft reload skips the preloader via
   sessionStorage, so the two paths take different code and can differ.

3. STATEMENT OVERLAP. `.stmt-b` is absolutely positioned on top of
   `.stmt-a`. Confirm phrase B is invisible before its turn and that the two
   phrases never render legibly at the same time. Check both phrases fit at
   375px without clipping.

4. PROJECT CARD STACK. Cards are absolute-positioned siblings above 768px.
   Confirm they replace each other cleanly, that the last card does not
   vanish early, and that scrolling back UP reverses correctly.

5. MARQUEE VELOCITY. The marquee reads scroll velocity into timeScale on
   every ScrollTrigger update and chains a follow-up tween in onComplete.
   Flick-scroll hard and repeatedly: does it jitter, stutter, run away to a
   blur, or reverse direction erratically? Does it ever stop entirely?

6. MASKED TEXT CLIPPING. `.line-mask` uses overflow:hidden on giant display
   type. Check descenders (the comma, the apostrophe in "LET'S", the "y" in
   any word) and the gradient text bottom edge at all five widths.

7. ELEMENT OVERLAP — dedicated pass, not a side effect of other checks.
   This has been the single most common bug class in this codebase: a
   background numeral painted at full opacity instead of as a faint watermark
   (Experience's ghost year), a decorative underline sized to its whole
   container instead of the word it sits under (Statement), a parallaxing
   list item drifting up over the heading above it on section entry (Stack),
   an outgoing card in a pinned stack not fully fading out and piling up
   under the incoming one (Projects). The common thread: an element that is
   ABSOLUTELY POSITIONED, PARALLAXED, or PART OF A CROSS-FADE is the one to
   suspect. For every section, screenshot it at several scroll offsets
   spanning its full transition (not just settled start/end state) and look
   for any two pieces of real text/content whose boxes intersect by more
   than ~10% of the smaller one's area. A quick way to automate this: query
   leaf text elements (no element children with their own text), compute
   effective opacity through ancestors, filter out anything inside a
   position:fixed ancestor (nav is meant to sit on top - that's not a bug),
   and flag any pair of on-screen boxes (effective opacity > 0.25) that
   geometrically intersect.

8. ACTIVE-STATE INDICATORS DESYNCED FROM SCROLL POSITION. Two instances of
   this exact bug were found and fixed this session: the nav's active
   section link, and About's 01/02/03/04 rail. Both used one GSAP
   ScrollTrigger per item with `onToggle: (self) => self.isActive &&
   setActive(i)`. The bug: item ranges overlap, onToggle only fires on
   entry with nothing to reset it on the way back, so on a fast scroll a
   later item's onToggle can fire before an earlier item's, and the
   indicator gets stuck one or more steps ahead of what is actually on
   screen. If any OTHER stepped indicator exists or gets added (progress
   dots, a rail, a tab strip driven by scroll), check it the same way: scroll
   past it fast, then slowly reverse, and confirm the indicator always
   matches the content actually centred in the viewport - not what it was a
   moment before.

## Cross-cutting checks

THEME. Toggle dark↔light 5+ times rapidly, at different scroll positions.
  - Any flash, stall, or stuck intermediate colour?
  - Does the canvas colour follow, and stay in sync with the CSS?
  - In LIGHT mode specifically: is the particle field too heavy/dark, and is
    body text still comfortably readable over it?
  - Reload while in light mode — any dark flash before paint?

REDUCED MOTION. DevTools → Rendering → "Emulate prefers-reduced-motion".
  Reload and read the whole page at 1440 AND 375.
  - Is 100% of the content readable? Nothing stranded invisible, nothing
    overlapping into mush?
  - Specifically check Statement, Experience and Projects — all three stack
    elements on top of each other when motion is on.
  - Does any section collapse to zero height or overflow its container?

OVERFLOW. At every width confirm the page never scrolls horizontally.
  Run in console: document.documentElement.scrollWidth > window.innerWidth
  Also check the marquee is the only thing overflowing its own box.

CURSOR (desktop only). Custom cursor should show VIEW over project cards,
  OPEN over links, SEND over email. Check it never gets stuck showing a stale
  label, never leaves a ghost, and that the real OS cursor stays hidden.
  Confirm it is fully disabled at 375px / touch emulation.

KEYBOARD. Tab through the entire page.
  - Is the focus ring always visible against the background?
  - Does focus ever land on something scrolled off-screen or behind the nav?
  - Does the mobile menu trap focus / can it be closed with the keyboard?
  - Does tabbing into a pinned section fight the scroll position?

NAV. Does the compact-pill transition trigger at the right scroll point?
  Do the section links scroll to the right place (Lenis handles anchors)?
  Does the active-section indicator track correctly on the way back UP?

## Performance

DevTools Performance panel, record ~10s of scrolling at 1440:
  - Sustained FPS. Flag anything with visible dropped frames.
  - Look for Layout / Recalculate Style appearing repeatedly during scroll —
    everything here is supposed to be transform + opacity only.
  - The Stack section applies CSS blur() to text; check its paint cost.

## Output

For each bug:
  - Where (section + viewport width)
  - What you saw
  - Repro steps
  - Severity: BROKEN (unusable) / WRONG (visibly incorrect) / ROUGH (polish)

Rank BROKEN first. If a section is clean, say so in one line — do not pad.
```
