"use client";

import { PROJECTS_DATA } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-2 gap-lg mt-md">
      {PROJECTS_DATA.map((project, idx) => (
        <ProjectCard
          key={project.id}
          index={idx}
          title={project.title}
          description={project.shortDescription}
          techStack={project.techStack}
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
          href={`/projects/${project.slug}`}
          category={project.category}
        />
      ))}
    </div>
  );
}