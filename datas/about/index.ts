// About page data types
export interface TimelineItem {
  title: string;
  period: string;
  description: string;
}

export interface InterestItem {
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  longBio: string;
  image: string;
  email: string;
  resumeLink: string;
  timeline: TimelineItem[];
  interests: InterestItem[];
  skills: {
    technical: string[];
    design: string[];
    soft: string[];
  };
  location: string;
}

// About page data
export const aboutData: AboutData = {
  name: "Johan Beker",
  title: "Developer & Designer",
  bio: "I&apos;m a passionate developer and designer with over 8 years of experience creating exceptional digital experiences.",
  longBio:
    "I&apos;m a passionate developer and designer with over 8 years of experience creating exceptional digital experiences. I specialize in building modern web applications, mobile apps, and crafting user-centered designs. My journey in technology began at a young age when I first discovered the power of creating things with code. Since then, I&apos;ve worked with startups, agencies, and established companies to deliver products that users love.",
  image:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  email: "johan.beker@example.com",
  resumeLink: "/resume.pdf",
  timeline: [
    {
      title: "Senior Developer",
      period: "2021 - Present",
      description:
        "Currently working as a senior developer at TechFusion, leading the front-end development team and implementing cutting-edge technologies for various client projects.",
    },
    {
      title: "Full Stack Developer",
      period: "2018 - 2021",
      description:
        "Worked as a full stack developer at WebCraft, responsible for developing and maintaining web applications using React, Node.js, and various database technologies.",
    },
    {
      title: "UI/UX Designer",
      period: "2016 - 2018",
      description:
        "Began my career as a UI/UX designer at DesignHub, where I created user interfaces and experiences for mobile and web applications.",
    },
    {
      title: "Computer Science Degree",
      period: "2012 - 2016",
      description:
        "Completed my Bachelor&apos;s degree in Computer Science from Berlin Technical University, focusing on software development and human-computer interaction.",
    },
  ],
  interests: [
    {
      title: "Photography",
      description:
        "I love capturing moments through photography, especially landscapes and street photography.",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      title: "Travel",
      description:
        "Exploring new countries and cultures is one of my greatest passions and sources of inspiration.",
      icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Reading",
      description:
        "I&apos;m an avid reader of science fiction, technology books, and design thinking literature.",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
  ],
  skills: {
    technical: [
      "JavaScript/TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "REST APIs",
      "Redux",
      "AWS",
      "Docker",
      "Git",
      "CI/CD",
    ],
    design: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Sketch",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Responsive Design",
      "Accessibility",
      "Animation",
    ],
    soft: [
      "Team Leadership",
      "Project Management",
      "Communication",
      "Problem Solving",
      "Time Management",
      "Agile/Scrum",
      "Client Relations",
      "Mentoring",
    ],
  },
  location: "Berlin, Germany",
};
