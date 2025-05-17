import React from "react";
import { Metadata } from "next";
import { Marketplace } from "@/components/sections/marketplace";

export const metadata: Metadata = {
  title: "Marketplace | Johan Beker Portfolio",
  description: "Browse digital products and resources created by Johan Beker, including templates, tools, and assets for developers and designers.",
};

export default function MarketplacePage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Digital Marketplace</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
          Browse and purchase digital products, templates, and resources to help you in your development and design projects.
        </p>
        <Marketplace />
      </div>
    </main>
  );
} 