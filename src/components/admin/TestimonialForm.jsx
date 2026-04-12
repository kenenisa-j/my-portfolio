"use client";
import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Upload, Link as LinkIcon, Star, Save, X } from "lucide-react";

export default function TestimonialForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    feedback: "",
    avatar: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  // 1. Handle Local Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result }); // Overwrites current avatar with Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData({
        clientName: "",
        clientRole: "",
        feedback: "",
        avatar: "",
        rating: 5,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <input
          placeholder="Client Name"
          className="p-4 bg-black border border-zinc-800 rounded-2xl text-white text-sm focus:border-fuchsia-500 outline-none"
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
          required
        />
        <input
          placeholder="Role / Company"
          className="p-4 bg-black border border-zinc-800 rounded-2xl text-white text-sm focus:border-fuchsia-500 outline-none"
          value={formData.clientRole}
          onChange={(e) =>
            setFormData({ ...formData, clientRole: e.target.value })
          }
          required
        />
      </div>

      <div className="grid md:grid-cols-1 gap-4">
        {/* HYBRID IMAGE INPUT */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Method A: Local File */}
          <label className="flex-1 w-full flex items-center justify-center gap-3 p-4 bg-black border border-dashed border-zinc-800 rounded-2xl cursor-pointer hover:border-fuchsia-500 transition-all">
            <Upload size={18} className="text-zinc-500" />
            <span className="text-zinc-500 text-xs uppercase font-bold">
              Local_Upload
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <span className="text-zinc-800 font-black text-[10px]">OR</span>

          {/* Method B: URL Link */}
          <div className="flex-1 w-full relative">
            <LinkIcon
              size={16}
              className="absolute top-4 left-4 text-zinc-700"
            />
            <input
              placeholder="Paste_Image_URL"
              className="w-full p-4 pl-12 bg-black border border-zinc-800 rounded-2xl text-white text-[10px] focus:border-fuchsia-500 outline-none"
              value={
                formData.avatar && !formData.avatar.startsWith("data:")
                  ? formData.avatar
                  : ""
              }
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
            />
          </div>
        </div>

        {/* Clear Image Preview Button */}
        {formData.avatar && (
          <button
            type="button"
            onClick={() => setFormData({ ...formData, avatar: "" })}
            className="text-[9px] uppercase text-red-500 font-bold flex items-center gap-1 hover:underline ml-2"
          >
            <X size={10} /> Reset_Avatar
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 bg-black p-4 border border-zinc-800 rounded-2xl w-fit">
        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-2">
          Rating
        </span>
        <input
          type="number"
          min="1"
          max="5"
          className="bg-transparent text-fuchsia-500 font-black outline-none w-10 text-center"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
        <Star size={14} className="text-fuchsia-500" fill="currentColor" />
      </div>

      <textarea
        placeholder="Feedback Narrative..."
        className="w-full p-6 bg-black border border-zinc-800 rounded-2xl text-white h-32 text-sm focus:border-fuchsia-500 outline-none resize-none font-light"
        value={formData.feedback}
        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white p-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
      >
        <Save size={18} /> {loading ? "Syncing_Data..." : "Push_to_Production"}
      </button>
    </form>
  );
}
