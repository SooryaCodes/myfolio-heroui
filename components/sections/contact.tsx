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
import { FiMail, FiMapPin, FiPhone, FiSend, FiCalendar, FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiUser, FiMessageSquare } from "react-icons/fi";
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
    <section id="contact" className="py-32 px-6 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 grid-pattern opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-1"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-1"></div>
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/10 filter blur-3xl opacity-30 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge 
            variant="flat" 
            color="primary" 
            className="mb-4 glass-premium border border-primary/20"
          >
            <span className="px-2 py-0.5 text-primary">Get In Touch</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">Let's Connect</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out, and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <Card className="glass-premium border border-border p-4 shadow-xl overflow-hidden transform-3d hover-lift">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 z-0"></div>
              <CardHeader className="pb-0 relative z-10">
                <h3 className="text-2xl font-bold text-foreground">Send Me a Message</h3>
              </CardHeader>
              
              <CardBody className="relative z-10">
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
                      classNames={{
                        input: "bg-default-50/30",
                        inputWrapper: "bg-default-50/30 hover:bg-default-50/50 border-primary/20"
                      }}
                      startContent={
                        <FiUser className="text-primary mr-2 flex-shrink-0" />
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
                      classNames={{
                        input: "bg-default-50/30",
                        inputWrapper: "bg-default-50/30 hover:bg-default-50/50 border-primary/20"
                      }}
                      startContent={
                        <FiMail className="text-primary mr-2 flex-shrink-0" />
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
                    classNames={{
                      input: "bg-default-50/30",
                      inputWrapper: "bg-default-50/30 hover:bg-default-50/50 border-primary/20"
                    }}
                    startContent={
                      <FiMessageSquare className="text-primary mr-2 flex-shrink-0" />
                    }
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
                    classNames={{
                      input: "bg-default-50/30",
                      inputWrapper: "bg-default-50/30 hover:bg-default-50/50 border-primary/20"
                    }}
                  />
                  
                  <Button
                    type="submit"
                    color="primary"
                    variant="shadow"
                    radius="full"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    startContent={!loading && <FiSend />}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-lg"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <Card className="glass-premium border border-border p-4 h-full shadow-xl transform-3d hover-lift overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-0"></div>
              <CardHeader className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
              </CardHeader>
              
              <CardBody className="gap-6 flex flex-col relative z-10">
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
                  className="space-y-6"
                >
                  <motion.div variants={item} className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all shadow-sm">
                      <FiMail size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1 font-medium">Email</p>
                      <Link
                        isExternal
                        href="mailto:your.email@example.com"
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        your.email@example.com
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all shadow-sm">
                      <FiPhone size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1 font-medium">Phone</p>
                      <Link
                        isExternal
                        href="tel:+1234567890"
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        +1 (234) 567-890
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all shadow-sm">
                      <FiMapPin size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1 font-medium">Location</p>
                      <p className="text-foreground font-medium">San Francisco, CA, USA</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={item} className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all shadow-sm">
                      <FiCalendar size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1 font-medium">Availability</p>
                      <div className="flex gap-2 items-center">
                        <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-foreground font-medium">Available for new projects</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <Divider className="my-2" />

                <div>
                  <p className="text-sm text-muted mb-4 font-medium">Or connect with me on social media:</p>
                  <div className="flex gap-4">
                    <Tooltip content="GitHub">
                      <Link
                        isExternal
                        href="https://github.com/yourusername"
                        className="p-3.5 rounded-xl bg-primary/10 text-foreground hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
                        aria-label="GitHub"
                      >
                        <FiGithub size={20} />
                      </Link>
                    </Tooltip>
                    <Tooltip content="LinkedIn">
                      <Link
                        isExternal
                        href="https://linkedin.com/in/yourusername"
                        className="p-3.5 rounded-xl bg-primary/10 text-foreground hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
                        aria-label="LinkedIn"
                      >
                        <FiLinkedin size={20} />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Twitter">
                      <Link
                        isExternal
                        href="https://twitter.com/yourusername"
                        className="p-3.5 rounded-xl bg-primary/10 text-foreground hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
                        aria-label="Twitter"
                      >
                        <FiTwitter size={20} />
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
              
              <CardFooter className="bg-primary/5 border-t border-primary/10 relative z-10">
                <Button
                  as={Link}
                  href="#"
                  variant="flat"
                  color="primary"
                  radius="full"
                  size="md"
                  endContent={<FiArrowRight />}
                  className="ml-auto"
                >
                  Schedule a Call
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 