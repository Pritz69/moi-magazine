"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [popup, setPopup] = useState("");

  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      if (!name || !contact) {
        setPopup("Fill the remaining fields to proceed");
        setTimeout(() => setPopup(""), 2500);
        return;
        }

        if (!contact.includes("@") && contact.length < 10) {
        setPopup("Enter a valid email or phone number");
        setTimeout(() => setPopup(""), 2500);
        return;
        }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);

      if (contact.includes("@")) {
        formData.append("email", contact);
      } else {
        formData.append("phone", contact);
      }

      if (age) formData.append("age", age);
      if (location) formData.append("location", location);
      if (instagram) formData.append("instagram", instagram);

      if (file1) formData.append("file1", file1);
      if (file2) formData.append("file2", file2);
      if (file3) formData.append("file3", file3);

      const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/submit`,
        formData
      );

      setMsg(res.data.msg || "Submitted successfully");
      setPopup("Application submitted successfully 🚀");
      setTimeout(() => setPopup(""), 2500);

      setName("");
      setContact("");
      setAge("");
      setLocation("");
      setInstagram("");
      setFile1(null);
      setFile2(null);
      setFile3(null);

    } catch (err: any) {
      const errorData = err.response?.data?.detail;

      if (Array.isArray(errorData)) {
        setMsg(errorData.map((e: any) => e.msg).join(", "));
      } else if (typeof errorData === "string") {
        setMsg(errorData);
      } else {
        let errorMessage = "Submission failed";
        if (Array.isArray(errorData)) {
        errorMessage = errorData.map((e: any) => e.msg).join(", ");
        } else if (typeof errorData === "string") {
        errorMessage = errorData;
        }
        setPopup(errorMessage);
        setTimeout(() => setPopup(""), 3000);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full 
      bg-white/5 backdrop-blur-2xl border border-white/10 
      rounded-2xl p-3 sm:p-6 space-y-3 sm:space-y-4 shadow-2xl"
    >
      <h2 className="text-base sm:text-xl font-medium text-center tracking-wide">
        Submit Your Profile
      </h2>

      <input
        value={name}
        placeholder="Full Name *"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm"
      />

      <input
        value={contact}
        placeholder="Phone *"
        onChange={(e) => setContact(e.target.value)}
        className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-pink-500 text-xs sm:text-sm"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          className="p-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-purple-500 text-xs sm:text-sm"
        />

        <input
          value={location}
          placeholder="Email Id *"
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm"
        />
      </div>

      <input
        value={instagram}
        placeholder="Instagram Id *"
        onChange={(e) => setInstagram(e.target.value)}
        className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-pink-400 text-xs sm:text-sm"
      />

      <div className="space-y-1">
        <p className="text-[10px] sm:text-xs text-gray-400">
          Upload up to 3 images
        </p>

        <div className="grid grid-cols-3 gap-2">
          {[file1, file2, file3].map((file, i) => {
            const setters = [setFile1, setFile2, setFile3];

            return (
              <label
                key={i}
                className="h-16 sm:h-20 rounded-lg border border-white/10 
                bg-white/10 flex items-center justify-center overflow-hidden 
                cursor-pointer hover:bg-white/20 transition"
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">+</span>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setters[i](e.target.files?.[0] || null)
                  }
                />
              </label>
            );
          })}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className={`w-full py-2 rounded-lg 
        bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 
        text-white text-xs sm:text-sm font-medium transition
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-95"}
        `}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>

      {msg && (
        <p className="text-center text-[10px] sm:text-xs text-green-400">
          {msg}
        </p>
      )}
      {popup && (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 
            bg-red-500/90 text-white text-xs sm:text-sm 
            px-4 py-2 rounded-full 
            shadow-xl backdrop-blur-md"
        >
            {popup}
        </motion.div>
        )}
    </motion.div>
  );
}
