"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import TestimonialForm from "../../../../components/admin/TestimonialForm";
import Link from "next/link"; // Required for navigation
import { Trash2, Plus, Star, UserCircle, ArrowLeft } from "lucide-react";

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTestimonials(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* --- NAVIGATION BUTTON --- */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-fuchsia-500 transition-colors mb-8 group"
        >
          <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-fuchsia-500/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] uppercase font-black tracking-widest">
            Return_to_Dashboard
          </span>
        </Link>
        {/* ------------------------- */}

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter italic">
              FEEDBACK_LOGS
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2">
              Source_Control: <span className="text-emerald-500">Active</span>
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-zinc-800 text-white px-6 py-2 rounded-full font-black uppercase text-[10px] hover:bg-fuchsia-600 transition-all flex items-center gap-2"
          >
            <Plus size={14} /> {showForm ? "Cancel_Entry" : "Add_New_Log"}
          </button>
        </div>

        {showForm && (
          <div className="mb-12 animate-in fade-in zoom-in duration-300">
            <TestimonialForm onSuccess={() => setShowForm(false)} />
          </div>
        )}

        <div className="grid gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800 flex justify-between items-center group hover:border-fuchsia-500/30 transition-all"
            >
              <div className="flex items-center gap-5">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    className="w-14 h-14 rounded-full object-cover border-2 border-fuchsia-500 shadow-lg"
                    alt=""
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-zinc-700">
                    <UserCircle size={30} className="text-zinc-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-widest">
                    {t.clientName}
                  </h3>
                  <div className="flex gap-1 mt-1 text-fuchsia-500">
                    {[...Array(parseInt(t.rating || 5))].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteDoc(doc(db, "testimonials", t.id))}
                className="p-3 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
