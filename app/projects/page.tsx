import React from "react";
import { Metadata } from "next";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects | Johan Beker Portfolio",
  description: "Explore the portfolio of projects created by Johan Beker, showcasing expertise in development and design.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">My Projects</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
          Explore my collection of projects spanning web development, design, and more. Each project represents a unique challenge and solution.
        </p>
        <Projects />
      </div>
    </main>
  );
} 