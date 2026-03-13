const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for users (replace with a database later)
let users = []; // Array of { id, name, lastName, email, passwordHash }

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

// Signup route
app.post("/api/signup", async (req, res) => {
  const { name, lastName, email, password } = req.body;

  // Basic validation
  if (!name || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Save user
  const newUser = { id: users.length + 1, name, lastName, email, passwordHash };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully" });
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Find user
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Success (in a real app, return a JWT token here)
  res.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
