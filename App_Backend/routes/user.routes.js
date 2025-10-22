// routes/user.routes.js

const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');
const router = express.Router();

// --- Example Protected Routes ---

// @route   GET /api/users/farmer/dashboard
// @desc    Get data for the farmer dashboard
// @access  Private (Requires 'Farmer' role)
router.get(
    '/farmer/dashboard',
    authenticateToken,
    authorizeRole('Farmer'),
    (req, res) => {
        res.json({ message: `Welcome to your Farmer Dashboard, user ID: ${req.user.userId}` });
    }
);

// @route   GET /api/users/buyer/dashboard
// @desc    Get data for the buyer dashboard
// @access  Private (Requires 'Buyer' role)
router.get(
    '/buyer/dashboard',
    authenticateToken,
    authorizeRole('Buyer'),
    (req, res) => {
        res.json({ message: `Welcome to your Buyer Dashboard, user ID: ${req.user.userId}` });
    }
);

module.exports = router;
