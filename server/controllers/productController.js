const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body);
  const saveProduct = await newProduct.save();
  res.status(201).json(saveProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findOneAndDelete({ id: productId });
  if (!deletedProduct) {
    res.status(404);
    throw new Error("Product not deleted");
  }
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = { getProducts, createProduct, deleteProduct };
