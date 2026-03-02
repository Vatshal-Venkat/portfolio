import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ProjectCard({
  title,
  description,
  href,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition"
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </Link>
  );
}