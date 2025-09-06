// src/pages/Items.jsx
import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Items() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "" });

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/items", {
        params: {
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
        },
      });
      setItems(data.items);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [addCartError, setAddCartError] = useState("");
  const [addCartSuccess, setAddCartSuccess] = useState("");
  const handleAddToCart = async (itemId) => {
    setAddCartError("");
    setAddCartSuccess("");
    try {
      await api.post(
        "/cart/add",
        { itemId, quantity: 1 }
      );
      setAddCartSuccess("Item added to cart");
      navigate("/cart");
    } catch (err) {
      setAddCartError(err.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Items</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center items-center bg-white p-4 rounded shadow">
          <input
            type="text"
            placeholder="Category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-40"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-32"
          />
          <button
            onClick={fetchItems}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {addCartError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {addCartError}
          </div>
        )}
        {addCartSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {addCartSuccess}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        {/* Items Grid */}
        {!loading && items.length === 0 && (
          <div className="text-center text-gray-500 py-8">No items found.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              {/* Image placeholder */}
              <div className="h-32 w-full bg-gray-200 rounded mb-4 flex items-center justify-center">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="h-full object-cover rounded" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-500 mb-1">Category: {item.category}</p>
              <p className="text-sm text-gray-700 mb-2">Price: ₹{item.price}</p>
              <button
                onClick={() => handleAddToCart(item._id)}
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
