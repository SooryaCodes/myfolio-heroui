"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { RevealOnScroll } from "@/components/scroll-animations";
import { scrollToSection } from "@/components/scroll-provider";
import { FiCode, FiLayout, FiPenTool, FiDatabase, FiGlobe, FiSmartphone, FiArrowRight, FiCheck } from "react-icons/fi";
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
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
    image: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1470&auto=format&fit=crop"
  }
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
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
      className="py-24 md:py-32 relative overflow-hidden section-light"
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
          <div className="text-center mb-16 md:mb-24">
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
        
        {/* Full-width service cards */}
        <div className="space-y-24 mb-24">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20 mix-blend-overlay`}></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 grid-pattern opacity-10"></div>
                  
                  <div className="absolute bottom-6 left-6 glass-premium p-3 rounded-xl border border-white/10">
                    <div className="text-white font-medium flex items-center gap-2">
                      {service.icon}
                      <span>{service.title}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card className="glass-premium border border-border">
                  <CardHeader className="flex gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    </div>
                  </CardHeader>
                  
                  <CardBody>
                    <p className="text-muted mb-6">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="p-1 rounded-full bg-primary/10 text-primary">
                            <FiCheck size={14} />
                          </div>
                          <span className="text-muted text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                  
                  <CardFooter>
                    <Button
                      color="primary"
                      variant="flat"
                      radius="full"
                      endContent={<FiArrowRight />}
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Additional services in grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
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
              <Card 
                key={idx} 
                className="glass-premium border border-border hover-lift group transition-all duration-500"
              >
                <CardBody className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
                  <p className="text-muted text-sm">{item.description}</p>
                </CardBody>
              </Card>
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