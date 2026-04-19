"use client";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase/config"; // Ensure path accuracy
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import SkillMatrixForm from "@/components/admin/SkillMatrixForm";
import { Trash2 } from "lucide-react";

export default function SkillsDashboard() {
  const [skills, setSkills] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch skills from Firestore
  useEffect(() => {
    const fetchSkills = async () => {
      const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setSkills(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSkills();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      await deleteDoc(doc(db, "skills", id));
      setRefresh(!refresh); // Trigger re-fetch
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-black italic uppercase text-white mb-8">
        Quantified Skills Matrix
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="h-fit">
          <SkillMatrixForm />
        </div>

        {/* List Column */}
        <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
            Current Skills
          </h2>
          <div className="space-y-4">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg group"
                >
                  <div>
                    <p className="text-white font-bold">{skill.name}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      {skill.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-fuchsia-500 font-mono font-bold">
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
              <p className="text-zinc-600 text-sm italic">
                No skills defined yet...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
