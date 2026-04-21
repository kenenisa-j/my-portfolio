"use client";
import { Code, MessageSquare, Terminal } from "lucide-react";

export default function Linguistics() {
  return (
    <div className="w-full">
      <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-600/30">
            <Terminal className="text-purple-500" size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Language Skills</h2>
            <p className="text-xs text-purple-400 font-mono uppercase tracking-widest mt-1">
              Communication & Understanding
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* English */}
          <div className="bg-[#16161c] p-8 rounded-xl border border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <Code className="text-purple-500" size={24} />
              <h3 className="text-lg font-bold text-white">English</h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              I use English confidently in my studies, coding, and technical
              work. It helps me learn from global resources, build projects, and
              communicate with developers and clients from different countries.
            </p>
          </div>

          {/* Local Languages */}
          <div className="bg-[#16161c] p-8 rounded-xl border border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <MessageSquare className="text-purple-500" size={24} />
              <h3 className="text-lg font-bold text-white">
                Amharic & Afan Oromo
              </h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              These are my native languages. I use them daily to communicate,
              understand people deeply, and build ideas that fit real local
              needs in Ethiopia. They help me stay connected to my culture and
              community.
            </p>
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">
            Ready for real-world communication
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </div>
  );
}
