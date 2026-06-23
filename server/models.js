import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: { type: [String], required: true },
  liveLink: { type: String, required: true },
  githubLink: { type: String, required: true }
});

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError in serverless environments by checking model existence first
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
