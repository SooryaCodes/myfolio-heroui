"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { RevealOnScroll } from "@/components/scroll-animations";
import { Avatar } from "@heroui/avatar";
import { FiArrowRight, FiArrowLeft, FiStar, FiCornerUpRight, FiMessageCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  logo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Chen",
    role: "CEO",
    company: "Vertex Innovations",
    content: "Johan delivered an exceptional website that perfectly captures our brand identity. His attention to detail and ability to translate our vision into a seamless digital experience exceeded our expectations. The site has significantly increased our conversion rates and user engagement.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Marcus Reynolds",
    role: "Product Director",
    company: "Pulse Analytics",
    content: "Working with Johan was a game-changer for our product. His technical expertise combined with an exceptional eye for design resulted in an interface that our users love. The custom animations and interactions he created have become a signature element of our brand.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=2101&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Elena Kowalski",
    role: "Marketing Director",
    company: "Nexus Media",
    content: "Johan&apos;s work on our e-commerce platform was transformative. He created a shopping experience that not only looks beautiful but converts at a much higher rate than our previous site. His insights on user experience and technical implementation were invaluable.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    rating: 4,
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Javier Mendez",
    role: "Founder",
    company: "AltitudeLabs",
    content: "We hired Johan to redesign our SaaS platform, and the results have been remarkable. He not only delivered a visually stunning interface but also improved the overall user flow, which has led to a 40% decrease in our customer support inquiries and a significant increase in user satisfaction scores.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=1887&auto=format&fit=crop",
  },
];

const TestimonialCard = ({ testimonial, isActive = false, onClick }: { testimonial: Testimonial, isActive?: boolean, onClick?: () => void }) => {
  return (
    <motion.div 
      className={`glass-premium rounded-2xl p-6 transition-all duration-500 ${
        isActive 
          ? "border-primary/30 shadow-lg" 
          : "hover:border-primary/20 cursor-pointer hover:shadow-lg"
      }`}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-tr from-primary/30 to-primary/5 rounded-full blur-sm opacity-70"
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror" 
            }}
          />
          <Avatar
            src={testimonial.image}
            className="w-14 h-14 border border-white/10"
            isBordered
            radius="full"
          />
        </div>
        <div>
          <h3 className="text-foreground font-medium">{testimonial.name}</h3>
          <p className="text-muted text-sm">{testimonial.role}, {testimonial.company}</p>
        </div>
        {testimonial.logo && (
          <div className="ml-auto">
            <div className="w-10 h-10 relative grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
              <Image src={testimonial.logo} alt={testimonial.company} fill className="object-contain" />
            </div>
          </div>
        )}
      </div>
      
      <blockquote className="mb-4 relative">
        <FiMessageCircle className="absolute -left-2 -top-2 text-primary/20 text-3xl opacity-50" />
        <p className="text-muted text-sm leading-relaxed line-clamp-4 pl-4">&quot;{testimonial.content}&quot;</p>
        {!isActive && (
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-background/80 to-transparent"></div>
        )}
      </blockquote>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar 
              key={i} 
              size={16}
              className={`${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted/20'}`} 
            />
          ))}
        </div>
        
        {!isActive && (
          <motion.div 
            whileHover={{ x: 5 }}
            className="text-primary/80 flex items-center gap-1 text-sm"
          >
            <span>Read more</span>
            <FiCornerUpRight size={14} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden section-dark"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-0 -right-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full z-0" 
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full z-0" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4 border border-primary/20 glass-premium"
            >
              <span className="px-2 py-0.5 text-primary">Clients&apos; Words</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6">Client Testimonials</h2>
            <p className="text-muted max-w-xl mx-auto text-lg">
              Feedback from clients who&apos;ve experienced the impact of my work firsthand.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured testimonial - Expanded view */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-premium rounded-2xl p-8 border border-primary/10 relative overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 blur-[60px] rounded-full z-0"></div>
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-primary/5 blur-[60px] rounded-full z-0"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <motion.div 
                        className="absolute -inset-1.5 bg-gradient-to-tr from-primary/40 to-primary/10 rounded-full blur-sm"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{ 
                          duration: 5, 
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "mirror" 
                        }}
                      />
                      <Avatar
                        src={activeTestimonial.image}
                        className="w-16 h-16 border-2 border-primary/20"
                        isBordered
                        radius="full"
                      />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-lg">{activeTestimonial.name}</h3>
                      <p className="text-muted text-sm">{activeTestimonial.role}, {activeTestimonial.company}</p>
                    </div>
                    {activeTestimonial.logo && (
                      <div className="ml-auto">
                        <div className="w-12 h-12 relative grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                          <Image src={activeTestimonial.logo} alt={activeTestimonial.company} fill className="object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <blockquote className="mb-8 relative">
                    <FiMessageCircle className="absolute -left-2 -top-3 text-primary/20 text-4xl opacity-50 rotate-12" />
                    <p className="text-foreground/80 text-lg leading-relaxed pl-6">&quot;{activeTestimonial.content}&quot;</p>
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`${i < activeTestimonial.rating ? 'text-primary fill-primary' : 'text-muted/30'}`} 
                          size={18}
                        />
                      ))}
                    </div>
                    
                    <motion.div 
                      className="flex glass-premium px-4 py-2 rounded-full"
                      animate={{ 
                        y: [0, -3, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop" 
                      }}
                    >
                      <button 
                        onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="text-muted hover:text-foreground transition-colors p-1"
                        aria-label="Previous testimonial"
                      >
                        <FiChevronLeft />
                      </button>
                      <div className="h-5 w-0.5 bg-primary/10 mx-2"></div>
                      <button 
                        onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                        className="text-muted hover:text-foreground transition-colors p-1"
                        aria-label="Next testimonial"
                      >
                        <FiChevronRight />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Pagination dots for mobile */}
            <div className="flex justify-center gap-2 lg:hidden mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted/20 hover:bg-muted/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Testimonial cards grid */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 