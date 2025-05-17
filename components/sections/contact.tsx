"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

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
      
      // Show success message
      alert("Message sent! Thanks for reaching out. I'll get back to you soon.");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="flat" color="primary" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out, and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    label="Your Email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="subject"
                    label="Subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    label="Your Message"
                    placeholder="Tell me about your project, timeline, and budget..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    fullWidth
                    minRows={5}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className={buttonStyles({
                      color: "primary",
                      size: "lg",
                      className: "w-full",
                    })}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-foreground/70 mb-8">
                Feel free to contact me through any of the following methods.
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Email</h4>
                    <Link
                      isExternal
                      href="mailto:your.email@example.com"
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      your.email@example.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Phone</h4>
                    <Link
                      isExternal
                      href="tel:+1234567890"
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Location</h4>
                    <p className="text-foreground/70">San Francisco, CA, USA</p>
                  </div>
                </div>
              </div>

              <Divider className="my-8" />

              <div>
                <h4 className="text-lg font-semibold mb-4">Availability</h4>
                <p className="text-foreground/70 mb-4">
                  I'm currently available for freelance work or full-time
                  opportunities. My typical response time is within 24 hours.
                </p>
                <div className="flex gap-3 items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Available for new projects</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 