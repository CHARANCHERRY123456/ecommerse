// src/pages/Cart.jsx
import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

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
      toast.success("Item removed from cart");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to remove item";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // Calculate total
  const total = cart.reduce(
    (sum, c) => sum + (c.itemId?.price || 0) * c.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-600">Review your selected items</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <span className="ml-3 text-gray-600 font-medium">Loading your cart...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && cart.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
            <a 
              href="/items" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </a>
          </div>
        )}

        {/* Cart Items */}
        {!loading && cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Items in your cart</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.map((c) => (
                <div
                  key={c.itemId._id}
                  className="p-6 hover:bg-gray-50 transition duration-200"
                >
                  <div className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      {c.itemId.imageUrl ? (
                        <img 
                          src={c.itemId.imageUrl} 
                          alt={c.itemId.name} 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{c.itemId.name}</h3>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                          {c.itemId.category}
                        </span>
                        <span>Quantity: {c.quantity}</span>
                      </div>
                      <p className="mt-2 text-xl font-bold text-gray-900">₹{c.itemId.price}</p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(c.itemId._id)}
                      className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out font-medium shadow-sm hover:shadow-md flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-600">Total Amount:</span>
                <span className="text-2xl font-bold text-gray-900">₹{total}</span>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 ease-in-out font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
