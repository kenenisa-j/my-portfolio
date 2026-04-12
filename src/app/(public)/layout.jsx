export default function PublicLayout({ children }) {
  return (
    <section className="min-h-screen">
      {children}
      // Example in your Layout
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-[-1]" />
    </section>
  );
}
