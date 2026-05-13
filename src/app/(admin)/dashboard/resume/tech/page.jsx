"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../../../../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FiTrash2, FiPlus, FiArrowLeft, FiCpu, FiLayers } from "react-icons/fi";

export default function TechDashboard() {
  const [techs, setTechs] = useState([]);
  const router = useRouter();

  // Real-time listener for the skills collection
  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const techList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTechs(techList);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this technology from your portfolio?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "skills", id));
      } catch (error) {
        console.error("Error deleting tech:", error);
      }
    }
  };

  // Grouping logic to see what's in each category
  const categories = ["Frontend", "Backend", "Database", "AI", "Tools"];

  return (
    <div className="p-6 md:p-10 bg-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <button
              onClick={() => router.push("/dashboard")} // Adjust this path to your main admin dashboard
              className="flex items-center gap-2 text-zinc-500 hover:text-fuchsia-500 transition-colors text-xs font-black uppercase tracking-widest mb-4"
            >
              <FiArrowLeft /> Back to Dashboard
            </button>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic flex items-center gap-3">
              <FiCpu className="text-fuchsia-600" />
              Tech <span className="text-fuchsia-600">Arsenel</span>
            </h1>
            <p className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest">
              Management Portal for Portfolio Skills
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/resume/tech/add")} // Ensure this matches your folder structure for the form
            className="bg-white text-black hover:bg-fuchsia-600 hover:text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-xl"
          >
            <FiPlus size={18} /> Add New Technology
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const filtered = techs.filter(
              (t) => t.type?.toLowerCase() === cat.toLowerCase(),
            );

            return (
              <div key={cat} className="space-y-4">
                <div className="flex items-center gap-4 opacity-50">
                  <FiLayers className="text-fuchsia-500" />
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">
                    {cat}
                  </h2>
                  <div className="h-[1px] flex-1 bg-zinc-900"></div>
                </div>

                {filtered.length === 0 ? (
                  <p className="text-zinc-700 text-xs italic font-mono uppercase tracking-widest pl-8">
                    // No items registered in {cat}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((tech) => (
                      <div
                        key={tech.id}
                        className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex items-center justify-between group hover:border-fuchsia-500/30 transition-all shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-fuchsia-900 transition-colors">
                            <img
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                              className="w-7 h-7"
                              style={{
                                filter: tech.name.toLowerCase().includes("next")
                                  ? "invert(1)"
                                  : "",
                              }}
                              alt=""
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm uppercase">
                              {tech.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1 bg-zinc-900 rounded-full overflow-hidden mt-1">
                                <div
                                  className="h-full bg-fuchsia-600"
                                  style={{ width: `${tech.level}%` }}
                                ></div>
                              </div>
                              <span className="text-[9px] text-zinc-500 font-mono">
                                {tech.level}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(tech.id)}
                          className="p-3 text-zinc-800 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          title="Delete Tech"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
