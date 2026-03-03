"use client";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "TEASER – RAG-AGENT",
        description:
            "End-to-end Retrieval-Augmented Generation system with embeddings pipeline, vector search and production-ready FastAPI backend.",
        href: "/projects/rag_agent",
        techStack: ["FastAPI", "React", "FAISS", "LangChain", "MCP"]
    },
    {
        title: "Online Examination Portal",
        description:
            "Full-stack scalable Next.js and WixStudio platform for dynamic exams, automated evaluation and leaderboard analytics.",
        href: "/projects/online_exam",
        techStack: ["Next.js", "WixStudio", "Node.js"]
    },
    {
        title: "Cross - Modal Similarity Evaluation",
        description:
            "Multimodal similarity evaluation framework for text, image, audio, and video using deep learning embeddings and cosine similarity scoring.",
        href: "/projects/Cross_modal",
        techStack: ["Deep Learning", "MiniLM", "CLIP", "Wav2Vec2"]
    },
];

export default function ProjectsGrid() {
    return (
        <div className="max-w-7xl mx-auto w-full px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
                <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    href={project.href}
                    techStack={project.techStack}
                />
            ))}
        </div>
    );
}
