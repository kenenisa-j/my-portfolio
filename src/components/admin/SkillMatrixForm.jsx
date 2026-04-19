"use client";
import { useState } from "react";
import { db } from "../../firebase/config"; // Ensure this path is correct for your project
import { collection, addDoc } from "firebase/firestore";

export default function SkillMatrixForm() {
  const [skill, setSkill] = useState({
    name: "",
    category: "Web Development",
    proficiency: 50,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "skills"), {
        name: skill.name,
        category: skill.category,
        proficiency: parseInt(skill.proficiency),
        createdAt: new Date(),
      });
      alert("Skill added successfully!");
      setSkill({ name: "", category: "Web Development", proficiency: 50 });
    } catch (err) {
      console.error("Error adding skill: ", err);
      alert("Failed to add skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#0d0d12] border border-white/10 rounded-2xl">
      <h2 className="text-xl font-bold text-white mb-6">Add New Skill</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
            Skill Name
          </label>
          <input
            type="text"
            required
            value={skill.name}
            onChange={(e) => setSkill({ ...skill, name: e.target.value })}
            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:border-fuchsia-500 outline-none transition-all"
            placeholder="e.g. React.js"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
            Category
          </label>
          <select
            value={skill.category}
            onChange={(e) => setSkill({ ...skill, category: e.target.value })}
            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:border-fuchsia-500 outline-none"
          >
            <option>Web Development</option>
            <option>AI / Machine Learning</option>
            <option>Infrastructure</option>
            <option>Data Science</option>
          </select>
        </div>

        {/* Proficiency Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-mono uppercase text-zinc-400">
              Proficiency: {skill.proficiency}%
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={skill.proficiency}
            onChange={(e) =>
              setSkill({ ...skill, proficiency: e.target.value })
            }
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "SAVING..." : "PUBLISH SKILL"}
        </button>
      </form>
    </div>
  );
}
