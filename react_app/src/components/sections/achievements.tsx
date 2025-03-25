"use client";

import { motion, useInView } from "framer-motion";
import { Award, Medal, Trophy } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface AchievementItemProps {
  title: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
  index: number;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
  title,
  organization,
  date,
  description,
  link,
  index,
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  // Choose icon based on index to give variety
  const Icon = index % 3 === 0 ? Trophy : index % 3 === 1 ? Award : Medal;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-background border border-border hover:border-primary/30 rounded-xl p-6 mb-6 group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
      
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
            {link ? (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          
          <p className="text-sm text-foreground/70 mb-3">
            <span className="font-medium">{organization}</span> | {date}
          </p>
          
          <p className="text-foreground/80">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMounted, setIsMounted] = useState(false);

  // Set up particles with fixed values to avoid hydration mismatch
  const particles = [
    {
      top: "27.48%",
      left: "48.77%",
      width: "109.03px",
      height: "137.63px",
      opacity: 0.48,
      animationDuration: "24.69s",
      animationDelay: "1.81s",
    },
    {
      top: "49.10%",
      left: "37.89%",
      width: "68.36px",
      height: "86.85px",
      opacity: 0.33,
      animationDuration: "20.85s",
      animationDelay: "2.38s",
    },
    {
      top: "62.33%",
      left: "97.67%",
      width: "148.17px",
      height: "92.03px",
      opacity: 0.35,
      animationDuration: "26.87s",
      animationDelay: "4.91s",
    },
    {
      top: "54.57%",
      left: "81.78%",
      width: "147.82px",
      height: "133.74px",
      opacity: 0.39,
      animationDuration: "27.40s",
      animationDelay: "3.47s",
    },
    {
      top: "43.33%",
      left: "35.42%",
      width: "132.31px",
      height: "110.22px",
      opacity: 0.28,
      animationDuration: "27.16s",
      animationDelay: "4.54s",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const achievements = [
    {
      title: "Finalist - Bank of Baroda Generative AI Hackathon",
      organization: "Bank of Baroda & Microsoft Azure",
      date: "July, 2024 - September 2024",
      description: "Top 10 finalist among 21000+ participants in a Fin-Tech hackathon conducted by Bank of Baroda and Microsoft Azure. My team worked on a solution to provide personalized investment strategies and data-driven financial advice to the bank customers using Generative AI.",
    },
    {
      title: "Finalist - Health Hackathon",
      organization: "IIIT Sri City",
      date: "December, 2023",
      description: "Finalist in a health hackathon conducted by IIIT Sri City. Our team devised a solution to assist the patients to detect the symptoms of heart diseases using Machine Learning and Generative AI.",
    },
    {
      title: "Winner - Smart India Hackathon Senior Software Edition",
      organization: "Ministry of Education, India",
      date: "August, 2022",
      description: "Winner and Team Lead of Smart India Hackathon 2022 held by AICTE. Our team built a semantic search engine for the Parliament of India and a built-in management portal to effectively maintain and supervise the Parliament records. I was the team lead and the solution architect of the project.",
      link: "https://www.sih.gov.in/sih2022s",
    },
    {
      title: "Winner - Decode",
      organization: "PSG College of Technology",
      date: "January, 2022",
      description: "One of the top 3 winners in a competitive coding contest conducted among participants from various computer science branches at university level.",
    },
    {
      title: "Creative Coder Award",
      organization: "Let's Code by KGISL Institute of Technology",
      date: "October 2019",
      description: "Creative Coder Award in Let's Code, a protoype building hackathon hosted by KGISL Institute of Technology.",
    },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary/5 to-transparent -z-10"></div>
      
      {/* Animated particles - Only rendered on client-side or with fixed values */}
      <div className="absolute inset-0 -z-10">
        {isMounted ? (
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute bg-primary/20 rounded-full blur-xl"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.width,
                height: particle.height,
                opacity: particle.opacity,
                animation: `float ${particle.animationDuration} ease-in-out infinite alternate`,
                animationDelay: particle.animationDelay,
              }}
            ></div>
          ))
        ) : (
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute bg-primary/20 rounded-full blur-xl"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.width,
                height: particle.height,
                opacity: particle.opacity,
              }}
            ></div>
          ))
        )}
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
            <span className="text-gradient bg-clip-text text-transparent">Achievements</span> & Honors
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementItem
              key={index}
              title={achievement.title}
              organization={achievement.organization}
              date={achievement.date}
              description={achievement.description}
              link={achievement.link}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Floating keyframe animation for the particles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(10px);
          }
          100% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>
    </section>
  );
} 