"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { RevealOnScroll } from "@/components/scroll-animations";
import { scrollToSection } from "@/components/scroll-provider";
import { FiCode, FiLayout, FiPenTool, FiDatabase, FiGlobe, FiSmartphone, FiArrowRight, FiCheck, FiPlus, FiX, FiExternalLink, FiLayers, FiMonitor, FiEdit, FiTrendingUp } from "react-icons/fi";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Divider } from "@heroui/divider";

interface ServiceFeature {
  title: string;
  description: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  detailedFeatures?: ServiceFeature[];
  image: string;
  details: {
    longDescription: string;
    features: string[];
    technologies: string[];
    process: string[];
  };
}

const services: Service[] = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Creating beautiful, intuitive interfaces that users love, with a focus on usability and aesthetic appeal.",
    icon: <FiPenTool className="text-2xl" />,
    color: "from-blue-500 to-purple-500",
    features: [
      "User Interface Design",
      "User Experience Design",
      "Wireframing & Prototyping",
      "Design Systems",
      "Interactive Prototypes",
    ],
    detailedFeatures: [
      {
        title: "User-Centered Design Approach",
        description: "I prioritize user needs through extensive research and testing to create interfaces that truly resonate with your target audience."
      },
      {
        title: "Consistent Design Systems",
        description: "I develop comprehensive design systems that ensure visual coherence and streamline the development process."
      },
      {
        title: "Interactive Prototyping",
        description: "I create high-fidelity interactive prototypes that simulate the real user experience before development begins."
      }
    ],
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1480&auto=format&fit=crop",
    details: {
      longDescription: "I create intuitive and visually appealing user interfaces that enhance user experience. My design approach balances aesthetics with functionality, ensuring that users can easily navigate and enjoy using your product.",
      features: [
        "User research and personas",
        "Wireframing and prototyping",
        "Visual design",
        "Interaction design",
        "Usability testing",
        "Design systems"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "Illustrator", "Protopie", "InVision"],
      process: [
        "User research",
        "Information architecture",
        "Wireframing",
        "Interactive prototyping",
        "Visual design",
        "Usability testing"
      ]
    }
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Building responsive, high-performance websites and applications with modern frameworks and best practices.",
    icon: <FiLayout className="text-2xl" />,
    color: "from-primary to-blue-500",
    features: [
      "React/Next.js Development",
      "Performance Optimization",
      "Responsive Layouts",
      "Animation & Interactions",
      "HTML/CSS/JavaScript",
    ],
    detailedFeatures: [
      {
        title: "Modern Framework Expertise",
        description: "I leverage the latest features of React and Next.js to build robust, scalable frontend architectures."
      },
      {
        title: "Performance-First Development",
        description: "I optimize every aspect of your application for speed, from code splitting to asset optimization."
      },
      {
        title: "Rich Interactive Experiences",
        description: "I craft smooth animations and intuitive interactions that elevate the user experience."
      }
    ],
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1470&auto=format&fit=crop",
    details: {
      longDescription: "I create custom web applications and websites that are fast, responsive, and user-friendly. Using modern technologies like React, Next.js, and Tailwind CSS, I build solutions that not only look great but also perform exceptionally well.",
      features: [
        "Custom website development",
        "Progressive Web Applications (PWAs)",
        "E-commerce solutions",
        "Content Management Systems",
        "API integrations",
        "Performance optimization"
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Express"],
      process: [
        "Requirements gathering and analysis",
        "UI/UX design",
        "Frontend and backend development",
        "Testing and quality assurance",
        "Deployment and maintenance"
      ]
    }
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Crafting robust server-side solutions that power your applications with security and scalability in mind.",
    icon: <FiDatabase className="text-2xl" />,
    color: "from-green-500 to-emerald-500",
    features: [
      "API Development",
      "Database Design",
      "Authentication & Authorization",
      "Cloud Infrastructure",
      "Performance Optimization",
    ],
    detailedFeatures: [
      {
        title: "Scalable API Architecture",
        description: "I design and implement APIs that can grow with your business, ensuring they remain performant under increasing load."
      },
      {
        title: "Secure Authentication Systems",
        description: "I implement robust authentication and authorization solutions that protect your users and data."
      },
      {
        title: "Optimized Database Solutions",
        description: "I create efficient database schemas and queries that maximize performance while maintaining data integrity."
      }
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    details: {
      longDescription: "I build secure, scalable, and maintainable backend systems that power web and mobile applications. From RESTful APIs to real-time services, I can create the server-side solutions your project needs.",
      features: [
        "RESTful API development",
        "Database design and optimization",
        "Authentication and authorization",
        "Server-side rendering",
        "Real-time services",
        "Microservices architecture"
      ],
      technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "Redis"],
      process: [
        "System architecture design",
        "Database schema design",
        "API development",
        "Security implementation",
        "Performance optimization",
        "Documentation"
      ]
    }
  },
  {
    id: 4,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android using React Native and Flutter.",
    icon: <FiSmartphone className="text-primary text-3xl" />,
    color: "from-teal-500 to-emerald-500",
    features: [
      "Native iOS and Android development",
      "Cross-platform development",
      "Mobile UI/UX design",
      "Push notifications",
      "Offline capabilities",
      "App Store optimization"
    ],
    detailedFeatures: [],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1470&auto=format&fit=crop",
    details: {
      longDescription: "I develop high-quality mobile applications for both iOS and Android platforms. Whether you need a native app or a cross-platform solution, I can create a mobile experience that your users will love.",
      features: [
        "Native iOS and Android development",
        "Cross-platform development",
        "Mobile UI/UX design",
        "Push notifications",
        "Offline capabilities",
        "App Store optimization"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "SQLite"],
      process: [
        "Requirements analysis",
        "Wireframing and prototyping",
        "UI/UX design",
        "Development and testing",
        "App store submission",
        "Maintenance and updates"
      ]
    }
  },
  {
    id: 5,
    title: "Full-Stack Development",
    description: "End-to-end development services covering both frontend and backend aspects of your project.",
    icon: <FiLayers className="text-primary text-3xl" />,
    color: "from-pink-500 to-purple-500",
    features: [
      "End-to-end application development",
      "Frontend and backend integration",
      "Database design and management",
      "API development",
      "Authentication and security",
      "Deployment and DevOps"
    ],
    detailedFeatures: [],
    image: "https://images.unsplash.com/photo-1517694712202-1482b7e1a5f8?q=80&w=1470&auto=format&fit=crop",
    details: {
      longDescription: "As a full-stack developer, I can handle all aspects of your project from the user interface to the server infrastructure. This integrated approach ensures a cohesive product with seamless interaction between all components.",
      features: [
        "End-to-end application development",
        "Frontend and backend integration",
        "Database design and management",
        "API development",
        "Authentication and security",
        "Deployment and DevOps"
      ],
      technologies: ["JavaScript/TypeScript", "React", "Node.js", "Express", "MongoDB/PostgreSQL", "AWS/GCP"],
      process: [
        "Project planning and architecture",
        "Frontend development",
        "Backend development",
        "Integration and testing",
        "Deployment configuration",
        "Maintenance and support"
      ]
    }
  },
  {
    id: 6,
    title: "Performance Optimization",
    description: "Speed up your existing applications by identifying and fixing performance bottlenecks.",
    icon: <FiTrendingUp className="text-primary text-3xl" />,
    color: "from-yellow-500 to-orange-500",
    features: [
      "Performance auditing",
      "Code optimization",
      "Image and asset optimization",
      "Caching strategies",
      "Database query optimization",
      "Load time reduction"
    ],
    detailedFeatures: [],
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1470&auto=format&fit=crop",
    details: {
      longDescription: "I help optimize the performance of existing web and mobile applications by identifying bottlenecks and implementing solutions to improve speed, responsiveness, and resource usage.",
      features: [
        "Performance auditing",
        "Code optimization",
        "Image and asset optimization",
        "Caching strategies",
        "Database query optimization",
        "Load time reduction"
      ],
      technologies: ["Lighthouse", "Chrome DevTools", "WebPageTest", "React Profiler", "Database Query Analyzers", "Bundle Analyzers"],
      process: [
        "Performance benchmarking",
        "Bottleneck identification",
        "Solution implementation",
        "A/B testing",
        "Monitoring and analytics",
        "Documentation and handover"
      ]
    }
  }
];

