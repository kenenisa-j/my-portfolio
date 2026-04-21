"use client";
import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ExperienceForm() {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    impact: "",
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "experience"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert("Log published successfully!");
      setFormData({
        role: "",
        company: "",
        duration: "",
        impact: "",
        isFeatured: false,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to publish log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-zinc-900 rounded-xl space-y-4"
    >
      <input
        type="text"
        required
        placeholder="Role (e.g. AI Engineer)"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white rounded"
      />
      <input
        type="text"
        required
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white rounded"
      />
      <input
        type="text"
        required
        placeholder="Duration"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white rounded"
      />
      <textarea
        required
        placeholder="Impact lines"
        value={formData.impact}
        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white rounded"
      />
      <label className="flex items-center gap-2 text-white cursor-pointer">
        <input
          type="checkbox"
          checked={formData.isFeatured}
          onChange={(e) =>
            setFormData({ ...formData, isFeatured: e.target.checked })
          }
        />
        Featured (INSA/Internships)
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded transition-colors"
      >
        {loading ? "PUBLISHING..." : "PUBLISH LOG"}
      </button>
    </form>
  );
}
