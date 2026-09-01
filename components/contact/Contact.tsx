"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { site, sectionMeta } from "@/data/site";
import { contactLines } from "@/data/contact";
import { pick } from "@/lib/localized";
import Magnetic from "@/components/animation/Magnetic";

/* ============================================================
   CONTACT — the ending scene.

   This is where the particle field pays off: SectionDriver puts
   it into its `contact` state, so the network that has been
   ambient for the whole page converges toward centre, brightens
   and picks up the accent. The visitor arrives at the middle of
   the thing they have been travelling through.
   ============================================================ */
export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Fires before .contact-line (top 80% vs top 65%) - the eyebrow
      // reads first, then the big statement lines.
      gsap.from(".contact-eyebrow", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      gsap.from(".contact-line", {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 65%", once: true },
      });

      gsap.from(".contact-detail", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 45%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const links = [
    { label: t("email"), value: site.email, href: `mailto:${site.email}`, cursor: "send" },
    { label: t("github"), value: "@Kanthorn-wo", href: site.github, cursor: "open" },
    ...(site.linkedin
      ? [
          {
            label: t("linkedin"),
            value: t("profile"),
            href: site.linkedin,
            cursor: "open",
          },
        ]
      : []),
  ];

  return (
    <div
      ref={rootRef}
      className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-6 py-28 md:px-12"
    >
      <p className="contact-eyebrow type-meta mb-10">{sectionMeta("contact", locale)}</p>

      <h2 className="mb-16 md:mb-24">
        {contactLines.map((line) => (
          <span key={line.id} className="line-mask">
            <span
              className={`contact-line type-statement block ${
                line.gradient ? "gradient-text" : ""
              }`}
            >
              {pick(line.text, locale)}
            </span>
          </span>
        ))}
      </h2>

      <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-col gap-5">
          {links.map((l) => (
            <li key={l.label} className="contact-detail">
              <a
                href={l.href}
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                data-cursor={l.cursor}
                className="group flex items-baseline gap-5"
              >
                <span className="type-meta w-20 shrink-0">{l.label}</span>
                <span className="font-display text-[clamp(1.125rem,2.2vw,1.75rem)] font-medium tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-cyan)]">
                  {l.value}
                </span>
                <span
                  aria-hidden="true"
                  className="text-[var(--muted)] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-[var(--accent-cyan)]"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="contact-detail">
          <Magnetic strength={0.35}>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(t("mailSubject"))}`}
              data-cursor="send"
              className="group inline-flex items-center gap-4 rounded-full border border-[var(--line-strong)] px-8 py-5 transition-colors hover:border-[var(--accent-cyan)]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                {t("startConversation")}
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
