import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { Blogs } from "@/components/sections/blogs";
import { Services } from "@/components/sections/services";
import { Marketplace } from "@/components/sections/marketplace";
import { FloatingNavbar } from "@/components/floating-navbar";

export const metadata: Metadata = {
  title: "Johan Beker | Developer & Designer Portfolio",
  description: "Premium portfolio showcasing the work of Johan Beker, a developer and designer specializing in creating exceptional digital experiences.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <Experience />
      <Marketplace />
      <Testimonials />
      <Blogs />
      <Contact />
      <Footer />
      <FloatingNavbar />
    </main>
  );
}
