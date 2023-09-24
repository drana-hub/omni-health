require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');

const app = express();

mongoose.connect(process.env.PRODUCT_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
