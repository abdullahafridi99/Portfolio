import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./database.js";
import { User, Project, Message } from "./models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_123456";

// Middleware
app.use(cors());
app.use(express.json());

// Ensure MongoDB database is connected on every request (crucial for serverless routes)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      error: "Database offline. Please check your MONGODB_URI configuration in server/.env."
    });
  }
});

// JWT Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
}

// ==========================================
// PUBLIC API ENDPOINTS
// ==========================================

// 1. Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: 1 });
    res.json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);
    res.status(500).json({ error: "Failed to retrieve projects." });
  }
});

// 2. Submit contact form inquiry
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Server-side validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return res.status(400).json({ error: "Invalid email address format." });
  }

  try {
    await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });
    res.status(201).json({ message: "Inquiry saved successfully!" });
  } catch (error) {
    console.error("Save message error:", error);
    res.status(500).json({ error: "Failed to save contact message." });
  }
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Login authentication error:", error);
    res.status(500).json({ error: "Authentication system failure." });
  }
});

// Verify token validity
app.get("/api/auth/verify", authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

// Reset password route (Requires Recovery Pin)
app.post("/api/auth/reset-password", async (req, res) => {
  const { username, recoveryPin, newPassword } = req.body;

  if (!username || !recoveryPin || !newPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const envRecoveryPin = process.env.RECOVERY_PIN || "admin-recovery-99";
  if (recoveryPin.trim() !== envRecoveryPin.trim()) {
    return res.status(401).json({ error: "Invalid recovery security pin." });
  }

  if (newPassword.trim().length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Admin user not found." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.passwordHash = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ error: "Failed to reset password." });
  }
});

// Change password route (Authenticated)
app.put("/api/admin/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required." });
  }

  if (newPassword.trim().length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters." });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Incorrect current password." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.passwordHash = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Failed to change password." });
  }
});

// ==========================================
// ADMIN PRIVATE PROJECTS CRUD API
// ==========================================

// Add project
app.post("/api/admin/projects", authenticateToken, async (req, res) => {
  const { title, description, image, technologies, liveLink, githubLink } = req.body;

  if (!title || !description || !image || !technologies || !liveLink || !githubLink) {
    return res.status(400).json({ error: "All project fields are required." });
  }

  try {
    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      technologies, // Store raw array
      liveLink: liveLink.trim(),
      githubLink: githubLink.trim()
    });
    res.status(201).json({ id: project._id, message: "Project added successfully!" });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: "Failed to create project." });
  }
});

// Update project
app.put("/api/admin/projects/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, technologies, liveLink, githubLink } = req.body;

  if (!title || !description || !image || !technologies || !liveLink || !githubLink) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
        technologies,
        liveLink: liveLink.trim(),
        githubLink: githubLink.trim()
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.json({ message: "Project updated successfully!" });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ error: "Failed to update project details." });
  }
});

// Delete project
app.delete("/api/admin/projects/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ error: "Failed to delete project." });
  }
});

// ==========================================
// ADMIN PRIVATE MESSAGES API
// ==========================================

// Get all messages
app.get("/api/admin/messages", authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ error: "Failed to retrieve messages." });
  }
});

// Delete message
app.delete("/api/admin/messages/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ error: "Message record not found." });
    }
    res.json({ message: "Message deleted successfully!" });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ error: "Failed to delete message." });
  }
});

// ==========================================
// STATIC FRONTEND SERVING (PRODUCTION MODE)
// ==========================================
const distPath = path.join(__dirname, "../dist");

if (fs.existsSync(distPath)) {
  console.log("Serving static frontend files from:", distPath);
  app.use(express.static(distPath));

  // Catch-all route to serve index.html for Single Page Application routing (e.g. /admin page reload)
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Start Server locally (prevent binding when Vercel imports the app router serverless)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

export default app;
