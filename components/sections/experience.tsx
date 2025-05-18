"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { FiArrowRight, FiBriefcase, FiAward, FiCode, FiCalendar } from "react-icons/fi";
import { RevealOnScroll, MaskReveal } from "@/components/scroll-animations";
import Image from "next/image";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  skills: string[];
  logo: string;
  category: "work" | "education" | "projects";
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Meta",
    role: "Senior Frontend Developer",
    duration: "2022 - Present",
    description: "Leading the development of user-facing features for Meta&apos;s new productivity suite. Focusing on accessibility, performance optimization, and elegant user experiences.",
    achievements: [
      "Reduced initial page load time by 40% through code splitting and lazy loading",
      "Led the migration from CSS-in-JS to a custom design system",
      "Mentored junior developers and established frontend best practices",
    ],
    skills: ["React", "TypeScript", "GraphQL", "Next.js", "Design Systems"],
    logo: "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?q=80&w=2069&auto=format&fit=crop",
    category: "work",
  },
  {
    id: 2,
    company: "Shopify",
    role: "UI Engineer",
    duration: "2019 - 2022",
    description: "Designed and developed user interfaces for Shopify&apos;s merchant platform. Collaborated with product teams to create intuitive, efficient, and beautiful user experiences.",
    achievements: [
      "Built key components for Shopify&apos;s Polaris design system",
      "Created a new checkout flow that increased conversion by 15%",
      "Implemented complex data visualization features for merchant analytics",
    ],
    skills: ["React", "Ruby on Rails", "Polaris", "Jest", "Storybook"],
    logo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2068&auto=format&fit=crop",
    category: "work",
  },
  {
    id: 3,
    company: "Freelance",
    role: "Web Developer & UI Designer",
    duration: "2017 - 2019",
    description: "Provided end-to-end web development and design services for a range of clients, from startups to established businesses across various industries.",
    achievements: [
      "Developed 20+ custom websites and web applications",
      "Created brand identities and design systems for multiple clients",
      "Maintained long-term relationships with 90% of clients",
    ],
    skills: ["React", "WordPress", "UI/UX Design", "Figma", "Node.js"],
    logo: "https://images.unsplash.com/photo-1506729623306-b5a934d88b53?q=80&w=2070&auto=format&fit=crop",
    category: "work",
  },
  {
    id: 4,
    company: "University of Berlin",
    role: "Master&apos;s in Human-Computer Interaction",
    duration: "2016 - 2018",
    description: "Specialized in human-computer interaction with a focus on user experience design and research methodologies. Thesis on gesture-based interfaces for immersive environments.",
    achievements: [
      "Graduated with honors - GPA 3.9/4.0",
      "Published research on gesture recognition in VR environments",
      "Awarded departmental scholarship for academic excellence",
    ],
    skills: ["User Research", "Prototyping", "Interaction Design", "UX Design", "VR/AR"],
    logo: "https://images.unsplash.com/photo-1592066575517-58df903152f2?q=80&w=1974&auto=format&fit=crop",
    category: "education",
  },
  {
    id: 5,
    company: "Personal",
    role: "Open Source Contributor",
    duration: "2018 - Present",
    description: "Active contributor to various open source projects in the React and design systems ecosystem. Focused on improving accessibility and developer experience.",
    achievements: [
      "Core contributor to a popular React component library with 15k+ stars",
      "Presented at 5+ frontend conferences on design systems",
      "Authored technical articles with 50k+ total views",
    ],
    skills: ["React", "TypeScript", "Open Source", "Technical Writing", "Public Speaking"],
    logo: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop",
    category: "projects",
  },
];

