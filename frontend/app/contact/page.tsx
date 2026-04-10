"use client";

import { useState } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";

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

      const res = await axios.post("process.env.NEXT_PUBLIC_API_URL/contact", formData);

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
      className="min-h-screen text-white relative overflow-x-hidden font-serif"
      onMouseMove={(e) =>
        setMouse({ x: e.clientX, y: e.clientY })
      }
    >
      {/* 🌌 BACKGROUND */}
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
        className="h-[18vh] flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="tracking-[0.5em] font-light text-[clamp(1.6rem,5vw,2.8rem)] flex">
          {"CONTACT".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
      <div className="flex justify-center px-4 pb-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-5 rounded-xl 
          bg-white/[0.04] backdrop-blur-xl 
          border border-white/10 
          shadow-[0_10px_50px_rgba(0,0,0,0.7)]"
        >
          <div className="space-y-3">

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
  focus:border-yellow-400 focus:bg-white/[0.05]"
/>

  <label
  className={`absolute left-4 top-3 text-sm text-gray-400 
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
  focus:border-yellow-400 focus:bg-white/[0.05]"
/>

  <label
  className={`absolute left-4 top-3 text-sm text-gray-400 
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
              whileHover={{ scale: 1.04 }}
              onClick={submit}
              disabled={loading}
              className="w-full py-2 rounded-md 
              bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 
              text-black text-sm font-semibold tracking-wide 
              shadow-lg hover:shadow-xl transition"
            >
              {loading ? "Sending..." : "Submit"}
            </motion.button>

            {/* STATUS */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-xs ${
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
    bg-red-500/90 text-white text-sm px-4 py-2 rounded-lg 
    shadow-lg backdrop-blur-md"
  >
    {popup}
  </motion.div>
)}
    </div>
  );
}
