"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect } from "react";

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const lenis = useLenis();

  useEffect(() => {
    function onScrollToSection(event: CustomEvent) {
      if (!event.detail?.id) return;

      const element = document.getElementById(event.detail.id);

      if (!element) return;

      lenis?.scrollTo(element, {
        offset: event.detail.offset || 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    window.addEventListener("scrollto", onScrollToSection as EventListener);

    // Ensure the scroll position is reset when the page loads
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => {
      window.removeEventListener(
        "scrollto",
        onScrollToSection as EventListener,
      );
    };
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export function scrollToSection(id: string, offset = 0) {
  window.dispatchEvent(new CustomEvent("scrollto", { detail: { id, offset } }));
}
