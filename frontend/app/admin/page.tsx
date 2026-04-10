"use client";

import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState("");
  const [category, setCategory] = useState("nominations");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);

    const fetchContacts = async () => {
      const res = await axios.get("http://localhost:8000/admin/contacts", {
        withCredentials: true,
      });
      setContacts(res.data);
    };

  const createGenre = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      const res = await axios.post(
        "http://localhost:8000/admin/genre",
        formData,
        { withCredentials: true }
      );

      alert(res.data.msg);
      setName("");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const upload = async () => {
    try {
      if (!genreId) return alert("Enter genre ID");
      if (!file) return alert("Select a file");

      const formData = new FormData();
      formData.append("genre_id", String(Number(genreId))); // ✅ FIX
      formData.append("category", category);
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      const res = await axios.post(
        "http://localhost:8000/admin/image",
        formData,
        { withCredentials: true }
      );

      alert(res.data.msg);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Upload failed");
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">

      <h1 className="text-xl font-bold">Admin Panel</h1>

      {/* CREATE GENRE */}
      <input
        placeholder="Genre name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-800"
      />
      <button onClick={createGenre} className="bg-white text-black px-4 py-2">
        Create Genre
      </button>

      {/* UPLOAD IMAGE */}
      <input
        placeholder="Genre ID"
        value={genreId}
        onChange={(e) => setGenreId(e.target.value)}
        className="w-full p-2 bg-gray-800"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 bg-gray-800"
      >
        <option value="nominations">Nominations</option>
        <option value="winners">Winners</option>
        <option value="bestworks">Best Works</option>
      </select>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 bg-gray-800"
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 bg-gray-800"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={upload} className="bg-white text-black px-4 py-2">
        Upload Image
      </button>


      <button onClick={fetchContacts}>Load Contacts</button>
      {contacts.map((c) => (
        <div key={c.id} className="bg-gray-800 p-3 rounded">
          <p><b>{c.name}</b></p>
          <p>{c.email}</p>
          <p>{c.phone}</p>
          <p>{c.instagram}</p>
          <p className="text-sm text-gray-400">{c.message}</p>
        </div>
      ))}

    </div>
  );
}