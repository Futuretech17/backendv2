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

// Port configuration
const PORT = process.env.PORT || 4000;

// Start the server
let server;
try {
    server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}

// Handle MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        if (server) {
            server.close(() => {
                console.log('Server shutting down due to MongoDB connection error.');
                process.exit(1);
            });
        }
    });

// Graceful shutdown on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    if (server) server.close(() => console.log('Server closed.'));
    mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});
