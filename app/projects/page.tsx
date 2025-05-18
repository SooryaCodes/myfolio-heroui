"use client";

import React, { useState } from 'react';
import { projects } from '@/datas/projects';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Badge } from '@heroui/badge';
import { Chip } from '@heroui/chip';
import { Tabs, Tab } from '@heroui/tabs';
import { FiArrowRight, FiHome, FiGrid, FiGlobe, FiSmartphone, FiFolder } from 'react-icons/fi';

// High-quality fallback images from Unsplash
const fallbackImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Create a list of unique categories from project data
  const categoriesSet = new Set<string>(projects.map(project => project.category.toLowerCase()));
  const categories = ["all", ...Array.from(categoriesSet)];
  
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === selectedCategory);
    
  // Helper function to get a fallback image
  const getFallbackImage = (projectId: number, index: number = 0) => {
    return fallbackImages[(projectId + index) % fallbackImages.length];
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-background/50">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        {/* Back to Home */}
        <div className="mb-8">
          <Button
            as={Link}
            href="/"
            variant="light"
            color="primary"
            size="sm"
            startContent={<FiHome />}
          >
            Back to Home
          </Button>
        </div>
        
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <Badge color="primary" variant="flat" className="mb-4">
            <span className="px-2 py-0.5">Projects</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground">My Portfolio</h1>
          <p className="text-foreground/70 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Explore my recent projects and case studies. From web applications to mobile apps,
            these projects demonstrate my technical skills and problem-solving approach.
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-12">
          <Card className="bg-foreground/5 backdrop-blur-sm shadow-sm border-none w-max mx-auto">
            <CardBody className="p-1">
              <Tabs 
                aria-label="Project Categories"
                color="primary"
                variant="light"
                radius="full"
                classNames={{
                  tabList: "bg-transparent p-1",
                  cursor: "bg-primary/20",
                  tab: "text-foreground/60 data-[selected=true]:text-primary text-sm",
                  panel: "p-0",
                }}
                selectedKey={selectedCategory}
                onSelectionChange={(key) => setSelectedCategory(key.toString())}
              >
                {categories.map((category) => (
                  <Tab 
                    key={category} 
                    title={
                      <div className="flex items-center gap-2">
                        {category === "all" ? (
                          <FiGrid className="text-xs" />
                        ) : category === "web development" ? (
                          <FiGlobe className="text-xs" />
                        ) : category === "mobile development" ? (
                          <FiSmartphone className="text-xs" />
                        ) : (
                          <FiFolder className="text-xs" />
                        )}
                        <span className="capitalize text-foreground">{category}</span>
                      </div>
                    }
                  />
                ))}
              </Tabs>
            </CardBody>
          </Card>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="shadow-sm hover:shadow-lg transition-shadow border border-foreground/5">
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzg0IiBoZWlnaHQ9IjQ0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                  />
                  <div className="absolute top-3 left-3">
                    <Badge color="primary" variant="flat">
                      {project.category}
                    </Badge>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge color="success" variant="flat">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      color="default"
                      size="sm"
                      className="bg-foreground/5"
                    >
                      {tech}
                    </Chip>
                  ))}
                  {project.technologies.length > 3 && (
                    <Chip
                      variant="flat"
                      color="default"
                      size="sm"
                    >
                      +{project.technologies.length - 3}
                    </Chip>
                  )}
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  as={Link}
                  href={`/projects/${project.slug}`}
                  color="primary"
                  variant="flat"
                  radius="full"
                  endContent={<FiArrowRight />}
                  fullWidth
                >
                  View Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-4 text-foreground">No projects found</h3>
            <p className="text-foreground/70 mb-8">No projects matching your selected category were found.</p>
            <Button
              color="primary"
              variant="flat"
              onClick={() => setSelectedCategory('all')}
            >
              View All Projects
            </Button>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="mt-24">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-xl">
            <CardBody className="p-10 md:p-16">
              <div className="text-center max-w-3xl mx-auto">
                <Badge color="primary" variant="flat" className="mb-4">
                  <span className="px-2 py-0.5">Let&apos;s Collaborate</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Have a Project in Mind?</h2>
                <p className="text-foreground/70 mb-10 text-lg">
                  I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                <Button
                  as={Link}
                  href="/contact"
                  color="primary"
                  radius="full"
                  size="lg"
                  className="px-8 shadow-md shadow-primary/20"
                  endContent={<FiArrowRight />}
                >
                  Contact Me
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
} 