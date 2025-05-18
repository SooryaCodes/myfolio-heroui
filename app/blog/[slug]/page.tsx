import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Avatar } from "@heroui/avatar";
import { Code } from "@heroui/code";
import { Snippet } from "@heroui/snippet";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiTag,
  FiHome,
  FiShare2,
} from "react-icons/fi";

import { blogPosts } from "@/datas/blog";
import { BlogParams } from "@/types";

// Fallback images for broken images
const fallbackImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .sort(() => Math.random() - 0.5) // Shuffle array to get random related posts
    .slice(0, 2); // Take just 2 related posts

  // Function to convert HTML content with custom handling for code blocks
  const processContent = (content: string) => {
    // Replace standard HTML code blocks with Snippet component
    const processedContent = content.replace(
      /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
      (match, codeContent) => {
        // The code content is captured in the first group
        return `<div class="snippet-container" data-code="${encodeURIComponent(codeContent.trim())}"></div>`;
      }
    );
    
    return processedContent;
  };

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-background/50">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap gap-3 items-center">
          <Button
            as={Link}
            color="primary"
            href="/"
            size="sm"
            startContent={<FiHome />}
            variant="light"
          >
            Home
          </Button>
          <span className="text-foreground/30">•</span>
          <Button
            as={Link}
            color="primary"
            href="/blog"
            size="sm"
            startContent={<FiArrowLeft />}
            variant="light"
          >
            Back to Blog
          </Button>
        </div>

        {/* Featured image - full width */}
        <div className="w-full mb-12">
          <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              fill
              priority
              alt={post.title}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              className="object-cover"
              placeholder="blur"
              src={post.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Article header */}
          <div className="mb-10">
            <Badge className="mb-4" color="primary" variant="flat">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 items-center mb-6">
              <div className="flex items-center gap-3">
                <Avatar
                  alt={post.author.name}
                  size="md"
                  src={post.author.image}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {post.author.name}
                  </p>
                  <div className="text-sm text-foreground/60">
                    {post.author.bio}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 md:ml-auto">
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
            </div>

            <Divider className="my-6" />
          </div>

          {/* Article content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <Card className="border-none shadow-lg bg-card/75 backdrop-blur-sm">
                <CardBody className="px-5 md:px-12 py-12">
                  <div
                    dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground/80 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-foreground"
                  />
                  
                  {/* Client component for rendering code snippets */}
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        document.addEventListener('DOMContentLoaded', function() {
                          const containers = document.querySelectorAll('.snippet-container');
                          containers.forEach(container => {
                            const code = decodeURIComponent(container.getAttribute('data-code'));
                            const language = code.includes('import ') || code.includes('export ') ? 'jsx' : 
                                          code.includes('.css') ? 'css' : 
                                          code.includes('<') && code.includes('>') ? 'html' : 'javascript';
                            
                            const snippet = document.createElement('div');
                            snippet.className = 'my-6';
                            snippet.innerHTML = \`
                              <div class="rounded-lg overflow-hidden bg-black/80 dark:bg-white/10">
                                <div class="px-4 py-2 bg-black/90 dark:bg-white/5 text-white/70 text-xs font-mono flex items-center justify-between">
                                  <span>\${language}</span>
                                  <button class="text-white/50 hover:text-white/90 transition-colors" onclick="navigator.clipboard.writeText(this.parentNode.nextSibling.textContent)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                  </button>
                                </div>
                                <pre class="p-4 overflow-x-auto text-sm font-mono text-white/90 dark:text-white/90">\${code}</pre>
                              </div>
                            \`;
                            container.replaceWith(snippet);
                          });
                        });
                      `,
                    }}
                  />
                </CardBody>
              </Card>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    className="bg-foreground/5"
                    color="default"
                    size="sm"
                    startContent={<FiTag size={14} />}
                    variant="flat"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>

              {/* Share Article */}
              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <span className="text-foreground/70">Share this article:</span>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    aria-label="Share on Twitter"
                    color="default"
                    radius="full"
                    size="sm"
                    variant="flat"
                  >
                    <FiShare2 />
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              {/* Author Card */}
              <Card className="shadow-sm mb-8 bg-foreground/5 backdrop-blur-sm border-none sticky top-24">
                <CardBody className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar
                      alt={post.author.name}
                      className="mb-3"
                      size="lg"
                      src={post.author.image}
                    />
                    <h3 className="text-xl font-bold text-foreground">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {post.author.bio.split(" ").slice(0, 2).join(" ")}{" "}
                      {/* Use the first two words of the bio */}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">
                    {post.author.bio}
                  </p>
                  <Button
                    fullWidth
                    as={Link}
                    color="primary"
                    href={`/blog?author=${post.author.name}`}
                    radius="full"
                    size="sm"
                    variant="flat"
                  >
                    View All Posts
                  </Button>
                </CardBody>
              </Card>

              {/* Related posts vertical list */}
              {relatedPosts.length > 0 && (
                <Card className="shadow-sm bg-foreground/5 backdrop-blur-sm border-none sticky top-72">
                  <CardBody className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      Related Articles
                    </h3>
                    <div className="space-y-6">
                      {relatedPosts.map((relatedPost) => (
                        <div
                          key={relatedPost.id}
                          className="flex flex-col gap-2"
                        >
                          <Link
                            className="relative aspect-video w-full overflow-hidden rounded-lg block mb-2"
                            href={`/blog/${relatedPost.slug}`}
                          >
                            <Image
                              fill
                              alt={relatedPost.title}
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              placeholder="blur"
                              src={relatedPost.image}
                            />
                          </Link>
                          <Badge
                            className="self-start"
                            color="primary"
                            variant="flat"
                          >
                            {relatedPost.category}
                          </Badge>
                          <Link
                            className="font-bold hover:text-primary transition-colors line-clamp-2 text-foreground"
                            href={`/blog/${relatedPost.slug}`}
                          >
                            {relatedPost.title}
                          </Link>
                          <div className="text-xs text-foreground/60">
                            {relatedPost.publishDate} · {relatedPost.readTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Back to all articles button */}
        <div className="max-w-6xl mx-auto mt-16 text-center">
          <Button
            as={Link}
            className="px-8 shadow-md"
            color="primary"
            href="/blog"
            radius="full"
            size="lg"
            startContent={<FiArrowLeft />}
            variant="flat"
          >
            Back to All Articles
          </Button>
        </div>
      </div>
    </main>
  );
}
