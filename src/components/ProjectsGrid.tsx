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
        <section
            id="projects"
            className="relative bg-[#020202] overflow-hidden"
        >
            {/* LARGE WATERMARK BACKGROUND */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[25vw] font-black text-white opacity-[0.015] tracking-[0.1em] uppercase">
                    WORK
                </span>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-40">

                {/* DYNAMIC HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 md:mb-32"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-[2px] bg-gradient-to-r from-[#B38B71] to-transparent" />
                        <span className="text-[#B38B71] text-[10px] font-black tracking-[0.5em] uppercase">
                            Selected Work
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1] tracking-tighter mb-8">
                        Visualizing
                        <br />
                        <span className="text-white/20">the Code.</span>
                    </h2>

                    <p className="text-white/40 text-base md:text-lg max-w-xl font-medium leading-relaxed tracking-wide">
                        Bridging the gap between theory and production. Each project is a
                        unique chapter in building resilient AI systems.
                    </p>
                </motion.div>

                {/* PROJECT LIST - ETHEREAL FLOW */}
                <div className="flex flex-col gap-24 md:gap-40 lg:gap-56">
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

                {/* CINEMATIC FOOTER - MINIMALIST */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="mt-32 flex flex-col items-center"
                >
                    <div className="flex items-center gap-8 mb-4">
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                        <span className="text-white/5 text-[10px] tracking-[0.8em] uppercase font-black">
                            End of Reflection
                        </span>
                        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-white/5 to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}