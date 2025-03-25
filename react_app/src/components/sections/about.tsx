"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="dark:text-white text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div 
          ref={ref}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-xl p-8 border border-white/20 dark:border-gray-700/30 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient bg-clip-text text-transparent">Software Engineer</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              I&apos;m a technology enthusiast with a background in designing and developing 
              scalable applications from a young age. Along with an academic background in 
              Data Science, I have a unique blend of strong foundation in Machine Learning 
              and Software Engineering. I love to work in a collaborative team environment 
              and also have good experience as both team player and team leader in multiple 
              projects. My goal is to provide innovative solutions that are efficient and 
              sustainable, contributing to the growth and success of an organization where 
              I can apply my skills effectively while committing to both my personal and 
              professional development.
            </p>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { label: "Degree", value: "Master of Science in Data Science" },
                { label: "Experience", value: "2 years (Professional) & 5 years (Technical Projects)" },
                { label: "Email", value: "vsaravind01@gmail.com", isLink: true, href: "mailto:vsaravind01@gmail.com" },
                { label: "Location", value: "Bangalore, Karnataka" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="bg-white/5 dark:bg-gray-800/40 backdrop-blur-sm p-5 rounded-lg border border-white/10 dark:border-gray-700/30 hover:border-primary/30 transition-colors group hover:bg-primary/5"
                >
                  <h6 className="font-medium text-gray-800 dark:text-white mb-1 text-sm uppercase tracking-wider">
                    {item.label}
                  </h6>
                  {item.isLink ? (
                    <a 
                      href={item.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 text-base">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="glow" asChild>
                <a
                  href="https://github.com/vsaravind01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
              </Button>
              <Button variant="glow" asChild>
                <a
                  href="https://www.linkedin.com/in/sudharsan-aravind-v-18826a1aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 