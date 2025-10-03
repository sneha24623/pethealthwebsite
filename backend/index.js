// index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5500;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// ==================== USERS ====================
let users = [];
app.post("/users", (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Load users.json (if exists)
  try {
    users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  } catch {
    users = [];
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  users.push({ name, email, password, phone });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ message: "User created successfully!" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Load users.json
  try {
    users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  } catch {
    users = [];
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  res.json({ message: "Login successful!", user });
});

// ==================== APPOINTMENTS ====================
app.post("/appointments", (req, res) => {
  const { petName, petType, issue, doctor, urgency, date, time } = req.body;

  if (!petName || !petType || !issue || !doctor || !urgency || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let appointments = [];
  try {
    appointments = JSON.parse(fs.readFileSync("appointment.json", "utf-8"));
  } catch {
    appointments = [];
  }

  const newAppointment = {
    id: appointments.length + 1,
    petName,
    petType,
    issue,
    doctor,
    urgency,
    date,
    time
  };

  appointments.push(newAppointment);

  try {
    fs.writeFileSync("appointment.json", JSON.stringify(appointments, null, 2));
    res.json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (err) {
    console.error("Error writing file:", err);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

// ==================== ADOPTIONS ====================
app.post("/adoptions", (req, res) => {
  const { petName, petSpecies, adopterName, adopterEmail, adopterPhone } = req.body;
  if (!petName || !petSpecies || !adopterName || !adopterEmail || !adopterPhone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let adoptions = [];
  try {
    adoptions = JSON.parse(fs.readFileSync("adoptions.json", "utf-8"));
  } catch {
    adoptions = [];
  }

  const newAdoption = {
    id: adoptions.length + 1,
    petData: { name: petName, species: petSpecies },
    adopterData: { name: adopterName, email: adopterEmail, phone: adopterPhone }
  };

  adoptions.push(newAdoption);

  try {
    fs.writeFileSync("adoptions.json", JSON.stringify(adoptions, null, 2));
    res.json({ message: "Adoption request submitted successfully!", adoption: newAdoption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save adoption request" });
  }
});


// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
