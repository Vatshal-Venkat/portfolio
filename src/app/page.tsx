import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="w-full bg-[#020202]">

      {/* 
        HERO SECTION
        Fills the exact screen height and establishes the cinematic theme.
      */}
      <Hero />

      {/* 
        ABOUT SECTION 
      */}
      <section id="about" className="min-h-screen py-24 flex items-center justify-center text-white relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl px-8 text-center">
          <h2 className="text-[#B38B71] text-xs font-bold tracking-[0.3em] uppercase mb-6">Part II. — The Architect</h2>
          <p className="text-xl md:text-3xl text-white/80 font-semibold leading-relaxed tracking-wide">
            I engineer highly scalable vector pipelines and robust backend infrastructure.
            My focus is combining elegant system design with powerful AI capabilities.
          </p>
        </div>
      </section>

      {/* 
        EXPERIENCE & PROJECTS SECTIONS
        (Placeholders ready for further styling)
      */}
      <section id="projects" className="min-h-screen py-24 flex flex-col items-center justify-center text-white border-t border-white/5 bg-[#020202]">
        <h2 className="text-[#B38B71] text-xs font-bold tracking-[0.3em] uppercase mb-12">Part III. — Selected Works</h2>
        <div className="text-white/40 text-sm tracking-widest uppercase">Projects Coming Soon...</div>
      </section>

      <section id="experience" className="min-h-[50vh] py-24 flex flex-col items-center justify-center text-white border-t border-white/5 bg-[#050505]">
        <h2 className="text-[#B38B71] text-xs font-bold tracking-[0.3em] uppercase mb-12">Part IV. — History</h2>
        <div className="text-white/40 text-sm tracking-widest uppercase">Experience Coming Soon...</div>
      </section>

    </main>
  );
}