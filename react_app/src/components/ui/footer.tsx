"use client";

import { ArrowUp, Github, Instagram, Linkedin, Music, X } from "lucide-react";
import { Button } from "./button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Background that matches the site's overall styling */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/95"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300" 
              asChild
            >
              <a
                href="https://x.com/vsaravind01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <X className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300" 
              asChild
            >
              <a
                href="https://github.com/vsaravind01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300" 
              asChild
            >
              <a
                href="https://www.linkedin.com/in/sudharsan-aravind-v-18826a1aa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300" 
              asChild
            >
              <a
                href="https://www.instagram.com/sudharsan_aravind/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300" 
              asChild
            >
              <a
                href="https://open.spotify.com/artist/1KW8TZuz26oJew8u6aPBxI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
              >
                <Music className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <p className="text-center text-foreground/60 mb-6">
            &copy; {new Date().getFullYear()} <span className="font-medium text-foreground">vsaravind.me</span>. All Rights Reserved.
          </p>
          
          {/* Back to Top */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300 rounded-full absolute right-4 bottom-4 md:right-8 md:bottom-8"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 