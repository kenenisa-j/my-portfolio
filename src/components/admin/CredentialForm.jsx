"use client";
import { useState } from "react";
import { db, storage } from "../../firebase/config"; // Ensure storage is exported from your config
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CredentialForm({ onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // 1. Upload image to Firebase Storage if a file is selected
      if (imageFile) {
        const storageRef = ref(
          storage,
          `credentials/${Date.now()}_${imageFile.name}`,
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // 2. Save metadata + imageUrl to Firestore
      await addDoc(collection(db, "credentials"), {
        ...formData,
        imageUrl,
        createdAt: new Date(),
      });

      alert("Credential added successfully!");

      // Reset state
      setFormData({
        title: "",
        issuer: "",
        date: "",
        description: "",
        url: "",
      });
      setImageFile(null);
      onSave();
    } catch (error) {
      console.error("Error adding credential: ", error);
      alert("Failed to add credential.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-zinc-900 rounded-xl space-y-4"
    >
      {/* Existing Inputs */}
      <input
        className="w-full p-2 bg-zinc-800 rounded text-white"
        placeholder="Title"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        value={formData.title}
      />
      <input
        className="w-full p-2 bg-zinc-800 rounded text-white"
        placeholder="Issuer"
        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
        value={formData.issuer}
      />
      <input
        className="w-full p-2 bg-zinc-800 rounded text-white"
        placeholder="Date"
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        value={formData.date}
      />
      <textarea
        className="w-full p-2 bg-zinc-800 rounded text-white"
        placeholder="Description"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        value={formData.description}
      />
      <input
        className="w-full p-2 bg-zinc-800 rounded text-white"
        placeholder="Verification URL"
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        value={formData.url}
      />

      {/* NEW: Image Upload Field */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-zinc-500 uppercase">
          Upload Verification Logo/Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="text-sm text-zinc-400"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-fuchsia-600 py-2 rounded text-white font-bold hover:bg-fuchsia-500 disabled:bg-zinc-700"
      >
        {loading ? "SYNCING DATA..." : "ADD TO SYSTEM LOG"}
      </button>
    </form>
  );
}