// 3D Service Card component with mouse tracking
const Service3DCard = ({ service, index }: { service: Service, index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateXVal = ((mouseY - height / 2) / height) * 10;
    const rotateYVal = ((width / 2 - mouseX) / width) * 10;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };
  
  const resetRotation = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetRotation}
      >
        <motion.div
          className="glass-premium border border-border rounded-xl overflow-hidden h-full transition-all duration-500"
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            boxShadow: isHovered 
              ? `0 20px 40px -20px ${service.color.split(" ")[1]}50, 0 0 15px ${service.color.split(" ")[1]}20` 
              : "0 10px 30px -15px rgba(0,0,0,0.1)"
          }}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image 
              src={service.image} 
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700"
              style={{ 
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)"
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-40 mix-blend-overlay transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-30'}`}></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            <div className="absolute top-4 left-4 glass-premium p-2 px-3 rounded-full border border-white/10 backdrop-blur-md">
              <div className="text-white text-sm font-medium flex items-center gap-2">
                {service.icon}
                <span>{service.title}</span>
              </div>
            </div>
            
            <motion.div 
              className="absolute bottom-4 right-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                color="primary"
                variant="flat"
                radius="full"
                className="glass-premium border border-primary/20 shadow-lg shadow-primary/20"
                endContent={<FiPlus />}
                onClick={() => setIsModalOpen(true)}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted text-sm mb-5">{service.description}</p>
            
            <div className="space-y-2">
              {service.features.slice(0, 3).map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 group"
                >
                  <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <FiCheck size={12} />
                  </div>
                  <span className="text-muted text-sm transition-colors duration-300 group-hover:text-foreground">{feature}</span>
                </div>
              ))}
              
              {service.features.length > 3 && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    className="mt-2 w-full justify-center font-medium"
                    endContent={<FiArrowRight size={14} />}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {service.features.length - 3} more features
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Detailed service modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              className="fixed top-[10%] left-[10%] right-[10%] bottom-[10%] z-50 flex flex-col lg:flex-row glass-premium border border-border rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="lg:w-1/2 h-1/3 lg:h-full relative">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-40 mix-blend-overlay`}></div>
                
                <div className="absolute top-4 right-4">
                  <Button
                    isIconOnly
                    size="sm"
                    color="default"
                    variant="flat"
                    radius="full"
                    className="glass-premium"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <FiX />
                  </Button>
                </div>
                
                <div className="absolute bottom-8 left-8 glass-premium p-4 rounded-xl border border-white/10 max-w-md backdrop-blur-md">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/80">{service.description}</p>
                </div>
              </div>
              
              <div className="flex-1 p-8 md:p-10 overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-start gap-3 glass-premium p-3 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        >
                          <div className="p-1.5 rounded-full bg-primary/10 text-primary mt-0.5">
                            <FiCheck size={16} />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {service.detailedFeatures && (
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-4">What I Offer</h4>
                      <div className="space-y-4">
                        {service.detailedFeatures.map((feature, idx) => (
                          <motion.div 
                            key={idx}
                            className="glass-premium p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          >
                            <h5 className="text-lg font-medium text-foreground mb-2">{feature.title}</h5>
                            <p className="text-muted">{feature.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      size="lg"
                      endContent={<FiArrowRight />}
                      className="w-full shadow-lg shadow-primary/10"
                      onClick={() => {
                        setIsModalOpen(false);
                        scrollToSection("contact");
                      }}
                    >
                      Discuss Your Project
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Additional services card with hover effect
const AdditionalServiceCard = ({ icon, title, description, index }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Card 
        className="glass-premium border border-border hover-lift group transition-all duration-500 h-full"
      >
        <CardBody className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white transform group-hover:scale-110 shadow-lg shadow-primary/5 group-hover:shadow-primary/15">
            {icon}
          </div>
          <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{title}</h4>
          <p className="text-muted text-sm">{description}</p>
          
          <div className="mt-5 pt-5 border-t border-border/50 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Button
              variant="light"
              color="primary"
              radius="full"
              className="w-full"
              size="sm"
              endContent={<FiArrowRight size={14} />}
              onClick={() => scrollToSection("contact")}
            >
              Learn More
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section 
      id="services" 
      className="py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0" />
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-40 -left-40 w-80 h-80 bg-primary/5 blur-[100px] rounded-full z-0" 
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-40 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full z-0" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10 px-6">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4 border border-primary/20 glass-premium"
            >
              <span className="px-2 py-0.5 text-primary">What I Offer</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              My Services
            </h2>
            <p className="text-muted max-w-xl mx-auto text-lg">
              I provide comprehensive solutions tailored to your unique needs, helping you build exceptional digital experiences.
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Service cards in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <Service3DCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
        
        {/* Additional services in grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Additional Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiGlobe className="text-2xl" />,
                title: "Web Applications",
                description: "Full-stack web apps with exceptional UX and business value"
              },
              {
                icon: <FiSmartphone className="text-2xl" />,
                title: "Mobile Development",
                description: "Cross-platform mobile apps that provide native-like experiences"
              },
              {
                icon: <FiCode className="text-2xl" />,
                title: "Custom Solutions",
                description: "Tailored development for your unique business challenges"
              }
            ].map((item, idx) => (
              <AdditionalServiceCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={idx}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Call to action */}
        <div className="text-center">
          <RevealOnScroll>
            <Card className="glass-premium border border-primary/10 max-w-3xl mx-auto overflow-hidden">
              <div className="relative">
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0"></div>
                <div className="absolute w-60 h-60 rounded-full bg-primary/10 blur-[80px] -top-20 -right-20 z-0 animate-float"></div>
                <div className="absolute w-40 h-40 rounded-full bg-secondary/10 blur-[60px] -bottom-10 -left-10 z-0 animate-float-slow"></div>
                
                <CardBody className="p-8 lg:p-12 text-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <FiCode className="text-primary text-2xl" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">Ready to Transform Your Digital Presence?</h3>
                    <p className="text-muted mb-8 max-w-lg mx-auto">
                      I&apos;m available for freelance projects and full-time opportunities. Let&apos;s discuss how we can create something exceptional together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        color="primary"
                        variant="flat"
                        radius="full"
                        size="lg"
                        endContent={<FiArrowRight />}
                        className="px-8 font-medium"
                        onClick={() => scrollToSection("contact")}
                      >
                        Get in Touch
                      </Button>
                      <Button
                        color="default"
                        variant="flat"
                        radius="full"
                        size="lg"
                        className="px-8 font-medium"
                        endContent={<FiExternalLink />}
                        onClick={() => scrollToSection("projects")}
                      >
                        View My Work
                      </Button>
                    </div>
                  </motion.div>
                </CardBody>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </div>

      {/* Service Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        backdrop="blur"
        size="3xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-background/80 backdrop-blur-md border border-foreground/10",
          header: "border-b border-foreground/10",
          body: "py-6",
          footer: "border-t border-foreground/10"
        }}
      >
        <ModalContent>
          {selectedService && (
            <>
              <ModalHeader className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <h3 className="text-xl font-bold">{selectedService.title}</h3>
              </ModalHeader>
              <ModalBody>
                <p className="text-foreground/80 mb-6">
                  {selectedService.details.longDescription}
                </p>
                
                <h4 className="text-lg font-semibold mb-3 text-foreground">Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 list-disc list-inside text-foreground/70">
                  {selectedService.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                
                <Divider className="my-6" />
                
                <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedService.details.technologies.map((tech, index) => (
                    <Badge key={index} variant="flat" color="primary" className="bg-primary/10 font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Divider className="my-6" />
                
                <h4 className="text-lg font-semibold mb-3 text-foreground">My Process</h4>
                <ol className="list-decimal list-inside text-foreground/70 space-y-2">
                  {selectedService.details.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={closeModal}
                >
                  Got it
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}; 