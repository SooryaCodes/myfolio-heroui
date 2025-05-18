"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Spacer } from "@heroui/spacer";
import { Avatar } from "@heroui/avatar";
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from "react-icons/fi";
import { MagneticButton, GlowButton } from "@/components/magnetic-button";
import { scrollToSection } from "@/components/scroll-provider";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Animated text cycling component with enhanced effects
const TextCycle = ({ phrases, className = "" }: { phrases: string[], className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [phrases.length]);
  
  if (!mounted) {
    return <span className={className}>{phrases[0]}</span>;
  }
  
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentPhrase}
          className="inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {phrases[currentPhrase]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Developer name - centralized for consistency
  const developerName = "Johan Beker";
  const developerLocation = "Berlin, Germany";
  
  // Smooth spring animation for mouse movement
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 300 });
  
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate mouse position relative to center of container
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Animate elements based on mouse position
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);
  
  // Parallax elements movement
  const layer1X = useTransform(smoothMouseX, [-0.5, 0.5], ["-5%", "5%"]);
  const layer1Y = useTransform(smoothMouseY, [-0.5, 0.5], ["-5%", "5%"]);
  
  const layer2X = useTransform(smoothMouseX, [-0.5, 0.5], ["-10%", "10%"]);
  const layer2Y = useTransform(smoothMouseY, [-0.5, 0.5], ["-10%", "10%"]);
  
  // Skill cycles
  const skills = ["Full Stack Developer", "UI Designer", "UX Architect", "React Expert", "Next.js Developer"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.85 } },
  };

  // Simple non-animated version for server-side rendering
  if (!mounted) {
    return (
      <section 
        id="hero"
        className="min-h-screen flex items-center justify-center px-6 md:px-8 relative overflow-hidden pt-24 pb-16"
      >
        <div className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(var(--color-foreground),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.05)_1px,transparent_1px)]"
        )} />
        
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="max-w-7xl mx-auto w-full z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Badge className="mb-6 border border-primary/20 glass-premium" variant="flat" color="primary" size="lg">
                <span className="px-2 py-1 text-primary">Developer & Designer</span>
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-foreground">
                {developerName} <span className="text-primary premium-highlight">Digital</span> Experiences with Precision
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted mb-6">
                I&apos;m a <span className="text-primary font-semibold">{skills[0]}</span>
              </h2>
              
              <p className="text-lg text-muted mb-8 max-w-xl">
                I create immersive digital experiences through intuitive designs and clean code, 
                helping brands connect with their audience in meaningful ways.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  className="btn-premium font-medium px-8 py-6 rounded-full"
                  size="lg"
                  variant="flat"
                  color="primary"
                >
                  Explore My Work <FiArrowRight className="ml-2" />
                </Button>
                
                <Button
                  className="px-8 py-6 rounded-full border border-primary/20 text-primary font-medium hover:bg-primary/5"
                  variant="ghost"
                  size="lg"
                >
                  About Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 md:px-8 relative overflow-hidden pt-24 pb-16"
    >
      {/* Modern Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(var(--color-foreground),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.05)_1px,transparent_1px)]"
        )}
      />
      
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px] dark:bg-primary/5 z-0"
        style={{ 
          x: layer1X,
          y: layer1Y,
          top: "30%",
          right: "0%",
        }}
      />
      
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[60px] z-0"
        style={{ 
          x: layer2X,
          y: layer2Y,
          bottom: "10%",
          left: "5%",
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Text content - 7 columns */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.div variants={item}>
              <Badge 
                className="mb-6 border border-primary/20 glass-premium" 
                variant="flat" 
                color="primary" 
                size="lg"
              >
                <span className="px-2 py-1 text-primary">Developer & Designer</span>
              </Badge>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-foreground"
              style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d",
              }}
            >
              {developerName} <span className="text-primary premium-highlight">Digital</span> Experiences with Precision
            </motion.h1>
            
            <motion.h2
              variants={item}
              className="text-2xl md:text-3xl relative lg:text-4xl font-medium text-muted mb-6"
            >
              I&apos;m a <TextCycle phrases={skills} className="text-primary top-2 font-semibold" />
            </motion.h2>

            <motion.p 
              variants={item} 
              className="text-lg text-muted mb-8 max-w-xl"
              style={{
                x: translateX,
                y: translateY,
              }}
            >
              I create immersive digital experiences through intuitive designs and clean code, 
              helping brands connect with their audience in meaningful ways.
            </motion.p>

            <motion.div 
              variants={item} 
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="btn-premium font-medium px-8 py-6 rounded-full"
                size="lg"
                variant="flat"
                color="primary"
              >
                Explore My Work <FiArrowRight className="ml-2" />
              </Button>
              
              <Button
                onClick={() => scrollToSection("about")}
                className="px-8 py-6 rounded-full border border-primary/20 text-primary font-medium hover:bg-primary/5"
                variant="ghost"
                size="lg"
              >
                About Me
              </Button>
            </motion.div>

            <motion.div 
              variants={item} 
              className="flex items-center gap-6 mt-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-primary/80 to-transparent"></div>
              <div className="flex gap-6">
                <Link
                  isExternal
                  href="https://github.com/yourusername"
                  className="group"
                  aria-label="GitHub"
                >
                  <div className="glass-premium p-3 rounded-full transition-all duration-300 relative overflow-hidden">
                    <FiGithub className="text-muted group-hover:text-primary transition-colors duration-300" size={20} />
                    <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></div>
                  </div>
                </Link>
                <Link
                  isExternal
                  href="https://twitter.com/yourusername"
                  className="group"
                  aria-label="Twitter"
                >
                  <div className="glass-premium p-3 rounded-full transition-all duration-300 relative overflow-hidden">
                    <FiTwitter className="text-muted group-hover:text-primary transition-colors duration-300" size={20} />
                    <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></div>
                  </div>
                </Link>
                <Link
                  isExternal
                  href="https://linkedin.com/in/yourusername"
                  className="group"
                  aria-label="LinkedIn"
                >
                  <div className="glass-premium p-3 rounded-full transition-all duration-300 relative overflow-hidden">
                    <FiLinkedin className="text-muted group-hover:text-primary transition-colors duration-300" size={20} />
                    <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image content - 5 columns */}
          <motion.div 
            className="lg:col-span-5 hidden lg:flex justify-center lg:justify-end relative mt-8 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative w-full max-w-md">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-8 -left-8 w-24 h-24 border border-primary/20 rounded-full z-10 hidden sm:block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              <motion.div 
                className="absolute -bottom-12 -right-4 w-32 h-32 border border-primary/10 rounded-full z-10 hidden sm:block"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 6, 
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              <motion.div
                className="glass-premium p-3 rounded-2xl overflow-hidden border border-primary/10 relative z-20"
                style={{ 
                  rotateX, 
                  rotateY, 
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px -12px rgba(var(--shadow-color), var(--shadow-strength))"
                }}
              >
                <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-gradient-to-tr from-black/70 to-black/30">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                    alt={developerName} 
                    width={600} 
                    height={800}
                    className="object-cover h-full w-full mix-blend-normal opacity-[0.9]"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                  
                  {/* Available status indicator */}
                  <div className="absolute top-4 right-4 glass-premium rounded-full px-3 py-1 border border-primary/20 flex items-center gap-2 z-30">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs font-medium text-primary">Available for Work</span>
                  </div>
                  
                  {/* Text overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="text-white text-xl font-bold mb-1">{developerName}</h3>
                    <p className="text-white/70 text-sm">{developerLocation}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Stats cards */}
              <motion.div 
                className="absolute -right-12 top-1/3 glass-premium p-4 rounded-lg backdrop-blur-md border border-primary/10 hidden md:block z-30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                style={{ 
                  x: translateX,
                  y: translateY,
                  boxShadow: "0 15px 30px -10px rgba(var(--shadow-color), var(--shadow-strength))"
                }}
              >
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">5+</span>
                  <span className="text-sm text-muted">Years Experience</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-12 bottom-1/4 glass-premium p-4 rounded-lg backdrop-blur-md border border-primary/10 hidden md:block z-30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                style={{ 
                  x: layer2X,
                  y: layer2Y,
                  boxShadow: "0 15px 30px -10px rgba(var(--shadow-color), var(--shadow-strength))"
                }}
              >
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">100+</span>
                  <span className="text-sm text-muted">Projects Completed</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
        
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0],
          transition: { delay: 2, duration: 1.5, repeat: Infinity, repeatType: "loop" }
        }}
        onClick={() => scrollToSection("about")}
      >
        <span className="text-muted text-sm mb-2">Scroll Down</span>
        <FiArrowDown className="text-primary animate-bounce" />
      </motion.div>
    </section>
  );
}; 