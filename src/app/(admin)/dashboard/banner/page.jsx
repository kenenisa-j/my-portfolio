"use client";
import BannerForm from "../../../../components/admin/BannerForm";
import Link from "next/link";
import { ArrowLeft, Monitor } from "lucide-react";

export default function BannerManagement() {
  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} />
          <span className="text-[10px] uppercase font-black tracking-widest">
            Back_to_Dashboard
          </span>
        </Link>

        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <Monitor size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Site_Identity
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
              Module_011: Global Visual Controls
            </p>
          </div>
        </div>

        <BannerForm />
      </div>
    </div>
  );
}
