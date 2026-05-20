import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import ExperienceList from "@/components/ExperienceList";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";

export default function Home() {
  return (
    <div className="portfolio-wrapper">
      <Hero />
      
      <section id="about" className="section container">
        <h2 className="section-title">Part II. — Career Objective</h2>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="h3" style={{ lineHeight: '1.8', maxWidth: '900px', margin: '0 auto', color: 'var(--text-primary)' }}>
            AI Software Engineer with hands-on experience in building Generative AI applications, 
            including RAG pipelines and agentic workflows. Skilled in developing scalable, production-ready 
            systems using modern backend technologies and AI frameworks, with a focus on solving 
            real-world problems through intelligent and efficient solutions.
          </p>
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