"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "@/lib/gsap";

import SmoothScroll from "@/components/SmoothScroll";
import ParticleNetwork from "@/components/particles/ParticleNetwork";
import SectionDriver from "@/components/particles/SectionDriver";
import Preloader from "@/components/preloader/Preloader";
import Nav from "@/components/navigation/Nav";
import Cursor from "@/components/cursor/Cursor";

import Hero from "@/components/hero/Hero";
import Statement from "@/components/statement/Statement";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import Featured from "@/components/projects/Featured";
import Marquee from "@/components/marquee/Marquee";
import About from "@/components/about/About";
import ExperienceSection from "@/components/experience/ExperienceSection";
import Stack from "@/components/stack/Stack";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

// Five independent interactive demos - not worth the initial bundle.
const Playground = dynamic(() => import("@/components/playground/Playground"), {
  ssr: false,
});

export default function Home() {
  const locale = useLocale();
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  /* Every ScrollTrigger below the Hero is created while the preloader
     still has the body locked, and the Hero's own pin is only created
     once `ready` flips - which inserts pin spacing and shifts the whole
     page down. Without a refresh here, every start/end computed before
     that point is stale, and sections pin hundreds of pixels early.
     Font swap-in moves things again, so wait for that too. */
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  return (
    // Keyed on locale: switching /en <-> /th is a real route change, so
    // this forces every section's gsap.context() to tear down and
    // rebuild cleanly against the newly-translated (and possibly
    // differently-sized) text, instead of trying to re-measure pinned
    // ScrollTriggers in place.
    <Fragment key={locale}>
      <SmoothScroll />

      {/* One field for the whole page. Sections steer it; it never remounts. */}
      <ParticleNetwork />
      <div className="fine-grid" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Cursor />
      <Preloader onDone={onDone} />
      <Nav />

      <main id="main">
        <SectionDriver state="hero" as="div">
          <Hero ready={ready} />
        </SectionDriver>

        <SectionDriver state="statement" as="div">
          <Statement ready={ready} />
        </SectionDriver>

        <SectionDriver state="projects" as="div" id="work">
          <ProjectShowcase ready={ready} />
          <Featured />
        </SectionDriver>

        <Marquee />

        <SectionDriver state="about" as="div" id="about">
          <About />
        </SectionDriver>

        <SectionDriver state="experience" as="div" id="experience">
          <ExperienceSection ready={ready} />
        </SectionDriver>

        <SectionDriver state="stack" as="div">
          <Stack />
        </SectionDriver>

        <SectionDriver state="playground" as="div">
          <Playground />
        </SectionDriver>

        <SectionDriver state="contact" as="div" id="contact">
          <Contact />
        </SectionDriver>
      </main>

      <Footer />
    </Fragment>
  );
}
