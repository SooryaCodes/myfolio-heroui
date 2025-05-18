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
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  bio: "Full-stack developer and designer",
};

// Blog posts data array
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js: A Beginner's Guide",
    excerpt:
      "Learn the basics of Next.js and how to create your first app with this popular React framework.",
    content: `
      <div class="mb-8">
        <p>Next.js has become one of the most popular frameworks for building React applications. It provides a great developer experience with features like server-side rendering, static site generation, and easy API routes. In this guide, we&apos;ll walk through the basics of getting started with Next.js.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">What is Next.js?</h2>
        <p>Next.js is a React framework that enables functionality like server-side rendering, static site generation, and API routes. It&apos;s designed to provide the best developer experience with all the features you need for production.</p>
        
        <div class="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <p class="text-sm font-medium"><span class="text-primary">💡 Pro Tip:</span> Next.js is maintained by Vercel and has excellent documentation at <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">nextjs.org/docs</a>.</p>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Setting Up Your First Next.js Project</h2>
        <p>To create a new Next.js app, you can use the following command:</p>
        
        <pre><code>npx create-next-app@latest my-next-app</code></pre>
        
        <p class="mt-4">This will set up a new Next.js project with a default template. You can then navigate to the project directory and start the development server:</p>
        
        <pre><code>cd my-next-app
npm run dev</code></pre>
        
        <p class="mt-4">Your Next.js app will now be running at <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">http://localhost:3000</a>.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Pages in Next.js</h2>
        <p>Next.js uses a file-system based router. Each file in the &apos;pages&apos; directory becomes a route in your application. For example, if you create a file at &apos;pages/about.js&apos;, it will be accessible at &apos;/about&apos;.</p>
        
        <p class="mt-4">Here&apos;s a simple example of a page component:</p>
        
        <pre><code>// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page!</p>
    </div>
  );
}</code></pre>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Project Structure</h2>
        <p>A typical Next.js project has the following structure:</p>
        
        <pre><code>my-next-app/
├── node_modules/
├── pages/
│   ├── _app.js
│   ├── index.js
│   └── about.js
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── package.json
└── README.md</code></pre>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Data Fetching</h2>
        <p>Next.js provides several ways to fetch data for your pages:</p>
        
        <ul class="list-disc pl-6 mt-4 space-y-2">
          <li><strong>getStaticProps</strong>: Fetch data at build time</li>
          <li><strong>getServerSideProps</strong>: Fetch data on each request</li>
          <li><strong>getStaticPaths</strong>: Specify dynamic routes to pre-render based on data</li>
        </ul>
        
        <p class="mt-4">Here&apos;s an example using getStaticProps:</p>
        
        <pre><code>// pages/blog.js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: {
      data,
    },
  };
}

export default function Blog({ data }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}</code></pre>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Built-in Features</h2>
        <p>Next.js comes with several built-in features that make development easier:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">API Routes</h3>
            <p class="text-sm">Create API endpoints as Node.js serverless functions</p>
          </div>
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">Image Optimization</h3>
            <p class="text-sm">Automatic image optimization with the Image component</p>
          </div>
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">Fast Refresh</h3>
            <p class="text-sm">Instant feedback during development</p>
          </div>
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">CSS Support</h3>
            <p class="text-sm">Built-in support for CSS Modules, Sass, etc.</p>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Conclusion</h2>
        <p>Next.js provides a great foundation for building modern web applications with React. Its features like server-side rendering, static site generation, and API routes make it a powerful choice for developers. As you continue learning, you&apos;ll discover more advanced features that can help you build better applications.</p>
        
        <div class="mt-6 p-5 bg-foreground/5 rounded-xl flex gap-4 items-start">
          <div class="text-primary flex-shrink-0 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <h3 class="font-bold mb-2">Next Steps</h3>
            <p>Ready to dive deeper? Check out these resources:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Next.js Tutorial</a></li>
              <li><a href="https://github.com/vercel/next.js/tree/canary/examples" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Next.js Examples</a></li>
              <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Official Documentation</a></li>
            </ul>
          </div>
        </div>
      </div>
    `,
    author,
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Tutorial"],
    publishDate: "2023-12-10",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "mastering-css-grid-layout",
    title: "Mastering CSS Grid Layout: Tips and Tricks",
    excerpt:
      "Explore advanced techniques for using CSS Grid Layout to create complex web layouts with ease.",
    content: `
      <div class="mb-8">
        <p>CSS Grid Layout has revolutionized how we create web layouts. In this post, we&apos;ll explore some advanced techniques and best practices for working with CSS Grid.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Why CSS Grid?</h2>
        <p>CSS Grid Layout provides a two-dimensional layout system for the web, making it possible to lay out items in rows and columns. Unlike Flexbox, which is mostly one-dimensional, Grid is designed for two-dimensional layouts.</p>
        
        <div class="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <p class="text-sm font-medium"><span class="text-primary">💡 Pro Tip:</span> Use Grid for overall page layout and Flexbox for components within that layout. They work great together!</p>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Basic Grid Setup</h2>
        <p>To create a basic grid, you need to set the display property to &apos;grid&apos; on the container element:</p>
        
        <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
        
        <p class="mt-4">This creates a grid with three equal-width columns and a 20px gap between grid items.</p>
        
        <div class="mt-6 grid grid-cols-3 gap-4">
          <div class="bg-foreground/10 rounded-lg p-4 text-center font-medium">Column 1</div>
          <div class="bg-foreground/10 rounded-lg p-4 text-center font-medium">Column 2</div>
          <div class="bg-foreground/10 rounded-lg p-4 text-center font-medium">Column 3</div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Advanced Grid Techniques</h2>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3">1. Using Grid Areas</h3>
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
          
          <div class="mt-4 p-4 bg-foreground/5 rounded-lg">
            <div class="grid grid-rows-[auto_1fr_auto] gap-2">
              <div class="bg-primary/20 p-2 rounded text-center">Header</div>
              <div class="grid grid-cols-[1fr_2fr] gap-2">
                <div class="bg-primary/20 p-2 rounded text-center">Sidebar</div>
                <div class="bg-primary/20 p-2 rounded text-center">Content</div>
              </div>
              <div class="bg-primary/20 p-2 rounded text-center">Footer</div>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3">2. Auto-Fit and Auto-Fill</h3>
          <p>For responsive layouts, auto-fit and auto-fill are incredibly useful:</p>
          
          <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}</code></pre>
          
          <p class="mt-3">This creates a grid where the number of columns adjusts automatically based on the available space.</p>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3">3. Using Grid Alignment</h3>
          <p>CSS Grid provides powerful alignment properties:</p>
          
          <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-items: center; /* Horizontal alignment */
  align-items: center; /* Vertical alignment */
}</code></pre>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Practical Example: Magazine Layout</h2>
        <p>Here&apos;s how you might create a magazine-style layout using CSS Grid:</p>
        
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
        
        <div class="mt-6 bg-foreground/5 p-5 rounded-lg">
          <div class="grid grid-cols-4 grid-rows-3 gap-3 h-[300px]">
            <div class="bg-primary/30 col-span-2 row-span-2 rounded-lg p-3 flex items-center justify-center font-bold">Feature Article</div>
            <div class="bg-primary/20 col-span-2 rounded-lg p-3 flex items-center justify-center font-bold">Secondary Article</div>
            <div class="bg-primary/10 col-span-2 row-span-2 rounded-lg p-3 flex items-center justify-center font-bold">Sidebar Content</div>
            <div class="bg-primary/20 col-span-2 rounded-lg p-3 flex items-center justify-center font-bold">Additional Content</div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Grid Patterns</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div class="border border-foreground/10 rounded-lg overflow-hidden">
            <div class="bg-foreground/5 p-3 font-bold">Holy Grail Layout</div>
            <div class="p-4">
              <div class="grid grid-rows-[auto_1fr_auto] gap-2 h-[200px]">
                <div class="bg-foreground/10 p-2 rounded">Header</div>
                <div class="grid grid-cols-[1fr_3fr_1fr] gap-2">
                  <div class="bg-foreground/10 p-2 rounded">Left Sidebar</div>
                  <div class="bg-foreground/10 p-2 rounded">Main Content</div>
                  <div class="bg-foreground/10 p-2 rounded">Right Sidebar</div>
                </div>
                <div class="bg-foreground/10 p-2 rounded">Footer</div>
              </div>
            </div>
          </div>
          
          <div class="border border-foreground/10 rounded-lg overflow-hidden">
            <div class="bg-foreground/5 p-3 font-bold">Card Grid</div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-foreground/10 p-2 rounded h-20"></div>
                <div class="bg-foreground/10 p-2 rounded h-20"></div>
                <div class="bg-foreground/10 p-2 rounded h-20"></div>
                <div class="bg-foreground/10 p-2 rounded h-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Browser Support</h2>
        <p>CSS Grid is now supported in all modern browsers. For older browsers, you may need to provide fallbacks or use a feature detection approach.</p>
        
        <div class="mt-4 p-4 bg-foreground/5 rounded-lg">
          <h3 class="font-bold mb-2">Browser Support Table</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-foreground/10">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left">Browser</th>
                  <th class="px-4 py-2 text-left">Version</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-foreground/10">
                <tr>
                  <td class="px-4 py-2">Chrome</td>
                  <td class="px-4 py-2">57+</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">Firefox</td>
                  <td class="px-4 py-2">52+</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">Safari</td>
                  <td class="px-4 py-2">10.1+</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">Edge</td>
                  <td class="px-4 py-2">16+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Conclusion</h2>
        <p>CSS Grid Layout is a powerful tool that can simplify complex layout tasks. By understanding its capabilities and combining it with other CSS features like Flexbox when appropriate, you can create sophisticated, responsive layouts with clean, maintainable code.</p>
        
        <div class="mt-6 p-5 bg-foreground/5 rounded-xl flex gap-4 items-start">
          <div class="text-primary flex-shrink-0 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <h3 class="font-bold mb-2">Further Resources</h3>
            <p>Want to learn more about CSS Grid? Check out these resources:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">CSS-Tricks: A Complete Guide to Grid</a></li>
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">MDN Web Docs: CSS Grid Layout</a></li>
              <li><a href="https://gridbyexample.com/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Grid by Example</a></li>
            </ul>
          </div>
        </div>
      </div>
    `,
    author,
    category: "CSS",
    tags: ["CSS", "Grid Layout", "Web Design", "Responsive Design"],
    publishDate: "2023-11-25",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
  },
  {
    id: 3,
    slug: "state-management-with-react-hooks",
    title: "Effective State Management with React Hooks",
    excerpt:
      "Learn how to manage state effectively in your React applications using hooks.",
    content: `
      <div class="mb-8">
        <p>React Hooks have transformed how we manage state in React applications. In this article, we&apos;ll explore effective patterns for state management using hooks.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Introduction to React Hooks</h2>
        <p>Introduced in React 16.8, hooks allow you to use state and other React features without writing a class. The most commonly used hooks are useState, useEffect, useContext, and useReducer.</p>
        
        <div class="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <p class="text-sm font-medium"><span class="text-primary">💡 Pro Tip:</span> Hooks can only be called at the top level of React function components or custom hooks. They can&apos;t be called inside loops, conditions, or nested functions.</p>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Basic State Management with useState</h2>
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
        
        <p class="mt-4">This simple example demonstrates how to:</p>
        <ul class="list-disc pl-6 mt-2 space-y-2">
          <li>Initialize state with a default value (0)</li>
          <li>Read the current state value (count)</li>
          <li>Update the state with a setter function (setCount)</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Complex State with useReducer</h2>
        <p>For more complex state logic, useReducer can be more appropriate:</p>
        
        <pre><code>import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unsupported action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}</code></pre>
        
        <div class="mt-6 p-4 bg-foreground/5 rounded-lg">
          <h3 class="font-bold mb-2">When to use useReducer vs useState</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium mb-2">Use useState when:</p>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li>Managing independent simple state values</li>
                <li>State logic is simple</li>
                <li>Small number of state transitions</li>
              </ul>
            </div>
            <div>
              <p class="font-medium mb-2">Use useReducer when:</p>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li>Complex state logic with multiple sub-values</li>
                <li>Next state depends on previous state</li>
                <li>Many different state transitions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Sharing State with Context API</h2>
        <p>The Context API combined with hooks provides a powerful way to share state across components without prop drilling:</p>
        
        <pre><code>// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// App.js
import { ThemeProvider } from './ThemeContext';
import ThemedButton from './ThemedButton';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Theme Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

// ThemedButton.js
import { useTheme } from './ThemeContext';

function ThemedButton() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        border: '1px solid',
        padding: '8px 16px',
      }}
    >
      Toggle Theme: Currently {isDarkMode ? 'Dark' : 'Light'}
    </button>
  );
}</code></pre>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Custom Hooks for Reusable Logic</h2>
        <p>Custom hooks allow you to extract component logic into reusable functions:</p>
        
        <pre><code>// useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get stored value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Update localStorage when storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}

// Using the custom hook
function PreferencesForm() {
  const [preferences, setPreferences] = useLocalStorage('user-preferences', {
    notifications: true,
    theme: 'light',
  });
  
  const updatePreferences = (e) => {
    const { name, checked, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: name === 'theme' ? value : checked,
    }));
  };
  
  return (
    <form>
      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={preferences.notifications}
          onChange={updatePreferences}
        />
        Enable Notifications
      </label>
      <select
        name="theme"
        value={preferences.theme}
        onChange={updatePreferences}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </form>
  );
}</code></pre>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Advanced Patterns</h2>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3">1. State Initialization Patterns</h3>
          <p>When initial state is expensive to compute, use the lazy initialization pattern:</p>
          
          <pre><code>// Expensive calculation
function calculateInitialCount() {
  console.log('Computing initial state');
  return Math.floor(Math.random() * 100);
}

function Counter() {
  // Bad: Recalculates on every render
  // const [count, setCount] = useState(calculateInitialCount());
  
  // Good: Only calculates once on initial render
  const [count, setCount] = useState(() => calculateInitialCount());
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}</code></pre>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3">2. State Updates Based on Previous State</h3>
          <p>When updating state based on its previous value, use the functional update form:</p>
          
          <pre><code>function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    // Bad: May not use latest state if there are multiple updates
    // setCount(count + 1);
    
    // Good: Guarantees update is based on latest state
    setCount(prevCount => prevCount + 1);
  };
  
  const incrementTwice = () => {
    // This will correctly increment by 2
    increment();
    increment();
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementTwice}>Increment Twice</button>
    </div>
  );
}</code></pre>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Performance Optimizations</h2>
        <p>React provides several hooks to optimize component performance:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div class="border border-foreground/10 rounded-lg overflow-hidden">
            <div class="bg-foreground/5 p-3 font-bold">useMemo</div>
            <div class="p-4">
              <p class="text-sm mb-3">Memoize expensive calculations to prevent unnecessary recalculations on re-renders.</p>
              <pre><code>const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);</code></pre>
            </div>
          </div>
          
          <div class="border border-foreground/10 rounded-lg overflow-hidden">
            <div class="bg-foreground/5 p-3 font-bold">useCallback</div>
            <div class="p-4">
              <p class="text-sm mb-3">Memoize callback functions to prevent unnecessary re-renders of child components.</p>
              <pre><code>const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);</code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Conclusion</h2>
        <p>React Hooks provide a powerful and elegant way to manage state and side effects in functional components. By understanding these patterns and best practices, you can write more maintainable and efficient React applications.</p>
        
        <div class="mt-6 p-5 bg-foreground/5 rounded-xl flex gap-4 items-start">
          <div class="text-primary flex-shrink-0 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <h3 class="font-bold mb-2">Further Reading</h3>
            <p>Want to dive deeper into React Hooks? Check out these resources:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">React Hooks Documentation</a></li>
              <li><a href="https://reactjs.org/docs/hooks-rules.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Rules of Hooks</a></li>
              <li><a href="https://reactjs.org/docs/hooks-reference.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Hooks API Reference</a></li>
            </ul>
          </div>
        </div>
      </div>
    `,
    author,
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "State Management"],
    publishDate: "2023-11-15",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
  },
  {
    id: 4,
    slug: "design-systems-for-developers",
    title: "Design Systems for Developers: A Practical Guide",
    excerpt:
      "Learn how to implement and use design systems to improve consistency and development efficiency.",
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
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
  },
  {
    id: 5,
    slug: "ai-in-web-development",
    title: "The Impact of AI on Modern Web Development",
    excerpt:
      "Discover how artificial intelligence is transforming the web development landscape.",
    content: `
      <p>Artificial Intelligence is reshaping how we approach web development. From automated testing to intelligent design systems, AI&apos;s influence is growing rapidly. In this article, we&apos;ll explore how AI is changing web development and what it means for developers.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Development environments are becoming smarter with AI integrations:</p>
      
      <h3>1. Intelligent Code Completion</h3>
      <p>Tools like GitHub Copilot use AI to suggest code as you type, significantly speeding up development:</p>
      
      <pre><code>// Start typing and AI suggests completions
function calculateTotalPrice(items) {
  // AI might suggest the implementation
}</code></pre>
      
      <h3>2. Automated Bug Detection</h3>
      <p>AI systems can identify potential bugs before code is even deployed:</p>
      
      <pre><code>// AI might flag potential issues
if (user.isLoggedIn == true) { // AI flags unnecessary equality check
  // Code here
}</code></pre>
      
      <h2>AI in Design Systems</h2>
      
      <h3>1. Generating UI Components</h3>
      <p>AI can now generate entire UI components from simple descriptions:</p>
      
      <pre><code>// Example of an AI-generated component from description
// &quot;Create a card component with an image, title, and description&quot;</code></pre>
      
      <h3>2. Design-to-Code Conversion</h3>
      <p>Tools can convert design mockups directly into functional code:</p>
      
      <pre><code>&lt;div className=&quot;card&quot;&gt;
  &lt;img src=&quot;product.jpg&quot; alt=&quot;Product&quot;&gt;
  &lt;h3&gt;Product Name&lt;/h3&gt;
  &lt;p&gt;Product description goes here...&lt;/p&gt;
  &lt;button&gt;Add to Cart&lt;/button&gt;
&lt;/div&gt;</code></pre>
      
      <h2>Personalization Through AI</h2>
      <p>AI enables sophisticated user personalization:</p>
      
      <h3>1. Dynamic Content</h3>
      <p>Websites can adapt content based on user behavior and preferences:</p>
      
      <pre><code>// Pseudocode for AI-driven content selection
function displayRecommendedContent(user) {
  const userPreferences = analyzeUserBehavior(user.id);
  const recommendedContent = aiRecommendationEngine.getRecommendations(userPreferences);
  renderContent(recommendedContent);
}</code></pre>
      
      <h3>2. Chatbots and Assistants</h3>
      <p>AI-powered conversational interfaces are becoming more sophisticated:</p>
      
      <pre><code>// Example bot configuration
const chatbot = new AIAssistant({
  knowledgeBase: &apos;company-products&apos;,
  personalityType: &apos;helpful&apos;,
  capabilities: [&apos;orderLookup&apos;, &apos;productRecommendations&apos;, &apos;support&apos;]
});</code></pre>
      
      <h2>The Future: AI-Generated Websites</h2>
      <p>We&apos;re entering an era where entire websites can be generated from descriptions:</p>
      
      <pre><code>// Example of a prompt for AI website generation
generateWebsite({
  type: &apos;ecommerce&apos;,
  products: &apos;handmade jewelry&apos;,
  style: &apos;minimalist&apos;,
  colorScheme: &apos;earth tones&apos;,
  features: [&apos;product gallery&apos;, &apos;shopping cart&apos;, &apos;user reviews&apos;]
});</code></pre>
      
      <h2>Ethical Considerations</h2>
      <p>As AI becomes more prevalent in web development, we must consider:</p>
      
      <ul>
        <li>Accessibility implications of AI-generated content</li>
        <li>Bias in AI systems that might affect user experiences</li>
        <li>Privacy concerns with data used to train AI models</li>
        <li>Job displacement and the changing role of web developers</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>AI is not replacing web developers but transforming how we work. By embracing these tools while maintaining human oversight and creativity, we can build better web experiences more efficiently than ever before.</p>
    `,
    author,
    category: "Technology",
    tags: ["AI", "Web Development", "Future Tech", "Machine Learning"],
    publishDate: "2023-09-15",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];
