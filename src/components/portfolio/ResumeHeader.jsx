import DualCore from "./foundation/DualCore";

export default function ResumeHeader() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Title Header */}
      <div className="mb-32">
        <h1 className="text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
          SYSTEM<span className="text-fuchsia-600">_</span>LOGS
        </h1>
        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em] mt-6 ml-2">
          Hybrid Academic & Professional Infrastructure // V 2.0
        </p>
      </div>

      {/* FOUNDATION SECTION: Education & Linguistics */}
      <section id="foundation" className="mb-40">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-fuchsia-500 italic">
            01. Foundation
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>

        {/* Calling your DualCore component */}
        <DualCore />
      </section>

      {/* EXECUTION SECTION: Experience & Skills (Coming Next) */}
      <section id="execution" className="opacity-30 pointer-events-none">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 italic">
            02. Execution
          </h2>
          <div className="h-px flex-1 bg-zinc-900" />
        </div>
        {/* <HeroExperience /> */}
      </section>
    </div>
  );
}
