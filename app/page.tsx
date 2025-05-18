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
import { AIChatAssistant } from "@/components/ai-chat-assistant";

export const metadata: Metadata = {
  title: "Johan Beker | Developer & Designer Portfolio",
  description:
    "Premium portfolio showcasing the work of Johan Beker, a developer and designer specializing in creating exceptional digital experiences.",
  keywords: ["developer", "designer", "portfolio", "web development", "UI/UX", "frontend", "fullstack"],
  authors: [{ name: "Johan Beker", url: "https://johanbeker.dev" }],
  creator: "Johan Beker",
  publisher: "Johan Beker",
  robots: "index, follow",
  
  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    url: "https://johanbeker.dev",
    title: "Johan Beker | Developer & Designer Portfolio",
    description: "Premium portfolio showcasing the work of Johan Beker, a developer and designer specializing in creating exceptional digital experiences.",
    siteName: "Johan Beker Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Johan Beker Portfolio Preview"
      }
    ],
    locale: "en_US",
  },
  
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Johan Beker | Developer & Designer Portfolio",
    description: "Premium portfolio showcasing the work of Johan Beker, a developer and designer specializing in creating exceptional digital experiences.",
    creator: "@johanbeker",
    images: ["/images/twitter-image.jpg"],
  },
  
  // Canonical URL
  alternates: {
    canonical: "https://johanbeker.dev",
  },
  
  // App metadata
  applicationName: "Johan Beker Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
      <AIChatAssistant />
    </main>
  );
}
