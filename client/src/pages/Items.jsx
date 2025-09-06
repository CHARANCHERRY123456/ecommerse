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
    <div>
      <h2>Items</h2>

      <div>
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button onClick={fetchItems}>Apply Filters</button>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {addCartError && <p style={{ color: "red" }}>{addCartError}</p>}
      {addCartSuccess && <p style={{ color: "green" }}>{addCartSuccess}</p>}

      {/* Items List */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h4>{item.name}</h4>
            <p>Category: {item.category}</p>
            <p>Price: ₹{item.price}</p>
            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
