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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/images/bestworks`);
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

      {/* ✨ FLOATING EDITORIAL COLLAGE (IMAGES ONLY - 3D MOTION) */}
      <section className="relative w-full py-8 sm:py-12 px-4 sm:px-6 md:px-16 -mt-4 sm:mt-6 overflow-hidden flex justify-center items-center border-t border-white/5 bg-gradient-to-b from-transparent to-black/80">
        
        {/* BACKGROUND GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-purple-900/10 rounded-full blur-[60px] pointer-events-none" />

        {/* 🌀 INFINITE ZOOM TUNNEL EFFECT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute border border-dashed border-white/10 rounded-full aspect-square"
              initial={{ width: "5%", opacity: 0 }}
              animate={{ 
                width: ["5%", "150%"], 
                opacity: [0, 0.4, 0],
                rotate: [0, i % 2 === 0 ? 120 : -120] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 9, 
                ease: "linear", 
                delay: i * 3 // Staggers the rings for a continuous stream
              }}
            />
          ))}
        </div>

        {/* 📸 Scaled-Down Floating "Editorial Collage" */}
        <div className="relative w-full max-w-[300px] sm:max-w-[500px] h-[260px] sm:h-[400px] flex items-center justify-center [perspective:1200px]">

          {/* Image 1 (Back/Left - Grayscale) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.1, z: -1000, x: -100, y: 100, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, z: 0, x: 0, y: 0, rotate: -8 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-0 sm:left-4 top-4 sm:top-10 z-0"
          >
            {/* Inner div handles the infinite floating after the entrance */}
            <motion.div 
              animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-[100px] sm:w-[160px] aspect-[4/5] bg-white p-1 pb-6 sm:p-1.5 sm:pb-8 shadow-[0_15px_30px_rgba(0,0,0,0.6)] rounded-sm"
            >
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400" 
                className="w-full h-full object-cover grayscale opacity-90" 
                alt="Fashion Left" 
              />
            </motion.div>
          </motion.div>

          {/* Image 2 (Front/Center - Main Focus) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.1, z: -1500, y: 150 }}
            whileInView={{ opacity: 1, scale: 1, z: 0, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute z-10"
          >
            <motion.div
              animate={{ y: [0, -12, 0], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-[130px] sm:w-[220px] aspect-[3/4] p-1 sm:p-1.5 bg-[#050505] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-md overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                alt="Fashion Center" 
              />
            </motion.div>
          </motion.div>

          {/* Image 3 (Right/Bottom - Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.1, z: -800, x: 100, y: 50, rotate: 45 }}
            whileInView={{ opacity: 1, scale: 1, z: 0, x: 0, y: 0, rotate: 6 }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute right-0 sm:right-4 bottom-4 sm:bottom-12 z-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-[90px] sm:w-[150px] aspect-square bg-white/5 backdrop-blur-md p-1 sm:p-1.5 border border-white/10 rounded-xl shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400" 
                className="w-full h-full object-cover rounded-lg" 
                alt="Fashion Right" 
              />
            </motion.div>
          </motion.div>

        </div>
      </section>

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
      {/* 🔥 AUTO-SCROLLING BEST WORKS */}
<section className="relative z-10 overflow-hidden py-10">
  <motion.div
    className="flex gap-4"
    animate={{
      x: ["0%", "-50%"], // Moves halfway because the list is doubled
    }}
    transition={{
      ease: "linear",
      duration: 25, // Adjust this number to change speed (higher = slower)
      repeat: Infinity,
    }}
    // Optional: Pause on hover
    whileHover={{ animationPlayState: "paused" }}
  >
    {/* Render the images twice for a seamless loop */}
    {[...images].map((img, i) => (
      <div
        key={`${img.id}-${i}`} // Unique key for the duplicated items
        className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] group cursor-pointer"
        onClick={() => setSelectedImage(img)}
      >
        <div className="relative overflow-hidden rounded-xl bg-black">
          <img
            src={img.url}
            alt={img.title}
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
      </div>
    ))}
  </motion.div>
</section>

            {/* 🖼️ MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-[92%] max-w-sm sm:max-w-md md:max-w-lg bg-[#0a0a12]/95 border border-white/10 rounded-2xl shadow-2xl p-4 text-center"
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
              className="w-full max-h-[35vh] sm:max-h-[45vh] object-contain rounded-lg"
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
