"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/lib/constants";
import { FiGithub, FiArrowLeft, FiCheckCircle, FiLayers, FiMic, FiRadio, FiCpu } from "react-icons/fi";

const project = PROJECTS_DATA.find((p) => p.slug === "dhwani_voice_agent")!;

export default function DhwaniVoiceAgentPage() {
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
          <span className="inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
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
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] text-[#0B0A09] text-sm font-bold hover:bg-[#9E7B66] hover:text-white transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              <FiGithub className="w-4 h-4" />
              Explore Dhwani on GitHub 🐙
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
              In Active Development
            </span>
          </div>
        </motion.div>

        <hr className="border-white/10 my-12" />

        {/* Section 1: Executive Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiLayers className="w-6 h-6" /> System Vision & Concept
          </h2>
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6">
              **Dhwani** is an advanced, low-latency AI Voice Agent system engineered to deliver natural, human-like voice conversations. Traditional voice chatbots introduce noticeable pauses (3–5 seconds) between speech recognition, text processing, and audio output.
            </p>
            <p className="text-white/80 leading-relaxed text-base md:text-lg">
              Dhwani addresses latency through streaming audio WebSockets, real-time Voice Activity Detection (VAD), continuous Speech-to-Text (STT) transcription, streaming LLM token generation, and real-time Text-to-Speech (TTS) audio synthesis.
            </p>
          </div>
        </section>

        {/* Section 2: Real-Time Pipeline Architecture */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiMic className="w-6 h-6" /> Real-Time Voice Processing Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FiRadio className="text-pink-400" /> 1. Audio Ingestion & VAD
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Captures raw microphone audio over bi-directional WebSockets. Voice Activity Detection (VAD) detects speech boundaries and handles user interruptions dynamically.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FiCpu className="text-pink-400" /> 2. Speech-to-Text (STT)
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Converts incoming audio streams into text transcripts in real-time with automatic punctuation and entity recognition.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FiCpu className="text-pink-400" /> 3. LLM Reasoning & Function Execution
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Transcribed user speech is evaluated by an LLM reasoning engine capable of executing function calls (e.g. database lookups, API actions) mid-conversation.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FiMic className="text-pink-400" /> 4. Streaming TTS Voice Synthesis
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                LLM response tokens are streamed directly to the TTS engine, generating and playing natural speech audio chunks before the complete sentence finishes generating.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#9E7B66] flex items-center gap-3">
            <FiCheckCircle className="w-6 h-6" /> Key Innovations & Capabilities
          </h2>
          <div className="space-y-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <FiCheckCircle className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
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

        {/* Section 5: GitHub Repository Action Banner */}
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-pink-500/30 bg-gradient-to-r from-pink-950/40 to-slate-900/60 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Explore Dhwani on GitHub</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Star, clone, or contribute to the Dhwani Voice Agent repository on GitHub.
          </p>
          <div className="flex justify-center">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#0B0A09] font-bold text-sm hover:bg-[#9E7B66] hover:text-white transition-all shadow-xl inline-flex items-center gap-2"
            >
              <FiGithub className="w-5 h-5" />
              Open Dhwani GitHub Repository 🐙
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
