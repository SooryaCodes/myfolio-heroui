"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCalendar, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { addToast } from "@heroui/toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Show success message using Toast
      addToast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
        color: "success",
        variant: "flat",
        radius: "full",
      });
    }, 1500);
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
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-5 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge 
            variant="flat" 
            color="primary" 
            className="mb-4 glass-premium border border-primary/20"
          >
            <span className="px-2 py-0.5 text-primary">Get In Touch</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">Let's Connect</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out, and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <Card className="glass-premium border border-border">
              <CardHeader className="pb-0">
                <h3 className="text-2xl font-bold text-foreground">Send Me a Message</h3>
              </CardHeader>
              
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="name"
                      label="Your Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      variant="bordered"
                      radius="lg"
                      labelPlacement="outside"
                      isRequired
                      startContent={
                        <FiMail className="text-muted mr-2 flex-shrink-0" />
                      }
                    />
                    <Input
                      type="email"
                      name="email"
                      label="Your Email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      variant="bordered"
                      radius="lg"
                      labelPlacement="outside"
                      isRequired
                      startContent={
                        <FiMail className="text-muted mr-2 flex-shrink-0" />
                      }
                    />
                  </div>
                  
                  <Input
                    type="text"
                    name="subject"
                    label="Subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    variant="bordered"
                    radius="lg"
                    labelPlacement="outside"
                    isRequired
                  />
                  
                  <Textarea
                    name="message"
                    label="Your Message"
                    placeholder="Tell me about your project, timeline, and budget..."
                    value={formData.message}
                    onChange={handleChange}
                    variant="bordered"
                    radius="lg"
                    labelPlacement="outside"
                    isRequired
                    minRows={5}
                  />
                  
                  <Button
                    type="submit"
                    color="primary"
                    variant="flat"
                    radius="full"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    startContent={!loading && <FiSend />}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <Card className="glass-premium border border-border h-full">
              <CardHeader>
                <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
              </CardHeader>
              
              <CardBody className="gap-6 flex flex-col">
                <p className="text-muted">
                  Feel free to contact me through any of the following methods.
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>

                <motion.div 
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  <motion.div variants={item} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Email</p>
                      <Link
                        isExternal
                        href="mailto:your.email@example.com"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        your.email@example.com
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Phone</p>
                      <Link
                        isExternal
                        href="tel:+1234567890"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Location</p>
                      <p className="text-foreground">San Francisco, CA, USA</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={item} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <FiCalendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Availability</p>
                      <div className="flex gap-2 items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        <span className="text-foreground">Available for new projects</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Divider className="my-2" />

                <div>
                  <p className="text-sm text-muted mb-4">Or connect with me on social media:</p>
                  <div className="flex gap-3">
                    <Tooltip content="GitHub">
                      <Link
                        isExternal
                        href="https://github.com/yourusername"
                        className="p-3 rounded-full bg-default/10 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <FiGithub size={18} />
                      </Link>
                    </Tooltip>
                    <Tooltip content="LinkedIn">
                      <Link
                        isExternal
                        href="https://linkedin.com/in/yourusername"
                        className="p-3 rounded-full bg-default/10 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <FiLinkedin size={18} />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Twitter">
                      <Link
                        isExternal
                        href="https://twitter.com/yourusername"
                        className="p-3 rounded-full bg-default/10 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <FiTwitter size={18} />
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 