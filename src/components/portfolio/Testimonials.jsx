"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  if (data.length === 0) return null;

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h3 className="text-[10px] uppercase tracking-[1em] text-fuchsia-500/80 mb-4 font-black">
            WHAT_PEOPLE_SAY
          </h3>
          <h2 className="text-7xl font-black uppercase tracking-tighter text-white">
            Testimonials
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {data.map((t) => (
            <div
              key={t.id}
              className="relative p-12 bg-[#080808] border border-zinc-900 rounded-[3rem] shadow-2xl transition-all duration-700 hover:border-fuchsia-500/40 group"
            >
              <Quote
                className="absolute top-10 right-10 text-zinc-900 group-hover:text-fuchsia-500/10 transition-colors"
                size={80}
              />

              <div className="flex items-center gap-8 mb-10 relative z-10">
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-fuchsia-500 rounded-full blur opacity-20 group-hover:opacity-50 transition-opacity" />
                  <img
                    src={t.avatar}
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-fuchsia-500 bg-zinc-900"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="font-black uppercase text-2xl tracking-tighter text-fuchsia-500 italic leading-none">
                    {t.clientName}
                  </h4>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2 font-bold">
                    {t.clientRole}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 mb-8 text-fuchsia-500 relative z-10">
                {[...Array(parseInt(t.rating || 5))].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" stroke="none" />
                ))}
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed italic font-medium relative z-10 group-hover:text-zinc-200 transition-colors">
                "{t.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
