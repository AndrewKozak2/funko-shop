const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  register,
  login,
  verify,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update", protect, updateUser);
router.delete("/:email", protect, deleteUser);

module.exports = router;
