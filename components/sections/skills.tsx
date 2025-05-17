"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Progress } from "@heroui/progress";
import { Divider } from "@heroui/divider";
import { Tabs, Tab } from "@heroui/tabs";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { RevealOnScroll, MaskReveal, TrackScroll } from "@/components/scroll-animations";
import { AnimatedTextReveal } from "@/components/parallax-section";
import { Tilt3D } from "@/components/scroll-animations";
import { FiCode, FiServer, FiPenTool, FiTool } from "react-icons/fi";

const frontendSkills = [
  { name: "React", level: 95, icon: <FiCode /> },
  { name: "Next.js", level: 90, icon: <FiCode /> },
  { name: "TypeScript", level: 85, icon: <FiCode /> },
  { name: "Tailwind CSS", level: 90, icon: <FiCode /> },
  { name: "Hero UI", level: 90, icon: <FiCode /> },
  { name: "Framer Motion", level: 80, icon: <FiCode /> },
];

const backendSkills = [
  { name: "Node.js", level: 85, icon: <FiServer /> },
  { name: "Express", level: 85, icon: <FiServer /> },
  { name: "PostgreSQL", level: 80, icon: <FiServer /> },
  { name: "MongoDB", level: 80, icon: <FiServer /> },
  { name: "GraphQL", level: 75, icon: <FiServer /> },
  { name: "Firebase", level: 85, icon: <FiServer /> },
];

const designSkills = [
  { name: "Figma", level: 90, icon: <FiPenTool /> },
  { name: "UI/UX Design", level: 85, icon: <FiPenTool /> },
  { name: "Adobe XD", level: 80, icon: <FiPenTool /> },
  { name: "Adobe Photoshop", level: 75, icon: <FiPenTool /> },
  { name: "Design Systems", level: 85, icon: <FiPenTool /> },
  { name: "Wireframing", level: 90, icon: <FiPenTool /> },
];

const otherSkills = [
  { name: "Git & GitHub", level: 90, icon: <FiTool /> },
  { name: "Docker", level: 80, icon: <FiTool /> },
  { name: "CI/CD", level: 75, icon: <FiTool /> },
  { name: "Jest & Testing", level: 85, icon: <FiTool /> },
  { name: "Responsive Design", level: 95, icon: <FiTool /> },
  { name: "Agile Methodologies", level: 85, icon: <FiTool /> },
];

const skillCategories = [
  { key: "frontend", title: "Frontend", skills: frontendSkills, color: "rgba(99, 102, 241, 0.8)" },
  { key: "backend", title: "Backend", skills: backendSkills, color: "rgba(16, 185, 129, 0.8)" },
  { key: "design", title: "Design", skills: designSkills, color: "rgba(236, 72, 153, 0.8)" },
  { key: "other", title: "Other", skills: otherSkills, color: "rgba(249, 115, 22, 0.8)" },
];

