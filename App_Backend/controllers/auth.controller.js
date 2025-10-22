// controllers/auth.controller.js

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Register a new user ---
exports.register = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, password, role, aadhaarNum,landSize,crops,location} = req.body;

        if (!role || !['Farmer', 'Buyer'].includes(role)) {
            return res.status(400).json({ message: "Invalid role specified." });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }

        user = new User({
            fullName, mobileNumber, email, password, role, aadhaarNum,landSize, crops,location
        });

        // The password hashing is now handled by the user.model.js pre-save hook
        await user.save();
        
        res.status(201).json({ message: "User created successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// --- Login an existing user ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
