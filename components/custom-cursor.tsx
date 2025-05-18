"use client";

import React, { useEffect, useState } from "react";
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
  const [hidden, setHidden] = useState(true);
  const { theme, resolvedTheme } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, {
    stiffness: 1000,
    damping: 50,
    mass: 0.1,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 1000,
    damping: 50,
    mass: 0.1,
  });

  const isDarkMode = resolvedTheme === "dark";

  // Blue theme colors
  const cursorBorderColor = isDarkMode
    ? "rgba(59, 130, 246, 0.8)" // blue-500
    : "rgba(37, 99, 235, 1)"; // blue-600

  const cursorBgColor = isDarkMode
    ? "rgba(59, 130, 246, 0.15)"
    : "rgba(37, 99, 235, 0.1)";

  const trailerBgColor = isDarkMode
    ? "rgba(59, 130, 246, 0.2)"
    : "rgba(37, 99, 235, 0.5)";

  const glowColor = isDarkMode
    ? "rgba(59, 130, 246, 0.3)"
    : "rgba(37, 99, 235, 0.2)";

  useEffect(() => {
    setMounted(true);

    const showCursor = () => setHidden(false);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    let lastMove = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      if (now - lastMove > 3) {
        // Even smoother movement
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

    const handleLinkHoverEvents = () => {
      const selector =
        "a, button, [role=button], input[type=button], .navbar-icon, .card-premium, .interactive-item, .hover-lift";

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

    setTimeout(handleLinkHoverEvents, 300);

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseX, mouseY]);

  // Don't render anything during SSR or before mounting on client
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
          mixBlendMode: isDarkMode ? "screen" : "normal",
        }}
      >
        <motion.div
          animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
          className="relative flex items-center justify-center rounded-full"
          style={{
            opacity: hidden ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 25,
          }}
          variants={{
            default: {
              height: 18,
              width: 18,
              border: `2px solid ${cursorBorderColor}`,
              backgroundColor: cursorBgColor,
              boxShadow: `0 0 15px ${glowColor}`,
            },
            clicked: {
              height: 16,
              width: 16,
              backgroundColor: isDarkMode
                ? "rgba(59, 130, 246, 0.8)"
                : "rgba(37, 99, 235, 0.8)",
              border: "2px solid transparent",
              boxShadow: `0 0 20px ${glowColor}`,
            },
            hovered: {
              height: 40,
              width: 40,
              border: `2px solid ${isDarkMode ? "rgba(59, 130, 246, 0.6)" : "rgba(37, 99, 235, 0.8)"}`,
              backgroundColor: cursorBgColor,
              boxShadow: `0 0 25px ${glowColor}`,
            },
          }}
        >
          {linkHovered && (
            <motion.span
              animate={{ opacity: 1, scale: 1 }}
              className={`text-xs font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
              initial={{ opacity: 0, scale: 0 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trailer effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
          height: clicked ? 24 : linkHovered ? 44 : 34,
          width: clicked ? 24 : linkHovered ? 44 : 34,
          backgroundColor: trailerBgColor,
          boxShadow: `0 0 30px ${glowColor}`,
          mixBlendMode: isDarkMode ? "screen" : "normal",
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
          mass: 0.4,
          delay: 0.02,
        }}
      />
    </>
  );
};
