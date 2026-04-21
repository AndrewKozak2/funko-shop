const express = require("express");
const router = express.Router();
const {
  protect,
  adminOnly,
  adminAuth,
} = require("../middleware/authMiddleware");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", protect, adminOnly, adminAuth, createProduct);
router.delete("/:id", protect, adminOnly, adminAuth, deleteProduct);

module.exports = router;
