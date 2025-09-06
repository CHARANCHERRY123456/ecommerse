// src/pages/AddItem.jsx
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.price || !form.category) {
      setError("Name, price, and category are required.");
      return;
    }
    try {
      await api.post("/items", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        imageUrl: form.imageUrl
      });
      setSuccess("Item added successfully!");
      setTimeout(() => navigate("/items"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Item</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>
        )}
        <div className="mb-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <input
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-6">
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
