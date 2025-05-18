import { NextPage } from 'next';

// Define our own PageProps interface without trying to override Next.js type
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}

// Declare the custom parameter types for our dynamic routes
export interface BlogParams {
  slug: string;
}

export interface ProjectParams {
  slug: string;
}

export interface MarketplaceParams {
  slug: string;
} 