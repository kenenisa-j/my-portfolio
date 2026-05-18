"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function ProjectForm({ onSuccess, editData }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    smallDescription: "",
    techStack: "",
    github: "",
    liveDemo: "",
    images: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. POPULATE FORM IF EDITING
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        slug: editData.slug || "",
        smallDescription: editData.smallDescription || "",
        techStack: editData.techStack || "",
        github: editData.github || "",
        liveDemo: editData.liveDemo || "",
        images: editData.images || "",
      });
      setImagePreview(editData.images || "");
    } else {
      setFormData({
        title: "",
        slug: "",
        smallDescription: "",
        techStack: "",
        github: "",
        liveDemo: "",
        images: "",
      });
      setImagePreview("");
    }
  }, [editData]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (editData) {
      setFormData({ ...formData, title });
    } else {
      setFormData({ ...formData, title, slug });
    }
  };

  // Converts local file into an optimized, compressed Base64 text string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Target scale thresholds for standard 16:10 web previews
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Compresses canvas down to an optimized jpeg text payload (Quality: 70%)
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

          setImagePreview(compressedBase64);
          setFormData((prev) => ({ ...prev, images: compressedBase64 }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.images && !editData) {
        throw new Error("Please select an image file.");
      }

      if (editData?.id) {
        // 2. UPDATE EXISTING RECORD
        const docRef = doc(db, "projects", editData.id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        alert("Project updated successfully!");
      } else {
        // 3. CREATE NEW RECORD
        await addDoc(collection(db, "projects"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        alert("Project added to portfolio!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Database Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-orange-500 font-black uppercase tracking-tighter text-xl">
          {editData ? "Edit Project" : "New Project"}
        </h2>
        {editData && (
          <span className="text-[10px] text-zinc-600 font-mono">
            REF_ID: {editData.id.substring(0, 8)}...
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
            Project Title
          </label>
          <input
            type="text"
            className="p-4 bg-black border border-zinc-800 rounded-xl focus:border-orange-500 outline-none transition text-sm text-white"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
            Slug (URL Path)
          </label>
          <input
            type="text"
            className="p-4 bg-black border border-zinc-800 rounded-xl focus:border-fuchsia-500 outline-none transition text-sm text-zinc-400 font-mono"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
          Small Description
        </label>
        <textarea
          className="p-4 bg-black border border-zinc-800 rounded-xl focus:border-orange-500 outline-none h-24 text-sm text-white transition"
          value={formData.smallDescription}
          onChange={(e) =>
            setFormData({ ...formData, smallDescription: e.target.value })
          }
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
          Tech Stack (Comma Separated)
        </label>
        <input
          type="text"
          placeholder="React, Firebase, Tailwind..."
          className="p-4 bg-black border border-zinc-800 rounded-xl focus:border-fuchsia-500 outline-none transition text-sm text-white font-mono"
          value={formData.techStack}
          onChange={(e) =>
            setFormData({ ...formData, techStack: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
            Github Link
          </label>
          <input
            type="url"
            className="p-4 bg-black border border-zinc-800 rounded-xl focus:border-zinc-500 outline-none transition text-sm text-white"
            value={formData.github}
            onChange={(e) =>
              setFormData({ ...formData, github: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
            Live Demo URL
          </label>
          <input
            type="url"
            className="p-4 bg-black border border-zinc-800 rounded-xl focus:border-zinc-500 outline-none transition text-sm text-white"
            value={formData.liveDemo}
            onChange={(e) =>
              setFormData({ ...formData, liveDemo: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-2">
          Project Thumbnail Image
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-black border border-zinc-800 rounded-xl">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer w-full sm:w-auto"
            required={!editData}
          />
          {imagePreview && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-gradient-to-r from-orange-600 to-fuchsia-600 hover:from-orange-500 hover:to-fuchsia-500 text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 disabled:opacity-50"
      >
        {loading
          ? "Syncing..."
          : editData
            ? "Update Record"
            : "Deploy to Portfolio"}
      </button>
    </form>
  );
}
