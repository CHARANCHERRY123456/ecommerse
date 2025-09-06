import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function signupService({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashed = bcrypt.hashSync(password);
  const user = await User.create({ name, email, password: hashed });

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
  if (!user) throw new Error("No User found");

  const match = bcrypt.compareSync(password, user.password);
  if (!match) throw new Error("Passowrd does not matched");

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return { token, user: { id: user._id, name: user.name, email: user.email } };
}
