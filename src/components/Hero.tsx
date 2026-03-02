import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex overflow-hidden">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 flex items-center relative z-10">
                <div className="max-w-xl px-8 md:px-16">

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                        Applied AI Engineer
                    </h1>

                    <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                        I build production-grade AI systems — from Retrieval-Augmented
                        Generation pipelines and vector search architectures to intelligent
                        risk intelligence platforms.
                    </p>

                    <div className="mt-10 flex items-center gap-4">

                        <a
                            href="/projects"
                            className="px-5 py-2 text-sm font-medium rounded-md
                         bg-gradient-to-r from-cyan-400 to-blue-500
                         text-white transition-all duration-300
                         hover:brightness-110"
                        >
                            View Projects
                        </a>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="px-5 py-2 text-sm font-medium rounded-md
                         border border-gray-700 text-gray-300
                         hover:border-gray-500 hover:text-white
                         transition-all duration-300"
                        >
                            Resume
                        </a>

                    </div>

                </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-gray-800/60"></div>

            {/* RIGHT IMAGE */}
            <div className="hidden lg:flex w-1/2 items-end justify-center relative">

                {/* subtle fade from right edge */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent z-10"></div>

                <Image
                    src="/vatshal.png"
                    alt="Vatshal"
                    priority
                    width={700}
                    height={1000}
                    className="h-[95vh] w-auto object-contain relative z-0"
                />

            </div>

        </section>
    );
}