// Product Schema for MongoDB 

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        required: true
        // This field is generated using a utility function to ensure uniqueness based on the user's role and timestamp
    },
    productUrlToImage: {
        type: String,
        required: true
    },
    productTitleHeading: {
        type: String,
        required: true,
        trim: true
    },
    productOriginLoc: {
        type: String,
        required: true
    },
    highlightedFeature: {
        type: String, // e.g. "Organic", "New Harvest"
        default: null
    },
    shortsummaryDesc: {
        type: String,
        maxlength: 200
    },
    presentedByFarmer: {
        farmerName: {
            type: String,
            required: true
        },
        farmLoc: {
            type: String,
            required: true
        }
    },
    priceInINR: {
        current: { type: Number, required: true },
        original: { type: Number } // for strike-through discounts
    },
    ratingStars: {
        avgRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 }
    },
    stockStatus: {
        type: String,
        enum: ["In Stock", "Out of Stock"],
        default: "In Stock"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);