export const Skills = () => {
  const [skillType, setSkillType] = useState("frontend");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const currentCategory = skillCategories.find(category => category.key === skillType);

  const renderSkills = (skills: typeof frontendSkills, color: string) => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          },
          hidden: {}
        }}
        className="space-y-6"
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name} 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className="relative"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-foreground/60">{skill.icon}</span>
                <span className="font-medium">{skill.name}</span>
              </div>
              <span className="text-foreground/70">{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-default-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${skill.level}%`,
                  transition: { 
                    duration: 1.2, 
                    delay: index * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }}
              />
            </div>
            {hoverIndex === index && (
              <motion.div 
                className="absolute -right-4 top-0 bg-default-50 dark:bg-default-100 p-1 px-2 rounded-full text-xs"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
              >
                {skill.level}%
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-24 px-6 bg-default-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] -top-[400px] -left-[400px]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] -bottom-[300px] -right-[300px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <Badge variant="flat" color="primary" className="mb-4">
              Expertise
            </Badge>
            <AnimatedTextReveal 
              text="Technical Skills"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <p className="text-foreground/70 max-w-2xl mx-auto">
              A comprehensive collection of my technical skills and proficiencies
              gained through years of experience and continuous learning.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealOnScroll direction="left" delay={0.2}>
            <div className="rounded-xl p-6 md:p-8 bg-background/50 backdrop-blur-sm shadow-sm border border-default-100">
              <Tabs
                aria-label="Skill categories"
                color="primary"
                variant="underlined"
                selectedKey={skillType}
                onSelectionChange={(key) => setSkillType(key as string)}
                className="mb-8"
              >
                {skillCategories.map(category => (
                  <Tab key={category.key} title={category.title} />
                ))}
              </Tabs>

              {currentCategory && renderSkills(currentCategory.skills, currentCategory.color)}
            </div>
          </RevealOnScroll>

          <div className="space-y-8">
            <RevealOnScroll direction="right" delay={0.4}>
              <div className="rounded-xl p-6 md:p-8 bg-background/50 backdrop-blur-sm shadow-sm border border-default-100">
                <h3 className="text-2xl font-bold mb-6">Areas of Expertise</h3>
                <Accordion variant="bordered" className="mb-8">
                  <AccordionItem
                    key="1"
                    aria-label="Web Development"
                    title="Web Development"
                    subtitle="Building modern, responsive web applications"
                    className="group"
                    startContent={
                      <div className="bg-primary/10 p-2 rounded-md group-data-[open=true]:bg-primary/20 transition-colors">
                        <FiCode size={18} className="text-primary" />
                      </div>
                    }
                  >
                    <MaskReveal>
                      <div className="px-2 py-2 text-foreground/80">
                        <p>
                          I specialize in building high-performance web applications using
                          modern JavaScript frameworks like React and Next.js. My
                          expertise includes creating responsive layouts, implementing
                          complex state management solutions, and optimizing applications
                          for speed and accessibility.
                        </p>
                      </div>
                    </MaskReveal>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="UI/UX Design"
                    title="UI/UX Design"
                    subtitle="Creating beautiful and intuitive user experiences"
                    className="group"
                    startContent={
                      <div className="bg-pink-500/10 p-2 rounded-md group-data-[open=true]:bg-pink-500/20 transition-colors">
                        <FiPenTool size={18} className="text-pink-500" />
                      </div>
                    }
                  >
                    <MaskReveal>
                      <div className="px-2 py-2 text-foreground/80">
                        <p>
                          I have a strong eye for design and a deep understanding of
                          user experience principles. I create intuitive interfaces that
                          not only look beautiful but also provide excellent user
                          experiences. My design process involves wireframing,
                          prototyping, and iterative user testing.
                        </p>
                      </div>
                    </MaskReveal>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Backend Development"
                    title="Backend Development"
                    subtitle="Building robust server-side applications and APIs"
                    className="group"
                    startContent={
                      <div className="bg-green-500/10 p-2 rounded-md group-data-[open=true]:bg-green-500/20 transition-colors">
                        <FiServer size={18} className="text-green-500" />
                      </div>
                    }
                  >
                    <MaskReveal>
                      <div className="px-2 py-2 text-foreground/80">
                        <p>
                          I develop scalable and secure backend systems using Node.js,
                          Express, and various database technologies. My experience
                          includes designing RESTful APIs, implementing authentication
                          systems, and optimizing database queries for performance.
                        </p>
                      </div>
                    </MaskReveal>
                  </AccordionItem>
                </Accordion>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.6}>
              <div className="rounded-xl p-6 md:p-8 bg-background/50 backdrop-blur-sm shadow-sm border border-default-100">
                <h3 className="text-2xl font-bold mb-6">GitHub Contributions</h3>
                <Tilt3D className="overflow-hidden rounded-lg border border-default-100">
                  <TrackScroll>
                    <img
                      src="https://ghchart.rshah.org/yourusername"
                      alt="GitHub Contributions"
                      className="w-full rounded-lg bg-white"
                    />
                  </TrackScroll>
                  <p className="text-sm text-foreground/70 mt-4 text-center">
                    My GitHub contribution graph, showcasing consistent coding activity
                  </p>
                </Tilt3D>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}; 