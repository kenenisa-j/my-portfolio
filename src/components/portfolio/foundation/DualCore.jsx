"use client";
import { useResume } from "../../../context/ResumeContext";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function DualTimeline() {
  const { education } = useResume();

  const sortedEdu = [...education].sort((a, b) => {
    if (a.yearEnd === "Present") return -1;
    if (b.yearEnd === "Present") return 1;
    return parseInt(b.yearEnd) - parseInt(a.yearEnd);
  });

  const maxLength = sortedEdu.length;

  return (
    <div className="relative w-full py-24">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.08)_1px,transparent_1px)] bg-[size:22px_22px] opacity-20 pointer-events-none" />

      {/* HEADER */}
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent uppercase">
          SYSTEM_LOG :: FOUNDATION
        </h2>
        <p className="text-xs text-zinc-600 mt-2 tracking-widest uppercase">
          Education // Infrastructure
        </p>
      </div>

      {/* TIMELINE */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full flex flex-col items-center">
        <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-fuchsia-500/40 to-transparent" />
        <div className="absolute w-[6px] h-full bg-fuchsia-500/10 blur-xl" />
      </div>

      {/* ROWS */}
      <div className="space-y-20">
        {[...Array(maxLength)].map((_, i) => {
          const edu = sortedEdu[i];

          return (
            <div key={i} className="relative flex justify-between items-center">
              {/* LEFT - EDUCATION */}
              <div className="w-[45%] flex justify-end">
                {edu && (
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -6 }}
                    transition={{ duration: 0.5 }}
                    className="group relative w-full max-w-md"
                  >
                    {/* CONNECTOR */}
                    <div className="absolute top-10 right-[-40px] w-10 h-[2px] bg-gradient-to-r from-fuchsia-500/70 to-transparent" />

                    {/* NODE */}
                    <div className="absolute top-[34px] right-[-52px]">
                      <div className="w-3 h-3 bg-fuchsia-500 rounded-full relative">
                        <div className="absolute inset-0 rounded-full bg-fuchsia-500 blur-md opacity-70 animate-pulse" />
                      </div>
                    </div>

                    {/* CARD */}
                    <div
                      className="bg-[#0b0b0e] border border-zinc-900 rounded-2xl p-6 
                      hover:border-fuchsia-500/40 transition-all duration-500
                      hover:shadow-[0_0_40px_rgba(217,70,239,0.15)]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-black border border-zinc-800 rounded-lg text-fuchsia-500">
                            <Cpu size={14} />
                          </div>
                          <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">
                            CORE
                          </span>
                        </div>

                        {edu.yearEnd === "Present" && (
                          <span className="text-[9px] text-fuchsia-500 animate-pulse font-bold">
                            LIVE
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white leading-tight">
                        {edu.degree}
                      </h3>

                      <p className="text-xs text-zinc-500 mt-1">
                        {edu.institution} // {edu.yearStart} — {edu.yearEnd}
                      </p>

                      <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                        {edu.coursework}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CENTER NODE */}
              <div className="relative z-10">
                <div className="w-4 h-4 rounded-full bg-fuchsia-600 shadow-[0_0_20px_#d946ef]" />
              </div>

              {/* RIGHT - SPACER */}
              <div className="w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
