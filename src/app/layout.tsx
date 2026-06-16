import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Vatshal | AI Full Stack Engineer",
  description:
    "AI Full Stack Engineer building production-grade LLM systems, RAG pipelines, graph intelligence and scalable AI infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <div className="cyber-grid" />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}