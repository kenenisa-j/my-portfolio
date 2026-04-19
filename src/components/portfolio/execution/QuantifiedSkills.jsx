"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function QuantifiedSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const snapshot = await getDocs(collection(db, "skills"));
      setSkills(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchSkills();
  }, []);

  return (
    <div className="w-full py-12 px-6">
      <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-8">
        // Technical_Matrix
      </h3>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-300">
              <span>{skill.name}</span>
              <span className="text-fuchsia-500">{skill.proficiency}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
