import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About | Johan Beker Portfolio",
  description: "Learn more about Johan Beker, a passionate developer and designer creating exceptional digital experiences.",
};

const AboutPage = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              <Image 
                src="/images/portrait.jpg" 
                alt="Johan Beker" 
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Johan Beker</h2>
              <h3 className="text-xl text-primary mb-4">Developer & Designer</h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                I'm a passionate developer and designer with over 8 years of experience creating 
                exceptional digital experiences. I specialize in building modern web applications, 
                mobile apps, and crafting user-centered designs.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                My journey in technology began at a young age when I first discovered the power of 
                creating things with code. Since then, I've worked with startups, agencies, and 
                established companies to deliver products that users love.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <a 
                  href="mailto:johan.beker@example.com" 
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Get in Touch
                </a>
                <a 
                  href="/resume.pdf" 
                  className="bg-gray-800 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">My Journey</h2>
            
            <div className="relative border-l-2 border-primary pl-8 ml-4 space-y-12">
              <div className="relative">
                <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Senior Developer</h3>
                  <p className="text-primary mb-2">2021 - Present</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Currently working as a senior developer at TechFusion, leading the front-end development team 
                    and implementing cutting-edge technologies for various client projects.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Full Stack Developer</h3>
                  <p className="text-primary mb-2">2018 - 2021</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Worked as a full stack developer at WebCraft, responsible for developing and maintaining 
                    web applications using React, Node.js, and various database technologies.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">UI/UX Designer</h3>
                  <p className="text-primary mb-2">2016 - 2018</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Began my career as a UI/UX designer at DesignHub, where I created user interfaces 
                    and experiences for mobile and web applications.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Computer Science Degree</h3>
                  <p className="text-primary mb-2">2012 - 2016</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Completed my Bachelor's degree in Computer Science from Berlin Technical University, 
                    focusing on software development and human-computer interaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">Personal Interests</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Photography</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I love capturing moments through photography, especially landscapes and street photography.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Travel</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Exploring new countries and cultures is one of my greatest passions and sources of inspiration.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Reading</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I'm an avid reader of science fiction, technology books, and design thinking literature.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-10 text-center">My Skills & Expertise</h2>
            <About />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
