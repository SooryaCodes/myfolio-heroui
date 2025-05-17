"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { RevealOnScroll } from "@/components/scroll-animations";
import { Link } from "@heroui/link";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiExternalLink, FiX, FiTag, FiMaximize, FiMinimize, FiFilter } from "react-icons/fi";
import Image from "next/image";

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

// Updated premium project data with Unsplash images
const projects: ProjectType[] = [
  {
    id: 1,
    title: "Architect — Modern Portfolio",
    description: "A minimalist portfolio for architects showcasing projects with interactive 3D models and immersive galleries.",
    longDescription: "Designed and developed a comprehensive architect portfolio with WebGL 3D model viewers, interactive project galleries, and a custom CMS for easy content management. Features smooth animations, responsive design, and advanced filtering capabilities.",
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
    ],
    technologies: [
      { name: "React", description: "Frontend UI library" },
      { name: "Three.js", description: "3D rendering" },
      { name: "GSAP", description: "Advanced animations" },
      { name: "Tailwind CSS", description: "Styling framework" },
    ],
    tags: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/architect-portfolio",
    liveUrl: "https://architect-portfolio.vercel.app",
    category: "web",
    featured: true,
  },
  {
    id: 2,
    title: "Tempo — Music Streaming App",
    description: "A beautifully designed music platform with spatial audio support and personalized AI recommendations.",
    longDescription: "Created a full-stack music streaming application with spatial audio technology, personalized recommendations using machine learning, and social features allowing users to share and discover music. Built with React Native for cross-platform mobile support.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598387846148-47e82ee3d7a6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=2070&auto=format&fit=crop",
    ],
    technologies: [
      { name: "React Native", description: "Cross-platform mobile app framework" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "Node.js", description: "Backend framework" },
      { name: "TensorFlow", description: "AI/ML integration" },
    ],
    tags: ["React Native", "TypeScript", "Node.js", "TensorFlow"],
    githubUrl: "https://github.com/yourusername/tempo-music",
    liveUrl: "https://tempo-music.app",
    category: "mobile",
    featured: true,
  },
  {
    id: 3,
    title: "Quantum — Financial Dashboard",
    description: "A comprehensive finance platform with real-time data visualization, predictive analytics, and custom reports.",
    longDescription: "Developed a sophisticated financial dashboard that visualizes complex data through interactive charts and reports. Integrates with multiple financial APIs to provide real-time market data, portfolio tracking, and predictive analytics using machine learning algorithms.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579170053380-58a0ed8d75cc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    ],
    technologies: [
      { name: "React", description: "Frontend library" },
      { name: "D3.js", description: "Data visualization" },
      { name: "Python", description: "Backend & data processing" },
      { name: "Firebase", description: "Database & authentication" },
    ],
    tags: ["React", "D3.js", "Python", "Firebase"],
    githubUrl: "https://github.com/yourusername/quantum-finance",
    liveUrl: "https://quantum-finance.vercel.app",
    category: "web",
    featured: true,
  },
  {
    id: 4,
    title: "Atlas — Travel Companion",
    description: "An intelligent travel app that creates personalized itineraries based on user preferences and real-time data.",
    longDescription: "Built a travel companion application that uses AI to generate personalized travel itineraries based on user preferences, budget constraints, and current local conditions. Features offline maps, local recommendations, and augmented reality navigation.",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=2070&auto=format&fit=crop",
    ],
    technologies: [
      { name: "Flutter", description: "Cross-platform framework" },
      { name: "Dart", description: "Programming language" },
      { name: "Firebase", description: "Backend services" },
      { name: "TensorFlow Lite", description: "On-device ML" },
    ],
    tags: ["Flutter", "Dart", "Firebase", "TensorFlow Lite"],
    githubUrl: "https://github.com/yourusername/atlas-travel",
    liveUrl: "https://atlas-travel.app",
    category: "mobile",
    featured: false,
  },
  {
    id: 5,
    title: "Nova — AI Image Generator",
    description: "A sophisticated image generation tool that creates unique visual content from text descriptions with fine control.",
    longDescription: "Created a state-of-the-art AI image generation application that produces high-fidelity images from text prompts. Implemented fine-tuning controls allowing users to adjust style, composition, and lighting. Includes batch generation capabilities and history management.",
    image: "https://images.unsplash.com/photo-1633907284646-7abf4a195875?q=80&w=2069&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1633958636964-c9cfef242aaa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616161560683-5987f5c1c7bf?q=80&w=2070&auto=format&fit=crop",
    ],
    technologies: [
      { name: "Next.js", description: "React framework" },
      { name: "OpenAI API", description: "AI model integration" },
      { name: "WebGL", description: "Graphics rendering" },
      { name: "Tailwind CSS", description: "Styling" },
    ],
    tags: ["Next.js", "OpenAI API", "WebGL", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/nova-ai-image",
    liveUrl: "https://nova-ai-generator.vercel.app",
    category: "ai",
    featured: false,
  },
  {
    id: 6,
    title: "Narrative — Content Platform",
    description: "A modern publishing platform with advanced editing tools, analytics, and monetization options for creators.",
    longDescription: "Designed and developed a premium content platform for writers and creators, featuring an intuitive WYSIWYG editor, advanced analytics dashboard, and multiple monetization options including subscriptions and microtransactions. Supports rich media embedding and collaboration.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506615724302-db2afd603b2e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop",
    ],
    technologies: [
      { name: "Next.js", description: "Frontend framework" },
      { name: "Editor.js", description: "Block editor" },
      { name: "GraphQL", description: "API query language" },
      { name: "Stripe", description: "Payment processing" },
    ],
    tags: ["Next.js", "Editor.js", "GraphQL", "Stripe"],
    githubUrl: "https://github.com/yourusername/narrative",
    liveUrl: "https://narrative-platform.vercel.app",
    category: "web",
    featured: false,
  },
];

