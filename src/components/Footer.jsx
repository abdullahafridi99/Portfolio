import React from "react";
import { ArrowUp } from "./Icons";
import { Github, Linkedin, Twitter } from "./BrandIcons";
import { smoothScrollTo } from "../utils/scroll";

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    smoothScrollTo(0, 350);
    window.history.pushState(null, null, "#home");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-700/40 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Left Side: Brand Name & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold tracking-tight text-white">
            MA<span className="text-accent-cyan">.</span>
          </div>
          <p className="text-xs text-dark-500 font-light text-center md:text-left">
            &copy; {currentYear} Muhammad Abdullah. All rights reserved.
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex gap-4">
          {[
            { Icon: Github, href: "https://github.com", label: "GitHub" },
            { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { Icon: Twitter, href: "https://twitter.com", label: "Twitter" }
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-2.5 rounded-full bg-dark-900 border border-dark-700/60 text-dark-500 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 shadow-sm"
            >
              <social.Icon size={16} />
            </a>
          ))}
        </div>

        {/* Right Side: Back to Top */}
        <button
          onClick={handleScrollToTop}
          className="group p-3 rounded-full bg-dark-900 border border-dark-700/60 text-dark-500 hover:text-accent-cyan hover:border-accent-cyan/40 hover:-translate-y-1 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
          aria-label="Scroll to top of page"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
