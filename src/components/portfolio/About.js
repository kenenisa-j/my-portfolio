"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const journeyData = [
  {
    year: "2023",
    title: "The Foundation",
    description:
      "Joined Addis Ababa University. Learned programming fundamentals and started web basics with HTML, CSS, and JavaScript.",
    tags: ["AAU", "Python", "Logic"],
  },
  {
    year: "2024",
    title: "Web Development Focus",
    description:
      "Built frontend projects and developed backend systems. Created full-stack applications working with APIs and databases.",
    tags: ["React", "Node.js", "APIs"],
  },
  {
    year: "2025",
    title: "AI and Machine Learning",
    description:
      "Studied core ML concepts and built projects using real datasets. Worked on data analysis and automation systems while improving GitHub portfolio.",
    tags: ["ML", "Data Analysis", "Automation"],
  },
  {
    year: "2026",
    title: "Present Work",
    description:
      "Currently building AI-integrated systems and production-level applications focused on real-world problem solving and better system design.",
    tags: ["System Design", "AI Integration", "Full-Stack"],
    current: true,
  },
];

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 bg-black text-white px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* 🧠 THE VISION (ABOUT ME) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <h2 className="text-fuchsia-500 text-sm font-black uppercase tracking-[0.5em]">
                The Vision
              </h2>
            </div>

            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter leading-tight">
              Building practical AI systems that <br />
              <span className="text-zinc-500">solve real problems.</span>
            </h3>

            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed max-w-xl">
              <p>
                I’m{" "}
                <span className="text-white font-bold">Kenenisa Jaleto</span>,
                an ECE student
                <span className="text-fuchsia-500 font-medium">
                  {" "}
                  (Computer Engineering track){" "}
                </span>
                at Addis Ababa University. I focus on Full-Stack Development,
                AI, and Machine Learning.
              </p>
              <p>
                My approach is simple:{" "}
                <span className="text-white font-medium">
                  Learn fast. Build real projects. Improve through practice.
                </span>
              </p>
              <p className="text-white font-medium">I build and ship.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                <div className="flex items-center gap-2 italic">
                  <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full" />
                  Full-stack web applications
                </div>
                <div className="flex items-center gap-2 italic">
                  <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full" />
                  ML models using real data
                </div>
                <div className="flex items-center gap-2 italic">
                  <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full" />
                  Automation tools and APIs
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 border border-zinc-900 bg-zinc-950/50 rounded-2xl lg:mt-20"
          >
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-fuchsia-500" />
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
              The Long Game
            </h4>
            <p className="text-zinc-400 italic text-lg leading-relaxed">
              "Grow into an engineer who builds reliable AI systems that solve
              real-world problems."
            </p>
          </motion.div>
        </div>

        {/* 📈 THE JOURNEY */}
        <div className="relative pt-10">
          <div className="flex items-center justify-center gap-3 mb-20">
            <span className="text-3xl">📈</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center uppercase">
              Milestones
            </h2>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-zinc-900" />
            <motion.div
              style={{ scaleY }}
              className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-fuchsia-500 origin-top shadow-[0_0_15px_rgba(217,70,239,0.5)]"
            />

            {journeyData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative w-full flex flex-col md:flex-row items-center mb-20 ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 px-4 md:px-12">
                  <div className="p-8 border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm rounded-2xl hover:border-fuchsia-500/50 transition-all duration-500 group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-fuchsia-500 font-black text-xl tracking-tighter">
                        {item.current ? "🔥" : "🔹"}
                      </span>
                      <span className="text-fuchsia-500 font-black text-sm tracking-[0.3em] uppercase">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-zinc-500 leading-relaxed mb-6 text-sm md:text-base">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase rounded-md group-hover:border-fuchsia-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-fuchsia-500 z-10 shadow-[0_0_10px_rgba(217,70,239,0.8)]">
                  {item.current && (
                    <div className="absolute inset-[-4px] rounded-full border border-fuchsia-500 animate-ping opacity-40" />
                  )}
                </div>

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-sm mt-12 italic">
            “From learning basics to building real systems.”
          </p>
        </div>
      </div>
    </section>
  );
}
