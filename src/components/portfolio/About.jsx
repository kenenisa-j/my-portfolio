"use client";

import {
  motion,
  useScroll,
  useSpring,
  animate,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiCalendar, FiTarget, FiBriefcase, FiCpu } from "react-icons/fi";
// Fixed the firestore import path from your error screenshot
import { doc, onSnapshot } from "firebase/firestore";

const Counter = ({ to, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    } else {
      setCount(0);
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const journeyData = [
  {
    year: "2023",
    title: "The Foundation",
    description:
      "Joined Addis Ababa University. Mastered core programming logic and hardware-software synergy.",
    tags: ["AAU", "Python", "Logic"],
  },
  {
    year: "2024",
    title: "Web Development Focus",
    description:
      "Built frontend projects and secure backend systems using React and Firebase.",
    tags: ["Next.js", "Firebase", "APIs"],
  },
  {
    year: "2025",
    title: "AI and Machine Learning",
    description:
      "Studied core ML concepts and built projects using real datasets and automation.",
    tags: ["ML", "Data Analysis", "Automation"],
  },
  {
    year: "2026",
    title: "Present Work",
    description:
      "Currently building AI-integrated systems and production-level applications.",
    tags: ["RSA", "AI Integration", "Full-Stack"],
    current: true,
  },
];

const stats = [
  {
    label: "Years of experience",
    value: 3,
    icon: <FiCalendar className="text-fuchsia-500 text-2xl" />,
  },
  {
    label: "Projects completed",
    value: 15,
    icon: <FiTarget className="text-fuchsia-500 text-2xl" />,
  },
  {
    label: "Internships",
    value: 3,
    icon: <FiBriefcase className="text-fuchsia-500 text-2xl" />,
  },
  {
    label: "Technologies Mastered",
    value: 14,
    icon: <FiCpu className="text-fuchsia-500 text-2xl" />,
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
      className="py-24 bg-black text-white px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto z-10 relative">
        {/* SECTION 1: ABOUT ME HEADER & TEXT */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                2. About <span className="text-fuchsia-600">Me</span>
              </h2>
              <div className="h-[2px] flex-grow bg-zinc-900" />
            </div>

            <div className="max-w-4xl space-y-8">
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                I am{" "}
                <span className="text-fuchsia-600 font-black">
                  Kenenisa Jaleto
                </span>
                , a Full Stack Developer and aspiring AI Engineer focused on
                building scalable web applications and intelligent systems.
              </p>

              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                I am a third-year Electrical and Computer Engineering student at
                Addis Ababa University, where I bridge the gap between hardware
                and software to solve complex problems. My expertise lies in
                Full Stack Development and AI systems, utilizing Generative AI
                and Machine Learning to build production-ready software
                architecture.
              </p>

              <div className="p-6 bg-zinc-950 border-l-4 border-fuchsia-600">
                <p className="text-white font-bold italic text-xl md:text-2xl">
                  "My goal is to engineer intelligent systems that solve
                  industrial and national problems."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: MY JOURNEY IN NUMBERS */}
        <div className="mb-44">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-6 bg-gradient-to-b from-fuchsia-500 to-purple-600 rounded-full" />
            <h3 className="text-xl font-bold tracking-tight uppercase">
              My Journey in Numbers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-2xl flex flex-col gap-4 hover:border-fuchsia-500/30 transition-all duration-300 group"
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-5xl font-black italic tracking-tighter">
                    <Counter to={stat.value} />+
                  </h4>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 3: MILESTONES (TIMELINE) */}
        <div className="relative pt-10">
          <div className="flex flex-col items-center mb-24">
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">
              Milestones
            </h3>
            <div className="h-1 w-20 bg-fuchsia-600 mt-4" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Timeline Progress Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-zinc-900" />
            <motion.div
              style={{ scaleY }}
              className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-fuchsia-600 origin-top"
            />

            {journeyData.map((item, idx) => (
              <motion.div
                key={idx}
                className={`relative w-full flex flex-col md:flex-row items-center mb-28 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="w-full md:w-1/2 px-4 md:px-16">
                  <div className="p-10 border border-zinc-900 bg-zinc-950/40 rounded-xl group hover:border-fuchsia-600/20 transition-all">
                    <span className="text-fuchsia-500 font-black text-xs tracking-[0.4em] mb-4 block uppercase">
                      [{item.year}]
                    </span>
                    <h5 className="text-2xl font-bold text-white mb-4 uppercase italic transition-all group-hover:text-fuchsia-400">
                      {item.title}
                    </h5>
                    <p className="text-zinc-500 text-base leading-relaxed mb-6 font-medium">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-zinc-900 text-zinc-500 text-[10px] font-black uppercase rounded border border-zinc-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-fuchsia-600 rotate-45 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
