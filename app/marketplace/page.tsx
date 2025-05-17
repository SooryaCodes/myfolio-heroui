"use client";

import React, { useState } from 'react';
import { marketplaceProducts } from '@/datas/marketplace';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Badge } from '@heroui/badge';
import { Chip } from '@heroui/chip';
import { Tabs, Tab } from '@heroui/tabs';
import { Tooltip } from '@heroui/tooltip';
import { Link } from '@heroui/link';
import { Progress } from '@heroui/progress';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { FiArrowRight, FiExternalLink, FiFilter, FiTag, FiShoppingCart, FiStar, FiDollarSign, FiCalendar, FiArrowUp, FiHome } from 'react-icons/fi';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(marketplaceProducts.map(product => product.category.toLowerCase())))];

  // Filter products based on search query and category
  const filteredProducts = marketplaceProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'newest') {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    } else if (sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    return 0;
  });

  // Featured products
  const featuredProducts = marketplaceProducts.filter(product => product.featured);

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back to Home */}
        <div className="mb-8">
          <Button
            as={Link}
            href="/"
            variant="light"
            color="primary"
            size="sm"
            startContent={<FiHome />}
            className="mb-6"
          >
            Back to Home
          </Button>
        </div>
        
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <Badge color="primary" variant="flat" className="mb-4">
            <span className="px-2 py-0.5">Marketplace</span>
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Products</h1>
          <p className="text-foreground/70 text-lg mb-8 max-w-3xl mx-auto">
            Browse my collection of premium templates, components, and digital resources designed to accelerate your development workflow.
          </p>
          <div className="max-w-lg mx-auto">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              radius="full"
              size="lg"
              classNames={{
                inputWrapper: "bg-foreground/5 border-none shadow-sm"
              }}
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
                    <Badge color="primary" variant="flat" className="mb-4 max-w-max">
                      Featured
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">{featuredProducts[0].title}</h2>
                    <p className="text-foreground/70 mb-6">{featuredProducts[0].description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProducts[0].tags.slice(0, 4).map((tag, index) => (
                        <Chip
                          key={index}
                          variant="flat"
                          color="primary"
                          radius="full"
                          size="sm"
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
                        <span className="text-sm text-foreground/60 ml-2">Highly rated</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        as={Link}
                        href={`/marketplace/${featuredProducts[0].slug}`}
                        color="primary"
                        radius="full"
                        className="px-6 shadow-md"
                        endContent={<FiArrowRight />}
                      >
                        View Details
                      </Button>
                      <Button
                        as={Link}
                        href={featuredProducts[0].demo}
                        target="_blank"
                        color="default"
                        variant="flat"
                        radius="full"
                        className="px-6"
                        endContent={<FiExternalLink />}
                      >
                        Live Demo
                      </Button>
                    </div>
                  </div>
                  <div className="relative min-h-[300px]">
                    <Image
                      src={featuredProducts[0].image}
                      alt={featuredProducts[0].title}
                      fill
                      className="object-cover object-center"
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
                color="primary"
                variant="light"
                radius="full"
                classNames={{
                  tabList: "bg-transparent p-1",
                  cursor: "bg-primary/20",
                  tab: "text-foreground/60 data-[selected=true]:text-primary text-sm",
                  panel: "p-0",
                }}
                selectedKey={selectedCategory}
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
                  variant="flat" 
                  color="default" 
                  startContent={<FiArrowUp />}
                  radius="full"
                  className="bg-foreground/5"
                >
                  {sortBy === 'featured' ? 'Featured' : 
                   sortBy === 'price-low' ? 'Price: Low to High' : 
                   sortBy === 'price-high' ? 'Price: High to Low' : 
                   'Newest'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Sort options"
                onAction={(key) => setSortBy(key.toString())}
                selectedKeys={[sortBy]}
                selectionMode="single"
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
            <Card key={product.id} className="shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge color="primary" variant="solid" className="px-2 py-1">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center">
                      <Badge variant="flat" className="bg-white/20 text-white border-none">
                        {product.category}
                      </Badge>
                      <Chip 
                        color="success" 
                        variant="flat" 
                        startContent={<FiDollarSign size={14} />}
                        className="bg-success/20 border-none"
                      >
                        {product.price}
                      </Chip>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <Tooltip key={index} content={`Products tagged with ${tag}`}>
                      <Chip
                        variant="flat"
                        color="default"
                        size="sm"
                        className="bg-foreground/5 cursor-help"
                      >
                        {tag}
                      </Chip>
                    </Tooltip>
                  ))}
                  {product.tags.length > 3 && (
                    <Tooltip content={product.tags.slice(3).join(', ')}>
                      <Chip
                        variant="flat"
                        color="default"
                        size="sm"
                        className="cursor-help"
                      >
                        +{product.tags.length - 3}
                      </Chip>
                    </Tooltip>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Chip
                    startContent={<FiCalendar size={14} />}
                    variant="dot"
                    color="default"
                    size="sm"
                  >
                    {new Date(product.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </Chip>
                  
                  <Tooltip content="Includes all features">
                    <Chip
                      variant="dot"
                      color="success"
                      size="sm"
                    >
                      {product.features.length} features
                    </Chip>
                  </Tooltip>
                </div>
              </CardBody>
              <CardFooter className="flex gap-2">
                <Button
                  as={Link}
                  href={`/marketplace/${product.slug}`}
                  color="primary"
                  radius="full"
                  className="flex-1"
                >
                  View Details
                </Button>
                <Button
                  as={Link}
                  href={product.demo}
                  target="_blank"
                  isIconOnly
                  variant="flat"
                  color="default"
                  radius="full"
                  className="bg-foreground/5"
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
                <Badge color="primary" variant="flat" className="mb-4">
                  <span className="px-2 py-0.5">Need Something Custom?</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking for Custom Solutions?</h2>
                <p className="text-foreground/70 mb-10 text-lg">
                  If you need a custom template or development service, I'm here to help. Let's discuss your project requirements and create something amazing together.
                </p>
                <Button
                  as={Link}
                  href="/contact"
                  color="primary"
                  radius="full"
                  size="lg"
                  className="px-8 shadow-md shadow-primary/20"
                  endContent={<FiArrowRight />}
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