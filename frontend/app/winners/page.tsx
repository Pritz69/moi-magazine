"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export default function Winners() {
  const [data, setData] = useState<any[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [openSocial, setOpenSocial] = useState<number | null>(null);

  // ✅ NEW STATE (does not affect anything else)
  const [showSocialPopup, setShowSocialPopup] = useState(false);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("process.env.NEXT_PUBLIC_API_URL/images/winners");
    setData(res.data);
  };

  return (
    <div
      className="h-screen overflow-hidden text-white relative font-serif"
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
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="h-[16vh] flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="tracking-[0.5em] font-light bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent text-[clamp(1.6rem,5vw,2.8rem)] drop-shadow-[0_0_20px_rgba(255,200,0,0.3)]"
        >
          WINNERS
        </motion.h1>

        <p className="mt-1 text-gray-400 text-xs sm:text-sm max-w-xs">
          Celebrating excellence across all categories
        </p>
      </motion.section>

      {/* 🏆 CONTENT */}
      <div className="px-3 pb-3 space-y-6 relative z-10 h-[84vh] overflow-y-auto custom-scroll">

        {/* 🔘 SOCIALS (TOP POSITIONED) */}
        <div className="relative flex justify-center mb-16">

          <button
            onClick={() => setShowSocialPopup(true)}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition"
          >
            Socials
          </button>

          {/* 📦 POPUP */}
          {showSocialPopup && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-xl">

              {/* CLOSE */}
              <button
                onClick={() => setShowSocialPopup(false)}
                className="absolute top-2 right-3 text-white text-lg"
              >
                ✕
              </button>

              {/* ICONS */}
              <div className="flex gap-4 mt-4">
                {[
                  { Icon: FaFacebookF, link: "https://facebook.com" },
                  { Icon: FaInstagram, link: "https://instagram.com" },
                  { Icon: FaEnvelope, link: "mailto:test@example.com" },
                  { Icon: SiThreads, link: "https://threads.net" },
                  { Icon: FaXTwitter, link: "https://x.com" }
                ].map(({ Icon, link }, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                    <div className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-110 transition flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                  </a>
                ))}
              </div>

            </div>
          )}
        </div>

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

            {/* GRID */}
            {/* HORIZONTAL SCROLL */}
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scroll">

              {group.images.map((img: any, index: number) => (
                <motion.div
                  key={img.id}
                  className="min-w-[140px] sm:min-w-[180px] md:min-w-[200px] cursor-pointer"
                  onClick={() => setSelectedImage(img)}

                  initial={{ y: -120, opacity: 0, rotate: -4 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 80,
                    damping: 12
                  }}
                >
                  {/* CARD */}
                  <div className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-pink-500/20 blur-xl" />

                    <div className="w-full h-44 flex items-center justify-center bg-black/40">
                      <img
                        src={img.url}
                        className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* TEXT */}
                  <div className="mt-3 space-y-1">
                    <p className="text-sm font-semibold line-clamp-1 tracking-wide">
                      {img.title}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {img.description}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>

          </motion.div>
        ))}

      </div>

      {/* 🖼️ MODAL */}
            {/* 🖼️ MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-[85%] max-w-xs sm:max-w-sm bg-[#0a0a12]/95 border border-white/10 rounded-2xl shadow-2xl p-4 text-center"
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-3 text-white text-lg hover:scale-110 transition"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selectedImage.url}
              className="w-full max-h-[22vh] object-contain rounded-lg"
            />

            {/* TEXT */}
            <div className="mt-3 space-y-1">
              <p className="font-semibold text-sm sm:text-base">
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
