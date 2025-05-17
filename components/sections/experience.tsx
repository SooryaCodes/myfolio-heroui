"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import { Card } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Divider } from "@heroui/divider";

const workExperience = [
  {
    id: 1,
    position: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    period: "2021 - Present",
    description:
      "Led the development of complex web applications using React, TypeScript, and Hero UI. Collaborated with designers and backend engineers to implement responsive UI components and ensure optimal performance.",
    achievements: [
      "Improved site performance by 40% through code optimization and implementing better practices",
      "Led a team of 5 developers in successful project delivery",
      "Architected and implemented a new design system used across the organization",
    ],
  },
  {
    id: 2,
    position: "Frontend Developer",
    company: "Digital Solutions Group",
    location: "New York, NY",
    period: "2019 - 2021",
    description:
      "Developed and maintained modern web applications using React and Next.js. Implemented responsive designs, state management, and API integrations.",
    achievements: [
      "Successfully delivered 12+ client projects with modern frontend technologies",
      "Mentored junior developers and conducted code reviews",
      "Introduced automated testing, increasing code coverage by 65%",
    ],
  },
  {
    id: 3,
    position: "UI/UX Designer & Developer",
    company: "Creative Solutions",
    location: "Remote",
    period: "2017 - 2019",
    description:
      "Designed and developed user interfaces for web and mobile applications. Created wireframes, prototypes, and implemented designs using modern frontend technologies.",
    achievements: [
      "Redesigned company flagship product, resulting in 30% increase in user engagement",
      "Built and maintained design system used across multiple projects",
      "Collaborated with clients to translate business requirements into design solutions",
    ],
  },
];

const education = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2015 - 2017",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies. Completed thesis on improving user experience in web applications through AI-assisted interfaces.",
    achievements: [
      "Graduated with honors, GPA 3.9/4.0",
      "Published research paper on modern web architecture",
      "Teaching Assistant for Web Development courses",
    ],
  },
  {
    id: 2,
    degree: "Bachelor of Science in Software Engineering",
    institution: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    period: "2011 - 2015",
    description:
      "Comprehensive education in software engineering principles, algorithms, and web development. Minor in User Experience Design.",
    achievements: [
      "Dean's List all semesters",
      "Awarded scholarship for academic excellence",
      "Led student project that won innovation award",
    ],
  },
];

export const Experience = () => {
  const [experienceType, setExperienceType] = React.useState("work");

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="flat" color="primary" className="mb-4">
            Professional Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work Experience & Education
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A comprehensive overview of my professional journey, showcasing my
            work experience and educational background.
          </p>
        </motion.div>

        <Tabs
          aria-label="Experience types"
          color="primary"
          variant="underlined"
          selectedKey={experienceType}
          onSelectionChange={(key) => setExperienceType(key as string)}
          className="justify-center mb-12"
        >
          <Tab key="work" title="Work Experience" />
          <Tab key="education" title="Education" />
        </Tabs>

        <div className="space-y-8">
          {experienceType === "work" &&
            workExperience.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.position}</h3>
                      <p className="text-foreground/70">
                        {item.company} • {item.location}
                      </p>
                    </div>
                    <Badge
                      variant="flat"
                      color="default"
                      className="mt-2 md:mt-0 w-fit"
                    >
                      {item.period}
                    </Badge>
                  </div>
                  <p className="mb-4">{item.description}</p>
                  
                  <h4 className="font-semibold mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    {item.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}

          {experienceType === "education" &&
            education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.degree}</h3>
                      <p className="text-foreground/70">
                        {item.institution} • {item.location}
                      </p>
                    </div>
                    <Badge
                      variant="flat"
                      color="default"
                      className="mt-2 md:mt-0 w-fit"
                    >
                      {item.period}
                    </Badge>
                  </div>
                  <p className="mb-4">{item.description}</p>
                  
                  <h4 className="font-semibold mb-2">Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    {item.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}; 