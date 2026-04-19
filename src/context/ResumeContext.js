"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [activePillar, setActivePillar] = useState("FOUNDATION");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const qEdu = query(
      collection(db, "education"),
      orderBy("createdAt", "asc"),
    );
    const unsubEdu = onSnapshot(qEdu, (snapshot) => {
      setEducation(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const qExp = query(collection(db, "experience"), orderBy("order", "asc"));
    const unsubExp = onSnapshot(qExp, (snapshot) => {
      setExperience(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    });

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
