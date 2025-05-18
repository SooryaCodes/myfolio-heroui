"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  FiCode,
  FiServer,
  FiPenTool,
  FiTool,
  FiExternalLink,
  FiGithub,
  FiClock,
  FiUsers,
} from "react-icons/fi";

import { RevealOnScroll } from "@/components/scroll-animations";

// Define interface for skill type
interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color?: string;
}

// Categorized skill groups
const frontendSkills: Skill[] = [
  { name: "React", level: 95, icon: <FiCode />, color: "#61DAFB" },
  { name: "Next.js", level: 90, icon: <FiCode />, color: "#000000" },
  { name: "TypeScript", level: 85, icon: <FiCode />, color: "#3178C6" },
  { name: "Tailwind CSS", level: 90, icon: <FiCode />, color: "#38B2AC" },
  { name: "Hero UI", level: 90, icon: <FiCode />, color: "#6366F1" },
  { name: "Framer Motion", level: 85, icon: <FiCode />, color: "#0055FF" },
];

const backendSkills: Skill[] = [
  { name: "Node.js", level: 85, icon: <FiServer />, color: "#339933" },
  { name: "Express", level: 85, icon: <FiServer />, color: "#000000" },
  { name: "PostgreSQL", level: 80, icon: <FiServer />, color: "#336791" },
  { name: "MongoDB", level: 80, icon: <FiServer />, color: "#47A248" },
  { name: "GraphQL", level: 75, icon: <FiServer />, color: "#E10098" },
  { name: "Firebase", level: 85, icon: <FiServer />, color: "#FFCA28" },
];

const designSkills: Skill[] = [
  { name: "Figma", level: 90, icon: <FiPenTool />, color: "#F24E1E" },
  { name: "UI/UX Design", level: 85, icon: <FiPenTool />, color: "#FF61F6" },
  { name: "Adobe XD", level: 80, icon: <FiPenTool />, color: "#FF61F6" },
  { name: "Adobe Photoshop", level: 75, icon: <FiPenTool />, color: "#31A8FF" },
  { name: "Design Systems", level: 85, icon: <FiPenTool />, color: "#FF7262" },
  { name: "Wireframing", level: 90, icon: <FiPenTool />, color: "#9747FF" },
];

const otherSkills: Skill[] = [
  { name: "Git & GitHub", level: 90, icon: <FiTool />, color: "#F05032" },
  { name: "Docker", level: 80, icon: <FiTool />, color: "#2496ED" },
  { name: "CI/CD", level: 75, icon: <FiTool />, color: "#4CAF50" },
  { name: "Jest & Testing", level: 85, icon: <FiTool />, color: "#C21325" },
  { name: "Responsive Design", level: 95, icon: <FiTool />, color: "#38B2AC" },
  {
    name: "Agile Methodologies",
    level: 85,
    icon: <FiTool />,
    color: "#6366F1",
  },
];

// Skill category definition
const skillCategories = [
  {
    key: "frontend",
    title: "Frontend",
    skills: frontendSkills,
    color: "var(--skills-frontend-gradient)",
    accentColor: "rgba(99, 102, 241, 1)",
  },
  {
    key: "backend",
    title: "Backend",
    skills: backendSkills,
    color: "var(--skills-backend-gradient)",
    accentColor: "rgba(16, 185, 129, 1)",
  },
  {
    key: "design",
    title: "Design",
    skills: designSkills,
    color: "var(--skills-design-gradient)",
    accentColor: "rgba(236, 72, 153, 1)",
  },
  {
    key: "other",
    title: "Other",
    skills: otherSkills,
    color: "var(--skills-other-gradient)",
    accentColor: "rgba(249, 115, 22, 1)",
  },
];

