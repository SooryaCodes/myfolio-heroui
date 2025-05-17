"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { RevealOnScroll } from "@/components/scroll-animations";
import { scrollToSection } from "@/components/scroll-provider";
import { FiCode, FiLayout, FiPenTool, FiDatabase, FiGlobe, FiSmartphone, FiArrowRight, FiCheck, FiPlus, FiX } from "react-icons/fi";
import Image from "next/image";

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
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1480&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1470&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1470&auto=format&fit=crop"
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
            boxShadow: isHovered ? `0 20px 40px -20px ${service.color.split(" ")[1]}30` : "0 10px 30px -15px rgba(0,0,0,0.1)"
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
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-30 mix-blend-overlay`}></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            <div className="absolute top-4 left-4 glass-premium p-2 px-3 rounded-full border border-white/10">
              <div className="text-white text-sm font-medium flex items-center gap-2">
                {service.icon}
                <span>{service.title}</span>
              </div>
            </div>
            
            <motion.div 
              className="absolute bottom-4 right-4"
              whileHover={{ scale: 1.05 }}
            >
              <Button
                size="sm"
                color="primary"
                variant="flat"
                radius="full"
                className="glass-premium border border-primary/20"
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
                  className="flex items-start gap-2"
                >
                  <div className="p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                    <FiCheck size={12} />
                  </div>
                  <span className="text-muted text-sm">{feature}</span>
                </div>
              ))}
              
              {service.features.length > 3 && (
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  className="mt-2 w-full justify-center"
                  endContent={<FiArrowRight size={14} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  {service.features.length - 3} more features
                </Button>
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
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-30 mix-blend-overlay`}></div>
                
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
                
                <div className="absolute bottom-8 left-8 glass-premium p-4 rounded-xl border border-white/10 max-w-md">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4`}>
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
                          className="flex items-start gap-3 glass-premium p-3 rounded-lg border border-border"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
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
                            className="glass-premium p-4 rounded-lg border border-border"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
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
                      className="w-full"
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
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white transform group-hover:scale-110">
            {icon}
          </div>
          <h4 className="text-xl font-bold text-foreground mb-3">{title}</h4>
          <p className="text-muted text-sm">{description}</p>
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
            <Card className="glass-premium border border-primary/10 max-w-3xl mx-auto">
              <CardBody className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Need a custom solution?</h3>
                <p className="text-muted mb-6 max-w-lg mx-auto">
                  Let's discuss your project requirements and create something exceptional together.
                </p>
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
              </CardBody>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}; 