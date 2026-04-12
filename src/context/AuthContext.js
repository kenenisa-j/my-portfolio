"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("firebase-auth-token", { path: "/" });
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    }
  };

  // FIX: Added 'loading' to the value object below
  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
          <p className="animate-pulse text-green-500 uppercase tracking-widest text-[10px]">
            System_Syncing...
          </p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