// Animated Progress Bar component
const AnimatedProgressBar = ({
  value,
  color,
  delay = 0,
}: {
  value: number;
  color: string;
  delay?: number;
}) => {
  return (
    <div className="h-1.5 w-full bg-default-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        style={{ backgroundColor: color }}
        viewport={{ once: true, margin: "-100px" }}
        whileInView={{
          width: `${value}%`,
          transition: {
            duration: 1.2,
            delay: delay,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
      />
    </div>
  );
};

// Simplified OrbitalSkills component without complex hook patterns
const OrbitalSkills = ({
  skills,
  color,
}: {
  skills: Skill[];
  color: string;
}) => {
  // Calculate static positions for each skill
  const positions = skills.map((_, index) => {
    const angle = index * (360 / skills.length) * (Math.PI / 180);
    const radius = 150;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  });

  return (
    <div className="relative h-[400px] w-full rounded-2xl border border-border overflow-hidden glass-premium">
      {/* Center core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center z-10"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent)`,
          boxShadow: `0 0 30px ${color}33`,
        }}
      >
        <div className="text-foreground text-center">
          <div className="text-2xl font-bold">{skills.length}</div>
          <div className="text-xs">Skills</div>
        </div>
      </div>

      {/* Orbital skills */}
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="absolute left-1/2 top-1/2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            x: positions[index].x, 
            y: positions[index].y,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.05,
          }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full p-3 text-white"
            style={{
              backgroundColor: skill.color || color,
              boxShadow: `0 0 15px ${skill.color || color}80`,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 20px ${skill.color || color}`,
            }}
          >
            <span className="text-lg">{skill.icon}</span>
          </motion.div>
          <motion.span
            className="absolute top-full mt-2 text-xs font-medium text-foreground bg-background/75 backdrop-blur-sm px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            {skill.name}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

// Skill Card component
const SkillCard = ({
  skill,
  index,
  color,
}: {
  skill: Skill;
  index: number;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="glass-premium border border-border overflow-hidden hover-lift transition-all duration-300">
        <CardBody className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-default-100 text-foreground">
                {skill.icon}
              </div>
              <h4 className="font-semibold text-foreground">{skill.name}</h4>
            </div>
            <Badge className="bg-default-100" variant="flat">
              {skill.level}%
            </Badge>
          </div>

          <AnimatedProgressBar
            color={color}
            delay={index * 0.1}
            value={skill.level}
          />
        </CardBody>
      </Card>

      <AnimatePresence>
        {hovered && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 z-10"
            exit={{ opacity: 0, y: 5 }}
            initial={{ opacity: 0, y: 5 }}
          >
            <div className="text-xs bg-background/90 backdrop-blur-md p-2 rounded-md border border-border text-foreground shadow-lg">
              <div className="flex items-center justify-between">
                <span>Proficiency:</span>
                <span className="font-medium">
                  {skill.level >= 90
                    ? "Expert"
                    : skill.level >= 80
                      ? "Advanced"
                      : skill.level >= 70
                        ? "Intermediate"
                        : "Beginner"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Skills = () => {
  const [mounted, setMounted] = useState(false);
  const [skillType, setSkillType] = useState("frontend");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );

  const currentCategory =
    skillCategories.find((category) => category.key === skillType) ||
    skillCategories[0];

  // Simple static version for SSR
  if (!mounted) {
    return (
      <section
        className="py-24 md:py-32 px-6 relative overflow-hidden"
        id="skills"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <Badge
              className="mb-4 border border-primary/20 glass-premium"
              color="primary"
              variant="flat"
            >
              <span className="px-2 py-0.5 text-primary">My Expertise</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Technical Skills
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              A showcase of my technical skills and proficiencies acquired
              through years of experience and continuous learning in various
              domains.
            </p>
          </div>

          {/* Simple tab list */}
          <div className="flex justify-center mb-12">
            {skillCategories.map((category) => (
              <div key={category.key} className="px-4 sm:px-6 py-2 text-sm">
                {category.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      id="skills"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 grid-pattern z-0"
        style={{ opacity: 0.05 }}
      />

      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full z-0"
        style={{ opacity, y: y1 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-primary/3 blur-[120px] rounded-full z-0"
        style={{ opacity, y: y2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-24">
            <Badge
              className="mb-4 border border-primary/20 glass-premium"
              color="primary"
              variant="flat"
            >
              <span className="px-2 py-0.5 text-primary">My Expertise</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Technical Skills
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              A showcase of my technical skills and proficiencies acquired
              through years of experience and continuous learning in various
              domains.
            </p>
          </div>
        </RevealOnScroll>

        {/* Main content */}
        <div className="mb-20">
          <Tabs
            aria-label="Skill categories"
            classNames={{
              tabList:
                "mb-12 mx-auto max-w-fit border-default-200 dark:border-default-100/20",
              cursor: "bg-primary/20",
              tab: "text-foreground/60 data-[selected=true]:text-primary px-4 sm:px-6 py-2 text-sm whitespace-nowrap",
            }}
            color="primary"
            selectedKey={skillType}
            variant="bordered"
            onSelectionChange={(key) => setSkillType(key as string)}
          >
            {skillCategories.map((category) => (
              <Tab key={category.key} title={category.title} />
            ))}
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Orbital visualization - only for desktop */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <OrbitalSkills
                color={currentCategory.accentColor}
                skills={currentCategory.skills}
              />
            </motion.div>

            {/* Mobile skill visualization - simplified version for mobile */}
            <motion.div
              className="mb-8 lg:hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <div className="glass-premium border border-border rounded-xl p-4 sm:p-6 overflow-hidden">
                <h3 className="text-xl font-bold mb-3 text-foreground text-center">
                  {currentCategory.title} Proficiency
                </h3>
                <div className="flex flex-wrap justify-center gap-3 p-4">
                  {currentCategory.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-premium border border-border rounded-full px-3 py-1.5 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-foreground/80 text-xs">
                          {skill.icon}
                        </div>
                        <span>{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skill cards */}
            <div className="space-y-4">
              {currentCategory.skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  color={currentCategory.accentColor}
                  index={index}
                  skill={skill}
                />
              ))}

              <motion.div
                className="mt-8 pt-4"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Button
                  className="w-full"
                  color="primary"
                  endContent={<FiExternalLink />}
                  radius="full"
                  variant="flat"
                >
                  View My Complete Resume
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Experience Metrics with GitHub Stats */}
        <div className="mt-24">
          <RevealOnScroll>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Experience Metrics
            </h3>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-16">
            {[
              {
                label: "Years Experience",
                value: "6+",
                icon: <FiClock className="text-primary" />,
              },
              {
                label: "Projects Completed",
                value: "75+",
                icon: <FiCode className="text-primary" />,
              },
              {
                label: "Satisfied Clients",
                value: "50+",
                icon: <FiUsers className="text-primary" />,
              },
              {
                label: "GitHub Contributions",
                value: "1200+",
                icon: <FiGithub className="text-primary" />,
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-premium border border-border hover-lift text-center h-full">
                  <CardBody className="py-4 sm:py-8 px-3 sm:px-6">
                    <div className="text-2xl mb-2 sm:mb-4">{metric.icon}</div>
                    <div className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                      {metric.value}
                    </div>
                    <div className="text-muted text-xs sm:text-sm">
                      {metric.label}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* GitHub Contributions Section */}
          <RevealOnScroll>
            <div className="rounded-2xl border border-border glass-premium p-8 mb-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    GitHub Contributions
                  </h4>
                  <p className="text-muted text-sm max-w-xl">
                    Tracking my open source journey and code contributions
                    through GitHub activity.
                  </p>
                </div>
                <Button
                  as="a"
                  className="mt-4 md:mt-0"
                  color="primary"
                  href="https://github.com/yourusername"
                  radius="full"
                  size="sm"
                  startContent={<FiGithub />}
                  target="_blank"
                  variant="flat"
                >
                  View Profile
                </Button>
              </div>

              <div className="relative bg-card rounded-xl p-6 border border-border">
                <div className="flex justify-between mb-6">
                  <div className="text-sm text-muted">
                    <span className="font-medium text-foreground">1,243</span>{" "}
                    contributions in the last year
                  </div>
                  <div className="text-sm text-muted">
                    <span className="font-medium text-foreground">
                      Oct 2022
                    </span>{" "}
                    -{" "}
                    <span className="font-medium text-foreground">
                      Oct 2023
                    </span>
                  </div>
                </div>

                {/* GitHub-style contribution grid */}
                <div className="overflow-x-auto pb-2">
                  <div className="grid grid-cols-52 gap-1 h-24 mb-4 min-w-[600px]">
                    {Array.from({ length: 52 }).map((_, weekIndex) => (
                      <div
                        key={`week-${weekIndex}`}
                        className="grid grid-rows-7 gap-1"
                      >
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          // Generate random contribution levels (0-4) for demo
                          const level = Math.floor(Math.random() * 5);
                          let bgColor = "bg-foreground/5 dark:bg-foreground/10";

                          if (level === 1)
                            bgColor = "bg-foreground/10 dark:bg-foreground/15";
                          if (level === 2)
                            bgColor = "bg-foreground/20 dark:bg-foreground/25";
                          if (level === 3)
                            bgColor = "bg-foreground/30 dark:bg-foreground/35";
                          if (level === 4)
                            bgColor = "bg-foreground/40 dark:bg-foreground/50";

                          return (
                            <div
                              key={`day-${weekIndex}-${dayIndex}`}
                              className={`w-2 h-2 rounded-sm ${bgColor} border-none`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-muted">
                  <div>Less</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-sm bg-foreground/5 dark:bg-foreground/10 border-none" />
                    <div className="w-2 h-2 rounded-sm bg-foreground/10 dark:bg-foreground/15 border-none" />
                    <div className="w-2 h-2 rounded-sm bg-foreground/20 dark:bg-foreground/25 border-none" />
                    <div className="w-2 h-2 rounded-sm bg-foreground/30 dark:bg-foreground/35 border-none" />
                    <div className="w-2 h-2 rounded-sm bg-foreground/40 dark:bg-foreground/50 border-none" />
                  </div>
                  <div>More</div>
                </div>
              </div>

              {/* Language Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-card rounded-xl p-6 border border-default-200 dark:border-default-100/20">
                  <h5 className="text-lg font-semibold text-foreground mb-4">
                    Top Languages
                  </h5>
                  <div className="space-y-4">
                    {[
                      {
                        name: "TypeScript",
                        percentage: 45,
                        color: "bg-foreground/70 dark:bg-foreground/60",
                      },
                      {
                        name: "JavaScript",
                        percentage: 30,
                        color: "bg-foreground/60 dark:bg-foreground/50",
                      },
                      {
                        name: "HTML/CSS",
                        percentage: 15,
                        color: "bg-foreground/50 dark:bg-foreground/40",
                      },
                      {
                        name: "Python",
                        percentage: 10,
                        color: "bg-foreground/40 dark:bg-foreground/30",
                      },
                    ].map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-foreground">
                            {lang.name}
                          </span>
                          <span className="text-muted">{lang.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-foreground/5 dark:bg-foreground/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${lang.color}`}
                            style={{ width: `${lang.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border border-default-200 dark:border-default-100/20">
                  <h5 className="text-lg font-semibold text-foreground mb-4">
                    Repository Stats
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Repositories", value: "32" },
                      { label: "Stars", value: "127" },
                      { label: "Forks", value: "49" },
                      { label: "Pull Requests", value: "93" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-3 bg-foreground/5 dark:bg-foreground/10 rounded-lg"
                      >
                        <div className="text-xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
