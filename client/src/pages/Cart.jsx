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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading cart...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && cart.length === 0 && (
          <div className="text-center text-gray-500 py-8">Your cart is empty</div>
        )}

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((c) => (
            <div
              key={c.itemId._id}
              className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center justify-between hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 w-full">
                {/* Image placeholder */}
                <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center">
                  {c.itemId.imageUrl ? (
                    <img src={c.itemId.imageUrl} alt={c.itemId.name} className="h-full object-cover rounded" />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{c.itemId.name}</h4>
                  <p className="text-sm text-gray-500">Category: {c.itemId.category}</p>
                  <p className="text-sm text-gray-700">Price: ₹{c.itemId.price}</p>
                  <p className="text-sm text-gray-700">Quantity: {c.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(c.itemId._id)}
                className="mt-4 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-8 text-right">
          <h3 className="text-xl font-bold text-gray-800">Total: ₹{total}</h3>
        </div>
      </div>
    </div>
  );
}
