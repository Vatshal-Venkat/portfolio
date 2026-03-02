import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="py-32">

      <SectionHeading
        title="Selected Projects"
        subtitle="Production-focused AI systems and full-stack platforms built for real-world complexity."
      />

      <div className="grid md:grid-cols-2 gap-10">

        <ProjectCard
          title="Online Examination System"
          description="Full-stack intelligent exam engine with analytics, leaderboard ranking, anti-cheating mechanisms and scalable backend APIs."
          href="/projects/online_exam"
        />

        <ProjectCard
          title="RAG Agent System"
          description="End-to-end Retrieval-Augmented Generation system with embeddings pipeline, vector search and production-ready FastAPI backend."
          href="/projects/rag_agent"
        />

      </div>
    </section>
  );
}