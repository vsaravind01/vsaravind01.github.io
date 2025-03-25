"use client";

import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  src: string;
  alt: string;
  category: string[];
  github?: string;
  liveUrl?: string;
  technologies?: string[];
}

export default function Portfolio() {
  // State for the filtered projects
  const [activeCategory, setActiveCategory] = useState("all");
  
  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  
  // Refs for animations and grid
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Modal carousel for navigation between projects
  const [modalCarouselRef, modalCarouselApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    startIndex: selectedProjectIndex
  });

  // Categories for filtering
  const categories = [
    { id: "all", label: "All" },
    { id: "parliament", label: "Parliament Connect" },
    { id: "ayush", label: "Ayush Connect" },
    { id: "smart-wealth", label: "Smart Wealth" },
    { id: "picwiz", label: "PicWiz AI" },
    { id: "chequer", label: "Chequer" },
  ];

  // Project data
  const projectItems: ProjectItem[] = [
    {
      id: 1,
      title: "Parliament Connect",
      description: "A digital platform for the Parliament of India, to search through the Parliament question records and help reduce redundant questions.",
      src: "/img/parliament-connect.png",
      alt: "Parliament Connect",
      category: ["parliament"],
      technologies: ["Python", "React", "Node.js", "MongoDB", "AWS", "Express.js", "Elasticsearch", "Flask"],
    },
    {
      id: 2,
      title: "Semantic Search Engine",
      description: "Semantic search engine capable of handling multi-lingual and semantic aware queries.",
      src: "/img/backend-1.png",
      alt: "Backend Architecture",
      category: ["parliament"],
      technologies: ["Flask", "AWS", "Microservices", "Sentence-transformers", "Elasticsearch"],
    },
    {
      id: 3,
      title: "Ayush Connect",
      description: "Healthcare platform integrating traditional Ayurvedic medicine with modern healthcare systems and patient management.",
      src: "/img/Ayush-Connect.png",
      alt: "Ayush Connect",
      category: ["ayush"],
      technologies: ["Generative AI", "Computer Vision", "Vision transformers", "LLM", "FastAPI", "PostgreSQL", "Python", "Flutter", "Pytorch", "Web Scrapping"],
      github: "https://github.com/vsaravind01/ayush-connect",
    },
    {
      id: 4,
      title: "CNN Few Shot Learning",
      description: "Implementation of few-shot learning algorithms for convolutional neural networks to enable training with minimal data samples.",
      src: "/img/cnn-few-shot-learning.png",
      alt: "CNN Few Shot Learning",
      category: ["ayush"],
      technologies: ["Deep Learning", "CNN", "Python", "TensorFlow", "PyTorch"],
    },
    {
      id: 5,
      title: "PicWiz AI Architecture",
      description: "AI-powered image processing system with advanced recognition capabilities and intelligent query engine.",
      src: "/img/picwiz-ai-architecture.png",
      alt: "PicWiz AI Architecture",
      category: ["picwiz"],
      technologies: ["Computer vision", "Detectron-2", "Facenet", "Retina Face", "TensorFlow", "Pytorch", "Python", "Google Cloud Storage", "PostgreSQL", "MongoDB", "Object Oriented Programming"],
      github: "https://github.com/vsaravind01/PicWiz-AI",
    },
    {
      id: 6,
      title: "Agent Architecture for Smart Wealth",
      description: "Multi-agent system architecture for intelligent financial planning and wealth management automation.",
      src: "/img/agent-arch-smart-wealth.png",
      alt: "Agent Architecture Smart Wealth",
      category: ["smart-wealth"],
      technologies: ["LangGraph", "GPT-4o", "OpenAI", "Python", "FastAPI", "Microsoft Azure", "Cosmos DB", "React.js", "Deep Reinforcement Learning", "DBSCAN"],
    },
    {
      id: 7,
      title: "Smart Wealth",
      description: "Intelligent financial planning platform using AI to provide personalized wealth management strategies.",
      src: "/img/smart-wealth.png",
      alt: "Smart Wealth",
      category: ["smart-wealth"],
      technologies: ["LangGraph", "GPT-4o", "OpenAI", "Python", "FastAPI", "Microsoft Azure", "Cosmos DB", "React.js", "Deep Reinforcement Learning", "DBSCAN"],
    },
    {
      id: 8,
      title: "Chequer",
      description: "Automated code quality checker with integrated CI/CD capabilities for enterprise software development.",
      src: "/img/chequer.webp",
      alt: "Chequer",
      category: ["chequer"],
      technologies: ["Python", "Yolov9", "Amazon Textract", "FastAPI", "PostgreSQL", "Async-Programming"],
      github: "https://github.com/vsaravind01/chequer",
    },
  ];

  // Filter projects based on active category
  const filteredItems =
    activeCategory === "all"
      ? projectItems
      : projectItems.filter((item) => item.category.includes(activeCategory));

  // Modal carousel scroll functions
  const modalScrollPrev = useCallback(() => {
    if (modalCarouselApi) {
      modalCarouselApi.scrollPrev();
      
      // Update the selected project after scrolling
      modalCarouselApi.on("select", () => {
        const index = modalCarouselApi.selectedScrollSnap();
        setSelectedProject(filteredItems[index]);
      });
    }
  }, [modalCarouselApi, filteredItems]);

  const modalScrollNext = useCallback(() => {
    if (modalCarouselApi) {
      modalCarouselApi.scrollNext();
      
      // Update the selected project after scrolling
      modalCarouselApi.on("select", () => {
        const index = modalCarouselApi.selectedScrollSnap();
        setSelectedProject(filteredItems[index]);
      });
    }
  }, [modalCarouselApi, filteredItems]);

  // Add event listener to update selected project when carousel changes
  useEffect(() => {
    if (modalCarouselApi) {
      const onSelect = () => {
        const index = modalCarouselApi.selectedScrollSnap();
        setSelectedProject(filteredItems[index]);
      };
      
      modalCarouselApi.on("select", onSelect);
      
      return () => {
        modalCarouselApi.off("select", onSelect);
      };
    }
  }, [modalCarouselApi, filteredItems]);

  // Open modal with selected project
  const openProjectModal = (project: ProjectItem) => {
    const index = filteredItems.findIndex(item => item.id === project.id);
    setSelectedProjectIndex(index);
    setSelectedProject(project);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background to-background/80"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Project <span className="text-gradient bg-clip-text text-transparent">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.01 + index * 0.05 }}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-background border border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <div 
                  onClick={() => openProjectModal(item)}
                  className="group cursor-pointer relative overflow-hidden bg-background rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 h-full"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transform transition-transform duration-700 group-hover:scale-110 bg-white"
                    />

                    {/* Expand button */}
                    <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={16} className="text-white" />
                    </div>

                    {/* Overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-medium text-lg">{item.title}</h3>
                      
                      {/* Tech tags - show only first 2 */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.technologies.slice(0, 2).map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-primary/80 text-white rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {item.technologies.length > 2 && (
                            <span className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full">
                              +{item.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Project Modal with Carousel Navigation */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-background/5 backdrop-blur-xl border border-white/10 rounded-xl max-w-7xl w-full max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                {/* Project image */}
                <div className="lg:w-2/3 h-full relative">
                  <div className="embla h-full" ref={modalCarouselRef}>
                    <div className="embla__container h-full">
                      {filteredItems.map((project, index) => (
                        <div key={project.id} className="embla__slide flex-[0_0_100%] p-4 relative">
                          <div className="relative w-full h-[50vh] lg:h-[70vh]">
                            <Image
                              src={project.src}
                              alt={project.alt}
                              fill
                              sizes="(max-width: 1280px) 100vw, 1280px"
                              className="object-contain bg-white"
                              priority={index === selectedProjectIndex}
                              quality={100}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project navigation controls */}
                  {filteredItems.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          modalScrollPrev();
                        }}
                        className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                        aria-label="Previous project"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          modalScrollNext();
                        }}
                        className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                        aria-label="Next project"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Project information */}
                <div className="lg:w-1/3 p-6 overflow-auto">
                  <h3 className="text-2xl font-bold mb-2 text-white">{selectedProject.title}</h3>
                  <p className="text-white/80 mb-4">{selectedProject.description}</p>
                  
                  {/* Technologies */}
                  {selectedProject.technologies && (
                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-white/60 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Github size={18} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/80 hover:bg-primary text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          position: relative;
          flex: 0 0 100%;
          min-width: 0;
        }
      `}</style>
    </section>
  );
} 