"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Ensure path matches your firebase config
import { doc, onSnapshot } from "firebase/firestore";

const impacts = [
  "Building Scalable Web Apps",
  "Engineering AI Automation",
  "Designing Circuit Systems",
  "Developing Future Robotics",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  // State for dynamic visual settings
  const [siteVisuals, setSiteVisuals] = useState({
    profilePic: "/profile.jpg",
    heroBanner: "",
  });

  // 1. Fetch Real-time Banner/Profile Settings
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site_settings", "appearance"), (doc) => {
      if (doc.exists()) {
        setSiteVisuals(doc.data());
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % impacts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-12 px-6 md:px-12 lg:px-16 bg-black overflow-hidden"
    >
      {/* 2. DYNAMIC BACKGROUND BANNER */}
      {siteVisuals.heroBanner && (
        <div className="absolute inset-0 z-0">
          <img
            src={siteVisuals.heroBanner}
            className="w-full h-full object-cover opacity-20 blur-sm"
            alt="Banner background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="hidden lg:block h-[3px] w-12 bg-fuchsia-600 rounded-full"></span>
            <h2 className="text-fuchsia-500 text-sm md:text-base font-black uppercase tracking-[0.5em]">
              Hello 👋
            </h2>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
            I'm{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              Kenenisa
            </span>
          </h1>

          <div className="h-10 md:h-12 overflow-hidden mb-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={impacts[index]}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white"
              >
                {impacts[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-8 pt-4">
            <p className="text-zinc-500 italic text-lg md:text-xl leading-snug tracking-tight max-w-[280px]">
              "Have a vision? <br /> Let’s engineer it."
            </p>

            <div className="flex justify-center lg:justify-start gap-4">
              <SocialIcon d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              <SocialIcon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
              <SocialIcon d="M22 2L11 13 M22 2l-7 20-4-9-9-4 22-7z" />
              <SocialIcon isInstagram />
            </div>

            <button className="group relative w-full sm:w-auto px-12 py-5 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
              <span className="relative z-10 text-[11px] tracking-[0.3em] font-black uppercase group-hover:text-white transition-colors duration-300">
                VIEW MY PROJECTS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D05] to-[#D946EF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT - DYNAMIC PHOTO CONTAINER */}
        <div className="w-full lg:w-[40%] flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative group">
            <div className="absolute inset-[-12px] rounded-full bg-gradient-to-tr from-[#FF4D05]/10 to-[#D946EF]/10 blur-2xl group-hover:from-[#FF4D05]/20 group-hover:to-[#D946EF]/20 transition-all duration-700" />
            <div className="absolute inset-[-12px] border border-zinc-800 rounded-full animate-[spin_60s_linear_infinite] opacity-30" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full border-[10px] border-zinc-900 overflow-hidden bg-zinc-900 shadow-2xl transition-all duration-700">
              {/* 3. DYNAMIC PROFILE PHOTO */}
              <img
                src={siteVisuals.profilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-700 saturate-125 grayscale-0 group-hover:grayscale group-hover:brightness-75 scale-100 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ d, isInstagram = false }) {
  return (
    <a
      href="#"
      className="w-14 h-14 flex items-center justify-center border border-zinc-800 bg-zinc-950/50 rounded-xl text-zinc-400 hover:border-[#FF4D05] hover:text-white transition-all duration-300 shadow-lg"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isInstagram ? (
          <>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </>
        ) : (
          <path d={d}></path>
        )}
      </svg>
    </a>
  );
}
