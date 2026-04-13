"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  // 1. THE MAIN SWITCH STATE (Foundation vs Execution)
  const [activePillar, setActivePillar] = useState("FOUNDATION");

  // 2. DATA STATES
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  // 3. REAL-TIME FIREBASE LISTENERS
  useEffect(() => {
    // Listener for Education (Foundation Pillar)
    const qEdu = query(
      collection(db, "education"),
      orderBy("createdAt", "asc"),
    );
    const unsubEdu = onSnapshot(qEdu, (snapshot) => {
      setEducation(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Listener for Experience (Execution Pillar)
    const qExp = query(collection(db, "experience"), orderBy("order", "asc"));
    const unsubExp = onSnapshot(qExp, (snapshot) => {
      setExperience(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    });

    // Listener for Skills (Execution Pillar)
    const qSkills = query(
      collection(db, "skills"),
      orderBy("percentage", "desc"),
    );
    const unsubSkills = onSnapshot(qSkills, (snapshot) => {
      setSkills(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubEdu();
      unsubExp();
      unsubSkills();
    };
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        activePillar,
        setActivePillar,
        education,
        experience,
        skills,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
