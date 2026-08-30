import { site } from "@/data/site";
import Reveal from "@/components/animation/Reveal";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] px-6 py-10 md:px-12">
      {/* Reveal is a client component; a server component can render
          one directly - no "use client" needed on Footer itself. */}
      <Reveal
        stagger
        className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-display text-lg font-semibold uppercase tracking-[-0.02em]">
            {site.firstName} {site.lastName}
          </p>
          <p className="type-meta mt-2">{site.role}</p>
          <p className="type-meta mt-1">{site.location}</p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          {site.available && (
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]"
              />
              {site.availableLabel}
            </p>
          )}
          <ul className="flex gap-6">
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="open"
                className="type-meta transition-colors hover:text-[var(--text)]"
              >
                GitHub
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="open"
                  className="type-meta transition-colors hover:text-[var(--text)]"
                >
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a
                href={`mailto:${site.email}`}
                data-cursor="send"
                className="type-meta transition-colors hover:text-[var(--text)]"
              >
                Email
              </a>
            </li>
          </ul>
          <p className="type-meta">{site.year} &copy;</p>
        </div>
      </Reveal>
    </footer>
  );
}
