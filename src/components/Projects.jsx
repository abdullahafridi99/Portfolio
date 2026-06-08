import React, { useState, useEffect, useRef } from "react";
import { projectsData } from "../data/projectsData";
import { ExternalLink } from "./Icons";
import { Github } from "./BrandIcons";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Popular filters selection
  const popularFilters = ["All", "React", "Tailwind CSS", "Framer Motion", "Three.js"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(project => project.technologies.includes(filter));

  // Native Intersection Observer to trigger entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 blur-spotlight-cyan pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-accent-cyan" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">Selected Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Built With Purpose & <span className="text-glow-cyan">Precision</span>
          </h2>
        </div>

        {/* Project Tag Filters */}
        <div className="flex flex-wrap gap-2.5 mb-12" id="projects-filter">
          {popularFilters.map((tech) => {
            const isActive = filter === tech;
            return (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-accent-cyan border-accent-cyan text-dark-950 shadow-cyan-glow"
                    : "bg-dark-900 border-dark-700/60 text-dark-500 hover:border-slate-400 hover:text-white"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with snappier CSS transitions */}
        <div
          ref={containerRef}
          key={filter} // Forces clean CSS entry animation when filter criteria changes
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col h-full rounded-3xl overflow-hidden glass-panel border-white/5 hover:border-accent-cyan/25 hover:-translate-y-1.5 transition-all duration-500 shadow-md hover:shadow-cyan-glow/5"
            >
              {/* Project Image Container */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-dark-700/40 bg-dark-950">
                {/* Hover visual overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60 z-10" />
                <div className="absolute inset-0 bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Quick view hover action */}
                <div className="absolute top-4 right-4 flex gap-2.5 z-20">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-dark-950/80 backdrop-blur-sm border border-white/10 hover:border-accent-cyan hover:bg-accent-cyan hover:text-dark-950 text-slate-100 transition-all duration-300 shadow-lg"
                    aria-label={`View code for ${project.title}`}
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-dark-950/80 backdrop-blur-sm border border-white/10 hover:border-accent-cyan hover:bg-accent-cyan hover:text-dark-950 text-slate-100 transition-all duration-300 shadow-lg"
                    aria-label={`View live site for ${project.title}`}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Details Area */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-accent-cyan transition-colors duration-300 mb-3 tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-dark-500 text-sm leading-relaxed mb-6 font-light flex-grow">
                  {project.description}
                </p>

                {/* Card bottom footer link */}
                <div className="pt-4 border-t border-dark-700/40 flex items-center justify-between">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-100 hover:text-accent-cyan transition-colors group/link"
                  >
                    Explore Project
                    <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-dark-500 hover:text-slate-100 transition-colors"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
