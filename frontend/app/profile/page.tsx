"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileForm from "@/components/ProfileForm";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("process.env.NEXT_PUBLIC_API_URL/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch {
      router.push("/account");
    }
  };

  useEffect(() => {
    fetchUser();

    const handleUserChange = () => {
      fetchUser();
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Redirecting...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white relative font-serif overflow-hidden"
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
        className="h-[18vh] flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2 }}
          className="tracking-[0.5em] font-light bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent text-[clamp(1.8rem,5vw,3rem)]"
        >
          PROFILE
        </motion.h1>

        <p className="text-gray-400 text-xs mt-2">
          Manage your identity & presence
        </p>
      </motion.div>

      {/* 💎 FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center px-4 pb-10"
      >
        <ProfileForm
          user={user}
          refresh={fetchUser}
          closePopup={() => {}}
        />
      </motion.div>
    </div>
  );
}
