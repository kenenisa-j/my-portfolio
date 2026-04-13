"use client";
import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { GraduationCap, School, CheckCircle2, Calendar } from "lucide-react";

export default function EducationForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  // DYNAMIC YEAR GENERATION
  const currentYear = new Date().getFullYear();
  const startYearRange = 2010;
  const endYearRange = currentYear + 10;

  const years = Array.from(
    { length: endYearRange - startYearRange + 1 },
    (_, i) => (startYearRange + i).toString(),
  ).reverse();

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    coursework: "",
    yearStart: "2023",
    yearEnd: "2027", // Now fully selectable
    score: "",
    isOngoing: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        // Logic: Save 'Present' if ongoing, otherwise save the chosen year
        yearEnd: formData.isOngoing ? "Present" : formData.yearEnd,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "education"), submissionData);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Firebase Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f0f12] border border-zinc-800 p-8 rounded-[2.5rem] space-y-6 max-w-3xl shadow-2xl relative"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black ml-1">
            Degree_Title
          </label>
          <div className="relative">
            <GraduationCap
              size={16}
              className="absolute top-4 left-4 text-zinc-600"
            />
            <input
              placeholder="e.g. BSc in Electrical Engineering"
              className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-2xl text-sm outline-none focus:border-fuchsia-500 transition-all text-white"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black ml-1">
            Institution_Node
          </label>
          <div className="relative">
            <School size={16} className="absolute top-4 left-4 text-zinc-600" />
            <input
              placeholder="e.g. Addis Ababa University"
              className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-2xl text-sm outline-none focus:border-fuchsia-500 transition-all text-white"
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
              }
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black ml-1 text-fuchsia-500/80">
          Syllabus_Data
        </label>
        <textarea
          placeholder="DSA, OOP, Circuit Design, Signals & Systems..."
          className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-sm h-28 outline-none focus:border-fuchsia-500 transition-all resize-none text-zinc-300"
          value={formData.coursework}
          onChange={(e) =>
            setFormData({ ...formData, coursework: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* START YEAR DROPDOWN */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black ml-1 flex items-center gap-1">
            <Calendar size={10} /> Start_Year
          </label>
          <div className="relative">
            <select
              className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-xs outline-none focus:border-fuchsia-500 text-white cursor-pointer appearance-none"
              value={formData.yearStart}
              onChange={(e) =>
                setFormData({ ...formData, yearStart: e.target.value })
              }
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-4 pointer-events-none text-zinc-600 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* END YEAR DROPDOWN (Now identical to Start Year) */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black ml-1 flex items-center gap-1">
            <Calendar size={10} /> End_Year
          </label>
          <div className="relative">
            <select
              className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-xs outline-none focus:border-fuchsia-500 text-white cursor-pointer appearance-none"
              value={formData.yearEnd}
              onChange={(e) =>
                setFormData({ ...formData, yearEnd: e.target.value })
              }
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-4 pointer-events-none text-zinc-600 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* SCORE */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black ml-1">
            Performance_Metric
          </label>
          <input
            placeholder="e.g. 95/100 or 3.9 CGPA"
            className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-xs outline-none focus:border-fuchsia-500 text-white"
            value={formData.score}
            onChange={(e) =>
              setFormData({ ...formData, score: e.target.value })
            }
          />
        </div>
      </div>

      {/* ONGOING TOGGLE */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setFormData({ ...formData, isOngoing: !formData.isOngoing })
          }
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all active:scale-95 ${
            formData.isOngoing
              ? "bg-fuchsia-600/10 border-fuchsia-500 text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.1)]"
              : "bg-zinc-900 border-zinc-800 text-zinc-600"
          }`}
        >
          <CheckCircle2 size={14} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">
            Currently_Enrolled
          </span>
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.5em] hover:bg-fuchsia-600 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl"
      >
        {loading ? "WRITING_TO_FOUNDATION..." : "COMMIT_ACADEMIC_RECORD"}
      </button>
    </form>
  );
}
