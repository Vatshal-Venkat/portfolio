"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-[#0B0D12]/80 backdrop-blur-md border-b border-[#1F222A]">
            <div className="container-custom flex items-center justify-between h-16">

                <div className="text-sm font-semibold tracking-wide">
                    Vatshal
                </div>

                <nav className="flex items-center gap-8 text-sm text-gray-400">
                    <Link href="/" className="hover:text-white transition">About</Link>
                    <Link href="/projects" className="hover:text-white transition">Projects</Link>
                    <Link href="/resume" className="hover:text-white transition">Experience</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                </nav>

            </div>
        </header>
    );
}