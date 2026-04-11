"use client";

import { useState } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // These are for the top hero section only
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const submit = async () => {
    try {
      // ✅ VALIDATION
      if (!name || !email || !phone || !message) {
        setPopup("Please fill all required fields");
        setTimeout(() => setPopup(""), 2500);
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("instagram", instagram);
      formData.append("message", message);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, formData);

      setStatus(res.data.msg);

      setName("");
      setEmail("");
      setPhone("");
      setInstagram("");
      setMessage("");

      setTimeout(() => setStatus(""), 3000);
    } catch (err: any) {
      setStatus(err.response?.data?.detail || "Failed to send");
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden font-serif scroll-smooth"
      onMouseMove={(e) =>
        setMouse({ x: e.clientX, y: e.clientY })
      }
      style={{ scrollBehavior: "smooth" }}
    >
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#070710] to-[#020205]" />

        {/* glowing blobs */}
        <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] bg-purple-700/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[60vw] h-[60vw] bg-blue-700/20 blur-[140px] animate-pulse" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* 🖱️ MOUSE GLOW */}
      <div
        className="pointer-events-none absolute  inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.06), transparent 240px)`
        }}
      />

      {/* 🌟 HERO: ABOUT US */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="h-[14vh] flex flex-col items-center justify-center text-center px-4 mt-1"
      >
        <h1 className="tracking-[0.5em] font-light text-[clamp(1.6rem,5vw,2.8rem)] flex">
          {"ABOUT US".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,200,0,0.3)]"
            >
              {/* FIX 2: Render non-breaking space if the character is empty */}
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </motion.section>

      {/* ✨ PREMIUM EDITORIAL ABOUT/SERVICES SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex justify-center px-4 mb-8 relative z-10 w-full -mt-2"
      >
        <div className="w-full max-w-4xl relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-pink-500/20 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative w-full p-8 md:p-12 rounded-2xl bg-[#050508]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>

            <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center md:items-stretch">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h2 className="text-[0.65rem] tracking-[0.4em] font-light text-yellow-400/80 uppercase">
                      The #1 Destination of Visual Arts
                    </h2>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white drop-shadow-md">
                    We don't just publish. <br className="hidden md:block" />
                    <span className="italic text-gray-400">We define eras.</span>
                  </h3>
                </div>
                
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  Recognized as an award-winning platform, we are the nexus where raw talent meets national exposure. Whether you are a <span className="text-white font-medium">model</span> seeking the perfect lens, a <span className="text-white font-medium">photographer</span> scouting for your next muse, or a visionary looking for groundbreaking <span className="text-white font-medium">collaborations</span>—we provide the ultimate stage. Step into the spotlight and let your artistry be immortalized in our premier pages.
                </p>
              </div>

              <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <div className="w-full md:w-[260px] flex flex-col justify-center space-y-6 text-center md:text-left">
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-light bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,165,0,0.3)] inline-block">
                    1000+
                  </div>
                  <div className="text-[0.65rem] text-gray-400 uppercase tracking-[0.3em] mt-2">
                    Weekly Visitors
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-center md:justify-start gap-1 text-yellow-400/80 text-xs">
                    ✦ ✦ ✦ ✦ ✦
                  </div>
                  <p className="text-[0.7rem] text-gray-400 font-light italic leading-relaxed">
                    Backed by immense public love and trusted by top-tier entertainment houses nationwide. Your feature guarantees extreme reach and industry prestige.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🌟 CONTACT HEADER */}
      {/* FIX 1: Removed heroOpacity and heroScale. Added whileInView so it triggers when scrolled to */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true}}
        className="h-[14vh] flex flex-col items-center justify-center text-center px-4 mt-6"
      >
        <h1 className="tracking-[0.5em] font-light text-[clamp(1.6rem,5vw,2.8rem)] flex">
          {"CONTACT".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,200,0,0.3)]"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <p className="mt-2 text-gray-400 text-xs sm:text-sm max-w-xs">
          We'd love to hear from you
        </p>
      </motion.section>

      {/* ✨ FORM SECTION */}
      <div className="flex justify-center px-4 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-5 md:p-7 rounded-xl 
          bg-white/[0.04] backdrop-blur-xl 
          border border-white/10 
          shadow-[0_10px_50px_rgba(0,0,0,0.7)]"
        >
          <div className="space-y-4">
            {/* INPUTS */}
            {[
              { value: name, set: setName, label: "Name" },
              { value: email, set: setEmail, label: "Email" },
              { value: phone, set: setPhone, label: "Phone" },
              { value: instagram, set: setInstagram, label: "Instagram" }
            ].map((field, i) => (
              <div key={i} className="relative">
                <input
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.value ? field.label : ""}
                  className="peer w-full px-4 py-3 text-sm rounded-lg 
                  bg-white/[0.03] text-white
                  border border-white/10
                  outline-none transition
                  focus:border-yellow-400/50 focus:bg-white/[0.05]"
                />
                <label
                  className={`pointer-events-none absolute left-4 top-3 text-sm text-gray-400 
                  transition-all duration-200
                  ${field.value ? "opacity-0 -translate-y-1" : "opacity-100"}
                  peer-focus:opacity-0`}
                >
                  {field.label}
                </label>
              </div>
            ))}

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder={message ? "Message" : ""}
                className="peer w-full px-4 py-3 text-sm rounded-lg 
                bg-white/[0.03] text-white
                border border-white/10
                outline-none transition
                focus:border-yellow-400/50 focus:bg-white/[0.05]"
              />
              <label
                className={`pointer-events-none absolute left-4 top-3 text-sm text-gray-400 
                transition-all duration-200
                ${message ? "opacity-0 -translate-y-1" : "opacity-100"}
                peer-focus:opacity-0`}
              >
                Message
              </label>
            </div>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={submit}
              disabled={loading}
              className="w-full py-3 mt-2 rounded-lg 
              bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 
              text-black text-sm font-semibold tracking-widest uppercase
              shadow-[0_0_20px_rgba(255,165,0,0.2)] hover:shadow-[0_0_30px_rgba(255,165,0,0.4)] transition-shadow"
            >
              {loading ? "Sending..." : "Submit Inquiry"}
            </motion.button>

            {/* STATUS */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-xs tracking-wide ${
                  status.toLowerCase().includes("fail")
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {status}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      {popup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 
          bg-red-500/90 text-white text-sm px-6 py-3 rounded-lg 
          shadow-lg backdrop-blur-md tracking-wide"
        >
          {popup}
        </motion.div>
      )}
    </div>
  );
}