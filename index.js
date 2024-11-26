const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); // Import your routes file

require('dotenv').config(); // Load environment variables from .env file

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());

// Use the router for '/api/products'
app.use('/api/products', productRoutes);

// Serve static files for uploaded images
app.use('/product-images', express.static(path.join(__dirname, 'public/product-images')));

// Connect to MongoDB without deprecated options
const PORT = process.env.PORT || 5000;

// Bind the server to all available network interfaces for local network access
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
