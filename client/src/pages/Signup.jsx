import { useState, useContext } from "react";
import axios from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      const { name, email, password } = form;
      const { data } = await axios.post("/auth/signup", { name, email, password });
      login(data);
      navigate("/items");
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Signup</h2>
      {serverError && <div style={{ color: "red", marginBottom: 8 }}>{serverError}</div>}
      <div style={{ marginBottom: 12 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          name="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
        />
        <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ marginLeft: 8 }}>
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          name="confirmPassword"
          placeholder="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
        />
        <button type="button" onClick={() => setShowConfirm((v) => !v)} style={{ marginLeft: 8 }}>
          {showConfirm ? "Hide" : "Show"}
        </button>
        {errors.confirmPassword && <div style={{ color: "red" }}>{errors.confirmPassword}</div>}
      </div>
      <button type="submit" style={{ width: "100%", padding: "10px" }}>Signup</button>
    </form>
  );
}
