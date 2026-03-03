"use client";
import { motion } from "framer-motion";

const experiences = [
    {
        role: "AI Intern",
        company: "Celerinn Technologies",
        date: "10/2025 – Present",
        points: [
            "Built and deployed Altaric, a production-grade AI-focused corporate website, delivering a complete full-stack solution.",
            "Worked on ECO supporting change management processes integrating system-level updates within enterprise PLM environments using AI.",
            "Built a Vendor Risk Intelligence Dashboard using FastAPI, React, and Neo4j to model supplier relationships as graph data and generate real-time risk insights.",
        ],
    },
];

export default function ExperienceList() {
    return (
        <div className="max-w-4xl mx-auto w-full px-8 relative">
            {/* Timeline track */}
            <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-px bg-white/10 hidden md:block" />

            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative mb-16 last:mb-0"
                >
                    {/* Timeline node */}
                    <div className="absolute left-0 left-[-35px] md:left-1/2 top-1.5 w-3 h-3 bg-[#B38B71] rounded-full shadow-[0_0_15px_rgba(179,139,113,0.5)] md:transform md:-translate-x-[5px] hidden md:block" />

                    <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
                        <div className="text-left md:text-right mb-6 md:mb-0">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                {exp.role}
                            </h3>
                            <div className="text-[#B38B71] font-semibold tracking-wide text-lg mb-2">
                                {exp.company}
                            </div>
                            <div className="text-white/40 text-sm font-mono tracking-widest uppercase">
                                {exp.date}
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl hover:border-white/20 transition-colors duration-500">
                            <ul className="space-y-4 text-white/70 leading-relaxed md:text-base">
                                {exp.points.map((point, i) => (
                                    <li key={i} className="flex">
                                        <span className="text-[#B38B71] mr-3 mt-1.5 opacity-60 text-sm">▹</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
