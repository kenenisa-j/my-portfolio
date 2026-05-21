"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const impacts = [
  "Building Modern Web Applications",
  "Designing Scalable Systems",
  "Engineering AI-Powered Solutions",
  "Creating Digital Products",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const [siteVisuals, setSiteVisuals] = useState({
    profilePic: "/profile.jpg",
    heroBanner: "",
  });

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "site_settings", "appearance"),
      (doc) => {
        if (doc.exists()) {
          setSiteVisuals(doc.data());
        }
      },
      (error) => {
        // Suppresses the global Turbopack overlay for network/timeout errors
        console.warn(
          "Firestore background sync paused (working offline):",
          error.message,
        );
      },
    );
    return unsub;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % impacts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Handler for smooth scrolling to projects section
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="
        relative min-h-screen w-full flex items-center justify-center
        pt-32 pb-12 px-6 md:px-12 lg:px-16
        bg-black
        overflow-hidden
      "
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
        <div className="relative w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 order-2 lg:order-1">
          {/* SPOTLIGHT BEHIND HELLO */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-fuchsia-600/20 blur-[100px] rounded-full -z-10" />

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

            {/* SOCIAL ICONS */}
            <div className="flex justify-center lg:justify-start gap-4">
              {/* LinkedIn */}
              <SocialIcon
                href="https://www.linkedin.com/in/kenenisa-jaleto-751a26356?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
              />
              {/* GitHub */}
              <SocialIcon href="https://github.com/kenenisa-j" isGitHub />
              {/* X (Twitter) */}
              <SocialIcon
                href="https://x.com/Kenenisa_j"
                d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"
              />
              {/* WhatsApp Icon */}
              <SocialIcon href="https://wa.me/251935689535" isWhatsApp />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToProjects}
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <span className="relative z-10 text-[11px] tracking-[0.3em] uppercase group-hover:text-white transition">
                  View Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D05] to-[#D946EF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* DOWNLOAD CV BUTTON */}
              <a
                href="/assets/Kenenisa_Jaleto_cv .pdf"
                download="Kenenisa_CV.pdf"
                className="
                  block text-center px-10 py-5 rounded-xl font-bold
                  border border-zinc-700 text-zinc-300
                  hover:border-fuchsia-500 hover:text-white
                  hover:bg-fuchsia-500/10
                  transition-all duration-300
                  hover:scale-105 active:scale-95
                  text-[11px] tracking-[0.3em] uppercase
                "
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-[40%] flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative group">
            {/* SPOTLIGHT BEHIND PHOTO */}
            <div className="absolute inset-0 bg-purple-600/20 blur-[120px] rounded-full -z-10" />

            <div className="absolute inset-[-12px] rounded-full bg-gradient-to-tr from-[#FF4D05]/10 to-[#D946EF]/10 blur-2xl group-hover:from-[#FF4D05]/25 group-hover:to-[#D946EF]/25 transition-all duration-700" />

            <div className="absolute inset-[-12px] border border-zinc-800 rounded-full animate-[spin_60s_linear_infinite] opacity-30" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full border-[10px] border-zinc-900 overflow-hidden bg-zinc-900 shadow-2xl transition-all duration-700">
              <img
                src={siteVisuals.profilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-700 saturate-125 group-hover:grayscale group-hover:brightness-75 scale-100 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SOCIAL ICON */
function SocialIcon({ d, href, isGitHub = false, isWhatsApp = false, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="
        w-14 h-14 flex items-center justify-center
        border border-zinc-800 bg-zinc-950/50 rounded-xl
        text-zinc-400
        hover:border-fuchsia-500 hover:text-fuchsia-400
        transition-all duration-300 shadow-lg
      "
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
        {isGitHub ? (
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        ) : isWhatsApp ? (
          <>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            <path d="M9.5 9.5c.3.6.8 1.4 1.4 2s1.4 1.1 2 1.4c.3.1.5-.1.7-.3l.4-.5c.2-.3.6-.3.9-.1l1.6 1.3.3.2.3.6.1.9l-.5.6c-.4.5-1.1.7-1.7.4-1.2-.5-2.3-1.3-3.2-2.2S9.7 10.7 9.2 9.5c-.3-.6-.1-1.3.4-1.7l.6-.5c.3-.2.7-.2.9.1l1 1.6c.2.3.2.7-.1.9l-.5.4c-.2.2-.4.4-.3.7z" />
          </>
        ) : (
          <path d={d} />
        )}
      </svg>
    </a>
  );
}
