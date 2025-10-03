// index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths
const usersFile = path.join(__dirname, "users.json");
const appointmentsFile = path.join(__dirname, "appointments.json");
const adoptionsFile = path.join(__dirname, "adoptions.json");

// Ensure JSON files exist
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]");
if (!fs.existsSync(appointmentsFile)) fs.writeFileSync(appointmentsFile, "[]");
if (!fs.existsSync(adoptionsFile)) fs.writeFileSync(adoptionsFile, "[]");

// ===== Signup =====
app.post("/users", (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  users.push({ name, email, password, phone });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: "User created successfully!" });
});

// ===== Login =====
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: "Invalid email or password" });

  res.json({ message: "Login successful!", user });
});

// ===== Appointments =====
app.post("/appointments", (req, res) => {
  const appointment = req.body;
  const appointments = JSON.parse(fs.readFileSync(appointmentsFile));

  appointments.push(appointment);
  fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));

  res.json({ message: "Appointment booked successfully!" });
});

// ===== Adoptions =====
app.post("/adoptions", (req, res) => {
  const adoption = req.body;
  const adoptions = JSON.parse(fs.readFileSync(adoptionsFile));

  adoptions.push(adoption);
  fs.writeFileSync(adoptionsFile, JSON.stringify(adoptions, null, 2));

  res.json({ message: "Adoption request submitted successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
