"use client";

import { useState, useEffect } from "react";
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* HERO */}
      <div className="mb-10 text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] text-fuchsia-500 font-bold uppercase tracking-[0.5em] mb-3"
        >
          Full Stack Developer • AI & ML Engineer
        </motion.p>

        <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase text-white leading-none">
          My Resume
        </h1>

        <p className="text-zinc-400 mt-4 max-w-2xl">
          A quick recap of my technical foundation, professional journey, and
          the lifestyle that fuels my drive for innovation.
        </p>

        <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-600 to-purple-600 mt-6 rounded-full" />
      </div>

      {/* TABS */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 bg-zinc-900/40 border border-zinc-800 rounded-xl backdrop-blur-xl">
          {["education", "experience"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative min-w-[220px] px-6 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
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
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>

            <DualTimeline credentials={credentials} />

            {/* Languages */}
            <div className="mt-16">
              <Linguistics />
            </div>

            {/* CTA */}
            <div className="mt-20 flex flex-col items-center justify-center text-center border border-zinc-800 rounded-[2rem] bg-zinc-950/60 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white uppercase">
                Want To Know More?
              </h3>

              <p className="text-zinc-400 mt-2 max-w-md">
                Explore my projects and experience in more depth.
              </p>

              <div className="flex gap-3 mt-6">
                <button className="px-5 py-2.5 rounded-xl bg-fuchsia-600 text-sm font-semibold text-white hover:bg-fuchsia-500 transition">
                  Download CV
                </button>

                <button className="px-5 py-2.5 rounded-xl border border-zinc-700 text-sm text-zinc-200 hover:border-fuchsia-500 transition">
                  Contact Me
                </button>
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
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>

            <DualCoreSystem />

            {/* System Summary (Lifestyle) */}
            <div className="mt-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>

              <SystemSummary />
            </div>

            {/* CTA */}
            <div className="mt-20 flex flex-col items-center text-center border border-zinc-800 rounded-[2rem] bg-zinc-950/60 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white uppercase">
                Let’s Build Something Great
              </h3>

              <p className="text-zinc-400 mt-2 max-w-md">
                Open to internships, freelance work, and development
                opportunities.
              </p>

              <div className="flex gap-3 mt-6">
                <button className="px-5 py-2.5 rounded-xl bg-fuchsia-600 text-sm font-semibold text-white hover:bg-fuchsia-500 transition">
                  Download CV
                </button>

                <button className="px-5 py-2.5 rounded-xl border border-zinc-700 text-sm text-zinc-200 hover:border-fuchsia-500 transition">
                  Contact Me
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
