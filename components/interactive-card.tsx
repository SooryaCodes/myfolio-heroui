"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { Card } from "@heroui/card";
import { Badge } from "@heroui/badge";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
}

export function ExpandingProjectCard({ project }: { project: ProjectCardProps }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="relative"
      initial={{ borderRadius: 24 }}
      animate={{ 
        zIndex: isExpanded ? 50 : 0,
        transition: { delay: isExpanded ? 0 : 0.3 }
      }}
    >
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative z-10 cursor-pointer ${isExpanded ? 'pointer-events-auto' : 'pointer-events-auto'}`}
        initial={{ borderRadius: 12 }}
        animate={{ 
          borderRadius: 12,
        }}
        transition={{ duration: 0.25 }}
      >
        <Card 
          className={`overflow-hidden transition-shadow h-full flex flex-col ${isExpanded ? 'shadow-2xl' : 'shadow-md hover:shadow-xl'}`}
        >
          <motion.div
            layout="position"
            className="relative"
          >
            <Image
              removeWrapper
              isZoomed={!isExpanded}
              alt={project.title}
              className={`w-full aspect-video object-cover transition-all ${isExpanded ? 'aspect-[21/9]' : 'aspect-video'}`}
              src={project.image}
            />
            <motion.div 
              className="absolute top-3 left-3 right-3 flex justify-between"
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Badge variant="flat" color="primary" size="sm">
                {project.category}
              </Badge>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <FiArrowRight className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            layout="position"
            className="p-6 flex flex-col flex-grow"
          >
            <motion.h3 
              layout="position"
              className="text-xl font-semibold mb-2"
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              layout="position"
              className="text-foreground/70 mb-4 flex-grow"
            >
              {isExpanded && project.longDescription ? project.longDescription : project.description}
            </motion.p>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Divider className="my-4" />
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="list-disc pl-5 mb-4 text-sm text-foreground/70">
                  <li>Responsive design across all devices</li>
                  <li>Modern UI with smooth animations</li>
                  <li>High performance optimizations</li>
                  <li>Semantic HTML and accessibility features</li>
                </ul>
              </motion.div>
            )}
            
            <motion.div 
              layout="position"
              className="flex flex-wrap gap-2 mb-4"
            >
              {project.tags.map((tag) => (
                <Badge key={tag} variant="flat" color="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </motion.div>
            
            <motion.div 
              layout="position"
              className="flex gap-3 mt-auto"
            >
              <Link
                isExternal
                href={project.githubUrl}
                className="flex items-center gap-1 bg-default-100 hover:bg-default-200 px-3 py-1.5 rounded-full text-sm transition-colors"
              >
                <FiGithub className="mr-1" /> Code
              </Link>
              <Link
                isExternal
                href={project.liveUrl}
                className="flex items-center gap-1 bg-primary/90 hover:bg-primary text-white px-3 py-1.5 rounded-full text-sm transition-colors"
              >
                <FiExternalLink className="mr-1" /> Live Demo
              </Link>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </motion.div>
  );
}

export function ProjectCardHoverEffect({ project }: { project: ProjectCardProps }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group cursor-pointer">
        <div className="relative overflow-hidden">
          <Image
            removeWrapper
            alt={project.title}
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
            src={project.image}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-6 transition-opacity duration-300">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="flat" color="primary" className="mb-2">
                {project.category}
              </Badge>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-white/80 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex gap-3">
                <Link
                  isExternal
                  href={project.githubUrl}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-white text-sm transition-colors"
                >
                  <FiGithub size={14} /> Code
                </Link>
                <Link
                  isExternal
                  href={project.liveUrl}
                  className="flex items-center gap-1 bg-primary/90 hover:bg-primary text-white px-3 py-1.5 rounded-full text-sm transition-colors"
                >
                  <FiExternalLink size={14} /> View Project
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-foreground/70 mb-4 flex-grow line-clamp-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="flat" color="default" size="sm">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="flat" color="default" size="sm">
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 