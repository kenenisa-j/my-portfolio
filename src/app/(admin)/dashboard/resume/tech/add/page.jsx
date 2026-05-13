"use client";

import React from "react";
import TechForm from "../../../../../../components/admin/techform";
import { FiCpu } from "react-icons/fi";

export default function AddTechPage() {
  return (
    <div className="p-6 md:p-10 bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic flex items-center gap-3">
            <FiCpu className="text-fuchsia-600" />
            Add New <span className="text-fuchsia-600">Technology</span>
          </h1>
          <p className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest">
            Populate your technical arsenal for the portfolio marquee
          </p>
        </div>

        {/* The Form Component */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <TechForm />
        </div>
      </div>
    </div>
  );
}
