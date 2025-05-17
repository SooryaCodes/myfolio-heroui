import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FiExternalLink, FiGithub, FiArrowLeft, FiHome } from "react-icons/fi";
import { projects } from "@/datas/projects";

// Add fallback images with high-quality Unsplash images
const fallbackImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find(project => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Find related projects
  const relatedProjects = projects
    .filter(p => p.id !== project.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // Get a fallback image based on the project ID
  const getFallbackImage = (index = 0) => {
    return fallbackImages[(project.id + index) % fallbackImages.length];
  };

  return (
    <main className="pt-20 pb-16 bg-background/50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap gap-3 items-center">
          <Link 
            href="/"
            className="text-primary hover:underline flex items-center gap-1"
          >
            <FiHome size={16} />
            <span>Home</span>
          </Link>
          <span className="text-foreground/30">•</span>
          <Link 
            href="/projects"
            className="text-primary hover:underline flex items-center gap-1"
          >
            <FiArrowLeft size={16} />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="text-primary inline-block mb-2 px-3 py-1 rounded-full text-sm bg-primary/10">{project.category}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">{project.title}</h1>
            <p className="text-foreground/70 text-lg md:text-xl max-w-4xl">
              {project.description}
            </p>
          </div>

          {/* Showcase Image */}
          <div className="relative aspect-[16/9] w-full max-h-[70vh] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={project.image || getFallbackImage()}
              alt={project.title}
              fill
              priority
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              onError={(e) => {
                // This will run on client-side only
                const target = e.target as HTMLImageElement;
                target.src = getFallbackImage();
              }}
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Project Description</h2>
            <div className="text-foreground/80 space-y-4 mb-12">
              <p>{project.fullDescription}</p>
            </div>

            {/* Project Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={image || getFallbackImage(index + 1)}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        onError={(e) => {
                          // This will run on client-side only
                          const target = e.target as HTMLImageElement;
                          target.src = getFallbackImage(index + 1);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-foreground/5 backdrop-blur-sm rounded-xl p-6 shadow-md sticky top-24 border border-foreground/5">
              <h3 className="text-xl font-bold mb-6 text-foreground">Project Details</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-foreground/60 text-sm">Project Type</h4>
                  <p className="font-medium text-foreground">{project.category}</p>
                </div>
                <div>
                  <h4 className="text-foreground/60 text-sm">Client</h4>
                  <p className="font-medium text-foreground">{project.client}</p>
                </div>
                <div>
                  <h4 className="text-foreground/60 text-sm">Completed</h4>
                  <p className="font-medium text-foreground">{new Date(project.completed).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}</p>
                </div>
                {project.location && (
                  <div>
                    <h4 className="text-foreground/60 text-sm">Location</h4>
                    <p className="font-medium text-foreground">{project.location}</p>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-transform hover:translate-y-[-2px] shadow-md"
                  >
                    <FiExternalLink />
                    View Live Project
                  </a>
                )}
                
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-foreground/10 text-foreground px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all hover:bg-foreground/15"
                  >
                    <FiGithub />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-10 text-foreground">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {relatedProjects.map((related) => (
                <div key={related.id} className="group">
                  <Link href={`/projects/${related.slug}`} className="block">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 shadow-lg">
                      <Image
                        src={related.image || getFallbackImage(related.id)}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        onError={(e) => {
                          // This will run on client-side only
                          const target = e.target as HTMLImageElement;
                          target.src = getFallbackImage(related.id);
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium bg-primary/80 backdrop-blur-sm rounded-lg px-4 py-2">
                          View Project
                        </span>
                      </div>
                    </div>
                    <span className="text-primary text-sm">{related.category}</span>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">{related.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to projects button */}
        <div className="mt-20 text-center">
          <Link 
            href="/projects"
            className="bg-primary/10 text-primary px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all hover:bg-primary/20"
          >
            <FiArrowLeft />
            Back to All Projects
          </Link>
        </div>
      </div>
    </main>
  );
} 