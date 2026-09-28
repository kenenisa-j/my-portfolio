"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

/* --- ICONS --- */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="18" width="18">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
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

  /* sync dot indicator to scroll position */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.firstElementChild?.offsetWidth || 420;
      const gap = 32;
      const i = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [projects]);

  const scrollTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.offsetWidth || 420;
    const gap = 32;
    el.scrollTo({ left: i * (cardWidth + gap), behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(projects.length - 1, activeIndex + 1));

  /* drag-to-scroll */
  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };
  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  };
  const onPointerUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  if (loading) return <div className="bg-black h-screen" />;

  return (
    <section className="bg-black py-24">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(192,38,211,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tighter leading-none">
              FEATURED <span className="text-fuchsia-600">PROJECTS</span>
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-[1px] w-12 bg-fuchsia-600" />
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">Selected Work</p>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <span className="text-zinc-600 text-[11px] uppercase tracking-widest font-bold mr-2 hidden sm:block">
              {activeIndex + 1} / {projects.length}
            </span>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-fuchsia-600/60 hover:shadow-[0_0_20px_rgba(192,38,211,0.25)] transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              disabled={activeIndex >= projects.length - 1}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-fuchsia-600/60 hover:shadow-[0_0_20px_rgba(192,38,211,0.25)] transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>

        {/* Scroll track — no overflow-hidden, uses native scroll with hidden scrollbar */}
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="flex gap-8 pb-4 select-none"
          style={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {projects.map((p, i) => {
            const techs = p.techStack?.split(",") || [];
            const rawImage = p.images || "";
            const resolvedImageSrc =
              typeof rawImage === "string" && rawImage.startsWith("data:image")
                ? rawImage
                : typeof rawImage === "string" && rawImage.includes(",")
                  ? rawImage.split(",")[0]
                  : rawImage.trim() !== ""
                    ? rawImage
                    : "/api/placeholder/400/300";

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative group flex-shrink-0 w-[300px] sm:w-[360px] md:w-[410px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="absolute inset-0 rounded-[2.2rem] border border-zinc-900 transition-all duration-500 group-hover:border-fuchsia-600/40 group-hover:shadow-[0_0_50px_rgba(192,38,211,0.14)]" />

                <div className="relative bg-[#090909] rounded-[2.15rem] p-6 h-full flex flex-col z-10 border border-white/5">
                  <a
                    href={p.liveDemo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative block aspect-[16/9.5] w-full bg-[#121212] rounded-[1.6rem] overflow-hidden mb-6 border border-white/5 cursor-pointer"
                  >
                    <img
                      src={resolvedImageSrc}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      alt={p.title}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest whitespace-nowrap">Live Deploy</span>
                    </div>
                  </a>

                  <div className="flex flex-col flex-grow px-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-lg md:text-xl font-black italic uppercase tracking-tighter group-hover:text-fuchsia-500 transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex gap-3">
                        <a href={p.github || "#"} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-600 hover:text-white transition-all transform hover:scale-110">
                          <GithubIcon />
                        </a>
                        <a href={p.liveDemo || "#"} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-600 hover:text-white transition-all transform hover:scale-110">
                          <ExternalIcon />
                        </a>
                      </div>
                    </div>

                    <p className="text-zinc-500 text-[12px] leading-relaxed mb-6 line-clamp-2">{p.smallDescription}</p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {techs.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${p.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-3 text-white/30 text-[9px] font-black uppercase tracking-[0.3em] hover:text-white transition-all pt-4 border-t border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600" />
                      View Case
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        {projects.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-fuchsia-600" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
