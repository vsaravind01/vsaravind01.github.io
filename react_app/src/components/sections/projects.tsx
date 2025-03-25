"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Project {
  title: string;
  technologies: string[];
  description: string;
  github?: string;
  liveUrl?: string;
  imageSrc?: string;
  featured?: boolean;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});

  const projects: Project[] = [
    {
      title: "PicWiz AI",
      technologies: [
        "Python", "FastAPI", "PostgreSQL", "MongoDB", "Qdrant", "Generative AI",
        "Deep Learning", "Face Detection", "Scene Detection", "Object Detection",
        "PyTorch", "Google Cloud Platform"
      ],
      description: "PicWiz AI is an end to end AI-powered photo management platform which is capable of automatically tagging photos based on objects, recognize familiar faces, and also generate an album based on a user requirement.",
      github: "https://github.com/vsaravind01/PicWiz-AI",
      imageSrc: "/img/picwiz-ai-architecture.png",
      featured: true,
    },
    {
      title: "The Parliament Connect",
      technologies: [
        "Python", "JavaScript", "Flask", "Node.js", "React.js", "Elasticsearch",
        "PostgreSQL", "sentence-transformers", "AWS"
      ],
      description: "EPACS - Effective Parliament Archive Connect System, a fully featured semantic search engine, tailor made for the Parliament of India as a part of Smart India Hackathon 2022 grand finale.",
      github: "https://github.com/vsaravind01/Parliament-Connect",
      imageSrc: "/img/parliament-connect.png",
    },
    {
      title: "Smart Wealth",
      technologies: [
        "Python", "LangGraph", "GPT-4o", "FastAPI", "Microsoft Azure",
        "Cosmos DB", "MongoDB", "React.js", "Deep Reinforcement Learning", "DBSCAN"
      ],
      description: "Smart Wealth is an AI-powered multi-agent financial advisor that delivers personalized, data-driven investment strategies using GPT-4o.",
      github: "https://github.com/vsaravind01/Smart-Wealth",
      imageSrc: "/img/agent-arch-smart-wealth.png",
      featured: true,
    },
    {
      title: "MarkAnn",
      technologies: [
        "Python", "Generative AI", "Async-Programming", "WebSocket",
        "FastAPI", "Qdrant", "AWS", "GitHub Actions(CD)"
      ],
      description: "A Telegram bot that provides real-time press releases from the companies listed on Bombay Stock Exchange (BSE).",
      github: "https://github.com/vsaravind01/MarkAnn-Bot",
    },
    {
      title: "The Ayush Connect",
      technologies: [
        "Python", "Generative AI", "Vision Transformers", "FastAPI", "PostgreSQL",
        "Qdrant", "Flutter"
      ],
      description: "An AI powered platform that provides information about Ayurvedic medicinal plants for the Ayurvedic pharmaceutical industry.",
      github: "https://github.com/vsaravind01/Ayush-Connect",
      imageSrc: "/img/Ayush-Connect.png",
    },
    {
      title: "Chequer",
      technologies: [
        "Python", "YoloV9", "Amazon Textract", "FastAPI", "PostgreSQL",
        "Async-Programming"
      ],
      description: "Chequer is a modern and efficient solution for automating the cheque clearing process.",
      github: "https://github.com/vsaravind01/Chequer",
      imageSrc: "/img/chequer.webp",
    },
    {
      title: "RL Portfolio Allocator",
      technologies: [
        "Python", "Reinforcement Learning", "Streamlit"
      ],
      description: "A portfolio allocation system that uses Reinforcement Learning to optimize the portfolio allocation strategy.",
      github: "https://github.com/vsaravind01/RL-Portfolio-Allocator",
    },
  ];

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Function to get GitHub repo image URL from repo URL
  const getGitHubImageUrl = (githubUrl: string) => {
    if (!githubUrl) return null;
    
    // Extract username and repo name from GitHub URL
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return null;
    
    const [, username, repo] = match;
    return `https://opengraph.githubassets.com/1/${username}/${repo}`;
  };

  return (
    <section id="project" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            // Get GitHub image if no image provided but GitHub URL exists
            const imageUrl = project.imageSrc || (project.github ? getGitHubImageUrl(project.github) : null);
            
            return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openModal(project)}
              className={cn(
                "bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/30 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer hover:bg-primary/5",
                project.featured && "md:col-span-2"
              )}
            >
              {imageUrl ? (
                <div className="relative h-48 overflow-hidden bg-white dark:bg-white">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    onError={() => {
                      // Mark this image URL as failed to load
                      setImageLoadError(prev => ({ ...prev, [imageUrl]: true }));
                    }}
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-gradient bg-clip-text text-transparent text-2xl font-bold">{project.title}</span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      className="inline-block text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="inline-block text-xs font-medium bg-white/10 dark:bg-gray-700/40 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )})}
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button variant="glow" asChild>
              <a
                href="https://github.com/vsaravind01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                More Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Project Details Modal/Carousel */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-900/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-50 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md text-gray-800 dark:text-white p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-900/40 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto">
                {/* Project image/carousel */}
                {(selectedProject.imageSrc || (selectedProject.github && !imageLoadError[getGitHubImageUrl(selectedProject.github) as string])) ? (
                  <div className="relative h-64 md:h-80 w-full bg-white dark:bg-white">
                    <Image
                      src={selectedProject.imageSrc || getGitHubImageUrl(selectedProject.github as string) as string}
                      alt={selectedProject.title}
                      fill
                      className="object-contain p-4"
                      onError={() => {
                        if (selectedProject.github) {
                          const githubImageUrl = getGitHubImageUrl(selectedProject.github);
                          if (githubImageUrl) {
                            setImageLoadError(prev => ({ ...prev, [githubImageUrl]: true }));
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-64 md:h-80 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-gradient bg-clip-text text-transparent text-4xl font-bold">{selectedProject.title}</span>
                  </div>
                )}

                {/* Project details */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gradient bg-clip-text text-transparent">
                      {selectedProject.title}
                    </h3>
                    <div className="flex gap-3">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 dark:bg-gray-700/40 text-gray-800 dark:text-white p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                          aria-label={`GitHub repository for ${selectedProject.title}`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 dark:bg-gray-700/40 text-gray-800 dark:text-white p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                          aria-label={`Live demo for ${selectedProject.title}`}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-8 text-base md:text-lg">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="inline-block text-sm font-medium bg-white/10 dark:bg-gray-700/40 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Helper function to conditionally join class names
function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
} 