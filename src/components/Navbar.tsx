"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur border-b border-gray-900">

            <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">

                <Link href="/" className="text-lg font-medium tracking-tight">
                    Vatshal
                </Link>

                <nav className="hidden md:flex gap-10 text-sm text-gray-400">
                    <Link href="/about" className="hover:text-white transition">
                        About
                    </Link>
                    <Link href="/projects" className="hover:text-white transition">
                        Projects
                    </Link>
                    <Link href="/experience" className="hover:text-white transition">
                        Experience
                    </Link>
                    <Link href="/contact" className="hover:text-white transition">
                        Contact
                    </Link>
                </nav>

            </div>
        </header>
    );
}