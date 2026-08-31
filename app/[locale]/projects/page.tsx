import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { site } from "@/data/site";
import { routing, type Locale } from "@/i18n/routing";
import ProjectsArchive from "@/components/projects/ProjectsArchive";
import Footer from "@/components/footer/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;

  const title = `Projects — ${site.firstName} ${site.lastName}`;
  const description =
    l === "th"
      ? `คลังผลงานฉบับเต็ม — ทุกโปรเจกต์ของ ${site.firstName} ${site.lastName} ไม่ใช่แค่ที่คัดสรรไว้บนหน้าแรก`
      : `The full project archive - every ${site.firstName} ${site.lastName} project, not just the homepage highlights.`;

  return {
    title,
    description,
    alternates: {
      languages: {
        en: "/en/projects",
        th: "/th/projects",
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale as Locale);

  return (
    <>
      <ProjectsArchive />
      <Footer />
    </>
  );
}
