"use client";

import { motion, AnimatePresence } from "framer-motion";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export default function RegisterPage() {
  const [showForm, setShowForm] = useState(false);

  // Define editorial images (using high-quality portrait/fashion photography placeholders)
  const editorialImages = [
    {
      url: "https://res.cloudinary.com/drmtzvjtm/image/upload/v1775914448/%E0%A6%9F%E0%A7%81%E0%A6%95%E0%A6%B0%E0%A7%8B_%E0%A6%B8%E0%A7%8D%E0%A6%AE%E0%A7%83%E0%A6%A4%E0%A6%BF_%E0%A6%AE%E0%A6%A8%E0%A7%87%E0%A6%B0_%E0%A6%95%E0%A7%8B%E0%A6%A3%E0%A7%87_...._trending_followkaropublic_followforfollowback_followers_fo_2_z8zgon.jpg",
      type: "PORTRAITS",
      aspect: "aspect-[2/3]",
    },
    {
      url: "https://res.cloudinary.com/drmtzvjtm/image/upload/v1775913950/1_x3beav.jpg",
      type: "BOLDS",
      aspect: "aspect-[4/5]",
    },
    {
      url: "https://res.cloudinary.com/drmtzvjtm/image/upload/v1775913105/%E0%A6%8F%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87%E0%A6%93_%E0%A6%A4%E0%A7%8B_%E0%A6%AC%E0%A6%B2%E0%A6%A4%E0%A7%87_%E0%A6%AA%E0%A6%BE%E0%A6%B0%E0%A7%8B_......._likeforlikes_bonggirl_instagram_likeforlike_picoftheday_two4r6.webp",
      type: "LIFESTYLE",
      aspect: "aspect-[2/3]",
    },
  ];

  // Framer Motion Variants for Staggered Children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Delay between each image animating in
        delayChildren: 1.1, // Wait for the button animation to finish
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
        ease: "easeOut",
      },
    },
  }as const;

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
        className={`flex flex-col items-center justify-start text-center px-4 transition-all duration-700 ease-in-out
        ${
          showForm
            ? "pt-12 pb-6 min-h-[15vh]"
            : "min-h-[100vh] pt-16 sm:pt-20 pb-12 sm:pb-16"
        }`}
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(1.8rem,7vw,3.8rem)] font-light tracking-wide sm:tracking-widest bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
        >
          BECOME THE NEXT ICON
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 sm:mt-6 max-w-lg text-gray-300 text-[clamp(0.85rem,3.5vw,1.1rem)] leading-relaxed"
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
          className="mt-4 sm:mt-5 text-yellow-400 text-sm sm:text-lg font-medium tracking-wide"
        >
          Monthly Winners Earn ₹15,000 + National Exposure
        </motion.p>

        {!showForm && (
          <>
            <motion.button
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={() => setShowForm(true)}
              className="mt-10 sm:mt-12 mb-30 sm:mb-24 px-4 sm:px-12 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-semibold shadow-2xl hover:scale-105 hover:shadow-purple-500/20 transition duration-300"
            >
              Start Your Journey
            </motion.button>

            {/* ✨ 📸 EDITORIAL ANIMATED COLLAGE */}
            {/* Added relative position and negative z-index to ensure it sits behind the button if needed, but in front of bg */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-6xl mx-auto grid grid-cols-3 gap-3 md:gap-5 px-2 md:px-0 mt-[-60px] mb-4 items-end pointer-events-none"
            >
              {editorialImages.map((img, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`${img.aspect} relative group rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]`}
                >
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

                  {/* Image */}
                  <img
                    src={img.url}
                    alt={img.type}
                    className="w-full h-full object-cover transition-transform duration-[3s] ease-out scale-105 group-hover:scale-110"
                  />

                  {/* Typography/Metadata */}
                  <div className="absolute bottom-2 md:bottom-3 left-2 md:left-4 z-20 text-left">
                    <p className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] text-gray-400">
                      MOI
                    </p>
                    <p className="text-[clamp(0.6rem,2vw,1.1rem)] font-light tracking-wider text-white mt-0.5 md:mt-1">
                      {img.type}
                    </p>
                  </div>

                  {/* Aesthetic Corner Border Accent */}
                  <div className="absolute top-3 right-3 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-white/20 rounded-tr-sm z-20" />
                </motion.div>
              ))}
            </motion.div>

            {/* 🔗 SOCIAL ICONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }} // Delayed further to let the collage finish
              className="flex gap-5 mt-auto pb-4"
            >
              {[
                { Icon: FaFacebookF, link: "https://facebook.com" },
                { Icon: FaInstagram, link: "https://instagram.com" },
                { Icon: FaEnvelope, link: "mailto:test@example.com" },
                { Icon: SiThreads, link: "https://threads.net" },
                { Icon: FaXTwitter, link: "https://x.com" },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="p-3.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:shadow-lg transition duration-300 flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-gray-400 group-hover:text-white transition"
                    />
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Cinematic ease-out
            className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-10 pb-4"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />

            {/* Popup Container */}
            <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto custom-scroll">
              {/* ❌ Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 z-10 text-gray-400 bg-white/5 hover:bg-white/10 rounded-full px-3.5 py-1.5 text-sm transition"
              >
                ✕
              </button>

              <RegisterForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide Scrollbar Style */}
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