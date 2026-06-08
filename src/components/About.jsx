import React, { useState, useEffect, useRef } from "react";
import { Briefcase, Award, Compass, Code } from "./Icons";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef(null);

  // Native Intersection Observer to fade up content on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger once
        }
      },
      { threshold: 0.05 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Light glow spotlight */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 blur-spotlight-cyan pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-accent-cyan" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">About Me</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Crafting Digital <span className="text-glow-cyan">Masterpieces</span>
          </h2>
        </div>

        {/* Bento Grid Layout with fast CSS transition */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Bio Card - Spans 2 cols */}
          <div className="md:col-span-2 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-accent-cyan/25 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-full filter blur-3xl group-hover:bg-accent-cyan/10 transition-all duration-500 pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <Code className="text-accent-cyan" /> Who I Am
            </h3>
            
            <p className="text-dark-500 leading-relaxed mb-6 font-light">
              Hi, I'm <strong className="text-white font-medium">Muhammad Abdullah</strong>, a passionate Frontend Engineer and UI/UX Designer based in Pakistan. I specialize in building sleek, high-performance, and visually spectacular web applications.
            </p>
            <p className="text-dark-500 leading-relaxed mb-6 font-light">
              My core focus lies at the intersection of pixel-perfect design and clean, scalable code. I believe websites should not only function flawlessly but also deliver emotional experiences through smooth micro-interactions, responsive sizing, and vibrant style hierarchies.
            </p>
            <p className="text-dark-500 leading-relaxed font-light">
              Whether coding custom component ecosystems in React, refining grid-aligned flex containers, or configuring delicate transition curves, I strive for excellence in every project.
            </p>
          </div>

          {/* Quick Metrics Card */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between hover:border-accent-cyan/25 transition-all duration-500">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-3">
              <Award className="text-accent-cyan" /> Milestones
            </h3>
            
            <div className="grid grid-cols-2 gap-4 flex-grow my-auto justify-center">
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-dark-700/50 flex flex-col justify-center">
                <span className="text-3xl font-extrabold text-accent-cyan block">2+</span>
                <span className="text-xs text-dark-500 mt-1 uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-dark-700/50 flex flex-col justify-center">
                <span className="text-3xl font-extrabold text-accent-emerald block">20+</span>
                <span className="text-xs text-dark-500 mt-1 uppercase tracking-wider">Completed Projects</span>
              </div>
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-dark-700/50 flex flex-col justify-center col-span-2">
                <span className="text-3xl font-extrabold text-white block">100%</span>
                <span className="text-xs text-dark-500 mt-1 uppercase tracking-wider">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Work Approach / Philosophy */}
          <div className="glass-panel p-8 rounded-3xl hover:border-accent-cyan/25 transition-all duration-500">
            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
              <Compass className="text-accent-cyan" /> Philosophy
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan mt-1">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Quality First</h4>
                  <p className="text-xs text-dark-500 mt-1 font-light leading-relaxed">No cutting corners. Code must be semantic, performant, and maintainable.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-accent-emerald/10 text-accent-emerald mt-1">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">User Centricity</h4>
                  <p className="text-xs text-dark-500 mt-1 font-light leading-relaxed">Interface layouts are optimized for ease of navigation, accessibility, and high usability.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Experience Timeline */}
          <div className="md:col-span-2 glass-panel p-8 rounded-3xl hover:border-accent-cyan/25 transition-all duration-500">
            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
              <Briefcase className="text-accent-cyan" /> Experience & Education
            </h3>
            
            <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-dark-700">
              {/* Exp 1 */}
              <div className="relative pl-10 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div className="absolute left-[9px] top-1.5 w-[17px] h-[17px] rounded-full bg-accent-cyan border-4 border-dark-950 shadow-cyan-glow" />
                <div>
                  <h4 className="font-bold text-slate-100 text-base">Frontend Developer</h4>
                  <span className="text-xs text-dark-500">Freelance / Contract</span>
                </div>
                <div className="inline-flex px-3 py-1 rounded-full bg-dark-900 border border-dark-700 text-xs text-accent-cyan font-medium leading-none self-start md:self-auto">
                  2024 - Present
                </div>
              </div>

              {/* Exp 2 */}
              <div className="relative pl-10 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div className="absolute left-[9px] top-1.5 w-[17px] h-[17px] rounded-full bg-accent-emerald border-4 border-dark-950 shadow-emerald-glow" />
                <div>
                  <h4 className="font-bold text-slate-100 text-base">Web Development Studies</h4>
                  <span className="text-xs text-dark-500">SMIT (Saylani Mass IT Training)</span>
                </div>
                <div className="inline-flex px-3 py-1 rounded-full bg-dark-900 border border-dark-700 text-xs text-accent-emerald font-medium leading-none self-start md:self-auto">
                  2023 - 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
