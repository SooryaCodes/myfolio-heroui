"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Tabs, Tab } from "@heroui/tabs";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { Tooltip } from "@heroui/tooltip";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiSearch,
  FiTag,
  FiHome,
} from "react-icons/fi";

import { blogPosts } from "@/datas/blog";

// Fallback images for broken blog images
const fallbackImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const postsPerPage = 6; // Display more posts per page

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(
      new Set(blogPosts.map((post) => post.category.toLowerCase())),
    ),
  ];

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Helper function for fallback images
  const getFallbackImage = (id: number) => {
    return fallbackImages[id % fallbackImages.length];
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-background/50">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        {/* Back to Home */}
        <div className="mb-8">
          <Button
            as={Link}
            color="primary"
            href="/"
            size="sm"
            startContent={<FiHome />}
            variant="light"
          >
            Back to Home
          </Button>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <Badge className="mb-4" color="primary" variant="flat">
            <span className="px-2 py-0.5">Blog</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground">
            Insights & Articles
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Explore my thoughts on web development, design, and technology.
            Discover tips, tutorials, and insights to enhance your development
            skills.
          </p>
          <div className="max-w-xl mx-auto">
            <Input
              classNames={{
                inputWrapper: "bg-foreground/5 border-none shadow-md",
              }}
              placeholder="Search articles..."
              radius="full"
              size="lg"
              startContent={<FiSearch className="text-default-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-foreground">
                Featured Posts
              </h2>
              <Button
                as={Link}
                className="text-base"
                color="primary"
                endContent={<FiArrowRight />}
                href="#all-posts"
                variant="light"
              >
                View all posts
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card
                  key={post.id}
                  className="shadow-lg hover:shadow-xl transition-shadow border-none overflow-hidden bg-card/75 backdrop-blur-sm"
                >
                  <CardHeader className="p-0">
                    <div className="relative w-full h-72 md:h-80">
                      <Image
                        fill
                        alt={post.title}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        className="object-cover"
                        placeholder="blur"
                        src={post.image}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;

                          target.src = getFallbackImage(post.id);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-8 w-full">
                          <Badge
                            className="mb-3"
                            color="primary"
                            variant="flat"
                          >
                            {post.category}
                          </Badge>
                          <h3 className="text-white text-2xl md:text-3xl font-bold">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="p-8">
                    <p className="text-foreground/70 mb-6 text-base leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
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
                  <CardFooter className="px-8 pb-8 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar
                        alt={post.author.name}
                        size="sm"
                        src={post.author.image}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {post.author.name}
                      </span>
                    </div>
                    <Button
                      as={Link}
                      className="px-5"
                      color="primary"
                      endContent={<FiArrowRight />}
                      href={`/blog/${post.slug}`}
                      radius="full"
                      size="md"
                      variant="flat"
                    >
                      Read Post
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs and Blog Posts */}
        <div className="scroll-mt-24 max-w-screen-2xl mx-auto" id="all-posts">
          <div className="mb-12">
            <Card className="shadow-sm border-none bg-foreground/5 backdrop-blur-sm">
              <CardBody className="p-2">
                <Tabs
                  aria-label="Blog Categories"
                  classNames={{
                    tabList: "gap-8 px-4",
                    cursor: "bg-primary",
                    tab: "max-w-fit px-0 h-12 text-base",
                  }}
                  color="primary"
                  selectedKey={selectedCategory}
                  variant="underlined"
                  onSelectionChange={(key) => {
                    setSelectedCategory(key.toString());
                    setCurrentPage(1);
                  }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      title={
                        <span className="capitalize text-foreground">
                          {category}
                        </span>
                      }
                    />
                  ))}
                </Tabs>
              </CardBody>
            </Card>
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentPosts.map((post) => (
              <Card
                key={post.id}
                className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-none bg-card/75 backdrop-blur-sm"
              >
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
                      className="hover:text-primary transition-colors"
                      href={`/blog/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-foreground/70 text-base mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Tooltip key={index} content={`Posts tagged with ${tag}`}>
                        <Chip
                          className="bg-foreground/5 cursor-help"
                          color="default"
                          size="sm"
                          startContent={<FiTag size={12} />}
                          variant="flat"
                        >
                          {tag}
                        </Chip>
                      </Tooltip>
                    ))}
                    {post.tags.length > 3 && (
                      <Tooltip content={post.tags.slice(3).join(", ")}>
                        <Chip
                          className="bg-foreground/5 cursor-help"
                          color="default"
                          size="sm"
                          variant="flat"
                        >
                          +{post.tags.length - 3}
                        </Chip>
                      </Tooltip>
                    )}
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between items-center p-6">
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
                    as={Link}
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
            ))}
          </div>

          {/* Empty State */}
          {currentPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                No posts found
              </h3>
              <p className="text-foreground/70 mb-8">
                No posts matching your search criteria were found.
              </p>
              <Button
                color="primary"
                variant="flat"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16 mb-12">
              <Pagination
                showControls
                classNames={{
                  wrapper: "gap-2 overflow-visible",
                  item: "bg-transparent",
                }}
                color="primary"
                initialPage={1}
                page={currentPage}
                size="lg"
                total={totalPages}
                variant="flat"
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="mt-24">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-xl">
            <CardBody className="p-10 md:p-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Subscribe to My Newsletter
                </h2>
                <p className="text-foreground/70 mb-10 text-lg">
                  Get the latest articles, tutorials, and updates delivered
                  straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <Input
                    classNames={{
                      inputWrapper: "bg-background shadow-md",
                    }}
                    placeholder="Enter your email address"
                    radius="full"
                    size="lg"
                    type="email"
                  />
                  <Button
                    className="px-8 shadow-md shadow-primary/20"
                    color="primary"
                    radius="full"
                    size="lg"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
