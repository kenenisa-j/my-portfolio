"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BookOpen, Dumbbell, Trophy, Code, Zap } from "lucide-react";

const GlowCard = ({ title, subtitle, description, company, icon: Icon }) => (
  <div className="relative group w-full h-full">
    {/* Glow */}
    <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-purple-600 to-fuchsia-600 blur opacity-20 transition duration-500 group-hover:opacity-40" />

    {/* Card */}
    <div className="relative flex h-full min-h-[240px] flex-col gap-5 rounded-[2rem] border border-zinc-800 bg-[#050505] p-8 transition-all duration-300 group-hover:border-zinc-700">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
          <Icon size={22} className="text-purple-400" />
        </div>

        <div>
          <h3 className="text-xl font-bold leading-tight text-white">
            {title}
          </h3>

          {company && (
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-purple-400">
              {company}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="flex-grow break-words text-sm leading-7 text-zinc-400">
        {description}
      </p>

      {/* Tag */}
      <div className="pt-2">
        <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
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
      subtitle: "Building",
      description:
        "I enjoy coding because I like building things, solving problems, and turning ideas into something real that people can use.",
      icon: Code,
    },
    {
      title: "Reading",
      subtitle: "Learning",
      description:
        "I enjoy reading because it helps me learn new things, improve how I think, and understand different ideas about technology and personal growth.",
      icon: BookOpen,
    },
    {
      title: "Gym",
      subtitle: "Consistency",
      description:
        "Going to the gym helps me stay disciplined, active, and focused. It also helps me clear my mind and stay consistent.",
      icon: Dumbbell,
    },
    {
      title: "Football",
      subtitle: "Balance",
      description:
        "I enjoy football because it helps me relax, stay active, and enjoy teamwork and competition outside of coding.",
      icon: Trophy,
    },
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(
          collection(db, "experience"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        setLogs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      } catch (err) {
        console.error("Failed to load experience:", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="grid gap-20 lg:grid-cols-2">
        {/* BEYOND CODING SECTION */}
        <div className="flex flex-col gap-10">
          <div className="group/title cursor-default">
            <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 font-bold block mb-1">
              Personal Interests
            </span>
            <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter">
              Beyond Coding
            </h2>
            <p className="text-sm text-zinc-400 mt-3 font-medium">
              Exploring my life outside of the screen.
            </p>
            <div className="h-[2px] w-0 bg-fuchsia-600 group-hover/title:w-full transition-all duration-500 mt-2" />
          </div>

          <div className="grid grid-cols-1 gap-8">
            {lifestyle.map((item, i) => (
              <GlowCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="flex flex-col gap-10">
          <div className="group/title cursor-default">
            <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 font-bold block mb-1">
              The Professional Path
            </span>
            <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter">
              Experience
            </h2>
            <p className="text-sm text-zinc-400 mt-3 font-medium">
              A quick recap of the journey so far.
            </p>
            <div className="h-[2px] w-0 bg-purple-600 group-hover/title:w-full transition-all duration-500 mt-2" />
          </div>

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
