import { signupService, loginService } from "../service/authService.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    
    // Enhanced validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    
    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long" });
    }
    
    if (!email.includes('@') || email.length < 5) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const data = await signupService({ name, email, password });
    res.status(201).json({ message: "User created successfully", ...data });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Enhanced validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const data = await loginService({ email, password });
    res.json({ message: "Login successful", ...data });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(401).json({ message: err.message });
  }
}
