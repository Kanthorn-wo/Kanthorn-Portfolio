import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { pick } from "@/lib/localized";
import { routing, type Locale } from "@/i18n/routing";

export const alt = `${site.firstName} ${site.lastName} - Front-End Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const fullName = `${site.firstName.charAt(0)}${site.firstName
  .slice(1)
  .toLowerCase()} ${site.lastName.charAt(0)}${site.lastName.slice(1).toLowerCase()}`;

// Deterministic (not random) so the generated image is identical on every
// build - a random seed would fail Next's static-optimization cache check.
const dots = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 173) % 1200,
  y: (i * 97) % 630,
  r: 2 + (i % 3),
}));

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#080808",
          position: "relative",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.r,
              height: d.r,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#22d3ee" : "#8b5cf6",
              opacity: 0.5,
              display: "flex",
            }}
          />
        ))}
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#8a8a8a" }}>
          {site.nameTh}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 600,
            color: "#f5f5f5",
            letterSpacing: -2,
            marginTop: 16,
          }}
        >
          {fullName}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#22d3ee", marginTop: 24 }}>
          {pick(site.role, l)}
        </div>
      </div>
    ),
    { ...size }
  );
}
