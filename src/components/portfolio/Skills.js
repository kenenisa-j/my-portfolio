"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const techStack = [
  {
    name: "Python",
    icon: "python",
    type: "Backend Development",
    level: 95,
    color: "#3776AB",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    type: "Frontend Framework",
    level: 98,
    color: "#ffffff",
  },
  {
    name: "Node.js",
    icon: "nodejs",
    type: "Server-side Dev",
    level: 88,
    color: "#339933",
  },
  {
    name: "React",
    icon: "react",
    type: "UI Library",
    level: 92,
    color: "#61DAFB",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    type: "Database Management",
    level: 85,
    color: "#47A248",
  },
  {
    name: "MySQL",
    icon: "mysql",
    type: "Database Management",
    level: 82,
    color: "#4479A1",
  },
  {
    name: "Firebase",
    icon: "firebase",
    type: "Cloud Services",
    level: 89,
    color: "#FFCA28",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    type: "Core Programming",
    level: 96,
    color: "#F7DF1E",
  },
];

export default function Skills() {
  const [active, setActive] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frameId;
    const animate = () => {
      setRotation((prev) => prev + 0.15);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#020202] py-32 overflow-hidden border-b border-zinc-900/50"
    >
      {/* Background Glow to define section space */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.02)_0%,transparent_70%)] pointer-events-none" />

      {/* 1. HEADER */}
      <div className="relative z-[60] text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter italic"
        >
          My Skills
        </motion.h2>
        <p className="text-zinc-500 text-xs tracking-[0.4em] mt-4 uppercase font-mono">
          Technologies I Work With
        </p>
      </div>

      {/* 2. THE SYSTEM: Fixed height container to prevent overflow into Projects */}
      <div className="relative w-full h-[600px] flex items-center justify-center">
        {/* CENTRAL CORE */}
        <div className="relative z-50">
          <motion.div
            animate={{
              scale: active ? 1.05 : 1,
              boxShadow: active
                ? `0 0 60px ${active.color}20`
                : "0 0 20px rgba(255,255,255,0.02)",
            }}
            className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-zinc-800/40 bg-black/90 flex items-center justify-center relative backdrop-blur-3xl"
          >
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center p-4 text-center"
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${active.icon}/${active.icon}-original.svg`}
                    className="w-14 h-14 mb-3"
                    alt=""
                    style={{
                      filter: active.name === "Next.js" ? "invert(1)" : "",
                    }}
                  />
                  <h3 className="text-white text-lg font-black uppercase tracking-tight">
                    {active.name}
                  </h3>
                </motion.div>
              ) : (
                <div className="text-center opacity-40">
                  <p className="text-zinc-500 text-[10px] tracking-[0.3em] font-mono uppercase italic">
                    Select Tech
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ORBITAL NODES */}
        {techStack.map((tech, i) => {
          const total = techStack.length;
          const angle = (i / total) * 2 * Math.PI + (rotation * Math.PI) / 180;

          // Controlled radius to keep everything inside the h-[600px] container
          const radius =
            typeof window !== "undefined" && window.innerWidth < 768
              ? 140
              : 280;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={tech.name}
              className="absolute z-40"
              animate={{ x, y }}
              transition={{ type: "tween", ease: "linear", duration: 0 }}
            >
              <div
                onMouseEnter={() => setActive(tech)}
                onMouseLeave={() => setActive(null)}
                className={`relative cursor-pointer p-5 rounded-2xl border transition-all duration-500 ${
                  active?.name === tech.name
                    ? "border-fuchsia-500 bg-fuchsia-500/10 scale-125 z-50"
                    : "border-zinc-900 bg-black opacity-30 hover:opacity-100 hover:border-zinc-700"
                }`}
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                  className="w-8 h-8 md:w-11 md:h-11"
                  alt={tech.name}
                  style={{ filter: tech.name === "Next.js" ? "invert(1)" : "" }}
                />

                {/* CONNECTION LINE */}
                {active?.name === tech.name && (
                  <motion.div
                    layoutId="core-link"
                    className="absolute h-[1.5px] bg-gradient-to-r from-fuchsia-500 to-transparent z-[-1]"
                    style={{
                      width: `${radius}px`,
                      left: "50%",
                      top: "50%",
                      originX: 0,
                      transform: `rotate(${angle + Math.PI}rad) translateY(-50%)`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. INFO HUD: Positioned with safe bottom margin */}
      <div className="relative z-[60] h-24 mt-12 mb-10">
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-zinc-950/90 border border-zinc-800/60 backdrop-blur-xl px-10 py-5 rounded-3xl flex items-center gap-12"
            >
              <div>
                <p className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] mb-1 font-mono">
                  Expertise
                </p>
                <p className="text-white text-sm font-bold italic tracking-wide">
                  {active.type}
                </p>
              </div>
              <div className="h-10 w-[1px] bg-zinc-800" />
              <div>
                <p className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] mb-1 font-mono">
                  Proficiency
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${active.level}%` }}
                      className="h-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"
                    />
                  </div>
                  <span className="text-fuchsia-500 font-mono text-xs font-black">
                    {active.level}%
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
