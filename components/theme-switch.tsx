"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { motion } from "framer-motion";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });

  // Get the wrapper props and extract only the needed properties
  const wrapperProps = getWrapperProps();
  const wrapperClassName = slots.wrapper({
    class: clsx(
      [
        "w-10 h-10",
        "glass-premium",
        "hover:border-primary/30",
        "rounded-full",
        "flex items-center justify-center",
        "transition-all duration-300",
        "overflow-hidden",
      ],
      classNames?.wrapper,
    ),
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "relative px-1 cursor-pointer group",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div 
        role={wrapperProps.role}
        tabIndex={wrapperProps.tabIndex}
        aria-hidden={wrapperProps["aria-hidden"]}
        className={wrapperClassName}
      >
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            y: isSelected && !isSSR ? 0 : -40,
            opacity: isSelected && !isSSR ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <MoonFilledIcon className="text-primary" size={20} />
        </motion.div>

        <motion.div
          className="absolute"
          initial={false}
          animate={{
            y: !isSelected || isSSR ? 0 : 40,
            opacity: !isSelected || isSSR ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SunFilledIcon className="text-primary" size={20} />
        </motion.div>

        {/* Fancy glow effect */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
      </div>
    </Component>
  );
};
