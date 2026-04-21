"use client";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BookOpen, Dumbbell, Trophy, Code, Zap } from "lucide-react";

// Unified Component: Text sizes increased
// Unified Component: Now includes word breaking
const GlowCard = ({ title, subtitle, description, company, icon: Icon }) => (
  <div className="relative group w-full h-full">
    {/* Glow Effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"></div>

    {/* Card Container */}
    <div className="relative bg-[#050505] border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4 h-full min-h-[250px]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shrink-0">
          <Icon size={20} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">
            {title}
          </h3>
          {company && (
            <p className="text-xs text-purple-400 font-mono uppercase tracking-widest mt-1">
              {company}
            </p>
          )}
        </div>
      </div>

      {/* ✅ FIX APPLIED HERE: added "break-words" */}
      <p className="text-sm text-zinc-400 leading-relaxed flex-grow break-words">
        {description}
      </p>

      <div className="pt-2">
        <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest border border-zinc-800 px-4 py-1.5 rounded-full">
          {subtitle}
        </span>
      </div>
    </div>
  </div>
);

export default function DualCoreSystem() {
  const [logs, setLogs] = useState([]);

  const lifestyle = [
    {
      title: "Coding",
      subtitle: "Build",
      description:
        "Continuously architecting web solutions and refining full-stack development workflows to turn complex ideas into functional realities.",
      icon: Code,
    },
    {
      title: "Books",
      subtitle: "Learn",
      description:
        "Engaging with deep-dive literature to expand mental models, improve productivity, and maintain a growth-oriented mindset.",
      icon: BookOpen,
    },
    {
      title: "Gym",
      subtitle: "Discipline",
      description:
        "Maintaining physical resilience and cognitive sharpness through consistent, high-intensity training and disciplined recovery.",
      icon: Dumbbell,
    },
    {
      title: "Football",
      subtitle: "Fun",
      description:
        "Observing high-stakes tactical dynamics and finding balance through the strategic and physical nature of the game.",
      icon: Trophy,
    },
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      const q = query(
        collection(db, "experience"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      setLogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchLogs();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* 🔵 LIFESTYLE */}
        <div className="flex flex-col gap-8">
          <h2 className="text-purple-500 text-lg font-bold uppercase tracking-widest">
            Lifestyle_Input
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {lifestyle.map((item, i) => (
              <GlowCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* 🟣 EXPERIENCE */}
        <div className="flex flex-col gap-8">
          <h2 className="text-purple-500 text-lg font-bold uppercase tracking-widest">
            Experience_Output
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {logs.map((log) => (
              <GlowCard
                key={log.id}
                title={log.role}
                company={log.company}
                subtitle={log.duration}
                description={log.impact}
                icon={Zap}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
