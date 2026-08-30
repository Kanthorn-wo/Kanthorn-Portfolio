import type { Metadata } from "next";
import { site } from "@/data/site";
import ProjectsArchive from "@/components/projects/ProjectsArchive";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: `Projects — ${site.firstName} ${site.lastName}`,
  description: `The full project archive - every ${site.firstName} ${site.lastName} project, not just the homepage highlights.`,
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsArchive />
      <Footer />
    </>
  );
}
