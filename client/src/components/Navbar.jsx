// src/components/Navbar.jsx
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-10 bg-blue-900 text-white shadow flex justify-between items-center px-6 py-3">
      <div className="flex gap-6 items-center">
        <Link to="/items" className="font-semibold hover:text-blue-300 transition">Items</Link>
        <Link to="/cart" className="font-semibold hover:text-blue-300 transition">Cart</Link>
        {token && (
          <Link to="/add-item" className="font-semibold hover:text-green-400 transition">Add Item</Link>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <span className="font-medium">Hi, {user?.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="font-semibold hover:text-blue-300 transition">Login</Link>
            <Link to="/signup" className="font-semibold hover:text-blue-300 transition">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
