const express = require("express");
const router = express.Router();

const {
  protect,
  adminOnly,
  adminAuth,
} = require("../middleware/authMiddleware");

const {
  applyPromo,
  getPromos,
  createPromo,
  deletePromo,
} = require("../controllers/promoController");

router.post("/apply", applyPromo);
router.get("/", protect, adminOnly, adminAuth, getPromos);
router.post("/", protect, adminOnly, adminAuth, createPromo);
router.delete("/:id", protect, adminOnly, adminAuth, deletePromo);

module.exports = router;
