"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Ensure this path is correct based on your move
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Hero from "../../components/portfolio/Hero";
import About from "../../components/portfolio/About";
import Projects from "../../components/portfolio/Projects";
import Skills from "../../components/portfolio/Skills";
import Deliverables from "../../components/portfolio/Deliverables";
export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* HERO SECTION - Now includes your animated roles and photo */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Deliverables />
      {/* PROJECTS SECTION */}

      {/* Footer Placeholder for later */}
      <footer className="py-10 text-center text-zinc-600 text-sm border-t border-zinc-900">
        © {new Date().getFullYear()} Kenenisa Jaleto. Built with Next.js &
        Firebase.
      </footer>
    </main>
  );
}
