"use client";
import { useResume } from "../../../context/ResumeContext";
import { Cpu, Terminal, Zap } from "lucide-react";

export default function DualCore() {
  const { education } = useResume();

  // Sorting: Present/Ongoing at the top
  const sortedEdu = [...education].sort((a, b) => {
    if (a.yearEnd === "Present") return -1;
    if (b.yearEnd === "Present") return 1;
    return parseInt(b.yearEnd) - parseInt(a.yearEnd);
  });

  return (
    <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16 relative">
      {/* Central Axis Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-900 hidden lg:block" />

      {sortedEdu.map((edu, index) => (
        <div
          key={edu.id}
          className={`relative group ${index % 2 !== 0 ? "lg:mt-32" : ""}`}
        >
          {/* STYLED CARD */}
          <div className="bg-[#0a0a0c] border border-zinc-900 rounded-[2.5rem] p-10 hover:border-zinc-700 transition-all duration-500 shadow-2xl group-hover:shadow-fuchsia-600/5">
            {/* Badge & Status */}
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-zinc-900/50 rounded-2xl text-fuchsia-500 border border-zinc-800 group-hover:scale-110 transition-transform">
                {edu.institution.toLowerCase().includes("aau") ? (
                  <Cpu size={22} />
                ) : (
                  <Terminal size={22} />
                )}
              </div>

              {edu.yearEnd === "Present" && (
                <div className="flex items-center gap-2 px-3 py-1 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                  </span>
                  <span className="text-[9px] font-black uppercase text-fuchsia-500 italic">
                    Ongoing_Node
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-black tracking-tight text-white mb-2 leading-tight">
              {edu.degree}
            </h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8">
              {edu.institution} <span className="text-zinc-800 mx-2">//</span>{" "}
              {edu.yearStart} — {edu.yearEnd}
            </p>

            {/* Syllabus/Coursework Block */}
            <div className="pt-8 border-t border-zinc-900/80">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={12} className="text-fuchsia-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                  Syllabus_Payload
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium italic">
                {edu.coursework}
              </p>
            </div>

            {/* Side Label for Indexing */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-opacity">
              Node_0{index + 1}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
