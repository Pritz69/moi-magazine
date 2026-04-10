"use client";

import { motion, AnimatePresence } from "framer-motion";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export default function RegisterPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-[#050510]" />
        <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[60vw] h-[60vw] bg-blue-900/20 blur-[120px]" />
      </div>

      {/* HERO */}
      <section
        className={`flex flex-col items-center justify-start pt-20 text-center px-4 transition-all duration-500
        ${showForm ? "pt-16 pb-6" : "min-h-[85vh] pt-10 pb-16"}`}
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(1.8rem,7vw,3.5rem)] font-light tracking-wide sm:tracking-widest bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
        >
          BECOME THE NEXT ICON
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-6 max-w-lg text-gray-300 text-[clamp(0.85rem,3.5vw,1.1rem)] leading-relaxed"
        >
          Step into a curated world where{" "}
          <span className="text-white font-semibold">
            talent meets recognition
          </span>
          . Get featured. Get discovered. Get rewarded.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 sm:mt-4 text-yellow-400 text-sm sm:text-lg"
        >
          Monthly Winners Earn ₹15,000 + National Exposure
        </motion.p>

        {!showForm && (
  <>
    <motion.button
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8 }}
      onClick={() => setShowForm(true)}
      className="mt-8 sm:mt-10 px-8 sm:px-10 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-semibold shadow-xl hover:scale-105 transition"
    >
      Start Your Journey
    </motion.button>

            {/* 🔗 SOCIAL ICONS */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 mt-30"
            >
            {[
                { Icon: FaFacebookF, link: "https://facebook.com" },
                { Icon: FaInstagram, link: "https://instagram.com" },
                { Icon: FaEnvelope, link: "mailto:test@example.com" },
                { Icon: SiThreads, link: "https://threads.net" },
                { Icon: FaXTwitter, link: "https://x.com" }
            ].map(({ Icon, link }, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                <div className="p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition flex items-center justify-center">
                    <Icon size={16} className="text-white" />
                </div>
                </a>
            ))}
            </motion.div>
        </>
        )}
      </section>

      {/* 🔽 FORM POPUP */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-10 pb-4"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />

            {/* Popup Container */}
            <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
              
              {/* ❌ Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 z-10 text-white bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 text-sm"
              >
                ✕
              </button>

              <RegisterForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}