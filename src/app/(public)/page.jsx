"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Components
import Navbar from "../../components/Navbar";
import Hero from "../../components/portfolio/Hero";
import About from "../../components/portfolio/About";
import Projects from "../../components/portfolio/Projects";
import Skills from "../../components/portfolio/Skills";
import Deliverables from "../../components/portfolio/Deliverables";
import Testimonials from "../../components/portfolio/Testimonials";
import ResumeHeader from "../../components/portfolio/ResumeHeader";
import ContactForm from "../../components/portfolio/ContactForm";
import Footer from "../../components/portfolio/Footer";

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
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* EACH SECTION MUST HAVE THE ID THAT NAVBAR LOOKS FOR */}
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects projects={projects} loading={loading} />
      </section>

      <section id="services">
        <Deliverables />
      </section>

      {/* Optional: Add section IDs here if you want them in the Navbar too */}
      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="resume">
        <ResumeHeader />
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
