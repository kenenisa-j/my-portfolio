"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

/* --- ICONS --- */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="26" width="26">
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
    height="26"
    width="26"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="bg-black h-screen" />;

  return (
    <section className="bg-black py-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p) => {
            const allTechs = p.techStack?.split(",") || [];
            const displayedTechs = allTechs.slice(0, 3);
            const extraCount = allTechs.length > 3 ? allTechs.length - 3 : 0;

            return (
              <div
                key={p.id}
                className="group relative flex flex-col p-[1px] rounded-[2.8rem] transition-all duration-500 hover:-translate-y-2"
              >
                {/* 1. SLIM MIXED COLOR BORDER (The Glow) */}
                <div
                  className="absolute inset-0 rounded-[2.8rem] border border-zinc-800 transition-all duration-500 
                  group-hover:border-transparent 
                  group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-fuchsia-600 
                  group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2),0_0_30px_rgba(192,38,211,0.2)]"
                />

                {/* 2. MAIN CARD CONTENT */}
                <div className="relative bg-[#0a0a0a] rounded-[2.75rem] p-5 h-full flex flex-col z-10">
                  {/* Image with mixed color tint on hover */}
                  <div className="relative aspect-[4/3] bg-[#1a1a1a] rounded-[2.2rem] overflow-hidden mb-6">
                    <img
                      src={
                        p.images?.split(",")[0] || "/api/placeholder/400/300"
                      }
                      className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                      alt={p.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-fuchsia-600/0 group-hover:from-orange-500/10 group-hover:to-fuchsia-600/10 transition-all duration-500" />
                  </div>

                  {/* Text and Actions */}
                  <div className="px-4 pb-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-xl font-black italic uppercase tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-fuchsia-400 transition-all">
                        {p.title}
                      </h3>

                      {/* Icons with Hover Fixed */}
                      <div className="flex gap-4 relative z-20">
                        <a
                          href={p.github || "#"}
                          target="_blank"
                          className="text-zinc-500 hover:text-orange-500 transition-all transform hover:scale-110"
                        >
                          <GithubIcon />
                        </a>
                        <a
                          href={p.liveDemo || "#"}
                          target="_blank"
                          className="text-zinc-500 hover:text-fuchsia-500 transition-all transform hover:scale-110"
                        >
                          <ExternalIcon />
                        </a>
                      </div>
                    </div>

                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                      {p.smallDescription}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {displayedTechs.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span className="text-[9px] text-fuchsia-500 font-black border border-fuchsia-500/20 px-2 py-1 rounded bg-fuchsia-500/5">
                          +{extraCount}
                        </span>
                      )}
                    </div>

                    {/* Footer Detail Link */}
                    <Link
                      href={`/projects/${p.slug}`}
                      className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all pt-4 border-t border-white/5"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500" />
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
