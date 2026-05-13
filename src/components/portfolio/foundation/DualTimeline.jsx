"use client";

import { useResume } from "../../../context/ResumeContext";
import { motion } from "framer-motion";
import { GraduationCap, Award, ArrowUpRight } from "lucide-react";

export default function DualTimeline({ credentials = [] }) {
  const { education } = useResume();

  const Card = ({ children, variant = "education" }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="relative w-full md:w-[470px] group"
    >
      <div
        className={`absolute -inset-[1px] rounded-[28px] blur-lg opacity-20 group-hover:opacity-40 transition duration-500 ${
          variant === "education"
            ? "bg-gradient-to-r from-fuchsia-500 to-purple-500"
            : "bg-gradient-to-r from-purple-500 to-violet-500"
        }`}
      />

      <div className="relative h-full rounded-[28px] border border-zinc-800/80 bg-[#070707]/90 backdrop-blur-xl p-7 overflow-hidden transition-all duration-300 group-hover:border-zinc-700">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        {children}
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* TOP HEADER SECTION */}
      <div className="max-w-[1000px] mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Education Header */}
        <div className="group/title cursor-default">
          <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 font-bold block mb-1">
            2012 - 2027
          </span>
          <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter">
            Education
          </h2>
          {/* Animated Hover Underline */}
          <div className="h-[2px] w-0 bg-fuchsia-600 group-hover/title:w-full transition-all duration-500 mt-2" />
        </div>

        {/* Certifications Header */}
        <div className="group/title cursor-default md:text-right flex flex-col md:items-end">
          <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 font-bold block mb-1">
            2023 - Present
          </span>
          <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter">
            Certifications
          </h2>
          {/* Animated Hover Underline */}
          <div className="h-[2px] w-0 bg-purple-600 group-hover/title:w-full transition-all duration-500 mt-2" />
        </div>
      </div>

      {/* Timeline spine */}
      <div className="hidden md:block absolute left-1/2 top-52 bottom-0 w-px bg-gradient-to-b from-fuchsia-500/40 via-purple-500/20 to-transparent" />

      <div className="flex flex-col gap-12">
        {education.map((edu, i) => {
          const cred = credentials[i];

          return (
            <div
              key={edu.id || i}
              className="relative flex flex-col md:flex-row justify-between items-stretch gap-8"
            >
              {/* EDUCATION CARD */}
              <Card variant="education">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10">
                      <GraduationCap size={22} className="text-fuchsia-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {edu.degree}
                    </h3>
                  </div>
                  {edu.isOngoing && (
                    <span className="px-3 py-1 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-[10px] uppercase tracking-wider font-bold text-fuchsia-300">
                      Ongoing
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <p className="text-fuchsia-400 font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">
                    {edu.yearStart} — {edu.yearEnd}
                  </p>
                </div>

                <div className="border-t border-zinc-800 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-bold mb-3">
                    Focus Areas
                  </p>
                  <p className="text-sm leading-7 text-zinc-300">
                    {edu.coursework}
                  </p>
                </div>
              </Card>

              {/* TIMELINE DOT */}
              <div className="hidden md:flex absolute left-1/2 top-12 -translate-x-1/2 z-20">
                <div className="w-4 h-4 rounded-full border-2 border-fuchsia-500 bg-[#090909] shadow-[0_0_30px_rgba(217,70,239,0.4)]" />
              </div>

              {/* CREDENTIAL CARD */}
              {cred ? (
                <Card variant="credential">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-purple-500/20 bg-purple-500/10 shrink-0">
                      <Award size={22} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {cred.title}
                    </h3>
                  </div>

                  <div className="mb-5">
                    <p className="text-purple-400 font-semibold">
                      {cred.issuer}
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">{cred.date}</p>
                  </div>

                  <div className="border-t border-zinc-800 pt-5">
                    <p className="text-sm leading-7 text-zinc-300">
                      {cred.description}
                    </p>
                    {cred.url && (
                      <div className="mt-6">
                        <a
                          href={cred.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-white transition-colors"
                        >
                          Verify Credential
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="hidden md:block w-[470px]" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
