import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Mock project data - in a real app, this would come from a database or API
const projects = [
  {
    id: 1,
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description: "A modern portfolio website built with Next.js and Tailwind CSS.",
    fullDescription: "This modern portfolio website showcases my work and skills in web development. Built with Next.js for server-side rendering and Tailwind CSS for styling, it features smooth animations, responsive design, and optimized performance. The site includes project showcases, a blog section, and contact information.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image: "/images/projects/portfolio.jpg",
    images: [
      "/images/projects/portfolio-1.jpg",
      "/images/projects/portfolio-2.jpg",
      "/images/projects/portfolio-3.jpg",
    ],
    link: "https://example.com",
    github: "https://github.com/username/portfolio",
    completed: "2023-09-15",
    client: "Personal Project"
  },
  {
    id: 2,
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured e-commerce platform with payment integration.",
    fullDescription: "A comprehensive e-commerce solution built for a fashion retailer. This platform includes product listings, search functionality, user accounts, shopping cart, and secure checkout with Stripe integration. The admin panel allows for easy product and order management.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "/images/projects/ecommerce.jpg",
    images: [
      "/images/projects/ecommerce-1.jpg",
      "/images/projects/ecommerce-2.jpg",
      "/images/projects/ecommerce-3.jpg",
    ],
    link: "https://shop-example.com",
    github: "https://github.com/username/ecommerce",
    completed: "2023-07-22",
    client: "Fashion Retailer Ltd."
  },
  {
    id: 3,
    slug: "mobile-fitness-app",
    title: "Mobile Fitness App",
    category: "Mobile Development",
    description: "A fitness tracking mobile application built with React Native.",
    fullDescription: "This fitness tracking app helps users monitor their workouts, set goals, and track progress over time. Built with React Native for cross-platform compatibility, it features workout plans, exercise demonstrations, progress charts, and social sharing capabilities.",
    technologies: ["React Native", "Firebase", "Redux", "Native APIs"],
    image: "/images/projects/fitness-app.jpg",
    images: [
      "/images/projects/fitness-app-1.jpg",
      "/images/projects/fitness-app-2.jpg",
      "/images/projects/fitness-app-3.jpg",
    ],
    link: "https://play.google.com/store/apps/example",
    github: "https://github.com/username/fitness-app",
    completed: "2023-05-10",
    client: "Healthy Living Co."
  }
];

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    };
  }
  
  return {
    title: `${project.title} | Johan Beker Portfolio`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/projects" 
              className="text-primary hover:underline mb-4 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mt-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {project.category}
              </span>
              <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                {new Date(project.completed).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </span>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {project.fullDescription}
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-10">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((img, index) => (
                  <div key={index} className="relative h-60 rounded-lg overflow-hidden">
                    <Image 
                      src={img} 
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">Client</h4>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">Completed</h4>
                    <p className="font-medium">{new Date(project.completed).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-primary/90 transition-colors"
                    >
                      View Live Project
                    </a>
                    
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full mt-3 bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:opacity-90 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 