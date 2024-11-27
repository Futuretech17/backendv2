const express = require('express');
const { getAllProducts, getProductById, getProductsByCategory, getTrendingProducts, createProduct } = require('../controllers/productController');
const router = express.Router();

// Route to get all products
router.get('/', getAllProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to get products by category
router.get('/category/:category', getProductsByCategory);

// Route to get trending products
router.get('/trending', getTrendingProducts);  

// Route to create a new product
router.post('/', createProduct);

module.exports = router;
