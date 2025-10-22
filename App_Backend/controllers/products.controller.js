// Product Controller

const Product = require("../models/products.model"); 
const generateProductId = require("../utilities/generateProductId");

// GET all products or filter by query
const getProducts = async (req, res) => {
    try {
        const { category, location, search, minPrice, maxPrice } = req.query;

        // Build dynamic filter
        let filter = {};

        if (category) filter.category = category;
        if (location) filter["productOriginLoc"] = location;
        if (search) {
            filter["productTitleHeading"] = { $regex: search, $options: "i" };
        }
        if (minPrice || maxPrice) {
            filter["priceInINR.current"] = {};
            if (minPrice) filter["priceInINR.current"].$gte = Number(minPrice);
            if (maxPrice) filter["priceInINR.current"].$lte = Number(maxPrice);
        }

        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// GET single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


//Upload Product by Farmer or Buyer 
const uploadNewProduct = async (req, res) => {
    try {
        const {
            productTitleHeading,
            productUrlToImage,
            productOriginLoc,
            presentedByFarmer,
            priceInINR,
            stockStatus,
            highlightwdFeature,
            shortsummaryDesc
        } = req.body;

        // Validate required fields
        if (!productTitleHeading || !productUrlToImage || !productOriginLoc ||
            !presentedByFarmer?.farmerName || !presentedByFarmer?.farmLoc ||
            !priceInINR?.current) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields."
            });
        }

        // Create new product document
        const newProduct = new Product({
            productId: generateProductId(), // Custom productId
            productTitleHeading,
            productUrlToImage,
            productOriginLoc,
            presentedByFarmer,
            priceInINR,
            stockStatus: stockStatus || "In Stock",
            highlightwdFeature,
            shortsummaryDesc,
            ratingStars: { avgRating: 0, totalReviews: 0 }, // default for new product
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product uploaded successfully.",
            data: savedProduct
        });

    } catch (error) {
        console.error("Error uploading product:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = { getProducts, getProductById, uploadNewProduct };