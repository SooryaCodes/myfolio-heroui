"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className = "",
  magneticStrength = 40,
  onClick,
  disabled = false,
  href,
  type = "button",
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouse = (
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (disabled) return;

    const { clientX, clientY } = e;

    if (!buttonRef.current) return;

    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    const distance = Math.sqrt(middleX ** 2 + middleY ** 2);
    const maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);

    // Scale the magnetic pull based on how close the cursor is to the button
    const magneticPull =
      (1 - Math.min(distance / maxDistance, 1)) * magneticStrength;

    setPosition({
      x: (middleX * magneticPull) / maxDistance,
      y: (middleY * magneticPull) / maxDistance,
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef as any}
      className={`relative inline-flex items-center justify-center overflow-hidden ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      disabled={disabled}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      onMouseLeave={reset}
      onMouseMove={handleMouse}
    >
      <motion.span
        animate={{
          x: position.x,
          y: position.y,
        }}
        className="relative z-10 flex items-center justify-center"
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

export function GlowButton({
  children,
  className = "",
  glowColor = "rgba(var(--color-primary), 0.7)",
  onClick,
  disabled = false,
  href,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
}) {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();

    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;

    setGlowPosition({ x, y });
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef as any}
      className={`relative inline-flex items-center justify-center overflow-hidden 
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      disabled={disabled}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} 0%, transparent 60%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
