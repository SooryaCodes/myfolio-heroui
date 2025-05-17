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
  // ... (keeping existing project data)
];

// Full-width expanding project card
const FullWidthProjectCard = ({ project, index }: { project: ProjectType, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
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

  const handleOutsideClick = (e: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isExpanded]);
  
  return (
    <motion.div
      ref={cardRef}
      className="w-full mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Card
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "shadow-2xl" : "hover-lift border border-border"
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <motion.div 
          className={`flex flex-col ${isExpanded ? "lg:flex-row" : ""}`}
          layout
        >
          {/* Image section */}
          <motion.div 
            className={`relative ${
              isExpanded
                ? "lg:w-2/5 h-64 lg:h-auto"
                : "w-full aspect-[21/9]"
            }`}
            layout
          >
            {isExpanded && project.gallery ? (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image 
                    src={project.gallery[currentImageIndex]} 
                    alt={`${project.title} - Gallery image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover rounded-tl-2xl rounded-bl-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-tl-2xl rounded-bl-2xl"></div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <>
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className={`object-cover ${isExpanded ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-t-2xl"}`}
                />
                <div className={`absolute inset-0 bg-black/30 ${isExpanded ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-t-2xl"}`}></div>
              </>
            )}
            
            {/* Gallery navigation dots */}
            {isExpanded && project.gallery && project.gallery.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                {project.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? 'bg-white scale-110' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 z-10">
              <Chip
                color="primary"
                variant="flat"
                className="glass-premium border border-primary/20 text-xs text-white flex items-center gap-1.5"
                radius="full"
              >
                {project.category === 'web' ? <FiExternalLink size={12} /> : 
                 project.category === 'mobile' ? <FiMaximize size={12} /> : 
                 <FiFolder size={12} />}
                <span>
                  {project.category === 'web' ? 'Web Development' : 
                   project.category === 'mobile' ? 'Mobile App' : 
                   'AI & Machine Learning'}
                </span>
              </Chip>
            </div>
          </motion.div>
          
          {/* Content section */}
          <CardBody 
            className={`p-6 flex-1 flex flex-col bg-card/30 backdrop-blur-md`}
          >
            <motion.div layout>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                layout
              >
                {project.title}
              </motion.h3>
              
              <motion.p 
                className="text-muted mb-4 line-clamp-2"
                layout
              >
                {isExpanded ? project.longDescription : project.description}
              </motion.p>
              
              {/* Tags */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                layout
              >
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    className="bg-default-100 text-foreground/80 text-xs"
                    radius="full"
                    size="sm"
                  >
                    {tag}
                  </Chip>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Technologies - Only visible when expanded */}
            {isExpanded && project.technologies && (
              <motion.div 
                className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.technologies.map((tech) => (
                  <div key={tech.name} className="flex items-start gap-2 bg-default-100/50 p-2 rounded-lg">
                    <div className="mt-0.5 text-primary">
                      <FiTag size={14} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">{tech.name}</div>
                      {tech.description && <div className="text-xs text-muted">{tech.description}</div>}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            
            {/* Action buttons */}
            <motion.div 
              className={`flex gap-3 mt-auto ${isExpanded ? "justify-end" : ""}`}
              layout
            >
              {isExpanded ? (
                <>
                  <Button
                    as={Link}
                    href={project.githubUrl}
                    target="_blank"
                    variant="flat"
                    color="default"
                    size="sm"
                    startContent={<FiGithub size={14} />}
                  >
                    View Code
                  </Button>
                  <Button
                    as={Link}
                    href={project.liveUrl}
                    target="_blank"
                    variant="flat"
                    color="primary"
                    size="sm"
                    startContent={<FiExternalLink size={14} />}
                  >
                    Visit Project
                  </Button>
                  <Button
                    variant="light"
                    color="default"
                    size="sm"
                    isIconOnly
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                  >
                    <FiX size={14} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                    radius="full"
                    endContent={<FiEye size={14} />}
                    className="mr-auto"
                  >
                    View Details
                  </Button>
                  <Button
                    as={Link}
                    href={project.githubUrl}
                    target="_blank"
                    isIconOnly
                    variant="light"
                    color="default"
                    size="sm"
                    radius="full"
                  >
                    <FiGithub size={14} />
                  </Button>
                  <Button
                    as={Link}
                    href={project.liveUrl}
                    target="_blank"
                    isIconOnly
                    variant="light"
                    color="primary"
                    size="sm"
                    radius="full"
                  >
                    <FiExternalLink size={14} />
                  </Button>
                </>
              )}
            </motion.div>
          </CardBody>
        </motion.div>
      </Card>
    </motion.div>
  );
};

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
      <Card className="h-full overflow-hidden border border-border rounded-2xl">
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
            <Badge color="primary" variant="flat" className="mb-4">Projects</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">My Latest Work</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore my recent projects showcasing my skills, creativity, and problem-solving abilities.
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Category filter */}
        <div className="mb-12 flex justify-center">
          <Tabs 
            variant="solid" 
            color="primary" 
            radius="full" 
            className="max-w-fit mx-auto"
            onSelectionChange={(key) => setSelectedCategory(key.toString())}
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
                      <FiMaximize className="text-xs" />
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
        
        {/* Projects display */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => (
            <FullWidthProjectCard 
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