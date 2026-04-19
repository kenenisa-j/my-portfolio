// Simplified structure for your admin form
export default function ExperienceForm() {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    impact: "", // Could be an array of strings
    isFeatured: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add to Firestore collection "experience"
    await addDoc(collection(db, "experience"), {
      ...formData,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-zinc-900 rounded-xl space-y-4"
    >
      <input
        type="text"
        placeholder="Role (e.g. AI Engineer)"
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white"
      />
      <input
        type="text"
        placeholder="Company"
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white"
      />
      <input
        type="text"
        placeholder="Duration"
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white"
      />
      <textarea
        placeholder="Impact lines"
        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
        className="w-full p-2 bg-black border border-zinc-700 text-white"
      />
      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          onChange={(e) =>
            setFormData({ ...formData, isFeatured: e.target.checked })
          }
        />
        Featured (INSA/Internships)
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-fuchsia-600 text-white font-bold"
      >
        Publish Log
      </button>
    </form>
  );
}
