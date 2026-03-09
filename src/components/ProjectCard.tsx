"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  index: number;
}

export default function ProjectCard({
  title,
  description,
  href,
  techStack,
  index,
}: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
      }}
    >
      <Link href={href} className="block relative z-10">
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 py-20 px-4 md:px-0`}>

          {/* Large Index Number Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden h-full w-full flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000">
            <span className="text-[35vw] font-black tracking-tighter leading-none transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Visual Side (Mockup/Image placeholder) */}
          <div className="relative w-full md:w-1/2 aspect-[16/10] bg-white/[0.02] border border-white/[0.05] rounded-lg overflow-hidden group-hover:border-[#B38B71]/30 transition-colors duration-700 shadow-2xl">
            {/* Dynamic Glow Inside */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(179,139,113,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/5 text-[10px] tracking-[0.4em] uppercase font-bold">Concept Visual</span>
            </div>

            {/* Decorative Corner */}
            <div className={`absolute ${isEven ? 'bottom-6 right-6' : 'bottom-6 left-6'} w-12 h-12`}>
              <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} w-full h-[1px] bg-gradient-to-r from-transparent via-[#B38B71]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
              <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} h-full w-[1px] bg-gradient-to-b from-transparent via-[#B38B71]/40 to-transparent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700`} />
            </div>
          </div>

          {/* Content Side */}
          <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end text-right'}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#B38B71] text-[10px] font-bold tracking-[0.4em] uppercase">
                Phase {String(index + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-[1px] bg-[#B38B71]/30" />
            </div>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter mb-8 group-hover:text-[#B38B71] transition-colors duration-500">
              {title}
            </h3>

            <p className={`text-white/40 text-base md:text-lg leading-relaxed mb-10 max-w-md font-medium ${!isEven && 'md:ml-auto'}`}>
              {description}
            </p>

            <div className={`flex flex-wrap gap-3 mb-10 ${!isEven && 'justify-end'}`}>
              {techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold px-4 py-1.5 rounded-full border border-white/10 text-white/40 uppercase tracking-widest group-hover:border-[#B38B71]/30 group-hover:text-white/70 transition-all duration-500"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-white/20 group-hover:text-[#B38B71] transition-colors duration-500">
              <span className="text-[10px] tracking-[0.5em] uppercase font-black">Explore Depth</span>
              <span className="text-xl transform group-hover:translate-x-2 transition-transform duration-500">→</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Background Separation Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
    </motion.div>
  );
}
