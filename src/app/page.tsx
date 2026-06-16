"use client";

import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import ExperienceList from "@/components/ExperienceList";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="portfolio-wrapper">
      <Hero />
      <AboutSection />
      
      
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

      <section id="contact" className="section container">
        <h2 className="section-title">Part VII. — Get In Touch</h2>
        <ContactSection />
      </section>
    </div>
  );
}