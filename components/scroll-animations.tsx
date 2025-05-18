"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

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
  const directionMap = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
  };

  const initialPosition = directionMap[direction];

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...initialPosition,
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.21, 0.45, 0.15, 0.95],
        }
      }}
      viewport={{ once, amount: threshold }}
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
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
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
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: threshold, once: true }}
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
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollFactor * 100]
  );

  const springX = useSpring(x, {
    damping: 15,
    stiffness: 150,
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
      <motion.div
        style={{ x: springX }}
        className="flex w-fit"
      >
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