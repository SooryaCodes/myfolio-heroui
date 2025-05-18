"use client";

import React from "react";
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
    <Link as={NextLink} className="group" href={`/blog/${post.slug}`}>
      <motion.div
        className="card-premium overflow-hidden h-full transform-3d bg-background/80 dark:bg-transparent backdrop-blur-sm border border-border dark:border-primary/10"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: "1000px",
        }}
        whileHover={{ y: -5 }}
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

        <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
          <div className="flex items-center gap-4 text-muted text-sm mb-3">
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
            className={`${featured ? "text-xl lg:text-2xl" : "text-lg"} font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2`}
          >
            {post.title}
          </h3>
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
      className="py-24 md:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-black"
      id="blog"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full z-0" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/3 blur-[100px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge
              className="mb-4 border border-primary/20"
              color="primary"
              variant="flat"
            >
              <span className="px-2 py-0.5 text-primary">Blog</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Latest Articles
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Read my latest thoughts on web development, design trends, and
              technology insights.
            </p>
          </div>
        </RevealOnScroll>

        {/* Featured blog posts - 2 column layout */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl text-foreground font-semibold mb-8">
              Featured Articles
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogCard key={post.id} featured={true} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Regular blog posts - 3 column layout */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl text-foreground font-semibold">
              Recent Articles
            </h3>
            <Link
              as={NextLink}
              className="text-primary flex items-center gap-1 group"
              href="/blog"
            >
              <span>View All</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              as={NextLink}
              className="px-8 font-medium"
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
      </div>
    </section>
  );
};
