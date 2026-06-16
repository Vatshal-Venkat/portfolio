"use client";

import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import ExperienceList from "@/components/ExperienceList";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="portfolio-wrapper">
      <Hero />
      
      <section id="about" className="section container">
        <h2 className="section-title">Part II. — Career Objective</h2>
        <div className="grid grid-cols-2 gap-lg items-center">
          
          {/* Objective Text Card */}
          <motion.div 
            className="project-card" 
            style={{ padding: '2.5rem' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="h3" style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 400 }}>
              AI Software Engineer with hands-on experience in building Generative AI applications, 
              including RAG pipelines and agentic workflows. Skilled in developing scalable, production-ready 
              systems using modern backend technologies and AI frameworks, with a focus on solving 
              real-world problems through intelligent and efficient solutions.
            </p>
          </motion.div>
          
          {/* Framed Scroll-Reveal Portrait Card */}
          <motion.div
            className="project-card flex-col items-center justify-center"
            style={{ padding: '2rem', height: '100%', minHeight: '340px', position: 'relative', overflow: 'hidden' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="poster-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px' }}></div>
            <div style={{ position: 'relative', width: '100%', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden' }}>
              <img 
                src="/vatshal.png" 
                alt="Venkat Vatshal Portrait" 
                style={{ width: 'auto', height: '100%', objectFit: 'contain', objectPosition: 'bottom center', filter: 'contrast(1.05) brightness(0.95)' }}
                onError={(e) => {
                  e.currentTarget.src = "/Vatshal1.png";
                }}
              />
            </div>
            <div className="project-meta" style={{ marginTop: '1.5rem', textAlign: 'center' }}>SYSTEM USER // ENG-AI_01</div>
          </motion.div>

        </div>
      </section>
      
      <section id="skills" className="section container">
        <h2 className="section-title">Part III. — Technical Skills</h2>
        <SkillsSection />
      </section>
      
      <section id="experience" className="section container">
        <h2 className="section-title">Part IV. — Work Experience</h2>
        <ExperienceList />
      </section>
      
      <section id="projects" className="section container">
        <h2 className="section-title">Part V. — Projects</h2>
        <ProjectsGrid />
      </section>
      
      <section id="education" className="section container">
        <h2 className="section-title">Part VI. — Education & Certifications</h2>
        <EducationSection />
      </section>
    </div>
  );
}