// server.js (The main entry point)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // For protected routes

// Simple root route
app.get('/', (req, res) => {
    res.send('Krishi Unnati API is running...');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
