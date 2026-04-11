"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function Nominations() {
  const [data, setData] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images/nominations`);
    setData(res.data);
  };

  return (
    <div
      className="h-screen overflow-hidden text-white relative font-serif"
      onMouseMove={(e) =>
        setMouse({ x: e.clientX, y: e.clientY })
      }
    >
      {/* 🌌 PREMIUM BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#070710] to-[#020205]" />

        {/* glowing blobs */}
        <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] bg-purple-700/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[60vw] h-[60vw] bg-blue-700/20 blur-[140px] animate-pulse" />

        {/* subtle grid */}
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
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="h-[16vh] flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="tracking-[0.5em] font-light text-[clamp(1.6rem,5vw,2.8rem)] flex">
        {"NOMINATIONS".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            {char}
          </motion.span>
        ))}
      </h1>

        <p className="mt-1 text-gray-400 text-xs sm:text-sm max-w-xs">
          Discover curated talents across categories
        </p>
      </motion.section>

      {/* 🔥 NOMINATIONS */}
      <div className="px-3 pb-3 space-y-6 relative z-10 h-[84vh] overflow-y-auto custom-scroll">

        {data.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {/* TITLE */}
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-lg font-semibold capitalize tracking-wide">
                {group.genre}
              </h2>
              <div className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-1"></div>
            </div>

            {/* 🎬 HORIZONTAL CARDS */}
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scroll">

              {group.images.map((img: any, index: number) => (
                <motion.div
                  key={img.id}
                  className="min-w-[140px] sm:min-w-[190px] cursor-pointer"
                  
                  /* 🪂 FALL ANIMATION */
                  initial={{ y: -120, opacity: 0, rotate: -5 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 80,
                    damping: 12
                  }}

                  onClick={() => setSelectedImage(img)}
                >
                  {/* GLASS CARD */}
                  <div className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">

                    {/* glow ring */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl" />

                    <img
                      src={img.url}
                      className="w-full h-[18vh] sm:h-[21vh] object-contain transition duration-500 group-hover:scale-110"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* TEXT */}
                  <div className="mt-3">
                    <p className="font-medium line-clamp-1 text-[11px] sm:text-xs tracking-wide">
                      {img.title}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </motion.div>
        ))}

      </div>

      {/* 🖼️ PREMIUM MODAL */}
            {/* 🖼️ PREMIUM MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90 }}
            className="relative w-[90%] max-w-md sm:max-w-lg bg-[#0a0a12]/95 border border-white/10 rounded-2xl shadow-2xl p-4 text-center"
          >
            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-white text-lg hover:scale-110 transition"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selectedImage.url}
              className="w-full max-h-[32vh] object-contain rounded-lg"
            />

            {/* TEXT */}
            <div className="mt-3 space-y-1">
              <p className="font-semibold text-sm sm:text-base tracking-wide">
                {selectedImage.title}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                {selectedImage.description}
              </p>
            </div>

          </motion.div>
        </div>
      )}

      {/* 🎯 SCROLLBAR */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }
        .custom-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

    </div>
  );
}
