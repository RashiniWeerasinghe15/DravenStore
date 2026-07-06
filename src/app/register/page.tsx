"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      router.push("/");
    } catch {
      setError("Could not create account. Email may already be in use.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-24">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <svg width="40" height="32" viewBox="0 0 200 156" fill="none">
          <path d="M10 30 H95 C108 30 116 36 122 46 L100 110 L78 46 C72 34 60 30 47 30 Z" fill="white" />
          <path d="M190 30 H105 C118 30 128 38 132 50 C137 64 148 70 160 70 L190 30 Z" fill="white" />
          <path d="M97 60 L100 130 L103 60 Z" fill="white" />
          <polygon points="100,118 96,128 104,128" fill="#dc2626" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-white text-center mb-2">
        Create Account
      </h1>
      <p className="text-zinc-500 text-sm text-center mb-8">
        Join DRAVEN and define your legacy
      </p>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
        />
        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
        />
        <button
          onClick={handle}
          disabled={loading}
          className="w-full bg-white text-black font-bold text-xs tracking-widest py-4 hover:bg-zinc-200 disabled:opacity-50 transition-colors"
        >
          {loading ? "CREATING..." : "CREATE ACCOUNT"}
        </button>
      </div>

      <p className="text-center text-zinc-500 text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-white underline">
          Log in
        </Link>
      </p>
    </div>
  );
}