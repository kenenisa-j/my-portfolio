"use client";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import SkillMatrixForm from "../../../../../components/admin/SkillMatrixForm";
import { Trash2 } from "lucide-react";

const CATEGORIES = ["Programming Languages", "Frameworks"];

export default function SkillsDashboard() {
  const [skills, setSkills] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setSkills(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSkills();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (confirm("Delete this skill?")) {
      await deleteDoc(doc(db, "skills", id));
      setRefresh(!refresh);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-black italic uppercase text-white mb-8">
        Quantified Skills Matrix
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="h-fit">
          <SkillMatrixForm />
        </div>

        {/* List Column - Strictly Categorized */}
        <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-8 uppercase tracking-wider">
            Current Features
          </h2>

          <div className="space-y-8">
            {CATEGORIES.map((category) => (
              <div key={category}>
                <h3 className="text-fuchsia-500 font-bold uppercase tracking-widest text-xs mb-4">
                  {category}
                </h3>

                <div className="space-y-3">
                  {skills.filter((s) => s.category === category).length > 0 ? (
                    skills
                      .filter((s) => s.category === category)
                      .map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg"
                        >
                          <span className="text-white font-bold">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="text-zinc-400 font-mono text-sm">
                              {skill.proficiency}%
                            </span>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="text-zinc-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-zinc-800 text-xs italic">
                      No skills added to {category} yet...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
