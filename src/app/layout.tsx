import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={inter.className}>
      <body className="bg-primary text-primary antialiased">
        <Navbar />

        <main className="pt-24">
          <div className="layout-container">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}