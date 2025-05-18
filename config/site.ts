export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Johan Beker Portfolio",
  description:
    "Premium portfolio showcasing the work of Johan Beker, a developer and designer specializing in creating exceptional digital experiences.",
  url: "https://johanbeker.dev", // Your actual domain
  ogImage: "/images/og-image.jpg",
  twitterImage: "/images/twitter-image.jpg",
  twitterHandle: "@johanbeker", // Your actual Twitter handle
  author: "Johan Beker",
  email: "johan.beker@example.com", // Your actual email
  location: "Berlin, Germany", // Your actual location
  jobTitle: "Full-Stack Developer & Designer",
  
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Skills",
      href: "/skills",
    },
    {
      label: "Experience",
      href: "/experience",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Skills",
      href: "/skills",
    },
    {
      label: "Experience",
      href: "/experience",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Resume",
      href: "/resume",
    },
  ],
  links: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    portfolio: "https://yourportfolio.com",
    email: "mailto:your.email@example.com",
  },
  // Additional metadata for SEO and previews
  keywords: [
    "web development",
    "frontend development",
    "UI/UX design",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "portfolio",
    "developer",
    "designer"
  ],
  locale: "en_US",
  type: "website",
};
