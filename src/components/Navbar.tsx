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
                    <a className="hover:text-white transition">About</a>
                    <a className="hover:text-white transition">Projects</a>
                    <a className="hover:text-white transition">Experience</a>
                    <a className="hover:text-white transition">Contact</a>
                </nav>

            </div>
        </header>
    );
}