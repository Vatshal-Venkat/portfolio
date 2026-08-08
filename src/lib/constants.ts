export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  bullets: string[];
  techStack: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
  category: string;
  architectureDetails: {
    overview: string;
    keyHighlights: string[];
    useCases: string[];
  };
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "rag_agent",
    slug: "rag_agent",
    title: "TEASER – Agentic RAG Platform",
    subtitle: "Production-grade Retrieval-Augmented Generation system with tool execution and MCP orchestration.",
    shortDescription: "End-to-end Retrieval-Augmented Generation system featuring embeddings pipeline, vector similarity search, structured tool calling, and production-ready FastAPI backend.",
    bullets: [
      "Developed a production-grade Agentic RAG platform using FastAPI, React, FAISS, LLM APIs, structured tool calling, and MCP orchestration. Improved retrieval accuracy by 35%.",
      "Designed an end-to-end RAG pipeline with document ingestion, chunking, embeddings, similarity search, session memory, and adaptive fallback logic.",
      "Enabled multi-step agent workflows, dynamic tool execution, streaming responses, citation tracking, and deployed on Vercel and Render."
    ],
    techStack: ["FastAPI", "Python", "LangChain", "FAISS", "React", "MCP", "Vercel", "Render"],
    features: [
      "End-to-end multi-modal document ingestion & chunking pipeline",
      "FAISS Vector Store similarity retrieval with hybrid search tuning",
      "Structured Model Context Protocol (MCP) tool execution loop",
      "Context-aware conversation memory and source citation tracking",
      "Production deployment with FastAPI backend on Render and React frontend on Vercel"
    ],
    liveUrl: "https://drag-eosin.vercel.app/",
    githubUrl: "https://github.com/Vatshal-Venkat/Drag",
    accentColor: "from-teal-400 to-emerald-500",
    category: "Generative AI // RAG & Agents",
    architectureDetails: {
      overview: "TEASER RAG-AGENT combines vector search retrieval with dynamic tool orchestration. When a user submits a query, the system generates high-dimensional embeddings, retrieves relevant document chunks from FAISS, and evaluates whether external tool calls (via Model Context Protocol) are required before synthesizing a final grounded answer with inline citations.",
      keyHighlights: [
        "Document Processing: Multi-format parsing (PDF, Markdown, TXT) with semantic overlap chunking.",
        "Vector Engine: FAISS index configured with L2 and Cosine distance metrics for ultra-fast similarity scoring.",
        "Agentic Reasoning: LLM-driven tool selector routing complex queries to specialized API tools.",
        "Streaming Response: Server-Sent Events (SSE) for low-latency token streaming to the frontend user interface."
      ],
      useCases: [
        "Enterprise Knowledge Base Question Answering",
        "Technical Documentation Querying with Citation Tracking",
        "Multi-step Analytical Workflows with Automated Tool Calling"
      ]
    }
  },
  {
    id: "Cross_modal",
    slug: "Cross_modal",
    title: "Cross-Modal Similarity Evaluation System",
    subtitle: "Deep learning framework benchmarking semantic similarity across text, image, audio, and video.",
    shortDescription: "Multimodal similarity evaluation framework for text, image, audio, and video using deep learning embeddings (MiniLM, CLIP, Wav2Vec2) to compute cross-modal semantic similarity.",
    bullets: [
      "Implemented a multimodal similarity evaluation framework for text, image, audio, and video using deep learning embeddings (MiniLM, CLIP, Wav2Vec2) to compute cross-modal semantic similarity.",
      "Orchestrated embedding pipelines, normalization strategies, cosine similarity scoring, and model comparison across 4-6 architectures per modality.",
      "Designed evaluation metrics, ranking logic, and interactive visualization dashboards to benchmark performance, analyze similarity distributions, and compare model effectiveness."
    ],
    techStack: ["Python", "PyTorch", "CLIP", "MiniLM", "Wav2Vec2", "Hugging Face", "Cosine Similarity", "Deep Learning"],
    features: [
      "Cross-modal embedding extraction across text, images, audio, and video clips",
      "Unified vector space normalization and cosine similarity scoring algorithm",
      "Model benchmark dashboard comparing CLIP, MiniLM, Wav2Vec2, and custom embeddings",
      "Interactive Hugging Face Space demonstration app for live input evaluation",
      "Distribution analysis and ranking matrix for multimodal retrieval"
    ],
    liveUrl: "https://huggingface.co/spaces/VatshalVenkat/Multi-Modal-Similarity-Evaluator",
    githubUrl: "https://github.com/Vatshal-Venkat/Multi-Modal-Similarity-Evaluator",
    accentColor: "from-blue-500 to-purple-600",
    category: "Multimodal AI // Deep Learning",
    architectureDetails: {
      overview: "The Cross-Modal Similarity Evaluation System projects heterogeneous media inputs (text prompts, image files, audio snippets, video frames) into a joint semantic embedding space. By computing normalized cosine similarity distances, the platform enables cross-modal search (e.g., text-to-video or audio-to-text) and benchmarks model accuracy across different deep learning architectures.",
      keyHighlights: [
        "Multi-Model Suite: Integrates OpenAI CLIP (vision-language), sentence-transformers MiniLM (text), and Meta Wav2Vec2 (audio).",
        "Normalization Layer: L2 norm transformation ensuring scale-invariant vector comparisons.",
        "Evaluation Matrix: Automatic ranking metrics including Mean Reciprocal Rank (MRR) and Precision@K.",
        "Interactive Space: Live Hugging Face Space UI allowing instant cross-modal similarity testing."
      ],
      useCases: [
        "Cross-modal Media Search & Retrieval",
        "Multimodal Dataset Quality & Consistency Auditing",
        "Embedding Model Performance Benchmarking"
      ]
    }
  },
  {
    id: "online_exam",
    slug: "online_exam",
    title: "Online Examination Portal",
    subtitle: "Scalable full-stack assessment platform with automated evaluation, anti-cheating detection, and analytics.",
    shortDescription: "Full-stack application built in WixStudio and Node.js featuring dynamic exam generation, anti-cheating tracking, automated evaluation, and real-time performance leaderboards.",
    bullets: [
      "Built a full-stack assessment application in WixStudio with analytics, performance optimization, and real-time evaluation.",
      "Reduced system latency by 40% through query optimization and efficient data access layer design.",
      "Designed scalable result analytics, automated scoring, and real-time leaderboard systems."
    ],
    techStack: ["Next.js", "Wix Studio", "Node.js", "JavaScript", "REST APIs", "Analytics Engine"],
    features: [
      "Dynamic exam generation with question bank randomization and timer controls",
      "Anti-cheating detection monitoring tab switches, focus losses, and suspicious behavior",
      "Automated evaluation engine generating instant score breakdown reports",
      "Real-time student leaderboard and analytical performance trends",
      "40% query latency reduction via strategic data caching and indexing"
    ],
    liveUrl: "https://venkatvatshal.wixstudio.com/my-site-6?rc=test-site",
    githubUrl: "https://github.com/Vatshal-Venkat/PrepWrap",
    accentColor: "from-orange-500 to-red-600",
    category: "Full Stack // Web Architecture",
    architectureDetails: {
      overview: "VJITPREP is an online examination and assessment ecosystem designed to support high-concurrency student test sessions. It handles user authentication, dynamic question selection from a managed CMS backend, real-time client state persistence, automated instant grading, and real-time leaderboard rankings.",
      keyHighlights: [
        "Proctoring Module: Event listeners tracking tab blur events, window resizing, and keyboard shortcuts.",
        "Performance Tuning: Query caching strategies reducing backend round-trip latency by 40%.",
        "Grading Engine: Server-side answer key validation with immediate feedback generation.",
        "Analytics Dashboard: Graphical performance distribution charts for students and administrators."
      ],
      useCases: [
        "University & Academic Semester Preparatory Exams",
        "Placement Mock Tests & Automated Technical Assessments",
        "Institutional Leaderboard & Performance Tracking"
      ]
    }
  },
  {
    id: "dhwani_voice_agent",
    slug: "dhwani_voice_agent",
    title: "Dhwani – Real-Time Voice Agent System",
    subtitle: "Next-generation low-latency conversational voice agent with speech recognition, LLM reasoning, and natural voice output.",
    shortDescription: "Advanced real-time AI voice agent designed for continuous speech-to-text processing, streaming LLM intelligence, context-aware dialogue management, and natural voice audio synthesis.",
    bullets: [
      "Architected Dhwani, a real-time AI voice agent pipeline combining low-latency Speech-to-Text (STT), LLM reasoning, and Text-to-Speech (TTS) synthesis.",
      "Engineered streaming audio buffer processing to minimize turn-taking latency and enable natural conversational interactions.",
      "Integrated function calling capabilities enabling the voice agent to execute external API commands during live audio conversations."
    ],
    techStack: ["Python", "Speech-to-Text (STT)", "Text-to-Speech (TTS)", "LLM Reasoning", "WebSocket Audio Streaming", "Asyncio", "APIs"],
    features: [
      "Low-latency real-time voice input stream processing and Voice Activity Detection (VAD)",
      "High-accuracy Speech-to-Text (STT) transcription pipeline",
      "Streaming LLM dialogue generator for instantaneous conversational responses",
      "Natural-sounding Text-to-Speech (TTS) audio synthesis",
      "External function and API calling triggered directly by voice instructions"
    ],
    liveUrl: "https://github.com/Vatshal-Venkat/Dhwani",
    githubUrl: "https://github.com/Vatshal-Venkat/Dhwani",
    accentColor: "from-purple-400 to-pink-600",
    category: "Voice AI // Real-Time Agents",
    architectureDetails: {
      overview: "Dhwani is a real-time conversational voice agent built to bridge human voice speech and AI intelligence. It continuously ingests mic audio streams over WebSockets, processes audio chunks using Voice Activity Detection (VAD), converts speech to text, feeds tokens to an LLM, and streams back synthesized audio responses with minimal end-to-end latency.",
      keyHighlights: [
        "Audio Pipeline: Bi-directional WebSocket streaming with low-buffer audio chunking.",
        "VAD & Interruption: Voice Activity Detection allowing users to interrupt the agent mid-sentence naturally.",
        "Reasoning Engine: Asynchronous LLM connection streaming responses as they are generated.",
        "Voice Synthesis: High-quality TTS engine with customizable voice pitch and natural cadence."
      ],
      useCases: [
        "Real-Time Conversational AI Voice Assistants",
        "Automated Customer Service & Interactive Voice Response (IVR)",
        "Voice-Controlled Systems and Hands-Free AI Interactions"
      ]
    }
  }
];