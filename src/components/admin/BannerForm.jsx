"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { Upload, Save, Image as ImageIcon, User } from "lucide-react";

export default function BannerForm() {
  const [settings, setSettings] = useState({
    profilePic: "",
    heroBanner: "",
    siteTitle: "",
  });
  const [loading, setLoading] = useState(false);

  // Load current settings so you can see what is live
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site_settings", "appearance"), (doc) => {
      if (doc.exists()) setSettings(doc.data());
    });
    return unsub;
  }, []);

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setSettings({ ...settings, [field]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "site_settings", "appearance"), settings);
      alert("System_Updated: Visuals Deployed.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Picture Control */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
            <User size={14} /> Profile_Identity
          </label>
          <div className="relative group w-32 h-32 mx-auto">
            <img
              src={settings.profilePic || "/placeholder.jpg"}
              className="w-full h-full rounded-full object-cover border-2 border-zinc-800 group-hover:border-emerald-500 transition-all"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-all">
              <Upload size={20} />
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "profilePic")}
              />
            </label>
          </div>
          <input
            placeholder="Or Paste Profile URL"
            className="w-full p-3 bg-black border border-zinc-800 rounded-xl text-[10px] outline-none focus:border-emerald-500"
            value={
              settings.profilePic?.startsWith("data:")
                ? "Local_Image_Stored"
                : settings.profilePic
            }
            onChange={(e) =>
              setSettings({ ...settings, profilePic: e.target.value })
            }
          />
        </div>

        {/* Hero Banner Control */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
            <ImageIcon size={14} /> Hero_Landscape
          </label>
          <div className="relative group w-full h-32">
            <img
              src={settings.heroBanner || "/placeholder.jpg"}
              className="w-full h-full rounded-2xl object-cover border-2 border-zinc-800"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-2xl cursor-pointer transition-all">
              <Upload size={20} />
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "heroBanner")}
              />
            </label>
          </div>
          <input
            placeholder="Or Paste Banner URL"
            className="w-full p-3 bg-black border border-zinc-800 rounded-xl text-[10px] outline-none focus:border-emerald-500"
            value={
              settings.heroBanner?.startsWith("data:")
                ? "Local_Image_Stored"
                : settings.heroBanner
            }
            onChange={(e) =>
              setSettings({ ...settings, heroBanner: e.target.value })
            }
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] transition-all"
      >
        {loading ? "Reconfiguring..." : "Sync_Site_Identity"}
      </button>
    </div>
  );
}
