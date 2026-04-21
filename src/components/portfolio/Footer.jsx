"use client";

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
      href: "https://github.com/kenenisa",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.73.5.75 5.7.75 12.2c0 5.2 3.44 9.6 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.34.8-4.05-1.5-4.05-1.5-.55-1.5-1.34-1.9-1.34-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 2 3 1.4 3.7 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.6-1.4-5.6-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.3 3.3-1.3.7 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.3 0 4.6-2.9 5.7-5.6 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.2C23.25 5.7 18.27.5 12 .5z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/in/kenenisa-jaleto",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7C21.2 7.5 22 10 22 13.3V24h-5v-9.5c0-2.3-.5-3.8-2.5-3.8s-3 1.5-3 3.8V24h-5V8z" />
        </svg>
      ),
    },
    {
      href: "https://t.me/kenenisa",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.04 15.29l-.39 5.5c.56 0 .8-.24 1.09-.53l2.62-2.5 5.43 3.98c1 .55 1.72.26 1.97-.93l3.58-16.77h0c.32-1.49-.54-2.07-1.5-1.72L1.7 9.26c-1.45.56-1.43 1.37-.25 1.73l5.4 1.68L19.6 6.4c.63-.4 1.2-.18.72.22" />
        </svg>
      ),
    },
    {
      href: "https://instagram.com/kenenisa",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.8A4.2 4.2 0 1 0 16.2 12 4.2 4.2 0 0 0 12 7.8zm6.5-.9a1 1 0 1 0-1 1 1 1 0 0 0 1-1z" />
        </svg>
      ),
    },
    {
      href: "https://facebook.com/kenenisa",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.5 9.9V14h-2v-2h2v-1.6c0-2.1 1.2-3.4 3.2-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12H17l-.5 2h-2v7A10 10 0 0 0 22 12z" />
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

        {/* ADMIN BUTTON (RESTORED) */}
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
