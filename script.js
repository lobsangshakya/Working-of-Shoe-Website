function addToCart() {
  alert("Item added to cart!");
}
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Define a schema for your products
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  sizes: [String],
  features: [String]
});

const Product = mongoose.model('Product', productSchema);

// Example route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
