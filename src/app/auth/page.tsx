"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, signup } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setError("Please enter your name.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const res = await login(email, password || undefined);
        if (res.success) {
          router.push("/profile");
        } else {
          setError(res.error || "Login failed.");
        }
      } else {
        const res = await signup(email, name, password || undefined);
        if (res.success) {
          router.push("/profile");
        } else {
          setError(res.error || "Registration failed.");
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full border border-white/10 bg-zinc-950 p-8 md:p-10 relative overflow-hidden">
        
        {/* Subtle decorative grid/glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="text-center mb-8">
          <span className="text-[10px] tracking-[0.25em] text-zinc-500 font-bold uppercase block mb-2">
            AUTHENTICATION
          </span>
          <h2 className="text-3xl font-black tracking-widest uppercase">
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
          </h2>
          <p className="text-zinc-500 text-xs mt-2">
            Access your orders, wishlist, and customized experience.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`flex-1 pb-3 text-xs font-black tracking-widest uppercase transition-all duration-300 ${
              isLogin
                ? "text-white border-b-2 border-white"
                : "text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent"
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`flex-1 pb-3 text-xs font-black tracking-widest uppercase transition-all duration-300 ${
              !isLogin
                ? "text-white border-b-2 border-white"
                : "text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Error Messaging */}
        {error && (
          <div className="bg-red-950/20 border border-red-900/50 p-4 mb-6 text-xs text-red-400 font-medium">
            <span className="font-bold mr-1">ERROR:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field (Sign Up Only) */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                FULL NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-all font-mono"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-all font-mono"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                PASSWORD
              </label>
              {isLogin && (
                <span className="text-[9px] font-bold tracking-wider text-zinc-600 hover:text-white transition-colors cursor-pointer uppercase">
                  Forgot Password?
                </span>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-all font-mono"
              minLength={6}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-white text-black font-black text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 mt-8 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                PROCESSING...
              </span>
            ) : isLogin ? (
              "SIGN IN TO ACCOUNT"
            ) : (
              "CREATE ACCOUNT NOW"
            )}
          </button>
        </form>

        {/* Informative Footer */}
        <p className="text-[10px] text-zinc-600 text-center mt-6 uppercase leading-relaxed tracking-wider">
          Secure checkout powered by DRAVEN engine. <br />
          By continuing, you agree to our terms of service.
        </p>

      </div>
    </div>
  );
}
