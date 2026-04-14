"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DualTimeline from "./foundation/DualCore"; // Your Academic Core component

export default function ResumeHeader() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      {/* 1. Title Header */}
      <div className="mb-20 text-center lg:text-left">
        <p className="text-[10px] text-fuchsia-500 font-black uppercase tracking-[0.5em] mb-4">
          3+ YEARS OF EXPERIENCE
        </p>
        <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
          My Resume
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-fuchsia-600 to-purple-600 mt-8 mx-auto lg:ml-2 rounded-full" />
      </div>

      {/* 2. Toggle Switch */}
      <div className="flex justify-center mb-24">
        <div className="inline-flex p-1 bg-[#0d0d0f] border border-zinc-900 rounded-2xl shadow-2xl relative overflow-hidden">
          <button
            onClick={() => setActiveTab("education")}
            className={`relative z-10 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-500 rounded-xl ${
              activeTab === "education"
                ? "text-white"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Education & Credentials
            {activeTab === "education" && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-fuchsia-600/20 border border-fuchsia-500/50 rounded-xl -z-10 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("professional")}
            className={`relative z-10 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-500 rounded-xl ${
              activeTab === "professional"
                ? "text-white"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Skills & Experience
            {activeTab === "professional" && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-purple-600/20 border border-purple-500/50 rounded-xl -z-10 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              />
            )}
          </button>
        </div>
      </div>

      {/* 3. Dynamic Content Stream */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "education" ? (
            <motion.section
              key="edu-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-500 italic">
                  01. Foundation // Credentials & Linguistics
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>

              {/* Your Academic Core & Credentials logic here */}
              <DualTimeline />

              {/* LINGUISTICS MODULE (Placeholder for your specific logic) */}
              <div className="mt-20 p-10 border border-zinc-900 bg-[#08080a] rounded-[2.5rem]">
                <span className="text-[10px] uppercase tracking-widest text-fuchsia-500 font-bold">
                  Linguistics_Module
                </span>
                <p className="text-zinc-500 text-sm mt-4 italic">
                  Processing multi-language communication infrastructure...
                </p>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="prof-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 italic">
                  02. Execution // Skills & Experience
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>

              {/* WHAT I BRING / EXPERIENCE MODULES */}
              <div className="grid grid-cols-1 gap-12">
                <div className="p-10 border border-zinc-900 bg-[#08080a] rounded-[2.5rem]">
                  <span className="text-[10px] uppercase tracking-widest text-purple-500 font-bold">
                    What_I_Bring
                  </span>
                  <p className="text-zinc-400 text-lg mt-6 font-medium">
                    Full-Stack Engineering & AI Automation Expertise.
                  </p>
                </div>

                <div className="p-10 border border-zinc-900 bg-[#08080a] rounded-[2.5rem] border-dashed opacity-50 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-700">
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
