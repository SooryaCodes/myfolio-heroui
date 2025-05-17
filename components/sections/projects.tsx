"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Progress } from "@heroui/progress";
import { Divider } from "@heroui/divider";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { FiArrowRight, FiExternalLink, FiGithub, FiMaximize, FiGlobe, FiSmartphone, FiFolder, FiEye, FiInfo } from "react-icons/fi";
import Image from "next/image";
import { RevealOnScroll } from "@/components/scroll-animations";
import { projects } from "@/datas/projects";
import NextLink from "next/link";

// Add this array of fallback images at the top of the file
const fallbackImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
  "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
];

// Premium project card that directs to project detail page
const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <Card className="my-8 border-none shadow-none bg-transparent">
      <CardBody className="p-0">
        <div className="relative py-8 border-t border-foreground/10 transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-12">
            {/* Title and details section */}
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
                    {project.tags && project.tags.slice(0, 5).map((tag, index) => (
                      <Chip 
                        key={index} 
                        variant="flat"
                        color="default"
                        radius="full"
                        size="sm"
                        className="bg-foreground/5 backdrop-blur-sm text-foreground/80"
                      >
                        {tag}
                      </Chip>
                    ))}
                    {project.tags && project.tags.length > 5 && (
                      <Tooltip content={project.tags.slice(5).join(", ")}>
                        <Chip
                          variant="flat"
                          color="primary"
                          radius="full"
                          size="sm"
                          className="cursor-help"
                        >
                          +{project.tags.length - 5} more
                        </Chip>
                      </Tooltip>
                    )}
                  </div>
                  
                  {/* Project services */}
                  <ScrollShadow className="max-w-md mb-8" orientation="horizontal" hideScrollBar>
                    <div className="flex gap-6 min-w-max">
                      {project.services && project.services.map((service, index) => (
                        <Badge key={index} variant="flat" color="secondary" className="bg-transparent text-foreground/60 text-sm uppercase tracking-wider border-none">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </ScrollShadow>
                  
                  {/* Technology proficiency */}
                  <div className="mb-8 max-w-md">
                    <div className="flex justify-between items-center mb-1">
                      <small className="text-foreground/60 text-xs">Technologies used</small>
                      <small className="text-foreground/60 text-xs">{project.technologies.length} total</small>
                    </div>
                    <Progress 
                      value={100} 
                      color="primary"
                      size="sm"
                      radius="full"
                      className="w-full"
                      showValueLabel={false}
                    />
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button
                      as={Link}
                      href={project.link}
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
                      href={project.github || "#"}
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
                      as={NextLink} 
                      href={`/projects/${project.slug}`}
                      color="default"
                      variant="light"
                      className="text-foreground/60 group border-b border-foreground/0 hover:border-foreground/20 px-0 rounded-none"
                      endContent={
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          <FiArrowRight />
                        </span>
                      }
                    >
                      View Project Details
                    </Button>
                  </div>
                  
                  {/* Location info */}
                  <div className="mt-8 text-sm text-foreground/50">
                    {project.location}
                  </div>
                </motion.div>
              </div>
              
              {/* Right side - Image preview */}
              <div className="lg:w-1/2">
                <Card className="border-none shadow-none overflow-hidden bg-transparent">
                  <CardBody className="p-0">
                    <NextLink href={`/projects/${project.slug}`}>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={project.image || fallbackImages[project.id % fallbackImages.length]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            // If the image fails to load, use a fallback
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackImages[project.id % fallbackImages.length];
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    </NextLink>
                  </CardBody>
                  <CardFooter className="p-0 mt-2">
                    <Chip
                      startContent={<FiInfo size={14} />}
                      variant="flat"
                      radius="sm"
                      color="default"
                      size="sm"
                      className="bg-foreground/5 text-xs"
                    >
                      Completed: {new Date(project.completed).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </Chip>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// Projects section component
export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === selectedCategory);
  
  // Create a list of unique categories from project data
  const categoriesSet = new Set<string>(projects.map(project => project.category.toLowerCase()));
  const categories = ["all", ...Array.from(categoriesSet)];
  
  const completionRate = Math.round((projects.filter(p => p.completed).length / projects.length) * 100);
  
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
              
              <div className="mt-4 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span>Project Completion Rate</span>
                  <span className="font-medium">{completionRate}%</span>
                </div>
                <Progress 
                  value={completionRate} 
                  color="success"
                  showValueLabel={false}
                  className="h-2"
                />
              </div>
            </div>
            
            <Card className="bg-foreground/5 backdrop-blur-md border-none shadow-none">
              <CardBody className="p-1">
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
                          ) : category === "web development" ? (
                            <FiGlobe className="text-xs" />
                          ) : category === "mobile development" ? (
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
              </CardBody>
            </Card>
          </div>
        </RevealOnScroll>
        
        {/* Projects List */}
        <div className="space-y-0">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
            />
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <Button
            as={NextLink}
            href="/projects"
            color="primary"
            variant="flat"
            radius="full"
            size="lg"
            className="px-8 shadow-lg shadow-primary/20"
            endContent={<FiArrowRight />}
          >
            View All Projects
          </Button>
        </div>
        
        {/* CTA Section */}
        <div className="mt-32">
          <RevealOnScroll>
            <Card className="bg-foreground/5 backdrop-blur-sm border-none shadow-xl">
              <CardBody className="p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-primary/20 blur-[80px] rounded-full z-0"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary/20 blur-[60px] rounded-full z-0"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Interested in working together?</h3>
                  <p className="text-foreground/70 mb-8 mx-auto max-w-xl text-center">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      as={NextLink}
                      href="/contact"
                      size="lg"
                      color="primary"
                      radius="full"
                      className="px-8 shadow-lg shadow-primary/20"
                      endContent={<FiArrowRight />}
                    >
                      Contact Me
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};