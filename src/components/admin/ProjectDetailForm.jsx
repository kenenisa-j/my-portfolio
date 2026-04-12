"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Clean alias for your config
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Save, XCircle, RefreshCcw } from "lucide-react";

export default function ProjectDetailForm({ editData, onSuccess }) {
  const [formData, setFormData] = useState({
    fullDetail: "",
    imageGallery: "",
    techSpecs: "",
    role: "",
    status: "Deployed / Stable",
  });
  const [loading, setLoading] = useState(false);

  // Sync form with selected project from inventory
  useEffect(() => {
    if (editData) {
      setFormData({
        fullDetail: editData.fullDetail || "",
        imageGallery: editData.imageGallery || "",
        techSpecs: editData.techSpecs || "",
        role: editData.role || "",
        status: editData.status || "Deployed / Stable",
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData?.id) return alert("No project selected!");

    setLoading(true);
    try {
      const docRef = doc(db, "projects", editData.id);
      await updateDoc(docRef, {
        ...formData,
        detailUpdatedAt: serverTimestamp(),
      });

      // Success feedback
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to sync: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-zinc-900/40 p-10 rounded-[2.5rem] border border-zinc-800 backdrop-blur-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-fuchsia-500 font-black uppercase tracking-tighter text-2xl italic">
          Step 2: Technical Deep-Dive
        </h2>
        {editData && (
          <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            EDITING: {editData.title}
          </span>
        )}
      </div>

      {/* Long-form Overview */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-black text-zinc-500 ml-2 tracking-widest">
          Project Narrative / Full Detail
        </label>
        <textarea
          placeholder="Describe the challenges, solutions, and core impact of this project..."
          className="p-5 bg-black/50 border border-zinc-800 rounded-2xl min-h-[180px] text-sm text-zinc-200 outline-none focus:border-fuchsia-500 transition-all"
          value={formData.fullDetail}
          onChange={(e) =>
            setFormData({ ...formData, fullDetail: e.target.value })
          }
        />
      </div>

      {/* Role & Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-black text-zinc-500 ml-2 tracking-widest">
            Your Role
          </label>
          <input
            type="text"
            placeholder="e.g., Lead Full-Stack Developer"
            className="p-4 bg-black/50 border border-zinc-800 rounded-xl text-sm text-white outline-none focus:border-fuchsia-500"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-black text-zinc-500 ml-2 tracking-widest">
            Project Status
          </label>
          <input
            type="text"
            placeholder="e.g., Live / Maintenance"
            className="p-4 bg-black/50 border border-zinc-800 rounded-xl text-sm text-white outline-none focus:border-fuchsia-500"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-black text-zinc-500 ml-2 tracking-widest">
          Tech Specs (Category: Technology, Category: Technology)
        </label>
        <input
          placeholder="Frontend: Next.js, Backend: Firebase, Style: Tailwind"
          className="p-4 bg-black/50 border border-zinc-800 rounded-xl text-sm text-white font-mono outline-none focus:border-fuchsia-500"
          value={formData.techSpecs}
          onChange={(e) =>
            setFormData({ ...formData, techSpecs: e.target.value })
          }
        />
      </div>

      {/* Vertical Gallery */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-black text-zinc-500 ml-2 tracking-widest">
          Visual Gallery (Comma-separated Image URLs)
        </label>
        <textarea
          placeholder="https://image1.jpg, https://image2.jpg..."
          className="p-4 bg-black/50 border border-zinc-800 rounded-xl text-sm text-white font-mono outline-none focus:border-fuchsia-500 min-h-[80px]"
          value={formData.imageGallery}
          onChange={(e) =>
            setFormData({ ...formData, imageGallery: e.target.value })
          }
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-fuchsia-600 p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-fuchsia-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <RefreshCcw size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {loading ? "Syncing_Data..." : "Push_Detailed_Specs"}
        </button>

        <button
          type="button"
          onClick={() => onSuccess && onSuccess()}
          className="bg-zinc-800 p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-red-600 transition-all text-white flex items-center justify-center aspect-square"
          title="Cancel Edit"
        >
          <XCircle size={20} />
        </button>
      </div>
    </form>
  );
}
