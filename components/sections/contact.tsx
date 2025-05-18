"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiCalendar,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiUser,
  FiMessageSquare,
  FiVideo,
} from "react-icons/fi";
import { addToast } from "@heroui/toast";
import "@/styles/animations.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 },
    },
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="contact">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 grid-pattern opacity-5 z-0" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-1" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-1" />

      {/* Animated gradient blobs */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 filter blur-[120px] opacity-30 z-0 animate-blob" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-secondary/20 to-primary/20 filter blur-[150px] opacity-30 z-0 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 filter blur-[100px] opacity-20 z-0 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Badge
            className="mb-4 border-none bg-primary/10 backdrop-blur-sm"
            color="primary"
            variant="flat"
          >
            <span className="px-3 py-1 text-primary">Get In Touch</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Let&apos;s Connect
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out, and I&apos;ll get back to you as soon as
            possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-foreground/5 backdrop-blur-md border-none rounded-2xl p-1 shadow-xl overflow-hidden hover:shadow-primary/10 transition-all duration-500 perspective-1000">
              {/* Card interior with gradient */}
              <div className="bg-gradient-to-tr from-background/80 via-background/70 to-background/80 backdrop-blur-md rounded-xl p-6 relative overflow-hidden">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-70 z-0" />

                {/* Floating 3D elements */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0 animate-float" />
                <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-secondary/5 blur-3xl z-0 animate-float-slow" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-8 inline-flex items-center">
                    <span className="mr-3 p-2 rounded-full bg-primary/10">
                      <FiSend className="text-primary" />
                    </span>
                    Send Me a Message
                  </h3>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        isRequired
                        classNames={{
                          label: "text-foreground/70 font-medium",
                          input: "bg-foreground/5",
                          inputWrapper:
                            "bg-foreground/5 hover:bg-foreground/10 border-none shadow-sm",
                        }}
                        label="Your Name"
                        labelPlacement="outside"
                        name="name"
                        placeholder="John Doe"
                        radius="lg"
                        startContent={
                          <FiUser className="text-primary mr-2 flex-shrink-0" />
                        }
                        type="text"
                        value={formData.name}
                        variant="flat"
                        onChange={handleChange}
                      />
                      <Input
                        isRequired
                        classNames={{
                          label: "text-foreground/70 font-medium",
                          input: "bg-foreground/5",
                          inputWrapper:
                            "bg-foreground/5 hover:bg-foreground/10 border-none shadow-sm",
                        }}
                        label="Your Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="john@example.com"
                        radius="lg"
                        startContent={
                          <FiMail className="text-primary mr-2 flex-shrink-0" />
                        }
                        type="email"
                        value={formData.email}
                        variant="flat"
                        onChange={handleChange}
                      />
                    </div>

                    <Input
                      isRequired
                      classNames={{
                        label: "text-foreground/70 font-medium",
                        input: "bg-foreground/5",
                        inputWrapper:
                          "bg-foreground/5 hover:bg-foreground/10 border-none shadow-sm",
                      }}
                      label="Subject"
                      labelPlacement="outside"
                      name="subject"
                      placeholder="Project Inquiry"
                      radius="lg"
                      startContent={
                        <FiMessageSquare className="text-primary mr-2 flex-shrink-0" />
                      }
                      type="text"
                      value={formData.subject}
                      variant="flat"
                      onChange={handleChange}
                    />

                    <Textarea
                      isRequired
                      classNames={{
                        label: "text-foreground/70 font-medium",
                        input: "bg-foreground/5",
                        inputWrapper:
                          "bg-foreground/5 hover:bg-foreground/10 border-none shadow-sm",
                      }}
                      label="Your Message"
                      labelPlacement="outside"
                      minRows={5}
                      name="message"
                      placeholder="Tell me about your project, timeline, and budget..."
                      radius="lg"
                      value={formData.message}
                      variant="flat"
                      onChange={handleChange}
                    />

                    <Button
                      fullWidth
                      className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                      color="primary"
                      isLoading={loading}
                      radius="full"
                      size="lg"
                      startContent={!loading && <FiSend />}
                      type="submit"
                      variant="shadow"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-foreground/5 backdrop-blur-md border-none rounded-2xl p-1 h-full shadow-xl overflow-hidden hover:shadow-primary/10 transition-all duration-500 perspective-1000">
              <div className="bg-gradient-to-br from-background/80 via-background/70 to-background/80 backdrop-blur-md rounded-xl p-6 h-full relative overflow-hidden">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-70 z-0" />

                {/* 3D floating elements */}
                <div className="absolute top-1/3 right-0 w-32 h-32 rounded-full bg-primary/5 blur-2xl z-0 animate-float-slow" />
                <div className="absolute bottom-1/3 left-0 w-24 h-24 rounded-full bg-secondary/5 blur-2xl z-0 animate-float" />

                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-6 inline-flex items-center">
                    <span className="mr-3 p-2 rounded-full bg-primary/10">
                      <FiPhone className="text-primary" />
                    </span>
                    Contact Information
                  </h3>

                  <div className="flex-grow">
                    <p className="text-foreground/70 mb-8">
                      Feel free to contact me through any of the following
                      methods. I&apos;m always open to discussing new projects,
                      creative ideas, or opportunities to be part of your
                      vision.
                    </p>

                    <motion.div
                      className="space-y-6"
                      initial="hidden"
                      variants={container}
                      viewport={{ once: true }}
                      whileInView="show"
                    >
                      <motion.div
                        className="flex items-center gap-4 group"
                        variants={item}
                      >
                        <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <FiMail size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/50 mb-1 font-medium">
                            Email
                          </p>
                          <Link
                            isExternal
                            className="text-foreground hover:text-primary transition-colors font-medium"
                            href="mailto:your.email@example.com"
                          >
                            your.email@example.com
                          </Link>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4 group"
                        variants={item}
                      >
                        <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <FiPhone size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/50 mb-1 font-medium">
                            Phone
                          </p>
                          <Link
                            isExternal
                            className="text-foreground hover:text-primary transition-colors font-medium"
                            href="tel:+1234567890"
                          >
                            +1 (234) 567-890
                          </Link>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4 group"
                        variants={item}
                      >
                        <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <FiMapPin size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/50 mb-1 font-medium">
                            Location
                          </p>
                          <p className="text-foreground font-medium">
                            San Francisco, CA, USA
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4 group"
                        variants={item}
                      >
                        <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <FiCalendar size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/50 mb-1 font-medium">
                            Availability
                          </p>
                          <div className="flex gap-2 items-center">
                            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-foreground font-medium">
                              Available for new projects
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <Divider className="my-6 bg-foreground/10" />

                    <div>
                      <p className="text-sm text-foreground/60 mb-4 font-medium">
                        Let&apos;s connect:
                      </p>
                      <div className="flex gap-4">
                        <Tooltip content="GitHub">
                          <Link
                            isExternal
                            aria-label="GitHub"
                            className="p-3.5 rounded-xl bg-foreground/10 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm hover:scale-110"
                            href="https://github.com/yourusername"
                          >
                            <FiGithub size={20} />
                          </Link>
                        </Tooltip>
                        <Tooltip content="LinkedIn">
                          <Link
                            isExternal
                            aria-label="LinkedIn"
                            className="p-3.5 rounded-xl bg-foreground/10 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm hover:scale-110"
                            href="https://linkedin.com/in/yourusername"
                          >
                            <FiLinkedin size={20} />
                          </Link>
                        </Tooltip>
                        <Tooltip content="Twitter">
                          <Link
                            isExternal
                            aria-label="Twitter"
                            className="p-3.5 rounded-xl bg-foreground/10 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm hover:scale-110"
                            href="https://twitter.com/yourusername"
                          >
                            <FiTwitter size={20} />
                          </Link>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-foreground/10">
                    <Button
                      as={Link}
                      className="w-full font-medium"
                      color="primary"
                      href="#"
                      radius="full"
                      size="lg"
                      startContent={<FiVideo />}
                      variant="flat"
                    >
                      Schedule a Video Call
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Animation styles imported from /styles/animations.css */}
    </section>
  );
};
