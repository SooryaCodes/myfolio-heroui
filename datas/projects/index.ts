// Project data types
export interface ProjectType {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  images: string[];
  link: string;
  github?: string;
  completed: string;
  client: string;
  featured?: boolean;
  tags?: string[];
  services?: string[];
  location?: string;
}

// Projects data array
export const projects: ProjectType[] = [
  {
    id: 1,
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description:
      "A modern portfolio website built with Next.js and Tailwind CSS.",
    fullDescription:
      "This modern portfolio website showcases my work and skills in web development. Built with Next.js for server-side rendering and Tailwind CSS for styling, it features smooth animations, responsive design, and optimized performance. The site includes project showcases, a blog section, and contact information.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1629934266257-69467879efa7?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1629934266257-69467879efa7?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1547119957-637f8679db1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    ],
    link: "https://example.com",
    github: "https://github.com/username/portfolio",
    completed: "2023-09-15",
    client: "Personal Project",
    featured: true,
    tags: ["Web", "Portfolio", "React", "Next.js", "Tailwind CSS"],
    services: ["Web Design", "Web Development", "UI/UX"],
    location: "Berlin, Germany",
  },
  {
    id: 2,
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A full-featured e-commerce platform with payment integration.",
    fullDescription:
      "A comprehensive e-commerce solution built for a fashion retailer. This platform includes product listings, search functionality, user accounts, shopping cart, and secure checkout with Stripe integration. The admin panel allows for easy product and order management.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1592839961530-17838c766df1?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1592839961530-17838c766df1?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    link: "https://shop-example.com",
    github: "https://github.com/username/ecommerce",
    completed: "2023-07-22",
    client: "Fashion Retailer Ltd.",
    featured: true,
    tags: ["E-commerce", "React", "Node.js", "Stripe", "MongoDB"],
    services: [
      "Web Design",
      "Web Development",
      "E-commerce",
      "Payment Integration",
    ],
    location: "Berlin, Germany",
  },
  {
    id: 3,
    slug: "mobile-fitness-app",
    title: "Mobile Fitness App",
    category: "Mobile Development",
    description:
      "A fitness tracking mobile application built with React Native.",
    fullDescription:
      "This fitness tracking app helps users monitor their workouts, set goals, and track progress over time. Built with React Native for cross-platform compatibility, it features workout plans, exercise demonstrations, progress charts, and social sharing capabilities.",
    technologies: ["React Native", "Firebase", "Redux", "Native APIs"],
    image: "https://images.unsplash.com/photo-1580983561252-463dca6ad904?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1580983561252-463dca6ad904?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    link: "https://play.google.com/store/apps/example",
    github: "https://github.com/username/fitness-app",
    completed: "2023-05-10",
    client: "Healthy Living Co.",
    featured: true,
    tags: ["Mobile", "React Native", "Fitness", "iOS", "Android", "Firebase"],
    services: [
      "Mobile App Design",
      "React Native Development",
      "Backend Integration",
      "Health & Fitness",
    ],
    location: "Berlin, Germany",
  },
  {
    id: 4,
    slug: "ai-content-generator",
    title: "AI Content Generator",
    category: "AI Development",
    description:
      "An AI-powered tool that generates high-quality content for marketing and blogs.",
    fullDescription:
      "This AI-powered content generator helps content creators and marketers produce high-quality text for blogs, social media, and marketing materials. Using advanced natural language processing, the tool can generate content based on simple prompts, adjust tone and style to match brand guidelines, and even optimize content for SEO. The platform includes a user-friendly interface for managing and editing generated content.",
    technologies: ["Python", "TensorFlow", "GPT-3", "React", "NextUI"],
    image: "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1673443214909-89df92c73549?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1655720035861-ba4fd1c31aaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    link: "https://ai-content-gen.example.com",
    github: "https://github.com/username/ai-content-generator",
    completed: "2023-08-05",
    client: "Digital Marketing Agency",
    featured: false,
    tags: ["AI", "Machine Learning", "Content Generation", "NLP", "SaaS"],
    services: [
      "AI Development",
      "Web Application",
      "Product Design",
      "API Development",
    ],
    location: "Berlin, Germany",
  },
  {
    id: 5,
    slug: "smart-home-automation",
    title: "Smart Home Automation System",
    category: "IoT Development",
    description:
      "An IoT system that connects and automates home devices with a user-friendly mobile and voice interface.",
    fullDescription:
      "This smart home automation system enables users to control and automate their home devices through a unified interface. The system includes a central hub that connects to various IoT devices, a mobile app for remote control, and voice integration with popular assistants like Alexa and Google Home. Features include scheduled routines, energy usage monitoring, and smart scenes based on user behavior.",
    technologies: ["IoT", "React Native", "Node.js", "MQTT", "AWS IoT"],
    image: "https://images.unsplash.com/photo-1706783988934-695dd8a52549?q=80&w=2216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1706783988934-695dd8a52549?q=80&w=2216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80",
      "https://images.unsplash.com/photo-1563459802257-2a97df940f11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    link: "https://smarthome-example.com",
    github: "https://github.com/username/smart-home",
    completed: "2023-06-15",
    client: "SmartLife Technologies",
    featured: false,
    tags: ["IoT", "Smart Home", "Mobile", "Voice Control", "Automation"],
    services: [
      "IoT Development",
      "Mobile App",
      "Hardware Integration",
      "Cloud Infrastructure",
    ],
    location: "Berlin, Germany",
  },
  {
    id: 6,
    slug: "ar-shopping-experience",
    title: "AR Shopping Experience",
    category: "AR Development",
    description:
      "An augmented reality application that allows users to visualize products in their space before purchasing.",
    fullDescription:
      "This augmented reality shopping application revolutionizes the online shopping experience by allowing users to visualize products in their own space before making a purchase. The app supports furniture, home decor, and fashion items with accurate size and appearance representation. Additional features include product customization, social sharing, and seamless integration with e-commerce platforms for direct purchases.",
    technologies: ["Unity", "ARKit/ARCore", "C#", "Blender", "RESTful API"],
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1640176706899-25b8ef1fdd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1583225214464-90552867f89f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    link: "https://ar-shop-example.com",
    github: "https://github.com/username/ar-shopping",
    completed: "2023-04-20",
    client: "Modern Retail Solutions",
    featured: true,
    tags: ["AR", "Mobile", "Unity", "3D", "E-commerce", "iOS", "Android"],
    services: [
      "AR Development",
      "3D Modeling",
      "Mobile App",
      "E-commerce Integration",
    ],
    location: "Berlin, Germany",
  },
];
