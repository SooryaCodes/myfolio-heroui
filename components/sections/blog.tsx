"use client";

import React from "react";
import { Badge } from "@heroui/badge";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Link } from "@heroui/link";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import Image from "next/image";
import NextLink from "next/link";

import { RevealOnScroll } from "@/components/scroll-animations";
import { blogPosts } from "@/datas/blog";

// Fallback images for broken blog images
const fallbackImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

export const Blog = () => {
  // Get only the featured or most recent blog posts
  const recentPosts = blogPosts
    .filter((post) => post.featured)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    )
    .slice(0, 3);

  // If we don't have enough featured posts, add the most recent ones
  const displayPosts =
    recentPosts.length < 3
      ? [
          ...recentPosts,
          ...blogPosts
            .filter((post) => !post.featured)
            .sort(
              (a, b) =>
                new Date(b.publishDate).getTime() -
                new Date(a.publishDate).getTime(),
            )
            .slice(0, 3 - recentPosts.length),
        ]
      : recentPosts;

  // Helper function for fallback images
  const getFallbackImage = (id: number) => {
    return fallbackImages[id % fallbackImages.length];
  };

  return (
    <section
      className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
      id="blog"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full opacity-30 z-0" />
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/4 bg-secondary/10 blur-[100px] rounded-full opacity-30 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-primary/10 border-none"
              color="primary"
              variant="flat"
            >
              <span className="px-2 py-0.5 text-primary">Blog</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Latest Articles
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Read my latest thoughts on web development, design trends, and
              technology insights.
            </p>
          </div>
        </RevealOnScroll>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <RevealOnScroll key={post.id} delay={post.id * 0.1}>
              <Card className="shadow-md hover:shadow-xl transition-shadow border-none overflow-hidden bg-card/75 backdrop-blur-sm">
                <CardHeader className="p-0">
                  <div className="relative aspect-video w-full">
                    <Image
                      fill
                      alt={post.title}
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      placeholder="blur"
                      src={post.image}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;

                        target.src = getFallbackImage(post.id);
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge color="primary" variant="flat">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    <Link
                      as={NextLink}
                      className="hover:text-primary transition-colors"
                      href={`/blog/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-foreground/70 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <Chip
                      className="bg-foreground/5"
                      color="default"
                      size="sm"
                      startContent={<FiCalendar size={14} />}
                      variant="flat"
                    >
                      {post.publishDate}
                    </Chip>
                    <Chip
                      className="bg-foreground/5"
                      color="default"
                      size="sm"
                      startContent={<FiClock size={14} />}
                      variant="flat"
                    >
                      {post.readTime}
                    </Chip>
                  </div>
                </CardBody>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar
                      alt={post.author.name}
                      size="sm"
                      src={post.author.image}
                    />
                    <span className="text-sm text-foreground">
                      {post.author.name}
                    </span>
                  </div>
                  <Button
                    as={NextLink}
                    color="primary"
                    endContent={<FiArrowRight />}
                    href={`/blog/${post.slug}`}
                    radius="full"
                    size="sm"
                    variant="flat"
                  >
                    Read
                  </Button>
                </CardFooter>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Button
            as={NextLink}
            className="px-8 shadow-md shadow-primary/20"
            color="primary"
            endContent={<FiArrowRight />}
            href="/blog"
            radius="full"
            size="lg"
            variant="flat"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};
