"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Progress } from "@heroui/progress";
import { ScrollShadow } from "@heroui/scroll-shadow";
import {
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiMaximize,
  FiGlobe,
  FiSmartphone,
  FiFolder,
  FiInfo,
} from "react-icons/fi";
import Image from "next/image";
import NextLink from "next/link";

import { RevealOnScroll } from "@/components/scroll-animations";
import { projects } from "@/datas/projects";

// Add this array of fallback images at the top of the file
const fallbackImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
  "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

// Premium project card that directs to project detail page
const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
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
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                    {project.title}
                  </h2>
                  <p className="text-foreground/70 text-base md:text-lg mb-6 max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags with premium design */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags &&
                      project.tags.slice(0, 5).map((tag, index) => (
                        <Chip
                          key={index}
                          className="bg-foreground/5 backdrop-blur-sm text-foreground/80"
                          color="default"
                          radius="full"
                          size="sm"
                          variant="flat"
                        >
                          {tag}
                        </Chip>
                      ))}
                    {project.tags && project.tags.length > 5 && (
                      <Tooltip content={project.tags.slice(5).join(", ")}>
                        <Chip
                          className="cursor-help"
                          color="primary"
                          radius="full"
                          size="sm"
                          variant="flat"
                        >
                          +{project.tags.length - 5} more
                        </Chip>
                      </Tooltip>
                    )}
                  </div>

                  {/* Project services */}
                  <ScrollShadow
                    hideScrollBar
                    className="max-w-md mb-8"
                    orientation="horizontal"
                  >
                    <div className="flex gap-6 min-w-max">
                      {project.services &&
                        project.services.map((service, index) => (
                          <Badge
                            key={index}
                            className="bg-transparent text-foreground/60 text-sm uppercase tracking-wider border-none"
                            color="secondary"
                            variant="flat"
                          >
                            {service}
                          </Badge>
                        ))}
                    </div>
                  </ScrollShadow>

                  {/* Technology proficiency */}
                  <div className="mb-8 max-w-md">
                    <div className="flex justify-between items-center mb-1">
                      <small className="text-foreground/60 text-xs">
                        Technologies used
                      </small>
                      <small className="text-foreground/60 text-xs">
                        {project.technologies.length} total
                      </small>
                    </div>
                    <Progress
                      className="w-full"
                      color="primary"
                      radius="full"
                      showValueLabel={false}
                      size="sm"
                      value={100}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button
                      as={Link}
                      className="px-5 shadow-md shadow-primary/20 border-none"
                      color="primary"
                      href={project.link}
                      radius="full"
                      startContent={<FiExternalLink />}
                      target="_blank"
                      variant="flat"
                    >
                      View Live Demo
                    </Button>

                    <Button
                      as={Link}
                      className="px-5 bg-foreground/5 border-none"
                      color="default"
                      href={project.github || "#"}
                      radius="full"
                      startContent={<FiGithub />}
                      target="_blank"
                      variant="flat"
                    >
                      View Code
                    </Button>

                    <Button
                      as={NextLink}
                      className="text-foreground/60 group border-b border-foreground/0 hover:border-foreground/20 px-0 rounded-none"
                      color="default"
                      endContent={
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          <FiArrowRight />
                        </span>
                      }
                      href={`/projects/${project.slug}`}
                      variant="light"
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
              <div className="lg:w-1/2 overflow-hidden">
                <Card className="border-none shadow-none overflow-hidden bg-transparent">
                  <CardBody className="p-0 overflow-hidden">
                    <NextLink href={`/projects/${project.slug}`}>
                      <motion.div 
                        initial={{ opacity: 0, transform: 'translateY(20px)' }}
                        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg"
                      >
                        <Image
                          fill
                          alt={project.title}
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          placeholder="blur"
                          src={project.image}
                          onError={(e) => {
                            // Fallback to a random image from the array
                            const target = e.target as HTMLImageElement;
                            const randomIndex = Math.floor(Math.random() * fallbackImages.length);
                            target.src = fallbackImages[randomIndex];
                            target.onerror = null;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </motion.div>
                    </NextLink>
                  </CardBody>
                  <CardFooter className="p-0 mt-2">
                    <Chip
                      className="bg-foreground/5 text-xs"
                      color="default"
                      radius="sm"
                      size="sm"
                      startContent={<FiInfo size={14} />}
                      variant="flat"
                    >
                      Completed:{" "}
                      {new Date(project.completed).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
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
  const [filterValue, setFilterValue] = useState<string>("all");

  // Filter projects based on the category
  const filteredProjects = projects.filter((project) => {
    if (filterValue === "all") return true;
    return project.category.toLowerCase() === filterValue.toLowerCase();
  });

  // Count projects by category
  const counts = {
    all: projects.length,
    web: projects.filter((p) => p.category.toLowerCase() === "web").length,
    mobile: projects.filter((p) => p.category.toLowerCase() === "mobile").length,
    design: projects.filter((p) => p.category.toLowerCase() === "design").length,
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 [background-size:20px_20px] [background-image:linear-gradient(to_right,rgba(var(--color-foreground),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.05)_1px,transparent_1px)] z-0"
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div
        className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 overflow-x-clip">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge
              color="primary"
              variant="flat"
              className="mb-4 border border-primary/20 glass-premium"
            >
              <span className="px-2 py-0.5 text-primary">Portfolio</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              My Recent Projects
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore my collection of projects spanning web development, mobile
              applications, and UI/UX design.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <Tabs
            aria-label="Project categories"
            className="justify-center mb-16"
            color="primary"
            radius="full"
            selectedKey={filterValue}
            variant="light"
            onSelectionChange={(key) => setFilterValue(key as string)}
          >
            <Tab key="all" title={`All (${counts.all})`} />
            <Tab key="web" title={`Web (${counts.web})`} />
            <Tab key="mobile" title={`Mobile (${counts.mobile})`} />
            <Tab key="design" title={`Design (${counts.design})`} />
          </Tabs>
        </RevealOnScroll>

        <div className="space-y-16 overflow-hidden">
          {filteredProjects.map((project) => (
            <RevealOnScroll key={project.id} direction="bottom" threshold={0.1}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="mt-20 text-center">
            <Button
              as={NextLink}
              className="btn-premium px-8 py-6 rounded-full"
              color="primary"
              href="/projects"
              size="lg"
              variant="flat"
            >
              View All Projects <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
