import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Mock marketplace products data - in a real app, this would come from a database or API
const marketplaceProducts = [
  {
    id: 1,
    slug: "modern-dashboard-template",
    title: "Modern Dashboard Template",
    category: "UI Template",
    price: 49,
    description: "A clean and modern dashboard template built with React and Tailwind CSS.",
    fullDescription: `
      <p>Take your admin dashboard to the next level with this premium UI template built with React and Tailwind CSS. Perfect for SaaS applications, admin panels, and data-heavy applications.</p>
      
      <p>This template includes 20+ pre-built components, 10 page templates, and a fully responsive design that works perfectly on all devices.</p>
      
      <h2>Features</h2>
      <ul>
        <li>20+ React components including charts, tables, and forms</li>
        <li>10 pre-built page templates</li>
        <li>Dark and light mode support</li>
        <li>Fully responsive design</li>
        <li>Well-organized and documented code</li>
        <li>Easy customization with Tailwind CSS</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>React source code</li>
        <li>Design files (Figma)</li>
        <li>Documentation</li>
        <li>6 months of updates</li>
        <li>Email support</li>
      </ul>
    `,
    features: [
      "20+ React components",
      "10 page templates",
      "Dark/light mode",
      "Responsive design",
      "Documentation",
      "6 months updates"
    ],
    image: "/images/marketplace/dashboard.jpg",
    images: [
      "/images/marketplace/dashboard-1.jpg",
      "/images/marketplace/dashboard-2.jpg",
      "/images/marketplace/dashboard-3.jpg",
    ],
    demo: "https://example.com/demo/dashboard",
    publishDate: "2023-11-20",
    tags: ["React", "Tailwind CSS", "Dashboard", "Admin Panel"]
  },
  {
    id: 2,
    slug: "e-commerce-starter-kit",
    title: "E-Commerce Starter Kit",
    category: "Full Stack Template",
    price: 79,
    description: "Complete e-commerce solution with React, Next.js, and Stripe integration.",
    fullDescription: `
      <p>Launch your online store quickly with this complete e-commerce starter kit. Built with Next.js, React, and integrated with Stripe for payments, this template provides everything you need to start selling online.</p>
      
      <p>This kit includes both the frontend customer-facing store and an admin dashboard for managing products, orders, and customers.</p>
      
      <h2>Features</h2>
      <ul>
        <li>Complete e-commerce storefront</li>
        <li>Admin dashboard for product and order management</li>
        <li>Stripe payment integration</li>
        <li>User authentication</li>
        <li>Shopping cart functionality</li>
        <li>Product search and filtering</li>
        <li>Responsive design for all devices</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>Next.js source code (frontend and backend)</li>
        <li>Database schema</li>
        <li>Deployment instructions</li>
        <li>Integration guide for Stripe</li>
        <li>1 year of updates</li>
        <li>Priority email support</li>
      </ul>
    `,
    features: [
      "Complete storefront",
      "Admin dashboard",
      "Stripe integration",
      "User authentication",
      "Shopping cart",
      "Product search",
      "1 year updates"
    ],
    image: "/images/marketplace/ecommerce.jpg",
    images: [
      "/images/marketplace/ecommerce-1.jpg",
      "/images/marketplace/ecommerce-2.jpg",
      "/images/marketplace/ecommerce-3.jpg",
    ],
    demo: "https://example.com/demo/ecommerce",
    publishDate: "2023-10-15",
    tags: ["Next.js", "E-commerce", "Stripe", "Full Stack"]
  },
  {
    id: 3,
    slug: "premium-ui-component-library",
    title: "Premium UI Component Library",
    category: "UI Components",
    price: 59,
    description: "A comprehensive library of 50+ premium UI components for React applications.",
    fullDescription: `
      <p>Accelerate your development process with this premium library of 50+ beautifully crafted UI components for React applications. Each component is designed with attention to detail, accessibility, and performance.</p>
      
      <p>Perfect for developers who want to create beautiful applications without starting from scratch, this library provides all the essential building blocks for modern web interfaces.</p>
      
      <h2>Features</h2>
      <ul>
        <li>50+ React components</li>
        <li>Fully customizable with CSS variables</li>
        <li>Accessibility built-in (WCAG 2.1 compliant)</li>
        <li>Responsive and mobile-friendly</li>
        <li>Tree-shakable for optimal bundle size</li>
        <li>TypeScript support</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>React component library</li>
        <li>TypeScript definitions</li>
        <li>Storybook documentation</li>
        <li>Usage examples</li>
        <li>1 year of updates</li>
        <li>Support via GitHub issues</li>
      </ul>
    `,
    features: [
      "50+ React components",
      "Customizable with CSS variables",
      "Accessibility compliant",
      "Mobile-friendly",
      "TypeScript support",
      "Storybook documentation"
    ],
    image: "/images/marketplace/ui-components.jpg",
    images: [
      "/images/marketplace/ui-components-1.jpg",
      "/images/marketplace/ui-components-2.jpg",
      "/images/marketplace/ui-components-3.jpg",
    ],
    demo: "https://example.com/demo/ui-components",
    publishDate: "2023-09-05",
    tags: ["React", "UI Components", "TypeScript", "Frontend"]
  }
];

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = marketplaceProducts.find((p) => p.slug === params.slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested marketplace product could not be found."
    };
  }
  
  return {
    title: `${product.title} | Marketplace`,
    description: product.description,
  };
}

export default function MarketplaceProductPage({ params }: Props) {
  const product = marketplaceProducts.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/marketplace" 
              className="text-primary hover:underline mb-4 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Marketplace
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden cursor-pointer">
                    <Image 
                      src={img} 
                      alt={`${product.title} image ${index + 1}`}
                      fill
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-gray-500 line-through">${Math.round(product.price * 1.3)}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  Save ${Math.round(product.price * 0.3)}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                {product.description}
              </p>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="#" 
                  className="bg-primary text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-primary/90 transition-colors flex-1"
                >
                  Buy Now - ${product.price}
                </a>
                
                <a 
                  href={product.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Live Demo
                </a>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-sm">
                <p className="flex items-center">
                  <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Released on {new Date(product.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </p>
                <p className="flex items-center mt-2">
                  <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Regular updates and improvements</span>
                </p>
                <p className="flex items-center mt-2">
                  <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure one-time payment</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Product Details</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {marketplaceProducts
                .filter(p => p.id !== product.id)
                .slice(0, 3)
                .map(relatedProduct => (
                  <Link 
                    key={relatedProduct.id} 
                    href={`/marketplace/${relatedProduct.slug}`}
                    className="group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image 
                          src={relatedProduct.image} 
                          alt={relatedProduct.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-primary font-medium">
                          {relatedProduct.category}
                        </span>
                        <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                          {relatedProduct.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {relatedProduct.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">${relatedProduct.price}</span>
                          <span className="text-primary text-sm font-medium">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 