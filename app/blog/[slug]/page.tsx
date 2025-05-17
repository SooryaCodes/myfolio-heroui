import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Mock blog data - in a real app, this would come from a database or API
const blogPosts = [
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
    author: {
      name: "Johan Beker",
      image: "/images/avatar.jpg",
      bio: "Full-stack developer and designer"
    },
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Tutorial"],
    publishDate: "2023-12-10",
    readTime: "8 min read",
    image: "/images/blog/nextjs.jpg"
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
    author: {
      name: "Johan Beker",
      image: "/images/avatar.jpg",
      bio: "Full-stack developer and designer"
    },
    category: "CSS",
    tags: ["CSS", "Grid Layout", "Web Design", "Responsive Design"],
    publishDate: "2023-11-25",
    readTime: "10 min read",
    image: "/images/blog/css-grid.jpg"
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
    author: {
      name: "Johan Beker",
      image: "/images/avatar.jpg",
      bio: "Full-stack developer and designer"
    },
    category: "React",
    tags: ["React", "Hooks", "State Management", "JavaScript"],
    publishDate: "2023-10-15",
    readTime: "12 min read",
    image: "/images/blog/react-hooks.jpg"
  }
];

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found."
    };
  }
  
  return {
    title: `${post.title} | Johan Beker's Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="text-primary hover:underline mb-4 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">{post.title}</h1>
            
            <div className="flex items-center mt-6 mb-8">
              <div className="h-10 w-10 relative rounded-full overflow-hidden">
                <Image 
                  src={post.author.image} 
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} · {post.readTime}
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
              <div className="flex items-center">
                <div className="h-16 w-16 relative rounded-full overflow-hidden">
                  <Image 
                    src={post.author.image} 
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{post.author.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
} 