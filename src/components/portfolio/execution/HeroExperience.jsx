"use client";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Terminal, Shield, Briefcase } from "lucide-react";

export default function HeroExperience() {
  const [logs, setLogs] = useState([]);

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
  }, []);

  return (
    <div className="w-full py-20 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-12">
        <Terminal className="text-fuchsia-500" size={24} />
        <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">
          System_Production_Logs
        </h2>
      </div>

      <div className="space-y-6">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`group relative p-8 bg-[#0a0a0d] border ${log.isFeatured ? "border-fuchsia-500/30" : "border-zinc-800"} rounded-2xl transition-all hover:border-white/20`}
          >
            {/* Log Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{log.role}</h3>
                <p className="text-fuchsia-400 font-mono text-sm uppercase tracking-widest">
                  {log.company}
                </p>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono px-3 py-1 border border-zinc-800 rounded-full">
                {log.duration}
              </span>
            </div>

            {/* Log Body */}
            <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-6 group-hover:border-fuchsia-500 transition-colors">
              {log.impact}
            </p>

            {log.isFeatured && (
              <div className="absolute top-4 right-4 text-fuchsia-500">
                <Shield size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
