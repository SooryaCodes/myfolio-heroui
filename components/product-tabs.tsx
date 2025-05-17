"use client";

import React from 'react';
import { Card, CardBody } from '@heroui/card';
import { Tabs, Tab } from '@heroui/tabs';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { FiCheckCircle } from 'react-icons/fi';

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

// MarketplaceProduct interface
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

export default function ProductTabs({ product }: { product: ExtendedMarketplaceProduct }) {
  return (
    <Tabs 
      aria-label="Product Information"
      color="primary"
      variant="underlined"
      classNames={{
        tabList: "gap-8",
        cursor: "bg-primary",
        tab: "max-w-fit px-0 h-12 text-base",
      }}
    >
      <Tab key="description" title="Full Description">
        <Card className="shadow-sm border-none mt-6 bg-card/75 backdrop-blur-sm">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Full Description</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:text-foreground/80 prose-headings:text-foreground">
              {product.fullDescription ? (
                <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
              ) : (
                <p className="text-foreground/60">No detailed description available for this product.</p>
              )}
            </div>
          </CardBody>
        </Card>
      </Tab>
      <Tab key="features" title="Features">
        <Card className="shadow-sm border-none mt-6 bg-card/75 backdrop-blur-sm">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Product Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => {
                // Check if feature is a string or an object
                const isFeatureObject = typeof feature !== 'string';
                const title = isFeatureObject ? (feature as ProductFeature).title : feature;
                const description = isFeatureObject ? (feature as ProductFeature).description : '';
                
                return (
                  <div key={index} className="flex gap-3">
                    <FiCheckCircle className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground">{title}</h3>
                      {description && <p className="text-foreground/70 text-sm">{description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </Tab>
      
      <Tab key="specifications" title="Specifications">
        <Card className="shadow-sm border-none mt-6 bg-card/75 backdrop-blur-sm">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Technical Specifications</h2>
            
            <Accordion>
              {product.specifications && product.specifications.length > 0 ? 
                product.specifications.map((spec: ProductSpecification, index: number) => (
                  <AccordionItem 
                    key={index} 
                    title={<span className="text-foreground">{spec.title}</span>}
                    subtitle={spec.subtitle ? <span className="text-foreground/60 text-sm">{spec.subtitle}</span> : undefined}
                  >
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="text-foreground/70">{spec.description}</p>
                      {spec.items && (
                        <ul className="mt-2 list-disc pl-4 text-foreground/70">
                          {spec.items.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </AccordionItem>
                ))
              : 
                <AccordionItem key="no-specs" title={<span className="text-foreground">No Specifications</span>}>
                  <div className="text-foreground/60 py-4">
                    No detailed specifications available for this product.
                  </div>
                </AccordionItem>
              }
            </Accordion>
          </CardBody>
        </Card>
      </Tab>
      
      <Tab key="requirements" title="Requirements">
        <Card className="shadow-sm border-none mt-6 bg-card/75 backdrop-blur-sm">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">System Requirements</h2>
            
            {product.requirements ? (
              <div className="space-y-6">
                {product.requirements.map((req: ProductRequirement, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium text-lg mb-2 text-foreground">{req.title}</h3>
                    <ul className="list-disc pl-6 text-foreground/70 space-y-2">
                      {req.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">
                No specific system requirements for this product.
              </p>
            )}
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
} 