"use client";
import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Services", href: "/#services" },
    { name: "Resume", href: "/#resume" },
    { name: "Contact", href: "/#contact" },
  ];

  // Active Link Detection: Finds the section closest to the top of the viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "services",
        "resume",
        "contact",
      ];

      let currentActive = "home";
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < minDistance) {
            minDistance = distance;
            currentActive = section;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-[100] w-full bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-6 md:px-12 py-6 flex justify-between items-center">
      {/* LEFT: Logo */}
      <a href="/" className="w-12 h-12">
        <img
          src="/logo.png"
          alt="KJ"
          className="w-full h-full object-contain"
        />
      </a>

      {/* CENTER: Desktop Links */}
      <div className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`${activeSection === link.name.toLowerCase() ? "text-fuchsia-500" : "hover:text-zinc-300"} transition-colors`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* RIGHT: Resume Button + Dashboard */}
      <div className="flex items-center gap-6">
        <a
          href="/resume.pdf"
          target="_blank"
          className="hidden lg:flex items-center gap-2 bg-zinc-900 px-5 py-2 rounded-lg border border-zinc-800 hover:border-fuchsia-500 transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            CV
          </span>
          <Download size={14} className="text-fuchsia-500" />
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-zinc-400"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-black flex flex-col justify-center items-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-black uppercase text-white hover:text-fuchsia-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
