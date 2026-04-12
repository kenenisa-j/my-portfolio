"use client";
import React from "react";
import Link from "next/link";

export default function DashboardCard({ title, desc, icon, link, color }) {
  return (
    <div className="group bg-[#1a1c26] p-8 rounded-3xl border border-zinc-800 hover:border-pink-500/50 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
      {/* 1. Background Glow - Ensure z-0 */}
      <div
        className={`absolute -inset-1 ${color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity z-0`}
      />

      {/* 2. Content Container - Ensure z-10 */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div
          className={`${color} p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 text-white`}
        >
          {icon}
        </div>

        <h2 className="text-xl font-bold mb-3 tracking-tight group-hover:text-pink-500 transition-colors">
          {title}
        </h2>

        <p className="text-zinc-500 text-xs leading-relaxed mb-8 px-2">
          {desc}
        </p>

        {/* 3. The Link - Forced to z-20 and Block display */}
        <Link href={link} className="w-full relative z-20 block">
          <div
            className={`${color} w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all cursor-pointer`}
          >
            Manage →
          </div>
        </Link>
      </div>
    </div>
  );
}
