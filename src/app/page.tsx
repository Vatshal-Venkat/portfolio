import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="w-full">

      {/* HERO */}
      <Hero />

      {/* NEXT SECTION (just to enable scroll for now) */}
      <section className="min-h-screen bg-[#0e1628] flex items-center justify-center text-white text-4xl">
        Next Section
      </section>

    </main>
  );
}