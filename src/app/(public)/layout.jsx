export default function PublicLayout({ children }) {
  return (
    <section className="relative min-h-screen bg-[#030303]">
      {/* GLOBAL BACKGROUND - Fixed so it never "jumps" */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.05)_1px,transparent_1px)] bg-[size:35px_35px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
      </div>

      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
