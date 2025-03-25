"use client";

import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  
  const typedTexts = [
    "Backend Developer",
    "Software Engineer",
    "Machine Learning Engineer",
    "Full-Stack Developer",
  ];

  const handleSmoothScroll = useSmoothScroll(80);

  // Text typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Intersection observer to detect when hero section is visible
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection ratio
        setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      { 
        threshold: [0.3], // When at least 30% of the hero is visible
        rootMargin: "-10% 0px" // Additional margin to hide arrow sooner when scrolling down
      }
    );
    
    observer.observe(heroRef.current);
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-2"
            >
              I&apos;m
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            >
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-700">Sudharsan Aravind</span>
            </motion.h1>
            
            <div className="h-12 mb-8">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400"
              >
                {typedTexts[currentTextIndex]}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Button variant="gradient" size="lg" asChild>
                <a 
                  href="https://drive.google.com/file/d/1MR95Ms7kMeQNNAll7qo8p5GjFlLWbkJS/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 font-medium bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800"
                >
                  <span className="relative z-10 text-white">Resume</span>
                </a>
              </Button>
              <Button variant="glow" size="lg" asChild className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                <a href="#contact" className="px-6 py-3" onClick={(e) => handleSmoothScroll(e, "#contact")}>
                  Contact Me
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
          >
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden glow">
              <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-800"></div>
              <Image
                src="/img/sudharsan-aravind-hq-nobg.png"
                alt="Sudharsan Aravind"
                fill
                priority
                className="object-cover rounded-full p-2 relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bouncing arrow - only visible when hero section is in view */}
      <AnimatePresence>
        {isHeroVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              opacity: { delay: 0, duration: 0.5 },
              y: { 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut" 
              }
            }}
            className="fixed left-1/2 -translate-x-1/2 cursor-pointer"
            style={{
              bottom: '2rem',
              zIndex: 10,
              transform: 'translateX(-50%)',
              WebkitTransform: 'translateX(-50%)' // Safari-specific transform
            }}
          >
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, "#about")} 
              aria-label="Scroll down"
              className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-colors flex items-center justify-center"
            >
              <ChevronDown size={24} className="text-primary" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 