"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  baseVelocity?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function ParallaxSection({
  children,
  baseVelocity = 2,
  direction = "up",
  className = "",
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isHorizontal = direction === "left" || direction === "right";
  const directionFactor = direction === "up" || direction === "left" ? -1 : 1;

  const transformValue = useParallaxTransform(
    scrollYProgress,
    [0, 1],
    [0, 100 * directionFactor * baseVelocity],
  );

  const transform = isHorizontal
    ? `translateX(${transformValue}px)`
    : `translateY(${transformValue}px)`;

  return (
    <motion.div
      ref={containerRef}
      className={`will-change-transform ${className}`}
      style={{ transform }}
    >
      {children}
    </motion.div>
  );
}

// Custom hook for smoother transform
function useParallaxTransform(
  value: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
) {
  return useTransform(value, inputRange, outputRange, {
    clamp: false,
  });
}

// Animated text reveal component
export function AnimatedTextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="relative overflow-hidden mr-2 mb-2">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: delay + i * 0.03,
              }}
              viewport={{ once, threshold }}
              whileInView={{ y: 0 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Animated image parallax
export function ParallaxImage({
  src,
  alt,
  className = "",
  factor = 0.2,
}: {
  src: string;
  alt: string;
  className?: string;
  factor?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${factor * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        alt={alt}
        className="w-full h-full object-cover"
        src={src}
        style={{ y }}
      />
    </div>
  );
}
