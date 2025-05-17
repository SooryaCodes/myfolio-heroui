import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Developer Portfolio | Showcasing My Work and Skills",
  description: "A beautiful portfolio showcasing my projects, skills, and experience as a developer and designer.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
