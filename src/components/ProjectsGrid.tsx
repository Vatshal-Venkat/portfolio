"use client";

import { PROJECTS_DATA } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {PROJECTS_DATA.map((project, idx) => (
        <ProjectCard
          key={project.id}
          index={idx}
          title={project.title}
          description={project.shortDescription}
          features={project.features}
          techStack={project.techStack}
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
          href={`/projects/${project.slug}`}
          accentColor={project.accentColor}
          category={project.category}
        />
      ))}
    </div>
  );
}