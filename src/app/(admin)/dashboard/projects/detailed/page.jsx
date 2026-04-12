"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase/config"; // Using the @ alias for clean imports
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProjectDetailForm from "../../../../../components/admin/ProjectDetailForm";
import { ArrowLeft, ChevronRight, Settings2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DetailedManagement() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSyncing, setIsSyncing] = useState(true);

  // Real-time listener for your project inventory
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsSyncing(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-10">
          <Link
            href="/dashboard/projects"
            className="text-zinc-600 hover:text-orange-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <ArrowLeft size={14} /> Back to Selection
          </Link>
          {isSyncing && (
            <span className="text-[10px] font-mono text-fuchsia-500 animate-pulse">
              SYNCING_DATABASE...
            </span>
          )}
        </div>

        {/* Title Section */}
        <div className="mb-12 border-b border-zinc-800 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
              Deep Content <span className="text-fuchsia-600">Editor</span>
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-4">
              Technical Specs & High-End Gallery Management
            </p>
          </div>
          <Sparkles className="text-zinc-800" size={40} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Project Selector Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-6 ml-2">
              Select Project to Enhance
            </h3>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all group ${
                    selectedProject?.id === p.id
                      ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-[0_0_30px_rgba(192,38,211,0.2)]"
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex flex-col items-start text-left truncate">
                    <span className="font-bold uppercase tracking-tight text-sm truncate w-full">
                      {p.title}
                    </span>
                    <span
                      className={`text-[9px] font-mono mt-1 ${selectedProject?.id === p.id ? "text-fuchsia-200" : "text-zinc-600"}`}
                    >
                      /{p.slug}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={
                      selectedProject?.id === p.id
                        ? "translate-x-1"
                        : "group-hover:translate-x-1 transition-transform"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: The Editor Area */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <ProjectDetailForm
                  editData={selectedProject}
                  onSuccess={() => {
                    // Feedback loop: clear selection after successful update
                    setSelectedProject(null);
                  }}
                />
              </div>
            ) : (
              <div className="h-full min-h-[500px] border-2 border-dashed border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center text-zinc-800 bg-zinc-900/10">
                <div className="relative mb-6">
                  <Settings2
                    size={64}
                    className="opacity-10 animate-[spin_10s_linear_infinite]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-fuchsia-600 rounded-full animate-ping" />
                  </div>
                </div>
                <p className="uppercase font-black tracking-[0.4em] text-[10px] text-zinc-600">
                  Select_Active_Project_To_Begin
                </p>
                <p className="text-[9px] text-zinc-700 mt-2 uppercase">
                  Awaiting Input Sequence...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
