"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0B0F19]">

            {/* Cinematic background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-black -z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black -z-20" />

            {/* Massive Background Text */}
            <h1
                className="absolute text-[18vw] font-black tracking-tight
        text-white/5 whitespace-nowrap select-none -z-10"
            >
                AI ENGINEER
            </h1>

            <div className="relative z-10 w-full max-w-[1400px] px-8 flex items-center justify-between">

                {/* LEFT TEXT */}
                <div className="max-w-xl space-y-8">

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-sm tracking-[0.4em] uppercase text-gray-400"
                    >
                        AI FULL STACK ENGINEER
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-6xl font-semibold leading-tight"
                    >
                        Building Intelligent
                        <br />
                        Systems That Scale
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="text-gray-400 leading-relaxed"
                    >
                        Production-grade AI platforms — from backend APIs and vector search
                        pipelines to graph intelligence layers and scalable ML infrastructure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4 }}
                        className="flex gap-6"
                    >
                        <a
                            href="/projects"
                            className="px-8 py-3 bg-white text-black font-medium rounded-md
              hover:scale-105 transition duration-300"
                        >
                            View Projects
                        </a>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="px-8 py-3 border border-gray-700 text-white rounded-md
              hover:border-gray-500 transition duration-300"
                        >
                            Resume
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT IMAGE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full -z-10" />

                    <Image
                        src="/vatshal.png"
                        alt="Vatshal"
                        width={700}
                        height={900}
                        priority
                        className="object-contain h-[90vh] w-auto"
                    />
                </motion.div>

            </div>
        </section>
    );
}