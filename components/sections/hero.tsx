"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowDown,
} from "react-icons/fi";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { scrollToSection } from "@/components/scroll-provider";

// Utility function to merge Tailwind classes
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Animated text cycling component with enhanced effects
const TextCycle = ({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) => {
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
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
          exit={{ y: -20, opacity: 0 }}
          initial={{ y: 20, opacity: 0 }}
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
  const skills = [
    "Full Stack Developer",
    "UI Designer",
    "UX Architect",
    "React Expert",
    "Next.js Developer",
  ];

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
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.85 },
    },
  };

  // Simple non-animated version for server-side rendering
  if (!mounted) {
    return (
      <section
        className="min-h-screen flex items-center justify-center px-6 md:px-8 relative overflow-hidden pt-24 pb-16"
        id="hero"
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,rgba(var(--color-foreground),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.05)_1px,transparent_1px)]",
          )}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="max-w-7xl mx-auto w-full z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Badge
                className="mb-6 border border-primary/20 glass-premium"
                color="primary"
                size="lg"
                variant="flat"
              >
                <span className="px-2 py-1 text-primary">
                  Developer & Designer
                </span>
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-foreground">
                {developerName}{" "}
                <span className="text-primary premium-highlight">Digital</span>{" "}
                Experiences with Precision
              </h1>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted mb-6">
                I&apos;m a{" "}
                <span className="text-primary font-semibold">{skills[0]}</span>
              </h2>

              <p className="text-lg text-muted mb-8 max-w-xl">
                I create immersive digital experiences through intuitive designs
                and clean code, helping brands connect with their audience in
                meaningful ways.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  className="btn-premium font-medium px-8 py-6 rounded-full"
                  color="primary"
                  size="lg"
                  variant="flat"
                >
                  Explore My Work <FiArrowRight className="ml-2" />
                </Button>

                <Button
                  className="px-8 py-6 rounded-full border border-primary/20 text-primary font-medium hover:bg-primary/5"
                  size="lg"
                  variant="ghost"
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
      className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 relative overflow-hidden pt-24 pb-16"
      id="hero"
    >
      {/* Modern Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(var(--color-foreground),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.05)_1px,transparent_1px)]",
        )}
      />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <motion.div
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/5 blur-[80px] dark:bg-primary/5 z-0"
        style={{
          x: translateX,
          y: translateY,
          opacity: 0.6,
        }}
      />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.div variants={item}>
              <Badge
                className="mb-4 md:mb-6 border border-primary/20 glass-premium"
                color="primary"
                size="lg"
                variant="flat"
              >
                <span className="px-2 py-1 text-primary text-sm md:text-base">
                  Developer & Designer
                </span>
              </Badge>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-4 md:mb-6 text-foreground"
            >
              {developerName}{" "}
              <span className="text-primary premium-highlight">Digital</span>{" "}
              <span className="block md:inline">Experiences with Precision</span>
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-xl md:text-2xl lg:text-4xl relative font-medium text-muted mb-4 md:mb-6"
            >
              I&apos;m a{" "}
              <TextCycle className="text-primary font-semibold absoluteu top-2" phrases={skills} />
            </motion.h2>

            <motion.p
              variants={item}
              className="text-base md:text-lg text-muted mb-6 md:mb-8 max-w-xl"
            >
              I create immersive digital experiences through intuitive designs
              and clean code, helping brands connect with their audience in
              meaningful ways.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10"
            >
              <Button
                className="btn-premium font-medium px-6 md:px-8 py-5 md:py-6 rounded-full text-sm md:text-base"
                color="primary"
                size="lg"
                variant="flat"
                onClick={() => scrollToSection("projects")}
              >
                Explore My Work <FiArrowRight className="ml-2" />
              </Button>

              <Button
                className="px-6 md:px-8 py-5 md:py-6 rounded-full border border-primary/20 text-primary font-medium hover:bg-primary/5 text-sm md:text-base"
                size="lg"
                variant="ghost"
                onClick={() => scrollToSection("about")}
              >
                About Me
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="flex items-center gap-4 sm:gap-6"
            >
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin size={20} />
              </motion.a>
              <div className="h-6 w-px bg-border" />
              <p className="text-sm text-muted">
                Based in {developerLocation}
              </p>
            </motion.div>
          </motion.div>

          {/* Hero 3D animated image section */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 hidden lg:block">
            <div className="relative w-full max-w-md">
              {/* Decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                className="absolute -top-8 -left-8 w-24 h-24 border border-primary/20 rounded-full z-10 hidden sm:block"
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                className="absolute -bottom-12 -right-4 w-32 h-32 border border-primary/10 rounded-full z-10 hidden sm:block"
                transition={{
                  duration: 6,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="glass-premium p-3 rounded-2xl overflow-hidden border border-primary/10 relative z-20"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 25px 50px -12px rgba(var(--shadow-color), var(--shadow-strength))",
                }}
              >
                <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-gradient-to-tr from-black/70 to-black/30">
                  <Image
                    priority
                    alt={developerName}
                    className="object-cover h-full w-full mix-blend-normal opacity-[0.9]"
                    height={800}
                    src="/images/profile.jpeg"
                    width={600}
                   
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                  {/* Available status indicator */}
                  <div className="absolute top-4 right-4 glass-premium rounded-full px-3 py-1 border border-primary/20 flex items-center gap-2 z-30">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-primary">
                      Available for Work
                    </span>
                  </div>

                  {/* Text overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="text-white text-xl font-bold mb-1">
                      {developerName}
                    </h3>
                    <p className="text-white/70 text-sm">{developerLocation}</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats cards */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="absolute -right-12 top-1/3 glass-premium p-4 rounded-lg backdrop-blur-md border border-primary/10 hidden md:block z-30"
                initial={{ opacity: 0, x: 20 }}
                style={{
                  x: translateX,
                  y: translateY,
                  boxShadow:
                    "0 15px 30px -10px rgba(var(--shadow-color), var(--shadow-strength))",
                }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">5+</span>
                  <span className="text-sm text-muted">Years Experience</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="absolute -left-12 bottom-1/4 glass-premium p-4 rounded-lg backdrop-blur-md border border-primary/10 hidden md:block z-30"
                initial={{ opacity: 0, x: -20 }}
                style={{
                  x: layer2X,
                  y: layer2Y,
                  boxShadow:
                    "0 15px 30px -10px rgba(var(--shadow-color), var(--shadow-strength))",
                }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-primary">100+</span>
                  <span className="text-sm text-muted">Projects Completed</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          opacity: 1,
          y: [0, 10, 0],
          transition: {
            delay: 2,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          },
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        onClick={() => scrollToSection("about")}
      >
        <span className="text-muted text-sm mb-2">Scroll Down</span>
        <FiArrowDown className="text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};
