import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User, Project } from "./models.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("CRITICAL: MONGODB_URI environment variable is not defined in server/.env!");
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas database successfully.");
    await seedDatabase();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

async function seedDatabase() {
  try {
    // Seed default admin user
    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    const userExists = await User.findOne({ username: adminUser });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPass, salt);
      
      await User.create({
        username: adminUser,
        passwordHash: hashedPassword
      });
      console.log("Database seeded: Default admin user loaded.");
    }

    // Seed default projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const defaultProjects = [
        {
          title: "NovaDrive — AI Cloud Storage Platform",
          description: "A next-generation cloud storage platform featuring drag-and-drop file uploads, smart semantic file search, folder sharing permissions, and collaborative real-time document editing.",
          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          technologies: ["React", "Tailwind CSS", "Firebase", "WebSockets"],
          liveLink: "https://novadrive-demo.netlify.app",
          githubLink: "https://github.com/abdullah-afridi/novadrive"
        },
        {
          title: "Aetheria Studio — Interactive 3D Agency Landing",
          description: "An immersive, Awwwards-nominated creative design studio website featuring custom cursors, smooth horizontal scrolling, WebGL particle interactions, and rich scroll-linked animations.",
          image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
          technologies: ["React", "Three.js", "Tailwind CSS", "GSAP"],
          liveLink: "https://aetheria-studio.netlify.app",
          githubLink: "https://github.com/abdullah-afridi/aetheria-studio"
        },
        {
          title: "OmniSearch — Semantic AI Code Companion",
          description: "A productivity tool for developers providing semantic search over local workspaces, AI-generated code summaries, chat-with-codebase capabilities, and auto-generated API mock routes.",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
          technologies: ["React", "Tailwind CSS", "OpenAI API", "Markdown Parser"],
          liveLink: "https://omnisearch-ai.netlify.app",
          githubLink: "https://github.com/abdullah-afridi/omnisearch-ai"
        },
        {
          title: "ApexMetrics — Enterprise SaaS Dashboard",
          description: "A high-performance SaaS analytics suite with customizable drag-and-drop widgets, real-time activity streams, interactive data visualization, and automated PDF report compilation.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          technologies: ["React", "Recharts", "Tailwind CSS", "React Context"],
          liveLink: "https://apexmetrics.netlify.app",
          githubLink: "https://github.com/abdullah-afridi/apexmetrics"
        }
      ];

      await Project.insertMany(defaultProjects);
      console.log("Database seeded: Default projects loaded.");
    }
  } catch (error) {
    console.error("Database seeding failure:", error);
  }
}

export default connectDB;
export { seedDatabase };
