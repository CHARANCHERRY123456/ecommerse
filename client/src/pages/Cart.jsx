// src/pages/Cart.jsx
import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const { token } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data.cart || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remove from cart
  const handleRemove = async (itemId) => {
    setError("");
    try {
      const { data } = await api.post(
        "/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data.cart || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  // Calculate total
  const total = cart.reduce(
    (sum, c) => sum + (c.itemId?.price || 0) * c.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>

      {loading && <p>Loading cart...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {cart.length === 0 && !loading ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((c) => (
            <li key={c.itemId._id}>
              <h4>{c.itemId.name}</h4>
              <p>Category: {c.itemId.category}</p>
              <p>Price: ₹{c.itemId.price}</p>
              <p>Quantity: {c.quantity}</p>
              <button onClick={() => handleRemove(c.itemId._id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
