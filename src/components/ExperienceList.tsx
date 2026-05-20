export default function ExperienceList() {
  return (
    <div className="glass-card mt-md">
      <div className="flex justify-between items-center mb-md" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="h2 text-gradient" style={{ fontSize: '2rem' }}>AI Intern</h3>
          <p className="h3 text-muted" style={{ fontWeight: 500 }}>Celerinn Technologies</p>
        </div>
        <div className="badge" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
          10/2025 - Present
        </div>
      </div>
      
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
        <li>
          Built and deployed <strong>Altaric</strong>, a production-grade AI-focused corporate website, delivering a complete full-stack solution.
        </li>
        <li>
          Built a Supplier Risk Intelligence Dashboard using FastAPI, React, and Neo4j to model supplier relationships as graph data and generate real-time risk insights with the help of Celery workers and Redis.
        </li>
        <li>
          Worked on ECO supporting change management processes integrating system-level updates within enterprise PLM environments using AI.
        </li>
      </ul>
    </div>
  );
}
