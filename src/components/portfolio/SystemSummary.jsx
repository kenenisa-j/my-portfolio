"use client";
import { motion } from "framer-motion";
import { Cpu, Rocket, Target } from "lucide-react";

export default function SystemSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-full max-w-4xl mx-auto py-24 px-6"
    >
      {/* Permanent Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 blur-3xl rounded-full" />

      {/* Main Container */}
      <div className="relative bg-[#0a0a0d]/80 border border-white/10 backdrop-blur-xl rounded-[32px] p-12 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <Cpu className="text-purple-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Kenenisa_Jaleto
            </h2>
            <p className="text-purple-400 font-mono text-sm tracking-widest uppercase">
              Engineering_Identity
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-fuchsia-400">
              <Target size={18} />
              <span className="font-bold uppercase tracking-wider text-xs">
                The_Mission
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Currently an Electrical and Computer Engineering student at Addis
              Ababa University. I am building the foundation to eventually
              disrupt the automotive industry. My immediate focus is scaling
              AI-driven digital solutions and mastering full-stack
              architectures.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Rocket size={18} />
              <span className="font-bold uppercase tracking-wider text-xs">
                Technical_Stack
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Proficient in React, Node.js, Express, and Firebase. I engineer
              solutions from network security protocols using OpenSSL and Java
              to seamless web deployments via Vite/Netlify. I don't just write
              code; I build systems that perform.
            </p>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold text-xs uppercase tracking-widest transition-all">
            Let's_Build_Together
          </button>
        </div>
      </div>
    </motion.div>
  );
}
