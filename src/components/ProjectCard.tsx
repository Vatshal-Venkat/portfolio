"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({ title, description, href }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Link
        href={href}
        className="bg-[#111827] border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition block"
      >
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}