"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

import DualTimeline from "./foundation/DualTimeline";
import Linguistics from "./Linguistics";
import DualCoreSystem from "./execution/DualCoreSystem";
import SystemSummary from "./SystemSummary";

export default function ResumeHeader() {
  const [activeTab, setActiveTab] = useState("education");
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const q = query(
          collection(db, "credentials"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        setCredentials(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      } catch (err) {
        console.error("Failed to load credentials:", err);
      }
    };

    fetchCredentials();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-12 overflow-x-hidden">
      {/* HERO */}
      <div className="mb-8 md:mb-14 text-center md:text-left flex flex-col items-center md:items-start">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[9px] md:text-[10px] text-fuchsia-500 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3"
        >
          Full Stack Developer • AI & ML Engineer
        </motion.p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter uppercase text-white leading-none">
          My Resume
        </h1>

        <p className="text-zinc-400 mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed px-2 md:px-0">
          A quick recap of my technical foundation, professional journey, and
          the lifestyle that fuels my drive for innovation.
        </p>

        <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-fuchsia-600 to-purple-600 mt-5 md:mt-6 rounded-full" />
      </div>

      {/* TABS - Optimized for clean touch-targets on Mobile */}
      <div className="flex justify-center mb-10 md:mb-16 px-1">
        <div className="flex w-full sm:w-auto p-1 bg-zinc-900/40 border border-zinc-800/80 rounded-xl backdrop-blur-xl gap-1">
          {["education", "experience"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 sm:min-w-[180px] md:min-w-[220px] px-3 md:px-6 py-3 rounded-lg text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black transition-all ${
                activeTab === tab
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="relative z-10">
                {tab === "education" ? "Education" : "Experience"}
              </span>

              {activeTab === tab && (
                <motion.div
                  layoutId="tabGlow"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* EDUCATION TAB */}
        {activeTab === "education" ? (
          <motion.section
            key="education"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-12 md:gap-20"
          >
            {/* Main Timelines Section (Education & Certifications stacked naturally) */}
            <div className="w-full token-timeline-wrapper">
              <DualTimeline credentials={credentials} />
            </div>

            {/* Languages Layout Separation */}
            <div className="w-full border-t border-zinc-900/50 pt-10 md:pt-16">
              <Linguistics />
            </div>

            {/* CTA */}
            <div className="mt-10 md:mt-14 flex flex-col items-center justify-center text-center border border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950/60 p-6 md:p-10 backdrop-blur-xl">
              <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">
                Want To Know More?
              </h3>

              <p className="text-zinc-500 mt-2 max-w-md text-xs md:text-sm px-2">
                Explore my projects and experience in more depth.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto px-2 sm:px-0">
                <a
                  href="/assets/Kenenisa_Jaleto_cv .pdf"
                  download="Kenenisa_Jaleto_Resume.pdf"
                  className="text-center px-6 py-3 rounded-xl bg-fuchsia-600 text-xs md:text-sm font-bold uppercase tracking-wider text-white hover:bg-fuchsia-500 transition-all shadow-lg shadow-fuchsia-600/10 active:scale-[0.98]"
                >
                  Download CV
                </a>

                <Link
                  href="/#contact"
                  className="text-center px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/20 text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-200 hover:border-fuchsia-500/50 hover:text-white transition-all active:scale-[0.98]"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </motion.section>
        ) : (
          /* EXPERIENCE TAB */
          <motion.section
            key="experience"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-12 md:gap-20"
          >
            {/* Core Experience Tracking */}
            <div className="w-full token-core-wrapper">
              <DualCoreSystem />
            </div>

            {/* System Summary / Beyond Coding */}
            <div className="w-full border-t border-zinc-900/50 pt-10 md:pt-16">
              <SystemSummary />
            </div>

            {/* CTA */}
            <div className="mt-10 md:mt-14 flex flex-col items-center justify-center text-center border border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950/60 p-6 md:p-10 backdrop-blur-xl">
              <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">
                Let’s Build Something Great
              </h3>

              <p className="text-zinc-500 mt-2 max-w-md text-xs md:text-sm px-2">
                Open to internships, freelance work, and development
                opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto px-2 sm:px-0">
                <a
                  href="/assets/Kenenisa_Jaleto_cv .pdf"
                  download="Kenenisa_Jaleto_Resume.pdf"
                  className="text-center px-6 py-3 rounded-xl bg-fuchsia-600 text-xs md:text-sm font-bold uppercase tracking-wider text-white hover:bg-fuchsia-500 transition-all shadow-lg shadow-fuchsia-600/10 active:scale-[0.98]"
                >
                  Download CV
                </a>

                <Link
                  href="/contact"
                  className="text-center px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/20 text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-200 hover:border-fuchsia-500/50 hover:text-white transition-all active:scale-[0.98]"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