export const Experience = () => {
  const [category, setCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  const filteredExperiences = category === "all"
    ? experiences
    : experiences.filter(exp => exp.category === category);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "work":
        return <FiBriefcase className="text-primary" />;
      case "education":
        return <FiAward className="text-primary" />;
      case "projects":
        return <FiCode className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section 
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden dark:bg-black bg-gray-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-primary/5 blur-[100px] rounded-full z-0"
        style={{ opacity }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4 border border-primary/20 dark:bg-black/30 bg-white/60 backdrop-blur-sm"
            >
              <span className="px-2 py-0.5 text-primary">Experience</span>
            </Badge>
            <h2 className="heading-xl dark:text-white text-gray-900 mb-6">Professional Journey</h2>
            <p className="dark:text-white/60 text-gray-600 max-w-2xl mx-auto">
              A curated timeline of my professional experience, education, and significant projects.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="mb-12">
          <Tabs
            aria-label="Experience categories"
            color="primary"
            variant="light"
            classNames={{
              tabList: "flex justify-center dark:bg-white/5 bg-black/5 backdrop-blur-sm rounded-full p-1 max-w-md mx-auto",
              cursor: "bg-primary/20",
              tab: "dark:text-white/70 text-gray-600 data-[selected=true]:text-primary px-4 py-2",
            }}
            selectedKey={category}
            onSelectionChange={(key) => setCategory(key as string)}
          >
            <Tab key="all" title="All Experience" />
            <Tab key="work" title="Work" />
            <Tab key="education" title="Education" />
            <Tab key="projects" title="Projects" />
          </Tabs>
        </div>
        
        {/* Timeline with zigzag structure */}
        <div className="relative mt-20">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/5 hidden md:block"></div>
          
          {filteredExperiences.map((exp, index) => (
            <div key={exp.id} className="mb-16 md:mb-24 relative" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
              {/* Timeline dot for central line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-5 h-5 bg-primary rounded-full z-20 border-4 border-white dark:border-black hidden md:block"></div>
              
              {/* Date badge - Centered on mobile, positioned on timeline for desktop */}
              <div className={`flex justify-center md:absolute md:top-1/2 md:-translate-y-1/2 md:w-auto z-10 
                ${index % 2 === 0 ? 'md:left-[calc(50%-5rem)]' : 'md:right-[calc(50%-5rem)]'} mb-6 md:mb-0`}>
                <div className="glass-premium dark:bg-black/40 bg-white/70 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <FiCalendar className="text-primary" size={16} />
                  <span className="dark:text-white text-gray-800 font-medium">{exp.duration}</span>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 gap-8 items-center">
                {/* Content side alternates between left and right */}
                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <RevealOnScroll threshold={0.1} direction={index % 2 === 0 ? "right" : "left"}>
                    <div className="glass-premium dark:bg-black/40 bg-white backdrop-blur-sm border border-primary/10 p-6 md:p-8 rounded-xl shadow-xl hover-lift transition-all duration-300 relative overflow-hidden group">
                      {/* Logo background */}
                      <div className="absolute -bottom-12 -right-12 w-36 h-36 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <Image 
                          src={exp.logo} 
                          alt={exp.company} 
                          width={150} 
                          height={150}
                          className="grayscale"
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="glass-premium px-3 py-1 rounded-full dark:bg-black/30 bg-white/70 border border-primary/20 flex items-center gap-2">
                          {getCategoryIcon(exp.category)}
                          <span className="text-primary text-sm font-medium">{exp.category.charAt(0).toUpperCase() + exp.category.slice(1)}</span>
                        </div>
                        <div className="glass-premium px-3 py-1 rounded-full dark:bg-black/30 bg-white/70 border border-primary/10 dark:text-white/70 text-gray-700 text-sm">
                          {exp.company}
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold dark:text-white text-gray-900 mb-3">{exp.role}</h3>
                      <p className="dark:text-white/70 text-gray-600 mb-6">{exp.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-base font-semibold dark:text-white text-gray-800 mb-3 flex items-center gap-2">
                          <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                            <FiAward className="text-primary" size={12} />
                          </span>
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="glass-premium dark:bg-black/20 bg-white/70 p-3 rounded-lg border border-primary/5 dark:text-white/80 text-gray-700 text-sm flex items-start gap-3 transform transition-transform duration-300 hover:translate-x-1">
                              <span className="text-primary mt-0.5 font-bold">•</span>
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-base font-semibold dark:text-white text-gray-800 mb-3 flex items-center gap-2">
                          <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                            <FiCode className="text-primary" size={12} />
                          </span>
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-3 py-1.5 dark:bg-primary/10 bg-primary/5 border border-primary/10 rounded-full dark:text-white text-gray-800 text-xs font-medium hover:bg-primary/15 transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
                
                {/* Image side alternates between left and right */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative`}>
                  <RevealOnScroll threshold={0.1} direction={index % 2 === 0 ? "left" : "right"}>
                    <div className="relative">
                      <div className="glass-premium p-3 rounded-xl border border-primary/10 shadow-xl overflow-hidden">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden">
                          <Image 
                            src={exp.logo} 
                            alt={exp.company}
                            width={500}
                            height={375}
                            className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 glass-premium dark:bg-black/40 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-primary/10 shadow-lg">
                        <h4 className="text-lg font-bold dark:text-white text-gray-900">{exp.company}</h4>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 