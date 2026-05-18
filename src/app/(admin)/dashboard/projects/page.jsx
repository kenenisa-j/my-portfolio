"use client";
import React from "react";
import Link from "next/link";
import { Settings, LayoutPanelTop, ArrowLeft } from "lucide-react";

export default function ProjectHub() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative">
      {/* Back to main Dashboard */}
      <Link
        href="/dashboard"
        className="absolute top-10 left-10 text-zinc-600 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back_To_Dashboard
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* BUTTON 1: GENERAL FORM (Updated with matching Orange themes) */}
        <Link
          href="/dashboard/projects/general"
          className="group bg-zinc-900/30 p-16 rounded-[4rem] border border-zinc-900 hover:border-orange-500/50 hover:bg-zinc-900/50 transition-all duration-500 text-center flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Settings
            size={56}
            strokeWidth={1.5}
            className="mb-8 text-zinc-700 group-hover:text-orange-500 group-hover:rotate-90 transition-all duration-700"
          />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            General{" "}
            <span className="text-zinc-500 group-hover:text-white transition-colors">
              Form
            </span>
          </h2>
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em] mt-4">
            Inventory_&_Core_Data
          </p>
        </Link>

        {/* BUTTON 2: DETAIL FORM */}
        <Link
          href="/dashboard/projects/detailed" // Corrected path to match your folder
          className="group bg-zinc-900/30 p-16 rounded-[4rem] border border-zinc-900 hover:border-fuchsia-500/50 hover:bg-zinc-900/50 transition-all duration-500 text-center flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <LayoutPanelTop
            size={56}
            strokeWidth={1.5}
            className="mb-8 text-zinc-700 group-hover:text-fuchsia-500 group-hover:scale-110 transition-all duration-700"
          />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            Detail{" "}
            <span className="text-zinc-500 group-hover:text-white transition-colors">
              Form
            </span>
          </h2>
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em] mt-4">
            Deep_Content_Editor
          </p>
        </Link>
      </div>
    </div>
  );
}
