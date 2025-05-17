"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { FiArrowRight, FiBriefcase, FiAward, FiCode } from "react-icons/fi";
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
    description: "Leading the development of user-facing features for Meta's new productivity suite. Focusing on accessibility, performance optimization, and elegant user experiences.",
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
    description: "Designed and developed user interfaces for Shopify's merchant platform. Collaborated with product teams to create intuitive, efficient, and beautiful user experiences.",
    achievements: [
      "Built key components for Shopify's Polaris design system",
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
    role: "Master's in Human-Computer Interaction",
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
        return <FiBriefcase className="mr-2 text-primary" />;
      case "education":
        return <FiAward className="mr-2 text-primary" />;
      case "projects":
        return <FiCode className="mr-2 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section 
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden bg-black"
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
              className="mb-4 border border-primary/20 bg-black/30 backdrop-blur-sm"
            >
              <span className="px-2 py-0.5 text-primary">Experience</span>
            </Badge>
            <h2 className="heading-xl text-white mb-6">Professional Journey</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
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
              tabList: "flex justify-center bg-white/5 backdrop-blur-sm rounded-full p-1 max-w-md mx-auto",
              cursor: "bg-primary/20",
              tab: "text-white/70 data-[selected=true]:text-primary px-4 py-2",
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
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/5"></div>
          
          <div className="space-y-12 md:space-y-24 relative">
            {filteredExperiences.map((exp, index) => (
              <div key={exp.id} className={`relative z-10 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="md:flex items-start">
                  {/* Timeline content - alternating sides on larger screens */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <MaskReveal 
                      direction={index % 2 === 0 ? "left" : "right"}
                      threshold={0.2}
                    >
                      <div className="card-premium p-6 md:p-8 relative overflow-hidden group hover-lift">
                        {/* Company logo */}
                        <div className="absolute top-0 right-0 w-24 h-24 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                          <div className="relative w-full h-full">
                            <Image 
                              src={exp.logo} 
                              alt={exp.company} 
                              fill 
                              className="object-cover grayscale" 
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center">
                            {getCategoryIcon(exp.category)}
                            {exp.category.charAt(0).toUpperCase() + exp.category.slice(1)}
                          </div>
                          <div className="text-white/50 text-sm">{exp.duration}</div>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{exp.role}</h3>
                        <h4 className="text-lg font-medium text-primary mb-4">{exp.company}</h4>
                        
                        <p className="text-white/70 mb-6">{exp.description}</p>
                        
                        <div className="mb-6">
                          <h5 className="text-white text-sm font-medium mb-3">Key Achievements</h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                                <span className="text-primary mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </MaskReveal>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 transform translate-y-1/2 md:translate-y-0 md:translate-x-[-50%] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary relative z-10">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></div>
                    </div>
                  </div>
                  
                  {/* Timeline date - visible only on larger screens */}
                  <div className={`hidden md:block md:w-1/2 pt-12 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12 md:text-right'}`}>
                    <RevealOnScroll
                      threshold={0.1}
                      direction={index % 2 === 0 ? "right" : "left"}
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{exp.duration}</h3>
                      <div className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent mb-3 mx-auto md:mx-0 md:ml-0"></div>
                      <p className="text-white/40 text-sm max-w-xs md:max-w-none">
                        {index % 2 === 0 ? (
                          <>Working at <span className="text-primary">{exp.company}</span> as {exp.role}</>
                        ) : (
                          <>{exp.role} at <span className="text-primary">{exp.company}</span></>
                        )}
                      </p>
                    </RevealOnScroll>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 