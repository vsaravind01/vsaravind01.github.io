"use client";

import { cn, useSmoothScroll } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface NavItem {
  href: string;
  text: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Use our custom hook with navbar height offset
  const handleSmoothScroll = useSmoothScroll(80);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems: NavItem[] = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#journey", text: "Experience" },
    { href: "#achievements", text: "Honors" },
    { href: "#project", text: "Projects" },
    { href: "#skill", text: "Skills" },
    { href: "#portfolio", text: "Gallery" },
    { href: "#contact", text: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 shadow-md backdrop-blur-md py-2"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              handleSmoothScroll(e, "#home");
              setIsOpen(false);
            }}
            className="text-2xl font-bold text-primary flex items-center gap-2"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="text-primary">S</span>
              <span className={scrolled ? 'text-foreground' : 'text-white'}>A</span>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled ? 'text-foreground' : 'text-white'} hover:text-primary transition-colors`}
                >
                  {item.text}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com/vsaravind01"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/sudharsan-aravind-v-18826a1aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              <Button variant="glow" size="sm" asChild>
                <a
                  href="https://drive.google.com/file/d/1MR95Ms7kMeQNNAll7qo8p5GjFlLWbkJS/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${scrolled ? 'text-foreground' : 'text-white'} p-2 rounded-md`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href);
                      setIsOpen(false);
                    }}
                    className={`block px-3 py-2 rounded-md ${scrolled ? 'text-foreground' : 'text-white'} hover:text-primary hover:bg-primary/10 transition-colors`}
                  >
                    {item.text}
                  </a>
                </motion.div>
              ))}
              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/vsaravind01"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://www.linkedin.com/in/sudharsan-aravind-v-18826a1aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="glow" size="sm" asChild>
                  <a
                    href="https://drive.google.com/file/d/1MR95Ms7kMeQNNAll7qo8p5GjFlLWbkJS/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 