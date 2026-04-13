"use client";
import { useState } from "react";
import { useResume } from "../../../../../context/ResumeContext";
import { db } from "./../../../../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import EducationForm from "../../../../../components/admin/EducationForm";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Mortarboard, Globe } from "lucide-react";

export default function EducationManager() {
  const { education } = useResume();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8 md:p-20">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/dashboard/resume"
          className="flex items-center gap-2 text-zinc-600 hover:text-white mb-10 transition-all group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            System_Backlink
          </span>
        </Link>

        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">
              Academic_Logs
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-2">
              Verified Educational Infrastructure
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-fuchsia-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Plus
              size={28}
              className={
                showForm
                  ? "rotate-45 transition-transform"
                  : "transition-transform"
              }
            />
          </button>
        </div>

        {showForm && (
          <div className="mb-20 border-l-2 border-fuchsia-600 pl-8 animate-in fade-in slide-in-from-left duration-500">
            <EducationForm onSuccess={() => setShowForm(false)} />
          </div>
        )}

        {/* This grid mimics your reference layout but cleaner */}
        <div className="grid gap-8">
          {education
            .sort((a, b) => b.yearStart - a.yearStart)
            .map((edu) => (
              <div
                key={edu.id}
                className="relative group bg-[#111114] border border-zinc-900 rounded-[2rem] p-8 hover:border-zinc-700 transition-all overflow-hidden"
              >
                {/* Ongoing Badge */}
                {edu.isOngoing && (
                  <div className="absolute top-6 right-6 px-3 py-1 bg-fuchsia-600/10 border border-fuchsia-500/50 rounded-full">
                    <span className="text-[9px] font-black uppercase text-fuchsia-500 tracking-tighter italic">
                      Ongoing
                    </span>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white mb-1 tracking-tight">
                      {edu.degree}
                    </h2>
                    <p className="text-sm font-bold text-zinc-400 mb-6 uppercase tracking-widest">
                      {edu.institution}{" "}
                      <span className="text-zinc-700 mx-2">|</span>{" "}
                      {edu.yearStart} — {edu.yearEnd || "Present"}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">
                          Core_Coursework
                        </p>
                        <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                          {edu.coursework}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-px md:h-32 bg-zinc-800/50 self-center hidden md:block" />

                  <div className="flex flex-col justify-between items-end">
                    <div className="text-right">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1 text-right">
                        Performance
                      </p>
                      <p className="text-xl font-black text-fuchsia-500 italic">
                        {edu.score || "N/A"}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteDoc(doc(db, "education", edu.id))}
                      className="p-3 text-zinc-800 hover:text-red-500 transition-colors bg-black/50 rounded-xl mt-4"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
