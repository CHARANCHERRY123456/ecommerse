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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#222",
        color: "#fff",
      }}
    >
      <div>
        <Link to="/items" style={{ color: "white", marginRight: "15px" }}>
          Items
        </Link>
        <Link to="/cart" style={{ color: "white", marginRight: "15px" }}>
          Cart
        </Link>
      </div>

      <div>
        {token ? (
          <>
            <span style={{ marginRight: "15px" }}>
              Hi, {user?.name || "User"}
            </span>
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", marginRight: "15px" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white" }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
