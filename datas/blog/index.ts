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
    title: "Getting Started with Next.js: A Beginner&apos;s Guide",
    excerpt: "Learn the basics of Next.js and how to create your first app with this popular React framework.",
    content: `
      <p>Next.js has become one of the most popular frameworks for building React applications. It provides a great developer experience with features like server-side rendering, static site generation, and easy API routes. In this guide, we&apos;ll walk through the basics of getting started with Next.js.</p>
      
      <h2>What is Next.js?</h2>
      <p>Next.js is a React framework that enables functionality like server-side rendering, static site generation, and API routes. It&apos;s designed to provide the best developer experience with all the features you need for production.</p>
      
      <h2>Setting Up Your First Next.js Project</h2>
      <p>To create a new Next.js app, you can use the following command:</p>
      
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This will set up a new Next.js project with a default template. You can then navigate to the project directory and start the development server:</p>
      
      <pre><code>cd my-next-app
npm run dev</code></pre>
      
      <p>Your Next.js app will now be running at <a href="http://localhost:3000">http://localhost:3000</a>.</p>
      
      <h2>Pages in Next.js</h2>
      <p>Next.js uses a file-system based router. Each file in the &apos;pages&apos; directory becomes a route in your application. For example, if you create a file at &apos;pages/about.js&apos;, it will be accessible at &apos;/about&apos;.</p>
      
      <p>Here&apos;s a simple example of a page component:</p>
      
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
      
      <p>Here&apos;s an example using getStaticProps:</p>
      
      <pre><code>export async function getStaticProps() {
  const res = await fetch(&apos;https://api.example.com/data&apos;);
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
      <p>Next.js provides a great foundation for building modern web applications with React. Its features like server-side rendering, static site generation, and API routes make it a powerful choice for developers. As you continue learning, you&apos;ll discover more advanced features that can help you build better applications.</p>
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
      <p>CSS Grid Layout has revolutionized how we create web layouts. In this post, we&apos;ll explore some advanced techniques and best practices for working with CSS Grid.</p>
      
      <h2>Why CSS Grid?</h2>
      <p>CSS Grid Layout provides a two-dimensional layout system for the web, making it possible to lay out items in rows and columns. Unlike Flexbox, which is mostly one-dimensional, Grid is designed for two-dimensional layouts.</p>
      
      <h2>Basic Grid Setup</h2>
      <p>To create a basic grid, you need to set the display property to &apos;grid&apos; on the container element:</p>
      
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
    &quot;header header header&quot;
    &quot;sidebar content content&quot;
    &quot;footer footer footer&quot;;
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
      <p>React Hooks have transformed how we manage state in React applications. In this article, we&apos;ll explore effective patterns for state management using hooks.</p>
      
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
      <p>Here&apos;s a quick guide on when to use different hooks for state management:</p>
      
      <ul>
        <li><strong>useState</strong>: For simple state that doesn&apos;t require complex logic.</li>
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
    slug: "ai-in-web-development",
    title: "The Impact of AI on Modern Web Development",
    excerpt: "Discover how artificial intelligence is transforming the web development landscape.",
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
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]; 