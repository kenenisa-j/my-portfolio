"use client";
import { useResume } from "../../../context/ResumeContext";
import { motion } from "framer-motion";
import { ExternalLink, GraduationCap, Award } from "lucide-react";

export default function DualTimeline({ credentials = [] }) {
  const { education } = useResume();

  const Card = ({ children, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative w-full md:w-[480px] group"
    >
      {/* Permanent Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-30"></div>

      {/* Card Container */}
      <div className="relative bg-[#050505] border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4 h-full min-h-[320px]">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full py-24 px-4 overflow-hidden">
      {/* Center Timeline Spine */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-fuchsia-500/30 via-purple-500/30 to-transparent" />

      <div className="flex flex-col gap-20">
        {education.map((edu, i) => {
          const cred = credentials[i];
          return (
            <div
              key={edu.id || i}
              className="relative flex flex-col md:flex-row justify-between items-start w-full"
            >
              {/* EDUCATION SIDE */}
              <Card icon={GraduationCap}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shrink-0">
                    <GraduationCap className="text-fuchsia-400" size={20} />
                  </div>
                  {edu.isOngoing && (
                    <span className="text-[10px] bg-fuchsia-500/10 text-fuchsia-400 px-3 py-1 rounded-full border border-fuchsia-500/20 uppercase font-bold tracking-wider">
                      Ongoing
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-[11px] text-fuchsia-400 font-mono uppercase tracking-widest mb-6">
                  {edu.institution} • {edu.yearStart} — {edu.yearEnd}
                </p>

                <div className="mt-auto border-t border-zinc-800 pt-6">
                  <p className="text-sm text-zinc-400 leading-relaxed break-words">
                    <span className="text-zinc-200 font-semibold block mb-1">
                      Coursework:
                    </span>
                    {edu.coursework}
                  </p>
                </div>
              </Card>

              {/* CENTER ANCHOR DOT */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0d] border-2 border-purple-500 z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]" />

              {/* CREDENTIAL SIDE */}
              {cred ? (
                <Card icon={Award}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shrink-0">
                      <Award className="text-purple-400" size={20} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {cred.title}
                  </h3>
                  <p className="text-[11px] text-purple-400 font-mono uppercase tracking-widest mb-6">
                    {cred.issuer} • {cred.date}
                  </p>

                  <div className="mt-auto border-t border-zinc-800 pt-6">
                    <p className="text-sm text-zinc-400 leading-relaxed break-words">
                      {cred.description}
                    </p>
                    {cred.url && (
                      <div className="mt-8 flex justify-end">
                        <a
                          href={cred.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-purple-400 hover:text-white font-bold uppercase tracking-widest transition-colors"
                        >
                          Verify Certification
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="w-[480px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
