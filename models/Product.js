const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    title: { type: String },
    description: { type: String },
    size: { type: [String] },
    price: { type: Number },
    image: { type: String },
    inStock: { type: Boolean, default: true },
    trending: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
