"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ScrollProvider } from "@/components/scroll-provider";
import dynamic from "next/dynamic";

// Import the custom cursor with no SSR to prevent hydration mismatch
const CustomCursor = dynamic(() => import("@/components/custom-cursor").then(mod => mod.CustomCursor), {
  ssr: false
});

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <ScrollProvider>
          {children}
          <CustomCursor />
        </ScrollProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
