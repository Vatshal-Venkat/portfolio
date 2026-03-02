import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[92vh] flex items-center">

            {/* Background depth layers */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/10 to-transparent" />
                <div className="absolute right-[-200px] top-1/3 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full grid lg:grid-cols-12 gap-12 items-center">

                {/* LEFT SIDE */}
                <div className="lg:col-span-7 space-y-10">

                    <div className="space-y-6">

                        <p className="text-xs tracking-[0.4em] uppercase text-gray-500">
                            AI FULL STACK ENGINEER
                        </p>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                            Building
                            <br />
                            Intelligent Systems
                            <br />
                            <span className="text-white">
                                End-to-End
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            I design and ship production-grade AI platforms —
                            backend APIs, vector search pipelines, graph intelligence layers,
                            and scalable ML infrastructure engineered for real deployment.
                        </p>

                    </div>

                    <div className="flex gap-5 pt-4">

                        <a
                            href="/projects"
                            className="px-7 py-3 text-sm font-medium rounded-md
              bg-blue-600 hover:bg-blue-500
              transition-all duration-300"
                        >
                            View Projects
                        </a>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="px-7 py-3 text-sm font-medium rounded-md
              border border-gray-700
              text-gray-300
              hover:border-gray-500 hover:text-white
              transition-all duration-300"
                        >
                            Resume
                        </a>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end">

                    <div className="relative">

                        {/* Frame */}
                        <div className="absolute inset-0 border border-gray-800 rounded-2xl -translate-x-6 -translate-y-6" />

                        {/* Image container */}
                        <div className="relative bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">

                            <Image
                                src="/vatshal.png"
                                alt="Vatshal"
                                width={600}
                                height={800}
                                priority
                                className="object-contain h-[75vh] w-auto"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}