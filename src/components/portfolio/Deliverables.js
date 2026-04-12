"use client";
import React from "react";

/* --- ICONS --- */
const WebIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-fuchsia-500"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18M9 3v18" />
  </svg>
);

const ArchitectureIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-fuchsia-500"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const APIIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-fuchsia-500"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const DesignIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-fuchsia-500"
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
  </svg>
);

const MLIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-fuchsia-500"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const StrategyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-fuchsia-500"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const capabilities = [
  {
    title: "Web Development",
    desc: "Responsive full-stack applications with intuitive interfaces and efficient logic, delivering user-friendly and visually appealing solutions.",
    icon: <WebIcon />,
  },
  {
    title: "System Architecture",
    desc: "Scalable database design and optimization for complex queries and large datasets, ensuring secure and reliable data storage.",
    icon: <ArchitectureIcon />,
  },
  {
    title: "API Development",
    desc: "Robust RESTful APIs for seamless service communication and third-party integrations for payments and advanced functionalities.",
    icon: <APIIcon />,
  },
  {
    title: "UI/UX Design",
    desc: "User-centric designs prioritizing usability and aesthetics, creating seamless and engaging experiences for application users.",
    icon: <DesignIcon />,
  },
  {
    title: "Machine Learning",
    desc: "Implementing predictive models and intelligent algorithms to transform data into actionable insights and automated solutions.",
    icon: <MLIcon />,
  },
  {
    title: "Product Strategy",
    desc: "Bridging the gap between code and commerce by validating concepts and engineering solutions that solve genuine business challenges.",
    icon: <StrategyIcon />,
  },
];

export default function Capabilities() {
  return (
    <section className="bg-black py-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-fuchsia-600 font-bold text-xs uppercase tracking-[0.3em] mb-2">
            FEATURES
          </p>
          <h2 className="text-white text-5xl font-black uppercase tracking-tight">
            What I Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#0c0c0c] border border-zinc-900 rounded-2xl p-8 transition-all duration-300 hover:border-fuchsia-600/50 hover:-translate-y-1 overflow-hidden"
            >
              <div className="w-14 h-14 bg-zinc-900/50 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:bg-fuchsia-500/5 transition-colors">
                {item.icon}
              </div>

              {/* whitespace-nowrap removed to allow wrapping if necessary, or kept for strict one-line */}
              <h3 className="text-white text-lg md:text-xl font-black italic uppercase mb-4 tracking-tighter group-hover:text-fuchsia-500 transition-colors truncate">
                {item.title}
              </h3>

              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
