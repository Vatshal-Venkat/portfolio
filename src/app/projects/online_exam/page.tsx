"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiExternalLink, FiGithub, FiArrowLeft, FiCheckCircle, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";

const project = PROJECTS_DATA.find((p) => p.slug === "online_exam")!;

export default function OnlineExamPage() {
  return (
    <div className="py-28 min-h-screen text-white">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* Navigation Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E7B66] hover:text-white transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] text-[#0B0A09] text-sm font-bold hover:bg-[#9E7B66] hover:text-white transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              <FiExternalLink className="w-4 h-4" />
              Launch VJITPREP Live Portal ↗
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all transform hover:-translate-y-0.5"
            >
              <FiGithub className="w-4 h-4" />
              View Source Code on GitHub 🐙
            </a>
          </div>
        </motion.div>

        <hr className="border-white/10 my-12" />

        {/* Section 1: Executive Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiLayers className="w-6 h-6" /> Executive Overview & System Goals
          </h2>
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6">
              **VJITPREP** is a high-availability online examination platform engineered to serve university students preparing for semester exams and placement assessments.
            </p>
            <p className="text-white/80 leading-relaxed text-base md:text-lg">
              The platform handles dynamic question generation, instant auto-evaluation, state persistence across network interruptions, anti-cheating tab tracking, and real-time leaderboard analytics. Through strategic backend query caching and index optimization, database query latency was reduced by **40%**.
            </p>
          </div>
        </section>

        {/* Section 2: Key Modules */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiShield className="w-6 h-6" /> Architecture & Key Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2">Dynamic Quiz Engine</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Fetches randomized questions from the CMS database based on topic tags, level of difficulty, and timing parameters.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2">Anti-Cheating Detection</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Monitors browser window focus events, tab switching, and paste operations during active test sessions to ensure exam integrity.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2">Automated Instant Evaluation</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Evaluates responses immediately upon submission, calculating topic-wise accuracy breakdowns and speed metrics.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2">Real-Time Leaderboard</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Computes competitive student rankings based on scores and test duration, updating leaderboards in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiTrendingUp className="w-6 h-6" /> Feature Highlights
          </h2>
          <div className="space-y-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <FiCheckCircle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-white/90 text-base font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66]">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white font-mono text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Section 5: Live Action Banner */}
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 to-slate-900/60 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Visit VJITPREP Portal Live</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Access the live production assessment portal deployed on WixStudio and inspect the GitHub repository.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#0B0A09] font-bold text-sm hover:bg-[#9E7B66] hover:text-white transition-all shadow-xl"
            >
              Open Live Portal ↗
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all"
            >
              GitHub Repository 🐙
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}