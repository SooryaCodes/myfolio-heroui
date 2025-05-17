"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";

interface CustomCursorProps {
  color?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true); // Start hidden until mouse moves
  const { theme } = useTheme();
  
  // Use motion values for smoother performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Use springs for smoother movement
  const cursorX = useSpring(mouseX, { 
    stiffness: 800,
    damping: 60,
    mass: 0.1
  });
  
  const cursorY = useSpring(mouseY, { 
    stiffness: 800,
    damping: 60,
    mass: 0.1 
  });
  
  // Cursor color based on theme
  const cursorColor = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
  const cursorBgColor = theme === "dark" ? "rgba(var(--color-primary), 0.15)" : "rgba(var(--color-primary), 0.1)";
  
  useEffect(() => {
    setMounted(true);
    
    // Show cursor only after the user moves the mouse
    const showCursor = () => {
      setHidden(false);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    // Improved throttle implementation for better performance
    let lastMove = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove > 5) { // Reduce throttle time to 5ms for smoother movement
        onMouseMove(e);
        lastMove = now;
      }
    };

    document.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", showCursor, { once: true });

    // Improved approach for interactive elements
    const handleLinkHoverEvents = () => {
      const selector = "a, button, [role=button], input[type=button], .navbar-icon, .card-premium, .interactive-item, .hover-lift";
      
      // Use event delegation for better performance with many elements
      document.body.addEventListener("mouseover", (e) => {
        const target = e.target as HTMLElement;
        if (target.closest(selector)) {
          setLinkHovered(true);
        }
      });
      
      document.body.addEventListener("mouseout", (e) => {
        const target = e.target as HTMLElement;
        if (target.closest(selector)) {
          setLinkHovered(false);
        }
      });
    };

    // Small delay to ensure all elements are loaded
    setTimeout(handleLinkHoverEvents, 300);

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseX, mouseY]);

  // Don't render until mounted (client-side)
  if (!mounted) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ 
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%", 
          y: "-50%",
          mixBlendMode: theme === "dark" ? "difference" : "normal"
        }}
      >
        <motion.div
          className={`relative flex items-center justify-center rounded-full ${hidden ? 'opacity-0' : 'opacity-100'}`}
          variants={{
            default: {
              height: 16,
              width: 16,
              border: `1.5px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(var(--color-primary), 1)"}`,
              backgroundColor: cursorBgColor,
            },
            clicked: {
              height: 14,
              width: 14, 
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(var(--color-primary), 0.8)",
              border: "1.5px solid transparent",
            },
            hovered: {
              height: 36,
              width: 36,
              border: `1.5px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(var(--color-primary), 0.8)"}`,
              backgroundColor: cursorBgColor,
            },
          }}
          animate={
            clicked 
              ? "clicked" 
              : linkHovered 
                ? "hovered" 
                : "default"
          }
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        >
          {linkHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-xs font-medium ${theme === "dark" ? "text-white" : "text-primary"}`}
            >
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Trailer effect */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full ${hidden ? 'opacity-0' : 'opacity-20'}`}
        style={{ 
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%", 
          y: "-50%",
          height: clicked ? 20 : linkHovered ? 40 : 30,
          width: clicked ? 20 : linkHovered ? 40 : 30,
          backgroundColor: theme === "dark" ? "#ffffff" : "rgba(var(--color-primary), 0.7)",
          mixBlendMode: theme === "dark" ? "difference" : "normal"
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
          mass: 0.5,
          delay: 0.03,
        }}
      />
    </>
  );
}; 