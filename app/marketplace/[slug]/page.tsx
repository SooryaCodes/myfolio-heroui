"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import {
  FiArrowLeft,
  FiHome,
  FiExternalLink,
  FiDollarSign,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiCalendar,
} from "react-icons/fi";
import { Metadata } from "next";

import { marketplaceProducts } from "@/datas/marketplace";
import ProductTabs from "@/components/product-tabs";

// Define interfaces for marketplace product
interface ProductFeature {
  title: string;
  description: string;
}

interface ProductSpecification {
  title: string;
  subtitle?: string;
  description: string;
  items?: string[];
}

interface ProductRequirement {
  title: string;
  items: string[];
}

// Extend the MarketplaceProduct interface to include the additional properties
interface ExtendedMarketplaceProduct {
  id: number;
  slug: string;
  title: string;
  category: string;
  price: number;
  description: string;
  fullDescription?: string;
  image: string;
  images?: string[];
  demo: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  gallery?: string[];
  features: (string | ProductFeature)[];
  specifications?: ProductSpecification[];
  requirements?: ProductRequirement[];
}

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = marketplaceProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} | Marketplace`,
    description: product.description,
  };
}

const ProductPage = ({ params }: Props) => {
  const { slug } = params;
  const product = marketplaceProducts.find(
    (p) => p.slug === slug,
  ) as ExtendedMarketplaceProduct;

  useEffect(() => {
    // Prevent auto scrolling by setting scroll position to top
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    notFound();
  }

  // Find related products (excluding current one)
  const relatedProducts = marketplaceProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort(() => Math.random() - 0.5) // Shuffle array
    .slice(0, 2); // Take just 2 related products

  return (
    <main className="min-h-screen pt-20 pb-16 bg-background/50">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
        {/* Navigation */}
        <div className="mb-5 md:mb-8 flex flex-wrap gap-2 md:gap-3 items-center">
          <Button
            as={Link}
            color="primary"
            href="/"
            size="sm"
            startContent={<FiHome size={16} />}
            variant="light"
          >
            Home
          </Button>
          <span className="text-foreground/30">•</span>
          <Button
            as={Link}
            color="primary"
            href="/marketplace"
            size="sm"
            startContent={<FiArrowLeft size={16} />}
            variant="light"
          >
            Back to Marketplace
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Product Image Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-none border-none overflow-hidden bg-card/75 backdrop-blur-sm">
              <CardBody className="p-0">
                <div className="relative aspect-[16/9] md:aspect-[3/2] w-full rounded-xl overflow-hidden">
                  <Image
                    fill
                    priority
                    alt={product.title}
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
                    className="object-cover"
                    placeholder="blur"
                    src={product.image}
                  />
                </div>
              </CardBody>
            </Card>

            {/* Additional Images */}
            {product.gallery && product.gallery.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
                {product.gallery.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      fill
                      alt={`${product.title} gallery ${index + 1}`}
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                      src={img}
                    />
                  </div>
                ))}
              </div>
            ) : product.images && product.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
                {product.images.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      fill
                      alt={`${product.title} gallery ${index + 1}`}
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                      src={img}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Product Info Section */}
          <div>
            <div className="sticky top-20">
              <Card className="shadow-sm bg-foreground/5 backdrop-blur-sm border-none border border-foreground/5">
                <CardBody className="p-4 md:p-6">
                  <Badge className="mb-2" color="primary" variant="flat">
                    {product.category}
                  </Badge>

                  <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-foreground/70">
                      (Top-rated)
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-foreground/70 mb-4 md:mb-6">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {product.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        className="bg-foreground/5"
                        color="default"
                        size="sm"
                        startContent={<FiTag size={14} />}
                        variant="flat"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>

                  <Divider className="my-4" />

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground/70">Released</span>
                      <Chip
                        color="default"
                        size="sm"
                        startContent={<FiCalendar size={14} />}
                        variant="flat"
                      >
                        {new Date(product.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                          },
                        )}
                      </Chip>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Price</span>
                      <Chip
                        className="font-bold"
                        color="success"
                        size="md"
                        startContent={<FiDollarSign size={14} />}
                        variant="flat"
                      >
                        {product.price}
                      </Chip>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      className="w-full shadow-md shadow-primary/20"
                      color="primary"
                      radius="full"
                      size="lg"
                      startContent={<FiShoppingCart />}
                    >
                      Purchase Now
                    </Button>

                    <Button
                      as={Link}
                      className="w-full bg-foreground/5"
                      color="default"
                      endContent={<FiExternalLink />}
                      href={product.demo}
                      radius="full"
                      rel="noopener noreferrer"
                      size="lg"
                      target="_blank"
                      variant="flat"
                    >
                      View Live Demo
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 max-w-4xl">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="shadow-sm hover:shadow-lg transition-shadow border-none bg-card/75 backdrop-blur-sm"
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        fill
                        alt={relatedProduct.title}
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
                        className="object-cover"
                        placeholder="blur"
                        src={relatedProduct.image}
                      />
                      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <Badge
                          className="bg-white/20 text-white border-none"
                          variant="flat"
                        >
                          {relatedProduct.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                      {relatedProduct.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <Chip
                        color="success"
                        startContent={<FiDollarSign size={14} />}
                        variant="flat"
                      >
                        {relatedProduct.price}
                      </Chip>

                      <Button
                        as={Link}
                        color="primary"
                        endContent={<FiArrowLeft className="rotate-180" />}
                        href={`/marketplace/${relatedProduct.slug}`}
                        size="sm"
                        variant="light"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-16 text-center">
          <Button
            as={Link}
            className="px-8 shadow-md"
            color="primary"
            href="/marketplace"
            radius="full"
            size="lg"
            startContent={<FiArrowLeft />}
            variant="flat"
          >
            Back to Marketplace
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
