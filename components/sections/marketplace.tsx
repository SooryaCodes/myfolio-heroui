"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Select, SelectItem } from "@heroui/select";
import { FiShoppingCart, FiChevronRight, FiStar, FiBookmark, FiDownload } from "react-icons/fi";
import { addToast } from "@heroui/toast";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Modern Portfolio Template",
    category: "Template",
    description: "Clean, responsive portfolio template built with React and TailwindCSS.",
    price: 49,
    rating: 4.8,
    sales: 240,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1364&auto=format&fit=crop",
    tags: ["React", "Tailwind", "Portfolio"]
  },
  {
    id: 2,
    title: "Dashboard UI Kit",
    category: "UI Kit",
    description: "Complete dashboard UI kit with 100+ components and 50+ screens.",
    price: 79,
    rating: 4.9,
    sales: 520,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    tags: ["UI Kit", "Dashboard", "Admin"]
  },
  {
    id: 3,
    title: "E-commerce Starter",
    category: "Template",
    description: "Full-featured e-commerce starter template with cart, checkout, and payment integration.",
    price: 99,
    rating: 4.7,
    sales: 180,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop",
    tags: ["E-commerce", "Next.js", "Stripe"]
  },
  {
    id: 4,
    title: "Icon Pack Pro",
    category: "Icons",
    description: "Premium icon pack with 2000+ vector icons in multiple styles and formats.",
    price: 29,
    rating: 4.6,
    sales: 750,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop",
    tags: ["Icons", "SVG", "Design"]
  },
  {
    id: 5,
    title: "Design System",
    category: "UI Kit",
    description: "Complete design system with components, patterns, and guidelines.",
    price: 129,
    rating: 4.9,
    sales: 320,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1480&auto=format&fit=crop",
    tags: ["Design System", "Figma", "Components"]
  },
  {
    id: 6,
    title: "Minimal Blog Theme",
    category: "Template",
    description: "Clean and minimal blog theme with multiple layout options.",
    price: 39,
    rating: 4.5,
    sales: 190,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop",
    tags: ["Blog", "Minimal", "Theme"]
  }
];

const categories = ["All", "Template", "UI Kit", "Icons"];

export const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  
  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popularity") return b.sales - a.sales;
    return 0; // featured - keep original order
  });
  
  const handleAddToCart = (productName: string) => {
    addToast({
      title: "Added to cart!",
      description: `${productName} has been added to your cart.`,
      color: "success",
      variant: "flat",
      radius: "full",
    });
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } },
  };

  return (
    <section id="marketplace" className="py-20 px-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge color="primary" variant="flat" className="mb-4">Digital Products</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Premium Digital Assets</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Explore my collection of premium digital products designed to help you build better websites and applications.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category}
                color={selectedCategory === category ? "primary" : "default"}
                variant={selectedCategory === category ? "flat" : "ghost"}
                radius="full"
                onClick={() => setSelectedCategory(category)}
                className="px-5"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <Select
            label="Sort by"
            placeholder="Featured"
            onChange={(value) => setSortBy(value.toString())}
            className="w-48"
            variant="flat"
            radius="lg"
          >
            <SelectItem key="featured" value="featured">Featured</SelectItem>
            <SelectItem key="price-low" value="price-low">Price: Low to High</SelectItem>
            <SelectItem key="price-high" value="price-high">Price: High to Low</SelectItem>
            <SelectItem key="rating" value="rating">Highest Rated</SelectItem>
            <SelectItem key="popularity" value="popularity">Most Popular</SelectItem>
          </Select>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedProducts.map(product => (
            <motion.div key={product.id} variants={item}>
              <Card className="group hover-lift overflow-hidden border border-border">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button 
                      isIconOnly 
                      size="sm" 
                      color="default" 
                      variant="solid" 
                      className="glass-premium"
                      aria-label="Bookmark"
                    >
                      <FiBookmark size={16} />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="flex items-start justify-between">
                  <div>
                    <Badge 
                      color="default" 
                      variant="flat" 
                      size="sm" 
                      className="mb-2"
                    >
                      {product.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-foreground">{product.title}</h3>
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
                    {product.tags.map(tag => (
                      <Badge key={tag} size="sm" variant="flat" color="default" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardBody>
                
                <CardFooter className="flex justify-between items-center">
                  <div className="text-xl font-bold text-foreground">${product.price}</div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      color="primary"
                      startContent={<FiDownload size={16} />}
                    >
                      Demo
                    </Button>
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat"
                      onClick={() => handleAddToCart(product.title)}
                      startContent={<FiShoppingCart size={16} />}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <Button 
            color="primary" 
            variant="flat" 
            size="lg"
            endContent={<FiChevronRight />}
            className="px-12 py-6 rounded-full"
          >
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
}; 