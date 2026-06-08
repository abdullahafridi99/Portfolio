import React, { useState } from "react";
import { skillsData } from "../data/skillsData";
import { 
  Atom, 
  Code2, 
  Terminal, 
  Wind, 
  Layers, 
  Flame, 
  GitFork, 
  Zap, 
  Cpu, 
  PenTool, 
  Smartphone, 
  Layout, 
  Type, 
  Sparkles,
  Server,
  CloudLightning
} from "./Icons";

// Icon mapper helper
const SkillIcon = ({ name, color }) => {
  const props = { size: 24, className: color };
  switch (name) {
    case "ReactIcon":
      return <Atom {...props} />;
    case "JsIcon":
      return <Terminal {...props} />;
    case "TailwindIcon":
      return <Wind {...props} />;
    case "FramerIcon":
      return <Layers {...props} />;
    case "HtmlCssIcon":
      return <Code2 {...props} />;
    case "TsIcon":
      return <Cpu {...props} />;
    case "ReduxIcon":
      return <Layers {...props} />;
    case "NodeIcon":
      return <Server {...props} />;
    case "FirebaseIcon":
      return <Flame {...props} />;
    case "GitIcon":
      return <GitFork {...props} />;
    case "SocketIcon":
      return <Zap {...props} />;
    case "ApiIcon":
      return <Cpu {...props} />;
    case "ViteIcon":
      return <CloudLightning {...props} />;
    case "FigmaIcon":
      return <PenTool {...props} />;
    case "ResponsiveIcon":
      return <Smartphone {...props} />;
    case "WireframeIcon":
      return <Layout {...props} />;
    case "FontIcon":
      return <Type {...props} />;
    case "SparklesIcon":
      return <Sparkles {...props} />;
    default:
      return <Code2 {...props} />;
  }
};

const iconColors = {
  ReactIcon: "text-[#00d8ff]",
  JsIcon: "text-[#f7df1e]",
  TailwindIcon: "text-[#38bdf8]",
  FramerIcon: "text-[#bc00dd]",
  HtmlCssIcon: "text-[#e34f26]",
  TsIcon: "text-[#3178c6]",
  ReduxIcon: "text-[#764abc]",
  NodeIcon: "text-[#339933]",
  FirebaseIcon: "text-[#ffca28]",
  GitIcon: "text-[#f05032]",
  SocketIcon: "text-[#f1c40f]",
  ApiIcon: "text-[#3498db]",
  ViteIcon: "text-[#bd34fe]",
  FigmaIcon: "text-[#f24e1e]",
  ResponsiveIcon: "text-[#2ecc71]",
  WireframeIcon: "text-[#9b59b6]",
  FontIcon: "text-[#1abc9c]",
  SparklesIcon: "text-[#e67e22]",
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  const categories = [
    { id: "frontend", label: "Frontend Core" },
    { id: "backendTools", label: "Backend & Tools" },
    { id: "designUX", label: "Design & UX" }
  ];

  return (
    <section id="skills" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 blur-spotlight-emerald pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-accent-emerald" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-emerald">Expertise</span>
            <span className="h-[1px] w-8 bg-accent-emerald" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Technical & Creative <span className="text-glow-emerald">Stack</span>
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 rounded-2xl bg-dark-950/80 border border-dark-700/60 backdrop-blur-md shadow-inner">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-3 rounded-xl text-xs md:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-accent-cyan to-accent-emerald text-dark-950 shadow-cyan-glow" 
                      : "text-dark-500 hover:text-slate-200"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid with snappier CSS transitions */}
        <div className="min-h-[300px]">
          <div
            key={activeTab} // Resets DOM nodes on tab change, triggering a hardware-accelerated CSS fade-in
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-[pulse-glow_0.6s_ease-out_1] transition-all"
          >
            {skillsData[activeTab].map((skill) => {
              const colorClass = iconColors[skill.iconName] || "text-slate-100";
              return (
                <div
                  key={skill.name}
                  className="group glass-panel p-6 rounded-2xl flex items-center gap-5 relative overflow-hidden cursor-default transition-all duration-300 border-white/5 hover:border-accent-emerald/30 hover:-translate-y-1 shadow-md hover:shadow-emerald-glow/10"
                >
                  {/* Glowing hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 to-accent-emerald/0 group-hover:from-accent-cyan/[0.02] group-hover:to-accent-emerald/[0.03] transition-all duration-300 pointer-events-none" />

                  {/* Skill Icon */}
                  <div className="p-3.5 rounded-xl bg-dark-950/80 border border-dark-700/60 group-hover:border-accent-emerald/30 group-hover:scale-110 transition-all duration-300">
                    <SkillIcon name={skill.iconName} color={colorClass} />
                  </div>

                  {/* Skill Name */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-200 text-sm tracking-tight truncate group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-dark-500 group-hover:text-accent-emerald transition-colors">
                      Competent
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
