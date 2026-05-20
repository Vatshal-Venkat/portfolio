import "./SkillsSection.css";

const skills = [
  {
    category: "Core CS",
    items: ["Data Structures & Algorithms", "OOPS", "DBMS", "Operating Systems"]
  },
  {
    category: "Programming Languages",
    items: ["Python", "JAVA", "SQL", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Generative AI",
    items: ["RAG Pipelines", "Prompt Engineering", "LLM Integration", "Embedding Models", "Transformers", "Chunking & Retrieval Tuning", "Machine Learning", "Deep Learning"]
  },
  {
    category: "Frontend & Backend",
    items: ["React.js (Vite)", "Next.js", "FastAPI", "REST APIs", "Styled-Components", "Framer Motion", "CORS Configuration"]
  },
  {
    category: "Cloud & Deployment",
    items: ["AWS (EC2, S3, IAM, Amazon Connect)", "Vercel", "Render", "Docker"]
  },
  {
    category: "Database & Vector Search",
    items: ["MySQL", "Firebase", "Neo4j (Graph DB)", "Vector Databases (FAISS, Chroma)"]
  },
  {
    category: "Web Platforms & Tools",
    items: ["Git", "GitHub", "Wix Studio", "Figma"]
  },
  {
    category: "AI Frameworks & Automation",
    items: ["n8n", "Make", "LangChain"]
  }
];

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-2 gap-lg mt-md">
      {skills.map((skillGroup, index) => (
        <div key={index} className="glass-card">
          <h3 className="h3 mb-sm text-gradient">{skillGroup.category}</h3>
          <div className="flex flex-wrap gap-sm">
            {skillGroup.items.map((item, idx) => (
              <span key={idx} className="badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
