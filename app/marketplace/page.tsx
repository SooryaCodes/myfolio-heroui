"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  FiArrowRight,
  FiExternalLink,
  FiStar,
  FiDollarSign,
  FiCalendar,
  FiArrowUp,
  FiHome,
} from "react-icons/fi";

import { marketplaceProducts } from "@/datas/marketplace";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(
      new Set(
        marketplaceProducts.map((product) => product.category.toLowerCase()),
      ),
    ),
  ];

  // Filter products based on search query and category
  const filteredProducts = marketplaceProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "newest") {
      return (
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    } else if (sortBy === "featured") {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }

    return 0;
  });

  // Featured products
  const featuredProducts = marketplaceProducts.filter(
    (product) => product.featured,
  );

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back to Home */}
        <div className="mb-8">
          <Button
            as={Link}
            className="mb-6"
            color="primary"
            href="/"
            size="sm"
            startContent={<FiHome />}
            variant="light"
          >
            Back to Home
          </Button>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <Badge className="mb-4" color="primary" variant="flat">
            <span className="px-2 py-0.5">Marketplace</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Digital Products
          </h1>
          <p className="text-foreground/70 text-lg mb-8 max-w-3xl mx-auto">
            Browse my collection of premium templates, components, and digital
            resources designed to accelerate your development workflow.
          </p>
          <div className="max-w-lg mx-auto">
            <Input
              classNames={{
                inputWrapper: "bg-foreground/5 border-none shadow-sm",
              }}
              placeholder="Search products..."
              radius="full"
              size="lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Products Banner */}
        {featuredProducts.length > 0 && (
          <div className="mb-20">
            <Card className="shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10 border-none overflow-hidden">
              <CardBody className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge
                      className="mb-4 max-w-max"
                      color="primary"
                      variant="flat"
                    >
                      Featured
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">
                      {featuredProducts[0].title}
                    </h2>
                    <p className="text-foreground/70 mb-6">
                      {featuredProducts[0].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProducts[0].tags
                        .slice(0, 4)
                        .map((tag, index) => (
                          <Chip
                            key={index}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant="flat"
                          >
                            {tag}
                          </Chip>
                        ))}
                    </div>
                    <div className="mb-6">
                      <div className="flex gap-2 items-center">
                        <FiStar className="text-yellow-500" />
                        <FiStar className="text-yellow-500" />
                        <FiStar className="text-yellow-500" />
                        <FiStar className="text-yellow-500" />
                        <FiStar className="text-yellow-500" />
                        <span className="text-sm text-foreground/60 ml-2">
                          Highly rated
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        as={Link}
                        className="px-6 shadow-md"
                        color="primary"
                        endContent={<FiArrowRight />}
                        href={`/marketplace/${featuredProducts[0].slug}`}
                        radius="full"
                      >
                        View Details
                      </Button>
                      <Button
                        as={Link}
                        className="px-6"
                        color="default"
                        endContent={<FiExternalLink />}
                        href={featuredProducts[0].demo}
                        radius="full"
                        target="_blank"
                        variant="flat"
                      >
                        Live Demo
                      </Button>
                    </div>
                  </div>
                  <div className="relative min-h-[300px]">
                    <Image
                      fill
                      alt={featuredProducts[0].title}
                      className="object-cover object-center"
                      src={featuredProducts[0].image}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <Card className="bg-foreground/5 backdrop-blur-sm shadow-sm border-none">
            <CardBody className="p-1">
              <Tabs
                aria-label="Product Categories"
                classNames={{
                  tabList: "bg-transparent p-1",
                  cursor: "bg-primary/20",
                  tab: "text-foreground/60 data-[selected=true]:text-primary text-sm",
                  panel: "p-0",
                }}
                color="primary"
                radius="full"
                selectedKey={selectedCategory}
                variant="light"
                onSelectionChange={(key) => setSelectedCategory(key.toString())}
              >
                {categories.map((category) => (
                  <Tab
                    key={category}
                    title={<span className="capitalize">{category}</span>}
                  />
                ))}
              </Tabs>
            </CardBody>
          </Card>

          <div className="flex gap-2 items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-foreground/5"
                  color="default"
                  radius="full"
                  startContent={<FiArrowUp />}
                  variant="flat"
                >
                  {sortBy === "featured"
                    ? "Featured"
                    : sortBy === "price-low"
                      ? "Price: Low to High"
                      : sortBy === "price-high"
                        ? "Price: High to Low"
                        : "Newest"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort options"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onAction={(key) => setSortBy(key.toString())}
              >
                <DropdownItem key="featured">Featured</DropdownItem>
                <DropdownItem key="price-low">Price: Low to High</DropdownItem>
                <DropdownItem key="price-high">Price: High to Low</DropdownItem>
                <DropdownItem key="newest">Newest</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className="shadow-sm hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    fill
                    alt={product.title}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    src={product.image}
                  />
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        className="px-2 py-1"
                        color="primary"
                        variant="solid"
                      >
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center">
                      <Badge
                        className="bg-white/20 text-white border-none"
                        variant="flat"
                      >
                        {product.category}
                      </Badge>
                      <Chip
                        className="bg-success/20 border-none"
                        color="success"
                        startContent={<FiDollarSign size={14} />}
                        variant="flat"
                      >
                        {product.price}
                      </Chip>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <Tooltip
                      key={index}
                      content={`Products tagged with ${tag}`}
                    >
                      <Chip
                        className="bg-foreground/5 cursor-help"
                        color="default"
                        size="sm"
                        variant="flat"
                      >
                        {tag}
                      </Chip>
                    </Tooltip>
                  ))}
                  {product.tags.length > 3 && (
                    <Tooltip content={product.tags.slice(3).join(", ")}>
                      <Chip
                        className="cursor-help"
                        color="default"
                        size="sm"
                        variant="flat"
                      >
                        +{product.tags.length - 3}
                      </Chip>
                    </Tooltip>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Chip
                    color="default"
                    size="sm"
                    startContent={<FiCalendar size={14} />}
                    variant="dot"
                  >
                    {new Date(product.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </Chip>

                  <Tooltip content="Includes all features">
                    <Chip color="success" size="sm" variant="dot">
                      {product.features.length} features
                    </Chip>
                  </Tooltip>
                </div>
              </CardBody>
              <CardFooter className="flex gap-2">
                <Button
                  as={Link}
                  className="flex-1"
                  color="primary"
                  href={`/marketplace/${product.slug}`}
                  radius="full"
                >
                  View Details
                </Button>
                <Button
                  isIconOnly
                  as={Link}
                  className="bg-foreground/5"
                  color="default"
                  href={product.demo}
                  radius="full"
                  target="_blank"
                  variant="flat"
                >
                  <FiExternalLink />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-xl">
            <CardBody className="p-10 md:p-16">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4" color="primary" variant="flat">
                  <span className="px-2 py-0.5">Need Something Custom?</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Looking for Custom Solutions?
                </h2>
                <p className="text-foreground/70 mb-10 text-lg">
                  If you need a custom template or development service, I&apos;m
                  here to help. Let&apos;s discuss your project requirements and
                  create something amazing together.
                </p>
                <Button
                  as={Link}
                  className="px-8 shadow-md shadow-primary/20"
                  color="primary"
                  endContent={<FiArrowRight />}
                  href="/contact"
                  radius="full"
                  size="lg"
                >
                  Contact Me
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
