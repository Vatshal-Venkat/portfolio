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
  title: "Vatshal | Applied AI Engineer",
  description:
    "Applied AI Engineer building LLM systems, RAG pipelines and intelligent platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0B0D12] text-gray-100 antialiased">

        <Navbar />

        {/* Main Content */}
        <main className="pt-16">
          <div className="container-custom">
            {children}
          </div>
        </main>

        <Footer />

      </body>
    </html>
  );
}