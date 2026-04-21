const express = require("express");
const router = express.Router();
const {
  protect,
  adminOnly,
  adminAuth,
} = require("../middleware/authMiddleware");
const {
  getOrders,
  getUserOrders,
  updateOrderStatus,
  createOrder,
} = require("../controllers/orderController");

router.get("/", protect, adminOnly, adminAuth, getOrders);
router.get("/user/:email", protect, getUserOrders);
router.patch("/:id/status", protect, adminOnly, adminAuth, updateOrderStatus);
router.post("/", createOrder);

module.exports = router;
