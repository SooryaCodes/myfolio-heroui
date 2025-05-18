import { NextPage } from 'next';

// Override the Next.js PageProps type to work with dynamic route parameters
declare module 'next' {
  export interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
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