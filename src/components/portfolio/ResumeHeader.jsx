"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DualTimeline from "./foundation/DualCore";

export default function ResumeHeader() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    /* REDUCED PADDING: Changed py-16 to py-8 to bring the whole section up */
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* 1. Refined Title Section - REDUCED MARGIN: mb-12 to mb-8 */}
      <div className="mb-8 text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] text-fuchsia-500 font-bold uppercase tracking-[0.5em] mb-3"
        >
          3+ YEARS OF EXPERIENCE
        </motion.p>
        <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase text-white leading-none">
          My Resume
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-600 to-purple-600 mt-6 mx-auto lg:ml-1 rounded-full opacity-80" />
      </div>

      {/* 2. Compact Cyber-Toggle - REDUCED MARGIN: mb-16 to mb-10 */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 bg-zinc-900/40 border border-zinc-800/50 rounded-xl backdrop-blur-xl shadow-2xl">
          {["education", "professional"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              /* CENTERED & BALANCED: Fixed min-width ensures both buttons look identical */
              className={`relative flex items-center justify-center min-w-[200px] md:min-w-[240px] px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg ${
                activeTab === tab
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="relative z-10 text-center w-full">
                {tab === "education"
                  ? "Education & Credentials"
                  : "Skills & Experience"}
              </span>

              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabGlow"
                  className={`absolute inset-0 rounded-lg -z-0 ${
                    tab === "education"
                      ? "bg-fuchsia-600 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                      : "bg-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  }`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Content Stream - REMOVED min-h-[600px] to let cards sit naturally closer */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "education" ? (
            <motion.section
              key="edu-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Foundation Header - REDUCED MARGIN: mb-12 to mb-8 */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-500 whitespace-nowrap">
                  01. Foundation // Credentials
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>

              <DualTimeline />

              {/* Linguistics Card - REDUCED TOP MARGIN: mt-12 to mt-8 */}
              <div className="mt-8 group p-8 border border-zinc-900 bg-zinc-950/50 rounded-[2rem] hover:border-fuchsia-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-fuchsia-500 font-black">
                    Linguistics_Module
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                  Processing high-level communication protocols and
                  multi-language infrastructure for global deployment.
                </p>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="prof-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-500 whitespace-nowrap">
                  02. Execution // Skills
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border border-zinc-900 bg-zinc-950/50 rounded-[2rem]">
                  <span className="text-[10px] uppercase tracking-widest text-purple-500 font-black block mb-4">
                    What_I_Bring
                  </span>
                  <p className="text-zinc-300 text-lg font-semibold leading-snug">
                    Full-Stack Engineering & <br />
                    <span className="text-white">AI Automation Expertise.</span>
                  </p>
                </div>

                <div className="p-8 border border-zinc-900 bg-zinc-950/50 rounded-[2rem] border-dashed flex items-center justify-center min-h-[160px]">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                    Awaiting_Experience_Data...
                  </span>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
