"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import DualTimeline from "./foundation/DualTimeline";
import Linguistics from "./Linguistics";
import QuantifiedSkills from "./execution/QuantifiedSkills";
import DualCoreSystem from "./execution/DualCoreSystem";
import SystemSummary from "./SystemSummary"; // 1. Import the new component

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
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
      } catch (err) {
        console.error("Failed to load credentials:", err);
      }
    };
    fetchCredentials();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Title Section */}
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

      {/* Cyber-Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 bg-zinc-900/40 border border-zinc-800/50 rounded-xl backdrop-blur-xl shadow-2xl">
          {["education", "professional"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex items-center justify-center min-w-[200px] md:min-w-[240px] px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg ${activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <span className="relative z-10">
                {tab === "education"
                  ? "Education & Credentials"
                  : "Skills & Experience"}
              </span>
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabGlow"
                  className={`absolute inset-0 rounded-lg -z-0 ${tab === "education" ? "bg-fuchsia-600 shadow-[0_0_20px_rgba(217,70,239,0.4)]" : "bg-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.4)]"}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Stream */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "education" ? (
            <motion.section
              key="edu-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-500 whitespace-nowrap">
                  01. Foundation // Credentials
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>
              <DualTimeline credentials={credentials} />
              <div className="mt-12">
                <Linguistics />
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="prof-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-12">
                <QuantifiedSkills />
              </div>

              <div className="mt-8">
                <DualCoreSystem />
              </div>

              {/* 2. Added SystemSummary below Experience & Hobby */}
              <div className="mt-20">
                <SystemSummary />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
