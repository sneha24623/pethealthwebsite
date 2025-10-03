// server.js
const fs = require('fs/promises'); // 🛑 CHANGE 1: Use fs/promises for async file operations
const path = require('path');
const bcrypt = require('bcryptjs');
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config(); 

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5500' })); // Adjust origin if needed

// --- File Path ---
// 🛑 CHANGE 2: Consolidate to a single file path
const APP_DATA_FILE = path.join(__dirname, "data/appData.json"); 

// --- Helper Functions to read/write the entire data object ---
// 🛑 CHANGE 3: New async helper functions for reading/writing the whole data object
async function readAppData() {
    try {
        const data = await fs.readFile(APP_DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Initialize with default empty structures if file is missing or invalid
        return { 
            users: [], 
            petHealthData: {}, // Map for dashboard data
            appointments: [],
            adoptionRequests: []
        }; 
    }
}

async function writeAppData(data) {
    await fs.writeFile(APP_DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// --- Middleware to check token (Unchanged) ---
function auth(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: "Invalid token." });
    }
}


// --------- 1. USER AUTHENTICATION & LOGIN/LOGOUT (Signup/Login) ---------

// Register
app.post("/api/auth/register", async (req, res) => {
    const { name, email, password, phone } = req.body; 
    // 🛑 CHANGE 4: Read consolidated data
    const data = await readAppData(); 

    if (data.users.find(u => u.email === email)) {
        return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashedPassword, phone };
    data.users.push(newUser);
    // 🛑 CHANGE 4: Write consolidated data
    await writeAppData(data); 

    res.json({ msg: "Registered successfully" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    // 🛑 CHANGE 5: Read consolidated data
    const data = await readAppData(); 
    const user = data.users.find(u => u.email === email);

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: "7d" });
    
    res.json({ 
        token, 
        user: { id: user.id, name: user.name, email: user.email } 
    });
});

// User Profile (for token verification and user data retrieval)
app.get("/api/auth/me", auth, async (req, res) => {
    // 🛑 CHANGE 6: Read consolidated data
    const data = await readAppData();
    const user = data.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone });
});


// --------- 2. VET APPOINTMENTS & PET HEALTH DASHBOARD ---------

// Fetch ALL Pet Health Data (for dashboard initialization/selection)
app.get("/api/dashboard/pets", async (req, res) => {
    // 🛑 CHANGE 7: Read consolidated data and return the correct key
    const data = await readAppData(); 
    res.json(data.petHealthData);
});

// Create appointment (using the form data from the frontend)
app.post("/api/appointments", auth, async (req, res) => {
    const { petName, petType, issue, doctor, urgency, date, time } = req.body; 
    // 🛑 CHANGE 8: Read consolidated data
    const data = await readAppData();

    const newAppointment = { 
        id: Date.now(), 
        userId: req.user.id, 
        petName, petType, issue, doctor, urgency, date, time 
    };
    
    data.appointments.push(newAppointment);
    // 🛑 CHANGE 8: Write consolidated data
    await writeAppData(data); 

    res.json({ 
        message: "Appointment successfully booked and saved.", 
        appointment: newAppointment 
    });
});

// View my appointments (used for a theoretical 'my appointments' page)
app.get("/api/appointments/my", auth, async (req, res) => {
    // 🛑 CHANGE 9: Read consolidated data
    const data = await readAppData();

    const myAppointments = data.appointments.filter(a => a.userId === req.user.id);

    res.json(myAppointments);
});


// --------- 3. ADOPTION RAISED REQUEST (Form Submission) ---------

// Create Adoption Request
app.post("/api/adoptions", auth, async (req, res) => {
    const { petName, petSpecies, adopterName, adopterEmail, adopterPhone } = req.body;
    // 🛑 CHANGE 10: Read consolidated data
    const data = await readAppData();
    
    const newRequest = { 
        id: Date.now(), 
        userId: req.user.id,
        petName,
        petSpecies,
        adopterName, 
        adopterEmail, 
        adopterPhone,
        status: 'Pending Review' 
    };

    data.adoptionRequests.push(newRequest);
    // 🛑 CHANGE 10: Write consolidated data
    await writeAppData(data); 

    res.json({ 
        message: "Adoption request submitted successfully and recorded.",
        request: newRequest
    });
});


