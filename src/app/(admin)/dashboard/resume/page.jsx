"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Briefcase, Cpu, Award } from "lucide-react";
import DashboardCard from "../../../../components/admin/DashboardCard";

export default function ResumeGateway() {
  const resumeModules = [
    {
      title: "Education",
      desc: "Manage AAU, CPU, and academic nodes.",
      icon: <GraduationCap size={24} />,
      link: "/dashboard/resume/education",
      color: "bg-blue-600",
    },
    {
      title: "Experience",
      desc: "Manage INSA and professional logs.",
      icon: <Briefcase size={24} />,
      link: "/dashboard/resume/experience",
      color: "bg-emerald-600",
    },
    {
      title: "Skills",
      desc: "Manage technical expertise levels.",
      icon: <Cpu size={24} />,
      link: "/dashboard/resume/skills",
      color: "bg-amber-600",
    },
    {
      title: "Credentials",
      desc: "Manage ALX and Udacity certs.",
      icon: <Award size={24} />,
      link: "/dashboard/resume/credentials",
      color: "bg-fuchsia-600",
    },
    {
      title: "Tech Stack",
      desc: "Manage technologies and mastery.",
      icon: <Cpu size={24} />,
      link: "/dashboard/resume/tech",
      color: "bg-fuchsia-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#12141d] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-fuchsia-500">
            Resume HQ
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Select a module to manage.
          </p>
        </div>

        {/* THIS GRID RENDERS THE 4 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumeModules.map((m) => (
            <DashboardCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
