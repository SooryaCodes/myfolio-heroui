"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Tooltip } from "@heroui/tooltip";
import { Spinner } from "@heroui/spinner";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Link } from "@heroui/link";
import {
  FiMessageSquare,
  FiSend,
  FiX,
  FiMinimize2,
  FiMaximize2,
  FiRefreshCw,
  FiUser,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiCode,
  FiStar,
} from "react-icons/fi";

// Sample questions that users can click on
const sampleQuestions = [
  "What projects have you worked on?",
  "What are your main skills?",
  "Tell me about your experience",
  "How can I contact you?",
  "What services do you offer?",
];

// Developer information
const developerInfo = {
  name: "Johan Beker",
  title: "Full-Stack Developer & Designer",
  location: "Berlin, Germany",
  email: "johan.beker@example.com",
  skills: ["React", "TypeScript", "Node.js", "UI/UX Design", "Next.js", "TailwindCSS"],
  experience: [
    "5+ years in web development",
    "Worked with startups and enterprise clients",
    "Led development teams on multiple projects",
  ],
  projects: [
    "E-commerce platform for a fashion brand",
    "SaaS dashboard for data analytics",
    "Portfolio website (this one!)",
    "Mobile app for event management",
  ],
  services: [
    "Web Development",
    "UI/UX Design",
    "Mobile App Development",
    "Consultation",
  ],
  contactInfo: {
    email: "johan.beker@example.com",
    github: "https://github.com/johanbeker",
    linkedin: "https://linkedin.com/in/johanbeker",
    twitter: "https://twitter.com/johanbeker",
  },
};

// Message interface
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Generate a response based on the user's message
const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Projects
  if (lowerMessage.includes("project") || lowerMessage.includes("portfolio") || lowerMessage.includes("work")) {
    return `I've worked on several projects including: ${developerInfo.projects.join(", ")}. Would you like more details about any specific project?`;
  }
  
  // Skills
  if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack")) {
    return `My main skills include: ${developerInfo.skills.join(", ")}. I'm constantly learning and expanding my skillset.`;
  }
  
  // Experience
  if (lowerMessage.includes("experience") || lowerMessage.includes("background") || lowerMessage.includes("work history")) {
    return `I have ${developerInfo.experience[0]}. ${developerInfo.experience[1]}. ${developerInfo.experience[2]}. Is there something specific about my background you'd like to know?`;
  }
  
  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
    return `You can reach me at ${developerInfo.contactInfo.email}, or connect with me on LinkedIn, GitHub, or Twitter. Check the contact section for more details.`;
  }
  
  // Services
  if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("help")) {
    return `I offer services in ${developerInfo.services.join(", ")}. Let me know if you'd like to discuss a potential project!`;
  }
  
  // About
  if (lowerMessage.includes("about") || lowerMessage.includes("who") || lowerMessage.includes("tell me about")) {
    return `I'm ${developerInfo.name}, a ${developerInfo.title} based in ${developerInfo.location}. I specialize in creating modern, responsive web applications and have a passion for clean, elegant design.`;
  }
  
  // Default response
  return `Thanks for your message! I'm an AI assistant designed to tell you about ${developerInfo.name}. Feel free to ask about projects, skills, experience, or how to get in touch.`;
};

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi there! 👋 I'm an AI assistant that can tell you all about ${developerInfo.name}. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);
  
  const handleSend = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(userMessage.content),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hi there! 👋 I'm an AI assistant that can tell you all about ${developerInfo.name}. What would you like to know?`,
        timestamp: new Date(),
      },
    ]);
  };
  
  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };
  
  return (
    <>
      {/* Chat button */}
      <Button
        isIconOnly
        aria-label="Chat with AI"
        className="fixed bottom-8 right-8 z-50 shadow-lg"
        color="primary"
        radius="full"
        size="lg"
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
      >
        <FiMessageSquare size={24} />
      </Button>
      
      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "auto" : "70vh",
              width: isMinimized ? "300px" : "380px",
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="shadow-xl h-full overflow-hidden border border-foreground/10">
              {/* Chat header */}
              <CardHeader className="p-4 bg-primary text-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      src="/images/profile.jpg"
                      fallback={
                        <div className="bg-primary-400 text-white font-medium">JB</div>
                      }
                    />
                    <div>
                      <p className="font-medium">{developerInfo.name}'s Assistant</p>
                      <p className="text-xs opacity-80">Ask me anything about {developerInfo.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      isIconOnly
                      aria-label={isMinimized ? "Maximize" : "Minimize"}
                      color="default"
                      radius="full"
                      size="sm"
                      variant="flat"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
                    </Button>
                    <Button
                      isIconOnly
                      aria-label="Close chat"
                      color="default"
                      radius="full"
                      size="sm"
                      variant="flat"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiX size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {!isMinimized && (
                <>
                  {/* Chat messages */}
                  <CardBody className="p-0 overflow-y-auto" style={{ height: "calc(70vh - 170px)" }}>
                    <div className="p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <Avatar
                              className="mr-2 mt-1 flex-shrink-0"
                              size="sm"
                              src="/images/profile.jpg"
                              fallback={
                                <div className="bg-primary-400 text-white font-medium">JB</div>
                              }
                            />
                          )}
                          <div className="space-y-1 max-w-[80%]">
                            <div
                              className={`p-3 rounded-lg ${
                                message.role === "user"
                                  ? "bg-primary text-white rounded-br-none"
                                  : "bg-foreground/5 text-foreground rounded-bl-none"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-foreground/50 px-1">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {message.role === "user" && (
                            <Avatar
                              className="ml-2 mt-1 flex-shrink-0"
                              size="sm"
                              icon={<FiUser />}
                            />
                          )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <Avatar
                            className="mr-2 mt-1 flex-shrink-0"
                            size="sm"
                            src="/images/profile.jpg"
                            fallback={
                              <div className="bg-primary-400 text-white font-medium">JB</div>
                            }
                          />
                          <div className="p-3 rounded-lg bg-foreground/5 text-foreground rounded-bl-none">
                            <Spinner size="sm" color="primary" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </CardBody>
                  
                  {/* Sample questions */}
                  <div className="px-4 py-2 bg-foreground/5">
                    <p className="text-xs font-medium mb-2 text-foreground/70">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sampleQuestions.map((question, index) => (
                        <Chip
                          key={index}
                          className="cursor-pointer"
                          color="default"
                          size="sm"
                          variant="flat"
                          onClick={() => handleSampleQuestion(question)}
                        >
                          {question}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  
                  <Divider />
                  
                  {/* Chat input */}
                  <CardFooter className="p-2">
                    <div className="flex items-center w-full gap-2">
                      <Tooltip content="Clear chat">
                        <Button
                          isIconOnly
                          aria-label="Clear chat"
                          color="default"
                          radius="full"
                          size="sm"
                          variant="flat"
                          onClick={handleClearChat}
                        >
                          <FiRefreshCw size={16} />
                        </Button>
                      </Tooltip>
                      <Input
                        ref={inputRef}
                        className="flex-grow"
                        placeholder="Ask a question..."
                        radius="full"
                        size="sm"
                        value={inputValue}
                        variant="flat"
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button
                        isIconOnly
                        aria-label="Send message"
                        color="primary"
                        isDisabled={inputValue.trim() === "" || isLoading}
                        radius="full"
                        size="sm"
                        onClick={handleSend}
                      >
                        <FiSend size={16} />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
              
              {isMinimized && (
                <CardBody className="p-3">
                  <p className="text-sm text-foreground/70">Chat is minimized. Click to continue the conversation.</p>
                </CardBody>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatAssistant; 