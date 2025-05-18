import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { Services } from "@/components/sections/services";
import { Marketplace } from "@/components/sections/marketplace";
import { Playground } from "@/components/sections/playground";
import { FloatingNavbar } from "@/components/floating-navbar";
import { BlogSection } from "@/components/sections/blog-section";

export const metadata: Metadata = {
  title: "Johan Beker | Developer & Designer Portfolio",
  description: "Premium portfolio showcasing the work of Johan Beker, a developer and designer specializing in creating exceptional digital experiences.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Services />
      <Testimonials />
      <BlogSection />
      <Playground />
      <Marketplace />
      <Contact />
      <Footer />
      <FloatingNavbar />
    </main>
  );
}
