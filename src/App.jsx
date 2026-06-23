import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";

// Layout wrapper for sections
function HomeLayout() {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col relative selection:bg-accent-cyan/30 selection:text-accent-cyan">
      {/* Dynamic ambient grid overlay on the main content */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      
      {/* Header / Nav */}
      <Navbar />

      {/* Main content sections */}
      <main className="flex-grow z-10 relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* React Router DOM (v6+) integration */}
        <Route path="/" element={<HomeLayout />} />
        {/* Register hidden Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Catch-all route mapping back to home */}
        <Route path="*" element={<HomeLayout />} />
      </Routes>
    </Router>
  );
}
