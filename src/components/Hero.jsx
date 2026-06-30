import React, { useState, useEffect } from "react";
import { ArrowRight, Download, Mail } from "./Icons";
import { Github, Linkedin, Twitter } from "./BrandIcons";
import { smoothScrollTo } from "../utils/scroll";

const titles = ["MERN Stack Developer", "Full Stack Engineer", "React & Node Developer", "MongoDB Expert"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  // Trigger CSS fade-in transition on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch profile picture on mount
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profilePic) setProfilePic(data.profilePic);
      })
      .catch((err) => console.error("Error loading profile:", err));
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    let timer;
    const currentFullText = titles[titleIndex];
    
    const type = () => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        
        if (displayText === currentFullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1000);
          return;
        }
      } else {
        // Deleting
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        
        if (displayText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }

      const speed = isDeleting ? 15 : 35;
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handleCtaClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.replace("#", ""));
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      smoothScrollTo(offsetPosition, 350);
      window.history.pushState(null, null, href);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Decorative Floating Blobs (optimized with hardware-accelerated radial gradients, no expensive CSS blur filters) */}
      <div 
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full animate-blob-slow pointer-events-none" 
        style={{
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)",
          willChange: "transform",
          transform: "translateZ(0)"
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-blob-slow [animation-delay:2s] pointer-events-none" 
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)",
          willChange: "transform",
          transform: "translateZ(0)"
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full animate-blob-slow [animation-delay:4s] pointer-events-none" 
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
          willChange: "transform",
          transform: "translateZ(0)"
        }}
      />

      {/* Grid Overlay Spotlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950 pointer-events-none" />

      {/*snappy CSS fade-up container */}
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left transition-all duration-1000 ease-out transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Left Column - Content (spans 7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Intro Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-light border border-white/5 mb-6 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Available for Freelance & Full-time Roles
            </span>
          </div>

          {/* High-Impact Typography Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.05]" id="hero-title">
            <span className="block text-slate-100">Muhammad</span>
            <span className="block text-glow-cyan">Abdullah</span>
          </h1>

          {/* Dynamic Typewritten Subtitle */}
          <div className="h-10 mb-10 flex items-center justify-center lg:justify-start">
            <p className="text-xl md:text-3xl font-light text-dark-500 tracking-wide">
              I'm a{" "}
              <span className="font-semibold text-white border-r-2 border-accent-cyan pr-1.5 animate-pulse">
                {displayText}
              </span>
            </p>
          </div>

          {/* Action Buttons (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full mb-12" id="hero-ctas">
            <a
              href="#projects"
              onClick={(e) => handleCtaClick(e, "#projects")}
              className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-indigo text-dark-950 font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-cyan-glow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 w-full sm:w-auto text-center"
            >
              View My Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleCtaClick(e, "#contact")}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-dark-700 hover:border-slate-300 bg-dark-900/50 hover:bg-dark-900 text-slate-100 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-300/30 w-full sm:w-auto text-center"
            >
              Let's Talk
            </a>
          </div>

          {/* Social Quick Links */}
          <div className="flex gap-6 justify-center lg:justify-start items-center w-full">
            {[
              { Icon: Github, href: "https://github.com", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { Icon: Mail, href: "mailto:abdullahafridi12390@gmail.com", label: "Email" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 rounded-full bg-dark-900/50 border border-dark-700/60 text-dark-500 hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-dark-900 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <social.Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Glowing Profile Photo (spans 5 cols on lg) */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <div className="relative group">
            {/* Multi-layered futuristic glowing border frames */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-accent-cyan to-accent-indigo rounded-full blur-md opacity-25 group-hover:opacity-40 transition-all duration-700 animate-pulse" />
            
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-white/10 group-hover:border-accent-cyan/40 bg-dark-950 flex items-center justify-center transition-all duration-500 shadow-2xl">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Muhammad Abdullah"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-24 h-24 text-dark-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Downward Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-5 h-10 border-2 border-dark-700 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2.5 bg-accent-cyan rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
