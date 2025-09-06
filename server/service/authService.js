import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function signupService({ name, email, password }) {
  // Check if user already exists
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email address is already registered");

  // Validate input
  if (!name || name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }
  
  if (!email || !email.includes('@')) {
    throw new Error("Please provide a valid email address");
  }
  
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const hashed = bcrypt.hashSync(password, 12); // Increased salt rounds for security
  const user = await User.create({ name: name.trim(), email: email.toLowerCase(), password: hashed });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email }
  };
}

export async function loginService({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found with this email address");

  const match = bcrypt.compareSync(password, user.password);
  if (!match) throw new Error("Password does not match");

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return { token, user: { id: user._id, name: user.name, email: user.email } };
}
