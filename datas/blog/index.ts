// Blog post data types
export interface Author {
  name: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

// Common author for all blog posts
const author: Author = {
  name: "Johan Beker",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  bio: "Full-stack developer and designer"
};

// Blog posts data array
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js: A Beginner's Guide",
    excerpt: "Learn the basics of Next.js and how to create your first app with this popular React framework.",
    content: `
      <p>Next.js has become one of the most popular frameworks for building React applications. It provides a great developer experience with features like server-side rendering, static site generation, and easy API routes. In this guide, we'll walk through the basics of getting started with Next.js.</p>
      
      <h2>What is Next.js?</h2>
      <p>Next.js is a React framework that enables functionality like server-side rendering, static site generation, and API routes. It's designed to provide the best developer experience with all the features you need for production.</p>
      
      <h2>Setting Up Your First Next.js Project</h2>
      <p>To create a new Next.js app, you can use the following command:</p>
      
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This will set up a new Next.js project with a default template. You can then navigate to the project directory and start the development server:</p>
      
      <pre><code>cd my-next-app
npm run dev</code></pre>
      
      <p>Your Next.js app will now be running at <a href="http://localhost:3000">http://localhost:3000</a>.</p>
      
      <h2>Pages in Next.js</h2>
      <p>Next.js uses a file-system based router. Each file in the 'pages' directory becomes a route in your application. For example, if you create a file at 'pages/about.js', it will be accessible at '/about'.</p>
      
      <p>Here's a simple example of a page component:</p>
      
      <pre><code>// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page!</p>
    </div>
  );
}</code></pre>
      
      <h2>Data Fetching</h2>
      <p>Next.js provides several ways to fetch data for your pages:</p>
      
      <ul>
        <li><strong>getStaticProps</strong>: Fetch data at build time</li>
        <li><strong>getServerSideProps</strong>: Fetch data on each request</li>
        <li><strong>getStaticPaths</strong>: Specify dynamic routes to pre-render based on data</li>
      </ul>
      
      <p>Here's an example using getStaticProps:</p>
      
      <pre><code>export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: {
      data,
    },
  };
}

export default function Blog({ data }) {
  // Render data...
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Next.js provides a great foundation for building modern web applications with React. Its features like server-side rendering, static site generation, and API routes make it a powerful choice for developers. As you continue learning, you'll discover more advanced features that can help you build better applications.</p>
    `,
    author,
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Tutorial"],
    publishDate: "2023-12-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 2,
    slug: "mastering-css-grid-layout",
    title: "Mastering CSS Grid Layout: Tips and Tricks",
    excerpt: "Explore advanced techniques for using CSS Grid Layout to create complex web layouts with ease.",
    content: `
      <p>CSS Grid Layout has revolutionized how we create web layouts. In this post, we'll explore some advanced techniques and best practices for working with CSS Grid.</p>
      
      <h2>Why CSS Grid?</h2>
      <p>CSS Grid Layout provides a two-dimensional layout system for the web, making it possible to lay out items in rows and columns. Unlike Flexbox, which is mostly one-dimensional, Grid is designed for two-dimensional layouts.</p>
      
      <h2>Basic Grid Setup</h2>
      <p>To create a basic grid, you need to set the display property to 'grid' on the container element:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
      
      <p>This creates a grid with three equal-width columns and a 20px gap between grid items.</p>
      
      <h2>Advanced Grid Techniques</h2>
      
      <h3>1. Using Grid Areas</h3>
      <p>Grid areas provide a visual way to define the layout of your grid:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }</code></pre>
      
      <h3>2. Auto-Fit and Auto-Fill</h3>
      <p>For responsive layouts, auto-fit and auto-fill are incredibly useful:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}</code></pre>
      
      <p>This creates a grid where the number of columns adjusts automatically based on the available space.</p>
      
      <h3>3. Using Grid Alignment</h3>
      <p>CSS Grid provides powerful alignment properties:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-items: center; /* Horizontal alignment */
  align-items: center; /* Vertical alignment */
}</code></pre>
      
      <h2>Practical Example: Magazine Layout</h2>
      <p>Here's how you might create a magazine-style layout using CSS Grid:</p>
      
      <pre><code>.magazine-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}

.feature {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.secondary {
  grid-column: 3 / 5;
  grid-row: 1 / 2;
}

.sidebar {
  grid-column: 3 / 5;
  grid-row: 2 / 4;
}</code></pre>
      
      <h2>Browser Support</h2>
      <p>CSS Grid is now supported in all modern browsers. For older browsers, you may need to provide fallbacks or use a feature detection approach.</p>
      
      <h2>Conclusion</h2>
      <p>CSS Grid Layout is a powerful tool that can simplify complex layout tasks. By understanding its capabilities and combining it with other CSS features like Flexbox when appropriate, you can create sophisticated, responsive layouts with clean, maintainable code.</p>
    `,
    author,
    category: "CSS",
    tags: ["CSS", "Grid Layout", "Web Design", "Responsive Design"],
    publishDate: "2023-11-25",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 3,
    slug: "state-management-with-react-hooks",
    title: "Effective State Management with React Hooks",
    excerpt: "Learn how to manage state effectively in your React applications using hooks.",
    content: `
      <p>React Hooks have transformed how we manage state in React applications. In this article, we'll explore effective patterns for state management using hooks.</p>
      
      <h2>Introduction to React Hooks</h2>
      <p>Introduced in React 16.8, hooks allow you to use state and other React features without writing a class. The most commonly used hooks are useState, useEffect, useContext, and useReducer.</p>
      
      <h2>Basic State Management with useState</h2>
      <p>The useState hook is the simplest way to add state to a functional component:</p>
      
      <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
      
      <h2>Complex State with useReducer</h2>
      <p>For more complex state logic, useReducer can be more appropriate:</p>
      
      <pre><code>import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}</code></pre>
      
      <h2>Sharing State with Context</h2>
      <p>The Context API combined with hooks allows you to share state across components without prop drilling:</p>
      
      <pre><code>import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const CountContext = createContext();

// Create a provider component
function CountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}

// Custom hook to use the count context
function useCount() {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

// Example component using the context
function CountDisplay() {
  const { state } = useCount();
  return <div>Count: {state.count}</div>;
}

function CountButtons() {
  const { dispatch } = useCount();
  return (
    <div>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}</code></pre>
      
      <h2>Custom Hooks for Reusable Logic</h2>
      <p>Custom hooks allow you to extract component logic into reusable functions:</p>
      
      <pre><code>function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}</code></pre>
      
      <h2>When to Use Each Hook</h2>
      <p>Here's a quick guide on when to use different hooks for state management:</p>
      
      <ul>
        <li><strong>useState</strong>: For simple state that doesn't require complex logic.</li>
        <li><strong>useReducer</strong>: For state that involves complex transitions or when the next state depends on the previous one.</li>
        <li><strong>useContext</strong>: For sharing state that needs to be accessed by many components at different nesting levels.</li>
        <li><strong>Custom Hooks</strong>: For extracting and reusing stateful logic across components.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>React Hooks provide a powerful and flexible way to manage state in your applications. By combining useState, useReducer, useContext, and custom hooks, you can create clean, maintainable code while avoiding the complexity of external state management libraries in many cases.</p>
    `,
    author,
    category: "React",
    tags: ["React", "Hooks", "State Management", "JavaScript"],
    publishDate: "2023-10-15",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  },
  {
    id: 4,
    slug: "design-systems-for-developers",
    title: "Design Systems for Developers: A Practical Guide",
    excerpt: "Learn how to implement and use design systems to improve consistency and development efficiency.",
    content: `
      <p>Design systems are collections of reusable components, guided by clear standards, that can be assembled to build any number of applications. For developers, a well-implemented design system can significantly improve workflow efficiency and code quality. This guide explores how developers can work with design systems effectively.</p>
      
      <h2>What is a Design System?</h2>
      <p>A design system consists of:</p>
      <ul>
        <li>Component library (UI patterns)</li>
        <li>Design tokens (colors, spacing, typography, etc.)</li>
        <li>Documentation</li>
        <li>Design principles and guidelines</li>
        <li>Code implementation</li>
      </ul>
      
      <h2>Benefits for Developers</h2>
      <p>Using a design system offers several advantages:</p>
      <ul>
        <li>Reduced decision fatigue when implementing designs</li>
        <li>Consistent codebase with fewer bugs</li>
        <li>Faster development through reusable components</li>
        <li>Better collaboration with designers</li>
        <li>Simplified maintenance and updates</li>
      </ul>
      
      <h2>Implementing a Design System in Code</h2>
      
      <h3>1. Setting Up Design Tokens</h3>
      <p>Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes:</p>
      
      <pre><code>// CSS variables approach
:root {
  /* Colors */
  --color-primary: #0066ff;
  --color-secondary: #2e3440;
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-danger: #f44336;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}</code></pre>
      
      <h3>2. Creating Base Components</h3>
      <p>Start with fundamental components that others will build upon:</p>
      
      <pre><code>// Button.jsx
import React from 'react';
import './Button.css';

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <button
      className={\`btn btn--\${variant} btn--\${size}\`}
      {...props}
    >
      {children}
    </button>
  );
};</code></pre>
      
      <h3>3. Documentation with Storybook</h3>
      <p>Document your components using Storybook for interactive demonstrations:</p>
      
      <pre><code>// Button.stories.jsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'text'],
      control: { type: 'select' }
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    }
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};</code></pre>
      
      <h2>Working with Existing Design Systems</h2>
      <p>When using an established design system, consider these best practices:</p>
      
      <h3>1. Avoid Component Overrides</h3>
      <p>Resist the urge to modify design system components for one-off use cases. Instead, create new components that compose existing ones.</p>
      
      <h3>2. Properly Extend Components</h3>
      <p>When you do need to extend components, do so transparently:</p>
      
      <pre><code>// CustomButton.jsx - Extending a design system button
import { Button } from '@design-system/core';

export const CustomButton = (props) => {
  return (
    <Button
      startIcon={<CustomIcon />}
      data-testid="custom-button"
      {...props}
    />
  );
};</code></pre>
      
      <h3>3. Follow Contribution Guidelines</h3>
      <p>If you need to add to the design system, follow its contribution process:</p>
      <ol>
        <li>Start with user needs and existing patterns</li>
        <li>Discuss proposals with the team</li>
        <li>Build and test thoroughly</li>
        <li>Document usage and edge cases</li>
        <li>Submit for review and integration</li>
      </ol>
      
      <h2>Tools for Design Systems</h2>
      <p>Several tools can help with creating and maintaining design systems:</p>
      <ul>
        <li><strong>Storybook</strong>: For component documentation and testing</li>
        <li><strong>Figma</strong>: For design files and collaboration</li>
        <li><strong>Style Dictionary</strong>: For managing design tokens across platforms</li>
        <li><strong>Chromatic</strong>: For visual regression testing</li>
        <li><strong>Zeroheight</strong>: For comprehensive documentation</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A well-implemented design system bridges the gap between design and development, leading to more consistent products built more efficiently. By understanding how to work with design systems effectively, developers can focus more on solving unique problems rather than reimplementing common patterns.</p>
    `,
    author,
    category: "Design",
    tags: ["Design Systems", "Frontend", "UI", "Components"],
    publishDate: "2023-09-05",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  },
  {
    id: 5,
    slug: "performance-optimization-techniques",
    title: "Web Performance Optimization Techniques for 2023",
    excerpt: "Improve your website's performance with these modern optimization techniques.",
    content: `
      <p>Website performance has a direct impact on user experience, conversion rates, and SEO rankings. In this article, we'll explore modern web performance optimization techniques that can help make your websites faster and more efficient.</p>
      
      <h2>Why Performance Matters</h2>
      <p>Studies have consistently shown that better performance leads to:</p>
      <ul>
        <li>Higher user engagement and retention</li>
        <li>Improved conversion rates</li>
        <li>Better search engine rankings</li>
        <li>Reduced bounce rates</li>
      </ul>
      
      <h2>Core Web Vitals</h2>
      <p>Google's Core Web Vitals are a set of specific factors that measure user experience on the web:</p>
      
      <h3>Largest Contentful Paint (LCP)</h3>
      <p>LCP measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.</p>
      
      <h3>First Input Delay (FID)</h3>
      <p>FID measures interactivity. Pages should have an FID of less than 100 milliseconds.</p>
      
      <h3>Cumulative Layout Shift (CLS)</h3>
      <p>CLS measures visual stability. Pages should maintain a CLS of less than 0.1.</p>
      
      <h2>Image Optimization</h2>
      
      <h3>1. Modern Image Formats</h3>
      <p>Use next-gen formats like WebP, AVIF, and JPEG XL which offer better compression and quality characteristics:</p>
      
      <pre><code>&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="Description" loading="lazy"&gt;
&lt;/picture&gt;</code></pre>
      
      <h3>2. Responsive Images</h3>
      <p>Serve different image sizes based on the user's device:</p>
      
      <pre><code>&lt;img 
  src="small.jpg" 
  srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w" 
  sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 1500px" 
  alt="Description"
&gt;</code></pre>
      
      <h3>3. Lazy Loading</h3>
      <p>Defer loading off-screen images until they're needed:</p>
      
      <pre><code>&lt;img src="image.jpg" alt="Description" loading="lazy"&gt;</code></pre>
      
      <h2>JavaScript Optimization</h2>
      
      <h3>1. Code Splitting</h3>
      <p>Split your JavaScript bundles to load only what's needed:</p>
      
      <pre><code>// Using dynamic imports in React
const SomeComponent = React.lazy(() => import('./SomeComponent'));

function MyComponent() {
  return (
    &lt;React.Suspense fallback={&lt;Spinner /&gt;}&gt;
      &lt;SomeComponent /&gt;
    &lt;/React.Suspense&gt;
  );
}</code></pre>
      
      <h3>2. Tree Shaking</h3>
      <p>Remove unused code from your bundles:</p>
      
      <pre><code>// Instead of
import * as utils from './utils';

// Use specific imports
import { specificFunction } from './utils';</code></pre>
      
      <h3>3. Defer Non-Critical JavaScript</h3>
      <p>Load non-essential scripts after the page has loaded:</p>
      
      <pre><code>&lt;script defer src="non-critical.js"&gt;&lt;/script&gt;</code></pre>
      
      <h2>CSS Optimization</h2>
      
      <h3>1. Critical CSS</h3>
      <p>Inline critical CSS in the <head> and load the rest asynchronously:</p>
      
      <pre><code>&lt;style&gt;
  /* Critical CSS goes here */
  .header { /* ... */ }
  .hero { /* ... */ }
&lt;/style&gt;
&lt;link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'"&gt;
&lt;noscript&gt;&lt;link rel="stylesheet" href="styles.css"&gt;&lt;/noscript&gt;</code></pre>
      
      <h3>2. Reduce Unused CSS</h3>
      <p>Remove unused CSS with tools like PurgeCSS:</p>
      
      <pre><code>// postcss.config.js with PurgeCSS
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}</code></pre>
      
      <h2>Font Optimization</h2>
      
      <h3>1. Font Display</h3>
      <p>Prevent invisible text during font loading:</p>
      
      <pre><code>@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap;
}</code></pre>
      
      <h3>2. Font Subsetting</h3>
      <p>Only load the characters you need:</p>
      
      <pre><code>&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&text=HelloWorld&display=swap" rel="stylesheet"&gt;</code></pre>
      
      <h2>Server Optimization</h2>
      
      <h3>1. Use a CDN</h3>
      <p>Distribute your content globally to reduce latency.</p>
      
      <h3>2. HTTP/2 or HTTP/3</h3>
      <p>Upgrade your server to use modern protocols for better multiplexing and faster connections.</p>
      
      <h3>3. Proper Caching</h3>
      <p>Implement effective cache headers:</p>
      
      <pre><code>// Example cache headers
Cache-Control: max-age=31536000, immutable</code></pre>
      
      <h2>Measuring Performance</h2>
      
      <p>Use these tools to measure and monitor your performance:</p>
      <ul>
        <li>Lighthouse (in Chrome DevTools)</li>
        <li>PageSpeed Insights</li>
        <li>Web Vitals report in Google Search Console</li>
        <li>WebPageTest</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Web performance optimization is an ongoing process that requires vigilance and frequent reassessment. By implementing these techniques, you can provide a faster, more efficient experience for your users while improving your site's SEO ranking and conversion rates.</p>
    `,
    author,
    category: "Performance",
    tags: ["Web Performance", "Optimization", "Core Web Vitals", "Frontend"],
    publishDate: "2023-08-20",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    featured: true
  }
]; 