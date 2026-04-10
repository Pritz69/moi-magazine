"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Account() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (emailOrPhone.includes("@")) {
        formData.append("email", emailOrPhone);
      } else {
        formData.append("phone", emailOrPhone);
      }

      formData.append("password", password);

      const url = isLogin
        ? "http://localhost:8000/auth/login"
        : "http://localhost:8000/auth/register";

      const res = await axios.post(url, formData, {
        withCredentials: true,
      });

      setMessage(res.data.msg);

      if (isLogin) {
        localStorage.setItem("user", emailOrPhone);
      }

      setEmailOrPhone("");
      setPassword("");

      setTimeout(() => setMessage(""), 2000);

      if (isLogin) {
        setTimeout(() => {
          window.dispatchEvent(new Event("userChanged"));
        }, 200);

        setTimeout(() => {
          window.dispatchEvent(new Event("userChanged"));
          router.push("/");
        }, 300);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Something went wrong");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div
      className="min-h-screen text-white relative font-serif overflow-hidden flex flex-col items-center justify-start pt-20 px-4"
      onMouseMove={(e) =>
        setMouse({ x: e.clientX, y: e.clientY })
      }
    >
      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#070710] to-[#020205]" />

        <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] bg-purple-700/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[60vw] h-[60vw] bg-blue-700/20 blur-[140px] animate-pulse" />

        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* 🖱️ MOUSE GLOW */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.06), transparent 240px)`
        }}
      />

      {/* 🌟 HERO */}
      <motion.div
        style={{ scale, opacity }}
        className="mb-10 text-center"
      >
        <h1 className="tracking-[0.5em] font-light text-[clamp(1.8rem,5vw,3rem)] flex justify-center">
          {(isLogin ? "LOGIN" : "SIGN UP").split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <p className="text-gray-400 text-xs mt-2">
          Access your account securely
        </p>
      </motion.div>

      {/* 💎 FORM CARD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-4"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-20 blur-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

        {/* Inputs */}
        <div className="space-y-3 relative z-10">
          <input
            value={emailOrPhone}
            placeholder="Email or Phone"
            className="w-full p-3 rounded-lg bg-white/10 text-white text-sm outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />

          <input
            value={password}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-lg bg-white/10 text-white text-sm outline-none focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white text-sm hover:scale-105 active:scale-95 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Switch */}
        <p
          className="text-sm text-gray-400 cursor-pointer text-center hover:text-white transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>

        {/* Message */}
        {message && (
          <div className="text-center text-sm py-2 rounded-lg bg-green-600">
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
}