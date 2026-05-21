"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const MarqueeRow = ({ title, items, direction = "to-right", speed = 25 }) => {
  if (items.length === 0) return null;

  const displayItems = [...items, ...items, ...items];

  const getIconUrl = (iconName) => {
    const cleanName = iconName.toLowerCase().replace(".", "");
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanName}/${cleanName}-original.svg`;
  };

  return (
    <div className="mb-10">
      {/* Label */}
      <div className="px-10 mb-4">
        <h3 className="text-fuchsia-600/80 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
          {title}
        </h3>
      </div>

      {/* HORIZONTAL BOX - Increased width and added constant fuchsia glow */}
      <div className="px-4 md:px-6">
        <div
          className="
            relative overflow-hidden
            rounded-[32px]
            border border-fuchsia-500/20 
            py-8
            bg-gradient-to-b
            from-zinc-900/40
            to-black
            shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_15px_rgba(192,38,211,0.05)]
            transform-gpu
          "
        >
          {/* subtle depth inner border with fuchsia tint */}
          <div className="absolute inset-0 rounded-[32px] ring-1 ring-fuchsia-500/10" />

          {/* left fade with fuchsia hover-style glow at the edge */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black via-black/40 to-transparent border-l border-fuchsia-500/30" />

          {/* right fade with fuchsia hover-style glow at the edge */}
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black via-black/40 to-transparent border-r border-fuchsia-500/30" />

          {/* MOVING TRACK */}
          <motion.div
            className="flex w-max gap-6 px-6"
            animate={{
              x:
                direction === "to-right"
                  ? ["-66.666%", "0%"]
                  : ["0%", "-66.666%"],
            }}
            transition={{
              duration: speed,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {displayItems.map((tech, idx) => (
              <div
                key={`${tech.id}-${idx}`}
                className="
                  flex-shrink-0
                  w-20 h-20
                  min-w-[80px]
                  min-h-[80px]
                  rounded-2xl
                  bg-zinc-900/60
                  border border-zinc-800
                  flex flex-col items-center justify-center
                  transition-all duration-300
                  hover:border-fuchsia-500/60
                  hover:bg-zinc-800/80
                  hover:scale-105
                "
              >
                <div className="w-8 h-8 mb-1.5">
                  <img
                    src={getIconUrl(tech.icon)}
                    className="w-full h-full object-contain brightness-110"
                    alt={tech.name}
                    onError={(e) => {
                      e.target.src =
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                    }}
                  />
                </div>

                <span className="text-white font-bold text-[8px] uppercase text-center px-1">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllSkills(fetched);
    });

    return () => unsubscribe();
  }, []);

  const categories = [
    { label: "Frontend ", key: "Frontend", dir: "to-right", spd: 22 },
    {
      label: "Backend ",
      key: "Backend",
      dir: "to-left",
      spd: 28,
    },
    {
      label: "Database ",
      key: "Database",
      dir: "to-right",
      spd: 24,
    },

    { label: "AI & ML Engineering", key: "AI", dir: "to-left", spd: 32 },
    { label: "Developer Tools", key: "Tools", dir: "to-right", spd: 30 },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-black overflow-hidden border-t border-zinc-900"
    >
      {/* WHOLE PAGE CONTENT WRAPPED IN ONE BOX CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative bg-zinc-950/40 rounded-[40px] border border-zinc-800/50 p-8 md:p-12 shadow-2xl">
          {/* Header Section inside the Main Box */}
          <div className="mb-20">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-white leading-none">
              MY <span className="text-fuchsia-600">SKILLS</span>
            </h2>

            <p className="text-zinc-500 text-[11px] tracking-[0.5em] mt-4 uppercase font-mono font-bold flex items-center gap-3">
              <span className="text-fuchsia-600 text-xl">|</span>
              Technologies I Work With
            </p>
          </div>

          {/* Marquee Rows inside the Main Box */}
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <MarqueeRow
                key={cat.key}
                title={cat.label}
                direction={cat.dir}
                speed={cat.spd}
                items={allSkills.filter(
                  (s) => s.type?.toLowerCase() === cat.key.toLowerCase(),
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
