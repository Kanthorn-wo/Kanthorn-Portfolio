/* ============================================================
   Explicit scroll boundaries for Hero, the only section left on
   GSAP's own `pin` option.

   Statement, Projects and Experience used to be defined here too
   (Statement chained off Hero's end, the other two chained off
   Statement's). GSAP's pin writes the fixed-position element's
   `top` as the trigger's numeric start value instead of 0 - for
   Hero that value is 0, so the bug is invisible; for every other
   section it produced a stuck offset equal to that section's own
   start (confirmed live: Statement's pinned box sat at
   `top: 900px`, i.e. one viewport below the fold, for its entire
   scroll range). All three now use CSS `position: sticky` instead
   (see Statement.tsx, ProjectShowcase.tsx and ExperienceSection.tsx),
   which sidesteps the whole class of bug because the browser owns
   the positioning, not GSAP.

   Hero is left on GSAP's pin because heroStart is 0 - the same
   defect can't produce a wrong offset there.
   ============================================================ */

const H = () => window.innerHeight;

export const heroStart = () => 0;
export const heroEnd = () => H();
