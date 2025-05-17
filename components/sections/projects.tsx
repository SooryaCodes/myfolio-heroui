"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { RevealOnScroll } from "@/components/scroll-animations";
import { Link } from "@heroui/link";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiExternalLink, FiX, FiTag, FiMaximize, FiFilter, FiChevronRight, FiFolder, FiEye, FiGlobe, FiSmartphone, FiPlay } from "react-icons/fi";
import Image from "next/image";
import { Card, CardBody, CardFooter } from "@heroui/card";

// Define ProjectType interface
interface ProjectType {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  technologies?: { name: string; icon?: string; description?: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured: boolean;
  location?: string;
  services?: string[];
}

// Project data array
const projectsData: ProjectType[] = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A comprehensive e-commerce solution with advanced features like real-time inventory, personalized recommendations, and seamless checkout.",
    longDescription: "This full-featured e-commerce platform delivers a seamless shopping experience across all devices. It includes advanced features like real-time inventory tracking, personalized product recommendations, secure payment processing, and comprehensive analytics. The platform is built with scalability in mind, allowing businesses to grow without technical limitations.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "React", description: "Frontend framework" },
      { name: "Node.js", description: "Backend runtime" },
      { name: "MongoDB", description: "Database" },
      { name: "Redis", description: "Caching" },
      { name: "Stripe", description: "Payment processing" },
      { name: "AWS", description: "Cloud infrastructure" }
    ],
    tags: ["E-commerce", "React", "Node.js", "Stripe", "MongoDB", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "web",
    featured: true,
    location: "Berlin, Germany",
    services: ["Web Design", "Web Development", "E-commerce", "Payment Integration"]
  },
  {
    id: 2,
    title: "Financial Dashboard",
    description: "A powerful financial analytics dashboard for tracking investments, expenses, and financial goals with interactive visualizations.",
    longDescription: "This financial dashboard provides users with a comprehensive view of their financial health. It includes features for tracking investments, monitoring expenses, setting and tracking financial goals, and visualizing financial data. The dashboard is built with security and performance as top priorities, ensuring that sensitive financial data is protected while providing a smooth user experience.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    technologies: [
      { name: "Vue.js", description: "Frontend framework" },
      { name: "D3.js", description: "Data visualization" },
      { name: "Express", description: "Backend framework" },
      { name: "PostgreSQL", description: "Database" },
      { name: "Auth0", description: "Authentication" },
      { name: "Docker", description: "Containerization" }
    ],
    tags: ["FinTech", "Dashboard", "Vue.js", "D3.js", "Data Visualization"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "web",
    featured: true,
    location: "Berlin, Germany",
    services: ["UX/UI Design", "Web Development", "Data Visualization", "Financial Analytics"]
  },
  {
    id: 3,
    title: "Fitness Tracking Mobile App",
    description: "A comprehensive fitness app that tracks workouts, nutrition, sleep, and provides personalized recommendations.",
    longDescription: "This mobile fitness application helps users achieve their health and fitness goals by tracking workouts, nutrition, sleep patterns, and providing personalized recommendations. The app includes features like workout plans, progress tracking, social sharing, and integration with wearable devices. Built for both iOS and Android, it offers a seamless experience across platforms.",
    image: "https://images.unsplash.com/photo-1510861320402-285a66f54351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510861320402-285a66f54351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "React Native", description: "Mobile framework" },
      { name: "Redux", description: "State management" },
      { name: "Firebase", description: "Backend & auth" },
      { name: "HealthKit/Google Fit", description: "Health data integration" },
      { name: "Jest", description: "Testing" }
    ],
    tags: ["Mobile", "React Native", "Fitness", "iOS", "Android", "Firebase"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "mobile",
    featured: true,
    location: "Berlin, Germany",
    services: ["Mobile App Design", "React Native Development", "Backend Integration", "Health & Fitness"]
  },
  {
    id: 4,
    title: "AI-Powered Content Generator",
    description: "An AI tool that generates high-quality content for blogs, social media, and marketing materials based on simple prompts.",
    longDescription: "This AI-powered content generator helps content creators and marketers produce high-quality text for blogs, social media, and marketing materials. Using advanced natural language processing, the tool can generate content based on simple prompts, adjust tone and style to match brand guidelines, and even optimize content for SEO. The platform includes a user-friendly interface for managing and editing generated content.",
    image: "https://images.unsplash.com/photo-1677442135016-ac193eda4635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1677442135016-ac193eda4635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      "https://images.unsplash.com/photo-1673443214909-89df92c73549?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1655720035861-ba4fd1c31aaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "Python", description: "Backend language" },
      { name: "TensorFlow", description: "ML framework" },
      { name: "GPT-3", description: "Language model" },
      { name: "FastAPI", description: "API framework" },
      { name: "React", description: "Frontend framework" },
      { name: "NextUI", description: "UI components" }
    ],
    tags: ["AI", "Machine Learning", "Content Generation", "NLP", "SaaS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "ai",
    featured: false,
    location: "Berlin, Germany",
    services: ["AI Development", "Web Application", "Product Design", "API Development"]
  },
  {
    id: 5,
    title: "Smart Home Automation System",
    description: "An IoT system that connects and automates home devices with a user-friendly mobile and voice interface.",
    longDescription: "This smart home automation system enables users to control and automate their home devices through a unified interface. The system includes a central hub that connects to various IoT devices, a mobile app for remote control, and voice integration with popular assistants like Alexa and Google Home. Features include scheduled routines, energy usage monitoring, and smart scenes based on user behavior.",
    image: "https://images.unsplash.com/photo-1558002038-28a91f304e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558002038-28a91f304e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80",
      "https://images.unsplash.com/photo-1563459802257-2a97df940f11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "IoT", description: "Device connectivity" },
      { name: "React Native", description: "Mobile app" },
      { name: "Node.js", description: "Backend" },
      { name: "MQTT", description: "Communication protocol" },
      { name: "AWS IoT", description: "Cloud platform" }
    ],
    tags: ["IoT", "Smart Home", "Mobile", "Voice Control", "Automation"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "iot",
    featured: false,
    location: "Berlin, Germany",
    services: ["IoT Development", "Mobile App", "Hardware Integration", "Cloud Infrastructure"]
  },
  {
    id: 6,
    title: "AR Shopping Experience",
    description: "An augmented reality application that allows users to visualize products in their space before purchasing.",
    longDescription: "This augmented reality shopping application revolutionizes the online shopping experience by allowing users to visualize products in their own space before making a purchase. The app supports furniture, home decor, and fashion items with accurate size and appearance representation. Additional features include product customization, social sharing, and seamless integration with e-commerce platforms for direct purchases.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1640176706899-25b8ef1fdd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1583225214464-90552867f89f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    technologies: [
      { name: "Unity", description: "3D development platform" },
      { name: "ARKit/ARCore", description: "AR frameworks" },
      { name: "C#", description: "Programming language" },
      { name: "Blender", description: "3D modeling" },
      { name: "RESTful API", description: "Backend integration" }
    ],
    tags: ["AR", "Mobile", "Unity", "3D", "E-commerce", "iOS", "Android"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "mobile",
    featured: true,
    location: "Berlin, Germany",
    services: ["Web Design", "Webflow Development", "Creative Development", "3D Animations"]
  }
];

