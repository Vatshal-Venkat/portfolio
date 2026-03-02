"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-[#020202]/90 backdrop-blur-md border-b border-white/5 py-3"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-8 w-full flex items-center justify-between">

                {/* Brand / Logo */}
                <Link href="/" className="flex items-center gap-1 group">
                    <span className="text-white font-black text-xl tracking-tighter group-hover:text-white/80 transition-colors">VENKAT</span>
                    <span className="text-[#B38B71] font-black text-xl px-0.5">✦</span>
                    <span className="text-white font-black text-xl tracking-tighter group-hover:text-white/80 transition-colors">VATSHAL</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10 text-[10px] text-white/50 tracking-[0.2em] font-bold uppercase">
                    <Link href="#about" className="hover:text-white transition-colors relative group">
                        About
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#B38B71] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </Link>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <Link href="#projects" className="hover:text-white transition-colors">
                        Projects
                    </Link>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <Link href="#experience" className="hover:text-white transition-colors">
                        Experience
                    </Link>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <Link href="#contact" className="hover:text-white transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Right Actions / Hamburger */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/resume.pdf" target="_blank"
                        className="hidden md:flex px-4 py-1.5 rounded-full border border-white/20 text-[9px] text-white tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors uppercase"
                    >
                        Resume
                    </Link>

                    {/* Mobile Menu Icon (Like the original cine design) */}
                    <div className="md:hidden w-8 h-8 bg-white rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-neutral-200 transition-colors">
                        <span className="w-3 h-0.5 bg-black"></span>
                        <span className="w-3 h-0.5 bg-black"></span>
                    </div>
                </div>

            </div>
        </header>
    );
}