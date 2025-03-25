"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface SkillCardProps {
    name: string;
    rating: number;
    icon: string;
    delay: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, rating, icon, delay }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Generate stars based on rating (out of 5)
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar key={`full-${i}`} className="text-yellow-500" />
            );
        }

        // Add half star if needed
        if (hasHalfStar) {
            stars.push(
                <FaStarHalfAlt key="half" className="text-yellow-500" />
            );
        }

        // Add empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
            );
        }

        return stars;
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: delay }}
            className="bg-background border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 relative group"
        >
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 relative">
                    <Image
                        src={icon}
                        alt={`${name} logo`}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                </div>
                <h3 className="font-semibold text-lg mb-2">{name}</h3>
                <div className="flex space-x-1 mt-1">{renderStars()}</div>
            </div>
        </motion.div>
    );
};

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skillsData = [
        {
            name: "Python",
            rating: 5,
            icon: "https://skillicons.dev/icons?i=python",
        },
        {
            name: "FastAPI",
            rating: 5,
            icon: "https://skillicons.dev/icons?i=fastapi",
        },
        {
            name: "AWS",
            rating: 4,
            icon: "https://skillicons.dev/icons?i=aws",
        },
        {
            name: "PostgreSQL",
            rating: 3.5,
            icon: "https://skillicons.dev/icons?i=postgres",
        },
        {
            name: "Docker",
            rating: 4,
            icon: "https://skillicons.dev/icons?i=docker",
        },
        {
            name: "TypeScript",
            rating: 3.5,
            icon: "https://skillicons.dev/icons?i=ts",
        },
        {
            name: "React",
            rating: 4.5,
            icon: "https://skillicons.dev/icons?i=react",
        },
        {
            name: "Next.js",
            rating: 4,
            icon: "https://skillicons.dev/icons?i=nextjs",
        },
        {
            name: "Node.js",
            rating: 4,
            icon: "https://skillicons.dev/icons?i=nodejs",
        },
        {
            name: "Django",
            rating: 4,
            icon: "https://skillicons.dev/icons?i=django",
        },
        {
            name: "MongoDB",
            rating: 3.5,
            icon: "https://skillicons.dev/icons?i=mongodb",
        },
        {
            name: "Terraform",
            rating: 3,
            icon: "https://skillicons.dev/icons?i=terraform",
        },
        {
            name: "Git",
            rating: 4.5,
            icon: "https://skillicons.dev/icons?i=git",
        },
        {
            name: "TensorFlow",
            rating: 3,
            icon: "https://skillicons.dev/icons?i=tensorflow",
        },
        {
            name: "Golang",
            rating: 3,
            icon: "https://skillicons.dev/icons?i=go"
        },
        {
            name: "Nest.js",
            rating: 2,
            icon: "https://skillicons.dev/icons?i=nest"
        },
        {
            name: "Flutter",
            rating: 3,
            icon: "https://skillicons.dev/icons?i=flutter"
        },
        {
            name: "MySQL",
            rating: 4,
            icon: "https://skillicons.dev/icons?i=mysql"
        },
        {
            name: "Elasticsearch",
            rating: 3,
            icon: "https://skillicons.dev/icons?i=elasticsearch"
        },
        {
            name: "Kafka",
            rating: 3,
            icon: "https://skillicons.dev/icons?i=kafka"
        },
    ];

    // Additional skills for the tag cloud
    const additionalSkills = [
        "REST APIs",
        "Elasticsearch",
        "Computer Vision",
        "NLP",
        "Generative AI",
        "Agentic AI",
        "RAG",
        "ReAct",
        "LangChain",
        "LlamaIndex",
        "CI/CD",
        "GitHub Actions",
        "Microservices",
        "Redis",
    ];

    return (
        <section id="skill" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
                    }
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        My <span className="text-gradient bg-clip-text text-transparent">Skills</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Technical expertise rated on a scale of 1-5 stars
                    </p>
                </motion.div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                    {skillsData.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            name={skill.name}
                            rating={skill.rating}
                            icon={skill.icon}
                            delay={index * 0.05}
                        />
                    ))}
                </div>

                {/* Additional Skills Cloud */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-3 mt-12"
                >
                    <h3 className="w-full text-center text-xl font-medium mb-4">
                        Other Technologies
                    </h3>
                    {additionalSkills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={
                                isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.8 }
                            }
                            transition={{
                                duration: 0.3,
                                delay: 1 + index * 0.03,
                            }}
                            className="bg-background border border-border px-4 py-2 rounded-full text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Animation for the blob backgrounds */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    );
}
