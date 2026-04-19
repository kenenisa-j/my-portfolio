"use client";
import { useResume } from "../../../context/ResumeContext";
import { motion } from "framer-motion";
import { ExternalLink, GraduationCap, Award } from "lucide-react";

export default function DualTimeline({ credentials = [] }) {
  const { education } = useResume();

  const Card = ({ children, color = "fuchsia", icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }} // Subtle lift on hover
      className="relative w-full md:w-[480px] group perspective-1000"
    >
      {/* Dynamic Glow Effect: Spotlight follows hover */}
      <div
        className={`absolute -inset-[1px] rounded-[24px] bg-gradient-to-br from-${color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Glass Card Container with enhanced shadow */}
      <div className="relative flex flex-col min-h-[320px] bg-[#0a0a0d] border border-white/5 rounded-[24px] p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-white/10 group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full py-24 px-4 overflow-hidden">
      {/* Center Timeline Spine with subtle gradient pulse */}
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
              <Card color="fuchsia" icon={GraduationCap}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="text-fuchsia-400" size={20} />
                  </div>
                  {edu.isOngoing && (
                    <span className="text-[10px] bg-fuchsia-500/10 text-fuchsia-400 px-3 py-1 rounded-full border border-fuchsia-500/20 uppercase font-bold tracking-wider group-hover:bg-fuchsia-500/20 transition-colors">
                      Ongoing
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-fuchsia-50 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-[11px] text-fuchsia-400 font-mono uppercase tracking-widest mb-6">
                  {edu.institution} • {edu.yearStart} — {edu.yearEnd}
                </p>

                <div className="mt-auto border-t border-white/5 pt-6">
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    <span className="text-zinc-200 font-semibold block mb-1 group-hover:text-white transition-colors">
                      Coursework:
                    </span>
                    {edu.coursework}
                  </p>
                </div>
              </Card>

              {/* CENTER ANCHOR DOT */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0d] border-2 border-purple-500 z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-125 transition-transform duration-300" />

              {/* CREDENTIAL SIDE */}
              {cred ? (
                <Card color="purple" icon={Award}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Award className="text-purple-400" size={20} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-50 transition-colors">
                    {cred.title}
                  </h3>
                  <p className="text-[11px] text-purple-400 font-mono uppercase tracking-widest mb-6">
                    {cred.issuer} • {cred.date}
                  </p>

                  <div className="mt-auto border-t border-white/5 pt-6">
                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {cred.description}
                    </p>

                    {cred.url && (
                      <div className="mt-8 flex justify-end">
                        <a
                          href={cred.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/verify inline-flex items-center gap-2 text-[10px] text-purple-400 hover:text-white font-bold uppercase tracking-widest transition-colors duration-300"
                        >
                          <span className="relative">
                            Verify Certification
                            <span className="absolute left-0 -bottom-1 h-px w-0 bg-purple-400 group-hover/verify:w-full transition-all duration-300"></span>
                          </span>
                          <ExternalLink
                            size={12}
                            className="group-hover/verify:rotate-45 transition-transform duration-300"
                          />
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
