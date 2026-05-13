"use client";

import { motion } from "framer-motion";
import { Languages, Globe2 } from "lucide-react";

const languages = [
  {
    name: "Afaan Oromo",
    level: "Native",
    percentage: 100,
    description:
      "Native fluency with strong written and verbal communication in both personal and professional environments.",
  },
  {
    name: "Amharic",
    level: "Fluent",
    percentage: 95,
    description:
      "Fluent communication with strong speaking, reading, and collaboration skills.",
  },
  {
    name: "English",
    level: "Professional",
    percentage: 90,
    description:
      "Professional working proficiency for software development, technical communication, teamwork, and documentation.",
  },
];

export default function Linguistics() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-500 whitespace-nowrap"></h2>

        <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-[#070707]/90 backdrop-blur-xl">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_35%)]" />

        {/* HEADER */}
        <div className="relative border-b border-zinc-800 p-8">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10">
                  <Languages size={24} className="text-fuchsia-400" />
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Communication
                  </p>

                  <h3 className="text-2xl font-black uppercase text-white md:text-3xl">
                    Languages & Professional Communication
                  </h3>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                Effective multilingual communication that supports
                collaboration, problem-solving, and professional work across
                diverse teams and environments.
              </p>
            </div>

            {/* Right Icon */}
            <div className="hidden h-20 w-20 items-center justify-center rounded-[1.5rem] border border-zinc-800 bg-zinc-900/50 md:flex">
              <Globe2 size={34} className="text-purple-400" />
            </div>
          </div>
        </div>

        {/* LANGUAGES GRID */}
        <div className="relative grid grid-cols-1 gap-6 p-8 lg:grid-cols-3">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.12,
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/70 p-6 transition-all duration-300 hover:border-fuchsia-500/30"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.10),transparent_45%)]" />

              {/* TOP */}
              <div className="relative mb-6 flex items-start justify-between">
                <div>
                  <span className="mb-3 inline-flex rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                    {language.level}
                  </span>

                  <h4 className="text-2xl font-bold text-white">
                    {language.name}
                  </h4>
                </div>

                <span className="text-3xl font-black text-zinc-700 transition-colors group-hover:text-zinc-600">
                  {language.percentage}%
                </span>
              </div>

              {/* Description */}
              <p className="relative min-h-[95px] text-sm leading-7 text-zinc-400">
                {language.description}
              </p>

              {/* Progress */}
              <div className="relative mt-8">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-900">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${language.percentage}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                  />
                </div>

                <div className="mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                  <span>Communication</span>
                  <span>Proficiency</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
