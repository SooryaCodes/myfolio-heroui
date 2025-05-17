"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { RevealOnScroll, HorizontalScrollSection } from "@/components/scroll-animations";
import { ProjectCardHoverEffect, ExpandingProjectCard } from "@/components/interactive-card";
import { GlowButton } from "@/components/magnetic-button";
import { Link } from "@heroui/link";
import { AnimatedTextReveal } from "@/components/parallax-section";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with Next.js, Hero UI, and Stripe integration.",
    longDescription: "Built a comprehensive e-commerce solution with Next.js and Hero UI components. Features include product browsing, cart management, checkout with Stripe, user authentication, and admin dashboard for product management.",
    image: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=E-Commerce+Platform",
    tags: ["Next.js", "TypeScript", "Hero UI", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://ecommerce-platform.vercel.app",
    category: "web",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A beautiful and intuitive task management application with drag and drop functionality.",
    longDescription: "Designed and developed a task management application that helps users organize and prioritize tasks efficiently. Features include drag-and-drop task organization, filter by status, due date reminders, and data visualization for productivity tracking.",
    image: "https://placehold.co/600x400/9333ea/FFFFFF/png?text=Task+Management",
    tags: ["React", "TypeScript", "Hero UI", "React DnD", "Firebase"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://task-manager-app.vercel.app",
    category: "web",
  },
  {
    id: 3,
    title: "Finance Dashboard",
    description: "A comprehensive finance dashboard with interactive charts and real-time data.",
    longDescription: "Created a finance dashboard application that visualizes financial data through interactive charts and reports. Users can track expenses, investments, and savings goals with real-time updates and customizable views.",
    image: "https://placehold.co/600x400/16a34a/FFFFFF/png?text=Finance+Dashboard",
    tags: ["React", "TypeScript", "D3.js", "Hero UI", "Node.js"],
    githubUrl: "https://github.com/yourusername/finance-dashboard",
    liveUrl: "https://finance-dashboard.vercel.app",
    category: "web",
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    description: "A React Native fitness application with workout tracking and nutrition planning.",
    longDescription: "Developed a mobile fitness application that helps users track workouts, plan nutrition, and achieve fitness goals. Features include custom workout plans, progress tracking, nutrition logging, and social sharing functionality.",
    image: "https://placehold.co/600x400/dc2626/FFFFFF/png?text=Fitness+App",
    tags: ["React Native", "TypeScript", "Expo", "Firebase", "Redux"],
    githubUrl: "https://github.com/yourusername/fitness-app",
    liveUrl: "https://expo.dev/@yourusername/fitness-app",
    category: "mobile",
  },
  {
    id: 5,
    title: "AI Image Generator",
    description: "A web application that generates images from text prompts using AI.",
    longDescription: "Built an AI-powered image generation application that creates unique visual content from text descriptions. Leveraging the OpenAI API, users can generate, edit, and download images based on detailed text prompts.",
    image: "https://placehold.co/600x400/ea580c/FFFFFF/png?text=AI+Image+Generator",
    tags: ["Next.js", "TypeScript", "Hero UI", "OpenAI API", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ai-image-generator",
    liveUrl: "https://ai-image-generator.vercel.app",
    category: "ai",
  },
  {
    id: 6,
    title: "Travel Blog Platform",
    description: "A content-focused travel blog platform with a beautiful UI and excellent performance.",
    longDescription: "Designed and developed a travel blog platform optimized for performance and user experience. Features include rich content editing, image galleries, interactive maps, social sharing, and SEO optimization for travel content.",
    image: "https://placehold.co/600x400/0ea5e9/FFFFFF/png?text=Travel+Blog",
    tags: ["Next.js", "TypeScript", "Hero UI", "MDX", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/travel-blog",
    liveUrl: "https://travel-blog.vercel.app",
    category: "web",
  },
];

export const Projects = () => {
  const [category, setCategory] = React.useState("all");
  const [cardStyle, setCardStyle] = React.useState("hover");
  
  const filteredProjects = category === "all" 
    ? projects 
    : projects.filter(project => project.category === category);

  return (
    <section id="projects" className="py-24 px-6 overflow-hidden bg-gradient-to-b from-background to-default-50/30 dark:to-background/30 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-purple-400/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4"
            >
              Portfolio
            </Badge>
            <AnimatedTextReveal 
              text="Featured Projects"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <p className="text-foreground/70 max-w-2xl mx-auto">
              A collection of my best work showcasing my skills in web development, 
              mobile apps, and AI integrations.
            </p>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Tabs
            aria-label="Project categories"
            color="primary"
            variant="underlined"
            className="mb-4 md:mb-0"
            selectedKey={category}
            onSelectionChange={(key) => setCategory(key as string)}
          >
            <Tab key="all" title="All Projects" />
            <Tab key="web" title="Web Development" />
            <Tab key="mobile" title="Mobile Apps" />
            <Tab key="ai" title="AI & ML" />
          </Tabs>
          
          <div className="flex gap-2 items-center">
            <span className="text-sm text-foreground/70">View Style:</span>
            <button 
              onClick={() => setCardStyle("hover")}
              className={`p-2 rounded-md ${cardStyle === "hover" ? "bg-primary/20 text-primary" : "bg-default-100"}`}
            >
              Hover
            </button>
            <button 
              onClick={() => setCardStyle("expand")}
              className={`p-2 rounded-md ${cardStyle === "expand" ? "bg-primary/20 text-primary" : "bg-default-100"}`}
            >
              Expand
            </button>
          </div>
        </div>

        {category === "all" && cardStyle === "hover" && (
          <HorizontalScrollSection scrollFactor={0.3} className="mb-12 py-8">
            <div className="flex gap-6 px-6">
              {projects.map((project) => (
                <div key={project.id} className="w-[350px] flex-shrink-0">
                  <RevealOnScroll direction="bottom" threshold={0.1}>
                    <ProjectCardHoverEffect project={project} />
                  </RevealOnScroll>
                </div>
              ))}
            </div>
          </HorizontalScrollSection>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <RevealOnScroll 
              key={project.id} 
              direction="bottom" 
              delay={index * 0.1} 
              threshold={0.1}
            >
              {cardStyle === "expand" ? (
                <ExpandingProjectCard project={project} />
              ) : (
                cardStyle === "hover" && category !== "all" && (
                  <ProjectCardHoverEffect project={project} />
                )
              )}
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-16 text-center">
          <GlowButton 
            href="https://github.com/yourusername" 
            className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:shadow-lg transition-shadow"
            glowColor="rgba(var(--color-primary), 0.5)"
          >
            View All Projects on GitHub
          </GlowButton>
        </div>
      </div>
    </section>
  );
}; 