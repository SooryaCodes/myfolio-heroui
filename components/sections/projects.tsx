"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { RevealOnScroll } from "@/components/scroll-animations";
import { Link } from "@heroui/link";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiExternalLink, FiX, FiTag, FiMaximize, FiFilter, FiChevronRight, FiFolder, FiEye, FiGlobe, FiSmartphone } from "react-icons/fi";
import Image from "next/image";
import { Card, CardBody } from "@heroui/card";

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
}

// Project data array
const projects: ProjectType[] = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce platform with React, Node.js, and MongoDB.",
    longDescription: "A comprehensive e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment processing with Stripe, and order tracking. The platform is fully responsive and designed with a modern UI/UX approach.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "React", description: "Frontend UI development" },
      { name: "Node.js", description: "Backend API and server" },
      { name: "MongoDB", description: "Database" },
      { name: "Express", description: "Web framework" },
      { name: "Stripe", description: "Payment processing" },
      { name: "JWT", description: "Authentication" }
    ],
    tags: ["React", "Node.js", "MongoDB", "Express", "Stripe", "REST API"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "web",
    featured: true
  },
  {
    id: 2,
    title: "AI-Powered Content Generator",
    description: "A content generation tool leveraging OpenAI's GPT models for marketers and writers.",
    longDescription: "This AI-powered content generator helps marketers and writers create high-quality content efficiently. It uses OpenAI's GPT models to generate blog posts, social media content, product descriptions, and more. The platform includes features for customizing tone, style, and content length, as well as editing and refining the generated content.",
    image: "https://images.unsplash.com/photo-1677442135016-ac193eda4635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1677442135016-ac193eda4635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      "https://images.unsplash.com/photo-1673443214909-89df92c73549?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1655720035861-ba4fd1c31aaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "Next.js", description: "Frontend framework" },
      { name: "OpenAI API", description: "AI capabilities" },
      { name: "TypeScript", description: "Type-safe code" },
      { name: "Tailwind CSS", description: "Styling" },
      { name: "Prisma", description: "Database ORM" },
      { name: "PostgreSQL", description: "Database" }
    ],
    tags: ["AI", "OpenAI", "Next.js", "TypeScript", "Tailwind CSS", "SaaS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "ai",
    featured: true
  },
  {
    id: 3,
    title: "Fitness Tracking Mobile App",
    description: "A comprehensive fitness tracking app for iOS and Android using React Native.",
    longDescription: "A feature-rich fitness tracking mobile application built using React Native for both iOS and Android platforms. The app helps users track workouts, set goals, monitor progress, and connect with a community of fitness enthusiasts. It includes features like workout plans, nutrition tracking, progress photos, and integration with wearable devices.",
    image: "https://images.unsplash.com/photo-1510861320402-285a66f54351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510861320402-285a66f54351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "React Native", description: "Cross-platform mobile development" },
      { name: "Firebase", description: "Backend services" },
      { name: "Redux", description: "State management" },
      { name: "Expo", description: "Development framework" },
      { name: "HealthKit/Google Fit", description: "Fitness data integration" }
    ],
    tags: ["React Native", "Firebase", "Redux", "Mobile App", "Fitness", "Expo"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "mobile",
    featured: false
  },
  {
    id: 4,
    title: "Real-time Collaboration Platform",
    description: "A collaborative workspace for teams with real-time document editing and project management.",
    longDescription: "This real-time collaboration platform helps teams work together efficiently regardless of location. It features collaborative document editing, task management, team chat, file sharing, and video conferencing. The platform uses WebSockets for real-time updates and ensures that all team members stay in sync.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    technologies: [
      { name: "Vue.js", description: "Frontend framework" },
      { name: "Socket.io", description: "Real-time communication" },
      { name: "Node.js", description: "Backend" },
      { name: "MongoDB", description: "Database" },
      { name: "WebRTC", description: "Video conferencing" },
      { name: "Docker", description: "Containerization" }
    ],
    tags: ["Vue.js", "WebSockets", "Real-time", "Collaboration", "SaaS", "Team"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "web",
    featured: false
  },
  {
    id: 5,
    title: "AR Product Visualization App",
    description: "An Augmented Reality app that allows users to visualize products in their real environment.",
    longDescription: "This AR product visualization app enables e-commerce customers to see how products would look in their own space before purchasing. Using ARKit for iOS and ARCore for Android, the app provides a seamless AR experience with realistic product rendering, scaling, and placement. It includes a catalog of 3D models and integrates with e-commerce platforms for a complete shopping experience.",
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
    featured: true
  }
];

