"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Reveals content with a sliding animation as you scroll
export function RevealOnScroll({
  children,
  direction = "bottom",
  distance = 50,
  delay = 0.2,
  threshold = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  distance?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const directionMap = {
    left: { x: isMobile ? -30 : -distance, y: 0 },
    right: { x: isMobile ? 30 : distance, y: 0 },
    top: { x: 0, y: isMobile ? -30 : -distance },
    bottom: { x: 0, y: isMobile ? 30 : distance },
  };

  const initialPosition = directionMap[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPosition,
      }}
      viewport={{ once, amount: threshold, margin: isMobile ? "-50px 0px" : "0px" }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: isMobile ? 0.6 : 0.8,
          delay: isMobile ? Math.min(delay, 0.1) : delay,
          ease: [0.21, 0.45, 0.15, 0.95],
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Animates content based on scroll progress
export function TrackScroll({
  children,
  inputRange = [0, 1],
  outputOpacity = [0.2, 1],
  outputScale = [0.8, 1],
  className = "",
}: {
  children: React.ReactNode;
  inputRange?: number[];
  outputOpacity?: number[];
  outputScale?: number[];
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, inputRange, outputOpacity);
  const scale = useTransform(scrollYProgress, inputRange, outputScale);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using default values during SSR
  if (!mounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ opacity, scale }}>
      {children}
    </motion.div>
  );
}

// Creates a mask reveal effect as you scroll
export function MaskReveal({
  children,
  className = "",
  direction = "left",
  duration = 0.75,
  delay = 0,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
  threshold?: number;
}) {
  const variants = {
    hidden: {
      opacity: 0,
      clipPath:
        direction === "left"
          ? "inset(0 100% 0 0)"
          : direction === "right"
            ? "inset(0 0 0 100%)"
            : direction === "up"
              ? "inset(100% 0 0 0)"
              : "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={variants}
      viewport={{ once: true, amount: threshold }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

// Creates a horizontal scroll animation
export function HorizontalScrollSection({
  children,
  className = "",
  scrollFactor = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  scrollFactor?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, isMobile ? -scrollFactor * 60 : -scrollFactor * 100]
  );

  const springX = useSpring(x, {
    damping: 15,
    stiffness: isMobile ? 100 : 150,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using static content during SSR
  if (!mounted) {
    return (
      <div ref={targetRef} className={`relative overflow-hidden ${className}`}>
        <div className="flex w-fit">{children}</div>
      </div>
    );
  }

  return (
    <div ref={targetRef} className={`relative overflow-hidden ${className}`}>
      <motion.div className="flex w-fit" style={{ x: springX }}>
        {children}
      </motion.div>
    </div>
  );
}

// Creates a 3D tilt effect on hover
export function Tilt3D({
  children,
  className = "",
  tiltFactor = 5,
}: {
  children: React.ReactNode;
  className?: string;
  tiltFactor?: number;
}) {
  return (
    <motion.div
      className={`transform-gpu preserve-3d ${className}`}
      whileHover={{
        rotateX: tiltFactor,
        rotateY: tiltFactor,
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}
