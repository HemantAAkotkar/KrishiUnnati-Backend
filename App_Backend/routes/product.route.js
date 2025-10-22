
const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");

// Get all or filtered products
router.get("/", productController.getProducts);

// Get single product by ID
router.get("/:id", productController.getProductById);

// Upload a new product
router.post("/", productController.uploadNewProduct);

module.exports = router;