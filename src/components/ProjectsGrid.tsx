const projects = [
  {
    title: "TEASER - RAG-AGENT",
    bullets: [
      "Developed a production-grade Agentic RAG platform using FastAPI, React, FAISS, LLM APIs, structured tool calling, and MCP orchestration. Improved retrieval accuracy by 35%",
      "Designed an end-to-end RAG pipeline with document ingestion, chunking, embeddings, similarity search, session memory, and adaptive fallback logic.",
      "Enabled multi-step agent workflows, dynamic tool execution, streaming responses, citation tracking, and deployed on Vercel and Render."
    ]
  },
  {
    title: "Online Examination Portal",
    bullets: [
      "Built a full-stack application in WixStudio with analytics, performance optimization, and real-time evaluation.",
      "Reduced system latency by 40% through query optimization and efficient data access.",
      "Designed scalable result analytics and leaderboard systems."
    ]
  },
  {
    title: "Cross - Modal Similarity Evaluation System",
    bullets: [
      "Implemented a multimodal similarity evaluation framework for text, image, audio, and video using deep learning embeddings (MiniLM, CLIP, Wav2Vec2) to compute cross-modal semantic similarity.",
      "Orchestrated embedding pipelines, normalization strategies, cosine similarity scoring, and model comparison across 4-6 architectures per modality.",
      "Designed evaluation metrics, ranking logic, and interactive visualization dashboards to benchmark performance, analyze similarity distributions, and compare model effectiveness."
    ]
  }
];

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-2 gap-lg mt-md">
      {projects.map((project, idx) => (
        <div key={idx} className="project-card">
          <div className="project-meta">Project // 0{idx + 1}</div>
          <h3 className="project-title text-gradient">{project.title}</h3>
          <ul className="project-bullet-list">
            {project.bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="project-bullet-item">{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}