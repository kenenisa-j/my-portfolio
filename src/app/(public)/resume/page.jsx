import ResumeHeader from "@/components/portfolio/ResumeHeader";

export default function PublicResumePage() {
  return (
    // Remove "bg-black" so the Layout background shows through
    <main className="min-h-screen overflow-x-hidden">
      <ResumeHeader />
    </main>
  );
}
