import React from "react";

// Helper for standard SVG layout
const svgProps = (size) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
});

export const Menu = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const X = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const ArrowUpRight = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
);

export const ArrowRight = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const Download = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

export const Mail = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const Phone = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const MapPin = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Send = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export const CheckCircle = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

export const AlertCircle = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const Loader2 = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={`animate-spin ${className}`}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const ArrowUp = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const Briefcase = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

export const Award = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <circle cx="12" cy="8" r="7" />
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
  </svg>
);

export const Compass = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export const Code = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
  </svg>
);

export const ExternalLink = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export const Atom = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <ellipse cx="12" cy="12" rx="3" ry="9" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(120 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(150 12 12)" />
  </svg>
);

export const Code2 = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
  </svg>
);

export const Terminal = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

export const Wind = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M12.8 19.6a3.4 3.4 0 0 0-3.4-3.4H2M17.2 14.8a2.8 2.8 0 0 0-2.8-2.8H2M20.8 10a2.2 2.2 0 0 0-2.2-2.2H2" />
  </svg>
);

export const Layers = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const Flame = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export const GitFork = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 15V9a4 4 0 0 0-4-4H9M6 9v6" />
  </svg>
);

export const Zap = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const Cpu = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M9 1v3M15 1v3M20 9h3M20 15h3M15 20v3M9 20v3M1 15h3M1 9h3" />
  </svg>
);

export const PenTool = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="m12 19 7-7 3 3-7 7-3-3Z" />
    <path d="m18 13-1.5-1.5L4 24h3l12.5-12.5L18 13Z" />
    <path d="m2 2 8 8M14 6l-4 4" />
  </svg>
);

export const Smartphone = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

export const Layout = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

export const Type = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" x2="15" y1="20" y2="20" />
    <line x1="12" x2="12" y1="4" y2="20" />
  </svg>
);

export const Sparkles = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export const Server = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

export const CloudLightning = ({ size = 24, className = "" }) => (
  <svg {...svgProps(size)} className={className}>
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 8.58" />
    <path d="m13 11-4 6h3v5l4-6h-3z" />
  </svg>
);
