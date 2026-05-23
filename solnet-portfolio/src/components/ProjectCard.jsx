import React from "react";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <img src={project.cover} alt={project.title} />
      <div className="project-meta">
        <h3>{project.title}</h3>
        <p>{project.short}</p>
      </div>
    </div>
  );
}
