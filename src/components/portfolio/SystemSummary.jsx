"use client";

import { motion } from "framer-motion";
import { Lightbulb, Sparkles, ArrowRight } from "lucide-react";

export default function SystemSummary() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-5xl px-4 md:px-6 py-12 md:py-20"
    >
      {/* SECTION TITLE */}
      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <h2 className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-500">
          Beyond Coding
        </h2>

        <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>

      {/* MAIN CARD */}
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-zinc-800 bg-[#070707]/90 backdrop-blur-xl">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_35%)] pointer-events-none" />

        <div className="relative p-5 sm:p-8 md:p-10">
          {/* HEADER */}
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-3 uppercase tracking-tight">
              What I Bring
            </h3>

            <p className="max-w-2xl text-xs md:text-base leading-relaxed md:leading-7 text-zinc-400">
              The mindset, approach, and values I bring to development,
              collaboration, and continuous growth.
            </p>
          </div>

          {/* TWO BOXES */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* MY APPROACH */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[1.25rem] md:rounded-[1.75rem] border border-zinc-800 bg-zinc-950/50 p-5 md:p-7 transition-all duration-300 hover:border-fuchsia-500/20"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10">
                  <Lightbulb size={20} className="text-fuchsia-400" />
                </div>

                <div>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Approach
                  </p>

                  <h4 className="text-lg md:text-xl font-bold text-white">
                    My Approach
                  </h4>
                </div>
              </div>

              <p className="text-xs md:text-sm leading-relaxed md:leading-8 text-zinc-400">
                I enjoy learning by building real projects and solving practical
                problems. I like understanding how things work, improving over
                time, and creating experiences that are simple, useful, and
                reliable.
              </p>
            </motion.div>

            {/* WHAT I VALUE */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[1.25rem] md:rounded-[1.75rem] border border-zinc-800 bg-zinc-950/50 p-5 md:p-7 transition-all duration-300 hover:border-purple-500/20"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-purple-500/20 bg-purple-500/10">
                  <Sparkles size={20} className="text-purple-400" />
                </div>

                <div>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Values
                  </p>

                  <h4 className="text-lg md:text-xl font-bold text-white">
                    What I Value
                  </h4>
                </div>
              </div>

              <p className="text-xs md:text-sm leading-relaxed md:leading-8 text-zinc-400">
                I value consistency, curiosity, teamwork, and continuous
                improvement. I believe good development comes from learning,
                problem-solving, and paying attention to details.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-8 md:mt-10 flex justify-center md:justify-start w-full">
            <a
              href="#contact"
              className="group w-full sm:w-auto justify-center inline-flex items-center gap-2 rounded-xl md:rounded-2xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-fuchsia-500 active:scale-[0.98]"
            >
              Let’s Connect
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
