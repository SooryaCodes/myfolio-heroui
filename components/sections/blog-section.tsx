"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiTag,
  FiArrowUpRight,
} from "react-icons/fi";
import Image from "next/image";
import NextLink from "next/link";

import { blogPosts } from "@/datas/blog";
import { RevealOnScroll } from "@/components/scroll-animations";

// Enhanced Blog Card with 3D effect
const BlogCard = ({
  post,
  featured = false,
}: {
  post: any;
  featured?: boolean;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const rotateX = useTransform(y, [-100, 100], isMobile ? [2, -2] : [5, -5]);
  const rotateY = useTransform(x, [-100, 100], isMobile ? [-2, 2] : [-5, 5]);

  const springConfig = { damping: 20, stiffness: isMobile ? 70 : 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
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
    <Link as={NextLink} className="group" href={`/blog/${post.slug}`}>
      <motion.div
        className="card-premium overflow-hidden h-full transform-3d bg-background/80 dark:bg-transparent backdrop-blur-sm border border-border dark:border-primary/10"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: "1000px",
        }}
        whileHover={{ y: isMobile ? -2 : -5 }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[3/2]"}`}
        >
          <Image
            fill
            alt={post.title}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            src={post.image}
            onError={(e) => {
              // Fallback to an external image if the local image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop";
              target.onerror = null; // Prevent infinite error loop
            }}
          />

          {/* Overlay and category badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1.5">
              <FiTag size={12} />
              {post.category}
            </div>
          </div>
        </div>

        <div className={`p-4 md:p-6 ${featured ? "lg:p-8" : ""}`}>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-muted text-xs md:text-sm mb-3">
            <div className="flex items-center gap-1.5">
              <FiCalendar size={14} />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3
            className={`${featured ? "text-lg md:text-xl lg:text-2xl" : "text-base md:text-lg"} font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2`}
          >
            {post.title}
          </h3>
          <p className="text-sm md:text-base text-muted mb-4 md:mb-6 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center gap-2 text-primary">
            <span className="font-medium text-sm md:text-base">Read Article</span>
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const BlogSection = () => {
  // Get only the featured posts for the main section
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Get the regular posts (non-featured) for the secondary section
  const regularPosts = blogPosts
    .filter((post) => !post.featured)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    )
    .slice(0, 3);

  return (
    <section
      className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-black"
      id="blog"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full z-0" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/3 blur-[100px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-10 md:mb-16 lg:mb-24">
            <Badge
              className="mb-4 border border-primary/20"
              color="primary"
              variant="flat"
            >
              <span className="px-2 py-0.5 text-primary">Blog</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              Latest Articles
            </h2>
            <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">
              Read my latest thoughts on web development, design trends, and
              technology insights.
            </p>
          </div>
        </RevealOnScroll>

        {/* Featured blog posts - 2 column layout */}
        {featuredPosts.length > 0 && (
          <RevealOnScroll direction="bottom" delay={0.1}>
            <div className="mb-10 md:mb-16">
              <h3 className="text-xl md:text-2xl text-foreground font-semibold mb-5 md:mb-8">
                Featured Articles
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <RevealOnScroll key={post.id} direction="bottom" delay={0.1 * (index + 1)}>
                    <BlogCard featured={true} post={post} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Regular blog posts - 3 column layout */}
        <RevealOnScroll direction="bottom" delay={0.3}>
          <div>
            <div className="flex justify-between items-center mb-5 md:mb-8">
              <h3 className="text-lg md:text-xl text-foreground font-semibold">
                Recent Articles
              </h3>
              <Link
                as={NextLink}
                className="text-primary flex items-center gap-1 group text-sm md:text-base"
                href="/blog"
              >
                <span>View All</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {regularPosts.map((post, index) => (
                <RevealOnScroll key={post.id} direction="bottom" delay={0.1 * (index + 1)}>
                  <BlogCard post={post} />
                </RevealOnScroll>
              ))}
            </div>

            <div className="text-center mt-8 md:mt-12">
              <Button
                as={NextLink}
                className="px-6 md:px-8 font-medium text-sm md:text-base"
                color="primary"
                endContent={<FiArrowUpRight />}
                href="/blog"
                radius="full"
                size="lg"
                variant="flat"
              >
                Browse All Articles
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
