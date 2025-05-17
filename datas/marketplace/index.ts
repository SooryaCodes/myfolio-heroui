// Marketplace product data types
export interface MarketplaceProduct {
  id: number;
  slug: string;
  title: string;
  category: string;
  price: number;
  description: string;
  fullDescription: string;
  features: string[];
  image: string;
  images: string[];
  demo: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
}

// Marketplace products data array
export const marketplaceProducts: MarketplaceProduct[] = [
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    demo: "https://example.com/demo/dashboard",
    publishDate: "2023-11-20",
    tags: ["React", "Tailwind CSS", "Dashboard", "Admin Panel"],
    featured: true
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
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    demo: "https://example.com/demo/ecommerce",
    publishDate: "2023-10-15",
    tags: ["Next.js", "E-commerce", "Stripe", "Full Stack"],
    featured: true
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
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    demo: "https://example.com/demo/ui-components",
    publishDate: "2023-09-05",
    tags: ["React", "UI Components", "TypeScript", "Frontend"],
    featured: false
  },
  {
    id: 4,
    slug: "next-js-blog-starter",
    title: "Next.js Blog Starter",
    category: "Blog Template",
    price: 39,
    description: "A feature-rich blog starter template built with Next.js and MDX.",
    fullDescription: `
      <p>Get your blog up and running quickly with this modern Next.js blog starter. Built with MDX for rich content creation, this template includes everything you need for a professional blog.</p>
      
      <p>Focus on writing content while enjoying features like syntax highlighting, responsive design, SEO optimization, and more.</p>
      
      <h2>Features</h2>
      <ul>
        <li>MDX for rich content creation</li>
        <li>Syntax highlighting for code blocks</li>
        <li>Responsive design for all devices</li>
        <li>Dark and light mode</li>
        <li>SEO optimization</li>
        <li>RSS feed generation</li>
        <li>Newsletter subscription form</li>
        <li>Tag and category support</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>Next.js source code</li>
        <li>MDX configuration</li>
        <li>Sample blog posts</li>
        <li>Documentation</li>
        <li>Free updates</li>
        <li>Email support</li>
      </ul>
    `,
    features: [
      "MDX for rich content",
      "Syntax highlighting",
      "Responsive design",
      "Dark/light mode",
      "SEO optimization",
      "Newsletter integration"
    ],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      "https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
    ],
    demo: "https://example.com/demo/blog-starter",
    publishDate: "2023-07-22",
    tags: ["Next.js", "Blog", "MDX", "Content Creation"],
    featured: false
  },
  {
    id: 5,
    slug: "react-design-system",
    title: "React Design System",
    category: "UI Framework",
    price: 99,
    description: "A comprehensive design system with 100+ components for building cohesive React applications.",
    fullDescription: `
      <p>Create consistent, beautiful user interfaces with this comprehensive React design system. With over 100 components, this system provides everything you need to build professional applications quickly.</p>
      
      <p>Each component is designed with accessibility, performance, and customization in mind, making it perfect for teams that need to maintain consistency across multiple projects.</p>
      
      <h2>Features</h2>
      <ul>
        <li>100+ React components</li>
        <li>Comprehensive theming system</li>
        <li>Accessibility compliance (WCAG 2.1 AA)</li>
        <li>Detailed documentation</li>
        <li>TypeScript support</li>
        <li>Custom hooks for common patterns</li>
        <li>Animation utilities</li>
        <li>Form validation</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>React component library</li>
        <li>Design tokens</li>
        <li>Figma design files</li>
        <li>Storybook documentation</li>
        <li>2 years of updates</li>
        <li>Priority support</li>
      </ul>
    `,
    features: [
      "100+ React components",
      "Comprehensive theming",
      "Accessibility compliance",
      "TypeScript support",
      "Animation utilities",
      "Form validation"
    ],
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2062&q=80",
    images: [
      "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2062&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    demo: "https://example.com/demo/design-system",
    publishDate: "2023-06-15",
    tags: ["React", "Design System", "UI", "Components", "TypeScript"],
    featured: true
  }
]; 