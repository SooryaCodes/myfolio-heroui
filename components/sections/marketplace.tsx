"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Select, SelectItem } from "@heroui/select";
import {
  FiShoppingCart,
  FiStar,
  FiBookmark,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/scroll-animations";

const products = [
  {
    id: 1,
    title: "Modern Portfolio Template",
    category: "Template",
    description:
      "Clean, responsive portfolio template built with React and TailwindCSS.",
    price: 49,
    rating: 4.8,
    sales: 240,
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1364&auto=format&fit=crop",
    tags: ["React", "Tailwind", "Portfolio"],
  },
  {
    id: 2,
    title: "Dashboard UI Kit",
    category: "UI Kit",
    description:
      "Complete dashboard UI kit with 100+ components and 50+ screens.",
    price: 79,
    rating: 4.9,
    sales: 520,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    tags: ["UI Kit", "Dashboard", "Admin"],
  },
  {
    id: 3,
    title: "E-commerce Starter",
    category: "Template",
    description:
      "Full-featured e-commerce starter template with cart, checkout, and payment integration.",
    price: 99,
    rating: 4.7,
    sales: 180,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop",
    tags: ["E-commerce", "Next.js", "Stripe"],
  },
  {
    id: 4,
    title: "Icon Pack Pro",
    category: "Icons",
    description:
      "Premium icon pack with 2000+ vector icons in multiple styles and formats.",
    price: 29,
    rating: 4.6,
    sales: 750,
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop",
    tags: ["Icons", "SVG", "Design"],
  },
  {
    id: 5,
    title: "Design System",
    category: "UI Kit",
    description:
      "Complete design system with components, patterns, and guidelines.",
    price: 129,
    rating: 4.9,
    sales: 320,
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1480&auto=format&fit=crop",
    tags: ["Design System", "Figma", "Components"],
  },
  {
    id: 6,
    title: "Minimal Blog Theme",
    category: "Template",
    description: "Clean and minimal blog theme with multiple layout options.",
    price: 39,
    rating: 4.5,
    sales: 190,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop",
    tags: ["Blog", "Minimal", "Theme"],
  },
];

const categories = ["All", "Template", "UI Kit", "Icons"];

// Enhanced 3D Product Card
const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = () => {
    addToast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
      color: "success",
      variant: "flat",
      radius: "full",
    });
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="h-full transform-3d"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: "1000px",
        }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Card className="h-full">
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              alt={product.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              height={300}
              src={product.image}
              width={600}
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                isIconOnly
                aria-label="Bookmark"
                className="glass-premium"
                color="default"
                size="sm"
                variant="flat"
              >
                <FiBookmark size={16} />
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <CardHeader className="flex items-start justify-between">
            <div>
              <Badge className="mb-2" color="primary" size="sm" variant="flat">
                {product.category}
              </Badge>
              <h3 className="text-xl font-semibold text-foreground">
                {product.title}
              </h3>
            </div>
            <div className="flex items-center text-sm text-muted">
              <FiStar className="text-yellow-500 mr-1" size={16} />
              <span>{product.rating}</span>
              <span className="mx-1">•</span>
              <span>{product.sales} sales</span>
            </div>
          </CardHeader>

          <CardBody>
            <p className="text-muted text-sm mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  className="text-xs"
                  color="default"
                  size="sm"
                  variant="flat"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardBody>

          <CardFooter className="flex justify-between items-center">
            <div className="text-xl font-bold text-foreground">
              ${product.price}
            </div>
            <div className="flex gap-2">
              <Button
                color="primary"
                size="sm"
                startContent={<FiDownload size={16} />}
                variant="ghost"
              >
                Demo
              </Button>
              <Button
                className="font-medium"
                color="primary"
                size="sm"
                startContent={<FiShoppingCart size={16} />}
                onClick={handleAddToCart}
              >
                Buy Now
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory,
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popularity") return b.sales - a.sales;

    return 0; // featured - keep original order
  });

  return (
    <section className="py-20 px-6 relative" id="marketplace">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/5 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <Badge className="mb-4" color="primary" variant="flat">
              Digital Products
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Premium Digital Assets
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore my collection of premium digital products designed to help
              you build better websites and applications.
            </p>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                className="px-5"
                color={selectedCategory === category ? "primary" : "default"}
                radius="full"
                variant={selectedCategory === category ? "flat" : "ghost"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <Select
            className="w-48"
            label="Sort by"
            placeholder="Featured"
            radius="lg"
            variant="flat"
            onChange={(value) => setSortBy(value.toString())}
          >
            <SelectItem key="featured">Featured</SelectItem>
            <SelectItem key="price-low">Price: Low to High</SelectItem>
            <SelectItem key="price-high">Price: High to Low</SelectItem>
            <SelectItem key="rating">Highest Rated</SelectItem>
            <SelectItem key="popularity">Most Popular</SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} index={index} product={product} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            as={Link}
            className="px-8 font-medium"
            color="primary"
            endContent={<FiExternalLink />}
            href="/marketplace"
            radius="full"
            size="lg"
            variant="flat"
          >
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
