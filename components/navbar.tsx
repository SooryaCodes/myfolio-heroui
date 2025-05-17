"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { scrollToSection } from "@/components/scroll-provider";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="backdrop-blur-md bg-background/70">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full font-bold">D</div>
            <p className="font-bold text-inherit">Portfolio</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                onClick={() => {
                  if (item.href === "/") {
                    scrollToSection("hero");
                  } else if (item.href === "/projects") {
                    scrollToSection("projects");
                  } else if (item.href === "/skills") {
                    scrollToSection("skills");
                  } else if (item.href === "/experience") {
                    scrollToSection("experience");
                  } else if (item.href === "/contact") {
                    scrollToSection("contact");
                  } else {
                    window.location.href = item.href;
                  }
                }}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <FiTwitter className="text-default-500" />
          </Link>
          <Link isExternal aria-label="LinkedIn" href={siteConfig.links.linkedin}>
            <FiLinkedin className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <FiGithub className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm bg-primary text-white"
            onClick={() => scrollToSection("contact")}
            variant="solid"
          >
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <FiGithub className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                onClick={() => {
                  if (item.href === "/") {
                    scrollToSection("hero");
                  } else if (item.href === "/projects") {
                    scrollToSection("projects");
                  } else if (item.href === "/skills") {
                    scrollToSection("skills");
                  } else if (item.href === "/experience") {
                    scrollToSection("experience");
                  } else if (item.href === "/contact") {
                    scrollToSection("contact");
                  } else {
                    window.location.href = item.href;
                  }
                }}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
