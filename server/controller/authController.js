import { signupService, loginService } from "../service/authService.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

  const data = await signupService({ name, email, password });
  res.status(201).json({ message: "User created", ...data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const data = await loginService({ email, password });
    res.json({ message: "Login successful", ...data });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
