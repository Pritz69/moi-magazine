"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
//import ProfileForm from "./ProfileForm";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
 // const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
  withCredentials: true,
});
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener("userChanged", fetchUser);
    return () => {
      window.removeEventListener("userChanged", fetchUser);
    };
  }, []);

  const logout = () => {
  document.cookie = "token=; Max-Age=0";
  setUser(null);

  // 🔥 notify whole app
  window.dispatchEvent(new Event("userChanged"));

  // 🔥 redirect if on protected page
  window.location.href = "/account";
};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">

      {/* 🌌 GRADIENT GLOW LINE */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="flex justify-between items-center px-4 sm:px-8 py-3">

        {/* 🏷️ LOGO */}
        <div className="flex flex-col leading-tight cursor-pointer select-none">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(1rem,2.5vw,1.5rem)] font-light tracking-[0.25em] 
            bg-gradient-to-r from-white via-gray-300 to-gray-500 
            bg-clip-text text-transparent"
          >
            THE MOI MAGAZINE
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] text-gray-500 uppercase"
          >
            Models Of India
          </motion.span>
        </div>

        {/* 🖥️ DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm items-center">

          {[
            { name: "HOME", href: "/" },
            { name: "REGISTER", href: "/register" },
            { name: "NOMINATIONS", href: "/nominations" },
            { name: "WINNERS", href: "/winners" },
            { name: "CONTACT", href: "/contact" },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="relative group">
              <span className="tracking-wider text-gray-300 group-hover:text-white transition">
                {item.name}
              </span>

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link href="/admin" className="text-yellow-400">
              ADMIN
            </Link>
          )}

          {!user ? (
  <Link href="/account" className="text-gray-300 hover:text-white">
    ACCOUNT
  </Link>
) : (
  <Link
    href="/profile"
    className="text-green-400 hover:scale-105 transition"
  >
    {user.name || "Complete Profile"}
  </Link>
)}
        </div>

        {/* 📱 MOBILE BUTTON */}
        <button
          className="md:hidden text-xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-5 items-center"
          >

            {[
              { name: "HOME", href: "/" },
              { name: "REGISTER", href: "/register" },
              { name: "NOMINATIONS", href: "/nominations" },
              { name: "WINNERS", href: "/winners" },
              { name: "CONTACT", href: "/contact" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 text-sm tracking-wider hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link href="/admin" onClick={() => setMenuOpen(false)}>
                ADMIN
              </Link>
            )}

            {!user ? (
              <Link href="/account" onClick={() => setMenuOpen(false)}>
                ACCOUNT
              </Link>
            ) : (
              <Link
  href="/profile"
  onClick={() => setMenuOpen(false)}
  className="text-green-400"
>
  {user.name || "Complete Profile"}
</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
