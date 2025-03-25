"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItemProps {
  title: string;
  organization: string;
  organizationUrl?: string;
  date: string;
  content: string;
  isLast?: boolean;
  type: "education" | "work";
}

const TimelineItem = ({
  title,
  organization,
  organizationUrl,
  date,
  content,
  isLast = false,
  type,
}: TimelineItemProps) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex group"
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center mr-4 md:mr-8">
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 mt-1.5 z-10 transition-colors duration-300",
            type === "work"
              ? "border-primary bg-background group-hover:bg-primary"
              : "border-blue-400 bg-background group-hover:bg-blue-400"
          )}
        ></div>
        {!isLast && (
          <div 
            className={cn(
              "w-0.5 h-full transition-colors duration-300",
              type === "work" 
                ? "bg-gradient-to-b from-primary to-primary/30 group-hover:from-primary/80 group-hover:to-primary/50" 
                : "bg-gradient-to-b from-blue-400 to-blue-400/30 group-hover:from-blue-400/80 group-hover:to-blue-400/50"
            )}
          ></div>
        )}
      </div>

      {/* Content */}
      <div className="pb-10 w-full">
        <div 
          className={cn(
            "bg-background p-5 rounded-lg border transition-all duration-300",
            type === "work" 
              ? "border-primary/20 group-hover:border-primary/50 shadow-md group-hover:shadow-primary/10" 
              : "border-blue-400/20 group-hover:border-blue-400/50 shadow-md group-hover:shadow-blue-400/10"
          )}
        >
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-base mb-2">
            <span className="font-medium">
              {organizationUrl ? (
                <a
                  href={organizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "hover:underline transition-colors",
                    type === "work" ? "text-primary" : "text-blue-400"
                  )}
                >
                  {organization}
                </a>
              ) : (
                organization
              )}
            </span>{" "}
            | <span className="text-foreground/70 text-sm">{date}</span>
          </p>
          <p className="text-foreground/80">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const workExperience = [
    {
      title: "Software Engineer Consultant",
      organization: "Deep Forest Sciences",
      organizationUrl: "https://deepforestsci.com",
      date: "March, 2023 - March, 2024",
      content:
        "One of the core developers of Prithvi, a next generation AI system that dramatically accelerates scientific discovery for human benefit.",
    },
    {
      title: "Engineer Intern",
      organization: "Commvault",
      organizationUrl: "https://www.commvault.com/",
      date: "December, 2024 - Current",
      content: "Intern in Database team at Commvault, Bangalore.",
      isLast: true,
    },
  ];

  const education = [
    {
      title: "Master of Science in Data Science",
      organization: "PSG College of Technology",
      date: "2020 - 2025",
      content: "CGPA: 8.27",
    },
    {
      title: "Higher Secondary Education",
      organization: "SBOA Matric. and Hr. Sec. School",
      date: "2018 - 2020",
      content: "Percentage: 88.5%",
    },
    {
      title: "Secondary School (SSLC)",
      organization: "SBOA Matric. and Hr. Sec. School",
      date: "2017 - 2018",
      content: "Percentage: 93.8%",
      isLast: true,
    },
  ];

  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background to-background/80"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Experience Column */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold mb-8 text-gradient bg-clip-text text-transparent"
            >
              My Experience
            </motion.h3>
            <div className="ml-2">
              {workExperience.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  organization={item.organization}
                  organizationUrl={item.organizationUrl}
                  date={item.date}
                  content={item.content}
                  isLast={item.isLast}
                  type="education"
                />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold mb-8 text-gradient bg-clip-text text-transparent"
            >
              My Education
            </motion.h3>
            <div className="ml-2">
              {education.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  organization={item.organization}
                  date={item.date}
                  content={item.content}
                  isLast={item.isLast}
                  type="education"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 