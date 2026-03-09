"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "TEASER – RAG Agent",
        description:
            "End-to-end Retrieval-Augmented Generation system with embeddings pipeline, vector search, and production-ready FastAPI backend.",
        href: "/projects/rag_agent",
        techStack: ["FastAPI", "React", "FAISS", "LangChain", "MCP"],
    },
    {
        title: "Online Examination Portal",
        description:
            "Full-stack scalable Next.js and WixStudio platform for dynamic exams, automated evaluation and leaderboard analytics.",
        href: "/projects/online_exam",
        techStack: ["Next.js", "WixStudio", "Node.js"],
    },
    {
        title: "Cross-Modal Similarity",
        description:
            "Multimodal similarity evaluation framework for text, image, audio, and video using deep learning embeddings and cosine similarity scoring.",
        href: "/projects/Cross_modal",
        techStack: ["Deep Learning", "MiniLM", "CLIP", "Wav2Vec2"],
    },
];

export default function ProjectsGrid() {
    return (
        <section id="projects" className="relative min-h-screen py-32 md:py-40 bg-[#020202] overflow-hidden">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[20vw] font-black text-white/[0.02] tracking-[0.1em] uppercase whitespace-nowrap">
                    WORKS
                </span>
            </div>

            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 md:mb-28"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-gradient-to-r from-[#B38B71] to-transparent" />
                        <span className="text-[#B38B71] text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase">
                            Selected Works
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                        Projects that
                        <br />
                        <span className="text-white/20">push boundaries.</span>
                    </h2>

                    <p className="text-white/35 text-sm md:text-base max-w-lg font-medium leading-relaxed tracking-wide">
                        From intelligent retrieval systems to cross-modal AI — each project
                        is engineered for production scale and real-world impact.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            index={index}
                            title={project.title}
                            description={project.description}
                            href={project.href}
                            techStack={project.techStack}
                        />
                    ))}
                </div>

                {/* Bottom accent */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-20 md:mt-28 flex items-center justify-center gap-4"
                >
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                    <span className="text-white/15 text-[9px] tracking-[0.4em] uppercase font-semibold">More coming soon</span>
                    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                </motion.div>
            </div>
        </section>
    );
}
