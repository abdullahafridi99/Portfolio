import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "./Icons";
import { smoothScrollTo } from "../utils/scroll";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change background transparency
  useEffect(() => {
    let scrolled = false;
    const handleScroll = () => {
      const isOverThreshold = window.scrollY > 20;
      if (isOverThreshold !== scrolled) {
        scrolled = isOverThreshold;
        setIsScrolled(isOverThreshold);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to highlight active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-40% 0px -50% 0px", // triggers when section is in the middle of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.href.replace("#", ""));
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Smooth scroll with offset for navbar height
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      smoothScrollTo(offsetPosition, 350);

      // Update route hash manually
      window.history.pushState(null, null, href);
      setActiveSection(targetId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-dark-950/80 backdrop-blur-md border-dark-700/60 py-4 shadow-glass"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Name Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group relative flex items-center font-bold text-xl tracking-tight text-white cursor-pointer"
          id="nav-logo"
        >
          <span className="text-white group-hover:text-accent-cyan transition-colors duration-300">MA.</span>
          <span className="relative overflow-hidden w-0 group-hover:w-[72px] transition-all duration-500 ease-out inline-flex text-xs ml-1.5 uppercase font-medium text-dark-500 tracking-widest leading-none">
            Abdullah
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan group-hover:w-full transition-all duration-500"></div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-sm font-medium transition-colors duration-300 px-3 py-1.5 inline-block ${
                      isActive ? "text-accent-cyan" : "text-dark-500 hover:text-slate-100"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-cyan to-accent-indigo" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Link to Contact */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center gap-1 text-xs font-semibold px-4 py-2 border border-accent-cyan/20 rounded-full hover:border-accent-cyan hover:bg-accent-cyan/5 text-accent-cyan hover:text-white transition-all duration-300 group shadow-cyan-glow/20"
            id="nav-cta"
          >
            Hire Me
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-dark-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
          aria-label="Toggle navigation menu"
          id="mobile-nav-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu (CSS Transition) */}
      <div
        className={`md:hidden bg-dark-900 border-b border-dark-700/60 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-[380px] opacity-100 border-t border-dark-700/40" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-lg font-medium block py-2 transition-colors ${
                      isActive ? "text-accent-cyan pl-2 border-l-2 border-accent-cyan" : "text-dark-500"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center justify-center gap-2 text-center text-sm font-semibold py-3 border border-accent-cyan/20 rounded-xl hover:border-accent-cyan bg-accent-cyan/5 text-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300"
          >
            Hire Me
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
