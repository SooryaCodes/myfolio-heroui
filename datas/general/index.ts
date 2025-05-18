// General site data types
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface DeveloperInfo {
  name: string;
  role: string;
  about: string;
  avatar: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

export interface SiteConfig {
  title: string;
  description: string;
  themeColor: string;
  darkThemeColor: string;
  logo: string;
}

// Developer information
export const developerInfo: DeveloperInfo = {
  name: "Johan Beker",
  role: "Developer & Designer",
  about:
    "A passionate developer and designer creating beautiful and functional digital experiences for clients worldwide.",
  avatar:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
  contactInfo: {
    email: "johan.beker@example.com",
    phone: "+49 (234) 567-890",
    location: "Berlin, Germany",
  },
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "FiGithub",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "FiTwitter",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "FiLinkedin",
    },
  ],
};

// Site configuration
export const siteConfig: SiteConfig = {
  title: "Johan Beker | Developer & Designer",
  description:
    "Portfolio website featuring projects, skills, and services in web development and design.",
  themeColor: "#6d28d9", // Purple color for light theme
  darkThemeColor: "#8b5cf6", // Lighter purple for dark theme
  logo: "/logos/logo.svg",
};

// Navigation configuration
export const navItems = [
  { id: "hero", path: "/", label: "Home", icon: "FiHome" },
  { id: "about", path: "/about", label: "About", icon: "FiUser" },
  { id: "projects", path: "/projects", label: "Projects", icon: "FiGrid" },
  { id: "skills", path: "/skills", label: "Skills", icon: "FiCode" },
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    icon: "FiBriefcase",
  },
  { id: "blog", path: "/blog", label: "Blog", icon: "FiBookOpen" },
  {
    id: "marketplace",
    path: "/marketplace",
    label: "Market",
    icon: "FiShoppingBag",
  },
  {
    id: "contact",
    path: "/contact",
    label: "Contact",
    icon: "FiMessageCircle",
  },
];
