import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="py-32">
      <SectionHeading
        title="Projects"
        subtitle="Backend-focused AI systems and full-stack platforms built for real-world complexity."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <ProjectCard
          title="Online Examination System"
          description="Full-stack exam platform with dynamic question engine, result analytics, leaderboard system and anti-cheating mechanisms."
          href="/projects/online_exam"
        />

        <ProjectCard
          title="RAG Agent System"
          description="Retrieval-Augmented Generation system with vector search, embeddings pipeline and production-ready backend APIs."
          href="/projects/rag_agent"
        />
      </div>
    </div>
  );
}