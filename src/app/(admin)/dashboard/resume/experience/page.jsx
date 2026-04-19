"use client";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import ExperienceForm from "../../../../../components/admin/ExperienceForm";
import { Trash2, Shield } from "lucide-react";

export default function ExperienceDashboard() {
  const [logs, setLogs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch experience logs from Firestore
  useEffect(() => {
    const fetchLogs = async () => {
      const q = query(
        collection(db, "experience"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      setLogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchLogs();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (confirm("Delete this production log?")) {
      await deleteDoc(doc(db, "experience", id));
      setRefresh(!refresh);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-black italic uppercase text-white mb-8">
        Manage Production Logs
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="h-fit">
          <ExperienceForm />
        </div>

        {/* List Column */}
        <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
            Active Logs
          </h2>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-start group"
                >
                  <div className="flex gap-4">
                    {log.isFeatured && (
                      <Shield className="text-fuchsia-500 shrink-0" size={20} />
                    )}
                    <div>
                      <p className="text-white font-bold">{log.role}</p>
                      <p className="text-xs text-fuchsia-400 font-mono uppercase tracking-widest">
                        {log.company}
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        {log.duration}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-zinc-600 text-sm italic">
                No logs found in system...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
