"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../../../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../../../../context/AuthContext";
import ProjectForm from "../../../../../components/admin/ProjectGeneralForm";
import { Trash2, Plus, X, ArrowLeft, Edit3 } from "lucide-react";
import Link from "next/link";

export default function ProjectsManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    // This now works because loading is finally defined!
    if (loading === false && user === null) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  // If AuthContext is still syncing, this page remains silent
  // REPLACE: if (loading || !user) return null;

  // WITH THIS:
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="animate-pulse text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em]">
          Authenticating_Admin_Session...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 font-mono text-[10px] uppercase tracking-[0.5em]">
          Access_Denied_Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard/projects"
          className="text-zinc-600 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-10 transition-all group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to Hub
        </Link>

        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Project Inventory
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">
              Database_Management
            </p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(!showForm);
            }}
            className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-[10px] hover:bg-orange-500 hover:text-white transition-all"
          >
            {showForm ? "Cancel" : "New Entry"}
          </button>
        </div>

        {showForm && (
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
            <ProjectForm
              onSuccess={() => setShowForm(false)}
              editData={editingProject}
            />
          </div>
        )}

        <div className="grid gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-[#111111] p-6 rounded-2xl border border-zinc-800 flex justify-between items-center group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-zinc-800 overflow-hidden border border-white/5">
                  <img
                    src={p.images?.split(",")[0] || "/placeholder.jpg"}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    alt=""
                  />
                </div>
                <h3 className="font-black italic uppercase text-lg">
                  {p.title}
                </h3>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingProject(p);
                    setShowForm(true);
                  }}
                  className="p-3 bg-zinc-800/50 hover:bg-indigo-600 text-zinc-400 hover:text-white rounded-xl transition-all"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={async () => {
                    if (confirm("Delete?"))
                      await deleteDoc(doc(db, "projects", p.id));
                  }}
                  className="p-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
