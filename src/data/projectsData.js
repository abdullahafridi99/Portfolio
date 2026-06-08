/**
 * projectsData.js
 * 
 * This file contains the project objects displayed in the Portfolio section.
 * You can easily add, edit, or delete items in this array to update your portfolio.
 * 
 * Each project object must contain the following fields:
 * - id: Unique number identifying the project (e.g., 1, 2, 3...)
 * - title: The name of the project
 * - description: A brief summary of what the project does and its features
 * - image: URL for the project thumbnail/mockup (Unsplash links or local asset paths)
 * - technologies: Array of strings representing the technology stack used
 * - liveLink: Live hosted URL of the project (use '#' if unavailable)
 * - githubLink: GitHub repository URL of the project (use '#' if unavailable)
 */

export const projectsData = [
  {
    id: 1,
    title: "NovaDrive — AI Cloud Storage Platform",
    description: "A next-generation cloud storage platform featuring drag-and-drop file uploads, smart semantic file search, folder sharing permissions, and collaborative real-time document editing.",
    // Premium abstract tech image
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase", "WebSockets"],
    liveLink: "https://novadrive-demo.netlify.app", // Placeholder link (change to yours!)
    githubLink: "https://github.com/abdullah-afridi/novadrive"
  },
  {
    id: 2,
    title: "Aetheria Studio — Interactive 3D Agency Landing",
    description: "An immersive, Awwwards-nominated creative design studio website featuring custom cursors, smooth horizontal scrolling, WebGL particle interactions, and rich scroll-linked animations.",
    // Colorful 3D glassmorphic spheres
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "GSAP"],
    liveLink: "https://aetheria-studio.netlify.app", // Placeholder link (change to yours!)
    githubLink: "https://github.com/abdullah-afridi/aetheria-studio"
  },
  {
    id: 3,
    title: "OmniSearch — Semantic AI Code Companion",
    description: "A productivity tool for developers providing semantic search over local workspaces, AI-generated code summaries, chat-with-codebase capabilities, and auto-generated API mock routes.",
    // Neural network lines
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "OpenAI API", "Markdown Parser"],
    liveLink: "https://omnisearch-ai.netlify.app", // Placeholder link (change to yours!)
    githubLink: "https://github.com/abdullah-afridi/omnisearch-ai"
  },
  {
    id: 4,
    title: "ApexMetrics — Enterprise SaaS Dashboard",
    description: "A high-performance SaaS analytics suite with customizable drag-and-drop widgets, real-time activity streams, interactive data visualization, and automated PDF report compilation.",
    // Interactive dashboard charts
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Recharts", "Tailwind CSS", "Framer Motion", "React Context"],
    liveLink: "https://apexmetrics.netlify.app", // Placeholder link (change to yours!)
    githubLink: "https://github.com/abdullah-afridi/apexmetrics"
  }
];
