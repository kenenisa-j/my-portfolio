"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (authError) {
      setError("Login failed. Check your email and password.");
      console.error("Login error", authError);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center text-white">
          <div className="mb-4 animate-pulse text-green-400 uppercase tracking-widest text-sm">
            Synchronizing with the server...
          </div>
          <div className="h-2 w-48 rounded-full bg-zinc-700 animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#09090b] p-10 shadow-2xl shadow-black/30">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">
            Admin Portal
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight">
            Sign in to continue
          </h1>
          <p className="mt-3 text-zinc-500 text-sm">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-600/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-3 w-full rounded-3xl border border-zinc-800 bg-[#070707] px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
              placeholder="admin@example.com"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-3 w-full rounded-3xl border border-zinc-800 bg-[#070707] px-5 py-4 text-white outline-none transition focus:border-fuchsia-500"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-3xl bg-fuchsia-600 px-5 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.35em] text-zinc-600">
          Powered by Firebase Auth
        </p>
      </div>
    </div>
  );
}
