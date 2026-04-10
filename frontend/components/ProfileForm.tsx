"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProfileForm({ user, refresh, closePopup }: any) {
  const [name, setName] = useState(user.name || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [gender, setGender] = useState(user.gender || "");
  const [bio, setBio] = useState(user.bio || "");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "">("");

  const update = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/update-profile",
        { name, instagram, gender, bio },
        { withCredentials: true }
      );

      setType("success");
      setMessage("Profile updated successfully!");

      setTimeout(() => {
        setMessage("");
        setType("");
      }, 3000);

      refresh();
    } catch {
      setType("error");
      setMessage("Something went wrong ❌");

      setTimeout(() => {
        setMessage("");
        setType("");
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-4"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20 blur-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

      {/* Title */}
      <h2 className="text-lg font-semibold tracking-wide">
        Profile Settings
      </h2>

      {/* Fields */}
      <div className="space-y-3 relative z-10">

        <Input label="Name" value={name} setValue={setName} />
        <Input label="Instagram" value={instagram} setValue={setInstagram} />

        <div className="flex items-center gap-3">
          <label className="w-20 text-gray-300 text-sm">Gender :</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-white/10 text-white text-sm outline-none"
          >
            <option value="" className="text-black">Select</option>
            <option value="Male" className="text-black">Male</option>
            <option value="Female" className="text-black">Female</option>
            <option value="Other" className="text-black">Other</option>
          </select>
        </div>

        <div className="flex items-start gap-3">
          <label className="w-20 text-gray-300 text-sm pt-2">Bio :</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="flex-1 p-2 rounded-lg bg-white/10 text-white text-sm resize-none"
          />
        </div>
      </div>

      {/* Save */}
      <button
        onClick={update}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:scale-105 transition"
      >
        Save Changes
      </button>

      {/* Toast */}
      {message && (
        <div className={`text-center text-sm py-2 rounded-lg ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {message}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => window.history.back()}
          className="w-1/2 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
        >
          Close
        </button>

        <button
          onClick={async () => {
            try {
              await axios.post(
                "http://localhost:8000/auth/logout",
                {},
                { withCredentials: true }
              );

              closePopup();
              window.dispatchEvent(new Event("userChanged"));
              window.location.href = "/account";

            } catch {
              alert("Logout failed");
            }
          }}
          className="w-1/2 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}

/* Reusable Input */
function Input({ label, value, setValue }: any) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-20 text-gray-300 text-sm">{label} :</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-white/10 text-white text-sm outline-none"
      />
    </div>
  );
}