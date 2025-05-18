"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/card";
import { RevealOnScroll, MaskReveal } from "@/components/scroll-animations";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter, FiMail, FiUser, FiMapPin, FiCalendar, FiCode, FiBookOpen, FiHeart } from "react-icons/fi";
import Image from "next/image";
import { Link } from "@heroui/link";

// Developer name - centralized for consistency
const developerName = "Johan Beker";
const developerLocation = "Berlin, Germany";
const developerEmail = "johan.beker@example.com";

// These should be updated with real data
const socialLinks = [
  { icon: <FiGithub size={20} />, url: "https://github.com/yourusername", label: "GitHub" },
  { icon: <FiLinkedin size={20} />, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: <FiTwitter size={20} />, url: "https://twitter.com/yourusername", label: "Twitter" },
  { icon: <FiMail size={20} />, url: `mailto:${developerEmail}`, label: "Email" },
];

// Tech stack with icon fallbacks using Feather icons if image loading fails
const techStack = [
  { name: "React", icon: <FiCode className="text-[#61DAFB]" /> },
  { name: "Next.js", icon: <FiCode className="text-foreground" /> },
  { name: "TypeScript", icon: <FiCode className="text-[#3178C6]" /> },
  { name: "Tailwind CSS", icon: <FiCode className="text-[#38B2AC]" /> },
  { name: "Node.js", icon: <FiCode className="text-[#339933]" /> },
  { name: "Framer Motion", icon: <FiCode className="text-[#0055FF]" /> },
];

// Profile data
const profileData = [
  { label: "Name", value: developerName, icon: <FiUser className="text-primary" /> },
  { label: "Location", value: developerLocation, icon: <FiMapPin className="text-primary" /> },
  { label: "Experience", value: "5+ Years", icon: <FiCalendar className="text-primary" /> },
  { label: "Education", value: "Master's in HCI, University of Berlin", icon: <FiBookOpen className="text-primary" /> },
  { label: "Interests", value: "UI Design, Open Source, Photography", icon: <FiHeart className="text-primary" /> },
];

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } },
  };

  return (
    <section 
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden dark:bg-black/95 bg-gray-50/50"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(var(--color-foreground),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.05)_1px,transparent_1px)] z-0"
      />
       {/* Radial gradient overlay */}
       <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] z-0"
        style={{ opacity }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[80px] z-0"
        style={{ opacity }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge 
              variant="flat" 
              color="primary" 
              className="mb-4 border border-primary/20 glass-premium"
            >
              <span className="px-2 py-0.5 text-primary">About Me</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Who I Am</h2>
            <p className="text-muted max-w-2xl mx-auto">
              A passionate developer and designer with a focus on creating beautiful, functional digital experiences.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <MaskReveal direction="left">
              <div className="relative">
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -top-8 -left-8 w-32 h-32 border border-primary/20 rounded-full z-0"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
                
                <div className="glass-premium p-3 rounded-2xl overflow-hidden border border-primary/10 relative z-10 shadow-xl">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                      alt={developerName} 
                      width={600} 
                      height={750}
                      className="object-cover w-full h-full"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Social links overlay at bottom */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
                    {socialLinks.map((social, index) => (
                      <Link
                        key={index}
                        href={social.url}
                        isExternal
                        aria-label={social.label}
                        className="glass-premium p-3 rounded-full hover:bg-primary/10 transition-colors duration-300 border border-white/10"
                      >
                        <div className="text-white hover:text-primary">
                          {social.icon}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Profile Info Card */}
                <motion.div 
                  className="glass-premium p-6 rounded-xl backdrop-blur-md border border-primary/10 mt-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    {profileData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-muted">{item.label}</p>
                          <p className="text-foreground font-medium">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </MaskReveal>
          </div>
          
          {/* Content Column */}
          <motion.div 
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item}>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Hello! I&apos;m <span className="text-primary premium-highlight">{developerName}</span>,<br />
                a Developer & Designer based in {developerLocation}
              </h3>
            </motion.div>
            
            <motion.div variants={item}>
              <p className="text-muted mb-5">
                I specialize in creating exceptional digital experiences through a combination of clean code and intuitive design. With over 5 years of experience in the field, I&apos;ve helped businesses of all sizes transform their online presence and connect with their audience in meaningful ways.
              </p>
            </motion.div>
            
            <motion.div variants={item}>
              <p className="text-muted mb-8">
                My approach combines technical expertise with creative problem-solving. I believe in building solutions that are not just visually impressive, but also functional, accessible, and user-centered. Whether you need a stunning website, a complex web application, or a comprehensive digital strategy, I&apos;m here to help you achieve your goals.
              </p>
            </motion.div>
            
            <motion.div variants={item} className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-foreground">My Tech Stack</h4>
                <Link 
                  href="#skills" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary text-sm flex items-center gap-1 hover:underline"
                >
                  View all skills <FiArrowRight size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {techStack.map((tech, index) => (
                  <div 
                    key={index}
                    className="glass-premium p-4 rounded-xl border border-primary/10 flex items-center gap-3 hover:bg-primary/5 transition-colors duration-300"
                  >
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      {tech.icon}
                    </div>
                    <span className="text-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={item}>
              <Divider className="my-8 opacity-30" />
            </motion.div>
            
            <motion.div variants={item}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="glass-premium border border-primary/10">
                  <CardBody className="flex flex-col items-center text-center p-6">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <FiCode className="text-primary" size={24} />
                    </div>
                    <h5 className="text-lg font-semibold text-foreground mb-2">Development</h5>
                    <p className="text-muted text-sm">
                      Building responsive, performant, and accessible web applications with modern frameworks and technologies.
                    </p>
                  </CardBody>
                </Card>
                
                <Card className="glass-premium border border-primary/10">
                  <CardBody className="flex flex-col items-center text-center p-6">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <FiUser className="text-primary" size={24} />
                    </div>
                    <h5 className="text-lg font-semibold text-foreground mb-2">UX Design</h5>
                    <p className="text-muted text-sm">
                      Creating intuitive and engaging user experiences through research, wireframing, and prototyping.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </motion.div>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="btn-premium font-medium px-6 py-5 rounded-full flex items-center gap-2 shadow-lg"
                size="lg"
                variant="flat"
                color="primary"
              >
                <FiDownload className="text-lg" /> Download Resume
              </Button>
              
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-5 rounded-full border border-primary/20 text-primary font-medium hover:bg-primary/5 flex items-center gap-2"
                variant="ghost"
                size="lg"
              >
                Get in Touch <FiArrowRight className="text-lg" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 