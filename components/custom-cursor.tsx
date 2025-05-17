"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  color?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ 
  color = "rgba(var(--color-primary), 1)" 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Use springs for smoother movement
  const cursorX = useSpring(position.x, { 
    stiffness: 700,
    damping: 50,
    mass: 0.1
  });
  
  const cursorY = useSpring(position.y, { 
    stiffness: 700,
    damping: 50,
    mass: 0.1 
  });
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    // Throttle mouse move events for better performance
    let lastMove = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove > 10) { // Throttle to 10ms
        onMouseMove(e);
        lastMove = now;
      }
    };

    document.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const handleLinkHoverEvents = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role=button], input[type=button], [data-cursor=pointer], .interactive-item"
      );
      
      interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    // Small delay to ensure all elements are loaded
    setTimeout(handleLinkHoverEvents, 500);
    
    // Update link listeners when DOM changes
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, []);

  // Show custom cursor only on client
  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%", 
          y: "-50%"
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full"
          variants={{
            default: {
              opacity: hidden ? 0 : 1,
              height: 16,
              width: 16,
              border: "1px solid rgba(var(--color-primary), 0.6)",
              backgroundColor: "rgba(var(--color-primary), 0.1)",
            },
            clicked: {
              opacity: hidden ? 0 : 1,
              height: 14,
              width: 14, 
              backgroundColor: color,
              border: "1px solid transparent",
            },
            hovered: {
              opacity: hidden ? 0 : 1,
              height: 40,
              width: 40,
              border: "1px solid rgba(var(--color-primary), 0.6)",
              backgroundColor: "rgba(var(--color-primary), 0.1)",
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
            stiffness: 300,
            damping: 30,
            mass: 0.2,
          }}
        >
          {linkHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white text-xs font-medium"
            >
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Trailer effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-white mix-blend-difference opacity-20"
        style={{ 
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%", 
          y: "-50%",
          height: clicked ? 20 : linkHovered ? 45 : 30,
          width: clicked ? 20 : linkHovered ? 45 : 30,
          transition: "height 0.3s, width 0.3s, opacity 0.3s",
          scale: hidden ? 0 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 40,
          mass: 0.8,
          delay: 0.05, // Delayed effect for trailer
        }}
      />
    </>
  );
}; 