// Premium project card that matches the example design
const ProjectCard = ({ project, isExpanded, onToggleExpand }: { 
  project: ProjectType; 
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  return (
    <div className={`relative ${isExpanded ? 'py-16' : 'py-12'} border-t border-foreground/10 transition-all duration-500 ease-in-out`}>
      <div className="flex flex-col gap-12">
        {/* Title and details section - always visible */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left side - Title and info */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">{project.title}</h2>
              <p className="text-foreground/70 text-base md:text-lg mb-6 max-w-xl">
                {project.description}
              </p>
              
              {/* Tags with premium design */}
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.slice(0, 5).map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 rounded-full text-xs text-foreground/80 bg-foreground/5 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="px-3 py-1 rounded-full text-xs text-foreground/80 bg-foreground/5 backdrop-blur-sm">
                    +{project.tags.length - 5} more
                  </span>
                )}
              </div>
              
              {/* Project services */}
              <div className="flex flex-wrap gap-6 mb-8">
                {project.services && project.services.map((service, index) => (
                  <span key={index} className="text-foreground/60 text-sm uppercase tracking-wider">{service}</span>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                <Button
                  as={Link}
                  href={project.liveUrl}
                  target="_blank"
                  color="primary"
                  variant="flat"
                  radius="full"
                  className="px-5 shadow-md shadow-primary/20 border-none"
                  startContent={<FiExternalLink />}
                >
                  View Live Demo
                </Button>
                
                <Button
                  as={Link}
                  href={project.githubUrl}
                  target="_blank"
                  variant="flat"
                  color="default"
                  radius="full"
                  className="px-5 bg-foreground/5 border-none"
                  startContent={<FiGithub />}
                >
                  View Code
                </Button>
                
                <Button
                  color="default"
                  variant="light"
                  className="text-foreground/60 group border-b border-foreground/0 hover:border-foreground/20 px-0 rounded-none"
                  endContent={
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <FiArrowRight />
                    </span>
                  }
                  onClick={onToggleExpand}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              </div>
              
              {/* Location info */}
              <div className="mt-8 text-sm text-foreground/50">
                {project.location}
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Image preview (only shown when not expanded) */}
          {!isExpanded && (
            <div className="lg:w-1/2">
              <div 
                className="relative aspect-[16/9] overflow-hidden rounded-xl"
                onClick={onToggleExpand}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-60"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Expanded content - only visible when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              {/* Full-width image */}
              <div className="mb-12">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Gallery images if available */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {project.gallery.slice(1, 3).map((img, index) => (
                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={img}
                        alt={`${project.title} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Technology stack */}
              {project.technologies && (
                <div className="mt-12 bg-foreground/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Technology Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="font-medium text-foreground">{tech.name}</span>
                        <span className="text-sm text-foreground/60">{tech.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Projects section component
export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const toggleProjectExpand = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };
  
  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);
  
  const categories = ["all", ...Array.from(new Set(projectsData.map(project => project.category)))];
  
  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-primary/10 blur-[150px] rounded-full opacity-30 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-secondary/10 blur-[150px] rounded-full opacity-30 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <Badge color="primary" variant="flat" className="mb-4 bg-primary/10 border-none">
                <span className="px-2 py-0.5 text-primary">Projects</span>
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Selected Works</h2>
              <p className="text-foreground/70 max-w-2xl">
                Explore my recent projects showcasing my skills, creativity, and problem-solving abilities.
              </p>
            </div>
            
            <div className="bg-foreground/5 backdrop-blur-md p-1 rounded-full">
              <Tabs 
                aria-label="Project Categories"
                color="primary"
                variant="light"
                radius="full"
                classNames={{
                  tabList: "bg-transparent",
                  cursor: "bg-primary/20",
                  tab: "text-foreground/60 data-[selected=true]:text-primary px-4 py-2 text-sm rounded-full",
                  panel: "p-0",
                }}
                onSelectionChange={(key) => setSelectedCategory(key.toString())}
                selectedKey={selectedCategory}
              >
                {categories.map((category) => (
                  <Tab 
                    key={category} 
                    title={
                      <div className="flex items-center gap-2">
                        {category === "all" ? (
                          <FiMaximize className="text-xs" />
                        ) : category === "web" ? (
                          <FiGlobe className="text-xs" />
                        ) : category === "mobile" ? (
                          <FiSmartphone className="text-xs" />
                        ) : (
                          <FiFolder className="text-xs" />
                        )}
                        <span className="capitalize">{category}</span>
                      </div>
                    }
                  />
                ))}
              </Tabs>
            </div>
          </div>
        </RevealOnScroll>
        
        {/* Projects List */}
        <div className="space-y-0">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              isExpanded={expandedProject === project.id}
              onToggleExpand={() => toggleProjectExpand(project.id)}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-32">
          <RevealOnScroll>
            <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-primary/20 blur-[80px] rounded-full z-0"></div>
              <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary/20 blur-[60px] rounded-full z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Interested in working together?</h3>
                <p className="text-foreground/70 mb-8 mx-auto max-w-xl text-center">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    color="primary"
                    radius="full"
                    className="px-8 shadow-lg shadow-primary/20"
                    endContent={<FiArrowRight />}
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

// Helper function to scroll to a section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};