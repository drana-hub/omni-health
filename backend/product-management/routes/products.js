const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authenticateJWT = require('../middleware/auth');

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const { name, category } = req.query;
    console.log('hit received');
    let products = [];
    
    if (name) {
      products = await Product.find({ name: new RegExp(name, 'i') });
    } else if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
