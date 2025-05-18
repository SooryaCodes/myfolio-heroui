// Define our own PageProps interface for Next.js App Router
export interface PageProps {
  params?: any;
  searchParams?: { [key: string]: string | string[] | undefined };
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
