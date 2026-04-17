const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
