"use client";

import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiSend } from "react-icons/fi";

export default function TechForm({ onSuccess }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    level: 80,
    type: "Frontend", // Default category
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "skills"), {
        ...formData,
        level: Number(formData.level),
        createdAt: serverTimestamp(),
      });

      setFormData({ name: "", icon: "", level: 80, type: "Frontend" });

      if (onSuccess) {
        onSuccess();
      } else {
        // If not used as a modal, go back to the list page
        router.push("/dashboard/resume/tech");
      }
    } catch (error) {
      console.error("Error adding tech:", error);
      alert("Error saving to database. Check your Firebase permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
        >
          <FiArrowLeft /> Back to Management
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl space-y-6 shadow-2xl"
      >
        <div className="border-b border-zinc-900 pb-4 mb-4">
          <h2 className="text-xl font-bold text-white uppercase italic tracking-tighter">
            Register New Technology
          </h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">
            Ensure category matches your portfolio filter (Frontend, Backend,
            etc.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tech Name */}
          <div>
            <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">
              Tech Name (Visual)
            </label>
            <input
              type="text"
              placeholder="e.g. React.js"
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-fuchsia-600 transition-all font-mono text-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Icon Slug */}
          <div>
            <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">
              Icon Slug (Devicon)
            </label>
            <input
              type="text"
              placeholder="e.g. react"
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-fuchsia-600 transition-all font-mono text-sm"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mastery Level */}
          <div>
            <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">
              Mastery Level (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-fuchsia-600 transition-all font-mono text-sm"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
            />
          </div>

          {/* Category Dropdown - Critical for your Skills rows */}
          <div>
            <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">
              Category / Domain
            </label>
            <select
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-fuchsia-600 transition-all font-mono text-sm appearance-none"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="AI">AI / Machine Learning</option>
              <option value="Tools">Tools</option>
            </select>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50 text-white font-black uppercase tracking-widest py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(217,70,239,0.2)] flex items-center justify-center gap-3"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <FiSend /> Deploy to Skillset
            </>
          )}
        </button>
      </form>
    </div>
  );
}
