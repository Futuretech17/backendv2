const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();  // Retrieves all products
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get trending products

const getTrendingProducts = async (req, res) => {
    try {
        // Correct query to find products with trending set to true
        const trendingProducts = await Product.find({ trending: true }); 
        res.json(trendingProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, category, title, description, size, price, image, inStock, trending } = req.body;

    const product = new Product({
        name,
        category,
        title,
        description,
        size,
        price,
        image,
        inStock,
        trending
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getAllProducts, getProductById, getProductsByCategory, getTrendingProducts, createProduct };
