"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { RevealOnScroll } from "@/components/scroll-animations";
import { Link } from "@heroui/link";
import { FiArrowRight, FiCalendar, FiClock, FiTag, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  url: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Evolution of Modern Web Design Trends",
    excerpt: "Exploring the shift from minimalism to expressive design and what this means for creating engaging digital experiences in 2023.",
    date: "May 12, 2023",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    url: "/blog/web-design-trends",
    featured: true,
  },
  {
    id: 2,
    title: "Building Performant React Applications",
    excerpt: "A deep dive into optimization techniques for React applications, from code splitting to memorization patterns.",
    date: "April 28, 2023",
    readTime: "12 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
    url: "/blog/react-performance",
    featured: true,
  },
  {
    id: 3,
    title: "Designing for Accessibility: Beyond the Basics",
    excerpt: "Going beyond WCAG compliance to create truly inclusive digital experiences that everyone can use and enjoy.",
    date: "March 15, 2023",
    readTime: "10 min read",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    url: "/blog/accessibility-design",
  },
  {
    id: 4,
    title: "The Power of Design Systems in Modern Web Development",
    excerpt: "How thoughtfully constructed design systems can streamline development, improve consistency, and enhance collaboration.",
    date: "February 22, 2023",
    readTime: "7 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    url: "/blog/design-systems",
  },
  {
    id: 5,
    title: "Using Framer Motion for Advanced Animations",
    excerpt: "A comprehensive guide to creating stunning animations and interactions with Framer Motion in React applications.",
    date: "January 30, 2023",
    readTime: "9 min read",
    category: "Animation",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    url: "/blog/framer-motion",
  },
  {
    id: 6,
    title: "The Future of Web Development: What to Expect in 2023",
    excerpt: "Exploring emerging technologies and methodologies that will shape the web development landscape in the coming year.",
    date: "December 12, 2022",
    readTime: "11 min read",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    url: "/blog/future-web-development",
  },
];

// Enhanced Blog Card with 3D effect
const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <Link 
      href={post.url}
      className="group"
    >
      <motion.div 
        className="card-premium overflow-hidden h-full transform-3d"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: "1000px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5 }}
      >
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay and category badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1.5">
              <FiTag size={12} />
              {post.category}
            </div>
          </div>
        </div>
        
        <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
          <div className="flex items-center gap-4 text-muted text-sm mb-3">
            <div className="flex items-center gap-1.5">
              <FiCalendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <h3 className={`${featured ? 'text-xl lg:text-2xl' : 'text-lg'} font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2`}>{post.title}</h3>
          <p className="text-muted mb-6 line-clamp-2">{post.excerpt}</p>
          
          <div className="flex items-center gap-2 text-primary">
            <span className="font-medium">Read Article</span>
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const Blogs = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  return (
    <section id="blog" className="py-24 md:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-background to-black">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full z-0" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/3 blur-[100px] rounded-full z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4"
            >
              Insights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">From the Blog</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Thoughts, insights, and perspectives on design, development, and digital experiences.
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Featured blog posts - 2 column layout */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl text-foreground font-semibold mb-8">Featured Articles</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}
        
        {/* Regular blog posts - 3 column layout */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl text-foreground font-semibold">Latest Articles</h3>
            <Link href="/blog" className="text-primary flex items-center gap-1 group">
              <span>View All</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              as={Link} 
              href="/blog"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              endContent={<FiArrowUpRight />}
              className="px-8 font-medium"
            >
              Browse All Articles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 