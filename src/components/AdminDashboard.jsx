import React, { useState, useEffect } from "react";
import { smoothScrollTo } from "../utils/scroll";

// Reuse lightweight custom inline SVGs we built previously
const Lock = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Trash = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

const EditIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const Plus = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5v14" />
  </svg>
);

const Key = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3M18.5 4.5l3 3" />
  </svg>
);

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("messages"); // messages, projects
  
  // Login Form State
  const [loginCreds, setLoginCreds] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Forgot Password / Password Reset State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetCreds, setResetCreds] = useState({
    username: "",
    recoveryPin: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Change Password State
  const [changeCreds, setChangeCreds] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [changeError, setChangeError] = useState("");
  const [changeSuccess, setChangeSuccess] = useState("");
  const [changeLoading, setChangeLoading] = useState(false);

  // Dynamic Data Lists
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Project Editor Form State
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "", // Filled as comma separated in inputs
    liveLink: "",
    githubLink: ""
  });
  const [projectFormError, setProjectFormError] = useState("");

  // Check auth status on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      // Verify token with backend
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Session expired");
          return res.json();
        })
        .then((data) => {
          setToken(savedToken);
          setUsername(data.username);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("adminToken");
        });
    }
    // Scroll to top
    smoothScrollTo(0, 100);
  }, []);

  // Fetch admin items once authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchData();
    }
  }, [isAuthenticated, token, activeTab]);

  const fetchData = async () => {
    setIsLoadingData(true);
    const headers = { Authorization: `Bearer ${token}` };
    
    try {
      if (activeTab === "messages") {
        const res = await fetch("/api/admin/messages", { headers });
        if (!res.ok) throw new Error("Failed to load messages");
        const data = await res.json();
        setMessages(data);
      } else {
        // Fetch projects (can use public endpoint)
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginCreds)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setUsername(data.username);
      setIsAuthenticated(true);
      setLoginCreds({ username: "", password: "" });
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setToken("");
    setUsername("");
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (resetCreds.newPassword !== resetCreds.confirmNewPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    if (resetCreds.newPassword.trim().length < 6) {
      setResetError("New password must be at least 6 characters.");
      return;
    }

    setResetLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: resetCreds.username,
          recoveryPin: resetCreds.recoveryPin,
          newPassword: resetCreds.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Password reset failed.");
      }

      setResetSuccess("Password reset successfully! You can now log in.");
      setResetCreds({
        username: "",
        recoveryPin: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    } catch (err) {
      setResetError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangeError("");
    setChangeSuccess("");

    if (changeCreds.newPassword !== changeCreds.confirmNewPassword) {
      setChangeError("Passwords do not match.");
      return;
    }

    if (changeCreds.newPassword.trim().length < 6) {
      setChangeError("New password must be at least 6 characters.");
      return;
    }

    setChangeLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: changeCreds.currentPassword,
          newPassword: changeCreds.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password.");
      }

      setChangeSuccess("Password updated successfully!");
      setChangeCreds({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    } catch (err) {
      setChangeError(err.message);
    } finally {
      setChangeLoading(false);
    }
  };

  // ==========================================
  // MESSAGE CRUD HANDLERS
  // ==========================================
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      alert("Failed to delete message: " + err.message);
    }
  };

  // ==========================================
  // PROJECT CRUD HANDLERS
  // ==========================================
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  const openAddProjectForm = () => {
    setEditingId(null);
    setProjectForm({
      title: "",
      description: "",
      image: "",
      technologies: "",
      liveLink: "",
      githubLink: ""
    });
    setProjectFormError("");
    setIsEditingProject(true);
  };

  const openEditProjectForm = (project) => {
    setEditingId(project.id);
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(", "),
      liveLink: project.liveLink,
      githubLink: project.githubLink
    });
    setProjectFormError("");
    setIsEditingProject(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setProjectFormError("");

    // Destructure and validate
    const { title, description, image, technologies, liveLink, githubLink } = projectForm;
    if (!title || !description || !image || !technologies || !liveLink || !githubLink) {
      setProjectFormError("All fields are required.");
      return;
    }

    // Split technologies back into array
    const techArray = technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title,
      description,
      image,
      technologies: techArray,
      liveLink,
      githubLink
    };

    const url = editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save project.");
      }

      setIsEditingProject(false);
      fetchData(); // Reload list
    } catch (err) {
      setProjectFormError(err.message);
    }
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 text-slate-100 flex items-center justify-center px-6 relative py-20 bg-grid-pattern">
        {/* Lights spots */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full filter blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-indigo/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl border-white/5 relative z-10">
          {showForgotPassword ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Reset Password</h2>
                <p className="text-xs text-dark-500 font-light">Verify security pin to update admin credentials</p>
              </div>

              <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
                {resetError && (
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-red-400 font-semibold">
                    {resetError}
                  </div>
                )}
                {resetSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
                    {resetSuccess}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={resetCreds.username}
                      onChange={(e) => setResetCreds({ ...resetCreds, username: e.target.value })}
                      className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                      <UserIcon size={18} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Recovery Pin</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={resetCreds.recoveryPin}
                      onChange={(e) => setResetCreds({ ...resetCreds, recoveryPin: e.target.value })}
                      className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                      <Key size={18} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={resetCreds.newPassword}
                      onChange={(e) => setResetCreds({ ...resetCreds, newPassword: e.target.value })}
                      className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                      <Lock size={18} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={resetCreds.confirmNewPassword}
                      onChange={(e) => setResetCreds({ ...resetCreds, confirmNewPassword: e.target.value })}
                      className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                      <Lock size={18} />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-4 bg-gradient-to-r from-accent-cyan to-accent-indigo text-dark-950 font-bold rounded-xl hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 shadow-cyan-glow transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {resetLoading ? (
                    <span className="w-5 h-5 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetError("");
                      setResetSuccess("");
                      setLoginError("");
                    }}
                    className="text-xs text-accent-cyan hover:underline font-medium transition-all"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Admin Dashboard</h2>
                <p className="text-xs text-dark-500 font-light">Sign in to manage projects & view inquiries</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                {loginError && (
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-red-400 font-semibold">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={loginCreds.username}
                      onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                      className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                      <UserIcon size={18} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginCreds.password}
                      onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                      className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                      <Lock size={18} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setLoginError("");
                      setResetError("");
                      setResetSuccess("");
                    }}
                    className="text-xs text-accent-cyan hover:underline font-medium transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 bg-gradient-to-r from-accent-cyan to-accent-indigo text-dark-950 font-bold rounded-xl hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 shadow-cyan-glow transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loginLoading ? (
                    <span className="w-5 h-5 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                  ) : (
                    "Login Dashboard"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN CONTENT
  // ==========================================
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 pt-32 pb-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-12 pb-6 border-b border-dark-700/40">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">Admin Control Center</h1>
            <p className="text-xs text-dark-500 font-light mt-1">Logged in as <strong className="text-accent-cyan">{username}</strong></p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start md:self-auto px-4 py-2 border border-red-500/20 text-xs font-bold rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-start gap-4 mb-8">
          {[
            { id: "messages", label: "Messages" },
            { id: "projects", label: "Projects CRUD" },
            { id: "security", label: "Change Password" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setIsEditingProject(false);
                setActiveTab(tab.id);
                // Clear state when switching tabs
                setChangeError("");
                setChangeSuccess("");
                setChangeCreds({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
              }}
              className={`px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-accent-cyan border-accent-cyan text-dark-950 shadow-cyan-glow"
                  : "bg-dark-900 border-dark-700/60 text-dark-500 hover:text-white"
              }`}
            >
              {tab.label} {tab.id === "messages" && messages.length > 0 && `(${messages.length})`}
            </button>
          ))}
        </div>

        {/* ==========================================
            TAB VIEW: MESSAGES
            ========================================== */}
        {activeTab === "messages" && (
          <div>
            {isLoadingData ? (
              <div className="text-center py-20 text-dark-500 font-light">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-20 text-dark-500 font-light border border-dashed border-dark-700/40 rounded-3xl">
                No contact messages received yet.
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-panel p-6 md:p-8 rounded-3xl border-white/5 relative group hover:border-accent-cyan/15 transition-colors duration-300">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-100">{msg.subject}</h3>
                        <p className="text-xs text-dark-500 font-medium mt-1">
                          From: <span className="text-slate-300">{msg.name}</span> (<a href={`mailto:${msg.email}`} className="text-accent-cyan hover:underline">{msg.email}</a>)
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 text-dark-500 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                        aria-label="Delete message"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-wrap">{msg.message}</p>
                    <span className="text-[10px] text-dark-500 font-semibold block mt-4 uppercase">
                      Received: {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB VIEW: PROJECTS
            ========================================== */}
        {activeTab === "projects" && (
          <div>
            {!isEditingProject ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-100">Projects List</h2>
                  <button
                    onClick={openAddProjectForm}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-accent-cyan hover:scale-[1.02] text-dark-950 text-xs font-bold rounded-xl transition-all shadow-cyan-glow"
                  >
                    <Plus size={16} />
                    Add Project
                  </button>
                </div>

                {isLoadingData ? (
                  <div className="text-center py-20 text-dark-500 font-light">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-20 text-dark-500 font-light border border-dashed border-dark-700/40 rounded-3xl">
                    No projects found. Click "Add Project" to upload one.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="glass-panel p-6 rounded-3xl border-white/5 flex gap-4 items-start">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-24 h-24 object-cover rounded-xl border border-dark-700/40 bg-dark-950"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-100 truncate">{project.title}</h3>
                          <p className="text-xs text-dark-500 line-clamp-2 mt-1 mb-3 font-light">{project.description}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditProjectForm(project)}
                              className="p-1.5 bg-dark-900 border border-dark-700/60 hover:border-accent-cyan text-dark-500 hover:text-accent-cyan rounded-lg transition-colors flex items-center justify-center"
                              aria-label="Edit project"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1.5 bg-dark-900 border border-dark-700/60 hover:border-red-500 text-dark-500 hover:text-red-400 rounded-lg transition-colors flex items-center justify-center"
                              aria-label="Delete project"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // CRUD Project Form Panel
              <div className="glass-panel p-8 md:p-10 rounded-3xl border-white/5 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-100">
                    {editingId ? "Edit Project Details" : "Create New Project Entry"}
                  </h2>
                  <button
                    onClick={() => setIsEditingProject(false)}
                    className="text-xs text-dark-500 hover:text-slate-100 font-bold"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  {projectFormError && (
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-red-400 font-semibold">
                      {projectFormError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Portfolio Website"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Description</label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Summarize the project..."
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Thumbnail Image URL</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. React, Tailwind CSS, SQLite, Node.js"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Live Demo URL</label>
                      <input
                        type="text"
                        required
                        placeholder="https://..."
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">GitHub Code URL</label>
                      <input
                        type="text"
                        required
                        placeholder="https://github.com/..."
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-accent-cyan to-accent-emerald text-dark-950 font-bold rounded-xl hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-emerald/50 shadow-emerald-glow transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Save Project
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB VIEW: SECURITY (CHANGE PASSWORD)
            ========================================== */}
        {activeTab === "security" && (
          <div className="glass-panel p-8 md:p-10 rounded-3xl border-white/5 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">Change Password</h2>
              <p className="text-xs text-dark-500 font-light">Update your current admin credentials</p>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-6">
              {changeError && (
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-red-400 font-semibold">
                  {changeError}
                </div>
              )}
              {changeSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
                  {changeSuccess}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={changeCreds.currentPassword}
                    onChange={(e) => setChangeCreds({ ...changeCreds, currentPassword: e.target.value })}
                    className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                    <Lock size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={changeCreds.newPassword}
                    onChange={(e) => setChangeCreds({ ...changeCreds, newPassword: e.target.value })}
                    className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                    <Lock size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={changeCreds.confirmNewPassword}
                    onChange={(e) => setChangeCreds({ ...changeCreds, confirmNewPassword: e.target.value })}
                    className="w-full pl-11 pr-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10 transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500">
                    <Lock size={18} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={changeLoading}
                className="w-full py-4 bg-gradient-to-r from-accent-cyan to-accent-indigo text-dark-950 font-bold rounded-xl hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 shadow-cyan-glow transition-all duration-300 flex items-center justify-center gap-2"
              >
                {changeLoading ? (
                  <span className="w-5 h-5 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
