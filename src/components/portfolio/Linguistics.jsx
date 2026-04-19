"use client";
import { Code, MessageSquare, Terminal } from "lucide-react";

export default function Linguistics() {
  return (
    <div className="w-full">
      {/* Container matching your Resume cards' style */}
      <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <Terminal className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Linguistics_Proficiency
            </h2>
            <p className="text-xs text-blue-300 font-mono uppercase tracking-widest mt-1">
              Operational Language Scope
            </p>
          </div>
        </div>

        {/* Proficiency Nodes */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Global Node */}
          <div className="bg-[#16161c] p-8 rounded-xl border border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <Code className="text-blue-400" size={24} />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                English
              </h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong>Professional Working Proficiency.</strong> I utilize
              English as my primary language for technical architecture,
              drafting software documentation, and facilitating international
              project collaboration. It serves as my bridge to global
              open-source communities and technical standards.
            </p>
          </div>

          {/* Local Node */}
          <div className="bg-[#16161c] p-8 rounded-xl border border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <MessageSquare className="text-blue-400" size={24} />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Amharic & Afan Oromo
              </h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong>Native Fluency.</strong> My local linguistic expertise is
              a strategic asset for designing regional SME solutions. I leverage
              these languages to create culturally resonant user interfaces,
              ensuring high accessibility and trust within the Ethiopian market.
            </p>
          </div>
        </div>

        {/* Bridge Indicator */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">
            Deployment: Multi-Lingual Ready
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </div>
  );
}
