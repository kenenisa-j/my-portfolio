"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

/* --- ICONS --- */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="18"
    width="18"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 45, stiffness: 70 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        setProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleMouseMove = (e) => {
    // If the user is hovering over a card or if on mobile viewport, bypass slider animation frames
    if (!containerRef.current || isHovered || window.innerWidth < 768) return;
    const { innerWidth } = window;
    const xPercentage = e.clientX / innerWidth;

    const cardWidth = 420;
    const totalContentWidth = projects.length * cardWidth;
    const overflow = totalContentWidth - innerWidth + 150;

    if (overflow > 0) {
      mouseX.set(-(xPercentage * overflow));
    }
  };

  if (loading) return <div className="bg-black h-screen" />;

  return (
    <section
      className="bg-black py-20 min-h-screen overflow-x-hidden md:overflow-hidden flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-14 pointer-events-none">
        <h2 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter leading-none">
          FEATURED <span className="text-fuchsia-600">PROJECTS</span>
        </h2>
        <div className="flex items-center gap-3 mt-4">
          <div className="h-[1px] w-12 bg-fuchsia-600" />
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">
            {window.innerWidth < 768 ? "Swipe to explore" : "Hover to navigate"}
          </p>
        </div>
      </div>

      {/* Outer block changes to a native side-swipe flow for mobile screens */}
      <div className="relative w-full overflow-x-auto no-scrollbar md:overflow-visible px-6 md:px-0">
        <motion.div
          ref={containerRef}
          style={{ x: window.innerWidth >= 768 ? smoothX : 0 }}
          className="flex gap-6 md:gap-8 md:px-[10%] pb-6 md:pb-0"
        >
          {projects.map((p) => {
            const techs = p.techStack?.split(",") || [];

            // FIXED: Safe parsing to keep compressed base64 strings whole
            const rawImage = p.images || "";
            const resolvedImageSrc =
              typeof rawImage === "string" && rawImage.startsWith("data:image")
                ? rawImage // Keeps entire Base64 payload intact
                : typeof rawImage === "string" && rawImage.includes(",")
                  ? rawImage.split(",")[0] // Legacy structural split for explicit cloud storage URLs
                  : rawImage.trim() !== ""
                    ? rawImage
                    : "/api/placeholder/400/300";

            return (
              <div
                key={p.id}
                className="relative flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 rounded-[2.2rem] border border-zinc-900 transition-all duration-500 group-hover:border-fuchsia-600/40 group-hover:shadow-[0_0_30px_rgba(192,38,211,0.1)]" />

                <div className="relative bg-[#090909] rounded-[2.15rem] p-6 h-full flex flex-col z-10 border border-white/5">
                  <div className="relative aspect-[16/10] bg-[#121212] rounded-[1.6rem] overflow-hidden mb-6">
                    <img
                      src={resolvedImageSrc}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      alt={p.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/20 to-transparent" />
                  </div>

                  <div className="flex flex-col flex-grow px-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-lg md:text-xl font-black italic uppercase tracking-tighter group-hover:text-fuchsia-500 transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex gap-3">
                        <a
                          href={p.github || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 hover:text-white transition-all transform hover:scale-110"
                        >
                          <GithubIcon />
                        </a>
                        <a
                          href={p.liveDemo || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 hover:text-white transition-all transform hover:scale-110"
                        >
                          <ExternalIcon />
                        </a>
                      </div>
                    </div>

                    <p className="text-zinc-500 text-[12px] leading-relaxed mb-6 line-clamp-2">
                      {p.smallDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {techs.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${p.slug}`}
                      className="flex items-center gap-3 text-white/30 text-[9px] font-black uppercase tracking-[0.3em] hover:text-white transition-all pt-4 border-t border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600" />
                      View Case
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(192,38,211,0.02),transparent)] pointer-events-none" />
    </section>
  );
}
