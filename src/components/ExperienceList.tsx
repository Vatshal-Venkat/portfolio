export default function ExperienceList() {
  return (
    <div className="project-card mt-md">
      <div className="flex justify-between items-center mb-md" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="project-meta">Work Experience // Current</div>
          <h3 className="project-title text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
            AI Intern
          </h3>
          <p className="h3 text-muted" style={{ fontWeight: 500, fontSize: '1.25rem', marginTop: '0.25rem' }}>
            Celerinn Technologies
          </p>
        </div>
        <div className="badge" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
          10/2025 - Present
        </div>
      </div>
      
      <ul className="project-bullet-list">
        <li className="project-bullet-item">
          Built and deployed <strong>Altaric</strong>, a production-grade AI-focused corporate website, delivering a complete full-stack solution.
        </li>
        <li className="project-bullet-item">
          Built a Supplier Risk Intelligence Dashboard using FastAPI, React, and Neo4j to model supplier relationships as graph data and generate real-time risk insights with the help of Celery workers and Redis.
        </li>
        <li className="project-bullet-item">
          Worked on ECO supporting change management processes integrating system-level updates within enterprise PLM environments using AI.
        </li>
      </ul>
    </div>
  );
}
