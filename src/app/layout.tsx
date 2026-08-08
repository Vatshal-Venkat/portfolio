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
  keywords: [
    "Venkat Vatshal",
    "AI Engineer",
    "Generative AI",
    "Full Stack Developer",
    "RAG Pipelines",
    "Agentic Workflows",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Venkat Vatshal" }],
  openGraph: {
    title: "Vatshal | AI Full Stack Engineer",
    description:
      "AI Full Stack Engineer building production-grade LLM systems, RAG pipelines, graph intelligence and scalable AI infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Venkat Vatshal Portfolio",
    images: [
      {
        url: "/Vatshal-Venkat.png",
        width: 1200,
        height: 630,
        alt: "Venkat Vatshal — AI Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vatshal | AI Full Stack Engineer",
    description:
      "AI Full Stack Engineer building production-grade LLM systems, RAG pipelines, graph intelligence and scalable AI infrastructure.",
    images: ["/Vatshal-Venkat.png"],
  },
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