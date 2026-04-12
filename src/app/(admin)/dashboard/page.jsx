"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import the router
import {
  Layers,
  MessageSquare,
  Briefcase,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import DashboardCard from "../../../components/admin/DashboardCard";

export default function DashboardPage() {
  const { logout, user } = useAuth(); // Get user from context
  const router = useRouter(); // Initialize router

  // Helper function to check login before navigating
  const secureNavigate = (path) => {
    if (!user) {
      // If no user is found, redirect to login
      router.push("/login");
    } else {
      // If user exists, navigate normally
      router.push(path);
    }
  };

  const modules = [
    {
      title: "Projects",
      desc: "Manage list and detailed content.",
      icon: <Layers size={22} />,
      link: "/dashboard/projects",
      color: "bg-indigo-600",
    },
    {
      title: "Testimonials",
      desc: "Manage client reviews and feedback.",
      icon: <MessageSquare size={24} />,
      link: "/dashboard/testimonials",
      color: "bg-pink-600",
    },
    {
      title: "Experience",
      desc: "Manage work history and achievements.",
      icon: <Briefcase size={24} />,
      link: "/dashboard/experience",
      color: "bg-red-600",
    },
    {
      title: "Banner Image",
      desc: "Change your profile/banner image anytime.",
      icon: <ImageIcon size={24} />,
      link: "/dashboard/banner",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#12141d] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Welcome back, Kenenisa</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all border border-red-600/20"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modules.map((m) => (
            <DashboardCard key={m.title} {...m} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1c26] p-8 rounded-2xl border border-zinc-800/50">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => secureNavigate("/dashboard/projects/general")}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              + New Project
            </button>
            <button
              onClick={() => secureNavigate("/dashboard/testimonials")}
              className="bg-pink-600 hover:bg-pink-500 px-6 py-3 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              + New Testimonial
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              View Live Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
