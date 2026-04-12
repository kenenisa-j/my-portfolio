"use client";
import React from "react";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function ProjectDetail({ project }) {
  if (!project) return null;

  const { ArrowLeft, Globe, Terminal } = Icons;
  const GithubIcon = Icons.Github || Icons.Code2;

  // 1. Process Images for Gallery (Updated to imageGallery)
  const projectImages =
    project.imageGallery
      ?.split(",")
      .map((img) => img.trim())
      .filter((img) => img !== "") || [];

  // 2. Process Tech Stack for Dynamic Specs (Updated to techSpecs)
  const techEntries =
    project.techSpecs?.split(",").map((item) => {
      const [label, value] = item.split(":");
      return {
        label: label?.trim() || "Tech",
        value: value?.trim() || item.trim(),
      };
    }) || [];

  return (
    <main className="min-h-screen bg-black text-zinc-300 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* NAVIGATION */}
        <nav className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-zinc-700 pb-1"
          >
            <ArrowLeft size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Archive / Projects
            </span>
          </Link>
        </nav>

        {/* HEADER */}
        <header className="border-b border-zinc-900 pb-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6 italic uppercase">
                {project.title}
              </h1>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                {project.category}
              </p>
            </div>

            <div className="flex flex-col lg:items-end justify-end h-full">
              <div className="flex gap-4 mt-8 lg:mt-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3 rounded-lg text-xs font-bold transition-all border border-zinc-800"
                  >
                    <GithubIcon size={16} /> Repository
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-5 py-3 rounded-lg text-xs font-bold transition-all"
                  >
                    <Globe size={16} /> Live Review
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: VISUALS & TEXT */}
          <div className="lg:col-span-8 space-y-20">
            {/* PROJECT GALLERY */}
            {projectImages.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-black text-white uppercase tracking-wider italic">
                    Visual_Gallery
                  </h2>
                  <div className="h-px flex-1 bg-zinc-900"></div>
                </div>
                <div className="grid grid-cols-1 gap-10">
                  {projectImages.map((src, index) => (
                    <div
                      key={index}
                      className="rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl group"
                    >
                      <img
                        src={src}
                        alt={`${project.title} view ${index + 1}`}
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROJECT DETAIL */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black text-white uppercase tracking-wider italic">
                  Case_Study
                </h2>
                <div className="h-px flex-1 bg-zinc-900"></div>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-light whitespace-pre-wrap">
                {project.fullDetail ||
                  "No detailed overview available for this project yet."}
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN: DYNAMIC SPECS */}
          <aside className="lg:col-span-4">
            <div className="space-y-12 sticky top-32">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] border-b border-zinc-900 pb-2">
                  Technical_Specs
                </h4>
                <ul className="space-y-8">
                  {techEntries.map((tech, i) => (
                    <li key={i} className="space-y-2">
                      <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest flex items-center gap-2">
                        <Terminal size={12} /> {tech.label}
                      </span>
                      <p className="text-sm text-zinc-300 font-mono pl-5 border-l border-fuchsia-900">
                        {tech.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PROJECT FOOTPRINT */}
              <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/50">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">
                  Project Role
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  {project.role ||
                    `Lead Developer on the implementation of ${project.title}.`}
                </p>
              </div>

              <div className="font-mono text-[8px] text-zinc-800 break-all p-4 border border-zinc-900 rounded-lg uppercase tracking-tighter">
                BUILD_ID: {project.id}
                <br />
                STATUS: {project.status || "PRODUCTION_STABLE"}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
