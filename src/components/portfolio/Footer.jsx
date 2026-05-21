"use client";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Resume", href: "/resume.pdf" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/kenenisa-j",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.73.5.75 5.7.75 12.2c0 5.2 3.44 9.6 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.34.8-4.05-1.5-4.05-1.5-.55-1.5-1.34-1.9-1.34-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 2 3 1.4 3.7 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.6-1.4-5.6-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.3 3.3-1.3.7 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.3 0 4.6-2.9 5.7-5.6 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.2C23.25 5.7 18.27.5 12 .5z" />
        </svg>
      ),
    },
    {
      href: "https://t.me/K_Dominus7",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.04 15.29l-.39 5.5c.56 0 .8-.24 1.09-.53l2.62-2.5 5.43 3.98c1 .55 1.72.26 1.97-.93l3.58-16.77h0c.32-1.49-.54-2.07-1.5-1.72L1.7 9.26c-1.45.56-1.43 1.37-.25 1.73l5.4 1.68L19.6 6.4c.63-.4 1.2-.18.72.22" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/kenenisa_j7?igsh=OHRpbmJ0M3VqZmk2",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.8A4.2 4.2 0 1 0 16.2 12 4.2 4.2 0 0 0 12 7.8zm6.5-.9a1 1 0 1 0-1 1 1 1 0 0 0 1-1z" />
        </svg>
      ),
    },
    {
      href: "https://x.com/Kenenisa_j",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: "https://wa.me/251935689535",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.135-1.346a9.946 9.946 0 004.873 1.277h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.922-7.062A9.923 9.923 0 0012.012 2zm5.727 14.046c-.245.688-1.22 1.254-1.679 1.303-.458.049-.9.243-2.883-.54a10.015 10.015 0 01-4.32-3.805c-.488-.646-.838-1.403-.838-2.215 0-1.742 1.458-2.057 1.703-2.057.245 0 .49.012.71.012.22 0 .465-.085.71.503.245.588.834 2.031.907 2.179.074.147.123.319.025.515-.099.196-.147.319-.294.49-.147.171-.311.38-.444.51-.147.146-.3.306-.128.6.172.293.765 1.258 1.644 2.04.131.117.264.234.406.345.71.558 1.274.373 1.543.055.269-.318 1.176-1.371 1.494-1.837.318-.465.637-.392.955-.269.319.122 2.03.955 2.373 1.126.343.171.57.257.656.404.086.146.086.845-.16 1.533z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-10 px-6 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* BRAND */}
        <h2 className="text-2xl font-bold">
          Kenenisa<span className="text-purple-500">.</span>
        </h2>

        {/* NAV LINKS (ONE LINE) */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-purple-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* SOCIAL ICONS (VISIBLE + ONE LINE) */}
        <div className="flex items-center gap-4 text-zinc-400">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition hover:scale-110"
            >
              <div className="h-5 w-5">{social.svg}</div>
            </a>
          ))}
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <p>© {currentYear} Kenenisa Jaleto. All rights reserved.</p>

        {/* ADMIN BUTTON */}
        <a
          href="/dashboard"
          className="px-3 py-1 bg-white/5 hover:bg-purple-600 text-zinc-400 hover:text-white text-[10px] uppercase rounded-md border border-white/10 transition"
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