// --------- Initial Data Seeding ---------
// 🛑 CHANGE 11: Implement seeding logic using the consolidated file
async function seedInitialData() {
    let data = await readAppData();
    
    // Check if pet data is empty and seed it if necessary
    if (Object.keys(data.petHealthData).length === 0) {
        const initialPetHealthData = {
            "buddy": {
                "name": "Buddy", "type": "Dog", "breed": "Golden Retriever", "age": 3, "weight": 28.5, "size": "Medium (25-60 lbs)",
                "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZEQjAwIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjRkY4QzAwIi8+CjxjaXJjbGUgY3g9IjQzIiBjeT0iMzUiIHI9IjMiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iNTciIGN5PSIzNSIgcj0iMyIgZmlsbD0iIzAwMCIvPgo8ZWxsaXBzZSBjeD0iNTAiIGN5PSI0NSIgcng9IjQiIHJ5PSIyIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPgo=",
                "healthMetrics": { "activity": 75, "sleep": 82, "wellness": 68 },
                "vitalSigns": { "heartRate": { "value": 95, "unit": "BPM", "status": "Normal" }, "temperature": { "value": 101.5, "unit": "°F", "status": "Normal" }, "weight": { "value": 28.5, "unit": "lbs", "change": "+0.5", "status": "Stable" } },
                "activityData": [65, 72, 80, 75, 85, 90, 75], "lastCheckup": "2024-09-15", "nextAppointment": "2025-01-15"
            },
            "whiskers": {
                "name": "Whiskers", "type": "Cat", "breed": "Persian", "age": 5, "weight": 12.3, "catType": "Indoor Only",
                "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjRTBFMEUwIi8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiNFMEUwRTAiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI gdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ci8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUiIHI9IjE4IiBmaWxsPSIjRTBFMEUwIi8+Cjxwb2x5Z29uIHBvaW50cz0iMzUsMzAgNDAsMjAgNDUsMzAiIGZpbGw9IiNFMEUwRTAiLz4KPC9zdmc+",
                "healthMetrics": { "activity": 60, "sleep": 90, "wellness": 85 },
                "vitalSigns": { "heartRate": { "value": 180, "unit": "BPM", "status": "Normal" }, "temperature": { "value": 101.2, "unit": "°F", "status": "Normal" }, "weight": { "value": 12.3, "unit": "lbs", "change": "-0.2", "status": "Stable" } },
                "activityData": [55, 60, 65, 58, 62, 70, 60], "lastCheckup": "2024-08-20", "nextAppointment": "2025-02-20"
            },
            "max": {
                "name": "Max", "type": "Dog", "breed": "German Shepherd", "age": 6, "weight": 35.8, "size": "Large (60-90 lbs)",
                "image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEI0NTEzIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjNjUzNjExIi8+CjxjaXJjbGUgY3g9IjQzIiBjeT0iMzUiIHI9IjMiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iNTciIGN5PSIzNSIgcj0iMyIgZmlsbD0iIzAwMCIvPgo8ZWxsaXBzZSBjeD0iNTAiIGN5PSI0NSIgcng9IjQiIHJ5PSIyIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPgo=",
                "healthMetrics": { "activity": 85, "sleep": 75, "wellness": 90 },
                "vitalSigns": { "heartRate": { "value": 88, "unit": "BPM", "status": "Normal" }, "temperature": { "value": 101.8, "unit": "°F", "status": "Normal" }, "weight": { "value": 35.8, "unit": "lbs", "change": "+1.2", "status": "Gaining" } },
                "activityData": [80, 85, 90, 88, 92, 95, 85], "lastCheckup": "2024-10-01", "nextAppointment": "2025-01-01"
            }
        };
        data.petHealthData = initialPetHealthData;
        console.log("Initial Pet Health Dashboard data added!");
        await writeAppData(data); // Write the updated data structure back
    }
}

// 🛑 CHANGE 12: Use an async IIFE or a .then chain to execute the seeding and start the server
async function startServer() {
    await seedInitialData();
    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

startServer().catch(err => {
    console.error("Failed to start server:", err);
});