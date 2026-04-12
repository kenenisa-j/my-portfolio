"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Rocket, Zap, BookOpenText } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#home", icon: <Rocket size={20} /> },
    { name: "Skills", href: "/#skills", icon: <Zap size={20} /> },
    { name: "Projects", href: "/#projects", icon: <BookOpenText size={20} /> },
    { name: "Contact", href: "/#contact", icon: null },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 z-[100] w-full bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-6 md:px-12 py-5 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(217,70,239,0.6)]">
            <img
              src="/logo1.png"
              alt="KJ"
              className="w-full h-full object-contain"
            />
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-fuchsia-500 transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Resume Button */}
        <div className="hidden lg:block">
          <a
            href="/resume.pdf"
            target="_blank"
            className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-2.5 rounded-xl hover:border-fuchsia-500 transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">
              Resume
            </span>
            <span className="bg-fuchsia-500 p-1.5 rounded-lg text-black group-hover:rotate-12 transition-transform">
              <Download size={14} strokeWidth={3} />
            </span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-zinc-400 z-[110]"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-black flex flex-col justify-center items-center p-10"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase italic mb-8 hover:text-fuchsia-500 transition-all"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
