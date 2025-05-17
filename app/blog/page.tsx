import React from "react";
import { Metadata } from "next";
import { Blogs } from "@/components/sections/blogs";

export const metadata: Metadata = {
  title: "Blog | Johan Beker Portfolio",
  description: "Read articles and insights from Johan Beker on web development, design, and technology trends.",
};

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">My Blog</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
          Thoughts, insights, and tutorials on web development, design, and technology.
        </p>
        <Blogs />
      </div>
    </main>
  );
}
