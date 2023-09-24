const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stockOnline: Number,
  stockInStore: Number,
}, {
  timestamps: true, // Enable timestamps
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
