require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => res.json({ message: "Backend working!" }));

app.post("/api/signup", async (req, res) => {
  const { name, lastName, email, password } = req.body;
  if (!name || !lastName || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const existingUser = await db("users").where({ email }).first();
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  await db("users").insert({ name, lastName, email, passwordHash });
  res.status(201).json({ message: "User created successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const user = await db("users").where({ email }).first();
  if (!user)
    return res.status(401).json({ error: "Invalid email or password" });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return res.status(401).json({ error: "Invalid email or password" });

  res.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
