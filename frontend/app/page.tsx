"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";


export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  const renderAnimatedText = (text: string, highlightWord: string) => {
  return text.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block mr-2">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{
            y: -250,
            opacity: 0,
            rotate: -15,
            scale: 0.8,
            filter: "blur(8px)"
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            filter: "blur(0px)"
          }}
          transition={{
            delay: (wordIndex * 5 + i) * 0.045,
            type: "spring",
            stiffness: 180,
            damping: 12,
            mass: 0.6
          }}
          className={`inline-block ${
            word === highlightWord
              ? "text-yellow-400 font-semibold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
              : "bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
          }`}
        >
          {char}
        </motion.span>
      ))}
    </span>
  ));
};

  useEffect(() => {
    fetchBestWorks();

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchBestWorks = async () => {
    const res = await axios.get(
      "http://localhost:8000/images/bestworks"
    );
    setImages(res.data);
  };

  return (
    <div
      className="min-h-screen font-serif relative overflow-x-hidden text-white scrollbar-hide"
      onMouseMove={(e) =>
        setMouse({ x: e.clientX, y: e.clientY })
      }
    >

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-[#050510]" />
        <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[60vw] h-[60vw] bg-blue-900/20 blur-[120px]" />
      </div>

      {/* 🖱️ MOUSE */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.04), transparent 220px)`
        }}
      />

      {/* 🌌 HERO */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="min-h-[32vh] sm:h-[25vh] flex flex-col items-center justify-start pt-4 relative px-4 sm:px-6"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492724441997-5dc65305da7')] bg-cover bg-center opacity-20" />

        <div className="relative z-10 text-center space-y-4">

          {/* TITLE */}
          <h1 className="tracking-[0.3em] font-light bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-[clamp(1.8rem,5vw,3rem)]">
            MOI MAGAZINE
          </h1>

          {/* TEXT */}
          <div className="font-semibold tracking-wide text-[clamp(1.2rem,4vw,2rem)] leading-tight">
            {renderAnimatedText("Photography is Art", "Art")}
          </div>

          <div className="italic text-gray-400 text-[clamp(0.9rem,3vw,1.2rem)]">
            {renderAnimatedText("Modeling is an Expression", "Expression")}
          </div>

          {/* MOVING TEXT */}
          <div className="overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "linear"
              }}
              className="tracking-[0.4em] uppercase inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-[10px] sm:text-xs"
            >
              Curated Visual Stories • Fashion • Expression • Curated Visual Stories • Fashion • Expression •
            </motion.div>
          </div>

          <p className="text-gray-300 leading-relaxed text-center text-[clamp(0.75rem,2.5vw,1rem)] px-2">
            Monthly Winners Earn{" "}
            <span className="text-yellow-400 font-semibold">
              ₹15,000
            </span>{" "}
            • Register to Participate !
          </p>
        </div>
      </motion.section>

      {/* 🏆 FEATURES */}
      <section className="px-4 sm:px-6 md:px-16 pt-2 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-[clamp(1.2rem,4vw,2rem)]">
            FEATURES
          </h2>
          <div className="h-[1px] bg-gray-700 flex-1"></div>
        </div>

        <p className="text-gray-500 mt-3 max-w-md text-[clamp(0.7rem,2.5vw,0.9rem)]">
          A curated selection of standout visuals capturing elegance, emotion, and storytelling.
        </p>
      </section>

      {/* 🔥 HORIZONTAL SCROLL */}
      <section className="px-4 sm:px-6 md:px-16 pb-10 overflow-x-auto flex gap-4 relative z-10 custom-scroll">

        {images.slice(0, visibleCount).map((img, i) => (
          <motion.div
            key={img.id}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedImage(img)}
          >
            <div className="relative overflow-hidden rounded-xl bg-black">

              <img
                src={img.url}
                className="w-full h-[160px] sm:h-[200px] md:h-[220px] object-contain group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
            </div>

            <div className="mt-2">
              <p className="font-semibold line-clamp-1 text-[clamp(0.75rem,2.5vw,0.95rem)]">
                {img.title}
              </p>
              <p className="text-gray-400 line-clamp-2 text-[clamp(0.65rem,2.3vw,0.8rem)]">
                {img.description}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

            {/* 🖼️ MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-[85%] max-w-xs sm:max-w-sm bg-[#0a0a12]/95 border border-white/10 rounded-2xl shadow-2xl p-4 text-center"
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
        /* Hide horizontal scrollbar (your custom-scroll divs) */
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Hide for Firefox */
        .custom-scroll {
          scrollbar-width: none;
        }

        /* Hide for IE/Edge */
        .custom-scroll {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}