// Featured Project Card for hero section
const FeaturedProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <motion.div
      className="relative h-full overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="h-full overflow-hidden border border-border rounded-2xl hover-lift">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>
        
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <CardBody className="relative z-20 h-full flex flex-col justify-end p-6">
          <Chip
            color="primary"
            variant="flat"
            className="glass-premium border border-primary/20 text-xs mb-4 inline-flex w-auto"
            radius="full"
          >
            <span className="px-2">
              {project.category === 'web' ? 'Web Development' : 
               project.category === 'mobile' ? 'Mobile App' : 
               'AI & Machine Learning'}
            </span>
          </Chip>
          
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 mb-4 line-clamp-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="glass-premium px-2 py-1 rounded-full text-xs text-white">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="flat"
              color="primary"
              radius="full"
              size="sm"
              endContent={<FiChevronRight size={14} />}
              className="glass-premium border border-primary/20"
            >
              View Project
            </Button>
            <Button
              as={Link}
              href={project.liveUrl}
              target="_blank"
              variant="light"
              size="sm"
              color="default"
              radius="full"
              startContent={<FiExternalLink size={14} />}
              className="text-white"
            >
              Live Preview
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

// Modern project card with hover expansion
const ProjectCard = ({ project, index }: { project: ProjectType, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.4, 1, 1, 0.8]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="group relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[16/9] sm:aspect-[3/2] md:aspect-[16/9] relative overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110 filter saturate-100' : 'scale-100 filter saturate-[0.9]'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <Chip
            color="primary"
            variant="flat"
            className="glass-premium border border-primary/20 text-xs text-white"
            radius="full"
          >
            {project.category === 'web' ? 'Web Development' : 
             project.category === 'mobile' ? 'Mobile App' : 
             'AI & Machine Learning'}
          </Chip>
        </div>
        
        {/* Content */}
        <div className={`absolute inset-x-0 bottom-0 p-6 z-20 transition-all duration-500 ${isHovered ? 'transform-none' : 'translate-y-6'}`}>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className={`text-white/80 mb-4 line-clamp-2 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {project.description}
          </p>
          
          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mb-5 transition-all duration-500 delay-100 ${isHovered ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="glass-premium px-2 py-1 rounded-full text-xs text-white">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="glass-premium px-2 py-1 rounded-full text-xs text-white">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div className={`flex gap-3 transition-all duration-500 delay-150 ${isHovered ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
            <Button
              as={Link}
              href={project.liveUrl}
              target="_blank"
              variant="flat"
              color="primary"
              radius="full"
              size="sm"
              className="glass-premium border border-primary/20"
              startContent={<FiExternalLink size={14} />}
            >
              Live Demo
            </Button>
            <Button
              as={Link}
              href={project.githubUrl}
              target="_blank"
              variant="flat"
              color="default"
              radius="full"
              size="sm"
              className="glass-premium border border-white/10"
              startContent={<FiGithub size={14} />}
            >
              View Code
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Projects section component
export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  const categories = ["all", ...Array.from(new Set(projects.map(project => project.category)))];
  
  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      
      <motion.div
        style={{ 
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
        className="max-w-7xl mx-auto"
      >
        <RevealOnScroll>
          <div className="text-center mb-16">
            <Badge color="primary" variant="flat" className="mb-4 glass-premium border border-primary/20">
              <span className="px-2 py-0.5 text-primary">Projects</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">My Latest Work</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore my recent projects showcasing my skills, creativity, and problem-solving abilities.
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Featured Projects Section - Grid Layout */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.featured).map((project) => (
              <FeaturedProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        
        {/* Category filter */}
        <div className="mb-12 flex justify-center">
          <Tabs 
            variant="solid" 
            color="primary" 
            radius="full" 
            className="max-w-fit mx-auto"
            onSelectionChange={(key) => setSelectedCategory(key.toString())}
            classNames={{
              tabList: "overflow-x-auto flex-nowrap sm:flex-wrap",
              tab: "whitespace-nowrap",
            }}
          >
            {categories.map((category) => (
              <Tab 
                key={category} 
                title={
                  <div className="flex items-center gap-2 px-1">
                    {category === "all" ? (
                      <FiMaximize className="text-xs" />
                    ) : category === "web" ? (
                      <FiExternalLink className="text-xs" />
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
        
        {/* Projects display - Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};