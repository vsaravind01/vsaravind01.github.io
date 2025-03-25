import About from "@/components/sections/about";
import Achievements from "@/components/sections/achievements";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Portfolio from "@/components/sections/portfolio";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sudharsan Aravind | Software Engineer & Data Scientist",
  description: "Portfolio of Sudharsan Aravind - Software Engineer with expertise in Backend Development, Machine Learning, and Data Science.",
  keywords: ["Sudharsan Aravind", "Software Engineer", "Machine Learning Engineer", "Data Scientist", "Portfolio", "React", "Next.js"],
  authors: [{ name: "Sudharsan Aravind" }],
  creator: "Sudharsan Aravind",
  robots: "index, follow",
};

export default function Home() {
  return (
    <>
      <Navbar />
      
      <Hero />
      
      <About />
      
      <Experience />
      
      <Achievements />
      
      <Projects />
      
      <Skills />
      
      <Portfolio />
      
      <Contact />
      
      <Footer />
    </>
  );
}
