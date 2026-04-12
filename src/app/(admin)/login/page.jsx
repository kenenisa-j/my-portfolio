"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { Settings, LayoutPanelLeft, ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // STABLE AUTH GUARD
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("firebase-auth-token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-4 h-4 bg-green-500 animate-ping rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-20 border-b border-zinc-900 pb-10">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">
              Command Center
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-3">
              System_Status: <span className="text-green-500">Authorized</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 text-zinc-600 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            Terminal_Exit{" "}
            <LogOut
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* NAVIGATION CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* GENERAL FORM CARD */}
          <Link href="/dashboard/projects/general" className="group">
            <div className="relative h-[400px] bg-[#0c0c0c] border border-zinc-900 rounded-[2.5rem] flex flex-col items-center justify-center p-12 transition-all duration-500 hover:border-zinc-700 hover:bg-[#111111] overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={24} className="text-zinc-700" />
              </div>

              <div className="mb-8 p-6 bg-zinc-900/50 rounded-3xl group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-500">
                <Settings
                  size={48}
                  className="text-zinc-600 group-hover:text-white transition-colors"
                />
              </div>

              <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-white transition-colors">
                General Form
              </h2>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">
                Inventory & List
              </p>

              <div className="mt-8 px-6 py-2 border border-zinc-900 rounded-full text-[8px] uppercase tracking-[0.2em] font-black text-zinc-700 group-hover:border-white group-hover:text-white transition-all">
                Open_Database
              </div>
            </div>
          </Link>

          {/* DETAIL FORM CARD */}
          <Link href="/dashboard/projects/detail" className="group">
            <div className="relative h-[400px] bg-[#0c0c0c] border border-zinc-900 rounded-[2.5rem] flex flex-col items-center justify-center p-12 transition-all duration-500 hover:border-pink-900/30 hover:bg-[#111111] overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={24} className="text-pink-900/50" />
              </div>

              <div className="mb-8 p-6 bg-zinc-900/50 rounded-3xl group-hover:scale-110 group-hover:bg-pink-500/10 transition-all duration-500">
                <LayoutPanelLeft
                  size={48}
                  className="text-zinc-600 group-hover:text-pink-500 transition-colors"
                />
              </div>

              <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-white transition-colors">
                Detail Form
              </h2>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">
                Deep Content Editor
              </p>

              <div className="mt-8 px-6 py-2 border border-zinc-900 rounded-full text-[8px] uppercase tracking-[0.2em] font-black text-zinc-700 group-hover:border-pink-500/50 group-hover:text-pink-500 transition-all">
                Access_Editor
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/5 blur-[100px] rounded-full group-hover:bg-pink-500/10 transition-all" />
            </div>
          </Link>
        </div>

        {/* FOOTER SYSTEM INFO */}
        <div className="mt-20 flex justify-between items-center text-[8px] uppercase tracking-[0.5em] font-black text-zinc-800">
          <span>Active_Session: {user.email}</span>
          <span>System_Version_2.0.4_Stable</span>
        </div>
      </div>
    </div>
  );
}