// 3D Project Card Component
const Project3DCard = ({ project, priority = false }: { project: ProjectType, priority?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isExpanded) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateXVal = ((mouseY - height / 2) / height) * 10;
    const rotateYVal = ((width / 2 - mouseX) / width) * 10;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };
  
  const resetRotation = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };
  
  const handleClickOutside = (e: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);
  
  // Handle gallery image cycling
  useEffect(() => {
    if (isExpanded && project.gallery?.length) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === project.gallery!.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      
      return () => clearInterval(intervalId);
    }
  }, [isExpanded, project.gallery]);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
    >
      <motion.div 
        className={`card-premium overflow-hidden ${
          isExpanded 
            ? 'fixed top-[10%] left-[10%] right-[10%] bottom-[10%] z-50 flex flex-col lg:flex-row'
            : `h-full transition-transform duration-500 ${priority ? 'aspect-[16/9]' : 'aspect-video'} rounded-xl`
        }`}
        layoutId={`project-card-${project.id}`}
        style={{
          rotateX: isExpanded ? 0 : rotateXSpring,
          rotateY: isExpanded ? 0 : rotateYSpring,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          boxShadow: isHovered && !isExpanded ? '0 30px 60px -20px rgba(0,0,0,0.15)' : '0 10px 30px -15px rgba(0,0,0,0.1)',
          border: '1px solid rgba(var(--border), 0.2)',
        }}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <motion.div 
          className={`relative ${
            isExpanded 
              ? 'lg:w-1/2 h-1/3 lg:h-full' 
              : 'w-full h-full'
          }`}
          layoutId={`project-image-${project.id}`}
        >
          {isExpanded && project.gallery ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentImageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Image 
                  src={project.gallery[currentImageIndex]} 
                  alt={`${project.title} - Gallery image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-700 ${
                isHovered && !isExpanded ? 'scale-105' : ''
              }`}
              priority={priority}
            />
          )}
          
          {/* Gallery navigation dots */}
          {isExpanded && project.gallery && project.gallery.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              {project.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentImageIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Overlay elements only shown when not expanded */}
          {!isExpanded && (
            <>
              {/* Category badge */}
              <div className="absolute top-6 left-6 z-10">
                <Badge 
                  color="primary" 
                  variant="flat"
                  className="glass-premium border border-primary/20"
                >
                  {project.category === 'web' ? 'Web Development' : 
                   project.category === 'mobile' ? 'Mobile App' : 
                   'AI & Machine Learning'}
                </Badge>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag: string) => (
                    <span 
                      key={tag} 
                      className="glass-premium px-3 py-1 rounded-full text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="glass-premium px-3 py-1 rounded-full text-xs text-white">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="w-full h-[1px] bg-white/10 mb-4"></div>
                
                <Button
                  color="primary"
                  variant="flat"
                  radius="full"
                  size="sm"
                  endContent={<FiMaximize size={14} />}
                  className="glass-premium border border-primary/20 backdrop-blur-md"
                >
                  View Details
                </Button>
              </div>
              
              {/* Expand icon */}
              <Button
                isIconOnly
                className="absolute top-6 right-6 z-10"
                size="sm"
                color="default"
                variant="flat"
                radius="full"
                aria-label="Expand"
              >
                <FiArrowUpRight />
              </Button>
            </>
          )}
        </motion.div>
        
        {/* Expanded view content */}
        {isExpanded && (
          <motion.div 
            className="flex-1 bg-card p-8 lg:p-12 overflow-auto flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <Badge 
                  color="primary" 
                  variant="flat" 
                  className="mb-3"
                >
                  {project.category === 'web' ? 'Web Development' : 
                  project.category === 'mobile' ? 'Mobile App' : 
                  'AI & Machine Learning'}
                </Badge>
                <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
              </div>
              <Button
                isIconOnly
                variant="flat"
                color="default"
                size="sm"
                radius="full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                aria-label="Close"
              >
                <FiX />
              </Button>
            </div>
            
            {/* Project description */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-2">Project Overview</h4>
              <p className="text-muted">{project.longDescription}</p>
            </div>
            
            {/* Technologies used */}
            {project.technologies && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.technologies.map((tech) => (
                    <div key={tech.name} className="flex items-start gap-3 glass-premium p-3 rounded-lg border border-border">
                      <div className="bg-primary/10 p-2 rounded-md text-primary">
                        <FiTag size={14} />
                      </div>
                      <div>
                        <h5 className="text-foreground font-medium text-sm">{tech.name}</h5>
                        {tech.description && (
                          <p className="text-muted text-xs">{tech.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-3">Project Tags</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="flat" color="default" className="text-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Project links */}
            <div className="mt-auto flex flex-wrap gap-4">
              <Button
                as={Link}
                href={project.githubUrl}
                target="_blank"
                variant="flat"
                color="default"
                startContent={<FiGithub />}
              >
                View Code
              </Button>
              <Button
                as={Link}
                href={project.liveUrl}
                target="_blank"
                variant="flat"
                color="primary"
                startContent={<FiExternalLink />}
              >
                Visit Project
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Projects = () => {
  const [category, setCategory] = useState<string>("all");
  const featuredProjects = projects.filter(project => project.featured);
  const filteredProjects = category === "all" 
    ? projects 
    : projects.filter(project => project.category === category);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full z-0"
        style={{ opacity, y: y1 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-primary/3 blur-[150px] rounded-full z-0"
        style={{ opacity, y: y2 }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4 border border-primary/20 glass-premium"
            >
              <span className="px-2 py-0.5 text-primary">Portfolio</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">Selected Projects</h2>
            <p className="text-muted max-w-2xl mx-auto">
              A curated collection of my most significant work across web development, 
              mobile applications, and AI integrations.
            </p>
          </div>
        </RevealOnScroll>

        {/* Featured Projects Section */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl text-foreground font-semibold">Featured Work</h3>
            <Link href="#" className="text-primary flex items-center gap-1 group">
              <span>All Projects</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <Project3DCard 
                key={project.id} 
                project={project}
                priority={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Project Categories */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h3 className="text-2xl text-foreground font-semibold mb-4 md:mb-0">Browse Projects</h3>
            <Tabs
              aria-label="Project categories"
              color="primary"
              variant="light"
              classNames={{
                tabList: "glass-premium rounded-full p-1",
                cursor: "bg-primary/20",
                tab: "text-muted data-[selected=true]:text-primary px-4 py-2",
              }}
              selectedKey={category}
              onSelectionChange={(key) => setCategory(key as string)}
              startContent={<FiFilter className="text-muted ml-2" />}
            >
              <Tab key="all" title="All Projects" />
              <Tab key="web" title="Web" />
              <Tab key="mobile" title="Mobile" />
              <Tab key="ai" title="AI/ML" />
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Project3DCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button
            as={Link}
            href="https://github.com/yourusername"
            target="_blank"
            color="primary"
            variant="flat"
            radius="full"
            size="lg"
            startContent={<FiGithub />}
            endContent={<FiArrowUpRight />}
            className="px-8 font-medium glass-premium border border-primary/20"
          >
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}; 